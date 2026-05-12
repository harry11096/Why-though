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
  background: 'linear-gradient(135deg, #0071e3 0%, #32a8ff 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '999px',
  padding: '15px 18px',
  fontWeight: 700,
  fontSize: '0.98rem',
  cursor: 'pointer',
  boxShadow: '0 16px 30px rgba(0, 113, 227, 0.25)',
  marginTop: 4,
};

export default function Login({ onSubmit, loading, inputStyle, copy }) {
  const [form, setForm] = useState({
    identifier: '',
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
        <span style={labelTextStyle}>{copy.identifierLabel}</span>
        <input
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder={copy.identifierPlaceholder}
          style={inputStyle}
          required
        />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>{copy.passwordLabel}</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={copy.passwordPlaceholder}
          style={inputStyle}
          required
        />
      </label>

      <div style={helperStyle}>{copy.helper}</div>

      <button type="submit" disabled={loading} style={{ ...buttonStyle, opacity: loading ? 0.7 : 1 }}>
        {loading ? copy.loading : copy.submit}
      </button>
    </form>
  );
}
