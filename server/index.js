const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Q5tGyRuZ5ybUJwdq1WjY5QKM1DGYY1MD0ycp0EZJoWuYIxJxBOSMZVeAcOyjIyUJ4KfbbYhJ0n80lLjyW0NHllb00Sw188K2x')

const app = express();
app.use(cors());



app.get('/', (req, res) => {
    res.send('Hello World');
});


app.post('/payment', async(req, res) => {


    const product = await stripe.products.create({
            name: "T-shirt"
    });

if(product){
    var price = await stripe.prices.create({
                product: `${product.id}`,
                unit_amount: 100 * 100,
                currency: 'inr',

    });
}



if (price.id){
    var session = await stripe.checkout.sessions.create({

        line_items: [
                {
                       price: `${price.id}`,
                       quantity: 1 


                }

        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        customer_email: 'demo@gmail.com'

    })
}

res.json(session)


})


app.listen(3000, () => {
    console.log('Server running on port 3000')
});


