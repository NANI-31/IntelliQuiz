import React, { useState } from "react";

const Pricing = () => {
  const [orderId, setOrderId] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    // Request the backend to create an order
    const response = await fetch("http://localhost:5000/api/payment/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100 }), // Amount in paisa (₹500 = 50000 paisa)
    });
    const order = await response.json();
    setOrderId(order.id); // Save the order ID
    return order;
  };

  const handlePayment = async () => {
    // Load Razorpay script
    console.log("Loading Razorpay script...");
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create order on the server
    const order = await createOrder();
    console.log("Order created successfully!", order);

    const options = {
      key: "rzp_live_KyCEDdq3UGMYIg", // Replace with your Razorpay Key ID
      amount: 100, // amount in paisa (₹500 = 50000 paisa)
      currency: "INR",
      name: "My Company",
      description: "Test Transaction",
      image: "https://your-logo-url.com",
      order_id: order.id, // Received from the backend
      handler: function (response) {
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        // Send payment details to backend for verification
        verifyPayment(response);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Test address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (paymentDetails) => {
    console.log("Verifying payment...");
    console.log(paymentDetails);
    // Send payment details to backend for verification
    const response = await fetch("http://localhost:5000/api/payment/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: paymentDetails.razorpay_order_id,
        razorpay_payment_id: paymentDetails.razorpay_payment_id,
        razorpay_signature: paymentDetails.razorpay_signature,
      }),
    });

    const result = await response.text();
    if (result === "Payment Verified") {
      alert("Payment has been verified");
    } else {
      alert("Payment verification failed");
    }
  };

  return (
    <div>
      {/* <button onClick={handlePayment}>Pay with Razorpay</button> */}
    </div>
  );
};

export default Pricing;
