const stripe = require("stripe")(process.env.pk_test_51LZN7BDFzNDjkHzZMHCY0KqU77RmrY5FqrwnfVArjx2ewov02KSpy4yWcQPPKEf61khFhXfdjmRx20JAt1XUQBQV00Ce3yAwyC);

module.exports = async (req, res) => {
    const { totalAmount, cancelRoute, productIds, currentRoute } = req.body;
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Movie Store",
                images: ["https://i.imgur.com/EHyR2nP.png"],
              },
              unit_amount: parseInt(totalAmount, 10) * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${
          req.headers.origin
        }?is_stripe=true&is_cart=${currentRoute.includes(
          "cart"
        )}&product_ids=${productIds}`,
        cancel_url: `${req.headers.origin}${cancelRoute}`,
      });

      res.json({ url: session.url });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
};