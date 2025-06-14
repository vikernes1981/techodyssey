import slow_validInput
import fstab_vdo_stratis
import vdo_admin
from create_fs import create_vdo


def configure_vdo():
    """
    Challenge: Configure VDO (Virtual Data Optimizer).
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Configure VDO (Virtual Data Optimizer)\n\n")
        slow_validInput.print_slow(
            "\nYou engage the quantum engines, and your starship hurtles through the void, leaving the planet Stratis behind.")
        slow_validInput.print_slow(
            "As you traverse the depths of space, your destination comes into view: the enigmatic VDO-351-xy planet.")
        slow_validInput.print_slow(
            "This planet is known for its intricate network of virtual data optimization systems, presenting unique challenges to cybernetic engineers like yourself.")
        slow_validInput.print_slow(
            "You prepare yourself for the trials that await as your starship approaches the planet's orbit.\n")
        slow_validInput.print_slow(
            "Upon landing on VDO-351-xy, you are greeted by a landscape dominated by towering data towers and swirling virtual clouds.")
        slow_validInput.print_slow(
            "This planet is a hub of data optimization technology, with VDO systems integrated into every aspect of its infrastructure.")
        slow_validInput.print_slow(
            "Your mission here is to configure and optimize the VDO systems to maximize data efficiency and storage capacity.\n")
        slow_validInput.print_slow(
            "You begin by analyzing the existing VDO configurations, studying their performance metrics and resource utilization.")
        slow_validInput.print_slow(
            "Using your expertise in cybernetic engineering, you devise strategies to fine-tune the VDO parameters for optimal results.\n")
        slow_validInput.print_slow(
            "As you delve deeper into the intricate algorithms of the VDO systems, you encounter unexpected challenges.")
        slow_validInput.print_slow(
            "Data anomalies and virtual glitches test your problem-solving skills, requiring innovative solutions to overcome.\n")
        slow_validInput.print_slow(
            "Through perseverance and ingenuity, you navigate the complexities of the VDO configurations, optimizing them to perfection.")
        slow_validInput.print_slow(
            "The data towers hum with newfound efficiency, and the virtual clouds shimmer with optimized data streams.\n")
        slow_validInput.print_slow(
            "With the VDO systems operating at peak performance, you have fulfilled your mission on the VDO-351-xy planet.")
        slow_validInput.print_slow(
            "But as you prepare to depart, you know that your journey as a cybernetic engineer is far from over.\n")
        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        count = 0
        valid_choices = ['1', '2', '3', '4', '5', '6', '7', '8']

        while True:
            if count == 7:
                break
            print("Options:")
            print("1. Install VDO")
            print("2. VDO Create")
            print("3. Expand VDO volume")
            print("4. Remove VDO volume")
            print("5. List VDO volumes")
            print("6. Add VDO volume to /etc/fstab")
            print("7. VDO write modes info")
            print("8. Continue to next challenge\n")

            choice = slow_validInput.get_valid_input(
                "Enter your choice (1-8): ", valid_choices)

            if choice == '1':
                slow_validInput.print_slow(
                    "With unwavering resolve, you install VDO, optimizing the digital landscape for maximum efficiency.")
                if vdo_admin.install_vdo() == False:
                    continue
                slow_validInput.print_slow(
                    "Finally, after hours of hard work, the new VDO systems are online and operational.")
                slow_validInput.print_slow(
                    "They seamlessly integrate with the existing network, enhancing data optimization capabilities across the planet.\n")
                slow_validInput.print_slow(
                    "With the VDO installations complete, you take a moment to admire your handiwork.")
                slow_validInput.print_slow(
                    "But your journey as a cybernetic engineer is far from over, and new challenges await on the horizon.\n")
                slow_validInput.print_slow("VDO installed successfully!\n")
                count += 1
                continue

            elif choice == '2':
                slow_validInput.print_slow(
                    "You choose to create a new VDO volume, shaping the digital landscape with efficiency and precision.")

                if create_vdo() == False:
                    continue
                slow_validInput.print_slow(
                    "Finally, after hours of meticulous work, the new VDO volumes are ready for deployment.")
                slow_validInput.print_slow(
                    "They stand as pillars of data storage, ready to support the planet's ever-expanding digital infrastructure.\n")
                slow_validInput.print_slow(
                    "With the creation of the VDO volumes complete, you reflect on the challenges you've overcome and the knowledge you've gained.")
                slow_validInput.print_slow(
                    "But your journey as a cybernetic engineer continues, and new adventures await in the boundless expanse of the cosmos.\n")
                slow_validInput.print_slow(
                    "VDO volume created successfully!\n")
                count += 1
                continue

            elif choice == '3':
                slow_validInput.print_slow(
                    "You choose to expand the existing VDO volume, unlocking additional storage capacity.")

                if vdo_admin.expand_vdo() == False:
                    continue
                slow_validInput.print_slow(
                    "Finally, after hours of meticulous work, the VDO volumes have been successfully expanded.")
                slow_validInput.print_slow(
                    "They now possess greater capacity and efficiency, ready to meet the planet's ever-growing data needs.\n")
                slow_validInput.print_slow(
                    "With the expansion of the VDO volumes complete, you take a moment to admire your handiwork.")
                slow_validInput.print_slow(
                    "But your journey as a cybernetic engineer is far from over, and new challenges await in the boundless expanse of the cosmos.\n")
                slow_validInput.print_slow(
                    "VDO volume expanded successfully!\n")
                count += 1
                continue

            elif choice == '4':
                slow_validInput.print_slow(
                    "With careful consideration, you opt to remove the VDO volume, restoring the digital landscape to its original state.")

                if vdo_admin.remove_vdo() == False:
                    continue
                slow_validInput.print_slow(
                    "Finally, after completing the removal of the obsolete VDO volumes, you witness a streamlined data infrastructure.")
                slow_validInput.print_slow(
                    "Resources are now allocated more efficiently, and the planet's data optimization systems operate at peak performance.\n")
                slow_validInput.print_slow(
                    "With the removal of the VDO volumes complete, you take a moment to reflect on your accomplishments.")
                slow_validInput.print_slow(
                    "But your journey as a cybernetic engineer continues, and new challenges await in the boundless expanse of the cosmos.\n")
                slow_validInput.print_slow(
                    "VDO volume removed successfully!\n")
                count += 1
                continue

            elif choice == '5':
                slow_validInput.print_slow(
                    "You decide to list all VDO volumes, gaining insight into their configurations and capacities.")

                if vdo_admin.list_vdo() == False:
                    continue
                slow_validInput.print_slow(
                    "With a thorough understanding of the VDO volumes, you prepare to embark on your next cybernetic engineering task.")
                slow_validInput.print_slow(
                    "Armed with knowledge and determination, you are ready to face whatever challenges await in the boundless expanse of the cosmos.\n")
                slow_validInput.print_slow(
                    "VDO volumes listed successfully!\n")
                count += 1
                continue

            elif choice == '6':
                slow_validInput.print_slow(
                    "You choose to add the VDO volume to /etc/fstab, ensuring it is mounted automatically on boot.")
                if fstab_vdo_stratis.add_vdo_fstab() == False:
                    continue
                slow_validInput.print_slow(
                    "Upon reboot, the VDO volume is automatically mounted, seamlessly integrating into the planet's data infrastructure.\n")
                slow_validInput.print_slow(
                    "With the addition of the VDO volume to /etc/fstab complete, you have successfully completed your cybernetic engineering task.")
                slow_validInput.print_slow(
                    "But your journey as a cybernetic engineer continues, and new challenges await in the boundless expanse of the cosmos.\n")
                slow_validInput.print_slow(
                    "VDO volume added to /etc/fstab successfully!\n")
                count += 1
                continue

            elif choice == '7':
                slow_validInput.print_slow(
                    "You seek information about VDO write modes, exploring the various options available.")
                if vdo_admin.vdo_write_modes() == False:
                    continue
                slow_validInput.print_slow(
                    "With careful consideration, you configure the VDO volumes with the optimal write modes, balancing performance and data integrity.")
                slow_validInput.print_slow(
                    "The VDO volumes are now ready to handle a variety of workloads with efficiency and reliability.\n")
                slow_validInput.print_slow(
                    "With the configuration of VDO write modes complete, you have successfully optimized the planet's data infrastructure.")
                slow_validInput.print_slow(
                    "But your journey as a cybernetic engineer continues, and new challenges await in the boundless expanse of the cosmos.\n")
                slow_validInput.print_slow(
                    "VDO write modes info displayed successfully!\n")
                count += 1
                continue

            elif choice == '8':
                break
    except KeyboardInterrupt:
        print("\nExiting the task due to user interruption (Ctrl+C). Farewell!")
    except Exception as e:
        print("An error occurred:", e)
