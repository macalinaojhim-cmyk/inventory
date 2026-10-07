import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'
import ProductTable from "../components/ProductTable";

function Products() {
  const [showModal, setShowModal] = useState(false);
  const { productList, addProduct, loading, categories, availabilityStatus, setAvailabilityStatus } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Others");
  const [dailyDemand, setDaiyDemand] = useState(0);
  const [leadTime, setLeadTime] = useState(0);
  const [orderingCost, setSetOrderingCost] = useState(0);
  const [holdingCost, setHoldingCost] = useState("0");
  const [stock, setStock] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      name: name,
      category: category,
      daily_demand: Number(dailyDemand),
      lead_time: Number(leadTime),
      ordering_cost: Number(orderingCost),
      holding_cost: Number(holdingCost),
      stock: Number(stock),

    };

    addProduct(newProduct);

    setName("");
    setCategory("");
    setDaiyDemand("");
    setDaiyDemand("");
    setSetOrderingCost("");
    setHoldingCost("");
    setStock("");

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
                      <option value="Others">Others</option>
                      {categories.map((categ) => (
                        <option key={categ} value={categ}>{categ}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Daily Demand</label>
                    <input
                      id="daily_demand"
                      type="number"
                      value={dailyDemand}
                      onChange={(e) => setDaiyDemand(e.target.value)}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Lead Time (days)</label>
                    <input
                      id="price"
                      type="number"
                      value={leadTime}
                      onChange={(e) => setLeadTime(e.target.value)}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Ordering Cost</label>
                    <input
                      id="price"
                      type="number"
                      value={orderingCost}
                      onChange={(e) => setSetOrderingCost(e.target.value)}
                      placeholder="1.4"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Holding Cost</label>
                    <input
                      id="price"
                      type="number"
                      value={holdingCost}
                      onChange={(e) => setHoldingCost(e.target.value)}
                      placeholder="0.5"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
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
