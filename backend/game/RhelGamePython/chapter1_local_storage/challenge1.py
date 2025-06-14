import CommandGenerator as CommandGenerator
import ChallengeGenerator
import partitions_filesystem


challenge_1 = ChallengeGenerator.ChallengeGenerator(
    quest_number=1,
    description="Configure Local Storage",
    story="""Suddenly, a flashing icon appears on your display, accompanied by a blaring alert signal.
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
The fate of countless lives rests on your shoulders, and failure is not an option.""",
    options=[
        {
            'name': 'List Disk Space',
            'action': "You initiate the process to list disk space, a crucial step in understanding the resources available in this digital domain.",
            'function': partitions_filesystem.check_disk_space_command.execute,
            'success_message': 'Disk space listed'
        },

        {
            'name': 'Get UUIDs',
            'action': "With determination, you delve into the depths of the system, seeking to retrieve the UUIDs of the disks.",
            'function': partitions_filesystem.check_uuid_command,
            'success_message': 'UUIDs retrieved'
        },

        {
            'name': 'List Disks and Partitions',
            'action': "You navigate the intricate web of disks and partitions, unraveling their secrets one by one.",
            'function': partitions_filesystem.check_disks_partitions_command.execute,
            'success_message': 'Disks and partitions listed'
        },

        {
            'name': 'Force Partition Check',
            'action': "With unwavering resolve, you command a forceful partition check, ensuring the stability of the digital landscape.",
            'function': partitions_filesystem.check_force_partition_check_command.execute,
            'success_message': 'Partition check forced'
        }
    ]
)
