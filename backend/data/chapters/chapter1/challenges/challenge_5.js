import fdisk_guides from './missions/fdisk_guides.js';

const challenge_5 = {
  id: "challenge_5", 
  title: "Master Partition Creation with fdisk",
  story: `As you further explore storage management, you realize the need to partition available storage space to organize data effectively.
Partitioning allows for better utilization of storage resources and facilitates the management of data.
To accomplish this task, you embark on a quest to master the fdisk utility.

With determination, you assess the storage devices available for partitioning and the desired partition layout.
You consider factors such as partition sizes, types, and mount points, ensuring a well-organized storage structure.

The fdisk utility represents one of the most fundamental tools in Linux system administration. Through its command-line interface, you can create, modify, and delete partitions with precision. Understanding fdisk is essential for any administrator who works with storage systems.

This challenge will guide you through the essential partition management techniques, from basic operations to advanced partition type configurations.`,
  briefing: `Master the fdisk utility through comprehensive guides and interactive examples.`,
  prompt: `Explore the fdisk guides to understand partition management:`,
  options: fdisk_guides,
}

export default challenge_5;