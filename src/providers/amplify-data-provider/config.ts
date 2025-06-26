export const API_CONFIG = {
  BASE_URL: "https://jsonplaceholder.typicode.com",
  ENDPOINTS: {
    USERS: "/users",
    POSTS: "/posts",
  },
} as const;

export const SUPPORTED_RESOURCES = ["users", "posts"] as const; 