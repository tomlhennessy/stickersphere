export async function POST(request) {
    console.log("📩 Checkout API Hit");

    return new Response(JSON.stringify({ message: "API Route Works!" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
