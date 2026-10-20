import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

export default function StockMovementModal({ product, defaultType = "STOCK IN", suggestedQuantity, onClose }) {
    const { addTransaction } = useContext(ProductContext);
    const [transactionType, setTransactionType] = useState(defaultType);
    const [quantity, setQuantity] = useState(suggestedQuantity ?? "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const isStockIn = transactionType === "STOCK IN";
    const amount = Number(quantity);
    const projectedStock = Number.isFinite(amount) && amount > 0
        ? (isStockIn ? Number(product.stock) + amount : Number(product.stock) - amount)
        : null;

    async function handleSubmit(e) {
        e.preventDefault();

        const amount = Number(quantity);

        if (!Number.isFinite(amount) || amount <= 0) {
            setError("Enter a quantity greater than zero.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const result = await addTransaction(product.id, transactionType, amount);

            if (result?.success) {
                onClose();
            } else {
                setError(result?.message ?? "Failed to record transaction.");
            }
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <div className="no-edit">
                    <h2>Stock Movement</h2>
                    <h3>{product.name}</h3>
                </div>
                <div className="modal-content">
                    <div className="edit-product-form">
                        <form onSubmit={handleSubmit}>
                            <div className="edit-fields-grid">
                                <div className="edit-field">
                                    <label htmlFor="movement-type">Type</label>
                                    <select
                                        id="movement-type"
                                        value={transactionType}
                                        onChange={(e) => setTransactionType(e.target.value)}
                                    >
                                        <option value="STOCK IN">Stock In</option>
                                        <option value="STOCK OUT">Stock Out</option>
                                    </select>
                                </div>

                                <div className="edit-field">
                                    <label htmlFor="movement-quantity">Quantity</label>
                                    <input
                                        id="movement-quantity"
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <p className="movement-current-stock">
                                Current stock: <strong>{product.stock}</strong> units
                                {projectedStock !== null && (
                                    <> &rarr; <strong>{projectedStock}</strong> units</>
                                )}
                            </p>

                            {error && <p className="movement-error">{error}</p>}

                            <div className="btn-container">
                                <button type="submit" className="add-btn" disabled={saving}>
                                    {saving ? "Saving..." : "Record Movement"}
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
