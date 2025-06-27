import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div>Welcome to TCinema</div>
      {children}
    </>
  );
};

export default AuthLayout;
