// backend/data/chapters/chapter2/missions/autofs_client.js

const autofs_client = [
  {
    id: "configure_autofs_server",
    title: "Configure Autofs on Server Side",
    action: "configure NFS server with autofs for dynamic file mounting",
    intro: `
As you survey the landscape of Auto-q652-FS, you realize that optimizing Autofs configurations on the server side will be crucial.
You access the central server, the heart of the planet's filesystem management system, and begin to configure Autofs settings.

You define automount maps, specifying the filesystems to be automatically mounted when accessed by users or applications.

Each map is meticulously crafted to ensure efficient data access and management across the planet's network.

Additionally, you fine-tune timeout settings, ensuring that idle filesystems are unmounted promptly to conserve resources.

With each configuration tweak, the server becomes more responsive and efficient, seamlessly managing filesystems to meet the demands of Auto-q652-FS.
    `,
    solution: "multi_command_sequence",
    hints: [
      "This requires a sequence of 4 commands in the correct order.",
      "Commands involve: NFS export configuration, service restart, export activation, and verification."
    ],
    output: `NFS Server Configuration Sequence:
1. NFS export configuration appended to /etc/exports
2. NFS server service restarted to apply changes
3. All directories in /etc/exports exported successfully
4. NFS shares verified and displayed`,
    aspects: [
      "- echo '/home/nfsServer ClientIP/24(rw,no_root_squash,no_subtree_check)' >> /etc/exports: Appends NFS export configuration",
      "- systemctl restart nfs-server.service: Restarts NFS server to apply changes",
      "- exportfs -a: Exports all directories listed in /etc/exports",
      "- showmount -e localhost: Shows NFS shares exported by the localhost"
    ],
    options: [
      "- NFS export permissions: rw (read-write), no_root_squash (preserve root privileges), no_subtree_check (disable subtree checking)",
      "- Service management: systemctl commands for managing NFS services",
      "- Export verification: showmount command to verify active NFS exports"
    ],
    outro: `As you complete the Autofs configurations on the server side, you take pride in knowing that you have optimized the planet's data infrastructure to its fullest potential.

With your mission on Auto-q652-FS accomplished, you prepare to embark on new adventures in the boundless expanse of the cosmos.

The NFS server now stands ready to serve filesystems across the network with unprecedented efficiency and reliability.`,
  },

  {
    id: "configure_autofs_client",
    title: "Configure Autofs on Client Side",
    action: "configure autofs client for seamless NFS access",
    intro: `
With the Autofs configurations optimized on the server side, it's time to configure Autofs on the client side.
You access the client machines scattered across Auto-q652-FS, ready to implement the necessary changes.

On each client machine, you edit the Autofs configuration files, defining the mount points and specifying the server addresses.

Each client is carefully configured to seamlessly access the filesystems managed by the central server.

You verify the configurations, ensuring that Autofs is set to automatically mount the required filesystems upon access.
    `,
    solution: "multi_command_sequence",
    hints: [
      "This requires a sequence of 7 commands in the correct order.",
      "Commands involve: package installation, directory creation, configuration files, and service management."
    ],
    output: `Autofs Client Configuration Sequence:
1. Autofs package installed successfully
2. Mount directory created for NFS shares
3. Autofs master configuration updated
4. Default configuration file copied
5. NFS share configuration added
6. Autofs service restarted
7. Mount directory verified and accessible`,
    aspects: [
      "- dnf install -y autofs: Installs autofs package",
      "- mkdir autofs: Creates a directory to mount the NFS shares",
      "- echo 'autofs /etc/auto.sharedfs --timeout=30' >> /etc/auto.master: Adds autofs configuration",
      "- cp /etc/auto.misc /etc/auto.sharedfs: Copies the default autofs configuration file",
      "- echo 'nfsServer -fstype=nfs ServerIP:/home/user1/nfsServer' >> /etc/auto.sharedfs: Adds NFS share configuration",
      "- systemctl restart autofs.service: Restarts autofs service to apply changes",
      "- ls /autofs: Checks if the directory to be created is mounted"
    ],
    options: [
      "- Timeout configuration: --timeout=30 sets unmount timeout for idle filesystems",
      "- Filesystem type: -fstype=nfs specifies NFS as the filesystem type",
      "- Service management: systemctl commands for managing autofs service"
    ],
    outro: `As you complete the Autofs configurations on the client side, you witness a seamless integration of filesystems across Auto-q652-FS.

Users and applications can now access data with unprecedented ease, thanks to your expertise in configuring Autofs.

With the Autofs configurations perfected on both the server and client sides, Auto-q652-FS stands ready to embrace the future of data management.

As you prepare to depart for new adventures, you reflect on the impact of your actions, knowing that you have ushered Auto-q652-FS into a new era of efficiency and innovation.`,
  },

  {
    id: "install_nfs",
    title: "Install NFS (Network File System)",
    action: "install NFS utilities for network file sharing",
    intro: `
With Autofs optimizations complete, you turn your attention to the next phase of infrastructure development: NFS (Network File System) installation and configuration.
NFS is essential for enabling seamless file sharing and access across the network, a crucial component for the interconnected systems of Auto-q652-FS.

You access the central server, the nucleus of Auto-q652-FS's data management network, to begin the NFS installation process.

Using advanced cybernetic tools, you install the NFS packages and dependencies, laying the foundation for networked file sharing.

Once the installation is complete, you proceed to configure the NFS exports, defining the directories and permissions to be shared across the network.

Each export is meticulously crafted to ensure secure and efficient access to the shared filesystems, maintaining data integrity and confidentiality.
    `,
    solution: "dnf install -y nfs-utils",
    hints: [
      "Hint: Use 'dnf install -y nfs-utils' to install NFS utilities.",
      "The answer is: dnf install -y nfs-utils"
    ],
    output: `Installed:
  nfs-utils.x86_64
Complete!`,
    aspects: [
      "- dnf install -y: Install packages with automatic yes confirmation",
      "- nfs-utils: Network File System utilities package"
    ],
    options: [
      "- NFS utilities: Provides tools for NFS server and client operations",
      "- Network file sharing: Enables sharing of filesystems across network",
      "- Cross-platform compatibility: Works with various operating systems"
    ],
    outro: `The command resonates with power as you utter it aloud, invoking the installation process.
Mystical energies swirl around you as NFS utilities are installed, their capabilities now at your command.

As the NFS exports are configured, you test the connectivity from client machines, verifying seamless access to the shared directories.

With NFS successfully installed and configured, Auto-q652-FS is now equipped with a robust network file sharing infrastructure, enabling seamless collaboration and data access across its interconnected systems.

As you prepare to depart for new adventures, you take pride in knowing that your expertise has strengthened the foundations of Auto-q652-FS, ensuring its continued prosperity in the vast expanse of the cosmos.`,
  }
];

export default autofs_client;