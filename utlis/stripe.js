const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (cart, userEmail) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.nom,
        },
        unit_amount: item.prix * 100,
      },
      quantity: item.quantite,
    })),
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/checkout/success`,
    cancel_url: `${process.env.BASE_URL}/cart`,
    customer_email: userEmail,
  });

  return session.url;
};

module.exports = createCheckoutSession;



