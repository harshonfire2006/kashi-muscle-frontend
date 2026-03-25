import { motion } from 'framer-motion';
import { Clock, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const programsData = [
  {
    title: "Elite Powerlifting",
    description: "Squat, Bench, Deadlift. Master the big three with competition-grade Eleiko plates, calibrated steel, and deadlift platforms. Built for those who want to move serious weight and break PRs.",
    intensity: "Maximum",
    duration: "90 Min Sessions",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Combat & MMA",
    description: "Step onto the mats. Our combat conditioning blends Muay Thai, Boxing, and Brazilian Jiu-Jitsu. Build unbreakable cardio, striking precision, and ground control with veteran fighters.",
    intensity: "High",
    duration: "60 Min Classes",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Functional Forge",
    description: "High-intensity interval training meets Olympic lifting. Kettlebells, battle ropes, plyometrics, and rig work designed to forge an engine that never quits and functional strength for the real world.",
    intensity: "Extreme",
    duration: "45 Min Classes",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop"
  }
];

export default function Programs() {
  return (
    <div className="bg-black text-white pt-20">
      {/* Page Header */}
      <section className="py-20 px-6 text-center border-b border-zinc-900 bg-zinc-950">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6"
        >
          Our <span className="text-red-600">Disciplines</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto uppercase tracking-widest font-bold"
        >
          Choose your weapon. Master your craft.
        </motion.p>
      </section>

      {/* Detailed Programs List (Alternating Layout) */}
      <section className="py-24 max-w-[1400px] mx-auto px-6">
        <div className="space-y-32">
          {programsData.map((program, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              {/* Image Half */}
              <div className="w-full md:w-1/2 relative group overflow-hidden border-4 border-zinc-900">
                <div 
                  className="h-[400px] md:h-[600px] w-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${program.image}')` }}
                ></div>
                {/* Red accent block that slides in */}
                <div className={`absolute bottom-0 ${index % 2 !== 0 ? 'right-0' : 'left-0'} w-32 h-2 bg-red-600`}></div>
              </div>

              {/* Text Half */}
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{program.title}</h2>
                <p className="text-lg text-gray-400 leading-relaxed border-l-2 border-red-600 pl-6">
                  {program.description}
                </p>
                
                <div className="flex gap-8 pt-6">
                  <div className="flex items-center gap-3">
                    <Activity className="text-red-600" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Intensity</p>
                      <p className="font-black uppercase">{program.intensity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-red-600" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Duration</p>
                      <p className="font-black uppercase">{program.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brutalist Class Schedule Section */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Training Protocol</h2>
            <p className="text-red-600 font-bold uppercase tracking-widest">Weekly Class Schedule</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-red-600">
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-zinc-500 w-1/4">Time</th>
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-zinc-500 w-1/4">Mon / Wed / Fri</th>
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-zinc-500 w-1/4">Tue / Thu</th>
                  <th className="py-6 px-4 font-black uppercase tracking-widest text-zinc-500 w-1/4">Saturday</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                <tr className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                  <td className="py-6 px-4 font-bold text-red-600">06:00 AM</td>
                  <td className="py-6 px-4 font-black uppercase">Functional Forge</td>
                  <td className="py-6 px-4 font-black uppercase">Combat & MMA</td>
                  <td className="py-6 px-4 font-black uppercase">Open Mat / Lifting</td>
                </tr>
                <tr className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                  <td className="py-6 px-4 font-bold text-red-600">05:30 PM</td>
                  <td className="py-6 px-4 font-black uppercase">Elite Powerlifting</td>
                  <td className="py-6 px-4 font-black uppercase">Functional Forge</td>
                  <td className="py-6 px-4 font-black uppercase text-zinc-600">Closed</td>
                </tr>
                <tr className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                  <td className="py-6 px-4 font-bold text-red-600">07:00 PM</td>
                  <td className="py-6 px-4 font-black uppercase">Combat & MMA</td>
                  <td className="py-6 px-4 font-black uppercase">Elite Powerlifting</td>
                  <td className="py-6 px-4 font-black uppercase text-zinc-600">Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">Ready to step up?</h2>
        <Link to="/contact" className="inline-flex items-center gap-3 px-12 py-5 bg-red-600 text-white font-black uppercase tracking-wider hover:bg-red-700 transition-colors hover:scale-105 active:scale-95">
          Join the Ranks <ArrowRight size={24} />
        </Link>
      </section>
    </div>
  );
}