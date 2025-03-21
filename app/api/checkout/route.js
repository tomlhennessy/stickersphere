import Stripe from "stripe";
import "../../../envConfig.js";

const API_KEY = process.env.STRIPE_SECRET_KEY;

console.log("🔍 API Key Loaded:", API_KEY ? "Yes" : "No");
console.log("🔗 Base URL:", process.env.NEXT_PUBLIC_BASE_URL);

const stripe = new Stripe(API_KEY, { apiVersion: "2023-10-16" });

export async function POST(request) {
    try {
        const { lineItems } = await request.json();
        console.log("🛒 Received Line Items:", lineItems);

        if (!lineItems || lineItems.length === 0) {
            console.error("🚨 Invalid Line Items:", lineItems);
            return new Response(JSON.stringify({ error: "Invalid line items" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        });

        console.log("✅ Stripe Checkout Session Created:", session);

        return new Response(JSON.stringify(session), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error("❌ Stripe Checkout Error:", err);

        return new Response(
            JSON.stringify({ error: "Failed to create Stripe checkout page", details: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
