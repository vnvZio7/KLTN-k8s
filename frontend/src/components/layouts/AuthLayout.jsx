const AuthLayout = ({ children }) => {
  return (
    <>
      <div className=" w-full h-screen bg-black/40">
        <div className="w-fit bg-white/90 m-auto rounded p-15 mt-30 font-medium text-black">
          <div className="flex flex-nowrap text-2xl items-center justify-center">
            <p>
              Welcome to <span className="text-red-500">T</span>Cinema
            </p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
