import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Bouncy } from 'ldrs/react'

export default function ProductTable() {
    const { productList, addProduct, items, loading, categories, availabilityStatus, setAvailabilityStatus } = useContext(ProductContext);
    const [selected, setSelected] = useState("");

    function handleSelect(e) {
        setSelected(e.target.value)
    }

    return (
        <div className="table-container">
            {
                !loading ? <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Products</th>
                            <th>
                                Category
                                <select name="category" id="category" value={selected} onChange={handleSelect}>
                                    <option value="all">All</option>
                                    {categories.map((categ) => (
                                        <option key={categ} value={categ}>{categ}</option>
                                    ))}
                                </select>
                            </th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productList.filter((product) => selected === "" || selected === "all" || product.category === selected).map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td>₱{(product.price * 60).toFixed(2)}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <span className={
                                        product.availabilityStatus === "Out of Stock"
                                            ? "reorder-required"
                                            : product.availabilityStatus === "Low Stock"
                                                ? "low-stock"
                                                : "in-stock"
                                    }>
                                        {product.availabilityStatus}
                                    </span>
                                </td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <div className="loading">
                    <Bouncy
                        size="45"
                        speed="1.75"
                        color="black"
                    />
                </div>
            }
        </div>
    )
}