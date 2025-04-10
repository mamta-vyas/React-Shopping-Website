import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Header from './components/Header'

function App() {
  return (
  <div>
    <Header/>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </div>
  )
}

export default App
