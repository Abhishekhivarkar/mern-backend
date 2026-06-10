import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <>
      <div className="relative min-h-screen flex justify-center items-center overflow-hidden bg-[#f8f9fc]">
        <div className="blur-2xl absolute w-100 h-100 bg-blue-100 rounded-full -top-40 -left-40"></div>
        <div className="blur-3xl absolute rounded-full w-100 h-100 bg-blue-100 -right-40 -bottom-40"></div>
        <div className=" blur-3xl rounded-full w-50 h-50 absolute bg-red-300 right-29 top-15"></div>
        <div className="w-70 h-70 absolute rounded-full bg-green-200 blur-2xl left-30 bottom-30">

        </div>
        <RegisterForm />
      </div>
    </>
  );
};
