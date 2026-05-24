'use client';

import React, { useState } from 'react';
import ShopHero from '../../components/ShopHero';
import ProductCard from '../../components/ProductCard';
import ProductModal from '../../components/ProductModal';

type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
  description?: string;
};

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Handwoven Basket',
    price: 18.0,
    image: '/basket.jpg',
    description: 'A beautiful handmade basket woven by a parent in our program.'
  },
  {
    id: 'p2',
    title: 'Beaded Bracelet',
    price: 12.0,
    image: '/bracelet.jpg',
    description: 'Colorful beaded bracelet crafted with care.'
  },
  {
    id: 'p3',
    title: 'Hand-stitched Tote',
    price: 25.0,
    image: '/tote.jpg',
    description: 'Durable tote bag sewn by a local artisan parent.'
  }
];

export default function ShopPage() {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  function handleBuy(p: Product) {
    setSelected(p);
    setOpen(true);
  }

  return (
    <main className="w-full min-h-screen bg-white">
      <ShopHero />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-500">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onBuy={handleBuy} />
          ))}
        </div>
      </section>

      <ProductModal open={open} product={selected} onClose={() => setOpen(false)} />
    </main>
  );
}
