import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/useLogin"
import { useAuthStore } from "../store/auth.store"

function LoginForm() {
    const setUser = useAuthStore(
        state => state.setUser
    )
    const loginMutation = useLogin()
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
     const [password,setPassword] = useState("")
     console.log(useLogin)
console.log("inside handle submit")
    const handleSubmit = (e:React.FormEvent) =>{
        console.log("handle clicked")
        e.preventDefault()

        loginMutation.mutate({
            email,password
        },
    {
        onSuccess:(data) => {
            
            setUser(data.data)
            
            navigate("/")
        }
    })
    }
  return (
    <div className="flex justify-center items-center h-screen">


        <form onSubmit={handleSubmit} className="flex flex-col gap-2  rounded-lg p-2 bg-gray-700">
            
            <input type="email" name="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="border rounded p-1"/>

           
            <input type="password" name="password" value={password} placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} className="border rounded p-1" />
            
            <button type="submit" className="bg-gray-400 rounded hover:bg-blue-500 tranisition-transform duration-150 active:scale-98">
              Enter
            </button>
        </form>

    </div>
  )
}

export default LoginForm
