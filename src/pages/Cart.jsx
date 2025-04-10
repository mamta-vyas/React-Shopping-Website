import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useContext(CartContext)

  const [showPopup, setShowPopup] = useState(false)

  const handleRemove = (id) => {
    removeFromCart(id)
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return
    updateQuantity(id, quantity)
  }

  const handleClear = () => {
    clearCart()
  }

  const handleCheckout = () => {
    clearCart()
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 4000)
  }

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)

  return (
    <div style={{ padding: '2rem', position: 'relative' , color: 'darkblue'}}>
      <h2>🛒 Your Shopping Cart</h2>

      {showPopup && (
        <div style={styles.popup}>
           Order placed successfully!
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items" style={styles.grid}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.card}>
                <img src={item.image} alt={item.title} style={styles.image} />
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.price}>Price: ${item.price}</p>

                <div style={styles.quantityRow}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>

                <p style={styles.total}>
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button onClick={() => handleRemove(item.id)} style={styles.removeBtn}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h3>Total Amount: ${totalPrice}</h3>
            <div style={styles.buttonGroup}>
              <button onClick={handleClear} style={styles.clearBtn}>Clear Cart</button>
              <button onClick={handleCheckout} style={styles.checkoutBtn}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '250px',
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  image: {
    height: '100px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '16px',
    margin: '10px 0',
  },
  price: {
    fontSize: '14px',
  },
  quantityRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0',
    gap: '10px',
  },
  total: {
    color: 'blue',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  removeBtn: {
    backgroundColor: '#ff5c5c',
    color: '#fff',
    border: 'none',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  summary: {
    textAlign: 'center',
    marginTop: '3rem',
  },
  clearBtn: {
    marginRight: '10px',
    padding: '10px 20px',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  checkoutBtn: {
    padding: '10px 20px',
    backgroundColor: '#2d7cf5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  popup: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#4BB543',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
}

export default Cart
