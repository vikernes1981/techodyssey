// backend/data/chapters/chapter2/missions/vdo_admin.js

const vdo_admin = [
  {
    id: "install_vdo",
    title: "Install VDO and kmod-kvdo",
    action: "install VDO packages and kernel modules",
    intro: `
Upon landing on VDO-351-xy, you are greeted by a bustling hub of cybernetic activity.
Engineers and technicians work tirelessly to maintain and expand the planet's vast network of VDO systems.
Your mission here is to install new VDO systems and integrate them seamlessly into the existing infrastructure.

You begin by selecting optimal locations for the new VDO installations, considering factors such as data accessibility and network connectivity.
Once the locations are chosen, you deploy specialized drones to assemble and configure the VDO hardware.

As the installations progress, you encounter challenges such as power fluctuations and compatibility issues.
But with your expertise and problem-solving skills, you overcome each obstacle with ease.
    `,
    solution: "dnf install -y vdo kmod-kvdo",
    hints: [
      "Hint: Use 'dnf install -y vdo kmod-kvdo' to install VDO and kmod-kvdo.",
      "The answer is: dnf install -y vdo kmod-kvdo"
    ],
    output: `Installed:
  kmod-kvdo.x86_64 0:7.7.3-11.el8
  vdo.x86_64 0:7.7.3-11.el8
Complete!`,
    aspects: [
      "- dnf install -y: Install packages with automatic yes confirmation",
      "- vdo: Virtual Data Optimizer main package",
      "- kmod-kvdo: Kernel module for VDO functionality"
    ],
    options: [
      "- VDO: Provides data deduplication and compression capabilities",
      "- kmod-kvdo: Kernel-level support for VDO operations",
      "- -y flag: Automatically answers 'yes' to installation prompts"
    ],
    outro: `The command resonates with power as you utter it aloud, invoking the installation process.
Mystical energies swirl around you as VDO and kmod-kvdo are installed, their arcane capabilities now at your command.

Finally, after hours of hard work, the new VDO systems are online and operational.
They seamlessly integrate with the existing network, enhancing data optimization capabilities across the planet.

With the VDO installations complete, you take a moment to admire your handiwork.
But your journey as a cybernetic engineer is far from over, and new challenges await on the horizon.`,
  },

  {
    id: "expand_vdo",
    title: "Expand VDO Volume",
    action: "expand the filesystem of a VDO volume",
    intro: `
Upon landing on VDO-351-xy, you are greeted by a team of engineers eager to assist you in your mission.
Your task here is to expand the existing VDO volumes, increasing their capacity to accommodate growing data demands.

You assess the current usage and performance metrics of the VDO volumes, identifying opportunities for expansion.
Using advanced cybernetic tools, you initiate the expansion process, seamlessly integrating additional resources into the volumes.

As the volumes expand, you monitor their progress, ensuring that data optimization algorithms adjust accordingly.
The expansion process is a delicate balance of resource allocation and data management, requiring careful attention to detail.
    `,
    solution: "vdo growfs /dev/mapper/vdo1",
    hints: [
      "Hint: Use 'vdo growfs /dev/mapper/vdo1' to expand the VDO volume.",
      "The answer is: vdo growfs /dev/mapper/vdo1"
    ],
    output: `VDO volume filesystem expanded successfully on /dev/mapper/vdo1`,
    aspects: [
      "- vdo growfs: Command to expand VDO volume filesystem",
      "- /dev/mapper/vdo1: Path to the VDO volume mapper device"
    ],
    options: [
      "- Dynamic expansion: Can be performed while the volume is in use",
      "- Filesystem growth: Utilizes the entire logical size previously set",
      "- Resource optimization: Adjusts data structures for expanded capacity"
    ],
    outro: `Finally, after hours of meticulous work, the VDO volumes have been successfully expanded.
They now possess greater capacity and efficiency, ready to meet the planet's ever-growing data needs.

With the expansion of the VDO volumes complete, you take a moment to admire your handiwork.
But your journey as a cybernetic engineer is far from over, and new challenges await in the boundless expanse of the cosmos.`,
  },

  {
    id: "remove_vdo",
    title: "Remove VDO Volume",
    action: "remove a VDO volume from the system",
    intro: `
Upon landing on VDO-351-xy, you review the existing VDO volumes to optimize resource allocation.
During the analysis, you identify obsolete volumes that are no longer needed for data storage.

With precision and caution, you initiate the removal process for the obsolete VDO volumes.
Each volume is carefully decommissioned, ensuring that data is migrated or backed up to prevent loss.

As the removal process progresses, you encounter challenges such as data integrity checks and system dependencies.
But with your expertise and meticulous approach, you overcome each obstacle with ease.
    `,
    solution: "vdo remove --name=vdo1",
    hints: [
      "Hint: Use 'vdo remove --name=vdo1' to remove the VDO volume.",
      "The answer is: vdo remove --name=vdo1"
    ],
    output: `VDO volume 'vdo1' removed successfully`,
    aspects: [
      "- vdo remove: Command to remove a VDO volume",
      "- --name=vdo1: Specifies the name of the VDO volume to remove"
    ],
    options: [
      "- Safe removal: Ensures data integrity before decommissioning",
      "- Resource cleanup: Frees up system resources for other uses",
      "- --name parameter: Specifies which VDO volume to remove"
    ],
    outro: `Finally, after completing the removal of the obsolete VDO volumes, you witness a streamlined data infrastructure.
Resources are now allocated more efficiently, and the planet's data optimization systems operate at peak performance.

With the removal of the VDO volumes complete, you take a moment to reflect on your accomplishments.
But your journey as a cybernetic engineer continues, and new challenges await in the boundless expanse of the cosmos.`,
  },

  {
    id: "list_vdo",
    title: "List VDO Volumes",
    action: "display all VDO volumes and their status",
    intro: `
Upon landing on VDO-351-xy, you access the planet's data management interface to view the existing VDO volumes.
The interface displays a comprehensive list of volumes, each with its unique identifier, capacity, and status.

You review the list, analyzing the characteristics of each volume to gain insights into the planet's data infrastructure.
Some volumes are dedicated to critical system operations, while others serve as repositories for user data and applications.

As you delve deeper into the list, you uncover valuable information about the planet's data optimization strategies and resource utilization.
    `,
    solution: "vdo list",
    hints: [
      "Hint: Use 'vdo list' to display all VDO volumes.",
      "The answer is: vdo list"
    ],
    output: `VG     Attr   WSize   RSize  Used   Used%   VDO
vdo1   wz--n-  20.00g  10.00g  1.50g  7.5%    /dev/sdc1
vdo2   wz--n-  40.00g  20.00g  3.00g  7.5%    /dev/sdd1`,
    aspects: [
      "- vdo list: Command to list VDO volumes",
      "- --all: Displays information about all VDO volumes, including those not in use",
      "- --verbose: Provides detailed information about each VDO volume",
      "- --json: Outputs information in JSON format for scripting or automated processing"
    ],
    options: [
      "- Volume status: Shows active and inactive VDO volumes",
      "- Usage statistics: Displays space utilization and compression ratios",
      "- Multiple formats: Support for verbose and JSON output"
    ],
    outro: `With a thorough understanding of the VDO volumes, you prepare to embark on your next cybernetic engineering task.
Armed with knowledge and determination, you are ready to face whatever challenges await in the boundless expanse of the cosmos.`,
  },

  {
    id: "vdo_write_modes",
    title: "VDO Write Modes Information",
    action: "learn about VDO write modes and their characteristics",
    intro: `
Upon landing on VDO-351-xy, you are tasked with optimizing the VDO write modes for maximum performance.
The VDO write modes determine how data is written to the underlying storage, balancing performance and data integrity.

You analyze the workload characteristics and system requirements to choose the appropriate write modes.
For high-performance applications, you opt for write-through mode to ensure minimal latency and maximum throughput.

For data-intensive tasks requiring data integrity guarantees, you select write-around mode to bypass caching for critical writes.
This ensures that important data is written directly to storage without impacting performance.
    `,
    solution: "info_display",
    hints: [
      "This is an informational display about VDO write modes.",
      "No command input required - information will be displayed automatically."
    ],
    output: `VDO Write Modes:
1. Sync Mode:
   - In sync mode, writes to the VDO device are acknowledged only when the underlying storage
     has permanently written the data. This mode prioritizes data integrity over performance.
2. Async Mode:
   - In async mode, writes are acknowledged before being written to persistent storage.
     VDO obeys flush requests from layers above, making it safe for use with storage devices
     that report writes as 'done' without guaranteeing actual persistence.
3. Auto Mode (Default):
   - The auto mode selects async or sync write policy dynamically based on the capabilities
     of the underlying storage. This mode offers a balance between performance and data integrity.`,
    aspects: [
      "- Sync Mode: Prioritizes data integrity, writes acknowledged after storage completion",
      "- Async Mode: Prioritizes performance, writes acknowledged before storage completion",
      "- Auto Mode: Balances performance and integrity based on storage capabilities"
    ],
    options: [
      "- Performance optimization: Choose async for high-throughput scenarios",
      "- Data integrity: Choose sync for critical data protection",
      "- Automatic selection: Use auto mode for balanced operation"
    ],
    outro: `With careful consideration, you configure the VDO volumes with the optimal write modes, balancing performance and data integrity.
The VDO volumes are now ready to handle a variety of workloads with efficiency and reliability.

With the configuration of VDO write modes complete, you have successfully optimized the planet's data infrastructure.
But your journey as a cybernetic engineer continues, and new challenges await in the boundless expanse of the cosmos.`,
  }
];

export default vdo_admin;