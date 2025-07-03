// backend/data/chapters/chapter2/missions/repair_fs.js

const repair_fs = [
  {
    id: "repair_xfs",
    title: "Repair XFS Filesystem",
    action: "repair an XFS filesystem using xfs_repair",
    intro: `
Despite the scalability and performance of XFS filesystems, occasional issues may arise that require repair and maintenance.
As a skilled cybernetic engineer, you are equipped to diagnose and repair these issues, ensuring the continued functionality of XFS filesystems.

You receive reports of anomalies in several XFS filesystems, ranging from metadata corruption to data loss.

With your cybernetic tools and diagnostic utilities, you set out to assess the extent of the damage and initiate repair procedures.

For minor metadata corruption, you utilize filesystem checking utilities to identify and rectify errors, restoring the integrity of the filesystems.

In cases of data loss or more severe corruption, you employ specialized repair techniques to recover lost or damaged data, ensuring minimal disruption to operations.
    `,
    solution: "xfs_repair /dev/vg1/lv1",
    hints: [
      "Hint: Use command like 'xfs_repair /dev/vg1/lv1' to repair XFS filesystem.",
      "The answer is: xfs_repair /dev/vg1/lv1"
    ],
    output: `XFS filesystem repaired successfully on '/dev/vg1/lv1'`,
    aspects: [
      "- xfs_repair: Command to repair XFS filesystem",
      "- /dev/vg1/lv1: Device representing the XFS filesystem to be repaired"
    ],
    options: [
      "- Metadata repair: Fixes corruption in XFS metadata structures",
      "- Data recovery: Attempts to recover lost or damaged data",
      "- Unmounted operation: Must be run on unmounted filesystems to avoid corruption"
    ],
    outro: `The XFS filesystem repair process completes successfully, restoring data integrity and functionality.
Your expertise in filesystem repair ensures the continued operation of critical data infrastructure.

Note: It's recommended to run xfs_repair on an unmounted filesystem to avoid data corruption.
Make sure to unmount the filesystem before proceeding with the repair.

With each repaired XFS filesystem, you demonstrate your expertise and dedication to maintaining the stability of Ext4-vfat-xfs's data infrastructure.`,
  },

  {
    id: "repair_ext4",
    title: "Repair Ext4 Filesystem",
    action: "repair an unmounted ext4 filesystem consistency",
    intro: `
Despite the stability of Ext4 filesystems, occasional issues may arise that require repair and maintenance.
As a skilled cybernetic engineer, you possess the knowledge and expertise to diagnose and repair these issues.

You receive reports of anomalies in several Ext4 filesystems, ranging from minor inconsistencies to more serious corruption issues.

With your cybernetic tools and diagnostic utilities, you set out to assess the extent of the damage and initiate repair procedures.

For minor inconsistencies, you employ filesystem checking utilities to identify and rectify errors, ensuring the integrity of the filesystems.

In cases of more severe corruption, you meticulously analyze the filesystem structures, employing advanced repair techniques to restore data and functionality.
    `,
    solution: "fsck.ext4 /dev/vg1/lv1",
    hints: [
      "Hint: Use command like 'fsck.ext4 /dev/vg1/lv1' to repair ext4 filesystem.",
      "The answer is: fsck.ext4 /dev/vg1/lv1"
    ],
    output: `Ext4 filesystem consistency repaired successfully on '/dev/vg1/lv1'`,
    aspects: [
      "- fsck.ext4: Command to repair an ext4 filesystem",
      "- /dev/vg1/lv1: Device representing the ext4 filesystem to be repaired"
    ],
    options: [
      "- Consistency checking: Verifies and repairs filesystem integrity",
      "- Error correction: Fixes inconsistencies in filesystem structures",
      "- Data preservation: Ensures filesystem reliability while maintaining data"
    ],
    outro: `The ext4 filesystem repair process concludes successfully, with all inconsistencies resolved.
Your technical expertise ensures the continued reliability of the filesystem infrastructure.

The fsck.ext4 command is used to check and repair an ext4 filesystem consistency.
It is important to ensure filesystem integrity for data reliability.

With each repaired Ext4 filesystem, you demonstrate your prowess as a cybernetic engineer, capable of overcoming even the most challenging of obstacles.`,
  },

  {
    id: "repair_vfat",
    title: "Repair VFAT Filesystem",
    action: "repair an unmounted FAT filesystem consistency",
    intro: `
Despite the simplicity and compatibility of VFAT filesystems, occasional issues may arise that require repair and maintenance.
As a skilled cybernetic engineer, you are equipped to diagnose and repair these issues, ensuring the continued functionality of VFAT filesystems.

You receive reports of anomalies in several VFAT filesystems, ranging from file system errors to data corruption.

With your cybernetic tools and diagnostic utilities, you set out to assess the extent of the damage and initiate repair procedures.

For minor filesystem errors, you employ disk checking utilities to identify and fix inconsistencies, restoring the integrity of the filesystems.

In cases of data corruption, you meticulously analyze the filesystem structures, employing specialized repair techniques to recover lost or damaged data.
    `,
    solution: "fsck.vfat /dev/vg1/lv1",
    hints: [
      "Hint: Use command like 'fsck.vfat /dev/vg1/lv1' to repair FAT filesystem.",
      "The answer is: fsck.vfat /dev/vg1/lv1"
    ],
    output: `FAT filesystem consistency repaired successfully on '/dev/vg1/lv1'`,
    aspects: [
      "- fsck.vfat: Command to repair a FAT filesystem",
      "- /dev/vg1/lv1: Device representing the FAT filesystem to be repaired"
    ],
    options: [
      "- Error detection: Identifies and fixes filesystem inconsistencies",
      "- Data recovery: Attempts to recover corrupted or lost data",
      "- Compatibility maintenance: Ensures continued cross-platform compatibility"
    ],
    outro: `The VFAT filesystem repair process completes successfully, restoring full functionality.
Your dedication to maintaining filesystem integrity ensures reliable data access across platforms.

The fsck.vfat command is used to check and repair a FAT filesystem consistency.
It is important to ensure filesystem integrity for data reliability.

With each repaired VFAT filesystem, you demonstrate your expertise and dedication to maintaining the stability of Ext4-vfat-xfs's data infrastructure.`,
  }
];

export default repair_fs;