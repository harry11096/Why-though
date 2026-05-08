const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed.');
  }

  return data;
}

const unwrapData = (result) => {
  if (typeof result.success === 'boolean') {
    return {
      message: result.message || '',
      data: result.data,
    };
  }

  return {
    message: result.message || '',
    data: result,
  };
};

export const authApi = {
  async register(payload) {
    const result = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return unwrapData(result);
  },
  async login(payload) {
    const result = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return unwrapData(result);
  },
  async getProfile(token) {
    const result = await request('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return unwrapData(result);
  },
  async updateProfile(token, payload) {
    const result = await request('/auth/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return unwrapData(result);
  },
  async getAttempts(token) {
    const result = await request('/quiz/attempts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return unwrapData(result);
  },
};
