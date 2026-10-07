import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const [category, setCategory] = useState("Others");
  const [categories, setCategories] = useState([]);
  const [availabilityStatus, setAvailabilityStatus] = useState("In Stock");
  const [totalStock, setTotalStock] = useState();
  const [askModal, setAskModal] = useState(false);


  useEffect(() => {
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
    getItems();
  }, []);



  function addProduct(newProduct) {
    setProductList((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

  }


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

  if (loading) {

  }

  return (
    <ProductContext.Provider value={{
      productList,
      deleteProduct,

      deleteModal, setDeleteModal,

    }}>
      {children}
    </ProductContext.Provider>
  );
}