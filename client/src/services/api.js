const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getToken = () => localStorage.getItem("token");

export const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const handleResponse = async (r) => {
  const data = await r.json();
  if (r.status === 401) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  }
  return data;
};

export const api = {
  register: (data) =>
    fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  login: (data) =>
    fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  uploadResume: (formData) =>
    fetch(`${BASE}/resume/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    }).then(handleResponse),

  askQuestion: (question) =>
    fetch(`${BASE}/resume/ask`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ question }),
    }).then(handleResponse),
};