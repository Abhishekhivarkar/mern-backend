import { useState }
    from "react"

import {
    useRegister
}
    from "../hooks/useRegister"

export const RegisterForm = ()=> {

    const registerMutation =
        useRegister()

    const [email, setEmail] =
        useState("")

    const [password, setPassword] =
        useState("")

    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault()

        registerMutation.mutate({

            email,

            password

        })

    }

    return (

        <form
            onSubmit={handleSubmit}
        >

            <input
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                placeholder="Password"
            />

            <button
                type="submit"
            >
                Register
            </button>

        </form>

    )

}