import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Bouncy } from 'ldrs/react'
import { Trash, Pencil, Box, Warehouse, TriangleAlert } from "lucide-react";
import Delete from "./Delete";
import EditProductModal from "./EditProductModal";


export default function ProductTable() {
    const { productList, loading, deleteModal, setDeleteModal, categories, getStatus, getStatusValue, getTotalStocks, getLowStock } = useContext(ProductContext);
    const [selected, setSelected] = useState("");
    const [selectedStat, setSelectedStat] = useState("");
    const [editModal, setEditModal] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    function handleSelect(e) {
        setSelected(e.target.value)
    }

    function handleClick(id) {
        setDeleteId(id);
        setDeleteModal(true);

    }

    return (
        <div className="product-table">
            <div className="card-container product-table-cards">
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
            <div className="table-container">
                {
                    !loading ?

                        <table>
                            <thead>
                                <tr id="head-row">
                                    <th>Products</th>
                                    <th>
                                        Category
                                        <select
                                            className="table-filter-select"
                                            name="category"
                                            aria-label="Filter by category"
                                            value={selected}
                                            onChange={handleSelect}
                                        >
                                            <option value="all">All</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </th>

                                    <th>Stock</th>
                                    <th>Daily Demand</th>
                                    <th>Lead Time(Days)</th>
                                    <th>Ordering Cost</th>
                                    <th>Holding Cost</th>
                                    <th>EOQ</th>
                                    <th>EOI</th>
                                    <th>ROP</th>
                                    <th>
                                        Status
                                        <select
                                            className="table-filter-select"
                                            name="status"
                                            aria-label="Filter by status"
                                            value={selectedStat}
                                            onChange={(e) => setSelectedStat(e.target.value)}
                                        >
                                            <option value="all">All</option>
                                            <option value="inStock">In Stock</option>
                                            <option value="lowStock">Low Stock</option>
                                            <option value="outOfStock">Out Of Stock</option>
                                        </select>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {productList.length === 0 ? (
                                    <tr>
                                        <td colSpan="12">No products found.</td>
                                    </tr>
                                ) : (
                                    (productList.filter((product) => selected === "" ||
                                        selected === "all" ||
                                        product.category === selected
                                    ).filter((prod) => getStatusValue(prod) === selectedStat || selectedStat === "" || selectedStat === "all")).map((product) => (
                                        <tr key={product.id}>

                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.daily_demand}</td>
                                            <td>{product.lead_time}</td>
                                            <td>{product.ordering_cost}</td>
                                            <td>{product.holding_cost}</td>
                                            <td>{product.eoq}</td>
                                            <td>{product.eoi}</td>
                                            <td>{product.rop}</td>
                                            <td>{getStatus(product)}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="table-action-btn"
                                                    aria-label={`Edit ${product.name}`}
                                                    onClick={() => setEditModal(product)}
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="table-action-btn"
                                                    aria-label={`Delete ${product.name}`}
                                                    onClick={() => handleClick(product.id)}
                                                >
                                                    <Trash size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
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
                    <EditProductModal
                        product={editModal}
                        onClose={() => setEditModal(null)}
                    />
                )}
                {deleteModal && (
                    <Delete id={deleteId} />
                )}
            </div>
        </div>

    )
}
