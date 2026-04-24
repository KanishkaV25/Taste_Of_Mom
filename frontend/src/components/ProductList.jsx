import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All') // 'All' | 'Top Rated' | 'North Indian' ... 

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  // Hardcode base categories + dynamic ones for robust UI
  const baseCategories = ['All', 'Top Rated']
  const autoCategories = [...new Set(products.map(p => p.category))]
  const categories = [...new Set([...baseCategories, ...autoCategories])]

  // Compute filtered list
  let filtered = filter === 'All'
    ? products
    : products.filter(p => p.category === filter)

  // Data thinking logic: If "Top Rated" is selected, sort all items by rating desc
  if (filter === 'Top Rated') {
    filtered = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        marginBottom: '3rem',
        borderRadius: '16px',
        overflow: 'hidden',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 3rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        backgroundImage: `linear-gradient(to right, rgba(253, 248, 243, 0.98) 0%, rgba(253, 248, 243, 0.85) 45%, rgba(253, 248, 243, 0.1) 100%), url('https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <h2 style={{ 
            fontSize: '3.4rem', 
            color: '#0e312a', 
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            letterSpacing: '-1px'
          }}>
            Authentic Flavours,<br/>Crafted by Mothers
          </h2>
          <p style={{ 
            color: '#4a5d56', 
            fontSize: '1.1rem', 
            lineHeight: 1.6, 
            marginBottom: '2.5rem',
            maxWidth: '500px'
          }}>
            Experience the warmth of home with every bite. Traditional East Indian snacks, handcrafted by rural women entrepreneurs using recipes passed down through generations.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => {
                document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                background: '#0e312a', color: 'white',
                padding: '0.85rem 1.8rem', borderRadius: '8px',
                fontSize: '1rem', fontWeight: 600, border: 'none',
                cursor: 'pointer', transition: 'background 0.2s',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(14, 49, 42, 0.25)'
            }}>
              Shop Now &rarr;
            </button>
            <button style={{
                background: 'transparent', color: '#0e312a',
                padding: '0.85rem 1.8rem', borderRadius: '8px',
                fontSize: '1rem', fontWeight: 600, 
                border: '2px solid #0e312a',
                cursor: 'pointer', transition: 'all 0.2s'
            }}>
              Our Story
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? '#b85c2c' : 'white',
              color: filter === cat ? 'white' : '#555',
              border: '1px solid',
              borderColor: filter === cat ? '#b85c2c' : '#ddd',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: filter === cat ? 600 : 500,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {cat === 'Top Rated' ? '🔥 ' : ''}{cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
          Loading your next favorite meal...
        </div>
      ) : (
        <div id="products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  )
}
