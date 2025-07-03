// backend/data/chapters/chapter2/challenge3.js

import autofs_client from './missions/autofs_client.js';

const challenge3 = {
  id: "challenge_23",
  title: "Configure Autofs on Server and Client sides and Install NFS",
  story: `
As you leave the VDO-351-xy planet behind, your starship charts a course for new horizons.
After a journey through the cosmic void, you arrive in orbit around the Auto-q652-FS planet.
This celestial body is renowned for its advanced autonomous filesystem management, overseen by the Autofs system.

Touching down on Auto-q652-FS, you are greeted by a landscape dominated by towering data structures and intricate filesystem networks.
The planet's infrastructure hums with activity as Autofs dynamically manages filesystems to meet the ever-changing demands of its inhabitants.

Your mission on Auto-q652-FS is clear: to optimize the Autofs configurations and ensure the planet's filesystems operate with maximum efficiency and reliability.

Your first task is to explore the capabilities of Autofs and unlock its full potential.
You delve deep into the system, encountering a myriad of options and parameters waiting to be configured.

From defining mount points to specifying filesystem types, each decision you make will shape the way data is accessed and managed on the planet.

With careful consideration, you begin to fine-tune the Autofs configurations, optimizing them to meet the specific needs of Auto-q652-FS.

Whether it's setting up automount maps for network shares or configuring timeout settings for idle filesystems, you leave no stone unturned in your quest for perfection.`,
  briefing: `Mission: Master Autofs and NFS technologies to create a seamless network filesystem infrastructure.`,
  prompt: `Configure autonomous filesystem management to revolutionize data access across the planet:`,
  options: [...autofs_client],
}

export default challenge3;