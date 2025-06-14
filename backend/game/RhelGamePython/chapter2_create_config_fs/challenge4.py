import slow_validInput
import create_fs
import inspect_fs
import repair_fs


def manage_filesystems():
    """
    Challenge: Manage Filesystems and Perform Repairs.
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Manage Filesystems and Perform Repairs\n\n")
        slow_validInput.print_slow(
            "After a journey through the depths of space, you finally arrive in orbit around the planet Ext4-vfat-xfs.")
        slow_validInput.print_slow(
            "The planet's surface is a patchwork of landscapes, each representing a different filesystem type: Ext4, VFAT, and XFS.\n")
        slow_validInput.print_slow(
            "As your starship descends through the atmosphere, you catch glimpses of the diverse terrain below: sprawling forests of Ext4, vast plains of VFAT, and towering mountains of XFS.\n")
        slow_validInput.print_slow(
            "Touching down on the planet's surface, you are immediately struck by the sheer diversity of filesystems that surround you.\n")
        slow_validInput.print_slow(
            "Your mission here is to explore these filesystems, understanding their strengths and weaknesses, and harnessing their power to advance cybernetic engineering.\n")
        slow_validInput.print_slow(
            "You begin your exploration by venturing into the Ext4 forests, where files and directories grow like towering trees, rooted in the digital soil of the planet.\n")
        slow_validInput.print_slow(
            "The Ext4 filesystems offer stability and reliability, providing a solid foundation for data storage and retrieval.\n")
        slow_validInput.print_slow(
            "Next, you journey into the VFAT plains, where files roam freely like herds of digital beasts, unencumbered by the complexities of traditional filesystems.\n")
        slow_validInput.print_slow(
            "VFAT filesystems offer compatibility and simplicity, making them ideal for interoperability between different systems and devices.\n")
        slow_validInput.print_slow(
            "Finally, you scale the towering mountains of XFS, where data flows like rivers of information, carving paths through the digital landscape.\n")
        slow_validInput.print_slow(
            "XFS filesystems excel in scalability and performance, capable of handling vast amounts of data with lightning-fast speed.\n")
        slow_validInput.print_slow(
            "As you explore each filesystem, you gain valuable insights and knowledge, honing your skills as a cybernetic engineer.\n")
        slow_validInput.print_slow(
            "With each step, you draw closer to mastering the diverse ecosystems of Ext4-vfat-xfs, unlocking new possibilities for cybernetic innovation.\n")
        slow_validInput.print_slow(
            "Explore the realm of filesystems and wield the power to create, inspect, and repair them.\n")
        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        count = 0
        valid_choices = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

        while True:
            if count == 8:
                break
            print("Options:")
            print("1. Create EXT4 filesystem")
            print("2. Repair EXT4 filesystem")
            print("3. Inspect EXT4 filesystem")
            print("4. Create VFAT filesystem")
            print("5. Repair VFAT filesystem")
            print("6. Create XFS filesystem")
            print("7. Repair XFS filesystem")
            print("8. Get XFS filesystem info")
            print("9. Continue to next challenge\n")

            choice = slow_validInput.get_valid_input(
                "Enter your choice (1-9): ", valid_choices)

            if choice == '1':
                slow_validInput.print_slow(
                    "You create an EXT4 filesystem, balancing performance and reliability.")
                if create_fs.ext4_create() == False:
                    continue
                slow_validInput.print_slow(
                    "As the creation process unfolds, you witness the birth of new Ext4 filesystems, each one a testament to your expertise and skill as a cybernetic engineer.\n")
                slow_validInput.print_slow(
                    "The Ext4 filesystems stand as beacons of stability in the ever-changing digital landscape of Ext4-vfat-xfs, providing a reliable foundation for data storage and retrieval.\n")
                slow_validInput.print_slow(
                    "With the creation of Ext4 filesystems complete, you take a moment to admire your handiwork, knowing that you have contributed to the advancement of cybernetic engineering on the planet.\n")
                slow_validInput.print_slow(
                    "EXT4 filesystem created successfully!\n")
                count += 1
                continue
            elif choice == '2':
                slow_validInput.print_slow(
                    "You repair a corrupted EXT4 filesystem, salvaging valuable data.")
                if repair_fs.repair_ext4() == False:
                    continue
                slow_validInput.print_slow(
                    "With each repaired Ext4 filesystem, you demonstrate your prowess as a cybernetic engineer, capable of overcoming even the most challenging of obstacles.\n")
                slow_validInput.print_slow(
                    "As the repair process concludes, the Ext4 filesystems once again stand strong, their integrity restored and their data preserved.\n")
                slow_validInput.print_slow(
                    "EXT4 filesystem repaired successfully!\n")
                count += 1
                continue
            elif choice == '3':
                slow_validInput.print_slow(
                    "You inspect the properties of an EXT4 filesystem, gaining insights into its structure and layout.")
                if inspect_fs.inspect_ext4() == False:
                    continue
                slow_validInput.print_slow(
                    "As you inspect each Ext4 filesystem, you gain valuable insights into their behavior and characteristics, further enhancing your expertise as a cybernetic engineer.\n")
                slow_validInput.print_slow(
                    "With the inspection complete, you can rest assured knowing that the Ext4 filesystems on Ext4-vfat-xfs are in optimal condition, ready to support the planet's data infrastructure.\n")
                slow_validInput.print_slow(
                    "EXT4 filesystem inspection completed successfully!\n")
                count += 1
                continue
            elif choice == '4':
                slow_validInput.print_slow(
                    "You create a VFAT filesystem, enabling compatibility and versatility.")
                if create_fs.vfat_create() == False:
                    continue
                slow_validInput.print_slow(
                    "As the creation process progresses, you envision a network of VFAT filesystems spanning across Ext4-vfat-xfs, facilitating seamless data exchange and collaboration.\n")
                slow_validInput.print_slow(
                    "With each VFAT filesystem created, you expand the planet's data infrastructure, enhancing its connectivity and interoperability with other systems and devices.\n")
                slow_validInput.print_slow(
                    "The VFAT filesystems serve as bridges between different technologies and platforms, fostering collaboration and innovation in the digital realm.\n")
                slow_validInput.print_slow(
                    "As you complete the creation of VFAT filesystems, you take pride in your contribution to the advancement of cybernetic engineering on Ext4-vfat-xfs.\n")
                slow_validInput.print_slow(
                    "VFAT filesystem created successfully!\n")
                count += 1
                continue
            elif choice == '5':
                slow_validInput.print_slow(
                    "You repair a damaged VFAT filesystem, bringing it back to life.")
                if repair_fs.repair_vfat() == False:
                    continue
                slow_validInput.print_slow(
                    "With each repaired VFAT filesystem, you demonstrate your expertise and dedication to maintaining the stability of Ext4-vfat-xfs's data infrastructure.\n")
                slow_validInput.print_slow(
                    "As the repair process concludes, the VFAT filesystems are once again in working order, their data preserved and accessible to those who rely on them.\n")
                slow_validInput.print_slow(
                    "VFAT filesystem repaired successfully!\n")
                count += 1
                continue
            elif choice == '6':
                slow_validInput.print_slow(
                    "You create an XFS filesystem, embracing scalability and resilience.")
                if create_fs.xfs_create() == False:
                    continue
                slow_validInput.print_slow(
                    "As the creation process unfolds, you envision a network of XFS filesystems spanning across Ext4-vfat-xfs, forming the backbone of the planet's data infrastructure.\n")
                slow_validInput.print_slow(
                    "With each XFS filesystem created, you expand the planet's capacity for data storage and processing, enabling new possibilities for scientific research and technological innovation.\n")
                slow_validInput.print_slow(
                    "The XFS filesystems serve as repositories for knowledge and discovery, fostering collaboration and advancement in cybernetic engineering on Ext4-vfat-xfs.\n")
                slow_validInput.print_slow(
                    "As you complete the creation of XFS filesystems, you take pride in your contribution to the evolution of Ext4-vfat-xfs as a hub of knowledge and innovation.\n")
                slow_validInput.print_slow(
                    "XFS filesystem created successfully!\n")
                count += 1
                continue
            elif choice == '7':
                slow_validInput.print_slow(
                    "You repair a damaged XFS filesystem, restoring data integrity.")
                if repair_fs.repair_xfs_fs() == False:
                    continue
                slow_validInput.print_slow(
                    "With each repaired XFS filesystem, you demonstrate your expertise and dedication to maintaining the stability of Ext4-vfat-xfs's data infrastructure.\n")
                slow_validInput.print_slow(
                    "As the repair process concludes, the XFS filesystems are once again in working order, their data preserved and accessible to those who rely on them.\n")
                slow_validInput.print_slow(
                    "XFS filesystem repaired successfully!\n")
                count += 1
                continue
            elif choice == '8':
                slow_validInput.print_slow(
                    "You retrieve information about an XFS filesystem, exploring its attributes and characteristics.")
                if inspect_fs.xfs_info_command() == False:
                    continue
                slow_validInput.print_slow(
                    "As you inspect each XFS filesystem, you gain valuable insights into their behavior and characteristics, further enhancing your expertise as a cybernetic engineer.\n")
                slow_validInput.print_slow(
                    "With the inspection complete, you can rest assured knowing that the XFS filesystems on Ext4-vfat-xfs are in optimal condition, ready to support the planet's data infrastructure.\n")
                slow_validInput.print_slow(
                    "XFS filesystem information retrieved successfully!\n")
                count += 1
                continue
            elif choice == '9':
                break

    except KeyboardInterrupt:
        print("\nExiting the task due to user interruption (Ctrl+C). Farewell!")
    except Exception as e:
        print("An error occurred:", e)
