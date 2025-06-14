import lv_swap_partition
import ChallengeGenerator


challenge_7 = ChallengeGenerator.ChallengeGenerator(
    quest_number=7,
    description="Creation of LV Swap Partition",
    story="""\nAs you delve deeper into the digital wilderness, you encounter a challenge that tests your mastery over memory management.
In this part, you must create a Logical Volume (LV) for swap partition, harnessing the power of abstraction to enhance system performance and stability.\n
Choose your actions wisely, for the fate of the digital wilderness hangs in the balance.\n""",
    options=[
        {
            'name': 'Create LV Swap Partition',
            'action': '',
            'function': lv_swap_partition.lv_swap_partition_creation.execute,
            'success_message': 'Logical Volume Swap Partition Created',
        },
        {
            'name': 'Format Logical Volume as Swap',
            'action': '',
            'function': lv_swap_partition.mkswap.execute,
            'success_message': 'Logical Volume Swap Partition has become swap'
        },
        {
            'name': 'Activate Swap partition',
            'action': '',
            'function': lv_swap_partition.swapon.execute,
            'success_message': 'Swap Partition is activated'
        },
        {
            'name': 'Deactivate a Swap partition',
            'action': '',
            'function': lv_swap_partition.swapoff.execute,
            'success_message': 'Swap Partition is deactivated'
        },
        {
            'name': 'Unmount a partition',
            'action': '',
            'function': lv_swap_partition.umount.execute,
            'success_message': 'Partition is unmounted'
        },
        {
            'name': 'Mount swap partition permanently',
            'action': '',
            'function': lv_swap_partition.provide_swap_label_line.execute,
            'success_message': 'Correct Swap Label is provided'
        },
    ]
)
