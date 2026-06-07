import { useState } from "react";

import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.mutate(
      {
        email,

        password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  return (
    <div className="flex justify-center items-center h-screen ">
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-gray-700  rounded-lg p-2 ">
      <input 
      className="border rounded p-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
      className="border rounded p-1"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button className="bg-gray-400 rounded hover:bg-blue-500 tranisition-transform duration-150 active:scale-98"type="submit">Register</button>
    </form>
    </div>
  );
};
