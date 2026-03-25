import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingTiers = [
  {
    name: "Standard Iron",
    price: "₹2,499",
    duration: "per month",
    description: "Full access to the main floor. No frills, just heavy weights and hard work.",
    features: [
      { name: "24/7 Facility Access", included: true },
      { name: "Free Weights & Machines", included: true },
      { name: "Locker Room Access", included: true },
      { name: "Combat & MMA Classes", included: false },
      { name: "Personal Training", included: false },
    ],
    highlighted: false,
  },
  {
    name: "Elite Commando",
    price: "₹4,999",
    duration: "per month",
    description: "The complete arsenal. Full access, all classes, and advanced recovery.",
    features: [
      { name: "24/7 Facility Access", included: true },
      { name: "Free Weights & Machines", included: true },
      { name: "Locker Room Access", included: true },
      { name: "Unlimited Core Classes", included: true },
      { name: "1 PT Session / Month", included: true },
    ],
    highlighted: true, // This makes the middle card pop
  },
  {
    name: "Annual Legacy",
    price: "₹34,999",
    duration: "per year",
    description: "Commit to the grind. The absolute best value for serious athletes.",
    features: [
      { name: "All Elite Features", included: true },
      { name: "Priority Class Booking", included: true },
      { name: "Guest Passes (2/month)", included: true },
      { name: "Free Gym Merchandise", included: true },
      { name: "Diet & Nutrition Plan", included: true },
    ],
    highlighted: false,
  }
];

export default function Memberships() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-black text-white pt-20 pb-32 min-h-screen">
      {/* Header Section */}
      <section className="py-20 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
        >
          Pay the <span className="text-red-600">Price</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto uppercase tracking-widest font-bold mb-16"
        >
          No initiation fees. No hidden contracts. Just choose your tier and get to work.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className={`relative p-8 border-2 transition-all duration-300 ${
                tier.highlighted 
                  ? 'border-red-600 bg-zinc-900 md:-translate-y-4 shadow-[0_0_30px_rgba(220,38,38,0.15)]' 
                  : 'border-zinc-800 bg-black hover:border-zinc-600'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 uppercase tracking-widest font-black text-sm">
                  Most Popular
                </div>
              )}
              
              <div className="border-b border-zinc-800 pb-8 mb-8">
                <h3 className="text-2xl font-black uppercase tracking-wider mb-2">{tier.name}</h3>
                <p className="text-zinc-400 h-12 text-sm">{tier.description}</p>
                <div className="mt-6">
                  <span className="text-5xl font-black tracking-tighter">{tier.price}</span>
                  <span className="text-zinc-500 uppercase tracking-widest text-sm ml-2">{tier.duration}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check size={20} className="text-red-600 flex-shrink-0" />
                    ) : (
                      <X size={20} className="text-zinc-700 flex-shrink-0" />
                    )}
                    <span className={`${feature.included ? 'text-zinc-300' : 'text-zinc-600 line-through'}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                className={`block w-full text-center py-4 uppercase tracking-widest font-black transition-colors ${
                  tier.highlighted 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                Select Plan
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trust Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-32 border-y border-zinc-900 bg-zinc-950 py-12 text-center px-6"
      >
        <p className="text-2xl md:text-3xl font-black uppercase tracking-widest text-zinc-500">
          Corporate & Team Memberships Available. <Link to="/contact" className="text-red-600 hover:text-white transition-colors underline decoration-red-600/30">Inquire Inside.</Link>
        </p>
      </motion.section>
    </div>
  );
}