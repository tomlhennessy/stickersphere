import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className='page-container'>
            <h2 className='text-large'>Thank you for your purchase 🎉</h2>
            <p className='text-large'>404</p>
            <Link href={'/'}>
                <button>Continue &rarr;</button>
            </Link>
        </div>
    )
}
