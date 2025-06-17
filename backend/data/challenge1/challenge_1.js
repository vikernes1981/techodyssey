import partitions_filesystem from '../missions/partitions_filesystem.js';

export default {
  questNumber: 1,
  description: "Configure Local Storage",
  story: `Suddenly, a flashing icon appears on your display, accompanied by a blaring alert signal.
You quickly access the message, recognizing the emblem of the Central Cybernetic Command.
The message reads: 'Emergency protocol initiated. Urgent transmission incoming.'
With a sense of apprehension, you accept the transmission, bracing yourself for the impending mission.
A holographic projection materializes before you, displaying the solemn face of a high-ranking officer from the Central Cybernetic Command.
Their voice resonates with urgency as they address you directly:
'Agent Bishop, the stability of the entire cybernetic infrastructure is in jeopardy.'
'An anomaly has been detected in the system, one that threatens to disrupt the delicate balance of our digital world.'
'You, with your unparalleled expertise in Red Hat administration, are our last hope.'
'Your mission is multifaceted, encompassing system diagnostics, filesystem checks, and ensuring data integrity.'
Time is of the essence. The fate of humanity rests in your hands.'
You nod solemnly, understanding the gravity of the situation.
With a determined resolve, you affirm your readiness to embark on the mission and restore stability to the cybernetic infrastructure.
As you navigate through the digital landscape, the urgency of the mission weighs heavily on your mind.
Every command you execute, every diagnostic tool you deploy, is a step towards ensuring the survival of humanity in the digital age.
The fate of countless lives rests on your shoulders, and failure is not an option.`,
  briefing: `Mission: Display all available block devices on a RHEL system.`,
  prompt: `Type your command:`,
    options: [
    {
      id: 'df',
      name: 'List Disk Space',
      action: "You initiate the process to list disk space, a crucial step in understanding the resources available in this digital domain.",
      success_message: "Disk space listed"
    },
    {
      id: 'blkid',
      name: "Get UUIDs",
      action: "With determination, you delve into the depths of the system, seeking to retrieve the UUIDs of the disks.",
      success_message: "UUIDs retrieved"
    },
    {
      id: 'lsblk',
      name: "List Disks and Partitions",
      action: "You navigate the intricate web of disks and partitions, unraveling their secrets one by one.",
      success_message: "Disks and partitions listed"
    },
    {
      id: 'partprobe',
      name: "Force Partition Check",
      action: "With unwavering resolve, you command a forceful partition check, ensuring the stability of the digital landscape.",
      success_message: "Partition check forced"
    }
  ]
}
