import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Inventory Management System</h1>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        
      </nav>
    </div>
  )
}