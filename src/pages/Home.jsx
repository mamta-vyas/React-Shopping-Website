import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products')
        setProducts(res.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch products.', err)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>All Products</h1>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h2 style={styles.title}>{product.title}</h2>
            <p style={styles.price}>${product.price}</p>
            <button
              onClick={() => navigate(`/products/${product.id}`)}
              style={styles.button}
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '220px',
    height: '380px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    height: '150px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '10px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#0a74da',
  },
  button: {
    marginTop: 'auto',
    padding: '10px',
    backgroundColor: '#0a74da',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}

export default Home
