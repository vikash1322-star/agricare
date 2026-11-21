
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, Mail, Phone, Lock, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    village: '',
    district: '',
    state: '',
    landSize: '',
    crops: ''
  });

  const update = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      await register(form);
      nav('/login', { state: { registered: true } });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please check backend connection.'
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="authWrap">
      <div className="authCard wide">
        <div className="authLogo">
          <Leaf size={24} />
        </div>

        <h1>Farmer Registration</h1>
        <p className="muted">Create your account to access crop services</p>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={submit}>
          <div className="formGrid">

            <div>
              <label>Full name *</label>
              <div className="inputIcon">
                <User />
                <input
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div>
              <label>Email *</label>
              <div className="inputIcon">
                <Mail />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="Email address"
                  required
                />
              </div>
            </div>

            <div>
              <label>Mobile number *</label>
              <div className="inputIcon">
                <Phone />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label>Password * (6+ characters)</label>
              <div className="inputIcon">
                <Lock />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  minLength={6}
                  placeholder="Create password"
                  required
                />
              </div>
            </div>

            <div>
              <label>Village</label>
              <input
                className="plainInput"
                value={form.village}
                onChange={(e) => update('village', e.target.value)}
                placeholder="Village / Panchayat"
              />
            </div>

            <div>
              <label>District</label>
              <input
                className="plainInput"
                value={form.district}
                onChange={(e) => update('district', e.target.value)}
                placeholder="District"
              />
            </div>

            <div>
              <label>State</label>
              <input
                className="plainInput"
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                placeholder="State"
              />
            </div>

            <div>
              <label>Land size</label>
              <input
                className="plainInput"
                value={form.landSize}
                onChange={(e) => update('landSize', e.target.value)}
                placeholder="e.g. 2 acres"
              />
            </div>

            <div className="fullSpan">
              <label>Address</label>
              <div className="inputIcon">
                <MapPin />
                <input
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  placeholder="Full address"
                />
              </div>
            </div>

            <div className="fullSpan">
              <label>Crops grown</label>
              <input
                className="plainInput"
                value={form.crops}
                onChange={(e) => update('crops', e.target.value)}
                placeholder="e.g. Paddy, wheat, vegetables"
              />
            </div>

          </div>

          <button className="btn primary full" disabled={busy}>
            {busy ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="authBottom">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
