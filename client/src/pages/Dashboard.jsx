
import { Link } from "react-router-dom";
import { Box, Warehouse, TriangleAlert, MoveRight, ArrowRight } from "lucide-react";
import 'ldrs/react/Bouncy.css'

import { ProductContext } from "../context/ProductContext";
import { useContext, useEffect, useState } from "react";

export default function Dashbord() {

    const { productList, getTotalStocks, getLowStock, lowStocks,
        eoq, eoi, rop } = useContext(ProductContext);



    return (
        <div>
            <h1 className="dashboard heading">Dashboard</h1>
            <div className="card-container">
                <div className='card total-product-card'>
                    <div className='icon box'>
                        < Box size={30} color='blue' />
                    </div>
                    <div className='beside-icon'>
                        <h2>Total Products</h2>
                        <p className='num'>{productList.length}</p>
                    </div>
                </div>
                <div className='card total-stock-card'>
                    <div className='icon warehouse'>
                        <Warehouse size={30} />
                    </div>
                    <div className='beside-icon'>
                        <h2>Total Stocks</h2>
                        <p className='num'>{getTotalStocks(productList)}</p>
                    </div>
                </div>

                <div className='card low-stock-card'>
                    <div className='icon alert'>
                        <TriangleAlert size={30} color='red' />
                    </div>
                    <div className='beside-icon'>
                        <h2>Low Stock Items</h2>
                        <p className="num">
                            {getLowStock().length}
                        </p>
                    </div>
                </div>
            </div>
            <div className='dash-content'>
                <div className="dash-products-table">
                    <h2>Products</h2>
                    <table className='dash-table'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>EOQ</th>
                                <th>EOI</th>
                                <th>Reorder Point</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productList.slice(0, 5).map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.stock}</td>
                                        <td>{eoq(product)}</td>
                                        <td>{eoi(product)}-Days</td>
                                        <td>{rop(product)}</td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Link style={{width: '170px'}} to="/products">
                        <div style={{display: 'flex', gap: '10px'}}>
                            <p>View All Producst</p>
                            <MoveRight size={15} />
                        </div>
                    </Link>
                </div>
                <div className='right-container'>
                    <div className="low-stock-alert">
                        <div className="low-stock-alert-header">
                            <div className="low-stock-alert-logo">
                                <TriangleAlert size={30} color="red" />
                                <h2>Low Stock Alerts</h2>
                            </div>

                            <a href="">
                                <div className="view-all-prod-btn"><p >View All</p><ArrowRight size={20} /></div>
                            </a>
                        </div>
                        <div className="low-stock-alert-content">

                            {getLowStock().slice(0, 5).map((item) => (
                                <div>
                                    <p>
                                        <h4 className="item">{item.name}</h4>
                                        <p className="stock-rop-eoq">Stock: {item.stock} | ROP: {rop(item)}</p>
                                        <p className="stock-rop-eoq">Recommended Quantity: {eoq(item)}</p>
                                    </p>
                                    <button >Reorder</button>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}