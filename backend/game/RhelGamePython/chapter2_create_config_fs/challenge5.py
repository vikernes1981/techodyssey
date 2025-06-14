import slow_validInput
import system_admin


def manage_permissions():
    """
    Challenge: Manage Groups, Directories, Ownership, and systems.
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Manage Groups, Directories, Ownership, and systems\n\n")
        slow_validInput.print_slow(
            "Welcome to the systems management challenge.")
        slow_validInput.print_slow(
            "You have completed your inspection of the XFS filesystems on Ext4-vfat-xfs, ensuring their optimal condition for data storage.\n")
        slow_validInput.print_slow(
            "However, new opportunities and challenges beckon from afar. You receive a transmission notifying you of a pressing need for your expertise on the planet Managius-Permissius.\n")
        slow_validInput.print_slow(
            "Known for its mastery in data management and permissions control, Managius-Permissius offers a new frontier for exploration and advancement in your field.\n")
        slow_validInput.print_slow(
            "With a sense of purpose and anticipation, you bid farewell to the familiar landscapes of Ext4-vfat-xfs and set course for the distant planet.\n")
        slow_validInput.print_slow(
            "As your starship navigates through the vastness of space, you can't help but ponder the mysteries that await you on Managius-Permissius.\n")
        slow_validInput.print_slow(
            "Stepping out onto the alien soil of Managius-Permissius, you are immediately enveloped by the sights and sounds of this vibrant world.\n")
        slow_validInput.print_slow(
            "Your mission on Managius-Permissius is clear: to apply your expertise in data management and permissions control to help advance the planet's technological capabilities.\n")
        slow_validInput.print_slow(
            "With a renewed sense of purpose, you embark on this new chapter of your journey, ready to face whatever challenges come your way.\n")
        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        count = 0
        valid_choices = ['1', '2', '3', '4', '5', '6', '7']

        while True:
            if count == 6:
                break
            print("Options:")
            print("1. Add a group")
            print("2. Create a directory")
            print("3. Change ownership of a file or directory")
            print("4. Change permissions of a file or directory")
            print("5. Add a user to a group")
            print("6. Modify user details")
            print("7. Continue to next challenge\n")

            choice = slow_validInput.get_valid_input(
                "Enter your choice (1-7): ", valid_choices)

            if choice == '1':
                slow_validInput.print_slow(
                    "You add a new group, expanding the realm of user collaboration.")
                if system_admin.add_group() == False:
                    continue
                slow_validInput.print_slow(
                    "As the group is successfully added to the planetary system, you oversee the allocation of permissions and privileges, carefully balancing security with accessibility.\n")
                slow_validInput.print_slow(
                    "With the addition of the new group, the data infrastructure of Managius-Permissius is strengthened, enabling smoother collaboration and data management across the planet.\n")
                slow_validInput.print_slow(
                    "You take pride in your contribution to the advancement of data governance on Managius-Permissius, knowing that your expertise has helped shape the future of the planet's technological landscape.\n")
                slow_validInput.print_slow("Group added successfully!\n")
                count += 1
                continue

            elif choice == '2':
                slow_validInput.print_slow(
                    "You create a new directory, providing a structured environment for data organization.")
                if system_admin.create_directory() == False:
                    continue
                slow_validInput.print_slow(
                    "As each directory is created, you oversee the implementation of access controls and security measures, ensuring that data remains protected and confidential.\n")
                slow_validInput.print_slow(
                    "With the directories in place, the data infrastructure of Managius-Permissius is organized and efficient, enabling seamless data management and collaboration.\n")
                slow_validInput.print_slow(
                    "You take satisfaction in knowing that your efforts have contributed to the smooth operation of the planet's data ecosystem, laying the foundation for future innovation and discovery.\n")
                slow_validInput.print_slow("Directory created successfully!\n")
                count += 1
                continue

            elif choice == '3':
                slow_validInput.print_slow(
                    "You change the ownership of a file or directory, ensuring proper access control.")
                if system_admin.change_ownership() == False:
                    continue
                slow_validInput.print_slow(
                    "As ownership is transferred, you verify that the necessary access controls are in place, ensuring that data remains secure and confidential.\n")
                slow_validInput.print_slow(
                    "With each successful ownership change, you contribute to the effective management of the planetary data infrastructure, promoting collaboration and efficiency.\n")
                slow_validInput.print_slow(
                    "You take pride in your role as a guardian of data integrity on Managius-Permissius, knowing that your actions help uphold the principles of security and accountability.\n")
                slow_validInput.print_slow("Ownership changed successfully!\n")
                count += 1
                continue

            elif choice == '4':
                slow_validInput.print_slow(
                    "You change the systems of a file or directory, fine-tuning access privileges.")
                if system_admin.change_permissions() == False:
                    continue
                slow_validInput.print_slow(
                    "As permissions are modified, you verify that the changes align with security policies and access controls, preventing unauthorized access and data breaches.\n")
                slow_validInput.print_slow(
                    "With each successful permission change, you contribute to the robustness of the planetary data ecosystem, promoting transparency and accountability.\n")
                slow_validInput.print_slow(
                    "You take pride in your role as a steward of data governance on Managius-Permissius, knowing that your actions help uphold the principles of privacy and data integrity.\n")
                slow_validInput.print_slow(
                    "permissions changed successfully!\n")
                count += 1
                continue

            elif choice == '5':
                slow_validInput.print_slow(
                    "You add a user to a group, fostering collaboration and teamwork.")
                if system_admin.add_user() == False:
                    continue
                slow_validInput.print_slow(
                    "As user accounts are created, you verify that the necessary access controls and permissions are in place, ensuring that data remains protected and accessible only to authorized individuals.\n")
                slow_validInput.print_slow(
                    "With each successful addition of a new user, you contribute to the diversity and expertise of the planetary data ecosystem, fostering a culture of collaboration and innovation.\n")
                slow_validInput.print_slow(
                    "You take pride in your role as a facilitator of knowledge exchange on Managius-Permissius, knowing that each new user brings unique perspectives and skills to the collective pursuit of discovery.\n")
                slow_validInput.print_slow(
                    "User added to group successfully!\n")
                count += 1
                continue

            elif choice == '6':
                slow_validInput.print_slow(
                    "You modify user details, updating user information and preferences.")
                if system_admin.modify_user() == False:
                    continue
                slow_validInput.print_slow(
                    "As account modifications are implemented, you verify that the changes align with security policies and access controls, ensuring that data remains secure and accessible only to authorized individuals.\n")
                slow_validInput.print_slow(
                    "With each successful modification of a user account, you contribute to the adaptability and resilience of the planetary data ecosystem, empowering users to fulfill their roles effectively.\n")
                slow_validInput.print_slow(
                    "You take pride in your role as a guardian of user integrity on Managius-Permissius, knowing that your actions help maintain the balance between security and usability in the planetary data infrastructure.\n")
                slow_validInput.print_slow(
                    "User details modified successfully!\n")
                count += 1
                continue

            elif choice == '7':
                break

    except KeyboardInterrupt:
        print("\nExiting the task due to user interruption (Ctrl+C). Farewell!")
    except Exception as e:
        print("An error occurred:", e)
