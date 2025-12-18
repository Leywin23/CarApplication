import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <div className="brand-badge" />
          CarsApp
        </Link>

        <div className="nav-links">
          <Link className="pill" to="/">Auta</Link>
          {user && <Link className="pill" to="/cars/new">Dodaj auto</Link>}
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <div className="pill">Zalogowany: <b>{user.userName}</b></div>
              <button className="btn" onClick={() => { logout(); nav("/login"); }}>
                Wyloguj
              </button>
            </>
          ) : (
            <>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Rejestracja</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
