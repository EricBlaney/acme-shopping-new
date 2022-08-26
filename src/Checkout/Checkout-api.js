const stripe = require("stripe")(process.env.STRIPE_API_KEY1);

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
                // name: "Movie Store",
                // images: [`//images.igdb.com/igdb/image/upload/t_cover_big/${product.imageUrl}`],
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