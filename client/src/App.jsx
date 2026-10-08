import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductProvider } from "./context/ProductContext"
import { UserContext } from "./context/UserContext"
import { useContext, useEffect } from "react";
import Login from "./pages/Login"
import { Bouncy } from 'ldrs/react'

function App() {

  const { isLoggedIn, loading } = useContext(UserContext);


  if (loading) {
    return <div className="loading">
      <Bouncy
        size="45"
        speed="1.75"
        color="black"
      />
    </div>;
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="content">
          <aside>
            <Sidebar />
          </aside>

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App