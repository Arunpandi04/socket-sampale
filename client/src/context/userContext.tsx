import {createContext,useCallback,useState} from 'react'
export interface Post {
  key: string;
  id: number;
  name: string;
  address: string;
  phoneNumber: number;
  education: string;
  age:number
}
export interface PostsContextData {
  posts: Post[];
  isLoading: boolean;
  fetchPosts: () => void;
  removePost: (postId: number) => void;
}
 
export const postsContextDefaultValue: PostsContextData = {
  posts: [],
  isLoading: false,
  fetchPosts: () => null,
  removePost: () => null
}
 
export const PostsContext = createContext<PostsContextData>(postsContextDefaultValue);

function usePostsContextValue(): PostsContextData {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const fetchPosts = useCallback(() => {
    setIsLoading(true);
   setPosts([])
  }, [setPosts]);
 
  const removePost = useCallback((postId: number) => {
    setIsLoading(true);
    
  }, [setPosts, posts]);
 
  return {
    posts,
    isLoading,
    fetchPosts,
    removePost
  }
}