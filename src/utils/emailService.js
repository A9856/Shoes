import saveOrderToFile from '../utils/orderLogger.js';

export const sendOrderConfirmationEmail = async (order) => {
  const emailContent = `
    Dear ${order.customer.name},
    
    Thank you for your order at Adil Shoes House!
    
    ORDER DETAILS:
    Order ID: #${order.id}
    Date: ${order.date} at ${order.time}
    
    ITEMS ORDERED:
    ${order.items.map(item => 
      `- ${item.name} (Size UK ${item.size}) x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n')}
    
    SHIPPING ADDRESS:
    ${order.customer.name}
    ${order.customer.address}
    ${order.customer.city} - ${order.customer.pincode}
    Phone: ${order.customer.phone}
    
    TOTAL AMOUNT: ₹${order.total}
    
    Your order is being processed and will be shipped soon.
    
    Thank you for shopping with us!
    
    Best regards,
    Adil Shoes House Team
  `;
  
  //  Yahan data save hoga
  console.log('=== EMAIL SENT ===');
  console.log('To:', order.customer.email);
  console.log('Subject: Order Confirmation - Adil Shoes House');
  console.log('Content:', emailContent);
  console.log('==================');
  
  //  IMPORTANT: Order data save karo
  saveOrderToFile({
    ...order,
    emailContent: emailContent
  });
  
  return true;
};


