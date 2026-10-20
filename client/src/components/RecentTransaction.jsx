import { Clock, PackagePlus, PackageMinus } from "lucide-react"
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";


export default function RecentTransaction() {
    const { transactions } = useContext(ProductContext)

    const items = Array.isArray(transactions) ? transactions : [];

    function formatDate(value) {
        const date = new Date(String(value).replace(" ", "T"));

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        });
    }

    return (
        <div className="transactions">
            <div className="transaction-header">
                <Clock size={30} />
                <h2>Recent Transactions</h2>
            </div>
            <div className="recent-transact-content">
                {items.length === 0 ? (
                    <p className="transaction-empty">No transactions recorded yet.</p>
                ) : (
                    items.map((transac) => {
                        const isStockIn = transac.transaction_type === "STOCK IN";

                        return (
                            <div className="transactions-item" key={transac.id}>
                                <div className="transaction-left">
                                    <div className="transaction-logo">
                                        {isStockIn
                                            ? <PackagePlus size={20} color="#16a34a" />
                                            : <PackageMinus size={20} color="#dc2626" />}
                                    </div>
                                    <div className="type-item-name">
                                        <p className={isStockIn ? "stock-in" : "stock-out"}>
                                            {transac.transaction_type}
                                        </p>
                                        <p className="transaction-product">{transac.product_name}</p>
                                        <p className="transaction-quantity">
                                            {isStockIn ? "+" : "-"} {transac.quantity} units
                                            {transac.username ? ` by ${transac.username}` : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="date">
                                    {formatDate(transac.time)}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
