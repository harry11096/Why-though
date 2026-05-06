const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const request = async (path, options = {}) => {
  const token = localStorage.getItem('quiz-admin-token');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const result = await response.json().catch(() => ({
    success: false,
    error: 'The server returned an unreadable response.'
  }));

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Request failed.');
  }

  return result.data;
};

export const loginAdmin = (credentials) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });

export const fetchMe = () => request('/auth/me');
export const fetchCategories = () => request('/admin/categories');
export const fetchQuestions = () => request('/admin/questions?includeInactive=true');

export const createQuestion = (payload) =>
  request('/admin/questions', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const updateQuestion = (questionId, payload) =>
  request(`/admin/questions/${questionId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

export const deleteQuestion = (questionId) =>
  request(`/admin/questions/${questionId}`, {
    method: 'DELETE'
  });

export const toggleQuestionStatus = (questionId) =>
  request(`/admin/questions/${questionId}/toggle`, {
    method: 'PATCH'
  });

export const bulkImportQuestions = (questions) =>
  request('/admin/questions/bulk', {
    method: 'POST',
    body: JSON.stringify({ questions })
  });
