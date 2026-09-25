import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'
import ProductTable from "../components/ProductTable";

function Products() {
  const [showModal, setShowModal] = useState(false);
  const { productList, addProduct, loading, category, setCategory, categories, availabilityStatus, setAvailabilityStatus } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: productList.length + 1,
      title: name,
      category: category,
      price: Number(price),
      stock: Number(stock),
      availabilityStatus: availabilityStatus
    };

    addProduct(newProduct);

    setName("");
    setCategory("");
    setPrice("");
    setStock("");

    setShowModal(false);
  }

  if (loading) {

  }

  return (
    <div>
      <div className="heading">
        <h1>Products</h1>
        <button onClick={() => setShowModal(true)}>Add Product</button>
      </div>

      <ProductTable />

      {showModal && (
        <div className="add-product-modal">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>Add Product</h2>
                <p>Enter the product information below.</p>
              </div>

              <button
                type="button"
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="form-group">
                  <label htmlFor="product-name">Product Name</label>
                  <input
                    id="product-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="others">Others</option>
                      {categories.map((categ) => (
                        <option key={categ} value={categ}>{categ}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="₱0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Initial Stock</label>
                  <input
                    id="stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <select value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)} name="availabilityStatus" id="availabilityStatus">
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="add-btn">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
