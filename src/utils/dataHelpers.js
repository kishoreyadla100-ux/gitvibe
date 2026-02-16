export const processLanguages = (repos) => {
  const counts = {};
  repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
  return Object.keys(counts).map(name => ({ name, value: counts[name] }));
};