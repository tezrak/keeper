// Hash function to convert a string seed to a numeric value
function stringToSeed(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function shuffleArray<T>(inputArray: Array<T>, seed: number): Array<T> {
  const arrayCopy = [...inputArray];
  let currentIndex = arrayCopy.length;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    const randomIndex = Math.floor(pseudoRandom(seed) * currentIndex);
    currentIndex -= 1;
    seed += 1;

    // And swap it with the current element
    const temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function getRandomElement<T>(array: Array<T>, seed: string): T {
  const seededHash = stringToSeed(seed);
  const shuffledArray = shuffleArray(array, seededHash);
  return shuffledArray[0];
}
