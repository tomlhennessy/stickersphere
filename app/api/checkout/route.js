import Stripe from "stripe"
import "../../../envConfig.js"

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY, {
    apiVersion: '2023-10-16'
})

export async function POST(request) {
    try {
        console.log("STRIPE_SECRET_KEY loaded?", !!process.env.STRIPE_SECRET_KEY)

        const { lineItems } = await request.json()

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: process.env.NEXT_PUBLIC_BASE_URL + '/success',
            cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/'
        })

        return new Response.json(session)

    } catch (err) {
        console.error('Error creating cart checkout', err.message)
        return Response.json({ error: 'Failed to create Stripe checkout page' })
    }
}
