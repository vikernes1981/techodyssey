import partitions_filesystem
import uuid_mount
import label_mount
import ChallengeGenerator
import chapter7_users_groups.CommandGenerator as CommandGenerator


def mount_by_uuid():
    if partitions_filesystem.create_ext4_on_lvm.execute() and partitions_filesystem.check_uuid_command() and uuid_mount.edit_fstab() and uuid_mount.provide_uuid_line.execute() and uuid_mount.mount_partition.execute():
        return True


def mount_by_label():
    if label_mount.check_e2label_command.execute() and label_mount.provide_label_line.execute():
        return True


challenge_6 = ChallengeGenerator.ChallengeGenerator(
    quest_number=6,
    description="Configure File System Mounting with UUID or Label",
    story="""\nAs you delve deeper into storage configuration, you recognize the importance of reliable and consistent file system mounting.
    Mounting file systems using UUIDs or labels ensures stability and resilience, even in dynamic storage environments.
    To achieve this, you embark on a quest to configure file system mounting using UUIDs or labels.\n
    With foresight and planning, you assess the file systems and their corresponding UUIDs or labels.
    You consider factors such as file system types, mount points, and compatibility with the system.\n
    Issuing commands to configure file system mounting with UUIDs or labels, you proceed meticulously.
    As the commands execute, you ensure that each file system is mounted using its unique identifier or label, ensuring consistency and reliability.\n""",
    options=[
        {
            'name': 'Mount File System by UUID',
            'action': """\nAs you delve deeper into storage management, you recognize the importance of robust and reliable partition mounting.
            Mounting partitions using UUIDs ensures consistent and predictable behavior, even in dynamic storage environments.
            To achieve this level of stability, you embark on a quest to mount partitions using their UUIDs.\n
            With precision and attention to detail, you identify the partitions and their corresponding UUIDs.
            You carefully verify the UUIDs to ensure accuracy and reliability in the mounting process.\n
            Issuing commands to mount partitions using UUIDs, you proceed meticulously.
            As the commands execute, you specify the UUIDs for each partition, ensuring consistent and reliable mounting.\n""",
            'function': mount_by_uuid,
            'success_message': """\nAfter the mounting process completes, you verify the status of the mounted partitions to confirm successful implementation.
            You check for any errors or warnings, ensuring that partitions are mounted correctly and accessible.\n
            As your quest to mount partitions using UUID concludes, you reflect on the journey.
            Through meticulous planning and execution, you've successfully implemented robust partition mounting using UUIDs.
            With partitions mounted consistently and reliably, you're well-prepared to ensure stability and resilience in the Red Hat Odyssey.\n
            File systems configured to mount by UUID successfully!\n""",
        },
        {
            'name': 'Mount File System by Label',
            'action': """\nAs you continue your exploration of storage management, you acknowledge the significance of flexible and intuitive partition mounting.
            Mounting partitions using labels provides a human-readable and convenient approach to managing storage configurations.
            To embrace this approach and enhance usability, you embark on a quest to mount partitions using their labels.\n
            With careful consideration, you identify the partitions and assign descriptive labels to them.
            You ensure that each label accurately reflects the purpose or contents of the corresponding partition.\n
            Issuing commands to mount partitions using labels, you proceed with clarity and precision.
            As the commands execute, you specify the labels for each partition, promoting intuitive and user-friendly storage management.\n""",
            'function': mount_by_label,
            'success_message': """\nAfter the mounting process completes, you verify the status of the mounted partitions to confirm successful implementation.
            You check for any errors or warnings, ensuring that partitions are mounted correctly and accessible via their labels.\n
            As your quest to mount partitions using labels concludes, you reflect on the journey.
            Through thoughtful consideration and execution, you've embraced a user-friendly approach to partition mounting.
            With partitions mounted intuitively and conveniently, you're well-prepared to optimize storage management in the Red Hat Odyssey.\n
            File systems configured to mount by label successfully!\n""",
        },
    ]
)
challenge_6.execute()
