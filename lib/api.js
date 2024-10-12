const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://projectbe-1ytt.onrender.com';  // URL API cơ sở từ biến môi trường
import {logInAdmin}  from './apiProject'
// Hàm xử lý query params để gắn vào URL
const buildQueryParams = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : '';
};

// Hàm xử lý response chung
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

// Hàm gọi API GET với params (query parameters)
export const getData = async (endpoint, params = {}) => {
  const url = `${API_BASE_URL}/${endpoint}${buildQueryParams(params)}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

// Hàm gọi API POST với body
export const postData = async (endpoint, body = {}, params = {}) => {
  const url = `${API_BASE_URL}/${endpoint}${buildQueryParams(params)}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// Hàm gọi API PUT với body và params
export const putData = async (endpoint, body = {}, params = {}) => {
  const url = `${API_BASE_URL}/${endpoint}${buildQueryParams(params)}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

// Hàm gọi API DELETE với params
export const deleteData = async (endpoint, params = {}) => {
  const url = `${API_BASE_URL}/${endpoint}${buildQueryParams(params)}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};
export const callLoginAdmin = async (email, password) => {
    const url = `${logInAdmin}`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    return handleResponse(response);
  };