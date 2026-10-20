import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

const PRODUCTS_PER_PAGE = 10;

function getPageNumbers(current, total, span = 1) {
  const pages = [];
  const start = Math.max(1, current - span);
  const end = Math.min(total, current + span);

  if (start > 1) pages.push(1);
  if (start > 2) pages.push("...");

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (end < total - 1) pages.push("...");
  if (end < total) pages.push(total);

  return pages;
}

function Products() {
  const [showModal, setShowModal] = useState(false);
  const { productList, addProduct, loading, categories, getStatus, getStatusValue } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Others");
  const [dailyDemand, setDaiyDemand] = useState(0);
  const [leadTime, setLeadTime] = useState(0);
  const [orderingCost, setSetOrderingCost] = useState(0);
  const [holdingCost, setHoldingCost] = useState("0");
  const [stock, setStock] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryOptions = [...new Set(["Others", ...categories])];

  const query = search.trim().toLowerCase();

  const filteredProducts = productList.filter((product) => {
    const matchesSearch =
      query === "" ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "" || getStatusValue(product) === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const pageStart = (page - 1) * PRODUCTS_PER_PAGE;
  const pageEnd = Math.min(pageStart + PRODUCTS_PER_PAGE, filteredProducts.length);
  const paginatedProducts = filteredProducts.slice(pageStart, pageEnd);

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
    setCategory("Others");
    setDaiyDemand("");
    setLeadTime("");
    setSetOrderingCost("");
    setHoldingCost("");
    setStock("");

    setShowModal(false);
  }

  return (
    <div>
      <div className="heading">
        <h1>Products</h1>
        <button onClick={() => setShowModal(true)}>Add Product</button>
      </div>


      <div className="products-table">
        <div className="table-nav">
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="table-filter">
            <select
              name="category-filter"
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categoryOptions.map((categ) => (
                <option key={categ} value={categ}>
                  {categ}
                </option>
              ))}
            </select>

            <select
              name="status-filter"
              id="status-filter"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="inStock">In Stock</option>
              <option value="lowStock">Low Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="products-table-table">
          {loading ? (
            <div className="loading">
              <Bouncy
                size="45"
                speed="1.75"
                color="black"
              />
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Daily Demand</th>
                  <th>Lead Time</th>
                  <th>Ordering Cost</th>
                  <th>Holding Cost</th>
                  <th>EOQ</th>
                  <th>EOI</th>
                  <th>ROP</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan="11">No products found.</td>
                  </tr>
                ) : (
                  paginatedProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="product-name">{product.name}</td>
                      <td>
                        <span className="category-badge">{product.category}</span>
                      </td>
                      <td>{product.stock}</td>
                      <td>{product.daily_demand}</td>
                      <td>{product.lead_time} days</td>
                      <td>₱{Number(product.ordering_cost).toLocaleString()}</td>
                      <td>₱{Number(product.holding_cost).toLocaleString()}</td>
                      <td>{product.eoq}</td>
                      <td>{product.eoi}</td>
                      <td>{product.rop}</td>
                      <td>
                        {getStatus(product)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {filteredProducts.length > 0 && (
          <div className="table-pagination">
            <p className="pagination-info">
              Showing {pageStart + 1}-{pageEnd} of {filteredProducts.length} products
            </p>

            <div className="pagination-controls">
              <button
                type="button"
                onClick={() => setCurrentPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>

              {getPageNumbers(page, totalPages).map((pageNumber, index) =>
                pageNumber === "..." ? (
                  <span key={`gap-${index}`} className="ellipsis">...</span>
                ) : (
                  <button
                    key={pageNumber}
                    type="button"
                    className={pageNumber === page ? "active" : ""}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => setCurrentPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>





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
                      {categoryOptions.map((categ) => (
                        <option key={categ} value={categ}>{categ}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="daily-demand">Daily Demand</label>
                    <input
                      id="daily-demand"
                      type="number"
                      value={dailyDemand}
                      onChange={(e) => setDaiyDemand(e.target.value)}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lead-time">Lead Time (days)</label>
                    <input
                      id="lead-time"
                      type="number"
                      value={leadTime}
                      onChange={(e) => setLeadTime(e.target.value)}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ordering-cost">Ordering Cost</label>
                    <input
                      id="ordering-cost"
                      type="number"
                      value={orderingCost}
                      onChange={(e) => setSetOrderingCost(e.target.value)}
                      placeholder="1.4"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="holding-cost">Holding Cost</label>
                    <input
                      id="holding-cost"
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
