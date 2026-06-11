import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../store/auth.store";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  console.log(useLogin);
  console.log("inside handle submit");
  const handleSubmit = (e: React.FormEvent) => {
    console.log("handle clicked");
    e.preventDefault();

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          setUser(data.data);
        
          navigate("/");
        },
      },
    );
  };
  return (
     <form
            onSubmit={handleSubmit}
            className="h-screen flex items-center justify-center  "
          >
            <div className="border rounded-xl  p-5 bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl">
              <div className="flex flex-col items-center mb-4">
          
    
                <p className="text-[1rem] font-bold">Login</p>
                
              </div>
              <div className="flex flex-col font-semibold gap-4">
                <div className="flex flex-col ">
                  <label htmlFor="email">Email</label>
                  <div className="relative">
                    <MdOutlineEmail className="absolute left-2 top-1/2 -translate-y-1/2" />
    
                    <input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter your email"
                      className="border border-gray-300 rounded-full pl-8 py-1 outline-none"
                      onChange={e=>setEmail(e.target.value)}
                    />
                  </div>
                </div>
    
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
    
                  <div className="relative">
                    <RiLockPasswordLine className="absolute -translate-y-1/2 top-1/2 left-2" />
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      value={password}
                      placeholder="Enter your password"
                      className="pl-8 rounded-full py-1 border border-gray-300 outline-none"
                      onChange={e=>setPassword(e.target.value)}
                    />
    
                    <button
                      onClick={() => setShow(!show)}
                      className="absolute top-1/2 -translate-y-1/2 right-2"
                    >
                      {show ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
    
                <input
                  type="submit"
                  className="rounded px-1 py-1 bg-blue-600 text-white"
                />
                <p className="text-[9px] text-center">
                  Don't have an account?{" "}
                  <a href="/register" className="text-blue-600 font-bold">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </form>
  );
}

export default LoginForm;
