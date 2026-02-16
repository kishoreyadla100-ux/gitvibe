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
    <div style={{
      backgroundColor: '#38bdf8', // Sky Blue
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      fontFamily: 'sans-serif'
    }}>
      
      {/* Search Area */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '3rem', margin: '0 0 10px 0', fontWeight: '900' }}>GITVIBE</h1>
        <input 
          type="text" 
          placeholder="Search User..."
          onKeyDown={(e) => e.key === 'Enter' && fetchGitHubData(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '15px',
            border: 'none',
            textAlign: 'center',
            fontWeight: 'bold',
            width: '250px'
          }}
        />
      </div>

      {/* The Centered Card */}
      {userData && (
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '30px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '350px',
          textAlign: 'center'
        }}>
          <img 
            src={userData.avatar_url} 
            style={{ width: '120px', height: '120px', borderRadius: '50%', border: '5px solid #e0f2fe' }} 
            alt="profile" 
          />
          <h2 style={{ margin: '20px 0 5px 0', color: '#1e293b', fontSize: '1.5rem' }}>{userData.name || userData.login}</h2>
          <p style={{ color: '#0ea5e9', fontWeight: 'bold', margin: '0 0 20px 0' }}>@{userData.login}</p>
          <p style={{ color: '#64748b', fontStyle: 'italic' }}>"{userData.bio || "No bio here!"}"</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{userData.public_repos}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Repos</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{userData.followers}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Followers</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;