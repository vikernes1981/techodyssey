// fdisk_guides: Array of guides for using fdisk to manage disk partitions
const fdisk_guides = [
    {
        id: "fdisk_overview",
        title: "fdisk Overview",
        action: "explore fdisk fundamentals",
        intro: `To list all partitions on all available drives, you can peer into the depths of fdisk's capabilities.
Let me illuminate the path for you, brave system administrator.

The fdisk utility is your gateway to understanding and managing disk partitions. Through its arcane interface, you can view, create, modify, and delete partitions with precision and control.`,
        solution: "fdisk -l", // Example command to list all partitions
        hints: [
            "Use 'fdisk -l' to list all partitions on all drives",
            "Use 'fdisk /dev/sdX' to work with a specific drive",
            "Type 'p' within fdisk to print the partition table",
            "Type 'q' to quit fdisk without saving changes"
        ],
        output: `Disk /dev/sda: 250 GB, 250000000000 bytes
255 heads, 63 sectors/track, 30394 cylinders, total 488281250 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x0004dcd1

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     1026047      512000   83  Linux
/dev/sda2         1026048   488279551   243126752   8e  Linux LVM`,
        aspects: [
            "- 'fdisk -l': Lists all partitions on all available drives",
            "- 'fdisk /dev/sdX': Opens fdisk for specific drive manipulation",
            "- Within fdisk: 'p' prints partition table, 'q' quits without saving",
            "- Partition types: 83 (Linux), 8e (Linux LVM), 82 (Linux swap), 7 (NTFS)"
        ],
        options: [
            "- '-l': List partition tables for all devices",
            "- '-u': Change display/entry units to sectors",
            "- '-s partition': Print size of partition in blocks"
        ],
        outro: `As you traverse the digital realm, you encounter numerous obstacles, each requiring mastery over fdisk.
Fear not, for with this knowledge, you're equipped to navigate the arcane rituals of partition management.
Remember: fdisk is a powerful tool - always backup important data before making changes.`
    },
    {
        id: "create_dos_partition",
        title: "Create DOS Partition Guide",
        action: "learn DOS partition creation",
        intro: `To carve out a new DOS partition from the digital void, you must follow the ancient rites of fdisk.
DOS partitions use file systems like FAT16 or NTFS, suitable for compatibility with older systems or specific use cases.

The process requires precision and understanding of partition types. FAT16 (type 6) is suitable for smaller partitions, while NTFS (type 7) offers better features for larger storage needs.`,
        solution: "fdisk /dev/sda", // Example command to start fdisk on a drive
        hints: [
            "Start with: fdisk /dev/sdX (replace X with appropriate drive letter)",
            "Press 'n' to create new partition",
            "Choose 'p' for primary partition",
            "Use 't' to change partition type to 6 (FAT16) or 7 (NTFS)",
            "Press 'w' to write changes and exit"
        ],
        output: `Command (m for help): n

Partition type:
   p   primary (0 primary, 0 extended, 4 free)

Select (default p): p

Partition number (1-4, default 1): 1

First sector (2048-488279551, default 2048): 2048

Last sector, +sectors or +size{K,M,G} (2048-488279551, default 488279551): +100M

Command (m for help): t

Selected partition 1
Hex code (type L to list codes): 7

Command (m for help): w

The partition table has been altered!`,
        aspects: [
            "- 'n': Creates new partition within fdisk",
            "- 'p': Selects primary partition type",
            "- '+100M': Specifies partition size (100 megabytes)",
            "- 't': Changes partition type",
            "- '7': NTFS partition type code",
            "- 'w': Writes changes to disk and exits"
        ],
        options: [
            "- Partition type '6': FAT16 (for partitions under 2GB)",
            "- Partition type '7': NTFS (for larger partitions)",
            "- Use 'L' within type selection to list all available codes"
        ],
        outro: `As you traverse the digital wilderness, you encounter new challenges, each requiring mastery over fdisk.
With each DOS partition created, you gain deeper understanding of cross-platform compatibility.
Remember: DOS partitions are useful for compatibility with older systems or dual-boot configurations.`
    },
    {
        id: "create_lvm_partition",
        title: "Create LVM Partition Guide", 
        action: "master LVM partition creation",
        intro: `To craft a new partition in the likeness of LVM, you must understand the foundation of logical volume management.
LVM partitions serve as physical volumes, the building blocks for volume groups and logical volumes.

The sacred code '8e' marks a partition for LVM use, preparing it to become part of a flexible storage infrastructure that can span multiple devices and be resized dynamically.`,
        solution: "fdisk /dev/sda", // Example command to start fdisk for LVM
        hints: [
            "Start with: fdisk /dev/sdX (replace X with drive letter)",
            "Press 'n' to create new partition",
            "Choose 'p' for primary partition",
            "Use 't' to change partition type to 8e (Linux LVM)",
            "Press 'w' to write changes and exit"
        ],
        output: `Command (m for help): n

Partition type:
   p   primary (0 primary, 0 extended, 4 free)

Select (default p): p

Partition number (1-4, default 1): 1

First sector (2048-488279551, default 2048): 2048

Last sector, +sectors or +size{K,M,G} (2048-488279551, default 488279551): +1G

Command (m for help): t

Selected partition 1
Hex code (type L to list codes): 8e

Command (m for help): w

The partition table has been altered!`,
        aspects: [
            "- 'n': Creates new partition within fdisk",
            "- '+1G': Specifies partition size (1 gigabyte)",
            "- 't': Changes partition type",
            "- '8e': Linux LVM partition type code",
            "- LVM partitions become physical volumes for volume groups"
        ],
        options: [
            "- Partition type '8e': Linux LVM (required for LVM physical volumes)",
            "- After creation, use 'pvcreate' to initialize as physical volume",
            "- Multiple LVM partitions can be combined into volume groups"
        ],
        outro: `As you journey through the digital labyrinth, each step brings you closer to mastery over fdisk and LVM.
LVM partitions provide the foundation for flexible storage management in enterprise environments.
Remember: After creating LVM partitions, use pvcreate to initialize them as physical volumes.`
    },
    {
        id: "create_swap_partition",
        title: "Create Swap Partition Guide",
        action: "understand swap partition creation", 
        intro: `Amidst your sojourn in the digital wilderness, you chance upon the realm of swap,
a realm where memory finds solace in the dance of bytes between RAM and storage.

Swap partitions provide virtual memory extension, allowing the system to continue operating when physical RAM is exhausted. The sacred code '82' designates a partition for Linux swap use.`,
        solution: "fdisk /dev/sda", // Example command to start fdisk for swap
        hints: [
            "Start with: fdisk /dev/sdX (replace X with drive letter)",
            "Press 'n' to create new partition", 
            "Choose 'p' for primary partition",
            "Use 't' to change partition type to 82 (Linux swap)",
            "After fdisk, use 'mkswap' to format the partition"
        ],
        output: `Command (m for help): n

Partition type:
   p   primary (0 primary, 0 extended, 4 free)

Select (default p): p

Partition number (1-4, default 1): 1

First sector (2048-488279551, default 2048): 2048

Last sector, +sectors or +size{K,M,G} (2048-488279551, default 488279551): +2G

Command (m for help): t

Selected partition 1
Hex code (type L to list codes): 82

Command (m for help): w

The partition table has been altered!`,
        aspects: [
            "- 'n': Creates new partition within fdisk",
            "- '+2G': Specifies partition size (2 gigabytes)",
            "- 't': Changes partition type",
            "- '82': Linux swap partition type code",
            "- Swap provides virtual memory when RAM is full"
        ],
        options: [
            "- Partition type '82': Linux swap (for virtual memory)",
            "- Recommended swap size: 1-2x RAM for hibernation support",
            "- Use 'mkswap /dev/sdXY' to format after creation",
            "- Use 'swapon /dev/sdXY' to activate the swap partition"
        ],
        outro: `As you delve deeper into the digital realm, each command you wield shapes the fabric of the partitioned universe.
Swap partitions ensure system stability when memory demands exceed physical RAM capacity.
Remember: After creating swap partitions, use mkswap to format and swapon to activate them.`
    },
    {
        id: "delete_partition",
        title: "Delete Partition Guide",
        action: "learn safe partition deletion",
        intro: `In your voyage through the digital expanse, you encounter partitions long past their prime,
cluttering the space-time continuum with their obsolete existence.

Partition deletion is a powerful and potentially destructive operation. Always ensure you have backups of important data before proceeding, as deleted partitions and their data cannot be easily recovered.`,
        solution: "fdisk /dev/sda", // Example command to start fdisk for deletion
        hints: [
            "Start with: fdisk /dev/sdX (replace X with drive letter)",
            "Press 'd' to delete a partition",
            "Enter the partition number to delete",
            "Press 'w' to write changes (THIS IS PERMANENT)",
            "ALWAYS backup important data first!"
        ],
        output: `Command (m for help): d

Partition number (1-4): 2

Command (m for help): w

The partition table has been altered!`,
        aspects: [
            "- 'd': Deletes specified partition within fdisk",
            "- Partition number: Identifies which partition to delete",
            "- 'w': Writes changes permanently to disk",
            "- WARNING: Deletion is immediate and permanent",
            "- All data on deleted partition will be lost"
        ],
        options: [
            "- Always backup important data before deletion",
            "- Use 'p' to verify partition layout before deletion",
            "- Consider 'q' to quit without saving if unsure",
            "- Deletion only removes partition table entry, not data immediately"
        ],
        outro: `As you navigate the intricacies of partition management, each deletion brings clarity to the digital landscape.
Partition deletion is a powerful tool that must be wielded with wisdom and caution.
Remember: With great power comes great responsibility - always backup before making destructive changes.

May your actions pave the way for new beginnings in the realm of storage management.`
    }
];

export default fdisk_guides;