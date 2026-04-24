export default function Cart({ cart, updateQuantity, removeItem, setPage }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h2>
        <p style={{ color: '#888', marginBottom: '2rem' }}>Add some snacks to get started!</p>
        <button
          onClick={() => setPage('home')}
          style={{
            background: '#b85c2c', color: 'white',
            border: 'none', padding: '0.75rem 2rem',
            borderRadius: '8px', fontSize: '1rem'
          }}
        >
          Browse Snacks
        </button>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '700px' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Cart</h2>

      {cart.map(item => (
        <div key={item.productId} style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          background: 'white', borderRadius: '12px',
          padding: '1rem', marginBottom: '1rem',
          border: '1px solid #f0e6d8'
        }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80' }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', fontFamily: 'Playfair Display, serif' }}>
              {item.name}
            </h3>
            <p style={{ color: '#b85c2c', fontWeight: 600 }}>₹{item.price}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid #ddd', background: 'white',
                fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              −
            </button>
            <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 600 }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              style={{
                width: '28px', height: '28px', borderRadius: '50%',
                border: '1px solid #ddd', background: 'white',
                fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              +
            </button>
          </div>

          <div style={{ textAlign: 'right', minWidth: '70px' }}>
            <p style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</p>
            <button
              onClick={() => removeItem(item.productId)}
              style={{ background: 'none', border: 'none', color: '#e24b4a', fontSize: '0.8rem', marginTop: '0.25rem' }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div style={{
        background: 'white', borderRadius: '12px',
        padding: '1.5rem', border: '1px solid #f0e6d8',
        marginTop: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ color: '#666' }}>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span style={{ color: '#666' }}>Delivery</span>
          <span style={{ color: '#2a8a5c', fontWeight: 500 }}>FREE</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button
          onClick={() => setPage('checkout')}
          style={{
            width: '100%', background: '#b85c2c', color: 'white',
            border: 'none', padding: '0.875rem',
            borderRadius: '8px', fontSize: '1rem', fontWeight: 600
          }}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  )
}
