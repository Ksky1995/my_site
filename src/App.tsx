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
  Mail, 
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
import { motion, AnimatePresence } from 'motion/react';

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

const SERVICES = [
  {
    id: 1,
    title: 'Repair & Overhaul',
    description: 'Expert repair services for all major laboratory and survey instrument brands with genuine spares.',
    icon: <Wrench className="w-8 h-8" />
  },
  {
    id: 2,
    title: 'Calibration & Certification',
    description: 'Professional calibration ensuring your devices meet international performance standards.',
    icon: <Settings className="w-8 h-8" />
  },
  {
    id: 3,
    title: 'Preventive Maintenance',
    description: 'Scheduled maintenance programs to prevent downtime and extend equipment lifespan.',
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    id: 4,
    title: 'On-site Support',
    description: 'Technical field support for complex instrument setup and data collection troubleshooting.',
    icon: <Construction className="w-8 h-8" />
  },
  {
    id: 5,
    title: 'Spare Parts Supply',
    description: 'Ready stock of critical consumables, spare parts, and accessories for immediate replacement.',
    icon: <Package className="w-8 h-8" />
  },
  {
    id: 6,
    title: 'Training & Demo',
    description: 'Practical training sessions for your technical staff on operating new instrumentation.',
    icon: <Gauge className="w-8 h-8" />
  }
];

