import SSLCommerzCheckout from "@/component/ui/sslCommerz/SslCommerz";


export default function HomePage() {
  // Example cart
  const items = [{ sku: 'sku-101', name: 'Pro Plan', qty: 1, price: 1999 }];
  const amount = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <main style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Sowdia Electronics</h1>
        <p style={{ color:'#6b7280' }}>Secure checkout with SSLCommerz</p>
      </div>
      <SSLCommerzCheckout userId="u_123" items={items} amount={amount} />
    </main>
  );
}
