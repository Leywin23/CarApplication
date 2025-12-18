import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getErrorMessage } from "../api/error";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("franek@test.com");
  const [password, setPassword] = useState("Haslo!0123");
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="card-header">
          <h1 className="h1">Logowanie</h1>
          <span className="muted small">JWT + Identity</span>
        </div>

        {err && <div className="alert">{err}</div>}

        <div className="form" style={{ marginTop: 12 }}>
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="field">
            <label>Hasło</label>
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="actions">
            <Link className="btn" to="/register">Załóż konto</Link>
            <button
              className="btn btn-primary"
              onClick={async () => {
                setErr(null);
                try {
                  await login({ email, password });
                  nav("/");
                } catch (e: any) {
                  setErr(getErrorMessage(e));
                }
              }}
            >
              Zaloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
