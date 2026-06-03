export interface Product {
  id: number
  name: string
  slug: string
  category: 'men' | 'women' | 'unisex' | 'gifts' | 'new'
  cat: string
  notes: string
  stars: string
  reviews: number
  price: string
  priceOld?: string
  image: string
}

export const products: Product[] = [
  { id: 1, name: 'Lattafa Asad', slug: 'lattafa-asad', category: 'men', cat: 'Spice & Oud', notes: 'Saffron · Ambroxan · Leather · 100ml EDP', stars: '★★★★★', reviews: 412, price: 'Rs. 7,490', priceOld: 'Rs. 9,990', image: '/assets/products/asad.png' },
  { id: 2, name: 'Lattafa Hayaati', slug: 'lattafa-hayaati', category: 'unisex', cat: 'Warm & Woody', notes: 'Apple · Cinnamon · Vanilla · 100ml EDP', stars: '★★★★☆', reviews: 287, price: 'Rs. 7,890', image: '/assets/products/hayaati.webp' },
  { id: 3, name: 'Afnan 9pm', slug: 'afnan-9pm', category: 'men', cat: 'Aromatic Fougère', notes: 'Apple · Lavender · Vanilla · 100ml EDP', stars: '★★★★☆', reviews: 523, price: 'Rs. 9,990', image: '/assets/products/9pm.jpg' },
  { id: 4, name: 'Afnan 9pm REBEL', slug: 'afnan-9pm-rebel', category: 'men', cat: 'Smoky · Tobacco', notes: 'Tobacco · Vanilla · Cedar · 100ml EDP', stars: '★★★★★', reviews: 689, price: 'Rs. 13,990', image: '/assets/products/9pm-rebel.png' },
  { id: 5, name: 'French Avenue Liquid BRUN', slug: 'liquid-brun', category: 'unisex', cat: 'Modern Oriental', notes: 'Cardamom · Iris · Patchouli · 100ml EDP', stars: '★★★★☆', reviews: 341, price: 'Rs. 13,990', image: '/assets/products/liquid-brun.jpg' },
  { id: 6, name: 'Lattafa Pride Vintage Radio', slug: 'vintage-radio', category: 'unisex', cat: 'Woody · Aromatic', notes: 'Bergamot · Cedar · Amber · 100ml EDP', stars: '★★★★★', reviews: 258, price: 'Rs. 13,990', image: '/assets/products/vintage-radio.webp' },
  { id: 7, name: 'Rasasi Hawas For Him', slug: 'hawas-for-him', category: 'men', cat: 'Aquatic · Marine', notes: 'Sea salt · Apple · Amber · 100ml EDP', stars: '★★★★★', reviews: 631, price: 'Rs. 15,990', image: '/assets/products/hawas-for-him.png' },
  { id: 8, name: 'Rasasi Hawas Fire', slug: 'hawas-fire', category: 'men', cat: 'Spicy · Smoky', notes: 'Pepper · Tobacco · Vetiver · 100ml EDP', stars: '★★★★★', reviews: 742, price: 'Rs. 16,990', image: '/assets/products/hawas-fire.png' },
  { id: 9, name: 'Rasasi Hawas Ice', slug: 'hawas-ice', category: 'men', cat: 'Fresh · Ozonic', notes: 'Bergamot · Mint · Cedarwood · 100ml EDP', stars: '★★★★★', reviews: 498, price: 'Rs. 16,990', image: '/assets/products/hawas-ice.png' },
  { id: 10, name: 'Armaf Lionheart Man', slug: 'lionheart', category: 'men', cat: 'Aromatic · Leather', notes: 'Lavender · Tobacco · Patchouli · 100ml EDP', stars: '★★★★★', reviews: 312, price: 'Rs. 12,990', image: '/assets/products/lionheart.webp' },
  { id: 11, name: 'Armaf Club de Nuit Intense', slug: 'cdn-intense-200', category: 'men', cat: 'Citrus · Aromatic', notes: 'Lemon · Apple · Birch · 200ml EDP', stars: '★★★★☆', reviews: 204, price: 'Rs. 10,290', image: '/assets/products/cdn-intense-200.jpg' },
  { id: 12, name: 'Lattafa Khamrah Qahwa', slug: 'khamrah-qahwa', category: 'unisex', cat: 'Sweet Gourmand', notes: 'Coffee · Cinnamon · Praline · 100ml EDP', stars: '★★★★★', reviews: 589, price: 'Rs. 11,000', image: '/assets/products/khamrah-qahwa.webp' },
  { id: 13, name: 'Rasasi Hawas Elixir', slug: 'hawas-elixir', category: 'men', cat: 'Honeyed · Tobacco', notes: 'Honey · Tobacco · Vanilla · 100ml EDP', stars: '★★★★☆', reviews: 187, price: 'Rs. 14,500', image: '/assets/products/hawas-elixir.webp' },
  { id: 14, name: 'French Avenue Azure Aoud', slug: 'azure-aoud', category: 'men', cat: 'Aquatic · Oud', notes: 'Sea breeze · Iris · Oud · 100ml EDP', stars: '★★★★★', reviews: 276, price: 'Rs. 14,000', image: '/assets/products/azure-aoud.jpg' },
  { id: 15, name: 'CDN Intense Man (EDT)', slug: 'cdn-intense-edt', category: 'men', cat: 'Citrus · Aromatic', notes: 'Lemon · Apple · Birch · 105ml EDT', stars: '★★★★☆', reviews: 154, price: 'Rs. 10,500', image: '/assets/products/cdn-intense-edt.png' },
]
