import slow_validInput
import stratis_config
import fstab_vdo_stratis
from create_fs import manage_and_create_stratis_pool_fs


def configure_stratis():
    """
    Challenge: Configure Stratis Storage Management.
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Configure Stratis Storage Management\n\n")
# Once player presses enter, the game continues
        slow_validInput.print_slow(
            "\nYou engage the quantum engines, and your starship hurtles through the void, bound for the planet Stratis.")
        slow_validInput.print_slow(
            "Stratis, a world shrouded in mystery and danger, is your first destination on this epic quest.")
        slow_validInput.print_slow(
            "As you approach the planet's orbit, your sensors detect anomalies in the Stratisian atmosphere.")
        slow_validInput.print_slow(
            "A voice crackles over the comm system, 'Welcome to Stratis, engineer. Prepare to face the challenges that lie ahead.'")
        slow_validInput.print_slow(
            "You brace yourself for what awaits as your starship descends towards the unknown terrain of Stratis.\n")
        slow_validInput.print_slow(
            "You land your starship on the rugged surface of Stratis, surrounded by rocky terrain and swirling mists.")
        slow_validInput.print_slow(
            "Your first task is to establish a base of operations and assess the resources available on this alien world.")
        slow_validInput.print_slow(
            "Scanners indicate the presence of valuable minerals nearby, but also signs of indigenous life forms.")
        slow_validInput.print_slow(
            "As you step out onto the planet's surface, you are greeted by the eerie sounds of Stratisian wildlife echoing in the distance.\n")

        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        count = 0
        valid_choices = ['1', '2', '3', '4', '5']

        while True:
            if count == 4:
                break
            print("Options:")
            print("1. Install Stratis Packages")
            print("2. Administrate a Stratis Pool and Filesystem")
            print("3. Create a Snapshot of the Stratis Filesystem")
            print("4. Add Stratis volume in /etc/fstab")
            print("5. Continue to next challenge\n")

            choice = slow_validInput.get_valid_input(
                "Enter your choice (1-5): ", valid_choices)

            if choice == '1':
                slow_validInput.print_slow(
                    "You embark on your journey by installing Stratis packages, laying the foundation for advanced storage management.")
                if stratis_config.install_stratis() == False:
                    continue
                slow_validInput.print_slow(
                    "Finally, after hours of hard work, your base stands resilient against the harsh environment of Stratis.\n")
                slow_validInput.print_slow(
                    "As you overlook your newly established outpost, you can't help but feel a sense of accomplishment.")
                slow_validInput.print_slow(
                    "But you know that this is only the beginning of your journey on Stratis, and greater challenges await.\n")
                slow_validInput.print_slow(
                    "Stratis packages installed successfully!\n")
                count += 1
                continue

            elif choice == '2':
                slow_validInput.print_slow(
                    "You choose to administrate a Stratis pool, a reservoir of digital potential, ready to store and protect your data.")
                if manage_and_create_stratis_pool_fs() == False:
                    continue
                slow_validInput.print_slow(
                    "Through careful analysis and strategic interventions, you manage to restore stability to the Stratis pool.")
                slow_validInput.print_slow(
                    "Your quick thinking and technical prowess prevent a potential disaster, earning you recognition among your peers.\n")
                slow_validInput.print_slow(
                    "With the Stratis pool and filesystem operating smoothly once again, you can focus on furthering your objectives on this enigmatic planet.")
                slow_validInput.print_slow(
                    "Stratis pool created and destroyed successfully!\n")
                count += 1
                continue

            elif choice == '3':
                slow_validInput.print_slow(
                    "You capture a moment in time by creating a snapshot of your Stratis filesystem, preserving its state for future reference.")
                if stratis_config.create_stratis_snapshot() == False:
                    continue
                slow_validInput.print_slow(
                    "As the snapshot fades, you are left with newfound knowledge of the dangers lurking on Stratis.")
                slow_validInput.print_slow(
                    "You realize that these snapshots could be the key to unlocking the planet's secrets and overcoming its challenges.\n")
                slow_validInput.print_slow(
                    "Snapshot of Stratis filesystem created successfully!\n")
                count += 1
                continue
            elif choice == '4':
                slow_validInput.print_slow(
                    "You choose to add the Stratis volume to /etc/fstab, ensuring it is mounted automatically on boot.")
                if fstab_vdo_stratis.add_stratis_fstab() == False:
                    continue
                slow_validInput.print_slow(
                    "As you save the changes and exit the file, you feel a sense of satisfaction knowing that your Stratis pool will be seamlessly integrated into the system.\n")
                slow_validInput.print_slow(
                    "With the Stratis pool now configured for auto-mounting, you can focus on your mission without worrying about manual intervention.")
                slow_validInput.print_slow(
                    "Stratis volume added to /etc/fstab successfully!\n")
                count += 1
                continue
            elif choice == '5':
                break

    except KeyboardInterrupt:
        print("\nExiting the task due to user interruption (Ctrl+C). Farewell!")
    except Exception as e:
        print("An error occurred:", e)
