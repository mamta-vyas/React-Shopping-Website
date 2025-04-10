import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Header from './components/Header'
import Products from './pages/Products'

function App() {
  return (
  <div>
    <Header/>
      <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </div>
  )
}

export default App
