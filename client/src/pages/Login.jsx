import { User, Lock } from "lucide-react"
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

export default function Login() {
    const { login } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await login(e.target);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="main">
            <div className="login-container">
                <div className="login-content">
                    <div className="login-form">
                        <div className="header">
                            <h1>Inventory System</h1>
                            <p>Log In</p>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <User size={20} className="input-icon" />
                            <input className="login-input" type="email" name="email" placeholder="Email Address" />
                            <Lock size={20} className="input-icon-lock" />
                            <input className="login-input" type="password" name="password" placeholder="Password" />
                            <button type="submit" className="login-btn">{!loading ? "Log In" :
                                <Ring
                                    size="20"
                                    stroke="5"
                                    bgOpacity="0"
                                    speed="2"
                                    color="white"
                                />}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}