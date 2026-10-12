import {Clock} from "lucide-react"

export default function () {
    return (
        <div className="transactions">
            <div className="transaction-header">
                <Clock size={30} />
                <h2>Recent Transactions</h2>
            </div>
            <div className="recent-transact-content">
                
            </div>
        </div>
    );
}