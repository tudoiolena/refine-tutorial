// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const buildQueryParams = (pagination?: any, filters?: any, sorters?: any): string => {
  const params = new URLSearchParams();

  if (pagination?.current && pagination?.pageSize) {
    params.append("_start", String((pagination.current - 1) * pagination.pageSize));
    params.append("_end", String(pagination.current * pagination.pageSize));
  }

  if (sorters && sorters.length > 0) {
    params.append("_sort", sorters.map((sorter: any) => sorter.field).join(","));
    params.append("_order", sorters.map((sorter: any) => sorter.order).join(","));
  }

  if (filters && filters.length > 0) {
    filters.forEach((filter: any) => {
      if ("field" in filter && filter.operator === "eq") {
        params.append(filter.field, String(filter.value));
      }
    });
  }

  return params.toString();
};

export const isSupportedResource = (resource: string): boolean => {
  return ["users", "posts"].includes(resource);
}; 