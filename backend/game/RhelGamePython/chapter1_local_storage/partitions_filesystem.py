import CommandGenerator as CommandGenerator
import slow_validInput


check_disk_space_command = CommandGenerator.CommandGenerator(
    action="list disk space on a Red Hat system",
    correct_command="df -h",
    hint="Hint: Use 'df -h' to list disk space.",
    command_output=[
        """Filesystem                        Size  Used Avail Use% Mounted on
tmpfs                             773M  2,1M  770M   1% /run
/dev/nvme0n1p2                    234G   60G  163G  27% /
tmpfs                             3,8G  2,8M  3,8G   1% /dev/shm
tmpfs                             5,0M  4,0K  5,0M   1% /run/lock
/dev/nvme0n1p1                    511M  6,1M  505M   2% /boot/efi
192.168.0.245:/home/user/nfs  457G   55G  379G  13% /home/user1/nfs-share
tmpfs                             773M  1,7M  771M   1% /run/user/1000\n"""
    ],
    command_aspects=[
        "- df : List disk space",
        "- -h : Show output in human readable form",
    ],
    command_options=[
        " - -h, --human-readable: Print sizes in a human-readable format (e.g., 1K, 234M, 2G)",
        " - -a, --all: Include all filesystems, including those with 0 blocks used.",
        "- -l, --local: Limit the output to local filesystems.",
    ],
    intro_text=["""\nAs you delve deeper into your mission, you realize the importance of understanding the disk space usage across the system.
Recalling your training, you decide to use the 'df -h' command to display the disk space usage in a human-readable format.\n
The output reveals valuable insights into the allocation and utilization of disk space.
You analyze the information meticulously, identifying any areas of concern or potential optimizations.
Armed with this knowledge, you're better prepared to optimize the system's performance and ensure its continued stability.\n""",
                ],
    outro_text=["",],
)

create_ext4_on_lvm = CommandGenerator.CommandGenerator(
    action="create an ext4 file system.",
    correct_command="mkfs.ext4 /dev/vg1/lv1",
    hint="Hint: Use 'mkfs.ext4 /dev/vg1/lv1' to create an ext4 file system.",
    command_output=[
        "mke2fs 1.45.6 (20-Mar-2020)",
        "Creating filesystem with 26214400 4k blocks and 6553600 inodes",
        "Filesystem UUID: a0d28a15-ef32-4e63-8a26-0e9eac794a10",
        "Superblock backups stored on blocks: ",
        "32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,",
        "4096000, 7962624, 11239424, 20480000, 23887872",
    ],
    command_aspects=[
        "- mkfs.ext4 : Creates an ext4 filesystem",
        "- /dev/vg1/lv1 : Partition for the filesystem to be created",
    ],
    command_options=[
        "- -L, --label <label> : Specify the volume label.",
        "- -E, --reserved <percent> : Specify the percentage of the filesystem reserved for the super-user.",
        "- -m, --mmp : Enable Multi-Mount Protection.",
    ],
    intro_text=["""\nHowever, to further optimize the system, you recognize the need to create a new ext4 filesystem.
With a swift command, you initiate the creation process, specifying the desired parameters.\n
The command executes flawlessly, and within moments, the new ext4 filesystem is created.
You meticulously verify the results, ensuring that the filesystem meets the specified requirements.
With the addition of the new filesystem, the system's capabilities are expanded, and its performance is further optimized.\n"""

                ],
    outro_text=["",],
)


check_force_partition_check_command = CommandGenerator.CommandGenerator(
    action="force partition check",
    correct_command="partprobe",
    hint="Hint: Use 'partprobe' to force partition check.",
    command_output=["Partition table updated.",],
    command_aspects=["- 'partprobe': Command to force partition check",],
    command_options=[
        "- '-s, --summary': Display summary information after processing",],

    intro_text=["""\nYou reach a critical juncture in your mission, where precise actions are needed to stabilize the system.
Remembering your training, you decide to use the 'partprobe' command to inform the operating system of partition table changes.\n
With bated breath, you execute the command, waiting anxiously for the system's response.
After a tense moment, the screen displays the reassuring message: 'Partition table updated successfully.'
A wave of relief washes over you as you continue your mission, knowing that you've taken a crucial step towards restoring stability to the system.\n"""
                ],
    outro_text=["",],
)

