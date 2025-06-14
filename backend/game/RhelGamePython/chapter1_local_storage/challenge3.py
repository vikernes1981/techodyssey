import volume_groups
import ChallengeGenerator
import CommandGenerator as CommandGenerator

challenge_3 = ChallengeGenerator.ChallengeGenerator(
    quest_number=3,
    description="Conquer Volume Groups",
    story="""\nAs you journey through the digital landscape of the Red Hat Odyssey, you encounter a multitude of challenges.
One of the most pressing tasks at hand is the optimization of system storage.
With the growth of data and the increasing demands on the system, efficient storage management is paramount.\n
You embark on a quest to explore storage management techniques, determined to enhance the system's capabilities.
Your journey begins with an exploration of logical volumes and volume groups, fundamental components of storage organization.\n
In your quest, you delve into the intricacies of logical volumes.
These logical volumes serve as flexible containers for data, allowing for dynamic allocation and resizing.
With careful planning and configuration, you create logical volumes tailored to the system's requirements, ensuring efficient storage utilization.\n""",
    options=[
        {
            'name': 'Create Volume Group',
            'action': 'With determination in your heart, you lay the foundation for a new volume group, a beacon of order amidst the chaos of the digital realm.',
            'function': volume_groups.check_create_volume_group_command.execute,
            'success_message': 'Volume group created successfully!\n',
        },
        {
            'name': 'Extend Volume Group',
            'action': 'With unwavering resolve, you extend the boundaries of a volume group, expanding its reach to encompass new territories.',
            'function': volume_groups.check_extend_volume_group_command.execute,
            'success_message': 'Volume group extended successfully!\n',
        },
        {
            'name': 'Remove Volume Group',
            'action': 'With courage guiding your hand, you dismantle a volume group, unravelling its structure to reveal the core of its existence.',
            'function': volume_groups.check_remove_volume_group_command.execute,
            'success_message': 'Volume group removed successfully!\n',
        },
        {
            'name': 'View Volume Group',
            'action': 'With keen insight, you peer into the heart of a volume group, discerning its secrets and unlocking its potential.',
            'function': volume_groups.check_view_volume_groups_command.execute,
            'success_message': 'Volume group viewed successfully!\n',
        },
        {
            'name': 'Reduce Volume Group',
            'action': 'With precision and care, you remove a physical volume from an existing volume group, reshaping its structure to suit your needs.',
            'function': volume_groups.check_remove_physical_volume_command.execute,
            'success_message': 'Physical volume reduced successfully\n',
        },
    ]
)
