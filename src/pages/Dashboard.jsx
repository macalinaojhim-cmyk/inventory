import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

import { ProductContext } from "../context/ProductContext";
import { useContext, useState } from "react";
import ProductTable from '../components/ProductTable';
import Card from '../components/Card';

export default function Dashbord() {
    const { productList, rop, status, loading, totalStock, availabilityStatus } = useContext(ProductContext);

    return (
        <div>
            <h1 className="dashboard heading">Dashboard</h1>
            <div className="card-container">
                <Card title={"Total Products"} content={productList.length}/>
                <Card title={"Total Stock"} content={productList.reduce((sum, product) => sum + product.stock, 0)} />
                <div className="card stock-status">
                    <h2>Low Stock</h2>
                    <div>
                       {productList.filter((product) => product.availabilityStatus.toLowerCase() === "low stock").map((product) => (
                                    <div className='stock-list' key={product.id}>
                                        <p>* {product.title}</p>
                                </div>
                                ))} 
                    </div>
                </div>
            </div>
            <div className="products-table">
                <ProductTable />
            </div>
        </div>
    )
}