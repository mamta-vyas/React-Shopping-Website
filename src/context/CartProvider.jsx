// src/context/CartProvider.js
import React, { useState, useEffect } from 'react'
import { CartContext } from './CartContext'

const CartProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'))
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems')
    return saved ? JSON.parse(saved) : []
  })

  // Sync authToken from localStorage on page refresh
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken && !authToken) {
      setAuthToken(storedToken)
    }
  }, [authToken])

  // Sync cart items to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const login = (token) => {
    localStorage.setItem('authToken', token)
    setAuthToken(token)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setAuthToken(null)
    alert('Logged out successfully!')
  }

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        return [...prev, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cartItems')
  }

  return (
    <CartContext.Provider
      value={{
        authToken,
        login,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
