import { ProductContext } from "../context/ProductContext";
import { useContext, useState } from "react";

export default function Dashbord() {

    const { productList, rop, status } = useContext(ProductContext);

    return (
        <div>
            <h1 className="dashboard heading">Dashboard</h1>
            <div className="card-container">
                <div className="card total-product">
                    <h2>Total Products</h2>
                    <p>{productList.length}</p>
                </div>
                <div className="card total-stock">
                    <h2>Total Stock</h2>
                    <p>123</p>
                </div>
                <div className="card stock-status">
                    <h2>Low Stock</h2>
                    <p>0</p>
                </div>
            </div>
            <div className="products-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Reorder Point</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>₱{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{rop(product)}</td>
                                <td>
                                    <span className={
                                        status(product) === "Reorder Required"
                                            ? "reorder-required"
                                            : status(product) === "Low Stock"
                                                ? "low-stock"
                                                : "in-stock"
                                    }>
                                        {status(product)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}