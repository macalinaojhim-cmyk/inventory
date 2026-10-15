import { Clock, PackagePlus, PackageMinus } from "lucide-react"
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";


export default function () {
    const { transactions } = useContext(ProductContext)

    return (
        <div className="transactions">
            <div className="transaction-header">
                <Clock size={30} />
                <h2>Recent Transactions</h2>
            </div>
            <div className="recent-transact-content">
                {transactions.map((transac) => (
                    <div className="transactions-item">
                        <div className="transaction-left">
                            <div className="transaction-logo">
                                {transac.transaction_type === "STOCK IN" ? <PackagePlus size={35} color="green" /> : <PackageMinus size={35} color="red" />}
                            </div>
                            <div className="type-item-name">
                                {transac.transaction_type === "STOCK IN" ? <p style={{color: 'green'}}>{transac.transaction_type}</p> :  <p style={{color:'red'}}>{transac.transaction_type}</p> }
                                <p>{transac.product_name}</p>
                                <p>{transac.transaction_type === "STOCK IN" ? <p>+ {transac.quantity} units</p> : <p>- {transac.quantity} units </p>}</p> 
                            </div>
                        </div>
                        <div className="date">
                            {transac.time}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}