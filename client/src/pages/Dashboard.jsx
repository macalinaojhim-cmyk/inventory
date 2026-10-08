import { Bouncy } from 'ldrs/react'
import { Box, Warehouse } from "lucide-react";
import 'ldrs/react/Bouncy.css'

import { ProductContext } from "../context/ProductContext";
import { useContext, useEffect, useState } from "react";
import ProductTable from '../components/ProductTable';
import Card from '../components/Card';

export default function Dashbord() {

    const { productList, getTotalStocks,
        eoq, eoi, rop } = useContext(ProductContext);



    return (
        <div>
            <h1 className="dashboard heading">Dashboard</h1>
            <div className="card-container">
                <div className='card total-stock-card'>
                    <div className='icon box'>
                        < Box size={30} color='blue' />
                    </div>
                    <div className='beside-icon'>
                        <h2>Total Products</h2>
                        <p className='num'>{productList.length}</p>
                    </div>
                </div>
                <div className='card'>
                    <div className='icon warehouse'>
                        <Warehouse size={30} />
                    </div>
                    <div className='beside-icon'>
                        <h2>Total Stocks</h2>
                        <p className='num'>{getTotalStocks(productList)}</p>
                    </div>
                </div>
                
                <Card title={"Low Stocks"} />
                <Card title={"Out Of Stocks"} />
            </div>
            <div className='dash-content'>
                <div className="products-table">
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
                </div>
                <div className='right-container'>

                </div>
            </div>

        </div>
    )
}