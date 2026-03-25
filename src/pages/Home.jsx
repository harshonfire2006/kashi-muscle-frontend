import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Home() {
  const slowFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <div className="bg-black text-white selection:bg-red-600 selection:text-white">
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        
        <motion.div 
          className="relative z-10 text-center px-4 w-full max-w-5xl mt-20"
          initial="hidden" animate="visible" variants={slowFade}
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white drop-shadow-lg">
            Forge Your <span className="text-red-600">Legacy</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-medium uppercase tracking-widest mb-10 max-w-3xl mx-auto">
            No gimmicks. No excuses. Just heavy iron and real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="px-10 py-5 bg-red-600 text-white text-lg font-black uppercase tracking-wider hover:bg-red-700 transition-colors border-2 border-red-600">
              Start Training
            </Link>
            <Link to="/programs" className="px-10 py-5 bg-transparent text-white text-lg font-black uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-colors">
              Our Disciplines
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. Scrolling Ticker */}
      <div className="w-full bg-red-600 py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-pulse flex space-x-12 text-black font-black uppercase tracking-widest text-xl">
          <span>• 24/7 Access</span><span>• Elite Powerlifting</span><span>• Olympic Weightlifting</span><span>• Functional Fitness</span>
          <span>• 24/7 Access</span><span>• Elite Powerlifting</span><span>• Olympic Weightlifting</span><span>• Functional Fitness</span>
          <span>• 24/7 Access</span><span>• Elite Powerlifting</span><span>• Olympic Weightlifting</span><span>• Functional Fitness</span>
        </div>
      </div>

      {/* 3. The Arsenal (Programs) */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Arsenal</h2>
          <Link to="/programs" className="text-red-600 font-bold uppercase tracking-wider hover:text-red-500 hidden md:block">
            View All Core Programs →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgramCard title="Strength & Power" image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" />
          <ProgramCard title="Combat & Conditioning" image="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1470&auto=format&fit=crop" />
          <ProgramCard title="Recovery Zone" image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop" />
        </div>
      </section>

      {/* 4. Elite Coaches Section */}
      <section className="py-24 bg-zinc-950 px-6 md:px-12 border-t border-zinc-900">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-12 text-center">Elite Commanders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CoachCard name="Vikram Singh" specialty="Head Strength Coach" image="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" />
            <CoachCard name="Rahul Sharma" specialty="Combat / MMA" image="https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1373&auto=format&fit=crop" />
            <CoachCard name="Priya Patel" specialty="Olympic Weightlifting" image="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop" />
          </div>
        </div>
      </section>

      {/* 5. Gritty Testimonial / Proof */}
      <section className="py-32 relative flex items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438097544-e2741584db25?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20"></div>
        <div className="relative z-10 max-w-4xl">
          <svg className="w-12 h-12 mx-auto mb-6 text-red-600 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-8">
            "I walked in looking for a gym. I found an absolute war room. Best facility in the city, hands down."
          </h3>
          <p className="text-xl text-red-600 font-bold uppercase tracking-widest">— Amit D., Member since 2024</p>
        </div>
      </section>

      {/* 6. Location & Final CTA Footer Placeholder */}
      <section className="py-24 bg-zinc-950 border-t-4 border-red-600 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tight mb-6">Ready to Bleed?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">Drop in for a free trial session. Experience the heaviest weights and the hardest workers in Varanasi.</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-gray-300"><MapPin className="text-red-600" /> <span>Lanka Main Rd, near BHU, Varanasi, UP 221005</span></div>
              <div className="flex items-center gap-4 text-gray-300"><Phone className="text-red-600" /> <span>+91 98765 43210</span></div>
              <div className="flex items-center gap-4 text-gray-300"><Mail className="text-red-600" /> <span>iron@kashimuscle.com</span></div>
            </div>
            <Link to="/contact" className="inline-block px-10 py-4 bg-red-600 text-white font-black uppercase tracking-wider hover:bg-red-700 transition-colors">
              Claim Free Trial
            </Link>
          </div>
          {/* Placeholder for a gritty map image */}
          <div className="h-[400px] w-full bg-zinc-900 border border-zinc-800 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop" alt="Map Location" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
            <span className="relative z-10 font-bold tracking-widest uppercase text-zinc-500">Interactive Map Integration</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProgramCard({ title, image }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="relative h-[450px] group overflow-hidden cursor-pointer bg-zinc-900"
    >
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url('${image}')` }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-2">{title}</h3>
        <div className="h-1 w-12 bg-red-600 transition-all duration-300 group-hover:w-full"></div>
      </div>
    </motion.div>
  );
}

function CoachCard({ name, specialty, image }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-[400px] mb-6 overflow-hidden border-2 border-transparent group-hover:border-red-600 transition-colors">
        <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500" style={{ backgroundImage: `url('${image}')` }}></div>
      </div>
      <h3 className="text-2xl font-black uppercase tracking-wider">{name}</h3>
      <p className="text-red-600 font-bold uppercase tracking-widest text-sm mt-1">{specialty}</p>
    </div>
  );
}