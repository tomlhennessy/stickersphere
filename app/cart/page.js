'use client'

import { useProducts } from "@/context/ProductContext";

export default function CartPage() {

  const { cart } = useProducts()


    return (
      <section className='cart-section'>
        <h2>Your Cart</h2>
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
                </div>
              </div>
            )
          })}
        </div>
      </section>
    );
  }
