import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handelSubmit = () => {
    return alert(email, password);
  };

  return (
    <>
      <div className="m-5 ">
        <div className="mt-10 mb-10">
          <label htmlFor="">Email: </label>
          <input
            className="border-1 "
            type="email"
            name=""
            id=""
            required
            onChange={(email) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password: </label>
          <input className="border-1 " type="password" name="" id="" required />
        </div>
        <div>
          <button
            className="bg-blue-500 p-3 cursor-pointer"
            onClick={handelSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
