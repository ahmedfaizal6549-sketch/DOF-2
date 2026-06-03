import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart';

// Generates a unique order ID
function makeOrderId() {
  return `DOF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export default function Cart() {
  const items = useCartStore(s => s.items);
  const removeItem = useCartStore(s => s.removeItem);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const getTotalPrice = useCartStore(s => s.getTotalPrice);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Colombo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = getTotalPrice();
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleCheckout = async () => {
    if (!email || !firstName || !lastName || !phone) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const orderId = makeOrderId();
      const amount = total.toFixed(2);
      const itemTitles = items.map(i => `${i.brand} ${i.name} x${i.quantity}`).join(', ');

      // Get hash from our backend
      const hashRes = await fetch('/api/payhere-hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, amount, currency: 'LKR' }),
      });
      const hashData = await hashRes.json();
      if (hashData.error) { setError(hashData.error); setLoading(false); return; }

      // Build PayHere form and auto-submit
      const baseUrl = hashData.sandbox
        ? 'https://sandbox.payhere.lk/pay/checkout'
        : 'https://www.payhere.lk/pay/checkout';

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = baseUrl;

      const fields = {
        merchant_id: hashData.merchant_id,
        return_url: `${window.location.origin}/checkout/success`,
        cancel_url: `${window.location.origin}/checkout/cancel`,
        notify_url: `${window.location.origin}/api/payhere-notify`,
        order_id: orderId,
        items: itemTitles.slice(0, 255),
        currency: 'LKR',
        amount,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address: address || '—',
        city,
        country: 'Sri Lanka',
        hash: hashData.hash,
        custom_1: email,
      };

      Object.entries(fields).forEach(([k, v]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = k;
        input.value = v;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (e) {
      setError('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🛒</div>
      <h2 style={{ marginBottom: '0.75rem' }}>Your cart is empty</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Find your signature scent in our collection.</p>
      <Link href="/shop" style={{ display: 'inline-block', padding: '0.875rem 2rem', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontWeight: 700 }}>Browse Fragrances</Link>
    </motion.div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 920, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Shopping Cart <span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 400 }}>({itemCount} {itemCount === 1 ? 'item' : 'items'})</span></h1>

      {/* Cart Items */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: '2rem', overflow: 'hidden' }}>
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            style={{ display: 'grid', gridTemplateColumns: '72px 1fr auto auto auto', gap: '1rem', alignItems: 'center', padding: '1.25rem', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ width: 72, height: 72, background: '#f7f3ef', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.25rem', flexShrink: 0 }}>🧴</div>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.brand}</p>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 2 }}>{item.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Rs. {item.price.toLocaleString()} each</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} style={{ width: 32, height: 32, background: 'var(--bg)', fontSize: '1rem', color: 'var(--secondary)' }}>−</button>
              <span style={{ width: 36, textAlign: 'center', fontSize: '0.9rem', fontWeight: 700 }}>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 32, height: 32, background: 'var(--bg)', fontSize: '1rem', color: 'var(--secondary)' }}>+</button>
            </div>
            <span style={{ fontWeight: 700, minWidth: 110, textAlign: 'right', fontSize: '1rem' }}>Rs. {(item.price * item.quantity).toLocaleString()}</span>
            <button onClick={() => removeItem(item.id)} style={{ width: 30, height: 30, background: '#fff0f0', color: 'var(--error)', borderRadius: 6, fontSize: '0.9rem' }}>✕</button>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="checkout-grid">
        {/* Customer Details */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Your Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input placeholder="First name *" value={firstName} onChange={e => setFirstName(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8 }} />
            <input placeholder="Last name *" value={lastName} onChange={e => setLastName(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8 }} />
          </div>
          <input placeholder="Email address *" type="email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, width: '100%', marginBottom: '0.75rem' }} />
          <input placeholder="Phone number * (07X XXXXXXX)" value={phone} onChange={e => setPhone(e.target.value)}
            style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, width: '100%', marginBottom: '0.75rem' }} />
          <input placeholder="Delivery address" value={address} onChange={e => setAddress(e.target.value)}
            style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, width: '100%', marginBottom: '0.75rem' }} />
          <input placeholder="City" value={city} onChange={e => setCity(e.target.value)}
            style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8, width: '100%' }} />
        </div>

        {/* Summary + Pay */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem' }}>Order Summary</h3>
          {[['Subtotal', `Rs. ${total.toLocaleString()}`], ['Shipping (Colombo)', 'Free'], ['Total', `Rs. ${total.toLocaleString()}`]].map(([l, v], i) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontWeight: i === 2 ? 700 : 400, fontSize: i === 2 ? '1.2rem' : '0.95rem' }}>
              <span>{l}</span><span style={{ color: i === 2 ? 'var(--primary)' : 'inherit' }}>{v}</span>
            </div>
          ))}

          {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', background: '#fff0f0', padding: '0.75rem', borderRadius: 6 }}>{error}</p>}

          <motion.button onClick={handleCheckout} disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.97 }}
            style={{ padding: '1rem', background: loading ? 'var(--muted)' : 'var(--accent)', color: '#fff', borderRadius: 10, fontWeight: 700, fontSize: '1rem', marginTop: 'auto' }}>
            {loading ? 'Redirecting to PayHere...' : `Pay Rs. ${total.toLocaleString()} →`}
          </motion.button>

          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)' }}>
            🔒 Secured by PayHere · Visa · Mastercard · eZcash · Genie
          </div>

          <Link href="/shop" style={{ textAlign: 'center', color: 'var(--secondary)', fontSize: '0.875rem', fontWeight: 600 }}>← Continue Shopping</Link>
        </div>
      </div>

      <style>{`@media(max-width:640px){.checkout-grid{grid-template-columns:1fr !important}}`}</style>
    </motion.div>
  );
}
