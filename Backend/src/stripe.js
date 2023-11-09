const express = require("express");
const stripe = require('stripe')('sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw')
const router = express.Router()

const testStripe =  async (req, res) => {
// const line_items = req.body.packages.map(item =>{
//     return{
//         price_data: {
//             currency: 'egp',
//             product_data: {
//               name: "Abdo",
//             },
//             unit_amount: 0,
//           },
//           quantity: 1,
//     }
// })
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:[{
        price_data: {
                        currency: 'egp',
                        product_data: {
                          name: "Abdo",
                        },
                        unit_amount: 0,
                      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:5173/Success',
    cancel_url: 'http://localhost:5173/Cancel',
  });

  res.send({ url : session.url});
};

module.exports = {testStripe};