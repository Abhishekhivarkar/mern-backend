import { useLogout } from '../hooks/useLogout'
import { useAuthStore } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

export function LogoutButton() {
    const logoutMutation = useLogout()

    const clearUser = useAuthStore(
        state => state.clearUser
    )

    const navigate = useNavigate()

    const handleLogout = () =>{
        logoutMutation.mutate(undefined,{
            onSuccess:()=>{
                clearUser()
                navigate("/login")
            }
        })
    }
  return ( 
    <div>
        <button type='submit' onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}


