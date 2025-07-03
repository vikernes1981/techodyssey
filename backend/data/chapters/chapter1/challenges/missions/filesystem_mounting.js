const filesystem_mounting = [
    {
        id: "create_ext4_filesystem",
        title: "Create an ext4 Filesystem",
        action: "create an ext4 file system",
        intro: `However, to further optimize the system, you recognize the need to create a new ext4 filesystem.
With a swift command, you initiate the creation process, specifying the desired parameters.

The command executes flawlessly, and within moments, the new ext4 filesystem is created.
You meticulously verify the results, ensuring that the filesystem meets the specified requirements.
With the addition of the new filesystem, the system's capabilities are expanded, and its performance is further optimized.`,
        solution: "mkfs.ext4 /dev/vg2/lv2", // Create ext4 filesystem on logical volume
        hints: [
            "Hint: Use 'mkfs.ext4 /dev/vg2/lv2' to create an ext4 file system."
        ],
        output: `mke2fs 1.45.6 (20-Mar-2020)
Creating filesystem with 26214400 4k blocks and 6553600 inodes
Filesystem UUID: b1e38f16-fg43-5f74-9b37-1f0fbd905c21
Superblock backups stored on blocks: 
32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
4096000, 7962624, 11239424, 20480000, 23887872`,
        aspects: [
            "- 'mkfs.ext4': Creates an ext4 filesystem",
            "- '/dev/vg2/lv2': Partition for the filesystem to be created"
        ],
        options: [
            "- '-L, --label <label>': Specify the volume label",
            "- '-E, --reserved <percent>': Specify the percentage of the filesystem reserved for the super-user",
            "- '-m, --mmp': Enable Multi-Mount Protection"
        ],
        outro: `With the ext4 filesystem successfully created, you have laid the foundation for reliable data storage.
The filesystem is now ready to be mounted and configured for persistent access using UUIDs or labels.`
    },
    {
        id: "find_filesystem_uuid",
        title: "Find UUID of Filesystem/Partition", 
        action: "get UUIDs of filesystems",
        intro: `But there's one more task to complete in your mission.
You must gather crucial information about the filesystems and partitions.
Turning to your arsenal of commands, you decide to use 'blkid' to list all available block devices along with their attributes.

The output scrolls across your screen, providing vital details about each block device.
You carefully examine the information, noting down UUIDs and filesystem types.
With this data in hand, you're better equipped to navigate the intricacies of the system and fulfill your mission.`,
        solution: "blkid /dev/vg2/lv2", // Get UUID of specific logical volume
        hints: [
            "Hint: Use 'blkid /dev/vg2/lv2' to get UUID of the specific filesystem."
        ],
        output: `/dev/vg2/lv2: UUID="966cd40a-0aab-464b-b930-7909fefea8db" TYPE="ext4"`,
        aspects: [
            "- 'blkid': Lists block device attributes and UUIDs",
            "- '/dev/vg2/lv2': Specific device to query",
            "- UUID: Universally Unique Identifier for each filesystem",
            "- TYPE: Shows the filesystem type (ext4, swap, etc.)"
        ],
        options: [
            "- '-t TYPE=ext4 -o list': List only ext4 devices",
            "- '-s UUID -o value': Output only UUID value",
            "- '-o list': Display in a more readable format"
        ],
        outro: `Armed with the UUID information, you now possess the unique identifiers needed for reliable filesystem mounting.
UUIDs provide a stable way to reference filesystems regardless of device naming changes.`
    },
    {
        id: "provide_uuid_fstab_line",
        title: "Provide UUID Line to fstab",
        action: "configure UUID-based mounting in fstab", 
        intro: `Your quest begins with the discovery of a specific UUID: 966cd40a-0aab-464b-b930-7909fefea8db
and the Mount point: /mnt

Now you must configure the system to automatically mount this filesystem using its UUID.
The /etc/fstab file controls which filesystems are mounted at boot time and how they are mounted.
By using UUIDs instead of device names, you ensure consistent mounting even if device names change.`,
        solution: "UUID=966cd40a-0aab-464b-b930-7909fefea8db /mnt ext4 defaults 0 0", // fstab entry for UUID-based mounting
        hints: [
            "Hint: Use 'UUID=966cd40a-0aab-464b-b930-7909fefea8db /mnt ext4 defaults 0 0' to provide the UUID line."
        ],
        output: `If command is correct there won't be any output`,
        aspects: [
            "- 'UUID=966cd40a-0aab-464b-b930-7909fefea8db': Specifies the filesystem by its unique identifier",
            "- '/mnt': Mount point where the filesystem will be accessible",
            "- 'ext4': Filesystem type",
            "- 'defaults': Use default mount options (rw, suid, dev, exec, auto, nouser, async)",
            "- '0': Dump option (0 = don't backup)",
            "- '0': fsck option (0 = don't check during boot)"
        ],
        options: [
            "- Other mount options: 'ro' (read-only), 'noexec' (no executables), 'nosuid' (no setuid)",
            "- fsck values: 0 (no check), 1 (root filesystem), 2 (other filesystems)",
            "- Use 'mount -a' to mount all fstab entries"
        ],
        outro: `The fstab entry has been configured for UUID-based mounting.
This ensures the filesystem will be reliably mounted at boot time, regardless of device naming changes.
Your storage configuration is now more robust and resilient to hardware changes.`
    },
    {
        id: "mount_partition",
        title: "Mount a Partition",
        action: "mount a partition manually",
        intro: `With the filesystem created and fstab configured, you now need to mount the partition for immediate use.
The mount command allows you to attach a filesystem to the directory tree at a specific mount point.
This makes the filesystem's contents accessible through the specified directory.`,
        solution: "mount /dev/vg2/lv2 /mnt", // Manually mount logical volume to /mnt
        hints: [
            "Hint: Use the 'mount' command to mount a partition. You can specify the mount point with '/mnt'. To mount all filesystems specified in fstab, use 'mount -a'."
        ],
        output: `mount: /dev/vg2/lv2 mounted on /mnt`,
        aspects: [
            "- 'mount': Command used to mount filesystems",
            "- '/dev/vg2/lv2': Device file representing the logical volume to mount", 
            "- '/mnt': Mount point directory where filesystem contents become accessible"
        ],
        options: [
            "- '-o, --options': Specify mount options (ro, rw, noexec, etc.)",
            "- '-L, --label': Mount filesystem by volume label",
            "- '-a': Mount all filesystems listed in /etc/fstab"
        ],
        outro: `The partition has been successfully mounted and is now accessible at the specified mount point.
You can now read from and write to the filesystem through the mounted directory.`
    },
    {
        id: "assign_filesystem_label",
        title: "Assign Label to Filesystem/Partition",
        action: "assign a label to a filesystem",
        intro: `As you venture further into the intricate world of system administration, you find yourself immersed within the very core of a Red Hat system.
Within this domain of ones and zeros, whispers float through the digital ether, murmurs of a command that carries formidable capabilities: 'e2label'.

This command is more than just a tool; it's a key to unlocking hidden pathways within the system, allowing administrators to navigate and manage the filesystem with greater clarity and efficiency.

Your quest begins with the discovery of the following:
Label: storage_vol
Device: /dev/vg2/lv2
Mount point: /mnt`,
        solution: "e2label /dev/vg2/lv2 storage_vol", // Assign label to ext4 filesystem
        hints: [
            "Hint: Use 'e2label' to perform actions related to filesystem labels."
        ],
        output: `If command is correct there won't be any output`,
        aspects: [
            "- 'e2label': Utility for setting or changing labels of ext2/ext3/ext4 filesystems",
            "- '/dev/vg2/lv2': Device file representing the logical volume whose label to set",
            "- 'storage_vol': The label to assign (up to 16 characters)"
        ],
        options: [
            "- '-c, --clear': Clear the label from the filesystem (set to empty string)",
            "- Use without label parameter to display current label"
        ],
        outro: `The filesystem label has been successfully assigned.
Labels provide human-readable identifiers for filesystems, making them easier to identify and manage.
You can now reference this filesystem by its label in mount commands and fstab entries.`
    },
    {
        id: "provide_label_fstab_line", 
        title: "Provide LABEL Line to fstab",
        action: "configure label-based mounting in fstab",
        intro: `As you journey through the digital wilderness, you stumble upon a mysterious path that leads to the heart of the filesystem, where labels reside.
Each label holds the key to a realm of data, waiting to be unlocked by those who dare to seek.

Your quest begins with the discovery of the following:
Label: storage_vol
Mount point: /mnt

Now you must configure the system to automatically mount this filesystem using its human-readable label.
Label-based mounting provides an intuitive alternative to UUIDs, making filesystem management more user-friendly.`,
        solution: "LABEL=storage_vol /mnt ext4 defaults 0 0", // fstab entry for label-based mounting
        hints: [
            "Hint: Use 'LABEL=storage_vol /mnt ext4 defaults 0 0' to provide the label line."
        ],
        output: `If command is correct there won't be any output`,
        aspects: [
            "- 'LABEL=storage_vol': Specifies the filesystem by its human-readable label",
            "- '/mnt': Mount point where the filesystem will be accessible",
            "- 'ext4': Filesystem type",
            "- 'defaults': Use default mount options",
            "- '0': Dump option (0 = don't backup)",
            "- '0': fsck option (0 = don't check during boot)"
        ],
        options: [
            "- Labels are more readable than UUIDs but must be unique",
            "- Use 'mount -L labelname' to mount by label manually", 
            "- Labels can be changed with e2label command"
        ],
        outro: `The fstab entry has been configured for label-based mounting.
This provides an intuitive and user-friendly approach to filesystem management.
With partitions mounted intuitively and conveniently, you're well-prepared to optimize storage management in the Red Hat Odyssey.`
    }
];

// Export the filesystem mounting challenges array for use in other modules
export default filesystem_mounting;