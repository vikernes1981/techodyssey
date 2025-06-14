import sys
import os

# Add backend/ to sys.path so slow_validInput.py can be found
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

import slow_validInput


def add_group():
    """
    Function to add a group on Red Hat Linux.
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Add Group on Red Hat Linux\n\n")
        slow_validInput.print_slow(
            "Upon your arrival on the planet Managius-Permissius, you are immediately tasked with an important mission: to add a new group to the planetary system.")
        slow_validInput.print_slow(
            "Groups play a crucial role in managing permissions and access control, and your expertise is needed to ensure the smooth operation of the planet's data infrastructure.\n")
        slow_validInput.print_slow(
            "You begin by carefully assessing the requirements for the new group, considering factors such as its purpose, membership, and access privileges.\n")
        slow_validInput.print_slow(
            "With meticulous planning and attention to detail, you define the parameters for the new group and prepare to integrate it into the planetary system.\n")
        slow_validInput.print_slow(
            "Using your cybernetic tools and administrative utilities, you initiate the process of adding the new group, ensuring that all necessary configurations are in place.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input(
                "Type the command to add a group named 'team' with GID 40000: ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "groupadd -g 40000 team":
                slow_validInput.print_slow(
                    "Group 'team' added successfully with GID 40000!")
                slow_validInput.print_slow("\nAdditional Options:")
                slow_validInput.print_slow(
                    "- '-g GID, --gid GID': Specify the numerical GID for the new group. By default, the next available GID is used.")
                slow_validInput.print_slow(
                    "- '-r, --system': Create a system group. System groups typically have GIDs below 1000.")
                slow_validInput.print_slow(
                    "- '-f, --force': Force the creation of the group, even if the specified GID already exists.")
                slow_validInput.print_slow(
                    "- '-K, --key KEY=VALUE': Set an extended attribute key and value for the group.")
                slow_validInput.print_slow(
                    "- '-o, --non-unique': Allow the creation of a group with a non-unique GID.")
                slow_validInput.print_slow(
                    "\nGroup 'team' is created for collaborative work. You can specify additional options to customize group creation.")
                slow_validInput.print_slow(
                    "\nGroup ID (GID) is a unique numerical identifier assigned to each group on a Linux system.")
                slow_validInput.print_slow(
                    "It is used to control access to resources and define group permissions.")
                return True

            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow(
                    "Hint: Use 'groupadd -g 40000 team'")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def create_directory():
    """
    Function to create a directory.
    """
    try:
        slow_validInput.print_slow("\n\nChallenge: Create Directory\n\n")
        slow_validInput.print_slow(
            "As you settle into your role on the planet Managius-Permissius, you are tasked with creating directories to organize and manage the vast amounts of data.")
        slow_validInput.print_slow(
            "Directories serve as the backbone of the planetary data infrastructure, providing structure and order to the ever-expanding repositories of information.\n")
        slow_validInput.print_slow(
            "You begin by identifying key areas where directories are needed, considering factors such as data type, access requirements, and organizational hierarchy.\n")
        slow_validInput.print_slow(
            "With your cybernetic tools and administrative utilities, you initiate the process of creating directories, carefully specifying their names, locations, and permissions.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input(
                "Type the command to create a directory in /home, named 'shared' : ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "mkdir /home/shared":
                slow_validInput.print_slow(
                    "Directory '/home/shared' created successfully!")
                slow_validInput.print_slow("\nAdditional Options:")
                slow_validInput.print_slow(
                    "- '-p, --parents': Create parent directories as needed. If '/home' already exists, this option will not cause an error.")
                slow_validInput.print_slow(
                    "- '-m MODE, --mode=MODE': Set the file mode (permissions) of the created directory. The default mode is 0777 (octal).")
                slow_validInput.print_slow(
                    "- '-v, --verbose': Display a message for each directory created.")
                slow_validInput.print_slow(
                    "\nDirectory '/home/shared' is created for collaborative work. You can specify additional options to customize directory creation.")
                return True

            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow("Hint: Use 'mkdir /home/shared'")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def change_ownership():
    """
    Function to change ownership of a directory.
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Change Ownership of Directory\n\n")
        slow_validInput.print_slow(
            "As you delve deeper into your responsibilities on the planet Managius-Permissius, you encounter the need to change ownership of certain files and directories.")
        slow_validInput.print_slow(
            "Ownership plays a crucial role in access control and data management, and your expertise is required to ensure proper governance of the planetary data ecosystem.\n")
        slow_validInput.print_slow(
            "You begin by identifying the files and directories for which ownership needs to be changed, considering factors such as data sensitivity and organizational structure.\n")
        slow_validInput.print_slow(
            "With your cybernetic tools and administrative utilities, you initiate the process of changing ownership, carefully specifying the new owners and their respective permissions.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input(
                "Type the command to change ownership of /home/shared.Owner is 'nobody' and group is 'team' : ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "chown nobody:team /home/shared":
                slow_validInput.print_slow(
                    "Ownership of the directory changed successfully!")
                slow_validInput.print_slow("\nAdditional Options:")
                slow_validInput.print_slow(
                    "- '-R, --recursive': Recursively change ownership of directories and their contents.")
                slow_validInput.print_slow(
                    "- '-v, --verbose': Display a message for each directory whose ownership is changed.")
                slow_validInput.print_slow(
                    "\nOwnership of the directory is changed to grant new privileges. You can specify additional options for recursive changes or verbose output.")
                slow_validInput.print_slow("\nExplanation:")
                slow_validInput.print_slow(
                    "- 'chown': Command to change ownership of a file or directory.")
                slow_validInput.print_slow(
                    "- 'nobody:team': The new owner and group of the directory. 'nobody' represents the user and 'team' represents the group.")
                slow_validInput.print_slow(
                    "- '/home/shared': Path of the directory whose ownership is being changed.")
                slow_validInput.print_slow(
                    "\nThe 'chown' command is used to change the owner and group of files or directories in Linux.")
                slow_validInput.print_slow(
                    "In this example, the ownership of the directory '/home/shared' is changed to 'nobody' user and 'team' group.")
                return True

            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow(
                    "Hint: Use 'chown nobody:team /home/shared'")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def change_permissions():
    """
    Function to change permissions of a directory.
    Symbolic way
    Maybe add Numerical way too...
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Change Permissions of Directory\n\n")
        slow_validInput.print_slow(
            "As your journey on the planet Managius-Permissius progresses, you encounter the need to adjust permissions on various files and directories.")
        slow_validInput.print_slow(
            "Permissions are essential for controlling access to data and ensuring the security and integrity of the planetary data infrastructure.\n")
        slow_validInput.print_slow(
            "You carefully assess the permissions of each file and directory, considering factors such as data sensitivity and user requirements.\n")
        slow_validInput.print_slow(
            "With your cybernetic tools and administrative utilities, you initiate the process of changing permissions, adjusting settings to reflect the evolving needs of the planetary system.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input(
                "Type the command to change permissions of a directory.User should be able to read/write/execute, group read/write, others shouldn't be able to do anything : ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() in ["chmod u+rwx g+rw o-rwx"]:
                slow_validInput.print_slow(
                    "Permissions of the directory changed successfully!")
                slow_validInput.print_slow("\nExplanation:")
                slow_validInput.print_slow(
                    "- 'chmod': Command to change permissions of a file or directory.")
                slow_validInput.print_slow(
                    "- '/home/shared': Path of the directory whose permissions are being changed.")
                slow_validInput.print_slow(
                    "\nThe 'chmod' command is used to change permissions of files and directories in Linux.")
                slow_validInput.print_slow(
                    "In these examples, the permissions of the directory '/home/shared' are changed as follows:")
                slow_validInput.print_slow(
                    "- 'o+t': Sets the sticky bit on the directory, allowing only the file owner, directory owner, or root user to delete files within.")
                slow_validInput.print_slow(
                    "- 'g+s': Sets the SGID (Set Group ID) bit on the directory, ensuring files created within inherit the group ownership of the directory.")
                slow_validInput.print_slow(
                    "- 'u+s': Sets the SUID (Set User ID) bit on the directory, enabling users to execute files within the directory with the permissions of the file owner.")
                slow_validInput.print_slow("\nAnalytic Explanations:")
                slow_validInput.print_slow(
                    "- 'o+t': The sticky bit restricts file deletion to the file owner, directory owner, or root user. Example: When the sticky bit is set on '/tmp', users can only delete files they own within that directory.")
                slow_validInput.print_slow(
                    "- 'g+s': SGID ensures that files created within inherit the group ownership of the directory. Example: When SGID is set on a directory owned by 'team' group, files created within that directory will automatically have 'team' as their group owner.")
                slow_validInput.print_slow(
                    "- 'u+s': SUID allows users to execute files within the directory with the permissions of the file owner. Example: When SUID is set on a directory and a user executes a file within that directory, the process runs with the same permissions as the file owner, not the user executing the file.")
                slow_validInput.print_slow(
                    "- 'u+rwx': Granting read, write, and execute permissions to the owner ('u') allows the owner of the directory to read, write, and execute files within it.")
                slow_validInput.print_slow(
                    "- 'g+rwx': Granting read, write, and execute permissions to the group ('g') allows members of the group to read, write, and execute files within the directory.")
                slow_validInput.print_slow(
                    "- 'o+rwx': Granting read, write, and execute permissions to others ('o') allows non-group users to read, write, and execute files within the directory.")
                slow_validInput.print_slow(
                    "-  The '+' means that we are ADDING permissions and '-' means we are REVOKING permissions.")
                return True

            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow("Hint: Use 'chmod u+rwx g+rw o-rwx")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def add_user():
    """
    Function to add a user.
    """
    try:
        slow_validInput.print_slow("\n\nChallenge: Add User\n\n")
        slow_validInput.print_slow(
            "As you navigate the complexities of data management on the planet Managius-Permissius, you encounter the need to add new users to the system.")
        slow_validInput.print_slow(
            "Users are the lifeblood of the planetary data infrastructure, each playing a vital role in the collaborative efforts to advance knowledge and innovation.\n")
        slow_validInput.print_slow(
            "You begin by assessing the requirements for the new users, considering factors such as their roles, responsibilities, and access privileges.\n")
        slow_validInput.print_slow(
            "With your cybernetic tools and administrative utilities, you initiate the process of adding users, carefully configuring their accounts to align with planetary policies and security protocols.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input("Type the command to add user1: ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "useradd user1":
                slow_validInput.print_slow("User 'user1' added successfully!")
                slow_validInput.print_slow("\nExplanation:")
                slow_validInput.print_slow(
                    "- 'useradd': Command to add a new user.")
                slow_validInput.print_slow(
                    "- 'user1': Username of the user being added.")
                slow_validInput.print_slow(
                    "\nThe 'useradd' command is used to create a new user account in Linux.")
                slow_validInput.print_slow(
                    "In this example, the user 'user1' is added to the system.")
                slow_validInput.print_slow("\nExample 1:")
                slow_validInput.print_slow("useradd -m -s /bin/bash user2")
                slow_validInput.print_slow(
                    "- '-m': Create the user's home directory if it does not exist.")
                slow_validInput.print_slow(
                    "- '-s /bin/bash': Set the user's login shell to '/bin/bash'.")
                slow_validInput.print_slow(
                    "- 'user2': Username of the user being added.")
                slow_validInput.print_slow(
                    "\nThe 'useradd' command is used to create a new user account in Linux.")
                slow_validInput.print_slow(
                    "In this example, the user 'user2' is added with a home directory and a specific login shell.")
                slow_validInput.print_slow("\nExample 2:")
                slow_validInput.print_slow("useradd -g group1 user3")
                slow_validInput.print_slow(
                    "- '-g group1': Add the user to the 'group1' group.")
                slow_validInput.print_slow(
                    "- 'user3': Username of the user being added.")
                slow_validInput.print_slow(
                    "\nThe 'useradd' command is used to create a new user account in Linux.")
                slow_validInput.print_slow(
                    "In this example, the user 'user3' is added to the system and assigned to the 'group1' group.")
                slow_validInput.print_slow("\nExample 3:")
                slow_validInput.print_slow("useradd -p password123 user4")
                slow_validInput.print_slow(
                    "- '-p password123': Set the user's password to 'password123'.")
                slow_validInput.print_slow(
                    "- 'user4': Username of the user being added.")
                slow_validInput.print_slow(
                    "\nThe 'useradd' command is used to create a new user account in Linux.")
                slow_validInput.print_slow(
                    "In this example, the user 'user4' is added to the system with the password 'password123'.")
                return True
            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow("Hint: Use 'useradd user1'")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def modify_user():
    """
    Function to modify a user.
    """
    try:
        slow_validInput.print_slow("\n\nChallenge: Modify User\n\n")
        slow_validInput.print_slow(
            "As your journey on the planet Managius-Permissius unfolds, you encounter the need to modify existing user accounts.")
        slow_validInput.print_slow(
            "User accounts are dynamic entities, requiring occasional adjustments to accommodate changes in roles, responsibilities, and access requirements.\n")
        slow_validInput.print_slow(
            "You carefully review the attributes of each user account, considering factors such as their current roles, permissions, and organizational affiliations.\n")
        slow_validInput.print_slow(
            "With your cybernetic tools and administrative utilities, you initiate the process of modifying user accounts, making adjustments to reflect the evolving needs of the planetary system.\n")

        slow_validInput.print_slow(
            "Remember to use 'quit' or 'q' to exit at any time.\n")

        while True:
            user_input = input(
                "Type the command to modify user1.User1 should be on his group and on group1 : ")

            if user_input.strip().lower() in ['quit', 'q']:
                slow_validInput.print_slow("Exiting the task. Farewell!")
                return False

            if user_input.strip() == "usermod -aG group1 user1":
                slow_validInput.print_slow(
                    "User 'user1' modified successfully!")
                slow_validInput.print_slow("\nExplanation:")
                slow_validInput.print_slow(
                    "- 'usermod': Command to modify an existing user.")
                slow_validInput.print_slow(
                    "- '-aG group1': Add the user to the 'group2' group.")
                slow_validInput.print_slow(
                    "- 'user1': Username of the user being modified.")
                slow_validInput.print_slow(
                    "\nThe 'usermod' command is used to modify user account settings in Linux.")
                slow_validInput.print_slow(
                    "In this example, the user 'user1' is added to the 'group2' group.")
                slow_validInput.print_slow("\nExample 1:")
                slow_validInput.print_slow("usermod -c 'New User' user1")
                slow_validInput.print_slow(
                    "- '-c 'New User'': Set the user's comment to 'New User'.")
                slow_validInput.print_slow(
                    "- 'user1': Username of the user being modified.")
                slow_validInput.print_slow(
                    "In this example, the user's comment for 'user1' is updated to 'New User'.")
                slow_validInput.print_slow("\nExample 2:")
                slow_validInput.print_slow("usermod -L user2")
                slow_validInput.print_slow("- '-L': Lock the user account.")
                slow_validInput.print_slow(
                    "- 'user2': Username of the user being modified.")
                slow_validInput.print_slow(
                    "In this example, the account for 'user2' is locked.")
                return True
            else:
                slow_validInput.print_slow(
                    "Incorrect command. Please try again or type 'quit' to exit.")
                slow_validInput.print_slow(
                    "Hint: Use 'usermod -aG group1 user1'")
                continue
    except KeyboardInterrupt:
        slow_validInput.print_slow(
            "\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
        return False
    except Exception as e:
        slow_validInput.print_slow("An error occurred:", e)
        return False


def validate_shared_folder_cmd(user_input):
    if user_input.strip() == "mkdir /home/shared":
        return {
            "valid": True,
            "hint": "Correct! You've created the shared directory.",
            "chapter": 2
        }
    else:
        return {
            "valid": False,
            "hint": "Try again. You need to create a shared folder in /home.",
            "chapter": 2
        }

