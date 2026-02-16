import React, { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('kishoreyadla100-ux');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async (user) => {
    setLoading(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${user}`);
      const data = await userRes.json();
      setUserData(data);

      const repoRes = await fetch(`https://api.github.com/users/${user}/repos?per_page=10&sort=updated`);
      const repoData = await repoRes.json();
      setRepos(repoData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4 selection:bg-cyan-500">
      {/* Animated Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      {/* Search Header */}
      <div className="w-full max-w-md mb-8">
        <h1 className="text-4xl font-black text-center mb-6 tracking-tighter bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          GITVIBE PRO
        </h1>
        <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <input 
            type="text" 
            placeholder="Search GitHub User..." 
            className="bg-transparent flex-1 px-4 py-2 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && fetchGitHubData(e.target.value)}
          />
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded-xl transition-all">
            Search
          </button>
        </div>
      </div>

      {userData && !loading ? (
        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur-lg opacity-40 animate-pulse"></div>
              <img src={userData.avatar_url} className="w-32 h-32 rounded-full border-4 border-white/10 relative" alt="profile" />
            </div>
            <h2 className="text-2xl font-bold mt-4">{userData.name || userData.login}</h2>
            <p className="text-cyan-400 text-sm font-mono">@{userData.login}</p>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">{userData.bio || "No bio available"}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-y border-white/5">
            <div className="text-center">
              <p className="text-xl font-bold">{userData.public_repos}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Repos</p>
            </div>
            <div className="text-center border-x border-white/5">
              <p className="text-xl font-bold">{userData.followers}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{userData.following}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Following</p>
            </div>
          </div>

          {/* Recent Repos */}
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Latest Projects</h3>
            <div className="space-y-2">
              {repos.slice(0, 3).map(repo => (
                <div key={repo.id} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors">
                  <p className="text-sm font-semibold truncate">{repo.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                    <span className="text-[10px] text-gray-400">{repo.language || 'Markdown'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
      )}
    </div>
  );
}

export default App;