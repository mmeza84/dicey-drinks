import { useAuthState } from "@/contexts/AuthContext";
import supabase from "@/utils/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  const { user, loading } = useAuthState();

  const handleSignOut = async () => {
    console.log("Logging out user:", user?.id);
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      console.log("User logged out successfully");
      console.log("Redirecting to home page");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!loading) {
      handleSignOut();
    }
  }, [loading]);

  return (
    <div>
      <h1>Logout</h1>
      <p>You have been logged out.</p>
    </div>
  );
}
