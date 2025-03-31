import { useQuery } from "@tanstack/react-query";



export type PostType = {
    id: number;
    title: string;
    body: string;
  };
  
export function usePosts() {
    return useQuery({
      queryKey: ["posts"],
      queryFn: async (): Promise<Array<PostType>> => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        return await response.json();
      },
    });
  }
  