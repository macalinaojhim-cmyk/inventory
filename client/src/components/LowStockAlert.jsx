import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

import { TriangleAlert, ArrowRight } from "lucide-react";

export default function () {
    const { getLowStock, rop, eoq } = useContext(ProductContext);
    return (
        <div className="low-stock-alert">
            <div className="low-stock-alert-header">
                <div className="low-stock-alert-logo">
                    <TriangleAlert size={30} color="red" />
                    <h2>Low Stock Alerts</h2>
                </div>

                <Link to="/products">
                    <div className="view-all-prod-btn"><p >View All</p><ArrowRight size={20} /></div>
                </Link>


            </div>
            <div className="low-stock-alert-content">

                {getLowStock().slice(0, 5).map((item) => (
                    <div>
                        <p>
                            <h4 className="item">{item.name}</h4>
                            <p className="stock-rop-eoq">Stock: <span style={{ color: 'red' }}>{item.stock}</span> | ROP: <span style={{ color: 'red' }}>{item.rop}</span> | Stock will last for <span style={{ color: 'red' }}>{item.dsr}</span> days</p>
                            <p className="stock-rop-eoq">Recommended Quantity: {item.eoq}</p>
                        </p>
                        <button >Reorder</button>
                    </div>
                ))}

            </div>
        </div>
    );
}