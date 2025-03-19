'use client'

import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter()
  const { cart } = useProducts()

  async function createCheckout() {
    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL
      const lineItems = Object.keys(cart).map((item, itemIndex) => {
          return {
            price: item,
            quantity: cart[item].quantity
          }
      })

      const response = await fetch(baseURL + '/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lineItems })
      })
      const data = await response.json()
      if (response.ok) {
        console.log(data)
        router.push(data.url)
      }

    } catch (err) {
      console.log('Error creating checkout', err.message)
    }
  }


    return (
      <section className='cart-section'>
        <h2>Your Cart</h2>
        {Object.keys(cart).length === 0 && (<p>You have no items in your cart!</p>)}
        <div className='cart-container'>
          {Object.keys(cart).map((item, itemIndex) => {
            const itemData = cart[item]
            const itemQuantity = itemData?.quantity

            const imgName = itemData.name === 'Medieval Dragon Month Planner' ? 'planner' :
            itemData.name.replaceAll(' Sticker.png', '').replaceAll(' ', '_')
            const imgUrl = 'low_res/' + imgName + '.jpeg'

            return (
              <div key={itemIndex} className='cart-item'>
                <img src={imgUrl} alt={imgName + '-img'} />
                <div className='cart-item-info'>
                  <h3>{itemData.name}</h3>
                  <p>{itemData.description.slice(0, 100)}{itemData.description.length > 100 ? '...' : ''}</p>
                  <h4>${itemData.prices[0].unit_amount / 100}</h4>
                  <div className='quantity-container'>
                    <p><strong>Quantity</strong></p>
                    <input value={itemQuantity} placeholder="2"
                    onChange={() => {

                    }}></input>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='checkout-container'>
          <Link href={'/'}>
            <button>&larr; Continue shopping</button>
          </Link>
          <button onClick={createCheckout}>Checkout &rarr;</button>
        </div>
      </section>
    );
  }
