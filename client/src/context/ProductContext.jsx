import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const [availabilityStatus, setAvailabilityStatus] = useState("In Stock");
  const [totalStock, setTotalStock] = useState();
  const [askModal, setAskModal] = useState(false);

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
        setProductList((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id
              ? { ...product, ...updatedProduct }
              : product
          )
        );
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

  function eoq(product){
    return Math.round(Math.sqrt((2 * product.daily_demand * 365 * product.ordering_cost) / product.holding_cost));
  }

  function eoi(product){
    return Math.round(eoq(product)/(product.daily_demand * 365) * 365);
  }

  function rop(product){
    return product.daily_demand * product.lead_time;
  }

  if (loading) {

  }

  return (
    <ProductContext.Provider value={{
      addProduct, editProduct, productList,
      deleteProduct,
      categories,

      eoq, eoi, rop,

      deleteModal, setDeleteModal,
      getTotalStocks
    }}>
      {children}
    </ProductContext.Provider>
  );
}