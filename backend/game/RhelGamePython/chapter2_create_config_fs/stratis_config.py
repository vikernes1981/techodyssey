import slow_validInput


def install_stratis():
    """
    Install Stratis, enable stratisd, and perform filesystem wipefs.
    """
    try:
        slow_validInput.print_slow(
            "\n\nInstalling Stratis Storage Management:\n\n")
        slow_validInput.print_slow(
            "Welcome to the Stratis installation process.")
        slow_validInput.print_slow(
            "As your starship lands on Stratis, you immediately begin the installation process for your base of operations.")
        slow_validInput.print_slow(
            "The planet's rugged terrain presents challenges, but your expertise allows you to find an optimal location.")
        slow_validInput.print_slow(
            "You deploy automated drones to assist with construction, their mechanical arms whirring as they assemble structures.")
        slow_validInput.print_slow(
            "The base begins to take shape, with power generators humming and communication arrays extending towards the sky.\n")
        slow_validInput.print_slow(
            "However, as the installation progresses, you encounter unexpected obstacles.")
        slow_validInput.print_slow(
            "Storms lash out from the horizon, threatening to damage your equipment.")
        slow_validInput.print_slow(
            "Additionally, strange energy readings disrupt your systems, hinting at hidden phenomena on Stratis.\n")
        slow_validInput.print_slow(
            "Despite these challenges, your determination drives you forward.")
        slow_validInput.print_slow(
            "You implement safeguards and optimizations, ensuring the stability and efficiency of your installation.")

        slow_validInput.print_slow("Let us begin the installation:\n")
        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        correct_commands = [
            "dnf install -y stratis-cli stratisd",  # Installs Stratis packages
            "systemctl enable --now stratisd",  # Enables and starts Stratis daemon
            "wipefs -a /dev/sda",  # Erases filesystem signatures on /dev/sda
        ]
        to_do = [
            "Install Stratis packages",
            "Enable and start Stratis daemon",
            "Erase filesystem signatures on /dev/sda",
        ]
        quit_commands = ["quit", "q"]
        index = 0
        slow_validInput.print_slow(
            "There are 3 commands you must give in the correct order!")
        while index < len(correct_commands):
            user_command = input(
                f"{to_do[index]}. Enter the command: '{index + 1}' (type 'quit' or 'q' to exit): ")
            if user_command.strip().lower() in quit_commands:
                slow_validInput.print_slow(
                    "Exiting the installation. Farewell!")
                return False

            if user_command.strip() == correct_commands[index]:
                slow_validInput.print_slow("Executing the command...")
                # Here you can execute the command using subprocess or other methods
                slow_validInput.print_slow(
                    f"Command '{correct_commands[index]}' executed successfully!\n")
                # slow_validInput.print_slow explanations for each command
                explanations = [
                    "Installs Stratis packages (stratis-cli and stratisd).",
                    "Enables and starts Stratis daemon.",
                    "Erases filesystem signatures on /dev/sda.",
                ]
                slow_validInput.print_slow(
                    f"Explanation: {explanations[index]}\n")

                if index == 0:
                    slow_validInput.print_slow(
                        "The command resonates with power as you utter it aloud, invoking the installation process.")
                    slow_validInput.print_slow(
                        "Mystical energies swirl around you as Stratis packages are installed, their arcane capabilities now at your command.\n")
                    slow_validInput.print_slow(
                        "Stratis installed successfully!\n")
                    slow_validInput.print_slow("Output Example:")
                    slow_validInput.print_slow("  Installed:\n"
                                               "    stratis-cli.x86_64 0:2.4.3-1.el8\n"
                                               "    stratisd.x86_64 0:2.4.3-1.el8\n")
                index += 1
            else:
                slow_validInput.print_slow("Incorrect command. Try again.")
                slow_validInput.print_slow(
                    f"Hint: Use '{correct_commands[index]}' to proceed.")
                continue

        slow_validInput.print_slow(
            "Stratis installation completed successfully!\n")
        return True

    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the installation due to user interruption (Ctrl+C). Farewell!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def create_stratis_snapshot():
    """
    Create a Stratis filesystem snapshot and perform related commands.
    """
    try:
        slow_validInput.print_slow(
            "\n\nCreating Stratis Filesystem Snapshot:\n\n")
        slow_validInput.print_slow(
            "Welcome to the Stratis filesystem snapshot creation process.")
        slow_validInput.print_slow(
            "As you explore the rugged landscape of Stratis, you come across a peculiar technology known as 'Stratis Snapshots.'")
        slow_validInput.print_slow(
            "These snapshots are remnants of past events, frozen in time by unknown forces.")
        slow_validInput.print_slow(
            "Interacting with a snapshot allows you to glimpse into the past and uncover valuable information.\n")
        slow_validInput.print_slow(
            "You encounter your first snapshot near a rocky outcrop, its shimmering form pulsating with ethereal energy.")
        slow_validInput.print_slow(
            "Approaching cautiously, you reach out and touch the snapshot, causing the scene to unfold before you.\n")
        slow_validInput.print_slow(
            "In the snapshot, you witness a group of explorers facing off against a ferocious native creature.")
        slow_validInput.print_slow(
            "Their weapons blaze with energy as they struggle to fend off the relentless assault.")
        slow_validInput.print_slow(
            "Suddenly, a burst of lightning illuminates the sky, freezing the combatants in time.\n")

        slow_validInput.print_slow(
            "Let us begin the snapshot creation process:\n")
        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        correct_commands = [
            # Creates a snapshot of the 'myfs' filesystem in the 'mypool' pool
            "stratis fs snapshot mypool myfs",
            "stratis fs list mypool",  # Lists all Stratis filesystems within the 'mypool' pool
            # Destroys the specified snapshot of 'myfs' filesystem in 'mypool' pool
            "stratis fs destroy-snapshot mypool myfs snapshot1",
        ]
        to_do = [
            "Create a snapshot of the 'myfs' filesystem in the 'mypool' pool",
            "List all Stratis filesystems within the 'mypool' pool",
            "Destroy the specified snapshot1 of 'myfs' filesystem in 'mypool' pool"
        ]
        quit_commands = ["quit", "q"]
        index = 0
        slow_validInput.print_slow(
            "There are 3 commands you must give in the correct order!")
        while index < len(correct_commands):
            user_command = input(
                f"{to_do[index]}. Enter the command: '{index + 1}' (type 'quit' or 'q' to exit): ")
            if user_command.strip().lower() in quit_commands:
                slow_validInput.print_slow("Exiting the process. Farewell!")
                return False

            if user_command.strip() == correct_commands[index]:
                slow_validInput.print_slow("Executing the command...")
                # Here you can execute the command using subprocess or other methods
                slow_validInput.print_slow(
                    f"Command '{correct_commands[index]}' executed successfully!\n")
                # slow_validInput.print_slow explanations for each command
                explanations = [
                    "Creates a snapshot of the 'myfs' filesystem in the 'mypool' pool.",
                    "Lists all Stratis filesystems within the 'mypool' pool.",
                    "Destroys the specified snapshot of 'myfs' filesystem in 'mypool' pool.",
                ]
                slow_validInput.print_slow(
                    f"Explanation: {explanations[index]}\n")
                # Output examples for each command
                if index == 0:
                    slow_validInput.print_slow("Output Example:")
                    slow_validInput.print_slow(
                        "  Created snapshot 'snapshot_name' of filesystem 'myfs' in pool 'mypool'")
                elif index == 1:
                    slow_validInput.print_slow("Output Example:")
                    slow_validInput.print_slow("  Filesystem Name      Used      Total  Quota\n"
                                               "  myfs                2.5 GiB   10 GiB  None")
                elif index == 2:
                    slow_validInput.print_slow("Output Example:")
                    slow_validInput.print_slow(
                        "  Destroyed snapshot 'snapshot_name' of filesystem 'myfs' in pool 'mypool'")
                index += 1
            else:
                slow_validInput.print_slow("Incorrect command. Try again.")
                slow_validInput.print_slow(
                    f"Hint: Use '{correct_commands[index]}' to proceed.")
                continue

        slow_validInput.print_slow(
            "Stratis filesystem snapshot operations completed successfully!\n")
        return True

    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the process due to user interruption (Ctrl+C). Farewell!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False
