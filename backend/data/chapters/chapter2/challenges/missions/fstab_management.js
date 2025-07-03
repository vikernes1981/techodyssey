// backend/data/chapters/chapter2/missions/fstab_management.js

const fstab_management = [
  {
    id: "add_vdo_fstab",
    title: "Add VDO Volume to fstab",
    action: "configure VDO volume for automatic mounting",
    intro: `
Upon landing on VDO-351-xy, you are tasked with integrating a newly created VDO volume into the planet's system.
To ensure seamless access to the volume, you must add it to the /etc/fstab file, which manages filesystem mounts.

You carefully edit the /etc/fstab file, adding an entry for the VDO volume along with the necessary parameters.
Each parameter is chosen with precision, optimizing performance and reliability for the mounted volume.

Once the entry is added, you save the changes to the /etc/fstab file and initiate a system reboot to apply the configuration.
    `,
    solution: "echo '/dev/mapper/vdo1 /mnt/vdo xfs defaults,x-systemd.requires=vdo.service 0 0' >> /etc/fstab",
    hints: [
      "Hint: Use echo to append VDO volume entry to /etc/fstab with systemd requirements.",
      "The answer is: echo '/dev/mapper/vdo1 /mnt/vdo xfs defaults,x-systemd.requires=vdo.service 0 0' >> /etc/fstab"
    ],
    output: `  /dev/mapper/vdo1 /mnt/vdo xfs defaults,x-systemd.requires=vdo.service 0 0`,
    aspects: [
      "- /dev/mapper/vdo1: Path to the VDO volume device mapper",
      "- /mnt/vdo: Mount point for the VDO volume",
      "- xfs: Filesystem type",
      "- defaults,x-systemd.requires=vdo.service: Default mount options with systemd requirement",
      "- 0 0: Filesystem check and backup options"
    ],
    options: [
      "- x-systemd.requires=vdo.service: Ensures VDO service is running before mount",
      "- defaults: Standard mount options (rw,suid,dev,exec,auto,nouser,async)",
      "- >> /etc/fstab: Appends to fstab file instead of overwriting"
    ],
    outro: `VDO volume added to /etc/fstab successfully!
The integration is complete, and your VDO storage system will now mount automatically on system startup.
Your data optimization infrastructure is now seamlessly woven into the planet's operating system.`,
  },

  {
    id: "add_stratis_fstab",
    title: "Add Stratis Filesystem to fstab",
    action: "configure Stratis filesystem for automatic mounting",
    intro: `
To ensure seamless access to your Stratis filesystem, you decide to configure it for auto-mounting.
You open the /etc/fstab file, the configuration file used by the system to automatically mount filesystems at boot.

With careful consideration, you add an entry for the Stratis pool, specifying its unique identifier and mount point.
You include options for automatic mounting and error handling, ensuring robustness and reliability.

The configuration must account for the unique requirements of Stratis storage technology.
    `,
    solution: "echo 'stratispool /mnt/stratis xfs defaults,x-systemd.requires=stratisd.service 0 0' >> /etc/fstab",
    hints: [
      "Hint: Use echo to append Stratis filesystem entry to /etc/fstab with stratisd service requirement.",
      "The answer is: echo 'stratispool /mnt/stratis xfs defaults,x-systemd.requires=stratisd.service 0 0' >> /etc/fstab"
    ],
    output: `  stratispool /mnt/stratis xfs defaults,x-systemd.requires=stratisd.service 0 0`,
    aspects: [
      "- stratispool: Mount point for the Stratis filesystem",
      "- /mnt/stratis: Mount point for the Stratis filesystem", 
      "- xfs: Filesystem type",
      "- defaults: Default mount options",
      "- x-systemd.requires=stratisd.service: Default mount options with systemd requirement",
      "- 0 0: Filesystem check and backup options"
    ],
    options: [
      "- x-systemd.requires=stratisd.service: Ensures Stratis daemon is running before mount",
      "- defaults: Standard mount options for reliable operation",
      "- XFS filesystem: High-performance filesystem used by Stratis"
    ],
    outro: `Stratis filesystem added to /etc/fstab successfully!
As you save the changes and exit the file, you feel a sense of satisfaction knowing that your Stratis pool will be seamlessly integrated into the system.

With the Stratis pool now configured for auto-mounting, you can focus on your mission without worrying about manual intervention.
The advanced storage technology is now fully integrated into your base operations.`,
  },

  {
    id: "list_stratis_filesystems",
    title: "List Stratis Filesystems",
    action: "display all Stratis filesystems in a pool",
    intro: `
With your Stratis storage systems configured, you need to verify the current state of your filesystems.
The mysteries of Stratis technology require careful monitoring and management.

You prepare to query the Stratis subsystem to reveal all active filesystems within your storage pool.
This information will help you understand the current storage allocation and plan future expansions.

The command will unveil the digital landscape of your storage infrastructure.
    `,
    solution: "stratis fs list mypool",
    hints: [
      "Hint: Use 'stratis fs list mypool' to display filesystems in the pool.",
      "The answer is: stratis fs list mypool"
    ],
    output: `Pool Name: mypool
Name     Used     Created            Device               UUID
myfs     2.5 GiB  Mar 15 10:30:45    /stratis/mypool/myfs  a1b2c3d4-e5f6-7890-abcd-ef1234567890`,
    aspects: [
      "- stratis fs list: Command to list Stratis filesystems",
      "- mypool: Name of the Stratis storage pool to query",
      "- Output shows filesystem name, size, creation time, and UUID"
    ],
    options: [
      "- List all pools: Use 'stratis pool list' to see all available pools",
      "- Detailed info: Add filesystem name for specific details",
      "- Filesystem management: Use for monitoring storage utilization"
    ],
    outro: `The digital manifest reveals the structure of your Stratis storage domain.
Each filesystem is accounted for, with its usage statistics and unique identifiers displayed.
This knowledge empowers you to make informed decisions about your storage infrastructure.

Your mastery over Stratis technology grows stronger with each successful command.`,
  }
];

export default fstab_management;