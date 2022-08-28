export const fetchAnswer = async() =>{
  const answer = await fetch('https://api.chucknorris.io/jokes/random');
  return answer
}