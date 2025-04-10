import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CartContext } from '../context/CartContext'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.error('Failed to fetch product', err)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  if (!product) return <p>Loading...</p>

  return (
    <div className="product-detail-container">
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
