import { postData } from 'lib/api';
import { useState } from 'react';

// Custom hook để sử dụng login và lưu trữ state
export const useAPILoginAdmin = () => {
  const [loginData, setLoginData] = useState(null); // State lưu trữ dữ liệu đăng nhập
  const [error, setError] = useState(null);         // State lưu trữ lỗi nếu có
  const [loading, setLoading] = useState(false);    // State lưu trữ trạng thái loading

  const APILoginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const data = await postData(email, password);
      setLoginData(data); 
      setError(null);     
    } catch (err) {
      setError(err);      
    } finally {
      setLoading(false);  
    }
  };

  return { loginData, error, loading, APILoginAdmin };
};
