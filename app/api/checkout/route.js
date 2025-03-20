import Stripe from "stripe";
import "../../../envConfig.js";

const API_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(API_KEY, { apiVersion: "2023-10-16" });

export async function POST(request) {
    try {
        const { lineItems } = await request.json();

        if (!lineItems || lineItems.length === 0) {
            console.error("🚨 Invalid Line Items:", lineItems);
            return new Response(JSON.stringify({ error: "Invalid line items" }), { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        });

        return new Response(JSON.stringify(session), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("❌ Error creating Stripe checkout session:", err.message);
        return new Response(JSON.stringify({ error: "Failed to create Stripe checkout session" }), {
            status: 500,
        });
    }
}
