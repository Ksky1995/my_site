/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Wrench, 
  Settings, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X,
  Gauge,
  Construction,
  FlaskConical,
  Compass,
  Trophy,
  History,
  Truck,
  Package,
  Globe,
  Droplets,
  Wind
} from 'lucide-react';

// ✅ FIXED HERE
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
    description: 'Heavy-duty automatic soil compactor for proctor and CBR tests with digital control.',
    specs: ['Programmable Stroke', 'Adjustable Drop Height', 'Interchangeable Rammers']
  },
  {
    id: 's-2',
    name: 'CBR Test Apparatus',
    category: 'soil',
    description: 'Complete set for Laboratory CBR testing including load frame, molds, and surcharge weights.',
    specs: ['50kN Capacity', 'Dual Speed Choice', 'Digital Displacement Sensing']
  },
  {
    id: 'c-1',
    name: 'Compression Testing Machine',
    category: 'concrete',
    description: 'High-strength frame for testing concrete cubes and cylinders with peak load indicators.',
    specs: ['2000kN Range', 'Calibrated to ISO 7500-1', 'Safety Splatter Gates']
  },
  {
    id: 'c-2',
    name: 'Schmidt Hammer (Type N)',
    category: 'concrete',
    description: 'Original rebound hammer for non-destructive quality testing of concrete structures.',
    specs: ['Standard Impact Energy', 'Integrated Scale', 'Carrying Case Included']
  },
  {
    id: 'v-1',
    name: 'Robotic Total Station',
    category: 'survey',
    description: 'High-precision tracking for construction layout and automated surveying tasks.',
    specs: ['1" Angular Accuracy', '1000m Reflectorless', 'Long-range Bluetooth']
  },
  {
    id: 'v-2',
    name: 'Multi-GNSS Receiver',
    category: 'survey',
    description: 'All-constellation satellite receiver with IMU tilt-compensation for faster field work.',
    specs: ['GPS/GLO/GAL/BDS', 'RTK Performance', 'IP68 Rugged Design']
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

  const filteredProducts = activeTab === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <div className="font-sans text-primary-navy">

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

          <p className="mb-6">
            Founded on the pillars of <strong>Precision, Reliability, and Integrity</strong>
          </p>

          <button className="px-6 py-3 bg-yellow-400 text-black font-bold">
            Explore
          </button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 px-6">
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