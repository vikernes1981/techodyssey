import CommandGenerator as CommandGenerator


check_remove_physical_volume_command = CommandGenerator.CommandGenerator(
    action="remove a Physical Volume from a volume group.",
    correct_command="vgreduce vg1 /dev/sdb1",
    hint="Hint: Use 'vgreduce vg1 /dev/sdb1' to remove a Physical Volume from a volume group.",
    command_output=["Removed /dev/sdb1 from volume group vg1"],
    command_aspects=[
        "- vgreduce : removes a Physical Volume from a volume group.",
        "- vg1 : volume group where the Physical Volume belongs",
        "- /dev/sdb1 : Physical Volume to be removed from a volume group",
    ],
    command_options=[
        "-a, --all\t\tRemove all Physical Volumes belonging to the specified volume group.",
        "-f, --force\t\tForce removal without any prompt.",
        "-v, --verbose\t\tProvide verbose output.",
    ],
    intro_text=["""\nAs you continue your exploration of storage management, you encounter a scenario where a Physical Volume needs to be removed from a volume group.
This may be due to various reasons such as retiring a storage device or redistributing storage resources.
To address this, you embark on a quest to safely remove the Physical Volume from the volume group.\n
With caution in mind, you assess the implications of removing the Physical Volume.
You review the volume group's configuration and usage, ensuring that removing the Physical Volume will not impact data integrity or system performance.\n
Issuing commands to remove the Physical Volume from the volume group, you proceed carefully, following best practices to minimize risks.
As the commands execute, you monitor the process closely, verifying that the Physical Volume is successfully detached from the volume group.\n""",
                ],
    outro_text=["""\nAfter the removal process completes, you verify the system's status to ensure that the volume group is still functional.
You check for any errors or warnings, taking proactive measures to address any potential issues.\n
As your quest to remove a Physical Volume from a volume group concludes, you reflect on the journey.
Through careful planning and execution, you've successfully managed to adjust the system's storage infrastructure.
With this task completed, you're better equipped to adapt the system to changing storage requirements in the Red Hat Odyssey.\n""",
                ],
)


check_view_volume_groups_command = CommandGenerator.CommandGenerator(
    action="view volume groups.",
    correct_command="vgs",
    hint="Hint: Use 'vgs' to view volume groups.",
    command_output=[
        "  VG     #PV #LV #SN Attr   VSize  VFree",
        "  myvg   1   2   0  wz--n- 19.00g 9.00g\n",
    ],
    command_aspects=["- 'vgs': Command to view volume groups",],
    command_options=[
        "--all\t\t\tDisplay all volume groups, including those with no Physical Volumes.",
        "-o, --options\t\tDisplay only specified columns.",
        "-v, --verbose\t\tProvide verbose output.",
    ],
    intro_text=["""\nAs you delve deeper into the intricacies of storage management, you recognize the importance of gaining insights into volume groups.
Understanding the composition and usage of volume groups is essential for optimizing resource allocation and performance.
To this end, you embark on a quest to view and analyze the volume groups present in the system.\n
With curiosity as your guide, you navigate through the system's storage infrastructure, seeking information on volume groups.
You issue commands to view the details of all volume groups, eager to gain insights into their configurations and utilization.\n
As the commands execute, you meticulously review the output, noting the size, usage, and associated logical volumes of each volume group.
With each detail scrutinized, you gain a deeper understanding of the system's storage landscape and its underlying organization.\n""",
                ],
    outro_text=["""\nArmed with the insights gained from viewing volume groups, you analyze the system's storage utilization and identify areas for optimization.
You consider factors such as capacity, usage patterns, and performance requirements, devising strategies to further enhance storage efficiency.\n
As your quest to view volume groups concludes, you reflect on the journey.
Through exploration and analysis, you've gained valuable insights into the system's storage infrastructure.
With this knowledge, you're better equipped to optimize resource allocation and ensure the system's readiness for future challenges.\n""",
                ],
)


