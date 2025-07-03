// backend/data/chapters/chapter2/missions/stratis_storage.js

const stratis_storage = [
  {
    id: "install_stratis",
    title: "Install Stratis Packages",
    action: "install Stratis CLI and daemon packages",
    intro: `
As your starship lands on Stratis, you immediately begin the installation process for your base of operations.
The planet's rugged terrain presents challenges, but your expertise allows you to find an optimal location.
You deploy automated drones to assist with construction, their mechanical arms whirring as they assemble structures.

The command resonates with power as you utter it aloud, invoking the installation process.
Mystical energies swirl around you as Stratis packages are installed, their arcane capabilities now at your command.
    `,
    solution: "dnf install -y stratis-cli stratisd",
    hints: [
      "Hint: Use 'dnf install -y stratis-cli stratisd' to install Stratis packages.",
      "The answer is: dnf install -y stratis-cli stratisd"
    ],
    output: `Installed:
  stratis-cli.x86_64 0:2.4.3-1.el8
  stratisd.x86_64 0:2.4.3-1.el8
Complete!`,
    aspects: [
      "- dnf install -y: Install packages with automatic yes confirmation",
      "- stratis-cli: Command-line interface for Stratis storage management",
      "- stratisd: Stratis daemon service for storage pool management"
    ],
    options: [
      "- stratis-cli: Provides command-line tools for managing Stratis pools and filesystems",
      "- stratisd: Background daemon that manages Stratis storage pools",
      "- -y flag: Automatically answers 'yes' to installation prompts"
    ],
    outro: `Finally, after hours of hard work, your base stands resilient against the harsh environment of Stratis.
As you overlook your newly established outpost, you can't help but feel a sense of accomplishment.
But you know that this is only the beginning of your journey on Stratis, and greater challenges await.`,
  },

  {
    id: "enable_stratisd",
    title: "Enable and Start Stratis Daemon",
    action: "enable and start the Stratis daemon service",
    intro: `
With the Stratis packages installed, you must now awaken the daemon that will manage your storage pools.
The base begins to take shape, with power generators humming and communication arrays extending towards the sky.
However, as the installation progresses, you encounter unexpected obstacles.

Despite these challenges, your determination drives you forward.
You implement safeguards and optimizations, ensuring the stability and efficiency of your installation.
    `,
    solution: "systemctl enable --now stratisd",
    hints: [
      "Hint: Use 'systemctl enable --now stratisd' to enable and start the Stratis daemon.",
      "The answer is: systemctl enable --now stratisd"
    ],
    output: `Created symlink /etc/systemd/system/multi-user.target.wants/stratisd.service → /usr/lib/systemd/system/stratisd.service.
● stratisd.service - Stratis daemon
   Loaded: loaded (/usr/lib/systemd/system/stratisd.service; enabled; vendor preset: enabled)
   Active: active (running)`,
    aspects: [
      "- systemctl enable: Configure service to start automatically at boot",
      "- --now: Start the service immediately after enabling",
      "- stratisd: The Stratis storage management daemon"
    ],
    options: [
      "- enable: Configures the service for automatic startup",
      "- --now: Combines enable and start operations in one command",
      "- Alternative: Use 'systemctl start stratisd' to only start without enabling"
    ],
    outro: `The Stratis daemon now hums with life, ready to manage your storage infrastructure.
Your base's power systems stabilize, and the communication arrays lock onto distant signals.
The foundation for advanced storage management is now in place.`,
  },

  {
    id: "wipefs_device",
    title: "Clear Device Signatures",
    action: "erase filesystem signatures on storage device",
    intro: `
Before you can harness the full power of Stratis storage, you must prepare your storage devices.
Ancient filesystem signatures from previous civilizations linger on the storage medium.
These must be cleared to make way for the advanced Stratis technology.

You carefully examine the device, noting the faint traces of old filesystem structures.
With precision, you prepare to wipe these signatures clean.
    `,
    solution: "wipefs -a /dev/sda",
    hints: [
      "Hint: Use 'wipefs -a /dev/sda' to erase all filesystem signatures.",
      "The answer is: wipefs -a /dev/sda"
    ],
    output: `/dev/sda: 8 bytes were erased at offset 0x00000200 (gpt): 45 46 49 20 50 41 52 54
/dev/sda: 8 bytes were erased at offset 0x1ff801ff (gpt): 45 46 49 20 50 41 52 54
/dev/sda: 2 bytes were erased at offset 0x000001fe (PMBR): 55 aa`,
    aspects: [
      "- wipefs: Command to erase filesystem signatures from devices",
      "- -a: Erase all available signatures",
      "- /dev/sda: Target storage device to be cleared"
    ],
    options: [
      "- -a, --all: Erase all available signatures",
      "- -n, --no-act: Dry run, show what would be erased without doing it",
      "- -t, --types: Specify particular signature types to erase"
    ],
    outro: `The ancient signatures fade away like mist in the morning sun.
Your storage device is now pristine and ready for Stratis configuration.
The path forward is clear, unencumbered by the remnants of old technologies.`,
  },

  {
    id: "create_stratis_snapshot",
    title: "Create Stratis Filesystem Snapshot",
    action: "create a snapshot of the Stratis filesystem",
    intro: `
As you explore the rugged landscape of Stratis, you come across a peculiar technology known as 'Stratis Snapshots.'
These snapshots are remnants of past events, frozen in time by unknown forces.
Interacting with a snapshot allows you to glimpse into the past and uncover valuable information.

You encounter your first snapshot near a rocky outcrop, its shimmering form pulsating with ethereal energy.
Approaching cautiously, you reach out and touch the snapshot, causing the scene to unfold before you.
    `,
    solution: "stratis fs snapshot mypool myfs",
    hints: [
      "Hint: Use 'stratis fs snapshot mypool myfs' to create a snapshot.",
      "The answer is: stratis fs snapshot mypool myfs"
    ],
    output: `Created snapshot 'snapshot_name' of filesystem 'myfs' in pool 'mypool'`,
    aspects: [
      "- stratis fs snapshot: Command to create filesystem snapshots",
      "- mypool: Name of the Stratis storage pool",
      "- myfs: Name of the filesystem to snapshot"
    ],
    options: [
      "- Snapshots preserve filesystem state at a point in time",
      "- Can be used for backup and recovery operations",
      "- Snapshots share storage efficiently with the original filesystem"
    ],
    outro: `In the snapshot, you witness a group of explorers facing off against a ferocious native creature.
Their weapons blaze with energy as they struggle to fend off the relentless assault.
Suddenly, a burst of lightning illuminates the sky, freezing the combatants in time.
As the snapshot fades, you are left with newfound knowledge of the dangers lurking on Stratis.`,
  }
];

export default stratis_storage;