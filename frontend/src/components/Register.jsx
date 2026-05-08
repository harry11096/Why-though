import React, { useState } from 'react';

const formStyle = {
  display: 'grid',
  gap: 14,
};

const labelStyle = {
  display: 'grid',
  gap: 8,
};

const labelTextStyle = {
  fontWeight: 600,
  color: '#475569',
  fontSize: '0.9rem',
};

const helperStyle = {
  color: '#94a3b8',
  fontSize: '0.85rem',
  lineHeight: 1.5,
};

const buttonStyle = {
  background: 'linear-gradient(135deg, #34c759 0%, #72e39a 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '999px',
  padding: '15px 18px',
  fontWeight: 700,
  fontSize: '0.98rem',
  cursor: 'pointer',
  boxShadow: '0 16px 30px rgba(52, 199, 89, 0.24)',
  marginTop: 4,
};

export default function Register({ onSubmit, loading, inputStyle }) {
  const [form, setForm] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>
        <span style={labelTextStyle}>Username</span>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Choose a username"
          style={inputStyle}
          required
        />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Full Name</span>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Harry Zhang"
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="harry@email.com"
          style={inputStyle}
          required
        />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
          style={inputStyle}
          required
          minLength={6}
        />
      </label>

      <div style={helperStyle}>A fresh account gives you a saved identity and a history of future quiz attempts.</div>

      <button type="submit" disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
}
