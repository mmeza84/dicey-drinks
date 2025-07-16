import { useAuthState } from "@/contexts/AuthContext";
import "./Header.scss";

export default function Header() {
  const { user } = useAuthState();
  console.log("User", user);
  return (
    <header className="header">
      <h1>Dicey Drinks</h1>
      <nav className="header-nav">
        <a href="/configure">Configure</a>
        <a href="/roll">Roll</a>
        {user && user.id && <a href="/logout">Logout</a>}
        {!user && <a href="/login">Login</a>}
      </nav>
    </header>
  );
}
