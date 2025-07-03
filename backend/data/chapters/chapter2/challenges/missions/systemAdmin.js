// backend/data/chapters/chapter2/missions/systemAdmin.js
const systemAdmin = [
  {
    id: "add_group",
    title: "Add Group on Red Hat Linux",
    action: "add a new group named 'team' with GID 40000",
    intro: `Upon your arrival on the planet Managius-Permissius, you are immediately tasked with an important mission: to add a new group to the planetary system.

Groups play a crucial role in managing permissions and access control, and your expertise is needed to ensure the smooth operation of the planet's data infrastructure.

You begin by carefully assessing the requirements for the new group, considering factors such as its purpose, membership, and access privileges.

With meticulous planning and attention to detail, you define the parameters for the new group and prepare to integrate it into the planetary system.

Using your cybernetic tools and administrative utilities, you initiate the process of adding the new group, ensuring that all necessary configurations are in place.`,
    
    solution: "groupadd -g 40000 team",
    
    hints: [
      "Hint: Use 'groupadd -g 40000 team'",
      "The answer is: groupadd -g 40000 team"
    ],
    
    output: `Group 'team' added successfully with GID 40000!`,
    
    aspects: [
      "- groupadd: Command to add a new group to the system",
      "- -g 40000: Specify the numerical GID (Group ID) for the new group",
      "- team: Name of the group being created"
    ],
    
    options: [
      "- '-g GID, --gid GID': Specify the numerical GID for the new group. By default, the next available GID is used",
      "- '-r, --system': Create a system group. System groups typically have GIDs below 1000",
      "- '-f, --force': Force the creation of the group, even if the specified GID already exists",
      "- '-K, --key KEY=VALUE': Set an extended attribute key and value for the group",
      "- '-o, --non-unique': Allow the creation of a group with a non-unique GID"
    ],
    
    outro: `As the group is successfully added to the planetary system, you oversee the allocation of permissions and privileges, carefully balancing security with accessibility.

With the addition of the new group, the data infrastructure of Managius-Permissius is strengthened, enabling smoother collaboration and data management across the planet.

You take pride in your contribution to the advancement of data governance on Managius-Permissius, knowing that your expertise has helped shape the future of the planet's technological landscape.

Group ID (GID) is a unique numerical identifier assigned to each group on a Linux system. It is used to control access to resources and define group permissions.`
  },

  {
    id: "create_directory",
    title: "Create Directory",
    action: "create a directory named 'shared' in /home",
    intro: `As you settle into your role on the planet Managius-Permissius, you are tasked with creating directories to organize and manage the vast amounts of data.

Directories serve as the backbone of the planetary data infrastructure, providing structure and order to the ever-expanding repositories of information.

You begin by identifying key areas where directories are needed, considering factors such as data type, access requirements, and organizational hierarchy.

With your cybernetic tools and administrative utilities, you initiate the process of creating directories, carefully specifying their names, locations, and permissions.`,
    
    solution: "mkdir /home/shared",
    
    hints: [
      "Hint: Use 'mkdir /home/shared'",
      "The answer is: mkdir /home/shared"
    ],
    
    output: `Directory '/home/shared' created successfully!`,
    
    aspects: [
      "- mkdir: Command to create directories",
      "- /home/shared: Full path of the directory to be created"
    ],
    
    options: [
      "- '-p, --parents': Create parent directories as needed. If '/home' already exists, this option will not cause an error",
      "- '-m MODE, --mode=MODE': Set the file mode (permissions) of the created directory. The default mode is 0777 (octal)",
      "- '-v, --verbose': Display a message for each directory created"
    ],
    
    outro: `As each directory is created, you oversee the implementation of access controls and security measures, ensuring that data remains protected and confidential.

With the directories in place, the data infrastructure of Managius-Permissius is organized and efficient, enabling seamless data management and collaboration.

You take satisfaction in knowing that your efforts have contributed to the smooth operation of the planet's data ecosystem, laying the foundation for future innovation and discovery.

Directory '/home/shared' is created for collaborative work. You can specify additional options to customize directory creation.`
  },

  {
    id: "change_ownership",
    title: "Change Ownership of Directory",
    action: "change ownership of /home/shared to owner 'nobody' and group 'team'",
    intro: `As you delve deeper into your responsibilities on the planet Managius-Permissius, you encounter the need to change ownership of certain files and directories.

Ownership plays a crucial role in access control and data management, and your expertise is required to ensure proper governance of the planetary data ecosystem.

You begin by identifying the files and directories for which ownership needs to be changed, considering factors such as data sensitivity and organizational structure.

With your cybernetic tools and administrative utilities, you initiate the process of changing ownership, carefully specifying the new owners and their respective permissions.`,
    
    solution: "chown nobody:team /home/shared",
    
    hints: [
      "Hint: Use 'chown nobody:team /home/shared'",
      "The answer is: chown nobody:team /home/shared"
    ],
    
    output: `Ownership of the directory changed successfully!`,
    
    aspects: [
      "- chown: Command to change ownership of a file or directory",
      "- nobody:team: The new owner and group of the directory. 'nobody' represents the user and 'team' represents the group",
      "- /home/shared: Path of the directory whose ownership is being changed"
    ],
    
    options: [
      "- '-R, --recursive': Recursively change ownership of directories and their contents",
      "- '-v, --verbose': Display a message for each directory whose ownership is changed"
    ],
    
    outro: `As ownership is transferred, you verify that the necessary access controls are in place, ensuring that data remains secure and confidential.

With each successful ownership change, you contribute to the effective management of the planetary data infrastructure, promoting collaboration and efficiency.

You take pride in your role as a guardian of data integrity on Managius-Permissius, knowing that your actions help uphold the principles of security and accountability.

The 'chown' command is used to change the owner and group of files or directories in Linux. In this example, the ownership of the directory '/home/shared' is changed to 'nobody' user and 'team' group.`
  },

  {
    id: "change_permissions",
    title: "Change Permissions of Directory",
    action: "set permissions so user can read/write/execute, group can read/write, others have no access",
    intro: `As your journey on the planet Managius-Permissius progresses, you encounter the need to adjust permissions on various files and directories.

Permissions are essential for controlling access to data and ensuring the security and integrity of the planetary data infrastructure.

You carefully assess the permissions of each file and directory, considering factors such as data sensitivity and user requirements.

With your cybernetic tools and administrative utilities, you initiate the process of changing permissions, adjusting settings to reflect the evolving needs of the planetary system.`,
    
    solution: "chmod u+rwx,g+rw,o-rwx /home/shared",
    
    hints: [
      "Hint: Use 'chmod u+rwx,g+rw,o-rwx /home/shared'",
      "The answer is: chmod u+rwx,g+rw,o-rwx /home/shared"
    ],
    
    output: `Permissions of the directory changed successfully!`,
    
    aspects: [
      "- chmod: Command to change permissions of a file or directory",
      "- u+rwx: Grant read, write, and execute permissions to the owner (user)",
      "- g+rw: Grant read and write permissions to the group",
      "- o-rwx: Remove all permissions from others",
      "- /home/shared: Path of the directory whose permissions are being changed"
    ],
    
    options: [
      "- Special permissions: 'o+t' (sticky bit), 'g+s' (SGID), 'u+s' (SUID)",
      "- '+' symbol: Adds permissions to the specified category",
      "- '-' symbol: Removes permissions from the specified category",
      "- '=' symbol: Sets exact permissions, removing any existing ones"
    ],
    
    outro: `As permissions are modified, you verify that the changes align with security policies and access controls, preventing unauthorized access and data breaches.

With each successful permission change, you contribute to the robustness of the planetary data ecosystem, promoting transparency and accountability.

You take pride in your role as a steward of data governance on Managius-Permissius, knowing that your actions help uphold the principles of privacy and data integrity.

The 'chmod' command is used to change permissions of files and directories in Linux. The '+' means that we are ADDING permissions and '-' means we are REVOKING permissions.`
  },

  {
    id: "add_user",
    title: "Add User",
    action: "add a new user named 'user1' to the system",
    intro: `As you navigate the complexities of data management on the planet Managius-Permissius, you encounter the need to add new users to the system.

Users are the lifeblood of the planetary data infrastructure, each playing a vital role in the collaborative efforts to advance knowledge and innovation.

You begin by assessing the requirements for the new users, considering factors such as their roles, responsibilities, and access privileges.

With your cybernetic tools and administrative utilities, you initiate the process of adding users, carefully configuring their accounts to align with planetary policies and security protocols.`,
    
    solution: "useradd user1",
    
    hints: [
      "Hint: Use 'useradd user1'",
      "The answer is: useradd user1"
    ],
    
    output: `User 'user1' added successfully!`,
    
    aspects: [
      "- useradd: Command to add a new user account",
      "- user1: Username of the user being added"
    ],
    
    options: [
      "- 'useradd -m -s /bin/bash user2': Create home directory and set shell",
      "- 'useradd -g group1 user3': Add user to specific primary group",
      "- 'useradd -p password123 user4': Set user password during creation",
      "- '-m': Create the user's home directory if it does not exist",
      "- '-s /bin/bash': Set the user's login shell to '/bin/bash'"
    ],
    
    outro: `As user accounts are created, you verify that the necessary access controls and permissions are in place, ensuring that data remains protected and accessible only to authorized individuals.

With each successful addition of a new user, you contribute to the diversity and expertise of the planetary data ecosystem, fostering a culture of collaboration and innovation.

You take pride in your role as a facilitator of knowledge exchange on Managius-Permissius, knowing that each new user brings unique perspectives and skills to the collective pursuit of discovery.

The 'useradd' command is used to create a new user account in Linux. In this example, the user 'user1' is added to the system.`
  },

  {
    id: "modify_user",
    title: "Modify User",
    action: "modify user1 to be in both their personal group and group1",
    intro: `As your journey on the planet Managius-Permissius unfolds, you encounter the need to modify existing user accounts.

User accounts are dynamic entities, requiring occasional adjustments to accommodate changes in roles, responsibilities, and access requirements.

You carefully review the attributes of each user account, considering factors such as their current roles, permissions, and organizational affiliations.

With your cybernetic tools and administrative utilities, you initiate the process of modifying user accounts, making adjustments to reflect the evolving needs of the planetary system.`,
    
    solution: "usermod -aG group1 user1",
    
    hints: [
      "Hint: Use 'usermod -aG group1 user1'",
      "The answer is: usermod -aG group1 user1"
    ],
    
    output: `User 'user1' modified successfully!`,
    
    aspects: [
      "- usermod: Command to modify an existing user account",
      "- -aG group1: Add the user to the 'group1' group (append to existing groups)",
      "- user1: Username of the user being modified"
    ],
    
    options: [
      "- 'usermod -c 'New User' user1': Set the user's comment field",
      "- 'usermod -L user2': Lock the user account",
      "- 'usermod -U user2': Unlock the user account",
      "- '-a': Append the user to supplementary groups (use with -G)",
      "- '-G': List of supplementary groups"
    ],
    
    outro: `As account modifications are implemented, you verify that the changes align with security policies and access controls, ensuring that data remains secure and accessible only to authorized individuals.

With each successful modification of a user account, you contribute to the adaptability and resilience of the planetary data ecosystem, empowering users to fulfill their roles effectively.

You take pride in your role as a guardian of user integrity on Managius-Permissius, knowing that your actions help maintain the balance between security and usability in the planetary data infrastructure.

The 'usermod' command is used to modify user account settings in Linux. In this example, the user 'user1' is added to the 'group1' group while preserving membership in existing groups.`
  }
];

export default systemAdmin;