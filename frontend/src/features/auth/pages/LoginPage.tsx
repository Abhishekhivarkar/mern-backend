import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className=" absolute w-100 h-100  rounded-full blur-3xl bg-violet-300 -left-40 -top-40  animate-[float_20s_ease-in-out_infinite]"></div>
      <div className=" absolute w-100 h-100  rounded-full bg-yellow-200 -right-50 -bottom-50 blur-3xl
      animate-[float_12s_ease-in-out_infinite]
      "></div>

      <div className="w-20 h-20 absolute bg-red-400 rounded-full bottom-[200px]  left-[200px] blur-2xl animate-[moveBlob_25s_ease-in-out_infinite]">

      </div>
      <div className="w-20 h-20 absolute bg-green-400 rounded-full top-[200px]  right-[300px] blur-2xl animate-[moveBlob_25s_ease-in-out_infinite]">

      </div>
      <LoginForm/>
    </div>
  )
}
