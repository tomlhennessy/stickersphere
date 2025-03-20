import Link from "next/link"

export default function FAQPage() {
    return (
        <div className='page-container'>
            <h2>Frequently Asked Questions</h2>
            <p><strong>Q: How do I place an order?</strong></p>
            <p>A: Simply add items to your cart and proceed to checkout!</p>

            <p><strong>Q: What payment methods do you accept?</strong></p>
            <p>A: We accept all major credit cards via Stripe.</p>

            <p><strong>Q: How to I contact support?</strong></p>
            <p>A: Visit our <Link href={'/support'}>support page</Link> or email us at support.stickr.com.</p>

            <Link href={'/'}>
                <button>Back to Store</button>
            </Link>
        </div>
    )
}
