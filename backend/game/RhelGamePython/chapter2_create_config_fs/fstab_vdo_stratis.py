import slow_validInput


def add_vdo_fstab():
    """
    Function to add a VDO (Virtual Data Optimizer) volume to /etc/fstab for automatic mounting.
    """
    try:
        slow_validInput.print_slow(
            "Upon landing on VDO-351-xy, you are tasked with integrating a newly created VDO volume into the planet's system.")
        slow_validInput.print_slow(
            "To ensure seamless access to the volume, you must add it to the /etc/fstab file, which manages filesystem mounts.\n")
        slow_validInput.print_slow(
            "You carefully edit the /etc/fstab file, adding an entry for the VDO volume along with the necessary parameters.")
        slow_validInput.print_slow(
            "Each parameter is chosen with precision, optimizing performance and reliability for the mounted volume.\n")
        slow_validInput.print_slow(
            "Once the entry is added, you save the changes to the /etc/fstab file and initiate a system reboot to apply the configuration.")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input(
                "Type the command to add a VDO volume to /etc/fstab: ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "echo '/dev/mapper/vdo1 /mnt/vdo xfs defaults,x-systemd.requires=vdo.service 0 0' >> /etc/fstab":
                slow_validInput.print_slow(
                    "VDO volume added to /etc/fstab successfully!")
                slow_validInput.print_slow("\nOutput Example:")
                slow_validInput.print_slow(
                    "  /dev/mapper/vdo1 /mnt/vdo xfs defaults,x-systemd.requires=vdo.service 0 0")
                slow_validInput.print_slow("\nAdditional Information:")
                slow_validInput.print_slow(
                    "- '/dev/mapper/vdo1': Path to the VDO volume device mapper")
                slow_validInput.print_slow(
                    "- '/mnt/vdo': Mount point for the VDO volume")
                slow_validInput.print_slow("- 'xfs': Filesystem type")
                slow_validInput.print_slow(
                    "- 'defaults,x-systemd.requires=vdo.service': Default mount options with systemd requirement")
                slow_validInput.print_slow(
                    "- '0 0': Filesystem check and backup options")
                return True
            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow(
                    "Hint: echo '/dev/mapper/vdo1 /mnt/vdo xfs defaults,x-systemd.requires=vdo.service 0 0' >> /etc/fstab")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def add_stratis_fstab():
    """
    Function to add a Stratis filesystem to /etc/fstab for automatic mounting.
    """
    try:
        slow_validInput.print_slow(
            "To ensure seamless access to your Stratis filesystem, you decide to configure it for auto-mounting.")
        slow_validInput.print_slow(
            "You open the /etc/fstab file, the configuration file used by the system to automatically mount filesystems at boot.\n")
        slow_validInput.print_slow(
            "With careful consideration, you add an entry for the Stratis pool, specifying its unique identifier and mount point.")
        slow_validInput.print_slow(
            "You include options for automatic mounting and error handling, ensuring robustness and reliability.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input(
                "Type the command to add a Stratis filesystem to /etc/fstab: ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "echo 'stratispool /mnt/stratis xfs defaults,x-systemd.requires=stratisd.service 0 0' >> /etc/fstab":
                slow_validInput.print_slow(
                    "Stratis filesystem added to /etc/fstab successfully!")
                slow_validInput.print_slow("\nOutput Example:")
                slow_validInput.print_slow(
                    "  stratispool-mnt /mnt/stratis xfs defaults 0 0")
                slow_validInput.print_slow("\nAdditional Information:")
                slow_validInput.print_slow(
                    "- 'stratispool-mnt': Mount point for the Stratis filesystem")
                slow_validInput.print_slow(
                    "- '/mnt/stratis': Mount point for the Stratis filesystem")
                slow_validInput.print_slow("- 'xfs': Filesystem type")
                slow_validInput.print_slow(
                    "- 'defaults': Default mount options")
                slow_validInput.print_slow(
                    "-  'x-systemd.requires=vdo.service': Default mount options with systemd requirement")
                slow_validInput.print_slow(
                    "- '0 0': Filesystem check and backup options")
                return True
            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow(
                    "Hint: echo 'stratispool /mnt/stratis xfs defaults,x-systemd.requires=stratisd.service 0 0' >> /etc/fstab")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False