check_remove_volume_group_command = CommandGenerator.CommandGenerator(
    action="remove a volume group.",
    correct_command="vgremove vg1",
    hint="Hint: Use 'vgremove vg1' to remove a volume group.",
    command_output=["Volume group 'vg1' successfully removed\n",],
    command_aspects=[
        "- 'vgremove': Command to remove a volume group",
        "- 'vg1': Name of the volume group to remove",
    ],
    command_options=[
        "-f, --force: Force removal of the volume group even if it is active.",
        "-h, --help: Display a help message and exit.",
        "y, --yes: Automatically answer 'yes' to all prompts. Use with caution, as this can lead to unintended data loss if used improperly.",
    ],
    intro_text=["""\nAs you continue your journey through the Red Hat Odyssey, you encounter the need to streamline the system's storage infrastructure.
Some volume groups have become obsolete or no longer serve their intended purpose, cluttering the system's configuration.
To maintain a lean and efficient environment, you embark on a quest to remove unnecessary volume groups.\n
With determination, you set out to identify and remove the obsolete volume groups.
Carefully assessing their usage and impact on the system, you make strategic decisions about which volume groups to remove.\n
Issuing commands to remove volume groups, you proceed with caution, ensuring that no critical data is lost in the process.
As the commands execute, you observe the removal process, monitoring for any unexpected issues or errors.\n""",
                ],
    outro_text=["""\nUpon completion of the removal process, you review the system's storage configuration.
The removal of obsolete volume groups has streamlined the system, reducing clutter and improving resource allocation.\n
As your quest to remove volume groups concludes, you reflect on the journey.
Through careful analysis and execution, you've successfully optimized the system's storage infrastructure.
With a leaner and more efficient environment, you're better prepared to tackle the challenges that lie ahead in the Red Hat Odyssey.\n""",
                ],
)


check_extend_volume_group_command = CommandGenerator.CommandGenerator(
    action="extend a volume group.",
    correct_command="vgextend vg1 /dev/sdb1",
    hint="Hint: Use 'vgextend vg1 /dev/sdb1' to extend a volume group.",
    command_output=["Volume group 'vg1' successfully extended\n",],
    command_aspects=[
        "- 'vgextend': Command to extend a volume group",
        "- 'vg1': Name of the volume group to extend",
        "- '/dev/sdb1': Path of the Physical Volume(s) to add to the volume group",
    ],
    command_options=[
        "-v, --verbose : Provide verbose output.",
        "-f, --force: Force the operation, even if it may be risky. Use with caution, as this option can potentially lead to data loss if used improperly.",
        "-A, --autobackup y|n: Enable or disable automatic backup of the VG metadata after the operation. If set to y, a backup of the VG metadata will be created after the operation. Default is enabled.",
    ],
    intro_text=["""\nAs you delve deeper into storage management, you realize the need to expand the capacity of a volume group.
Increased data demands or the addition of new storage devices may necessitate extending the volume group.
To accommodate these changes, you embark on a quest to extend the volume group.\n
With foresight and planning, you assess the requirements for extending the volume group.
You consider factors such as available Physical Volumes and the desired capacity increase, ensuring a smooth extension process.\n
Issuing commands to extend the volume group, you proceed methodically, specifying the additional Physical Volumes to be included.
As the commands execute, you monitor the extension process, verifying that the volume group expands seamlessly.\n""",
                ],
    outro_text=["""\nAfter the extension completes, you verify the system's status to confirm the successful expansion of the volume group.
You check for any errors or warnings, ensuring that the extended volume group is fully functional and operational.\n
As your quest to extend the volume group concludes, you reflect on the journey.
Through careful planning and execution, you've successfully expanded the system's storage capacity.
With the volume group extended, you're well-prepared to meet the growing data demands in the Red Hat Odyssey.\n""",
                ],
)


check_create_volume_group_command = CommandGenerator.CommandGenerator(
    action="create a volume group",
    correct_command="vgcreate vg1 /dev/sdb1",
    hint="Hint: Use 'vgcreate vg1 /dev/sdb1' to create a volume group.",
    command_output=["Volume group 'vg1' successfully created\n"],
    command_aspects=[
        "- 'vgcreate': Command to create a volume group",
        "- 'vg1': Name of the volume group to create",
        "- '/dev/sdb1': Path of the Physical Volume(s) to include in the volume group",
    ],
    command_options=[
        "-v, --verbose : Provide verbose output.",
        "-t, --test: Test mode. Only print what would be done without actually performing any actions.",
        "-f, --force: Force the creation of the VG, even if it already exists or if it may be risky. Use with caution, as this option can potentially lead to data loss if used improperly.",
    ],
    intro_text=["""\nAs you navigate through the challenges of storage management, you encounter a need to organize available Physical Volumes into a cohesive unit.
To facilitate efficient resource allocation and management, you decide to create a volume group.
Creating a volume group will enable you to group together Physical Volumes and manage them as a single entity.\n
With purpose in mind, you assess the requirements for creating the volume group.
You consider factors such as the Physical Volumes to include and the desired attributes of the volume group.\n
Issuing commands to create the volume group, you proceed with determination, specifying the desired parameters.
As the commands execute, you observe the creation process, ensuring that the volume group is set up according to your specifications.\n""",
                ],
    outro_text=["""\nAfter the creation completes, you verify the system's status to confirm the successful establishment of the volume group.
You check for any errors or warnings, ensuring that the newly created volume group is ready for use.\n
As your quest to create the volume group concludes, you reflect on the journey.
Through deliberate planning and execution, you've successfully established a foundational component of the system's storage infrastructure.
With the volume group in place, you're equipped to streamline resource management and optimize storage efficiency in the Red Hat Odyssey.\n""",
                ],
)
