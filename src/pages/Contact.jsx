import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Crosshair } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State to hold the actual form data as the user types
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    objective: 'General Membership Inquiry',
    message: ''
  });

  // Handle typing in the inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // The critical function that sends the data to your SQLite backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Using 127.0.0.1 bypasses the Node localhost bug
      const response = await fetch('https://kashi-muscle-backend.onrender.com/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form for the next recruit
        setFormData({ name: '', phone: '', objective: 'General Membership Inquiry', message: '' });
      } else {
        alert("Transmission failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Unable to connect to the server. Check your backend terminal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 pt-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full lg:w-5/12 space-y-12">
            <div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none text-white drop-shadow-lg">
                Drop The <br/><span className="text-red-600 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Excuses.</span>
              </h1>
              <p className="text-xl text-zinc-400 font-bold uppercase tracking-widest border-l-4 border-red-600 pl-6 py-2">
                Whether you're looking for a free trial or ready to commit to the iron, send the transmission below. We read every message.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-zinc-900">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="p-4 bg-zinc-900 group-hover:bg-red-600 transition-colors duration-300"><MapPin size={28} className="text-red-600 group-hover:text-white transition-colors" /></div>
                <div><h4 className="text-zinc-500 uppercase tracking-widest text-sm font-black mb-1">Location</h4><p className="text-xl font-bold uppercase">Lanka Main Rd, near BHU<br/>Varanasi, UP 221005</p></div>
              </div>
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="p-4 bg-zinc-900 group-hover:bg-red-600 transition-colors duration-300"><Phone size={28} className="text-red-600 group-hover:text-white transition-colors" /></div>
                <div><h4 className="text-zinc-500 uppercase tracking-widest text-sm font-black mb-1">Comms</h4><p className="text-xl font-bold uppercase">+91 98765 43210</p></div>
              </div>
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="p-4 bg-zinc-900 group-hover:bg-red-600 transition-colors duration-300"><Mail size={28} className="text-red-600 group-hover:text-white transition-colors" /></div>
                <div><h4 className="text-zinc-500 uppercase tracking-widest text-sm font-black mb-1">Digital</h4><p className="text-xl font-bold uppercase">iron@kashimuscle.com</p></div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: The Wired Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full lg:w-7/12">
            <div className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 via-red-500 to-red-800"></div>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-black text-zinc-500">Full Name</label>
                        <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-black border border-zinc-800 px-4 py-4 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all uppercase font-bold" placeholder="JOHN DOE" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-black text-zinc-500">Phone Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-black border border-zinc-800 px-4 py-4 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-bold" placeholder="+91 00000 00000" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-zinc-500">Primary Objective</label>
                      <select name="objective" value={formData.objective} onChange={handleChange} className="w-full bg-black border border-zinc-800 px-4 py-4 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all uppercase font-bold appearance-none cursor-pointer">
                        <option>General Membership Inquiry</option>
                        <option>Claim Free Trial</option>
                        <option>Personal Training</option>
                        <option>Combat & MMA Programs</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-zinc-500">Your Message</label>
                      <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full bg-black border border-zinc-800 px-4 py-4 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-bold resize-none" placeholder="TELL US ABOUT YOUR GOALS..."></textarea>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-3 disabled:opacity-50">
                      {isLoading ? 'Transmitting...' : 'Initiate Protocol'} <Crosshair size={20} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 border-4 border-red-600 rounded-full flex items-center justify-center mb-8"><Crosshair size={40} className="text-red-600" /></div>
                    <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Command Received</h2>
                    <p className="text-zinc-400 uppercase tracking-widest font-bold max-w-md mx-auto">Your transmission has been logged. One of our commanders will contact you shortly.</p>
                    <button onClick={() => setIsSubmitted(false)} className="mt-12 text-zinc-500 hover:text-red-600 uppercase tracking-widest font-black text-sm transition-colors border-b border-transparent hover:border-red-600 pb-1">
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}