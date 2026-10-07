import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

import { ProductContext } from "../context/ProductContext";
import { useContext, useEffect, useState } from "react";
import ProductTable from '../components/ProductTable';
import Card from '../components/Card';

export default function Dashbord() {

    const { productList,lowstocks,outOfStocks } = useContext(ProductContext);

return (
    <div>
        <h1 className="dashboard heading">Dashboard</h1>
        <div className="card-container">
            <Card title={"Total Products"} content={productList.length} />
            <Card title={"Total Stock"} content={productList.reduce((sum, product) => sum + product.stock, 0)} />
            <Card title={"Low Stocks"} content={lowstocks.length} />
            <Card title={"Out Of Stocks"} content={outOfStocks.length} />
        </div>
        <div className="products-table">
            <ProductTable />
        </div>
    </div>
)
}