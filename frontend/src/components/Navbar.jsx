export default function Navbar({ cartCount, setPage, currentPage }) {
  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #f0e6d8',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          <h1 style={{ fontSize: '1.6rem', color: '#0e312a', fontFamily: 'Playfair Display, serif', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Taste <span style={{ fontFamily: 'cursive', fontSize: '1.3rem', color: '#b85c2c', margin: '0 2px' }}>of</span> Mom
          </h1>
          <p style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '0.05em' }}>HOMEMADE WITH LOVE</p>
        </div>

        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <button
            onClick={() => setPage('home')}
            style={{
              background: 'none', border: 'none',
              color: currentPage === 'home' ? '#b85c2c' : '#777',
              fontWeight: currentPage === 'home' ? 700 : 500,
              fontSize: '0.95rem', transition: 'color 0.2s',
              cursor: 'pointer'
            }}
          >
            Products
          </button>
          
          <div style={{ width: '1px', height: '16px', background: '#e0d5c1' }}></div>
          
          <button
            onClick={() => setPage('orders')}
            style={{
              background: 'none', border: 'none',
              color: currentPage === 'orders' ? '#b85c2c' : '#777',
              fontWeight: currentPage === 'orders' ? 700 : 500,
              fontSize: '0.95rem', transition: 'color 0.2s',
              cursor: 'pointer'
            }}
          >
            Orders
          </button>

          <button
            className="cart-btn"
            onClick={() => setPage('cart')}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span style={{
                background: 'white', color: '#b85c2c',
                borderRadius: '50%', width: '22px', height: '22px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 800
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
