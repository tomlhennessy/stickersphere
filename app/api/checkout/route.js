import Stripe from "stripe";
import "../../../envConfig.js";

// Debug logs to check environment variables
console.log("🚀 API Key Loaded:", process.env.STRIPE_SECRET_KEY ? "Yes" : "No");
console.log("🔗 Base URL:", process.env.NEXT_PUBLIC_BASE_URL || "Not Defined in AWS");

const API_KEY = process.env.STRIPE_SECRET_KEY;

if (!API_KEY) {
    console.error("🚨 Stripe Secret Key is missing in AWS!");
}

const stripe = new Stripe(API_KEY, { apiVersion: "2023-10-16" });

export async function POST(request) {
    try {
        console.log("📩 Checkout API Called");

        // Debugging request body
        let body;
        try {
            body = await request.json();
            console.log("🛒 Received Line Items:", body.lineItems);
        } catch (jsonError) {
            console.error("❌ Error parsing request body:", jsonError);
            return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
        }

        // Validate lineItems
        if (!body.lineItems || body.lineItems.length === 0) {
            console.error("🚨 Invalid Line Items:", body.lineItems);
            return new Response(JSON.stringify({ error: "Invalid line items" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: body.lineItems,
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
        console.error("🛠 Error Stack:", err.stack);

        return new Response(
            JSON.stringify({
                error: "Failed to create Stripe checkout page",
                details: err.message,
                stack: err.stack,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
