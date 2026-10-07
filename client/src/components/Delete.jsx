import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"


export default function Delete({id}){
    const {deleteModal, setDeleteModal, deleteProduct} = useContext(ProductContext);
    return(
        <div>
            <div className="delete-modal">
                <div className="delete-modal-content">
                    <h3>Delete?</h3>
                    <div>
                        <button onClick={() => deleteProduct(id)} >Yes</button>
                        <button onClick={() => setDeleteModal(false)}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}