// ============================================================================
// MAPPERS
// ============================================================================

import type { User, Post, TransformedUser, TransformedPost } from "./types";

export const mapUser = (user: User): TransformedUser => ({
  id: user.id,
  title: user.name,
  name: user.name,
  email: user.email,
  phone: user.phone,
  website: user.website,
  company: user.company?.name || "",
});

export const mapUsers = (users: User[]): TransformedUser[] => 
  users.map(mapUser);

export const mapPost = (post: Post): TransformedPost => ({
  id: post.id,
  name: post.title,
  description: post.body,
  price: (post.id * 25) + 100,
  category: post.userId ? `Category ${post.userId}` : "General",
  createdAt: new Date(Date.now() - post.id * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
});

export const mapPosts = (posts: Post[]): TransformedPost[] => 
  posts.map(mapPost); 