import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Sidebar() {

    const { logout } = useContext(UserContext);

    return (
        <div className="sidebar">
            <h1>Inventory Management System</h1>

            <div className="sidebar-content">
                <nav>
                    <Link to="/">Dashboard</Link>
                    <Link to="/products">Products</Link>
                </nav>

                
            </div><button onClick={logout}>
                    Log Out
                </button>
        </div>
    );
}