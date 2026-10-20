import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [categories, setCategories] = useState([]);

  const getItems = async () => {
    try {
      const response = await fetch(
        "http://localhost/inventory/server/getProducts.php"
      );

      const data = await response.json();

      console.log("API data:", data);

      setProductList(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItems();
    getTransactions();
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(productList.map((product) => product.category))
    ];

    setCategories(uniqueCategories);
  }, [productList]);

  async function editProduct(id, updatedProduct) {
    try {
      const formData = new FormData();

      formData.append("id", id);
      formData.append("name", updatedProduct.name);
      formData.append("category", updatedProduct.category);
      formData.append("stock", updatedProduct.stock);
      formData.append("daily_demand", updatedProduct.daily_demand);
      formData.append("lead_time", updatedProduct.lead_time);
      formData.append("ordering_cost", updatedProduct.ordering_cost);
      formData.append("holding_cost", updatedProduct.holding_cost);

      const response = await fetch(
        "http://localhost/inventory/server/editProduct.php",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        await getItems();
      }

      return data;

    } catch (error) {
      console.error("Error editing product:", error);
    }
  }

  async function addProduct(product) {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("daily_demand", product.daily_demand);
    formData.append("lead_time", product.lead_time);
    formData.append("ordering_cost", product.ordering_cost);
    formData.append("holding_cost", product.holding_cost);

    const response = await fetch("http://localhost/inventory/server/addProduct.php", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    console.log(data);
    await getItems();
  };


  async function deleteProduct(id) {
    try {
      const response = await fetch(
        "http://localhost/inventory/server/deleteProduct.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `id=${id}`,
        }
      );

      const data = await response.json();

      console.log(data);

      setProductList((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );

      setDeleteModal(false);

    } catch (error) {
      console.error(error);
    }
  }

  function getTotalStocks(products) {
    return products.reduce((total, product) => {
      return total + Number(product.stock);
    }, 0);
  }

  function getLowStock() {
    return productList.filter(
      (product) => Number(product.stock) <= product.rop
    );
  }


  function getStatus(product) {
    const stock = Number(product.stock);
    const reorderPoint = Number(product.rop);

    if (stock <= 0) {
      return (
        <span style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '5px 10px',
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          Out of Stock
        </span>
      );
    } else if (stock <= reorderPoint) {
      return (
        <span style={{
          backgroundColor: '#fef3c7',
          color: '#d97706',
          padding: '5px 10px',
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          Low Stock
        </span>
      );
    } else {
      return (
        <span style={{
          backgroundColor: '#dcfce7',
          color: '#16a34a',
          padding: '5px 10px',
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          In Stock
        </span>
      );
    }
  }

  function getStatusValue(product){
    const stock = Number(product.stock);
    const reorderPoint = Number(product.rop);

    if(stock===0){
      return "outOfStock";
    }else if (stock <= reorderPoint){
      return "lowStock";
    } else {
      return "inStock";
    }
  }

  async function getTransactions(){
    try{
      const response = await fetch("http://localhost/inventory/server/transactions/getTransaction.php", {
        credentials: "include"
      });
      const data = await response.json();

      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
    }catch(error){
      console.error(error);
      setTransactions([]);
    }
  }

  async function addTransaction(productId, transactionType, quantity) {
    const formData = new FormData();

    formData.append("product_id", productId);
    formData.append("transaction_type", transactionType);
    formData.append("quantity", quantity);

    try {
      const response = await fetch(
        "http://localhost/inventory/server/transactions/addTransaction.php",
        {
          method: "POST",
          body: formData,
          credentials: "include"
        }
      );

      const data = await response.json();

      if (data.success) {
        await Promise.all([getTransactions(), getItems()]);
      }

      return data;

    } catch (error) {
      console.error("Error adding transaction:", error);

      return { success: false, message: "Could not reach the server" };
    }
  }

  return (
    <ProductContext.Provider value={{
      addProduct, editProduct, productList,
      deleteProduct,
      categories,

      transactions,
      getTransactions, addTransaction,

      getLowStock, getStatus, getStatusValue,

      deleteModal, setDeleteModal,
      getTotalStocks,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
}