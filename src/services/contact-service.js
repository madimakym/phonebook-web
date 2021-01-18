import http from "../utils/api";

export const getAll = () => {
  return http.get("/contact");
};

export const get = (id) => {
  return http.get(`/contact/${id}`);
};

export const create = (data) => {
  return http.post("/contact", data);
};

export const update = (id, data) => {
  return http.put(`/contact/${id}`, data);
};

export const remove = (id) => {
  return http.delete(`/contact/${id}`);
};

export const removeAll = () => {
  return http.delete(`/contact`);
};

export const findByTitle = (title) => {
  return http.get(`/tutorials?title=${title}`);
};
