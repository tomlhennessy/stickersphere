'use client'

import { createContext, useContext, useState } from "react"

const ProductContext = createContext()

export default function ProductsProvider(props) {
    const { children } = props

    const [cart, setCart] = useState({})

    function handleIncrementProduct(price_id, num) {
        const newCart = {
            ...cart
        }
        if (price_id in cart) {
            // product is already in cart, take previous value and increment/decrement it
            newCart[price_id] = newCart[price_id] + num

        } else {
            // product not yet in cart, so add it
            newCart[price_id] = num
        }

        if (newCart[price_id] === 0) {
            // the user has set the number to 0,  so we remove product from cart
            delete newCart[price_id]
        }
    }

    const value = {
        cart,
        handleIncrementProduct
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)
