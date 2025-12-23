import api from "./axios";

const endPoint = "/api/users";

export const getAllUsers = async () => {
  try {
    const res = await api.get(`${endPoint}/`);
    return { ok: true, data: res.data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};

export const getMe = async () => {
  try {
    const res = await api.get(`${endPoint}/me`);
    return { ok: true, data: res.data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post(`${endPoint}/login`, data);
    return { ok: true, data: res.data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};

export const registerUser = async (data) => {
  try {
    const res = await api.post(`${endPoint}/register`, data);
    return { ok: true, data: res.data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post(`${endPoint}/logout`);
    return { ok: true, data: res.data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api.put(`${endPoint}/delete/${id}`);
    return { ok: true, data: res.data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};

export const undeleteUser = async (id) => {
  try {
    const res = await api.put(`${endPoint}/un-delete/${id}`);
    return { ok: true, data: res.data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message 
    };
  }
};