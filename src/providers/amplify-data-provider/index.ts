import type { DataProvider } from "@refinedev/core";
import { axiosInstance } from "../axios";
import { API_CONFIG } from "./config";
import { getService } from "./services";
import { buildQueryParams, isSupportedResource } from "./utils";

export const amplifyDataProvider: DataProvider = {
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();
    if (ids) {
      ids.forEach((id) => params.append("id", String(id)));
    }

    const response = await axiosInstance.get(
      `${API_CONFIG.BASE_URL}/${resource}?${params.toString()}`,
    );
    return { data: response.data };
  },

  getOne: async ({ resource, id, meta }) => {
    try {
      if (isSupportedResource(resource)) {
        const service = getService(resource);
        const data = await service.getOne(String(id));
        return { data };
      }
    } catch (error) {
      // Fallback for unsupported resources
    }
    
    const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}/${resource}/${String(id)}`);
    return { data: response.data };
  },

  update: async ({ resource, id, variables }) => {
    try {
      if (isSupportedResource(resource)) {
        const service = getService(resource);
        const data = await service.update(String(id), variables);
        return { data };
      }
    } catch (error) {
      // Fallback for unsupported resources
    }
    
    const response = await axiosInstance.patch(
      `${API_CONFIG.BASE_URL}/${resource}/${String(id)}`,
      variables,
    );
    return { data: response.data };
  },

  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    try {
      if (isSupportedResource(resource)) {
        const service = getService(resource);
        const params = buildQueryParams(pagination, filters, sorters);
        const data = await service.getList(params);
        
        return {
          data,
          total: data.length,
        };
      }
    } catch (error) {
      // Fallback for unsupported resources
    }
    
    const params = buildQueryParams(pagination, filters, sorters);
    const response = await axiosInstance.get(
      `${API_CONFIG.BASE_URL}/${resource}?${params}`,
    );
    
    return {
      data: response.data,
      total: response.data.length,
    };
  },

  create: async ({ resource, variables }) => {
    try {
      if (isSupportedResource(resource)) {
        const service = getService(resource);
        const data = await service.create(variables);
        return { data };
      }
    } catch (error) {
      // Fallback for unsupported resources
    }
    
    const response = await axiosInstance.post(
      `${API_CONFIG.BASE_URL}/${resource}`,
      variables,
    );
    return { data: response.data };
  },

  deleteOne: () => {
    throw new Error("Not implemented");
  },

  getApiUrl: () => API_CONFIG.BASE_URL,
}; 