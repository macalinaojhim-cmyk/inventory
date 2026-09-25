import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

function Products() {
  const [showModal, setShowModal] = useState(false);
  const { productList, addProduct, items, loading, categories } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");

  const [selected, setSelected] = useState("");

  function handleSelect(e){
    setSelected(e.target.value)
  }

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
          {productList.filter((product) => selected === "all" || product.category === selected).map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>₱{product.price}</td>
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
      </table>

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
                      <option value="">Select category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Food">Food</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Others">Others</option>
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
                  <select onChange={(e) => setAvailabilityStatus(e.target.value)} name="availabilityStatus" id="availabilityStatus">
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
