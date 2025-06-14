import fdiskGuide
import ChallengeGenerator


challenge_5 = ChallengeGenerator.ChallengeGenerator(
    quest_number=5,
    description="Master Partition Creation with fdisk",
    story="""\nAs you further explore storage management, you realize the need to partition available storage space to organize data effectively.
Partitioning allows for better utilization of storage resources and facilitates the management of data.
To accomplish this task, you embark on a quest to create partitions using the fdisk utility.\n
With determination, you assess the storage devices available for partitioning and the desired partition layout.
You consider factors such as partition sizes, types, and mount points, ensuring a well-organized storage structure.\n
Issuing commands to launch fdisk and create partitions, you proceed methodically, specifying the parameters for each partition.
As the commands execute, you carefully define the partition layout, adhering to best practices for storage management.\n""",
    options=[
        {
            'name': 'View fdisk Guide',
            'action': '',
            'function': fdiskGuide.fdisk_guide,
            'success_message': '',
        },
        {
            'name': 'Create DOS Partition Guide',
            'action': '',
            'function': fdiskGuide.create_dos_partition_guide,
            'success_message': '',
        },
        {
            'name': 'Create LVM Partition Guide',
            'action': '',
            'function': fdiskGuide.create_lvm_partition_guide,
            'success_message': '',
        },
        {
            'name': 'Create Swap Partition Guide',
            'action': '',
            'function': fdiskGuide.create_swap_partition_guide,
            'success_message': '',
        },
        {
            'name': 'Delete Partition Guide',
            'action': '',
            'function': fdiskGuide.delete_partition_guide,
            'success_message': '',
        },
    ]
)
