import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products')
  const products = await response.json()
  return products
}

export default async function Home() {

  const products = await getProducts()

  let planner = null

  let stickers = []

  for (let product of products) {
    if (product.name === 'Medieval Dragon Month Planner') {
      planner = product
      continue
    }
    stickers.push(product)
  }

  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}
