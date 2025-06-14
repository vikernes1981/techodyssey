import CommandGenerator as CommandGenerator


### VIEW, CREATE, REMOVE PHYSICAL VOLUMES ###

remove_physical_volume = CommandGenerator.CommandGenerator(
    action="remove a physical volume",
    correct_command="pvremove /dev/sdb1",
    hint="Hint: Use the 'pvremove' command followed by the device name to remove a physical volume (e.g., pvremove /dev/sdb1).",
    command_output=[
        "Labels on physical volume \"/dev/sdb1\" successfully wiped."],
    command_aspects=[
        "- pvremove : Removes a physical volume",
        "- /dev/sdb1 : Physical Volume to be removed",
    ],
    command_options=[
        "-f, --force\t\tForce removal of the physical volume.",
        "-y, --yes\t\tAssume 'yes' as answer to all questions.",
        "-v, --verbose\t\tProvide verbose output.",
    ],

    intro_text=["""\nAs you continue your journey through storage management, you encounter scenarios where certain storage devices need to be retired or replaced.
Removing physical volumes associated with these devices is crucial to maintain the integrity and efficiency of the storage infrastructure.
To address this, you embark on a quest to safely remove the designated physical volumes.\n
With careful consideration, you assess the implications of removing the physical volumes.
You review the volume group configurations and ensure that removing the physical volumes will not compromise data integrity or system performance.\n
Issuing commands to remove the physical volumes, you proceed cautiously, following best practices to minimize risks.
As the commands execute, you monitor the removal process, ensuring that each physical volume is detached safely.\n"""
                ],
    outro_text=["""\nAfter the removal completes, you verify the system's status to confirm the successful removal of the designated physical volumes.
You check for any errors or warnings, ensuring that the storage infrastructure remains stable and operational.\n
As your quest to remove physical volumes concludes, you reflect on the journey.
Through careful planning and execution, you've successfully retired or replaced designated storage devices.
With the physical volumes removed, you're poised to maintain the integrity and efficiency of the storage infrastructure in the Red Hat Odyssey.\n"""
                ],
)


create_physical_volume = CommandGenerator.CommandGenerator(
    action="create a physical volume",
    correct_command="pvcreate /dev/sdb1",
    hint="Hint: Use the 'pvcreate' command followed by the device name to create a physical volume (e.g., pvcreate /dev/sdb1).",
    command_output=["Physical volume \"/dev/sdb1\" successfully created\n",],
    command_aspects=[
        "- pvcreate : Creates a Physical Volume",
        "- /dev/sdb1 : Partition to become Physical Volume",
    ],
    command_options=[
        "-v, --verbose\t\tProvide verbose output.",
        "-ff, --force\t\tForce initialization of device.",
        "-M, --metadatatype\tSet metadata format.",
    ],
    intro_text=["""\nAs you delve deeper into storage management, you recognize the need to prepare additional storage devices for integration into the system.
Creating physical volumes is the first step in incorporating new storage devices into the storage infrastructure.
To expand the system's storage capacity and flexibility, you embark on a quest to create physical volumes.\n
With determination, you assess the available storage devices and select those to be designated as physical volumes.
You consider factors such as device type, capacity, and compatibility with the system.\n
Issuing commands to create physical volumes, you proceed with precision, specifying the parameters for each volume.
As the commands execute, you observe the creation process, ensuring that each physical volume is initialized successfully.\n""",
                ],
    outro_text=["""\nAfter the creation completes, you verify the system's status to confirm the successful establishment of the physical volumes.
You check for any errors or warnings, ensuring that the newly created physical volumes are ready for use.\n
As your quest to create physical volumes concludes, you reflect on the journey.
Through careful planning and execution, you've successfully prepared additional storage devices for integration into the system.
With the physical volumes created, you're well-positioned to expand the system's storage capacity and adapt to evolving data requirements in the Red Hat Odyssey.\n""",
                ],
)


view_physical_volumes = CommandGenerator.CommandGenerator(
    action="view physical volumes.",
    correct_command="pvs",
    hint="Hint: Use the 'pvs' command to view physical volumes.",
    command_output=[
        "PV Name               /dev/sdb1",
        "VG Name               vg00",
        "PV Size               <931.51 GiB / not usable 0",
        "Allocatable           yes",
        "PE Size               4.00 MiB",
        "Total PE              238466",
        "Free PE               138466",
        "Allocated PE          100000",
        "PV UUID               eARbpM-M43p-5vMz-hTtM-6F9m-3l6N-AgXYBv\n",
    ],
    command_aspects=["- pvs : Lists Physical Volumes",],
    command_options=[
        "-v, --verbose\t\tProvide verbose output.",
        "-C, --colon\t\tUse colon separators.",
        "-m, --maps\t\tDisplay physical volume extent maps.",
    ],

    intro_text=["""\nAs you delve deeper into storage management, you recognize the importance of gaining insights into the physical layer of storage.
Understanding the properties and status of physical volumes is essential for maintaining and optimizing storage infrastructure.
To this end, you embark on a quest to view and analyze the physical volumes present in the system.\n
With curiosity as your guide, you navigate through the system's storage devices, seeking information on physical volumes.
You issue commands to view the details of all physical volumes, eager to gain insights into their configurations and health.\n
As the commands execute, you meticulously review the information presented for each physical volume.
You observe attributes such as size, usage, and health status, gaining valuable insights into the underlying storage hardware.\n""",
                ],
    outro_text=["""\nArmed with knowledge of physical volumes, you analyze the system's storage utilization and identify areas for optimization.
You consider factors such as capacity, usage patterns, and performance requirements, devising strategies to enhance storage efficiency.\n
As your quest to view physical volumes concludes, you reflect on the journey.
Through exploration and analysis, you've gained valuable insights into the system's storage infrastructure.
With this knowledge, you're better equipped to optimize storage resources and ensure the system's resilience in the Red Hat Odyssey.\n""",
                ],
)
