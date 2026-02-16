import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  // --- LOGIC DIRECTLY IN APP ---
  const handleSearch = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
      
      const repos = repoRes.data;
      const profile = userRes.data;

      // Calculate Languages
      const counts = {};
      repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
      const langData = Object.keys(counts).map(name => ({ name, value: counts[name] }));

      // Calculate Persona
      let persona = "The Code Explorer 🔍";
      const topLang = langData.sort((a,b) => b.value - a.value)[0]?.name;
      if (repos.length > 50) persona = "The Open Source Legend 🏆";
      else if (topLang === 'JavaScript' || topLang === 'TypeScript') persona = "The Web Wizard 🧙‍♂️";
      else if (topLang === 'Python') persona = "The Data Scientist 🐍";

      setData({ profile, langData, persona });
    } catch (err) {
      alert("User not found!");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: '#020617', scale: 2 });
      const link = document.createElement('a');
      link.download = `${username}-vibe.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-cyan-400">GitVibe</h1>
        <p className="text-slate-500 text-sm">Your GitHub DNA, Visualized.</p>
      </header>

      <div className="w-full max-w-md flex gap-2 mb-10">
        <input 
          className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-xl outline-none focus:ring-2 ring-cyan-500"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-cyan-600 hover:bg-cyan-500 px-6 rounded-xl font-bold transition-all">
          {loading ? '...' : 'Go'}
        </button>
      </div>

      {data && (
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div ref={cardRef} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl text-center">
            <img src={data.profile.avatar_url} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-500" alt="avatar" />
            <h2 className="text-2xl font-bold">{data.profile.name || data.profile.login}</h2>
            <p className="text-cyan-400 font-mono font-bold uppercase tracking-widest text-sm mb-6">{data.persona}</p>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.langData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={50} paddingAngle={5}>
                    {data.langData.map((_, i) => (
                      <Cell key={i} fill={['#22d3ee', '#3b82f6', '#818cf8', '#c084fc'][i % 4]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '8px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-600 mt-6 tracking-[0.3em] uppercase">Verified GitVibe Report</p>
          </div>
          
          <button onClick={downloadImage} className="w-full mt-6 text-cyan-500 font-bold hover:text-cyan-400 transition-colors">
            📸 Download Persona Card
          </button>
        </div>
      )}
    </div>
  );
}