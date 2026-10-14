import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { LogOut, UserRound } from "lucide-react";

export default function Sidebar() {

    const { logout, user } = useContext(UserContext);

    return (
        <div className="sidebar">
            <h1>Inventory Management System</h1>
            <div className="sidebar-content">
                <nav>
                    <Link to="/">Dashboard</Link>
                    <Link to="/products">Products</Link>
                    <Link>Orders</Link>
                </nav>
            </div><button className="logout-btn" onClick={logout}>
                <div>
                    <div className="user-logo">
                        <UserRound size={20} color="black" />
                    </div>

                </div>
                <div style={{textAlign: 'start'}}>
                    <p style={{padding: '0%'}}>{user}</p>
                    <p style={{fontSize:'10px'}}>Admin</p>
                </div>
                <div className="logout-logo">
                    <LogOut size={20} />
                </div>
            </button>
        </div>
    );
}