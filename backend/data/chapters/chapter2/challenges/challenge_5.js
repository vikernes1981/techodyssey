// backend/data/chapters/chapter2/challenge5.js
import systemAdmin from './missions/systemAdmin.js';

const challenge_5 = {
  id: "challenge_25",
  title: "Manage Groups, Directories, Ownership, and Systems",
  story: `You have completed your inspection of the XFS filesystems on Ext4-vfat-xfs, ensuring their optimal condition for data storage.

However, new opportunities and challenges beckon from afar. You receive a transmission notifying you of a pressing need for your expertise on the planet Managius-Permissius.

Known for its mastery in data management and permissions control, Managius-Permissius offers a new frontier for exploration and advancement in your field.

With a sense of purpose and anticipation, you bid farewell to the familiar landscapes of Ext4-vfat-xfs and set course for the distant planet.

As your starship navigates through the vastness of space, you can't help but ponder the mysteries that await you on Managius-Permissius.

Stepping out onto the alien soil of Managius-Permissius, you are immediately enveloped by the sights and sounds of this vibrant world.

Your mission on Managius-Permissius is clear: to apply your expertise in data management and permissions control to help advance the planet's technological capabilities.

With a renewed sense of purpose, you embark on this new chapter of your journey, ready to face whatever challenges come your way.`,
  
  briefing: `Mission: Master the fundamentals of Linux system administration including user management, group management, directory operations, and permissions control on the planet Managius-Permissius.`,
  
  prompt: `Navigate through the essential system administration tasks to establish proper data governance and access control on this advanced planet:`,
  
  options: [
    ...systemAdmin.filter(mission => mission.id === 'add_group'),
    ...systemAdmin.filter(mission => mission.id === 'create_directory'),
    ...systemAdmin.filter(mission => mission.id === 'change_ownership'),
    ...systemAdmin.filter(mission => mission.id === 'change_permissions'),
    ...systemAdmin.filter(mission => mission.id === 'add_user'),
    ...systemAdmin.filter(mission => mission.id === 'modify_user')
  ],
}

export default challenge_5;