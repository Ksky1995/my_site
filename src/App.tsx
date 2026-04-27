/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// ✅ correct animation library
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  category: 'soil' | 'concrete' | 'survey';
  description: string;
  specs: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 's-1',
    name: 'Automatic Compaction Tester',
    category: 'soil',
    description: 'Heavy-duty soil compactor.',
    specs: ['Programmable', 'Adjustable Height']
  },
  {
    id: 'c-1',
    name: 'Compression Machine',
    category: 'concrete',
    description: 'Concrete strength tester.',
    specs: ['2000kN', 'Digital']
  },
  {
    id: 'v-1',
    name: 'Total Station',
    category: 'survey',
    description: 'High precision survey tool.',
    specs: ['1" Accuracy', 'Bluetooth']
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'soil' | 'concrete' | 'survey'>('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts =
    activeTab === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <div className="font-sans">

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 ${scrolled ? 'bg-black py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          <h1 className="font-bold text-xl">MY SITE</h1>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black text-white flex items-center justify-center"
          >
            <p>Menu Open</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            PRECISION YOU TRUST
          </h1>
          <a href="#products" className="px-6 py-3 bg-yellow-400 text-black font-bold inline-flex items-center gap-2">
            Explore <ChevronRight />
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 px-6">
        <div className="flex gap-2 mb-10">
          {(['all', 'soil', 'concrete', 'survey'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 border"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border p-6">
              <h3 className="font-bold text-xl mb-2">{product.name}</h3>
              <p className="mb-4">{product.description}</p>

              <ul>
                {product.specs.map(spec => (
                  <li key={spec}>• {spec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}