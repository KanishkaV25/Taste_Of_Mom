import { useState } from 'react'

export default function Checkout({ cart, placeOrder, setPage }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', paymentMethod: 'cod'
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (form.phone.length < 10) e.phone = 'Valid phone required'
    if (!form.address.trim()) e.address = 'Address is required'
    return e
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    await placeOrder(form)
    setLoading(false)
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '0.75rem 1rem',
    border: `1px solid ${errors[field] ? '#e24b4a' : '#ddd'}`,
    borderRadius: '8px', fontSize: '0.95rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none', background: 'white',
    marginTop: '0.25rem'
  })

  const labelStyle = {
    fontSize: '0.85rem', fontWeight: 500, color: '#555',
    display: 'block', marginBottom: '0.1rem'
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '700px' }}>
      <button
        onClick={() => setPage('cart')}
        style={{ background: 'none', border: 'none', color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}
      >
        ← Back to Cart
      </button>

      <h2 style={{ marginBottom: '1.5rem' }}>Checkout</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Form */}
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{
            background: 'white', borderRadius: '12px',
            padding: '1.5rem', border: '1px solid #f0e6d8',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'
          }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle('name')}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Priya Sharma"
              />
              {errors.name && <p style={{ color: '#e24b4a', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.name}</p>}
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                style={inputStyle('email')}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="priya@email.com"
                type="email"
              />
              {errors.email && <p style={{ color: '#e24b4a', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.email}</p>}
            </div>

            <div>
              <label style={labelStyle}>Phone</label>
              <input
                style={inputStyle('phone')}
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="9876543210"
                type="tel"
              />
              {errors.phone && <p style={{ color: '#e24b4a', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.phone}</p>}
            </div>

            <div>
              <label style={labelStyle}>Payment Method</label>
              <select
                style={inputStyle('payment')}
                value={form.paymentMethod}
                onChange={e => setForm({ ...form, paymentMethod: e.target.value })}
              >
                <option value="cod">Cash on Delivery</option>
                <option value="upi">UPI (simulated)</option>
                <option value="card">Credit/Debit Card (simulated)</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Delivery Address</label>
              <textarea
                style={{ ...inputStyle('address'), resize: 'vertical', minHeight: '80px' }}
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder="House no, Street, City, State, PIN"
              />
              {errors.address && <p style={{ color: '#e24b4a', fontSize: '0.75rem', marginTop: '0.2rem' }}>{errors.address}</p>}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            background: 'white', borderRadius: '12px',
            padding: '1.5rem', border: '1px solid #f0e6d8',
            marginTop: '1rem'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.productId} style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: '0.5rem', fontSize: '0.9rem'
              }}>
                <span style={{ color: '#666' }}>{item.name} × {item.quantity}</span>
                <span style={{ fontWeight: 500 }}>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #f0e6d8', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Total</span>
              <span style={{ color: '#b85c2c' }}>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', background: loading ? '#ddd' : '#b85c2c',
              color: 'white', border: 'none',
              padding: '1rem', borderRadius: '8px',
              fontSize: '1rem', fontWeight: 600, marginTop: '1rem'
            }}
          >
            {loading ? 'Placing Order...' : `Place Order — ₹${total}`}
          </button>
        </div>
      </div>
    </div>
  )
}
