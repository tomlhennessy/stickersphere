import Link from "next/link"

export default function SupportPage() {
    return (
        <div className='page-container'>
            <h2>Support</h2>
            <p>If you need help, please email us at support@stickr.com.</p>
            <Link href={'/'}>
                <button>Back to Store</button>
            </Link>
        </div>
    )
}
