import { User, Lock } from "lucide-react"
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";

export default function Login() {
    const { login } = useContext(UserContext);
    function handleSubmit(e) {
        e.preventDefault();
        login(e.target);
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
                            <input type="email" name="email" placeholder="Email Address" />
                            <Lock size={20} className="input-icon-lock" />
                            <input type="password" name="password" placeholder="Password" />
                            <button type="submit" className="login-btn">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}