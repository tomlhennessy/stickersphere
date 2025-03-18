import Stripe from "stripe"
import "../../../envConfig.js"

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY)

export async function POST(request) {
    try {
        const { lineItems } = await request.json()

        return Response.json({ message: 'Success' })

    } catch (err) {
        console.error('Error creating cart checkout', err.message)
        return Response.json({ error: 'Failed to create Stripe checkout page' })
    }
}
