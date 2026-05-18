import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/products'
import ProductDetail from '../pages/Productdetail'
import Contact from '../pages/contact'
import AdminLogin from '../pages/Adminlogin'



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  )
}