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
            <Card title={"Total Products"}  />
            <Card title={"Total Stock"}  />
            <Card title={"Low Stocks"}  />
            <Card title={"Out Of Stocks"} />
        </div>
        <div className="products-table">
            <ProductTable />
        </div>
    </div>
)
}