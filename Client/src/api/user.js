import api from "./axios";

const endPoint = "/api/users";

export const getAllUsers = async () => {
  const res = await api.get(`${endPoint}/`);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get(`${endPoint}/me`);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post(`${endPoint}/login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post(`${endPoint}/register`, data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post(`${endPoint}/logout`);
  return res.data;
};
