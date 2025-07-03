const label = "swaplabel";

// Array of swap partition challenge steps for the learning module
const lv_swap_partition = [
    {
        id: "lv_swap_partition_creation",
        title: "Create LV Swap Partition",
        action: "create a Logical Volume (LV) for swap partition",
        // Scenario introduction for creating a swap logical volume
        intro: `As you journey deeper into the digital wilderness, you stumble upon a forgotten enclave nestled amidst the circuitry and data streams.
Within this hidden sanctuary, ancient texts whisper tales of a realm where memory transcends the limitations of physicality.
The air crackles with static energy as you approach a monolithic structure, its surface adorned with glyphs of arcane symbols.
A voice, resonating from the depths of the digital ether, beckons you to unlock the secrets of swap space – a realm where memory and magic intertwine.

You stand before the threshold of knowledge, tasked with the creation of a swap partition as a logical volume (LV).
This ethereal construct, forged from the fabric of the digital realm, is said to enhance the performance and stability of systems, serving as a conduit for the flow of virtual memory.`,
        // Command to create a 2GB swap logical volume named swap1 in volume group vg1
        solution: "lvcreate -L 2G -n swap1 vg1",
        hints: [
            "Hint: Use 'lvcreate -L 2G -n swap1 vg1' to create a swap partition as a logical volume."
        ],
        output: `Logical volume swap1 created.`,
        aspects: [
            "- 'lvcreate': Command to create a logical volume",
            "- '-L 2G': Specify the size of the logical volume (2 gigabytes)",
            "- '-n swap1': Specify the name of the logical volume (swap1)",
            "- 'vg1': Name of the volume group"
        ],
        options: [
            "- '-l, --extents': Specify the size in extents",
            "- '-i, --stripes': Create a striped logical volume",
            "- '-I, --stripesize': Specify the stripe size"
        ],
        outro: `Logical Volume Swap Partition Created`
    },
    {
        id: "mkswap",
        title: "Format Logical Volume as Swap",
        action: "format Logical Volume as swap",
        // Command to format the logical volume as swap space
        solution: "mkswap /dev/vg1/swap1",
        hints: [
            "Hint: Use 'mkswap' to format the logical volume as swap."
        ],
        output: `Setting up swapspace version 1, size = 2097148 KiB
no label, UUID=97017f63-6db1-4d47-8f10-418c79126324`,
        aspects: [
            "- mkswap: Format a partition to swap",
            "- /dev/vg1/swap1: Logical Volume to become swap"
        ],
        options: [
            "- '-c, --check': Check for bad blocks before creating swap",
            "- '-f, --force': Force creation of swap area"
        ],
        outro: `Logical Volume Swap Partition has become swap`
    },
    {
        id: "swapon",
        title: "Activate Swap partition",
        action: "activate swap partition",
        // Command to activate the swap logical volume
        solution: "swapon /dev/vg1/swap1",
        hints: [
            "Hint: Use swapon /dev/vg1/swap1 to activate the swap partition."
        ],
        output: `NAME         TYPE      SIZE  USED PRIO
/dev/dm-1    partition   2G    0B   -2`,
        aspects: [
            "- swapon: Activate swap partition",
            "- /dev/vg1/swap1: Logical Volume to be activated as swap"
        ],
        options: [
            "- '-s, --show': Display swap usage summary",
            "- '-p, --priority': Set swap area priority",
            "- '-e, --early': Enable swap early during boot",
            "- '-L <label>': Activate swap by label",
            "- 'UUID=<UUID>': Activate swap by UUID"
        ],
        outro: `Swap Partition is activated`
    },
    {
        id: "swapoff",
        title: "Deactivate a Swap partition",
        action: "deactivate a swap partition",
        // Command to deactivate the swap logical volume
        solution: "swapoff /dev/vg1/swap1",
        hints: [
            "Hint: Use swapoff /dev/vg1/swap1 to deactivate the swap partition."
        ],
        output: `Swap partition /dev/vg1/swap1 was successfully deactivated.`,
        aspects: [
            "- swapoff: Deactivate swap partition",
            "- /dev/vg1/swap1: Logical Volume to be deactivated"
        ],
        options: [
            "- '-a, --all': Disable all swap areas",
            "- '-L <label>': Deactivate swap by label",
            "- 'UUID=<UUID>': Deactivate swap by UUID"
        ],
        outro: `Swap Partition is deactivated`
    },
    {
        id: "umount",
        title: "Unmount a partition",
        action: "unmount a partition",
        // Command to unmount a partition (not directly related to swap, but included for completeness)
        solution: "umount /mnt",
        hints: [
            "Hint: Use umount /mnt to create a swap partition as a logical volume (LV)."
        ],
        output: `The swap partition is unmounted successfully.`,
        aspects: [
            "- umount: Unmount a partition",
            "- /mnt: Partition to be unmounted"
        ],
        options: [
            "- '-l, --lazy': Lazy unmount (deferred until references are released)",
            "- '-a, --all': Unmount all filesystems listed in /etc/fstab"
        ],
        outro: `Partition is unmounted`
    },
    {
        id: "provide_swap_label_line",
        title: "Mount swap partition permanently",
        action: "to mount a partition automaticaly on boot",
        // Scenario for adding swap entry to /etc/fstab using a label
        intro: `As you traverse the digital landscape, you come across a hidden realm known as the Swap Dimension.
Here, memories are stored and retrieved in the blink of an eye, facilitating the flow of data across dimensions.
In this realm, you discover the essence of your journey - the sacred Swap Label.
With determination in your heart, you step forth, ready to uncover its mysteries.

Your quest begins with the discovery of the following :
Swap Label: ${label}`,
        // fstab entry to mount swap by label at boot
        solution: `LABEL=${label} swap swap defaults 0 0`,
        hints: [
            `Hint: Use 'LABEL=${label} swap swap defaults 0 0' to provide the swap label line`
        ],
        output: `If command is correct there won't be any output`,
        aspects: [
            `LABEL=${label}: Specifies the label of the filesystem to mount`,
            `The 'swap' mount point indicates this partition is for swap space`,
            `The 'swap' type indicates this partition is for swap`,
            `defaults: Use default mount options`,
            `0: Do not back up with dump utility`,
            `0: Do not check with fsck utility`,
            `This line is a configuration entry in /etc/fstab for automatic mounting`
        ],
        options: [
            "No options available"
        ],
        outro: `Correct Swap Label is provided`
    }
];

export default lv_swap_partition;