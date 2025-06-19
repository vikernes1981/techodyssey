import challenge_1 from './chapter1/challenges/challenge_1.js';
import challenge_2 from './chapter1/challenges/challenge_2.js';

const chapters = [
  {
    id: "chapter_1",
    name: "Local Storage",
    story: `Your journey into Red Hat system administration begins with mastering local storage management. Efficient allocation, manipulation, and maintenance of local storage form the backbone of any reliable server. In this chapter, you'll tackle real-world tasks essential for handling disks, partitions, and logical volumes, ensuring the system remains robust and adaptable.`,
    challenges: [
      challenge_1,
      challenge_2
    ]
  }
];

export default chapters;
