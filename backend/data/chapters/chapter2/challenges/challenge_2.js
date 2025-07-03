// backend/data/chapters/chapter2/challenge2.js

import vdo_admin from './missions/vdo_admin.js';
import fstab_management from './missions/fstab_management.js';
import create_fs from './missions/create_fs.js';

const challenge_2 = {
  id: "challenge_22",
  title: "Configure VDO (Virtual Data Optimizer)",
  story: `
You engage the quantum engines, and your starship hurtles through the void, leaving the planet Stratis behind.
As you traverse the depths of space, your destination comes into view: the enigmatic VDO-351-xy planet.
This planet is known for its intricate network of virtual data optimization systems, presenting unique challenges to cybernetic engineers like yourself.
You prepare yourself for the trials that await as your starship approaches the planet's orbit.

Upon landing on VDO-351-xy, you are greeted by a landscape dominated by towering data towers and swirling virtual clouds.
This planet is a hub of data optimization technology, with VDO systems integrated into every aspect of its infrastructure.
Your mission here is to configure and optimize the VDO systems to maximize data efficiency and storage capacity.

You begin by analyzing the existing VDO configurations, studying their performance metrics and resource utilization.
Using your expertise in cybernetic engineering, you devise strategies to fine-tune the VDO parameters for optimal results.

As you delve deeper into the intricate algorithms of the VDO systems, you encounter unexpected challenges.
Data anomalies and virtual glitches test your problem-solving skills, requiring innovative solutions to overcome.

Through perseverance and ingenuity, you navigate the complexities of the VDO configurations, optimizing them to perfection.
The data towers hum with newfound efficiency, and the virtual clouds shimmer with optimized data streams.

With the VDO systems operating at peak performance, you have fulfilled your mission on the VDO-351-xy planet.
But as you prepare to depart, you know that your journey as a cybernetic engineer is far from over.`,
  briefing: `Mission: Master VDO technology to optimize the planet's data infrastructure.`,
  prompt: `Configure Virtual Data Optimizer systems to maximize storage efficiency:`,
  options: [
    ...vdo_admin.filter(mission => mission.id === 'install_vdo'),
    ...create_fs.filter(mission => mission.id === 'create_vdo'),
    ...vdo_admin.filter(mission => mission.id === 'expand_vdo'),
    ...vdo_admin.filter(mission => mission.id === 'remove_vdo'),
    ...vdo_admin.filter(mission => mission.id === 'list_vdo'),
    ...fstab_management.filter(mission => mission.id === 'add_vdo_fstab'),
    ...vdo_admin.filter(mission => mission.id === 'vdo_write_modes')
  ],
}

export default challenge_2;