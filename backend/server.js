const express = require('express');
const cors = require('cors');
const products = require('./data/products');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory cart store (per session via cartId)
let carts = {};

// GLOBAL ORDERS STORE
// Stores real user orders so they persist during the lifetime of this server process.
let globalOrders = [
  {
    orderId: 'ORD-HIST-01',
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    items: [
      { name: "Rajma Chawal", price: 150, quantity: 2, chef: "Aunty Sunita" },
      { name: "Samosa", price: 40, quantity: 4, chef: "Chacha's Treats" }
    ],
    total: 460,
    status: "Delivered"
  },
  {
    orderId: 'ORD-HIST-02',
    date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    items: [
      { name: "Masala Dosa with Chutney", price: 110, quantity: 1, chef: "Amma's Kitchen" }
    ],
    total: 110,
    status: "Delivered"
  }
];

// Base route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('TasteofMom Backend API is running! Please access the frontend React app at port 5173.');
});

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// GET cart
app.get('/api/cart', (req, res) => {
  const cartId = req.headers['x-cart-id'] || 'default';
  res.json(carts[cartId] || []);
});

// POST add to cart
app.post('/api/cart', (req, res) => {
  const cartId = req.headers['x-cart-id'] || 'default';
  const { productId, quantity } = req.body;

  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  if (!carts[cartId]) carts[cartId] = [];

  const existing = carts[cartId].find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[cartId].push({ 
      productId, 
      quantity, 
      name: product.name, 
      price: product.price, 
      image: product.image,
      chef: product.chef 
    });
  }

  res.json(carts[cartId]);
});

// PUT update cart item quantity
app.put('/api/cart/:productId', (req, res) => {
  const cartId = req.headers['x-cart-id'] || 'default';
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  if (!carts[cartId]) return res.status(404).json({ error: 'Cart not found' });

  if (quantity <= 0) {
    carts[cartId] = carts[cartId].filter(item => item.productId !== productId);
  } else {
    const item = carts[cartId].find(item => item.productId === productId);
    if (item) item.quantity = quantity;
  }

  res.json(carts[cartId]);
});

// DELETE cart item
app.delete('/api/cart/:productId', (req, res) => {
  const cartId = req.headers['x-cart-id'] || 'default';
  const productId = parseInt(req.params.productId);
  if (carts[cartId]) {
    carts[cartId] = carts[cartId].filter(item => item.productId !== productId);
  }
  res.json(carts[cartId] || []);
});

// GET orders
app.get('/api/orders', (req, res) => {
  // Sort globalOrders descending by date
  const sorted = [...globalOrders].sort((a,b) => new Date(b.date) - new Date(a.date));
  res.json(sorted);
});

// POST place order
app.post('/api/order', (req, res) => {
  const cartId = req.headers['x-cart-id'] || 'default';
  const { name, address, phone, email, paymentMethod } = req.body;

  if (!name || !address || !phone || !email) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const cartItems = carts[cartId] || [];
  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = 'ORD-' + Date.now();

  const newOrder = {
    orderId,
    date: new Date().toISOString(),
    items: [...cartItems],
    total,
    status: "Preparing"
  };

  // Persist order globally and clear cart
  globalOrders.push(newOrder);
  carts[cartId] = [];

  res.json({
    success: true,
    orderId,
    message: `Order placed successfully! Your meal is being prepared with love.`,
    total,
    items: newOrder.items
  });
});

app.listen(PORT, () => {
  console.log(`TasteofMom backend running on http://localhost:${PORT}`);
});
