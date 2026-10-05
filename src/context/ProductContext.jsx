import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Others");
  const [categories, setCategories] = useState([]);
  const [availabilityStatus, setAvailabilityStatus] = useState("In Stock");
  const [totalStock, setTotalStock] = useState();
  const [askModal, setAskModal] = useState(false);

  const lowstocks = productList.filter(
        (product) =>
            product.availabilityStatus.toLowerCase() === "low stock"
    );

  const outOfStocks = productList.filter(
        (product) =>
            product.availabilityStatus.toLowerCase() === "out of stock"
    );

  useEffect(() => {
    async function getItems() {
      try {

        const response = await fetch("https://dummyjson.com/products?limit=190");

        const data = await response.json();
        setProductList(data.products);

        const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
      }
      catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, []);

  function addProduct(newProduct) {
    setProductList((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

  }

  function deleteProduct(productId){
    setProductList(productList.filter((product) => product.id !== productId));
  }

  function toggleStock(){
    const total = productList.reduce((sum, product) => sum + product.stock, 0);
    setTotalStock(total)
  }

  function editProduct(id){
    
  }

  if (loading) {

  }

  return (
    <ProductContext.Provider value={{
      productList,
      addProduct,
      loading,
      category, setCategory,
      categories,
      availabilityStatus, setAvailabilityStatus,

      totalStock,
      lowstocks,
      outOfStocks,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}