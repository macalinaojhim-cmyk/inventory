import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Optimized Inventory Management System</h1>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/eoq">EOQ Calculator</Link>
      </nav>
    </div>
  )
}