// Order data permanently save karega
const saveOrderToFile = (order) => {
  try {
    // Browser mein localStorage use karo (Vite/React ke liye perfect)
    const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    
    // Complete order data add karo
    orders.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      customer: order.customer,
      items: order.items,
      total: order.total,
      date: order.date,
      time: order.time,
      emailContent: order.emailContent || 'N/A'
    });
    
    // Save karo
    localStorage.setItem('allOrders', JSON.stringify(orders, null, 2));
    console.log(' Order saved! Total orders:', orders.length);
  } catch (error) {
    console.error(' Save error:', error);
  }
};

export default saveOrderToFile;