check_disks_partitions_command = CommandGenerator.CommandGenerator(
    action="list disks and partitions.",
    correct_command="lsblk",
    hint="Hint: Use 'lsblk' to list disks and partitions.",
    command_output=["""   NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
    loop0         7:0    0     4K  1 loop /snap/bare/5
    loop1         7:1    0  55,7M  1 loop /snap/core18/2812
    loop2         7:2    0  63,5M  1 loop /snap/core20/2015
    loop3         7:3    0  63,9M  1 loop /snap/core20/2105
    loop4         7:4    0  74,1M  1 loop /snap/core22/1033
    loop5         7:5    0  74,2M  1 loop /snap/core22/1122
    nvme0n1     259:0    0 238,5G  0 disk 
    ├─nvme0n1p1 259:1    0   512M  0 part /boot/efi
    └─nvme0n1p2 259:2    0   238G  0 part /var/snap/firefox/common/host-hunspell/\n""",],
    command_aspects=["- 'lsblk': Command to list disks and partitions",],
    command_options=[
        "- '-a, --all': Include all devices (e.g., floppy, RAM disks)",
        "- '-o, --output': Specify columns to display (e.g., 'lsblk -o NAME,SIZE,TYPE,MOUNTPOINT')",
    ],

    intro_text=["""\nHowever, your work is not yet done. Another critical task lies ahead.
You need to ensure the health and integrity of all disks and partitions.
Recalling your training, you decide to employ the 'lsblk' to perform a comprehensive check.\n
As the command executes, you monitor the output closely, analyzing each line of information.
Your expertise allows you to swiftly identify any irregularities or potential issues.
With each passing moment, your confidence grows, knowing that you're one step closer to securing the system.\n"""
                ],
    outro_text=["",],
)


def check_uuid_command():
    """
    Prompt the user to input a command to get UUIDs on a Red Hat system.
    Check if the command is correct.
    If correct, ask the user if they want to copy the UUID to fstab.
    If yes, prompt the user to write the command to copy the UUID to fstab.
    Provide a hint if the user gives a wrong answer to copying to fstab.
    """
    correct_command = "blkid"
    hint = "Hint: Use 'blkid' to get UUIDs."
    quit_command = ["quit", "q"]

    try:
        slow_validInput.print_slow(
            "But there's one more task to complete in your mission.")
        slow_validInput.print_slow(
            "You must gather crucial information about the filesystems and partitions.")
        slow_validInput.print_slow(
            "Turning to your arsenal of commands, you decide to use 'blkid' to list all available block devices along with their attributes.\n")
        slow_validInput.print_slow(
            "The output scrolls across your screen, providing vital details about each block device.")
        slow_validInput.print_slow(
            "You carefully examine the information, noting down UUIDs and filesystem types.")
        slow_validInput.print_slow(
            "With this data in hand, you're better equipped to navigate the intricacies of the system and fulfill your mission.\n")

        while True:
            user_command = input(
                "Enter the command to get UUIDs on a Red Hat system (type 'quit' or 'q' to exit): ")
            print("\n")
            if user_command.strip() == correct_command:
                print("Command is correct. You can continue.")
                # Output example integrated here
                print("Output Example:\n/dev/sda1: UUID=\"1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p\" TYPE=\"ext4\"\n/dev/sda2: UUID=\"7b8c9d0e-1f2g-3h4i-5j6k-7l8m9n0o1p\" TYPE=\"swap\"")
                copy_to_fstab = input(
                    "Do you want to copy this UUID to the fstab? (yes/no): ")
                if copy_to_fstab.lower() == 'yes':
                    user_input = input(
                        "Write the command to copy the UUID to fstab: ")
                    if user_input.strip() == "blkid -s UUID -o value >> /etc/fstab":
                        print("UUID copied to fstab successfully.")
                    else:
                        print("Wrong command. Try again.")
                        print(
                            "Hint: Use 'blkid -s UUID -o value >> /etc/fstab' to copy the UUID to fstab.")
                        continue
                else:
                    print("UUID not copied to fstab.")
                return True
            elif user_command.strip() in quit_command:
                print("Exiting the program. Goodbye!")
                return False
            else:
                print("Command is incorrect. Try again.")
                print(hint)
                print(
                    "Options: Additional options can be used with blkid command to specify the type of devices or output format.")
                print("Example with options: blkid -t TYPE=ext4 -o list")
                continue
    except KeyboardInterrupt:
        print("\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        print("An error occurred during the command execution:", e)
