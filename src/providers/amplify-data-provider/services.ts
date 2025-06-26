import { axiosInstance } from "../axios";
import { API_CONFIG } from "./config";
import { mapUser, mapUsers, mapPost, mapPosts } from "./mappers";
import type { ResourceService } from "./types";

// User service functions
export const createUserService = (): ResourceService => ({
  getOne: async (id: string) => {
    const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${id}`);
    return mapUser(response.data);
  },

  getList: async (params: string) => {
    const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}?${params}`);
    return mapUsers(response.data);
  },

  create: async (variables: any) => {
    const response = await axiosInstance.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`, variables);
    return mapUser(response.data);
  },

  update: async (id: string, variables: any) => {
    const response = await axiosInstance.patch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${id}`, variables);
    return mapUser(response.data);
  },
});

// Post service functions
export const createPostService = (): ResourceService => ({
  getOne: async (id: string) => {
    const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${id}`);
    return mapPost(response.data);
  },

  getList: async (params: string) => {
    const response = await axiosInstance.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}?${params}`);
    return mapPosts(response.data);
  },

  create: async (variables: any) => {
    const response = await axiosInstance.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`, variables);
    return mapPost(response.data);
  },

  update: async (id: string, variables: any) => {
    const response = await axiosInstance.patch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}/${id}`, variables);
    return mapPost(response.data);
  },
});

// Service factory function
const serviceCache = new Map<string, ResourceService>();

export const getService = (resource: string): ResourceService => {
  if (!serviceCache.has(resource)) {
    switch (resource) {
      case "users":
        serviceCache.set(resource, createUserService());
        break;
      case "posts":
        serviceCache.set(resource, createPostService());
        break;
      default:
        throw new Error(`Unsupported resource: ${resource}`);
    }
  }
  return serviceCache.get(resource)!;
}; 