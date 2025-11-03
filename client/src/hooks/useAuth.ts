import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
    retryOnMount: false,
  });

  const is401 = error && error.message && error.message.includes("401");

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !is401,
    isAdmin: user?.isAdmin || false,
  };
}
