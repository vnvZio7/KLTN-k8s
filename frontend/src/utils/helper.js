export const validateEmail = (email) => {
  // biểu thức chính quy (regular expression) dùng để kiểm tra định dạng email hợp lệ
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
