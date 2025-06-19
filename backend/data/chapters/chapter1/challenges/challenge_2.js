import logical_volumes from './missions/logical_volumes.js';

const logical_volumes_challenge = {
  id: "challenge_2",
  title: "Manipulate Logical Volumes",
  story: `But optimizing disk space requires more than just creating filesystems.
You recognize the importance of efficient storage management.
Drawing upon your expertise, you decide to create logical volumes to dynamically allocate storage space.
You issue commands to create logical volumes, carefully specifying the size and characteristics of each volume.
As the commands execute, you monitor the progress, ensuring that each logical volume is configured according to the system's requirements.
With each logical volume created, you feel a sense of accomplishment, knowing that you're enhancing the system's storage capabilities.
You meticulously review the attributes of each volume, ensuring that they align with the system's requirements and your intended use cases.
As the logical volumes take shape, you envision the flexibility they will provide in managing data.
From the root filesystem to dedicated spaces for user home directories and system swap, each volume serves a vital role in maintaining system performance.
With the finalization of the logical volumes, you stand back, surveying your handiwork with pride.
The system now possesses the flexibility and scalability needed to handle the challenges of modern computing environments.
With this task completed, you're one step closer to fulfilling your mission and becoming a true master of Red Hat administration.
`,
  briefing: `Demonstrate your skills in managing logical volumes to provide flexible and efficient storage solutions.`,
  prompt: `Perform core logical volume management operations as required. Create, resize, extend, remove, and view logical volumes.`,
  options: logical_volumes,
};

export default logical_volumes_challenge;
