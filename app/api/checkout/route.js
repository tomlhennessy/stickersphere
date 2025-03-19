import Stripe from "stripe"
import "../../../envConfig.js"

const API_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY, {
    apiVersion: '2023-10-16'
})

export async function POST(request) {
    try {
        const { lineItems } = await request.json()

        const session = await stripe.checkout.sessions.create({
            mode: Payment,
            line_items: lineItems,
            success_url: process.env.NEXT_PUBLIC_BASE_URL + '/success',
            cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/'
        })

        return Response.json(session)

    } catch (err) {
        console.error('Error creating cart checkout', err.message)
        return Response.json({ error: 'Failed to create Stripe checkout page' })
    }
}
