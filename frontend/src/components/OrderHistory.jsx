import { useState, useEffect } from 'react'

export default function OrderHistory({ setPage }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>Fetching your history...</div>
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
      <button
        onClick={() => setPage('home')}
        style={{ background: 'none', border: 'none', color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}
      >
        ← Back to Store
      </button>

      <h2 style={{ marginBottom: '1.5rem', fontFamily: 'Playfair Display, serif', fontSize: '1.8rem' }}>Order History</h2>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px', border: '1px solid #f0e6d8' }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>No orders yet! Your history is waiting to be written.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map(order => (
            <div key={order.orderId} style={{
              background: 'white', borderRadius: '12px', border: '1px solid #f0e6d8', padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', color: '#2c2c2a', marginBottom: '0.2rem' }}>Order #{order.orderId}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>
                    {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 600, color: '#b85c2c', fontSize: '1.1rem' }}>₹{order.total}</p>
                  <span style={{ 
                    display: 'inline-block', padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', 
                    fontWeight: 600, marginTop: '4px',
                    background: order.status === 'Preparing' ? '#eef2ff' : '#eafaf1',
                    color: order.status === 'Preparing' ? '#4f46e5' : '#2a8a5c'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div>
                {order.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span>
                      <span style={{ fontWeight: 500 }}>{item.quantity}x {item.name}</span>
                      <span style={{ color: '#888', marginLeft: '8px', fontSize: '0.8rem' }}>(by {item.chef})</span>
                    </span>
                    <span style={{ color: '#666' }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
