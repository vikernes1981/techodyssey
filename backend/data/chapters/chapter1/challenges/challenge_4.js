import physical_volumes from './missions/physical_volumes.js';

const challenge_4 = {
  id: "challenge_4", 
  title: "Uncover Physical Volumes Secrets",
  story: `As you journey further into the depths of storage management, you recognize the importance of understanding the physical layer of storage.
Physical volumes serve as the foundation upon which logical volumes and volume groups are built.
To gain a comprehensive understanding of the system's storage infrastructure, you embark on a quest to explore physical volumes.

With curiosity as your guide, you delve into the intricacies of physical volumes.
You examine the available physical storage devices, assessing their characteristics and properties.

Physical volumes represent the raw building blocks of your storage architecture. Understanding how to create, view, and manage these foundational elements is crucial for any Red Hat system administrator. Through this challenge, you'll master the essential commands that control the physical layer of your storage infrastructure.`,
  briefing: `Master physical volume operations to understand the foundation of storage management.`,
  prompt: `Execute physical volume commands to explore the storage foundation:`,
  options: physical_volumes,
}

export default challenge_4;