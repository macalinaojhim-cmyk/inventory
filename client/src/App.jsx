import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductProvider } from "./context/ProductContext"
import { UserContext } from "./context/UserContext"
import { useContext } from "react";
import Login from "./pages/Login"

function App() {
  const {login} = useContext(UserContext)

  if(!login){
    return (
      <div>
        <Login />
      </div>
    )
  }
  return (
   < ProductProvider>
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
  )
}

export default App