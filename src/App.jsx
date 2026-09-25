import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import EOQ from "./pages/EOQ"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductProvider } from "./context/ProductContext"

function App() {
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