export const calculatePersona = (repos) => {
  if (!repos || repos.length === 0) return "The Newcomer 🐣";
  return repos.length > 20 ? "The Code Crusader ⚔️" : "The Explorer 🔍";
};