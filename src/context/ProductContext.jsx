import { createContext, useState } from "react";
import products from "../data/products";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState(products);
  const [productStatus, setProductStatus] = useState("");

  function addProduct(newProduct) {
    setProductList((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);
  }

  function rop(product){
    return product.dailyDemand * product.leadTime;
  }

  function eoq(product){
    return Math.sqrt((2 * product.demand * product.orderingCost) / product.holdingCost);
  }

  function status(product){
    if (product.stock < rop(product)){
      return ("Reorder Required");
    } else if ((product.stock / rop(product) * 100) < 140){
      return ("Low Stock");
    } else {
      return ("In Stock");
    }
  }

  return (
    <ProductContext.Provider value={{ productList, addProduct, rop, eoq, status }}>
      {children}
    </ProductContext.Provider>
  );
}