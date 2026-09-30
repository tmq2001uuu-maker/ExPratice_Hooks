import { useEffect, useState } from 'react';

// Lazy initialization: chỉ đọc localStorage khi khởi tạo state.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Không thể lưu dữ liệu vào localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
