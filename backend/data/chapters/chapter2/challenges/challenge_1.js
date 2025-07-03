import stratis_storage from './missions/stratis_storage.js';
import fstab_management from './missions/fstab_management.js';

const challenge_1 = {
  id: "challenge_21",
  title: "Configure Stratis Storage Management",
  story: `
You engage the quantum engines, and your starship hurtles through the void, bound for the planet Stratis.
Stratis, a world shrouded in mystery and danger, is your first destination on this epic quest.

As you approach the planet's orbit, your sensors detect anomalies in the Stratisian atmosphere.
A voice crackles over the comm system, 'Welcome to Stratis, engineer. Prepare to face the challenges that lie ahead.'
You brace yourself for what awaits as your starship descends towards the unknown terrain of Stratis.

You land your starship on the rugged surface of Stratis, surrounded by rocky terrain and swirling mists.
Your first task is to establish a base of operations and assess the resources available on this alien world.
Scanners indicate the presence of valuable minerals nearby, but also signs of indigenous life forms.
As you step out onto the planet's surface, you are greeted by the eerie sounds of Stratisian wildlife echoing in the distance.

Time is of the essence. You must configure advanced storage management systems to survive on this hostile planet.
The secrets of Stratis storage technology await your discovery.`,
  briefing: `Mission: Master Stratis Storage Management to establish your base operations.`,
  prompt: `Configure Stratis storage systems to secure your foothold on this alien world:`,
  options: [...stratis_storage, ...fstab_management],
}

export default challenge_1;