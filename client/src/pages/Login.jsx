import {User, Lock} from "lucide-react"

export default function Login() {

    return (
        <div className="main">
            <div className="login-container">
                <div className="login-content">
                    <div className="login-form">
                        <h1 className="header">Login Admin</h1>
                        <form >
                            <User size={20} className="input-icon" />
                            <input type="email" placeholder="Email Address" />
                            <Lock size={20} className="input-icon-lock"/>
                            <input type="password" placeholder="Password" />
                            <button className="login-btn">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}