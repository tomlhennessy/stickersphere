import Stripe from "stripe"
import "../../../envConfig.js"

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY)

export async function GET() {
    try {

    } catch (err) {
        console.error('Error fecthing data from Stripe: ', err.message)
        return Response.json({ error: 'Failed to fetch data from Stripe' })
    }
}
