export default function titleCase(params) {
  const words = params.split(" ");
  const newWords = words.map((word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });
  return newWords.join(" ");
}
