export const extractSkills = (text) => {
  const skillsList = ["javascript","react","node","express","mongodb","python","java","c++","html","css","mysql","git","github","docker"];
  const lowerText = text.toLowerCase();
  return skillsList.filter(skill => lowerText.includes(skill));
};

export const extractExperience = (text) => {
  const matches = text.match(/(\d+)\+?\s*(years|year|months|month|week|weeks)/gi);
  return matches || ["Not clearly mentioned"];
};

export const extractEducation = (text) => {
  const keywords = ["b.tech","bachelor","master","m.tech","degree","bsc","msc"];
  const lowerText = text.toLowerCase();
  const found = keywords.filter(w => lowerText.includes(w));
  return found.length ? found : ["Not found"];
};

export const calculateScore = (skills, experience, education) => {
  let score = 0;
  score += Math.min(skills.length * 5, 40);
  if (experience[0] !== "Not clearly mentioned") score += 30;
  if (education[0] !== "Not found") score += 30;
  return score;
};