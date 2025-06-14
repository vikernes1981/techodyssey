import CommandGenerator as CommandGenerator

### MOUNT WITH UUID ###


uuid = "966cd40a-0aab-464b-b930-7909fefea8db"
mount_point = "/mnt"

provide_uuid_line = CommandGenerator.CommandGenerator(
    action="provide the UUID line to fstab",
    correct_command=f'UUID={uuid} /mnt ext4 defaults 0 0',
    hint=f"Hint: Use 'UUID={uuid} /mnt ext4 defaults 0 0' to provide the UUID line.",
    command_output=["If command is correct there won't be any output"],
    command_aspects=[f"\nUUID={uuid}: This part of the line specifies the  of the filesystem. In this context, {uuid} is a placeholder that would be replaced with the actual  name. When a filesystem is mounted using a , the system looks for a filesystem with that specific  and mounts it accordingly",
                     f"\n{mount_point}: This part of the line specifies the mount point, which is the directory in the filesystem where the contents of the device will be accessible after it's mounted. In this case, the filesystem will be mounted at the {mount_point} directory",
                     "\next4: This part specifies the filesystem type. It indicates that the filesystem being mounted is of type ext4. The filesystem type is important for the system to understand how to interpret and handle the data on the device",
                     "\ndefaults: This part specifies the mount options. In this case, it specifies that the default mount options should be used. These options typically include settings for read-write access, permissions, and other parameters that control how the filesystem is mounted.",
                     "\n0: This part specifies the dump option. The dump option is used by the dump utility to determine whether the filesystem needs to be backed up. A value of 0 indicates that the filesystem should not be backed up by default.",
                     "\n0: This part specifies the fsck option. The fsck option is used by the fsck utility to determine the order in which filesystems should be checked during system boot. A value of 0 indicates that the filesystem should not be checked.",
                     "\nOverall, this line is a configuration entry in the /etc/fstab file, which is used by the system to automatically mount filesystems during boot. It specifies the details of how a particular filesystem should be mounted, including its , mount point, filesystem type, mount options, and other parameters.",
                     ],
    command_options=["",],
    intro_text=[
        f"Your quest begins with the discovery of the following UUID:\n {uuid}\n and the Mount point :\n {mount_point}\n",],
    outro_text=["",],
)


mount_partition = CommandGenerator.CommandGenerator(
    action="mount a partition",
    correct_command="mount /dev/sdb1 /mnt",
    hint="Hint: Use the 'mount' command to mount a partition. You can specify the mount point with '/mnt'. To mount all filesystems specified in fstab, use 'mount -a'.",
    command_output=["mount: /dev/sdb1 mounted on /mnt",],
    command_aspects=[
        "mount: This is the command used to mount filesystems in Unix-like operating systems.",
        "dev/sdb1: This is the device file representing the partition or disk where the filesystem is located. In this case, /dev/sdb1 refers to the first partition on the second SCSI disk (/dev/sdb).",
        "/mnt: This is the mount point, which is a directory in the filesystem hierarchy where the contents of the device will be made accessible after mounting. In this case, /mnt is the directory where the filesystem from /dev/sdb1 will be attached.",
    ],
    command_options=[
        "-o, --options: Specifies mount options, such as read-only (ro), read-write (rw), and others specific to each filesystem type. For example, -o ro mounts the filesystem as read-only.",
        "-L, --label: Mounts the filesystem by specifying the volume label.",
        "-a : Mounts all filesystems listed in the /etc/fstab",
    ],
    intro_text=["",],
    outro_text=["",],
)


def edit_fstab():
    """
    Prompt the user to edit the fstab file.
    """
    hint = "Hint: The fstab file is typically located in the /etc directory."
    quit_commands = ["quit", "q"]

    try:
        while True:
            edit_command = input(
                "Navigate to fstab file or edit it directly using vim (type 'quit' or 'q' to exit): ")

            if edit_command.strip() in quit_commands:
                print("Exiting the program. Goodbye!")
                return False

            if "cd /etc/" in edit_command:
                print("Correct! Now you're in the directory containing the fstab file.")
                vim_command = input(
                    "How would you edit the fstab file using vim? ")
                if "vim" in vim_command and "fstab" in vim_command:
                    print("Correct! You're now editing the fstab file.")
                    break
                else:
                    print("Incorrect. Try again with 'vim fstab' or 'vim /etc/fstab'.")
            elif "vim" in edit_command and ("fstab" in edit_command or "/etc/fstab" in edit_command):
                print("Correct! You're now editing the fstab file.")
                break
            else:
                print("Incorrect. " + hint)
    except KeyboardInterrupt:
        print("\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        print("An error occurred:", e)
        return False
