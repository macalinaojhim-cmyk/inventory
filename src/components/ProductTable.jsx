import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Bouncy } from 'ldrs/react'
import { Trash, Pencil } from "lucide-react";


export default function ProductTable() {
    const { productList, addProduct, deleteProduct, items, loading, categories, availabilityStatus, setAvailabilityStatus } = useContext(ProductContext);
    const [selected, setSelected] = useState("");
    const [editModal, setEditModal] = useState(null);

    function handleSelect(e) {
        setSelected(e.target.value)
    }

    function handleClick(id) {
        deleteProduct(id)
    }

    return (
        <div className="table-container">
            {
                !loading ?

                    <table>
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
                                    <td>₱{(product.price * 58.7).toFixed(2)}</td>
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
                                    <td>
                                        <button onClick={() => setEditModal(product)}>
                                            <Pencil size={15} />
                                        </button>
                                        <button onClick={() => handleClick(product.id)}>
                                            <Trash size={15} />
                                        </button>
                                    </td>
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
            {editModal && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        <div className="no-edit">
                            <h2>Edit Product</h2>
                            <p>ID: {editModal.id}</p>
                            <h3>Product: {editModal.title}</h3>
                        </div>
                        <div className="modal-content">
                            <div>
                                <p>Category: {editModal.category}</p>
                                <p>Price: ₱{(editModal.price * 58.7).toFixed(2)}</p>
                                <p>Stock: {editModal.stock}</p>
                            </div>

                            <div className="edit-product-form">
                                <form>

                                    <label htmlFor="">
                                        New Category:
                                        <select className="edit-select" name="" id="">
                                            {categories.map((categ) => (
                                                <option key={categ} value={categ}>{categ}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <label htmlFor="">
                                        New Price:
                                        <input type="number" name="new-name" />
                                    </label>

                                    <label htmlFor="">
                                        New Stock:
                                        <input type="number" name="new-stock" />
                                    </label>

                                </form>
                            </div>
                        </div>

                        <button onClick={() => setEditModal(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}