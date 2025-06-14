import slow_validInput


def vdo_write_modes():
    """
    Function to provide information about VDO write modes.
    """
    try:
        slow_validInput.print_slow(
            "Upon landing on VDO-351-xy, you are tasked with optimizing the VDO write modes for maximum performance.")
        slow_validInput.print_slow(
            "The VDO write modes determine how data is written to the underlying storage, balancing performance and data integrity.\n")
        slow_validInput.print_slow(
            "You analyze the workload characteristics and system requirements to choose the appropriate write modes.")
        slow_validInput.print_slow(
            "For high-performance applications, you opt for write-through mode to ensure minimal latency and maximum throughput.\n")
        slow_validInput.print_slow(
            "For data-intensive tasks requiring data integrity guarantees, you select write-around mode to bypass caching for critical writes.")
        slow_validInput.print_slow(
            "This ensures that important data is written directly to storage without impacting performance.\n")

        slow_validInput.print_slow("VDO Write Modes:")
        slow_validInput.print_slow("1. Sync Mode:")
        slow_validInput.print_slow(
            "   - In sync mode, writes to the VDO device are acknowledged only when the underlying storage")
        slow_validInput.print_slow(
            "     has permanently written the data. This mode prioritizes data integrity over performance.")
        slow_validInput.print_slow("2. Async Mode:")
        slow_validInput.print_slow(
            "   - In async mode, writes are acknowledged before being written to persistent storage.")
        slow_validInput.print_slow(
            "     VDO obeys flush requests from layers above, making it safe for use with storage devices")
        slow_validInput.print_slow(
            "     that report writes as 'done' without guaranteeing actual persistence.")
        slow_validInput.print_slow("3. Auto Mode (Default):")
        slow_validInput.print_slow(
            "   - The auto mode selects async or sync write policy dynamically based on the capabilities")
        slow_validInput.print_slow(
            "     of the underlying storage. This mode offers a balance between performance and data integrity.")
        return True

    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def remove_vdo():
    """
    Function to remove a VDO (Virtual Data Optimizer) volume.
    """
    try:
        slow_validInput.print_slow(
            "Upon landing on VDO-351-xy, you review the existing VDO volumes to optimize resource allocation.")
        slow_validInput.print_slow(
            "During the analysis, you identify obsolete volumes that are no longer needed for data storage.\n")
        slow_validInput.print_slow(
            "With precision and caution, you initiate the removal process for the obsolete VDO volumes.")
        slow_validInput.print_slow(
            "Each volume is carefully decommissioned, ensuring that data is migrated or backed up to prevent loss.\n")
        slow_validInput.print_slow(
            "As the removal process progresses, you encounter challenges such as data integrity checks and system dependencies.")
        slow_validInput.print_slow(
            "But with your expertise and meticulous approach, you overcome each obstacle with ease.\n")

        slow_validInput.print_slow(
            "Remember, you can exit at any time by typing 'quit' or 'q'.\n")

        while True:
            user_input = input("Type the command to remove a VDO volume: ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "vdo remove --name=vdo1":
                slow_validInput.print_slow("VDO volume removed successfully!")
                slow_validInput.print_slow("\nAdditional Information:")
                slow_validInput.print_slow(
                    "The 'vdo remove' command removes the specified VDO volume from the system,")
                slow_validInput.print_slow(
                    "freeing up its resources for other purposes.")
                slow_validInput.print_slow("\nOther Options:")
                slow_validInput.print_slow(
                    "- '--name': Specifies the name of the VDO volume to remove.")
                return True
            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow(
                    "Hint: Use 'vdo remove --name=vdo1'")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def list_vdo():
    """
    Function to list VDO (Virtual Data Optimizer) volumes.
    """
    try:
        slow_validInput.print_slow("List VDO volumes.")
        slow_validInput.print_slow(
            "Upon landing on VDO-351-xy, you access the planet's data management interface to view the existing VDO volumes.")
        slow_validInput.print_slow(
            "The interface displays a comprehensive list of volumes, each with its unique identifier, capacity, and status.\n")
        slow_validInput.print_slow(
            "You review the list, analyzing the characteristics of each volume to gain insights into the planet's data infrastructure.")
        slow_validInput.print_slow(
            "Some volumes are dedicated to critical system operations, while others serve as repositories for user data and applications.\n")
        slow_validInput.print_slow(
            "As you delve deeper into the list, you uncover valuable information about the planet's data optimization strategies and resource utilization.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input("Type the command to list VDO volumes: ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "vdo list":
                slow_validInput.print_slow("Listing VDO volumes...")
                slow_validInput.print_slow("\nOutput Example:")
                slow_validInput.print_slow(
                    "  VG     Attr   WSize   RSize  Used   Used%   VDO")
                slow_validInput.print_slow(
                    "  vdo1   wz--n-  20.00g  10.00g  1.50g  7.5%    /dev/sdc1")
                slow_validInput.print_slow(
                    "  vdo2   wz--n-  40.00g  20.00g  3.00g  7.5%    /dev/sdd1")
                slow_validInput.print_slow("\nAdditional Information:")
                slow_validInput.print_slow(
                    "- 'vdo list': Command to list VDO volumes")
                slow_validInput.print_slow(
                    "- '--all': Displays information about all VDO volumes, including those not in use")
                slow_validInput.print_slow(
                    "- '--verbose': Provides detailed information about each VDO volume")
                slow_validInput.print_slow(
                    "- '--json': Outputs information in JSON format for scripting or automated processing")
                return True
            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                # ADD HINT
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def install_vdo():
    """
    Install VDO (Virtual Data Optimizer) and kmod-kvdo.
    """
    try:
        slow_validInput.print_slow("\n\nInstall VDO and kmod-kvdo:\n\n")
        slow_validInput.print_slow(
            "Upon landing on VDO-351-xy, you are greeted by a bustling hub of cybernetic activity.")
        slow_validInput.print_slow(
            "Engineers and technicians work tirelessly to maintain and expand the planet's vast network of VDO systems.")
        slow_validInput.print_slow(
            "Your mission here is to install new VDO systems and integrate them seamlessly into the existing infrastructure.\n")
        slow_validInput.print_slow(
            "You begin by selecting optimal locations for the new VDO installations, considering factors such as data accessibility and network connectivity.")
        slow_validInput.print_slow(
            "Once the locations are chosen, you deploy specialized drones to assemble and configure the VDO hardware.\n")
        slow_validInput.print_slow(
            "As the installations progress, you encounter challenges such as power fluctuations and compatibility issues.")
        slow_validInput.print_slow(
            "But with your expertise and problem-solving skills, you overcome each obstacle with ease.\n")

        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        correct_command = "dnf install -y vdo kmod-kvdo"
        quit_commands = ["quit", "q"]

        while True:
            user_command = input(
                "Enter the command to install VDO and kmod-kvdo (type 'quit' or 'q' to exit): ")
            if user_command.strip() in quit_commands:
                print("Exiting the task. Farewell!")
                return False

            if user_command.strip() == correct_command:
                slow_validInput.print_slow(
                    "The command resonates with power as you utter it aloud, invoking the installation process.")
                slow_validInput.print_slow(
                    "Mystical energies swirl around you as VDO and kmod-kvdo are installed, their arcane capabilities now at your command.\n")
                slow_validInput.print_slow(
                    "VDO and kmod-kvdo installed successfully!\n")
                slow_validInput.print_slow("Output Example:")
                slow_validInput.print_slow("  Installed:\n"
                                           "    kmod-kvdo.x86_64 0:7.7.3-11.el8\n"
                                           "    vdo.x86_64 0:7.7.3-11.el8\n")
                return True
            else:
                print("Incorrect command. Try again.")
                print(
                    "Hint: Use 'dnf install -y vdo kmod-kvdo' to install VDO and kmod-kvdo.")
                continue
    except KeyboardInterrupt:
        print("\nExiting the task due to user interruption (Ctrl+C). Farewell!")
        return False
    except Exception as e:
        print("An error occurred:", e)
        return False


def expand_vdo():
    """
    Function to expand a VDO (Virtual Data Optimizer) volume.
    """
    try:
        slow_validInput.print_slow(
            "Upon landing on VDO-351-xy, you are greeted by a team of engineers eager to assist you in your mission.")
        slow_validInput.print_slow(
            "Your task here is to expand the existing VDO volumes, increasing their capacity to accommodate growing data demands.\n")
        slow_validInput.print_slow(
            "You assess the current usage and performance metrics of the VDO volumes, identifying opportunities for expansion.")
        slow_validInput.print_slow(
            "Using advanced cybernetic tools, you initiate the expansion process, seamlessly integrating additional resources into the volumes.\n")
        slow_validInput.print_slow(
            "As the volumes expand, you monitor their progress, ensuring that data optimization algorithms adjust accordingly.")
        slow_validInput.print_slow(
            "The expansion process is a delicate balance of resource allocation and data management, requiring careful attention to detail.\n")

        slow_validInput.print_slow(
            "Remember, you can exit at any time by typing 'quit' or 'q'.\n")

        while True:
            user_input = input("Type the command to expand a VDO volume: ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "vdo growfs /dev/mapper/vdo1":
                slow_validInput.print_slow("VDO volume expanded successfully!")
                slow_validInput.print_slow("\nAdditional Information:")
                slow_validInput.print_slow(
                    "The 'vdo growfs' command expands the filesystem of a VDO volume")
                slow_validInput.print_slow(
                    "to utilize the entire logical size previously set during its creation.")
                slow_validInput.print_slow(
                    "This operation dynamically adjusts the filesystem to utilize all available space.")
                return True
            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow(
                    "Hint: Use 'vdo growfs /dev/mapper/vdo1'")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False
