import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import Home from './pages/Home';
import Programs from './pages/Programs';
import Memberships from './pages/Memberships';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Metrics from './pages/Metrics';

function App() {
  // State to track if the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to close the menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
        
        {/* Global Navigation */}
        <nav className="fixed w-full z-50 bg-black/95 backdrop-blur-md border-b border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-6 py-5 flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" onClick={closeMenu} className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white flex items-center gap-2 relative z-50">
              KASHI <span className="text-red-600">MUSCLE</span>
            </Link>
            
            {/* Desktop Menu (Hidden on phones) */}
            <div className="hidden md:flex items-center gap-10 text-gray-300 font-bold uppercase tracking-widest text-sm">
              <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
              <Link to="/programs" className="hover:text-red-600 transition-colors">Programs</Link>
              <Link to="/memberships" className="hover:text-red-600 transition-colors">Memberships</Link>
              <Link to="/metrics" className="hover:text-red-600 transition-colors">Calculator</Link>
              
              <Link to="/contact" className="px-6 py-3 bg-red-600 text-white text-sm font-black uppercase tracking-widest border-2 border-red-600 hover:bg-transparent hover:text-red-600 transition-all ml-4">
                Join Now
              </Link>
            </div>

            {/* Mobile Menu Toggle Button (Hidden on desktops) */}
            <button 
              className="md:hidden relative z-50 text-white hover:text-red-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
            
          </div>
        </nav>

        {/* Animated Fullscreen Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black pt-32 px-6 flex flex-col md:hidden"
            >
              <div className="flex flex-col gap-8 text-2xl font-black uppercase tracking-widest">
                <Link to="/" onClick={closeMenu} className="border-b border-zinc-900 pb-4 hover:text-red-600 transition-colors">Home</Link>
                <Link to="/programs" onClick={closeMenu} className="border-b border-zinc-900 pb-4 hover:text-red-600 transition-colors">Programs</Link>
                <Link to="/memberships" onClick={closeMenu} className="border-b border-zinc-900 pb-4 hover:text-red-600 transition-colors">Memberships</Link>
                {/* Added Calculator to Mobile Menu! */}
                <Link to="/metrics" onClick={closeMenu} className="border-b border-zinc-900 pb-4 hover:text-red-600 transition-colors">Calculator</Link>
                
                <Link to="/contact" onClick={closeMenu} className="py-5 mt-4 bg-red-600 text-white text-center border-2 border-red-600 hover:bg-transparent hover:text-red-600 transition-all">
                  Join Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="min-h-screen bg-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/metrics" element={<Metrics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;