// backend/data/chapters/chapter2/challenge4.js

import create_fs from './missions/create_fs.js';
import inspect_fs from './missions/inspect_fs.js';
import repair_fs from './missions/repair_fs.js';

const challenge_4 = {
  id: "challenge_24",
  title: "Manage Filesystems and Perform Repairs",
  story: `
After a journey through the depths of space, you finally arrive in orbit around the planet Ext4-vfat-xfs.
The planet's surface is a patchwork of landscapes, each representing a different filesystem type: Ext4, VFAT, and XFS.

As your starship descends through the atmosphere, you catch glimpses of the diverse terrain below: sprawling forests of Ext4, vast plains of VFAT, and towering mountains of XFS.

Touching down on the planet's surface, you are immediately struck by the sheer diversity of filesystems that surround you.

Your mission here is to explore these filesystems, understanding their strengths and weaknesses, and harnessing their power to advance cybernetic engineering.

You begin your exploration by venturing into the Ext4 forests, where files and directories grow like towering trees, rooted in the digital soil of the planet.
The Ext4 filesystems offer stability and reliability, providing a solid foundation for data storage and retrieval.

Next, you journey into the VFAT plains, where files roam freely like herds of digital beasts, unencumbered by the complexities of traditional filesystems.
VFAT filesystems offer compatibility and simplicity, making them ideal for interoperability between different systems and devices.

Finally, you scale the towering mountains of XFS, where data flows like rivers of information, carving paths through the digital landscape.
XFS filesystems excel in scalability and performance, capable of handling vast amounts of data with lightning-fast speed.

As you explore each filesystem, you gain valuable insights and knowledge, honing your skills as a cybernetic engineer.
With each step, you draw closer to mastering the diverse ecosystems of Ext4-vfat-xfs, unlocking new possibilities for cybernetic innovation.

Explore the realm of filesystems and wield the power to create, inspect, and repair them.`,
  briefing: `Mission: Master the art of filesystem management across multiple filesystem types.`,
  prompt: `Navigate the diverse filesystem landscapes and demonstrate your mastery of creation, inspection, and repair:`,
  options: [
    ...create_fs.filter(mission => mission.id === 'create_ext4'),
    ...repair_fs.filter(mission => mission.id === 'repair_ext4'),
    ...inspect_fs.filter(mission => mission.id === 'inspect_ext4'),
    ...create_fs.filter(mission => mission.id === 'create_vfat'),
    ...repair_fs.filter(mission => mission.id === 'repair_vfat'),
    ...create_fs.filter(mission => mission.id === 'create_xfs'),
    ...repair_fs.filter(mission => mission.id === 'repair_xfs'),
    ...inspect_fs.filter(mission => mission.id === 'xfs_info')
  ],
}

export default challenge_4;