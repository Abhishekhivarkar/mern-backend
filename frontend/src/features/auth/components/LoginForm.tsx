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

    const handleSubmit = (e:React.FormEvent) =>{
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
    <div>
        <form onSubmit={handleSubmit}>

            <input type="email" name="email" value={email} placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>

            <input type="password" name="password" value={password} placeholder="Enter your password"  onChange={(e)=>setPassword(e.target.value)}/>

            <button type="submit">
    Enter
            </button>
        </form>

    </div>
  )
}

export default LoginForm
