import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('kishoreyadla100-ux');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async (user) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${user}`);
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, []);

  return (
    /* This main div handles the Sky Blue background and centering */
    <div className="fixed inset-0 bg-sky-400 flex flex-col items-center justify-center p-6 overflow-y-auto">
      
      {/* Title & Search - Centered */}
      <div className="w-full max-w-md text-center mb-6">
        <h1 className="text-4xl font-black text-white mb-6 drop-shadow-lg uppercase tracking-widest">
          GitVibe
        </h1>
        <div className="bg-white/20 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-white/30">
          <input 
            type="text" 
            placeholder="Search GitHub Username..." 
            className="w-full bg-transparent px-4 py-2 text-white placeholder:text-sky-100 text-center font-bold outline-none"
            onKeyDown={(e) => e.key === 'Enter' && fetchGitHubData(e.target.value)}
          />
        </div>
      </div>

      {/* Profile Card - Dead Center */}
      {userData && !loading ? (
        <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 flex flex-col items-center text-center transform transition-all hover:scale-[1.02]">
          <img 
            src={userData.avatar_url} 
            alt="profile" 
            className="w-32 h-32 rounded-full border-8 border-sky-50 shadow-lg"
          />
          
          <h2 className="mt-6 text-3xl font-extrabold text-slate-800 leading-tight">
            {userData.name || userData.login}
          </h2>
          
          <p className="text-sky-500 font-mono font-bold mt-1 text-lg">@{userData.login}</p>
          
          <div className="w-12 h-1 bg-sky-100 my-6 rounded-full"></div>
          
          <p className="text-slate-500 text-lg leading-relaxed italic px-2">
            "{userData.bio || "This GitHub star is too cool for a bio."}"
          </p>

          {/* Stats Bar */}
          <div className="flex justify-between w-full mt-10 px-4">
            <div>
              <p className="text-2xl font-black text-slate-800">{userData.public_repos}</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Repos</p>
            </div>
            <div className="w-[1px] bg-slate-100 h-10"></div>
            <div>
              <p className="text-2xl font-black text-slate-800">{userData.followers}</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Followers</p>
            </div>
            <div className="w-[1px] bg-slate-100 h-10"></div>
            <div>
              <p className="text-2xl font-black text-slate-800">{userData.following}</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Following</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold tracking-widest uppercase text-sm">Loading Vibe...</p>
        </div>
      )}
    </div>
  );
}

export default App;