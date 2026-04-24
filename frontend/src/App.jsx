import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderHistory from './components/OrderHistory'

// Generate a simple cart session ID
const CART_ID = 'cart-' + Math.random().toString(36).substr(2, 9)

const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-cart-id': CART_ID
}

export default function App() {
  const [page, setPage] = useState('home') // home | cart | checkout | orders | success
  const [cart, setCart] = useState([])
  const [order, setOrder] = useState(null)

  // Fetch cart from backend
  const fetchCart = async () => {
    const res = await fetch('https://tasteofmom.onrender.com/api/cart', { headers: API_HEADERS })
    const data = await res.json()
    setCart(data)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const addToCart = async (productId) => {
    await fetch('https://tasteofmom.onrender.com/api/cart', {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({ productId, quantity: 1 })
    })
    fetchCart()
  }

  const updateQuantity = async (productId, quantity) => {
    await fetch(`https://tasteofmom.onrender.com/api/cart/${productId}`, {
      method: 'PUT',
      headers: API_HEADERS,
      body: JSON.stringify({ quantity })
    })
    fetchCart()
  }

  const removeItem = async (productId) => {
    await fetch(`https://tasteofmom.onrender.com/api/cart/${productId}`, {
      method: 'DELETE',
      headers: API_HEADERS
    })
    fetchCart()
  }

  const placeOrder = async (formData) => {
    const res = await fetch('https://tasteofmom.onrender.com/api/order', {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data.success) {
      setOrder(data)
      setCart([])
      setPage('success')
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div>
      <Navbar cartCount={cartCount} setPage={setPage} currentPage={page} />

      {page === 'home' && (
        <ProductList addToCart={addToCart} setPage={setPage} />
      )}

      {page === 'cart' && (
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          setPage={setPage}
        />
      )}

      {page === 'checkout' && (
        <Checkout cart={cart} placeOrder={placeOrder} setPage={setPage} />
      )}

      {page === 'orders' && (
        <OrderHistory setPage={setPage} />
      )}

      {page === 'success' && order && (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ marginBottom: '0.5rem', color: '#b85c2c', fontFamily: 'Playfair Display, serif', fontSize: '2rem' }}>
            Order placed successfully!
          </h2>
          
          <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #f0e6d8', marginTop: '2rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#2c2c2a', marginBottom: '0.5rem', fontWeight: 500 }}>
              Your meal from <span style={{ color: '#b85c2c', fontWeight: 700 }}>{order.items[0]?.chef || 'our home chefs'}</span> is on its way ❤️
            </p>
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              Estimated delivery: <span style={{ fontWeight: 600, color: '#2a8a5c' }}>35–40 mins</span>
            </p>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>{order.message}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => setPage('orders')}
              style={{
                background: 'white', color: '#b85c2c', border: '1px solid #b85c2c',
                padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600
              }}
            >
              View Order
            </button>
            <button
              onClick={() => setPage('home')}
              style={{
                background: '#b85c2c', color: 'white', border: 'none',
                padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
