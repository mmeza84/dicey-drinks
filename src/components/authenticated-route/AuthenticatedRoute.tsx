import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthState } from "@/contexts/AuthContext";

export default function AuthenticatedRoute() {
  const { user, loading } = useAuthState();
  const location = useLocation();

  console.log("Trying to navigate to", location);
  console.log("Auth context", { user, loading }, user?.id);

  // Show loading state while checking authentication
  if (loading) {
    console.log("Authentication is loading...");
    return <div>Loading...</div>;
  }

  // If not loading and user exists, render the protected route
  if (user) {
    console.log("User is authenticated, rendering outlet");
    return <Outlet />;
  }

  // If not loading and no user, redirect to login
  console.log("User is not authenticated, redirecting to login");
  return <Navigate to="/login" replace />;
}
