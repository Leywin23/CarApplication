import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getErrorMessage } from "../api/error";

export default function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Haslo1A"); // 4–8 znaków, 1 mała, 1 duża, 1 cyfra
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="card-header">
          <h1 className="h1">Rejestracja</h1>
          <span className="muted small">Hasło: 4–8 znaków</span>
        </div>

        {err && <div className="alert">{err}</div>}

        <div className="form" style={{ marginTop: 12 }}>
          <div className="grid-2">
            <div className="field">
              <label>DisplayName</label>
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>

            <div className="field">
              <label>UserName</label>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
          </div>

          <div className="grid-2">
            <div className="field">
              <label>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="field">
              <label>Hasło</label>
              <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div className="actions">
            <Link className="btn" to="/login">Mam konto</Link>
            <button
              className="btn btn-primary"
              onClick={async () => {
                setErr(null);
                try {
                  await register({ email, password, displayName, userName });
                  nav("/");
                } catch (e: any) {
                  setErr(getErrorMessage(e));
                }
              }}
            >
              Utwórz konto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