const WHY_CHOOSE_US = [
  { title: 'Fast Turnaround', desc: 'Repairs completed in 3-7 business days.', icon: <History className="w-6 h-6" /> },
  { title: 'Certified Techs', desc: 'Factory-trained expert technicians.', icon: <Trophy className="w-6 h-6" /> },
  { title: 'Myanmar Coverage', desc: 'Support available across the entire nation.', icon: <Globe className="w-6 h-6" /> },
  { title: 'Loaner Program', desc: 'Equipment available during major repairs.', icon: <Truck className="w-6 h-6" /> }
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
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary-navy py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-accent-amber flex items-center justify-center font-heading text-xl font-bold tracking-tighter">
              MPS
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-extrabold tracking-tight leading-none">MYANMAR PRECISION</span>
              <span className="text-[10px] uppercase tracking-widest text-accent-amber font-bold">Systems</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 uppercase font-heading text-sm tracking-widest font-bold">
            <a href="#about" className="hover:text-accent-amber transition-colors">About</a>
            <a href="#products" className="hover:text-accent-amber transition-colors">Products</a>
            <a href="#services" className="hover:text-accent-amber transition-colors">Services</a>
            <a href="#contact" className="px-5 py-2 bg-accent-amber text-primary-navy rounded-sm hover:-translate-y-1 transition-all">Enquire</a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-primary-navy flex flex-col items-center justify-center text-white gap-8 font-heading text-2xl uppercase tracking-widest"
          >
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Equipment</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-accent-amber">Contact Us</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-pattern text-white pt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 border border-accent-amber text-accent-amber font-heading font-bold uppercase tracking-widest mb-6 text-sm">
              Authorized Service Center 🇲🇲
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic mb-6 leading-none">
              PRECISION YOU <br/> CAN <span className="text-accent-amber underline decoration-4 underline-offset-8">TRUST.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-lg mb-10 leading-relaxed font-medium">
              Myanmar Precision Systems is your leading partner for sale, rental, and factory-trained repair of geodetic and material testing instrumentation.
            </p>
            <div className="flex gap-4">
              <a href="#products" className="bg-accent-amber text-primary-navy font-heading font-bold uppercase tracking-widest px-8 py-4 rounded-sm flex items-center gap-2 hover:scale-105 transition-all">
                Explore Inventory <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#services" className="border border-white/30 text-white font-heading font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-white/5 transition-all">
                Request Service
              </a>
            </div>
          </motion.div>
          
          <div className="hidden md:block relative">
            <div className="aspect-square bg-accent-amber/10 border border-accent-amber/20 rounded-full flex items-center justify-center animate-pulse">
               <Compass className="w-48 h-48 text-accent-amber opacity-40 rotate-12" />
            </div>
            <div className="absolute top-1/4 -left-12 p-6 bg-white shadow-2xl rounded-sm text-primary-navy border-l-4 border-accent-amber">
               <Gauge className="w-8 h-8 mb-4 text-accent-amber" />
               <p className="font-heading font-bold text-sm uppercase">Certified Accuracy</p>
               <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">ISO Calibration</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-divider"></div>
            <h2 className="text-5xl font-black mb-8 italic">OUR MISSION</h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg font-medium">
              Founded on the pillars of **Precision, Reliability, and Integrity**, we serve Myanmar's infrastructure projects with world-class measurement solutions. Our team of certified technicians ensures that your projects are built on a foundation of accurate data.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-off-white border-t-2 border-accent-amber">
                <p className="font-heading text-xs font-bold uppercase text-slate-400 mb-1">Status</p>
                <p className="font-heading text-lg font-bold">ISO CALIBRATED</p>
              </div>
              <div className="p-4 bg-off-white border-t-2 border-accent-amber">
                <p className="font-heading text-xs font-bold uppercase text-slate-400 mb-1">Experts</p>
                <p className="font-heading text-lg font-bold">CERTIFIED HUB</p>
              </div>
              <div className="p-4 bg-off-white border-t-2 border-accent-amber">
                <p className="font-heading text-xs font-bold uppercase text-slate-400 mb-1">Parts</p>
                <p className="font-heading text-lg font-bold">GENUINE ONLY</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-[4/5] bg-primary-navy flex items-center justify-center p-8 group">
              <Construction className="w-24 h-24 text-accent-amber group-hover:scale-125 transition-all duration-500" />
            </div>
            <div className="aspect-[4/5] bg-accent-amber flex items-center justify-center p-8 mt-12 group">
              <FlaskConical className="w-24 h-24 text-primary-navy group-hover:scale-125 transition-all duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Products & Equipment */}
      <section id="products" className="py-24 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic mb-4">INVENTORY</h2>
            <div className="w-24 h-1 bg-accent-amber mx-auto mb-10"></div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {(['all', 'soil', 'concrete', 'survey'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 font-heading font-bold uppercase tracking-widest text-xs transition-all ${activeTab === tab ? 'bg-primary-navy text-white' : 'bg-white border border-slate-200 text-slate-400 hover:border-accent-amber'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-8 card-hover-effect border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-off-white rounded-sm flex items-center justify-center text-accent-amber mb-6">
                      {product.category === 'soil' && <Droplets />}
                      {product.category === 'concrete' && <Construction />}
                      {product.category === 'survey' && <Wind />}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent-amber mb-2">{product.category} Testing</p>
                    <h3 className="text-2xl font-black mb-4 leading-tight italic">{product.name}</h3>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">{product.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {product.specs.map(spec => (
                        <li key={spec} className="flex items-center gap-3 text-xs font-bold text-slate-400 border-b border-slate-50 pb-2">
                          <div className="w-1.5 h-1.5 bg-accent-amber rounded-full" /> {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="w-full py-4 border-2 border-primary-navy font-heading font-bold uppercase tracking-widest text-xs hover:bg-primary-navy hover:text-white transition-all">
                    Enquire Now
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-primary-navy text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="section-divider"></div>
              <h2 className="text-5xl font-black italic mb-8">EXPERT <br/> CARE</h2>
              <p className="text-white/60 mb-10 text-lg leading-relaxed font-medium">
                Our repair facility is equipped with state-of-the-art diagnostic tools to provide certified calibration and repair for all industry-standard equipment.
              </p>
              <ul className="space-y-6">
                {WHY_CHOOSE_US.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-accent-amber group-hover:bg-accent-amber group-hover:text-primary-navy transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-heading font-black text-lg leading-none">{item.title}</p>
                      <p className="text-xs text-white/40 uppercase tracking-wider font-bold">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {SERVICES.map((service) => (
                <div key={service.id} className="p-10 bg-white/5 border border-white/10 hover:border-accent-amber transition-all group">
                   <div className="mb-8 text-accent-amber transform group-hover:scale-110 transition-all">{service.icon}</div>
                   <h3 className="text-2xl font-black italic mb-4">{service.title}</h3>
                   <p className="text-sm text-white/50 leading-relaxed font-medium">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic">CLIENT SUCCESS</h2>
            <div className="w-24 h-1 bg-accent-amber mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-10 bg-off-white border-t-4 border-accent-amber relative">
                <span className="text-8xl text-slate-200 absolute -top-4 -left-2 italic font-serif">"</span>
                <p className="relative z-10 text-slate-600 italic mb-8 leading-relaxed font-medium">
                  The turnaround time on our Total Station was impressive. Myanmar Precision Systems is our go-to partner for all site instrumentation.
                </p>
                <div>
                  <p className="font-heading font-black text-lg">ZAW MYO HTET</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Project Engineer, Bridge Corp</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <div className="section-divider"></div>
            <h2 className="text-5xl font-black italic mb-8">GET IN <br/> TOUCH</h2>
            <p className="text-slate-500 mb-12 text-lg font-medium leading-relaxed">
              Have a specific equipment need or looking to request a service quote? Our technical team is ready to assist you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-primary-navy flex items-center justify-center text-accent-amber shrink-0">
                    <MapPin />
                 </div>
                 <div>
                    <h4 className="font-heading font-black text-lg mb-1">YANGON HEADQUARTERS</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">No. 45, Pyay Road, Hlaing Township, <br/> Yangon, Myanmar</p>
                 </div>
              </div>
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-primary-navy flex items-center justify-center text-accent-amber shrink-0">
                    <Phone />
                 </div>
                 <div>
                    <h4 className="font-heading font-black text-lg mb-1">DIRECT CONTACT</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">+95 9 123 456 789 <br/> info@myanmarprecision.com</p>
                 </div>
              </div>
            </div>

            {/* Static Map Mockup */}
            <div className="mt-12 aspect-video bg-primary-navy/5 border border-slate-200 rounded flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 hero-pattern opacity-10"></div>
               <div className="z-10 flex flex-col items-center">
                  <MapPin className="w-10 h-10 text-accent-amber mb-2" />
                  <span className="font-heading font-bold text-xs uppercase tracking-widest">View on Map</span>
               </div>
            </div>
          </div>

          <div className="bg-white p-10 shadow-2xl border border-slate-100">
            <h3 className="text-3xl font-black italic mb-8">SERVICE ENQUIRY</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Enquiry Sent Successfully!'); }} className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">Full Name</label>
                  <input type="text" required className="w-full bg-off-white border-2 border-slate-100 p-4 font-heading text-sm outline-none focus:border-accent-amber" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">Company Name</label>
                  <input type="text" className="w-full bg-off-white border-2 border-slate-100 p-4 font-heading text-sm outline-none focus:border-accent-amber" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">Phone Number</label>
                  <input type="tel" required className="w-full bg-off-white border-2 border-slate-100 p-4 font-heading text-sm outline-none focus:border-accent-amber" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">Email Address</label>
                  <input type="email" required className="w-full bg-off-white border-2 border-slate-100 p-4 font-heading text-sm outline-none focus:border-accent-amber" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">Enquiry Type</label>
                <select className="w-full bg-off-white border-2 border-slate-100 p-4 font-heading text-sm outline-none focus:border-accent-amber appearance-none">
                  <option>Product Sale</option>
                  <option>Rental Enquiry</option>
                  <option>Repair & Service</option>
                  <option>Calibration Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">Detailed Message</label>
                <textarea rows={4} className="w-full bg-off-white border-2 border-slate-100 p-4 font-heading text-sm outline-none focus:border-accent-amber resize-none"></textarea>
              </div>
              <button className="bg-primary-navy text-white font-heading font-black uppercase tracking-[0.2em] py-5 text-sm hover:bg-accent-amber hover:text-primary-navy transition-all">
                Send enquiry message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 border-2 border-accent-amber flex items-center justify-center font-heading text-2xl font-black tracking-tighter">
                MPS
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-black tracking-tight leading-none">MYANMAR PRECISION</span>
                <span className="text-xs uppercase tracking-[0.3em] text-accent-amber font-black">Systems</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-10 font-medium">
              Your professional partner for laboratory and surveying instrumentation in Myanmar. We deliver precision with local expertise.
            </p>
            <div className="flex gap-4">
              <span className="text-accent-amber text-2xl font-bold italic">PRECISION. 🇲🇲</span>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-heading font-bold uppercase tracking-widest text-accent-amber mb-8 text-sm">Navigation</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/50">
               <li><a href="#about" className="hover:text-white">Our Mission</a></li>
               <li><a href="#products" className="hover:text-white">Product Inventory</a></li>
               <li><a href="#services" className="hover:text-white">Service Center</a></li>
               <li><a href="#contact" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-heading font-bold uppercase tracking-widest text-accent-amber mb-8 text-sm">Direct Office</h4>
            <div className="space-y-6 text-sm font-medium text-white/50 leading-relaxed">
               <p>No. 45, Pyay Road, Hlaing Township, <br/> Yangon, Myanmar</p>
               <p>Phone: +95 9 123 456 789 <br/> Email: info@myanmarprecision.com</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 uppercase tracking-widest font-bold">
           <span>© 2026 Myanmar Precision Systems Ltd. All Rights Reserved.</span>
           <div className="flex gap-8">
              <span>ISO 9001:2015</span>
              <span>GENUINE SPARE PARTS HUB</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
