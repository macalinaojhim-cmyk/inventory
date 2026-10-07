import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Bouncy } from 'ldrs/react'
import { Trash, Pencil } from "lucide-react";
import Delete from "./Delete";


export default function ProductTable() {
    const { productList, loading, deleteModal, setDeleteModal, categories, editProduct } = useContext(ProductContext);
    const [selected, setSelected] = useState("");
    const [editModal, setEditModal] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [newName, setNewName] = useState("");
    const [newCategory, setNewCategory] = useState(null);



    function handleSelect(e) {
        setSelected(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const updatedProduct = {
            name: formData.get("name"),
            category: formData.get("category"),
            stock: Number(formData.get("stock")),
            daily_demand: Number(formData.get("daily_demand")),
            lead_time: Number(formData.get("lead_time")),
            ordering_cost: Number(formData.get("ordering_cost")),
            holding_cost: Number(formData.get("holding_cost"))
        };

        await editProduct(editModal.id, updatedProduct);

        setEditModal(null);
    }

    function handleClick(id) {
        setDeleteId(id);
        setDeleteModal(true);

    }

    return (
        <div className="table-container">
            {
                !loading ?

                    <table>
                        <thead>
                            <tr>
                                <th>Products</th>
                                <th>
                                    Category
                                    <select name="category" id="category" value={selected} onChange={handleSelect}>
                                        <option value="all">All</option>

                                    </select>
                                </th>

                                <th>Stock</th>
                                <th>Daily Demand</th>
                                <th>Lead Time(Days)</th>
                                <th>Ordering Cost</th>
                                <th>Holding Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productList.filter((product) => selected === "" || selected === "all" || product.category === selected).map((product) => (
                                <tr key={product.id}>

                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.daily_demand}</td>
                                    <td>{product.lead_time}</td>
                                    <td>{product.ordering_cost}</td>
                                    <td>{product.holding_cost}</td>
                                    <td></td>
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
                            <h3>{editModal.name}</h3>
                        </div>
                        <div className="current-new">
                            <h3>Current Values</h3>
                            <h3>New Values</h3>
                        </div>
                        <div className="modal-content">
                            <div>
                                <p>Name: {editModal.name}</p>
                                <p>Category: {editModal.category}</p>
                                <p>Stock: {editModal.stock}</p>
                                <p>Daily Demand</p>
                                <p>Lead Time</p>
                                <p>Ordering Cost</p>
                                <p>Holding Cost</p>
                            </div>

                            <div className="edit-product-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="new-values">
                                        <input type="text" name="name" />

                                        <select className="edit-select" name="category">
                                            {categories.map((categ) => (
                                                <option key={categ} value={categ}>
                                                    {categ}
                                                </option>
                                            ))}
                                        </select>

                                        <input type="number" name="stock" />

                                        <input type="number" name="daily_demand" />

                                        <input type="number" name="lead_time" />

                                        <input type="number" name="ordering_cost" />

                                        <input type="number" name="holding_cost" />
                                    </div>

                                    <div className="btn-container">
                                        <button type="submit">Submit</button>
                                        <button type="button" onClick={() => setEditModal(null)} >Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            {deleteModal && (
                <Delete id={deleteId} />
            )}
        </div>
    )
}