import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('kishoreyadla100-ux');
  const [userData, setUserData] = useState(null);

  const fetchGitHubData = async (user) => {
    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();
    setUserData(data);
  };

  useEffect(() => { fetchGitHubData(username); }, []);

  return (
    <div className="fade-in flex flex-col items-center">
      {/* Search Header */}
      <h1 className="text-white text-5xl font-black mb-8 drop-shadow-xl tracking-tighter">GITVIBE</h1>
      
      {/* The Glass Card */}
      {userData && (
        <div className="glass-card p-10 w-[380px] flex flex-col items-center text-center">
          <img 
            src={userData.avatar_url} 
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl mb-6"
            alt="profile" 
          />
          <h2 className="text-2xl font-bold text-slate-900">{userData.name || userData.login}</h2>
          <p className="text-sky-600 font-bold mb-4">@{userData.login}</p>
          <p className="text-slate-600 italic mb-6">"{userData.bio || "Building cool things on GitHub!"}"</p>
          
          <div className="flex justify-around w-full border-t border-white/50 pt-6">
            <div>
              <p className="text-xl font-black text-slate-800">{userData.public_repos}</p>
              <p className="text-xs uppercase text-slate-500 font-bold">Repos</p>
            </div>
            <div>
              <p className="text-xl font-black text-slate-800">{userData.followers}</p>
              <p className="text-xs uppercase text-slate-500 font-bold">Followers</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Enter Username..." 
        className="mt-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 text-white placeholder:text-white/70 font-bold outline-none text-center focus:w-80 transition-all"
        onKeyDown={(e) => e.key === 'Enter' && fetchGitHubData(e.target.value)}
      />
    </div>
  );
}

export default App;