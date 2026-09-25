import { createContext, useEffect, useState } from "react";
import products from "../data/products";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

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

  function rop(product) {
    return product.dailyDemand * product.leadTime;
  }

  function eoq(product) {
    return Math.sqrt((2 * product.demand * product.orderingCost) / product.holdingCost);
  }

  

  if (loading) {

  }

  return (
    <ProductContext.Provider value={{
      productList,
      addProduct,
      rop,
      eoq,
      loading,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  );
}