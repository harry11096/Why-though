const API_BASE_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
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

const requestAdmin = async (path, options = {}) => {
  const token = localStorage.getItem('whythough-admin-token');
  const result = await request(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return result.data;
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
  async getCategories() {
    const result = await request('/quiz/categories');
    return unwrapData(result);
  },
  async getQuestions(token, category) {
    const result = await request(`/quiz/questions?category=${encodeURIComponent(category)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return unwrapData(result);
  },
  async submitQuiz(token, payload) {
    const result = await request('/quiz/submit', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return unwrapData(result);
  },
};

export const loginAdmin = (credentials) =>
  requestAdmin('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const fetchMe = () => requestAdmin('/auth/me');
export const fetchCategories = () => requestAdmin('/admin/categories');
export const fetchQuestions = () => requestAdmin('/admin/questions?includeInactive=true');

export const createQuestion = (payload) =>
  requestAdmin('/admin/questions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateQuestion = (questionId, payload) =>
  requestAdmin(`/admin/questions/${questionId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteQuestion = (questionId) =>
  requestAdmin(`/admin/questions/${questionId}`, {
    method: 'DELETE',
  });

export const toggleQuestionStatus = (questionId) =>
  requestAdmin(`/admin/questions/${questionId}/toggle`, {
    method: 'PATCH',
  });

export const bulkImportQuestions = (questions) =>
  requestAdmin('/admin/questions/bulk', {
    method: 'POST',
    body: JSON.stringify({ questions }),
  });
