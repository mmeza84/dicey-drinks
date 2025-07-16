import { useRef } from "react";
import "./Login.scss";
import supabase from "@/utils/supabase";
import { useNavigate } from "react-router";
import Card from "@/components/card/Card";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(
      "Login form submitted",
      emailRef.current?.value,
      passwordRef.current?.value
    );
    const loginResponse = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });

    console.log("Login response:", loginResponse);
    if (!loginResponse.error) {
      navigate("/"); // Redirect to home on successful login
    }
  };

  return (
    <div className="login-form">
      <Card>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            ref={emailRef}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button type="submit">Login</button>
        </form>
      </Card>
    </div>
  );
}
