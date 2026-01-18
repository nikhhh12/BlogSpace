import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Blog } from '../types/blog';

const API_URL = 'http://localhost:3001/blogs';

export const useGetBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: () => fetch(API_URL).then(res => res.json()),
  });
};

export const useGetBlogById = (id: string | null) => {
  return useQuery<Blog>({
    queryKey: ['blogs', id],
    queryFn: () => fetch(`${API_URL}/${id}`).then(res => res.json()),
    enabled: !!id,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBlog: Omit<Blog, 'id'>) =>
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};