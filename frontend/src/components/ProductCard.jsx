export default function ProductCard({ product, addToCart }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #f0e6d8',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
      position: 'relative'
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(184, 92, 44, 0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ position: 'relative', height: '200px', backgroundColor: '#fdf8f3' }}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80' }}
        />
        
        {/* Emotion & Category Tags */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '0.5rem' }}>
          <span style={{
            background: 'rgba(253, 248, 243, 0.95)', color: '#b85c2c',
            fontSize: '0.7rem', padding: '4px 10px',
            borderRadius: '12px', fontWeight: 700,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {product.category}
          </span>
          {product.emotionTag && (
            <span style={{
              background: '#ffefeb', color: '#c2410a',
              fontSize: '0.7rem', padding: '4px 10px',
              borderRadius: '12px', fontWeight: 700,
              boxShadow: '0 2px 4px rgba(194, 65, 10, 0.15)',
              border: '1px solid rgba(194, 65, 10, 0.1)'
            }}>
              {product.emotionTag}
            </span>
          )}
        </div>

        {!product.inStock && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ color: '#999', fontWeight: 600 }}>Out of Stock</span>
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem' }}>
        {/* Visual Hierarchy: Dish Name is BIG */}
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.1rem' }}>
          {product.name}
        </h3>
        
        {/* Visual Hierarchy: Chef is smaller */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#666', fontWeight: 500 }}>
            Made by <span style={{ color: '#b85c2c', fontWeight: 600 }}>{product.chef}</span>
          </p>
        </div>

        {/* Vertical Trust Layer */}
        <div style={{ 
          background: '#f9fafa', borderRadius: '8px', padding: '0.6rem',
          display: 'flex', flexDirection: 'column', gap: '0.3rem', 
          fontSize: '0.8rem', color: '#444', marginBottom: '1rem',
          border: '1px solid #edf1f3'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 700, color: '#e69900', fontSize: '0.9rem' }}>⭐ {product.rating}</span>
            <span style={{ color: '#ccc' }}>|</span>
            <span style={{ fontWeight: 600 }}>{product.orderCount} orders</span>
          </div>
          {product.hygieneVerified && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ color: '#2a8a5c', fontWeight: 700 }}>✅ Verified kitchen strict hygiene</span>
            </div>
          )}
        </div>

        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.25rem', lineHeight: 1.5, minHeight: '40px' }}>
          {product.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#2c2c2a' }}>
            ₹{product.price}
            <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, marginLeft: '6px' }}>
              ({product.weight})
            </span>
          </span>
          
          <button
            disabled={!product.inStock}
            onClick={() => addToCart(product.id)}
            className="cta-btn"
          >
            {product.inStock ? '+ Add to Cart' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}
