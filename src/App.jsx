// import { useState, useRef } from 'react';
// import { getUserData } from './api/github';
// import { processLanguages } from './utils/dataHelpers';
// import { calculatePersona } from './utils/persona';
// import html2canvas from 'html2canvas';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const cardRef = useRef(null);

  const handleSearch = async () => {
    try {
      const res = await getUserData(username);
      setData({ ...res, persona: calculatePersona(res.repos), langData: processLanguages(res.repos) });
    } catch (e) { alert("User not found!"); }
  };

  const download = async () => {
    const canvas = await html2canvas(cardRef.current, { backgroundColor: '#0f172a' });
    const link = document.createElement('a');
    link.download = 'vibe.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 font-sans">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">GitVibe</h1>
        <div className="flex gap-2 mb-8">
          <input 
            className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800"
            value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
          />
          <button onClick={handleSearch} className="bg-cyan-600 px-4 rounded-lg">Go</button>
        </div>

        {data && (
          <div className="text-center">
            <div ref={cardRef} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <img src={data.profile.avatar_url} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-cyan-400" />
              <h2 className="text-xl font-bold">{data.profile.login}</h2>
              <p className="text-cyan-400 font-mono text-sm mb-4">{data.persona}</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.langData} dataKey="value" nameKey="name" outerRadius={50} fill="#06b6d4">
                      {data.langData.map((_, i) => <Cell key={i} fill={['#22d3ee', '#3b82f6', '#818cf8'][i % 4]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <button onClick={download} className="mt-4 text-cyan-500 text-sm">📸 Download Image</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;