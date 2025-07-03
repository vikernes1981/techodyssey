// backend/data/chapters/chapter2/missions/inspect_fs.js

const inspect_fs = [
  {
    id: "xfs_info",
    title: "XFS Filesystem Information",
    action: "display information about an XFS filesystem using xfs_info",
    intro: `
As a cybernetic engineer, you understand the importance of conducting regular inspections of XFS filesystems to ensure their health and performance.
You embark on a mission to inspect the XFS filesystems scattered across the landscapes of Ext4-vfat-xfs, analyzing their structures and metadata.

With your cybernetic tools and inspection utilities, you delve deep into the XFS filesystems, examining their directory structures, inode tables, and allocation policies.

You scrutinize the filesystems for any signs of fragmentation, inconsistencies, or other abnormalities that could impact their performance and integrity.

Using advanced diagnostic techniques, you identify areas of concern and take proactive measures to address them, ensuring the continued health and stability of the XFS filesystems.
    `,
    solution: "xfs_info /dev/vg1/lv1",
    hints: [
      "Hint: Use command like 'xfs_info /dev/vg1/lv1' to display XFS filesystem information.",
      "The answer is: xfs_info /dev/vg1/lv1"
    ],
    output: `XFS filesystem information displayed successfully for '/dev/vg1/lv1'`,
    aspects: [
      "- xfs_info: Command to display information about XFS filesystem",
      "- /dev/vg1/lv1: Device representing the XFS filesystem"
    ],
    options: [
      "- Detailed analysis: Provides filesystem size, block size, inode size information",
      "- Performance metrics: Shows mount options and configuration details",
      "- Health monitoring: Reveals filesystem structure and allocation policies"
    ],
    outro: `The XFS filesystem inspection reveals comprehensive details about the filesystem's structure and performance characteristics.
Your thorough analysis ensures optimal filesystem operation and identifies potential optimization opportunities.

The xfs_info command is used to retrieve detailed information about an XFS filesystem.
It provides various details such as filesystem size, block size, inode size, mount options, and more.

As you inspect each XFS filesystem, you gain valuable insights into their behavior and characteristics, further enhancing your expertise as a cybernetic engineer.`,
  },

  {
    id: "inspect_ext4",
    title: "Inspect Ext4 Filesystem",
    action: "inspect an ext4 filesystem using dumpe2fs",
    intro: `
As a cybernetic engineer, it's essential to conduct regular inspections of Ext4 filesystems to ensure their health and performance.
You embark on a mission to inspect the Ext4 filesystems scattered across the landscapes of Ext4-vfat-xfs, analyzing their structures and metadata.

With your cybernetic tools and inspection utilities, you delve deep into the Ext4 filesystems, examining their directories, inodes, and data blocks.

You scrutinize the filesystems for any signs of fragmentation, inconsistencies, or other abnormalities that could impact their performance and integrity.

Using advanced diagnostic techniques, you identify areas of concern and take proactive measures to address them, ensuring the continued health and stability of the Ext4 filesystems.
    `,
    solution: "dumpe2fs /dev/vg1/lv1",
    hints: [
      "Hint: Use command like 'dumpe2fs /dev/vg1/lv1' to inspect the ext4 filesystem.",
      "The answer is: dumpe2fs /dev/vg1/lv1"
    ],
    output: `Ext4 filesystem inspection completed successfully for '/dev/vg1/lv1'`,
    aspects: [
      "- dumpe2fs: Command to inspect ext4 filesystem",
      "- /dev/vg1/lv1: Device representing the ext4 filesystem to be inspected"
    ],
    options: [
      "- Superblock analysis: Examines filesystem superblock information",
      "- Block group details: Shows block group structures and allocation",
      "- Feature inspection: Reveals enabled filesystem features and capabilities"
    ],
    outro: `The Ext4 filesystem inspection provides detailed insights into the filesystem's internal structure and health status.
Your comprehensive analysis ensures the filesystem operates at peak efficiency and reliability.

The dumpe2fs command is used to display detailed information about an ext4 filesystem.
It provides insights into the filesystem's superblock, block groups, inodes, features, and usage statistics.

As you inspect each Ext4 filesystem, you gain valuable insights into their behavior and characteristics, further enhancing your expertise as a cybernetic engineer.`,
  }
];

export default inspect_fs;