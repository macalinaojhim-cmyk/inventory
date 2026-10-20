import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

export default function EditProductModal({ product, onClose }) {
    const { categories, editProduct } = useContext(ProductContext);
    const [saving, setSaving] = useState(false);

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

        setSaving(true);

        try {
            const result = await editProduct(product.id, updatedProduct);

            if (result?.success) {
                onClose();
            } else {
                alert(result?.message ?? "Failed to update product");
            }
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="no-edit">
                    <h2>Edit Product</h2>
                    <h3>{product.name}</h3>
                </div>
                <div className="modal-content">
                    <div className="edit-product-form">
                        <form onSubmit={handleSubmit}>
                            <div className="edit-fields-grid">
                                <div className="edit-field">
                                    <label htmlFor="edit-name">Name</label>
                                    <input id="edit-name" type="text" name="name" defaultValue={product.name} required />
                                </div>

                                <div className="edit-field">
                                    <label htmlFor="edit-category">Category</label>
                                    <select id="edit-category" className="edit-select" name="category" defaultValue={product.category} required>
                                        {categories.map((categ) => (
                                            <option key={categ} value={categ}>
                                                {categ}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="edit-field">
                                    <label htmlFor="edit-stock">Stock</label>
                                    <input id="edit-stock" type="number" name="stock" defaultValue={product.stock} min="0" required />
                                </div>

                                <div className="edit-field">
                                    <label htmlFor="edit-daily-demand">Daily Demand</label>
                                    <input id="edit-daily-demand" type="number" name="daily_demand" defaultValue={product.daily_demand} min="0" required />
                                </div>

                                <div className="edit-field">
                                    <label htmlFor="edit-lead-time">Lead Time (days)</label>
                                    <input id="edit-lead-time" type="number" name="lead_time" defaultValue={product.lead_time} min="0" required />
                                </div>

                                <div className="edit-field">
                                    <label htmlFor="edit-ordering-cost">Ordering Cost</label>
                                    <input id="edit-ordering-cost" type="number" name="ordering_cost" defaultValue={product.ordering_cost} min="0" required />
                                </div>

                                <div className="edit-field">
                                    <label htmlFor="edit-holding-cost">Holding Cost</label>
                                    <input id="edit-holding-cost" type="number" name="holding_cost" defaultValue={product.holding_cost} min="0" required />
                                </div>
                            </div>

                            <div className="btn-container">
                                <button type="submit" className="add-btn" disabled={saving}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                                <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
