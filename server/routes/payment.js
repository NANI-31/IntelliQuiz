const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/process", async (req, res) => {
  const instance = new Razorpay({
    key_id: "rzp_live_KyCEDdq3UGMYIg",
    key_secret: "pdXlPlkPsgbr5QDyInwmN0lM",
  });
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };
  try {
    const order = await instance.orders.create(options);
    res.status(200).json({ message: "Payment processed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/getkey", async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

// create orders
router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    const order = await instance.orders.create(options);

    console.log("Order created successfully:", order);
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.log("Error creating Razorpay order:", err);
    if (err.response) {
      console.log("Error response:", err.response);
    }
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// payment verify
router.post("/verify", async (req, res) => {
  try {
    //     const secret = process.env.RAZORPAY_KEY_SECRET;
    //     const shasum = crypto.createHmac("sha256", secret);
    //     shasum.update(JSON.stringify(req.body));
    //     const digest = shasum.digest("hex");
    //     if (digest !== req.headers["x-razorpay-signature"]) {
    //       return res.status(400).json({ message: "Invalid signature" });
    //     }
    //     res.status(200).json({ message: "Payment verified successfully" });
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    console.log(req.headers);
    const expectedSign = crypto
      .createHmac("Sha256", "pdXlPlkPsgbr5QDyInwmN0lM")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    console.log("expectedSign", expectedSign);
    console.log("razorpay_signature", razorpay_signature);
    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified Succesfully" });
    } else {
      return res.status(400).json({ message: "Invalid Signature Sent!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
