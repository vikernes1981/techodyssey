import partitions_filesystem from './missions/partitions_filesystem.js';

const challenge_1 = {
  id: "challenge_1",
  title: "Create and Configure Filesystems",
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
    options: partitions_filesystem,
}

export default challenge_1;
