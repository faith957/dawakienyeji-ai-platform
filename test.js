const herbDesc = "Soothes persistent stomach aches and digestive disorders";
const queryNorm = "i have a stomach ache";
const norm = (str) => {
  return str.toLowerCase()
    .replace(/[ĩĩ]/g, 'i')
    .replace(/[ũũ]/g, 'u')
    .replace(/[^a-z0-9\s]/g, ' ');
};
const stopwords = new Set(["i", "have", "a", "the", "and", "of", "to", "for", "in", "is", "it", "on", "with", "at", "using", "how", "do", "you", "use", "what", "can", "treat", "cure", "remedy", "medicinal", "plant", "herb", "for", "about", "find", "search", "where", "my", "some", "any", "me", "give", "tell"]);
const queryKeywords = queryNorm.split(/\s+/).filter(word => word.length > 2 && !stopwords.has(word));
const finalQueryWords = queryKeywords.length > 0 ? queryKeywords : queryNorm.split(/\s+/).filter(w => w.length > 1);

const fields = [norm(herbDesc)];

console.log('Querywords:', finalQueryWords);
console.log('Fields:', fields);

const match = finalQueryWords.some(word => fields.some(f => f && f.includes(word)));
console.log('Match:', match);
