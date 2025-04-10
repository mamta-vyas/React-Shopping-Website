import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Header = () => {
  const { authToken, logout } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    alert('Logged out successfully!')
    navigate('/') // Redirect to login/home page
  }

  return (
    <header style={styles.header}>
      {authToken ? (
        <>
          <Link to="/products" style={styles.link}>All Products</Link>
          <Link to="/cart" style={styles.link}>🛒 Cart</Link>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      ) : (
        <Link to="/" style={styles.link}>Login</Link>
      )}
    </header>
  )
}

const styles = {
  header: {
    padding: '1rem',
    display: 'flex',
    gap: '20px',
    background: '#f5f5f5',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#2d7cf5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
}

export default Header
