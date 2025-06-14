import logical_volumes
import CommandGenerator as CommandGenerator
import ChallengeGenerator

challenge_2 = ChallengeGenerator.ChallengeGenerator(
    quest_number=2,
    description="Manipulate Logical Volumes",
    story="""\nBut optimizing disk space requires more than just creating filesystems.
You recognize the importance of efficient storage management.
Drawing upon your expertise, you decide to create logical volumes to dynamically allocate storage space.\n
You issue commands to create logical volumes, carefully specifying the size and characteristics of each volume.
As the commands execute, you monitor the progress, ensuring that each logical volume is configured according to the system's requirements.\n
With each logical volume created, you feel a sense of accomplishment, knowing that you're enhancing the system's storage capabilities.
You meticulously review the attributes of each volume, ensuring that they align with the system's requirements and your intended use cases.
As the logical volumes take shape, you envision the flexibility they will provide in managing data.
From the root filesystem to dedicated spaces for user home directories and system swap, each volume serves a vital role in maintaining system performance.
With the finalization of the logical volumes, you stand back, surveying your handiwork with pride.
The system now possesses the flexibility and scalability needed to handle the challenges of modern computing environments.
With this task completed, you're one step closer to fulfilling your mission and becoming a true master of Red Hat administration.\n""",
    options=[
        {
            'name': 'Create Logical Volume',
            'action': 'With a deft hand, you weave the fabric of the digital realm, crafting a new logical volume from the raw essence of data',
            'function': logical_volumes.check_create_logical_volume_command.execute,
            'success_message': 'Logical volume created successfully!\n',
        },
        {
            'name': 'Resize Logical Volume',
            'action': 'With precision and care, you resize a logical volume, reshaping its boundaries to accommodate the ever-changing needs of the digital landscape.',
            'function': logical_volumes.check_resize_logical_volume_command.execute,
            'success_message': 'Logical volume resized successfully!\n'
        },
        {
            'name': 'Remove Logical Volume',
            'action': 'With resolve in your heart, you remove a logical volume, untangling its threads from the tapestry of the digital universe.',
            'function': logical_volumes.check_remove_logical_volume_command.execute,
            'success_message': 'Logical volume removed successfully!\n'
        },
        {
            'name': 'Extend Logical Volume',
            'action': 'ith determination fueling your actions, you extend a logical volume, stretching its boundaries to encompass new horizons.',
            'function': logical_volumes.check_extend_logical_volume_command.execute,
            'success_message': 'Logical volume extended successfully!\n'
        },
        {
            'name': 'View Logical Volume',
            'action': 'With curiosity guiding your hand, you peer into the depths of a logical volume, seeking knowledge and understanding.',
            'function': logical_volumes.check_view_logical_volume_command.execute,
            'success_message': 'Logical volume viewed successfully!\n'
        }
    ]
)
