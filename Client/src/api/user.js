import api from "./axios";

const endPoint = "/api/users";

export const getAllUsers = async () => {
  try {
    const res = await api.get(`${endPoint}/`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status
    };
  }
};

export const getDeletedUsers = async () => {
  try {
    const res = await api.get(`${endPoint}/deleted`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status
    };
  }
};

export const getMe = async () => {
  try {
    const res = await api.get(`${endPoint}/me`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status
    };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post(`${endPoint}/login`, data);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status,
    };
  }
};

export const registerUser = async (data) => {
  try {
    const res = await api.post(`${endPoint}/register`, data);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status,
    };
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post(`${endPoint}/logout`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status,
    };
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await api.put(`${endPoint}/delete/${id}`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status,
    };
  }
};

export const undeleteUser = async (id) => {
  try {
    const res = await api.put(`${endPoint}/un-delete/${id}`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status,
    };
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await api.put(`${endPoint}/edit/${id}`, data);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status
    };
  }
};

export const awake = async () => {
  try {
    const res = await api.get(`${endPoint}/awake`);
    return { ok: true, data: res.data, status: res.status };
  } catch (error) {
    return {
      ok: false,
      error: error.response?.data?.message || error.message,
      status: error.status
    };
  }
};
