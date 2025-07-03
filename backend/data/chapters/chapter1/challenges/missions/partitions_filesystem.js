// Missions for managing partitions and filesystems in a Linux environment

const partitions_filesystem = [
  {
    id: "df",
    title: "List Disk Space",
    action: "List disk space on a Red Hat system",
    intro: `
As you delve deeper into your mission, you realize the importance of understanding the disk space usage across the system.
Recalling your training, you decide to use the 'df -h' command to display the disk space usage in a human-readable format.

The output reveals valuable insights into the allocation and utilization of disk space.
You analyze the information meticulously, identifying any areas of concern or potential optimizations.
Armed with this knowledge, you're better prepared to optimize the system's performance and ensure its continued stability.
    `,
    solution: "df -h",
    hints: [
      "Hint: Use 'df -h' to list disk space.",
      "The answer is: df -h"
    ],
    output: `Filesystem                        Size  Used Avail Use% Mounted on
tmpfs                             773M  2,1M  770M   1% /run
/dev/nvme0n1p2                    234G   60G  163G  27% /
tmpfs                             3,8G  2,8M  3,8G   1% /dev/shm
tmpfs                             5,0M  4,0K  5,0M   1% /run/lock
/dev/nvme0n1p1                    511M  6,1M  505M   2% /boot/efi
192.168.0.245:/home/user/nfs  457G   55G  379G  13% /home/user1/nfs-share
tmpfs                             773M  1,7M  771M   1% /run/user/1000`,
    aspects: [
      "- df : List disk space",
      "- -h : Show output in human readable form"
    ],
    options: [
      "- -h, --human-readable: Print sizes in a human-readable format (e.g., 1K, 234M, 2G)",
      "- -a, --all: Include all filesystems, including those with 0 blocks used.",
      "- -l, --local: Limit the output to local filesystems."
    ],
    outro: "",
  },

  {
    id: "mkfs",
    title: "Create EXT4 Filesystem on LVM",
    action: "create an ext4 file system.",
    intro: `
However, to further optimize the system, you recognize the need to create a new ext4 filesystem.
With a swift command, you initiate the creation process, specifying the desired parameters.

The command executes flawlessly, and within moments, the new ext4 filesystem is created.
You meticulously verify the results, ensuring that the filesystem meets the specified requirements.
With the addition of the new filesystem, the system's capabilities are expanded, and its performance is further optimized.
    `,
    solution: "mkfs.ext4 /dev/vg1/lv1",
    hints: [
      "Hint: Use 'mkfs.ext4 /dev/vg1/lv1' to create an ext4 file system.",
      "The answer is: mkfs.ext4 /dev/vg1/lv1"
    ],
    output: `mke2fs 1.45.6 (20-Mar-2020)
Creating filesystem with 26214400 4k blocks and 6553600 inodes
Filesystem UUID: a0d28a15-ef32-4e63-8a26-0e9eac794a10
Superblock backups stored on blocks: 
32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
4096000, 7962624, 11239424, 20480000, 23887872`,
    aspects: [
      "- mkfs.ext4 : Creates an ext4 filesystem",
      "- /dev/vg1/lv1 : Partition for the filesystem to be created"
    ],
    options: [
      "- -L, --label <label> : Specify the volume label.",
      "- -E, --reserved <percent> : Specify the percentage of the filesystem reserved for the super-user.",
      "- -m, --mmp : Enable Multi-Mount Protection."
    ],
    outro: "",
  },

  {
    id: "partprobe",
    title: "Force Partition Check",
    action: "force partition check",
    intro: `
You reach a critical juncture in your mission, where precise actions are needed to stabilize the system.
Remembering your training, you decide to use the 'partprobe' command to inform the operating system of partition table changes.

With bated breath, you execute the command, waiting anxiously for the system's response.
After a tense moment, the screen displays the reassuring message: 'Partition table updated successfully.'
A wave of relief washes over you as you continue your mission, knowing that you've taken a crucial step towards restoring stability to the system.
    `,
    solution: "partprobe",
    hints: [
      "Hint: Use 'partprobe' to force partition check.",
      "The answer is: partprobe"
    ],
    output: "Partition table updated.",
    aspects: [
      "- 'partprobe': Command to force partition check"
    ],
    options: [
      "- '-s, --summary': Display summary information after processing"
    ],
    outro: "",
  },

  {
    id: "lsblk",
    title: "List Disks and Partitions",
    action: "list disks and partitions.",
    intro: `
However, your work is not yet done. Another critical task lies ahead.
You need to ensure the health and integrity of all disks and partitions.
Recalling your training, you decide to employ the 'lsblk' to perform a comprehensive check.

As the command executes, you monitor the output closely, analyzing each line of information.
Your expertise allows you to swiftly identify any irregularities or potential issues.
With each passing moment, your confidence grows, knowing that you're one step closer to securing the system.
    `,
    solution: "lsblk",
    hints: [
      "Hint: Use 'lsblk' to list disks and partitions.",
      "The answer is: lsblk"
    ],
    output: `   NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
    loop0         7:0    0     4K  1 loop /snap/bare/5
    loop1         7:1    0  55,7M  1 loop /snap/core18/2812
    loop2         7:2    0  63,5M  1 loop /snap/core20/2015
    loop3         7:3    0  63,9M  1 loop /snap/core20/2105
    loop4         7:4    0  74,1M  1 loop /snap/core22/1033
    loop5         7:5    0  74,2M  1 loop /snap/core22/1122
    nvme0n1     259:0    0 238,5G  0 disk 
    ├─nvme0n1p1 259:1    0   512M  0 part /boot/efi
    └─nvme0n1p2 259:2    0   238G  0 part /var/snap/firefox/common/host-hunspell/`,
    aspects: [
      "- 'lsblk': Command to list disks and partitions"
    ],
    options: [
      "- '-a, --all': Include all devices (e.g., floppy, RAM disks)",
      "- '-o, --output': Specify columns to display (e.g., 'lsblk -o NAME,SIZE,TYPE,MOUNTPOINT')"
    ],
    outro: "",
  },

  // Mission to retrieve UUIDs of block devices
  {
    id: "blkid",
    title: "Get UUIDs",
    action: "get UUIDs",
    intro: `
But there's one more task to complete in your mission.
You must gather crucial information about the filesystems and partitions.
Turning to your arsenal of commands, you decide to use 'blkid' to list all available block devices along with their attributes.

The output scrolls across your screen, providing vital details about each block device.
You carefully examine the information, noting down UUIDs and filesystem types.
With this data in hand, you're better equipped to navigate the intricacies of the system and fulfill your mission.
    `,
    solution: "blkid",
    hints: [
      "Hint: Use 'blkid' to get UUIDs.",
      "The answer is: blkid"
    ],
    output: `/dev/sda1: UUID="1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p" TYPE="ext4"
    /dev/sda2: UUID="7b8c9d0e-1f2g-3h4i-5j6k-7l8m9n0o1p" TYPE="swap"`,
    aspects: [
      "- 'blkid': List block device attributes and UUIDs"
    ],
    options: [
      "- '-t TYPE=ext4 -o list': List only ext4 devices",
      "- '-s UUID -o value': Output only UUID value"
    ],
    outro: "",
    nextMissionId: "copy_uuid_to_fstab"
  },

  // Mission to copy UUID to /etc/fstab for persistent mounting
  {
    id: "copy_uuid_to_fstab",
    title: "Copy UUID to fstab",
    action: "Copy UUID to fstab",
    intro: `
After retrieving the UUIDs, you need to copy one to the /etc/fstab file.
Write the command to append the UUID value to the fstab.`,
    solution: "blkid -s UUID -o value >> /etc/fstab",
    hints: [
      "Hint: Use 'blkid -s UUID -o value >> /etc/fstab' to copy the UUID to fstab.",
      "The answer is: blkid -s UUID -o value >> /etc/fstab"
    ],
    output: "UUID copied to fstab successfully.",
    aspects: [
      "- 'blkid -s UUID -o value >> /etc/fstab': Appends UUID to fstab"
    ],
    options: [],
    outro: "",
    prevMissionId: "blkid"
  }

];

export default partitions_filesystem;
