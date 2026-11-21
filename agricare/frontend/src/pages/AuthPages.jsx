import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const { login } = useAuth();
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const u = await login(email, password);
      nav(u.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Is the backend running?'
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="authWrap">
      <div className="authCard">
        <div className="authLogo">
          <Leaf size={24} />
        </div>

        <h1>Welcome back</h1>
        <p className="muted">Login to your AgriCare account</p>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={submit}>
          <label>Email address</label>
          <div className="inputIcon">
            <Mail />
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>
          <div className="inputIcon">
            <Lock />
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn primary full" disabled={busy}>
            {busy ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="authBottom">
          New farmer? <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}