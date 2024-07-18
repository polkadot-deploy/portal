export const generateRandomName = () => {
    const adjectives = [
        'quick', 'lazy', 'happy', 'sad', 'bright', 'dark', 'ancient', 'modern',
        'brave', 'clever', 'wise', 'bold', 'fierce', 'gentle', 'mighty', 'noble',
        'graceful', 'jolly', 'lively', 'mysterious', 'quiet', 'silly', 'zany', 'swift',
        'shiny', 'sparkly', 'blazing', 'calm', 'daring', 'eager', 'faithful', 'glorious'
      ];
      
      const colors = [
        'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'gray',
        'black', 'white', 'brown', 'violet', 'indigo', 'cyan', 'magenta', 'scarlet',
        'turquoise', 'lavender', 'emerald', 'gold', 'silver', 'bronze', 'crimson', 'teal',
        'amber', 'burgundy', 'coral', 'fuchsia', 'jade', 'lime', 'navy', 'peach'
      ];
      
      const animals = [
        'fox', 'dog', 'cat', 'lion', 'tiger', 'elephant', 'giraffe', 'zebra',
        'wolf', 'bear', 'eagle', 'hawk', 'shark', 'whale', 'dolphin', 'falcon',
        'rabbit', 'kangaroo', 'panda', 'koala', 'leopard', 'cheetah', 'bison', 'buffalo',
        'otter', 'penguin', 'raven', 'parrot', 'owl', 'lynx', 'swan', 'cobra'
      ];
  
    const getRandomWord = (words) => words[Math.floor(Math.random() * words.length)];
  
    const randomName = `${getRandomWord(adjectives)}-${getRandomWord(colors)}-${getRandomWord(animals)}`;
  
    return randomName;
};