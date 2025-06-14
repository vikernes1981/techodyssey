import CommandGenerator as CommandGenerator

label = "swaplabel"

lv_swap_partition_creation = CommandGenerator.CommandGenerator(
    action="create a Logical Volume (LV) for swap partition",
    correct_command="lvcreate -L 2G -n swap1 vg1",
    hint="Hint: Use 'lvcreate -L 2G -n swap1 vg1' to create a swap partition as a logical volume.",
    command_output=["Logical volume swap1 created."],
    command_aspects=[
        "- 'lvcreate': Command to create a logical volume",
        "- '-L 2G': Option to specify the size of the logical volume (2 gigabytes in this case)",
        "- '-n swap1': Option to specify the name of the logical volume (swap1)",
        "- 'vg1': Name of the volume group to which the logical volume belongs",
    ],
    command_options=[
        "- '-l, --extents': Specify the size of the logical volume in extents",
        "- '-i, --stripes': Create a striped logical volume",
        "- '-I, --stripesize': Specify the stripe size for a striped logical volume",
    ],

    intro_text=["""\nAs you journey deeper into the digital wilderness, you stumble upon a forgotten enclave nestled amidst the circuitry and data streams.
Within this hidden sanctuary, ancient texts whisper tales of a realm where memory transcends the limitations of physicality.
The air crackles with static energy as you approach a monolithic structure, its surface adorned with glyphs of arcane symbols.
A voice, resonating from the depths of the digital ether, beckons you to unlock the secrets of swap space – a realm where memory and magic intertwine.\n
You stand before the threshold of knowledge, tasked with the creation of a swap partition as a logical volume (LV).
This ethereal construct, forged from the fabric of the digital realm, is said to enhance the performance and stability of systems, serving as a conduit for the flow of virtual memory.\n""",
                ],

    outro_text=["",],
)


mkswap = CommandGenerator.CommandGenerator(
    action="format Logical Volume as swap",
    correct_command="mkswap /dev/vg1/swap1",
    hint="Hint: Use 'mkswap' to format the logical volume as swap.",
    command_output=[
        "Setting up swapspace version 1, size = 2097148 KiB",
        "no label, UUID=97017f63-6db1-4d47-8f10-418c79126324",
    ],
    command_aspects=["- mkswap : Command to format a partition to swap",
                     "- /dev/vg1/swap1 : Logical Volume to become swap",
                     ],
    command_options=[
        "- '-c, --check': Check the bad blocks before creating the swap area",
        "- '-f, --force': Force to create the swap area",
    ],

    intro_text=["",],
    outro_text=["",],
)


swapon = CommandGenerator.CommandGenerator(
    action="activate swap partition",
    correct_command="swapon /dev/vg1/swap1",
    hint="Hint: Use swapon /dev/vg1/swap1 to activate the swap partition.",
    command_output=[
        "NAME         TYPE      SIZE  USED PRIO",
        "/dev/dm-1    partition   2G    0B   -2",
    ],
    command_aspects=[
        "- swapon : Command to activate swap partition",
        "- /dev/vg1/swap1 : Logical Volume to be activated as swap",
    ],
    command_options=[
        "- '-s, --show': Display swap usage summary",
        "- '-p, --priority': Set the priority of the swap area",
        "- '-e, --early': Enable swap early during boot",
        "- '-L <label>' : This command activates the swap partition with the specified label.",
        "- 'UUID=<UUID>' :  This command activates the swap partition with the specified UUID",
    ],
    intro_text=["",],
    outro_text=["",],
)


swapoff = CommandGenerator.CommandGenerator(
    action="deactivate a swap partition",
    correct_command="swapoff /dev/vg1/swap1",
    hint="Hint: Use swapoff /dev/vg1/swap1 to deactivate the swap partition.",
    command_output=[
        "Swap partition /dev/vg1/swap1 was successfully deactivated.",],
    command_aspects=[
        "- swapoff : Command to deactivate swap partition",
        "- /dev/vg1/swap1 : Logical Volume to be deactivated",
    ],
    command_options=[
        "- '-a, --all': Disable all swap areas.",
        "- '-L <label>' : This command activates the swap partition with the specified label.",
        "- 'UUID=<UUID>' :  This command activates the swap partition with the specified UUID",
    ],

    intro_text=["",],
    outro_text=["",],
)


umount = CommandGenerator.CommandGenerator(
    action="unmount a partition",
    correct_command="umount /mnt",
    hint="Hint: Use umount /mnt to create a swap partition as a logical volume (LV).",
    command_output=["The swap partition is unmounted successfully.",],
    command_aspects=[
        "- umount : Command to unmount a partition",
        "- /mnt : Partition to ne unmounted",
    ],
    command_options=[
        "- '-l, --lazy': Lazy unmount.When you issue a lazy unmount command, the filesystem is flagged for unmounting, but the actual unmounting is deferred until all references to it are released.",
        "- '-a, --all': This option specifies that all filesystems listed in the /etc/fstab file should be unmounted.",
    ],
    intro_text=["",],
    outro_text=["",],
)


provide_swap_label_line = CommandGenerator.CommandGenerator(
    action="to mount a partition automaticaly on boot",
    correct_command=f"LABEL={label} swap swap defaults 0 0",
    hint=f"Hint: Use 'LABEL={label} swap swap defaults 0 0' to provide the swap label line",
    command_output=["If command is correct there won't be any output"],

    command_aspects=[f"\nLABEL={label}: This part of the line specifies the label of the filesystem. In this context, {label} is a placeholder that would be replaced with the actual label name. When a filesystem is mounted using a label, the system looks for a filesystem with that specific label and mounts it accordingly",
                     "\nThe 'swap' mount point indicates that this partition is intended a swap space.",
                     "\nThe 'swap' type indicates that this partition is intended for swap space.",
                     "\ndefaults: This part specifies the mount options. In this case, it specifies that the default mount options should be used. These options typically include settings for read-write access, permissions, and other parameters that control how the filesystem is mounted.",
                     "\n0: This part specifies the dump option. The dump option is used by the dump utility to determine whether the filesystem needs to be backed up. A value of 0 indicates that the filesystem should not be backed up by default.",
                     "\n0: This part specifies the fsck option. The fsck option is used by the fsck utility to determine the order in which filesystems should be checked during system boot. A value of 0 indicates that the filesystem should not be checked.",
                     "\nOverall, this line is a configuration entry in the /etc/fstab file, which is used by the system to automatically mount filesystems during boot. It specifies the details of how a particular filesystem should be mounted, including its label, mount point, filesystem type, mount options, and other parameters.",
                     ],
    command_options=["No options available",],

    intro_text=[f"""\nAs you traverse the digital landscape, you come across a hidden realm known as the Swap Dimension.
Here, memories are stored and retrieved in the blink of an eye, facilitating the flow of data across dimensions.
In this realm, you discover the essence of your journey - the sacred Swap Label.
With determination in your heart, you step forth, ready to uncover its mysteries.\n
Your quest begins with the discovery of the following :\nSwap Label: {label}"""

                ],
    outro_text=["",],
)
