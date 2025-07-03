import volume_groups from './missions/volume_groups.js';

const challenge_3 = {
  id: "challenge_3", 
  title: "Conquer Volume Groups",
  story: `As you journey through the digital landscape of the Red Hat Odyssey, you encounter a multitude of challenges.
One of the most pressing tasks at hand is the optimization of system storage.
With the growth of data and the increasing demands on the system, efficient storage management is paramount.

You embark on a quest to explore storage management techniques, determined to enhance the system's capabilities.
Your journey begins with an exploration of logical volumes and volume groups, fundamental components of storage organization.

In your quest, you delve into the intricacies of logical volumes.
These logical volumes serve as flexible containers for data, allowing for dynamic allocation and resizing.
With careful planning and configuration, you create logical volumes tailored to the system's requirements, ensuring efficient storage utilization.`,
  briefing: `Master volume group operations to optimize storage management.`,
  prompt: `Execute volume group commands as required:`,
  options: volume_groups,
}

export default challenge_3;