import { useState, useEffect } from 'react';
import { ShieldAlert, Database, RefreshCw } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fake authentication for the demo (Password: IRON)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toUpperCase() === 'IRON') {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      alert("Access Denied. Incorrect Clearance Code.");
      setPassword('');
    }
  };

  // Fetch leads from our SQLite database
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://kashi-muscle-backend.onrender.com/api/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 1. The Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-10 text-center">
          <ShieldAlert size={48} className="text-red-600 mx-auto mb-6" />
          <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Restricted Area</h1>
          <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-8">Enter clearance code to access lead database</p>
          
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 px-4 py-4 text-center text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-bold tracking-[0.5em] mb-6" 
            placeholder="••••"
            autoFocus
          />
          <button type="submit" className="w-full py-4 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-colors">
            Authorize
          </button>
        </form>
      </div>
    );
  }

  // 2. The Command Center Dashboard
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-900 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <Database size={24} />
              <span className="uppercase tracking-widest font-black text-sm">System Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Lead Command Center</h1>
          </div>
          
          <button 
            onClick={fetchLeads}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors uppercase font-black text-sm tracking-widest"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin text-red-600" : "text-red-600"} />
            Refresh Data
          </button>
        </div>

        {/* The Data Table */}
        <div className="bg-zinc-950 border border-zinc-900 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-zinc-900 border-b border-zinc-800">
                <th className="py-4 px-6 font-black uppercase tracking-widest text-zinc-400 text-xs w-1/6">Date Logged</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-zinc-400 text-xs w-1/6">Recruit Name</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-zinc-400 text-xs w-1/6">Comms (Phone)</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-zinc-400 text-xs w-1/4">Objective</th>
                <th className="py-4 px-6 font-black uppercase tracking-widest text-zinc-400 text-xs w-1/4">Transmission</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-zinc-500 uppercase tracking-widest font-bold">
                    No leads in the database yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-zinc-900 hover:bg-black transition-colors">
                    <td className="py-6 px-6 text-zinc-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-6 px-6 font-bold uppercase text-white">{lead.name}</td>
                    <td className="py-6 px-6 text-red-500 font-bold">{lead.phone}</td>
                    <td className="py-6 px-6 text-zinc-300 uppercase">{lead.objective}</td>
                    <td className="py-6 px-6 text-zinc-400 italic line-clamp-2">"{lead.message}"</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}