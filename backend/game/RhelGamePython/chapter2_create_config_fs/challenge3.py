import slow_validInput
import autofs_client


def configure_autofs_server_client_nfs():
    """
    Challenge: Configure Autofs on Server and Client sides and Install NFS.
    """
    try:
        slow_validInput.print_slow(
            "\n\nChallenge: Configure Autofs on Server and Client sides and Install NFS\n\n")
        slow_validInput.print_slow(
            "As you leave the VDO-351-xy planet behind, your starship charts a course for new horizons.")
        slow_validInput.print_slow(
            "After a journey through the cosmic void, you arrive in orbit around the Auto-q652-FS planet.")
        slow_validInput.print_slow(
            "This celestial body is renowned for its advanced autonomous filesystem management, overseen by the Autofs system.\n")
        slow_validInput.print_slow(
            "Touching down on Auto-q652-FS, you are greeted by a landscape dominated by towering data structures and intricate filesystem networks.")
        slow_validInput.print_slow(
            "The planet's infrastructure hums with activity as Autofs dynamically manages filesystems to meet the ever-changing demands of its inhabitants.\n")
        slow_validInput.print_slow(
            "Your mission on Auto-q652-FS is clear: to optimize the Autofs configurations and ensure the planet's filesystems operate with maximum efficiency and reliability.\n")
        slow_validInput.print_slow(
            "Your first task is to explore the capabilities of Autofs and unlock its full potential.")
        slow_validInput.print_slow(
            "You delve deep into the system, encountering a myriad of options and parameters waiting to be configured.\n")
        slow_validInput.print_slow(
            "From defining mount points to specifying filesystem types, each decision you make will shape the way data is accessed and managed on the planet.\n")
        slow_validInput.print_slow(
            "With careful consideration, you begin to fine-tune the Autofs configurations, optimizing them to meet the specific needs of Auto-q652-FS.\n")
        slow_validInput.print_slow(
            "Whether it's setting up automount maps for network shares or configuring timeout settings for idle filesystems, you leave no stone unturned in your quest for perfection.\n")

        slow_validInput.print_slow(
            "You can quit at any time by typing 'quit' or 'q'.\n")

        count = 0
        valid_choices = ['1', '2', '3', '4']

        while True:
            if count == 7:
                break
            print("Options:")
            print("1. Configure Autofs on Server side")
            print("2. Configure Autofs on Client side")
            print("3. Install NFS")
            print("4. Continue to next challenge\n")

            choice = slow_validInput.get_valid_input(
                "Enter your choice (1-4): ", valid_choices)

            if choice == '1':
                slow_validInput.print_slow(
                    "You begin by configuring Autofs on the server side, enabling dynamic file mounting for remote access.")
                if autofs_client.configure_autofs_server() == False:
                    continue
                slow_validInput.print_slow(
                    "As you complete the Autofs configurations on the server side, you take pride in knowing that you have optimized the planet's data infrastructure to its fullest potential.\n")
                slow_validInput.print_slow(
                    "With your mission on Auto-q652-FS accomplished, you prepare to embark on new adventures in the boundless expanse of the cosmos.\n")
                slow_validInput.print_slow(
                    "Autofs configured successfully on the server side!\n")
                count += 1
                continue

            elif choice == '2':
                slow_validInput.print_slow(
                    "You proceed to configure Autofs on the client side, simplifying access to remote files with dynamic mounting.")
                if autofs_client.configure_autofs_client() == False:
                    continue
                slow_validInput.print_slow(
                    "As you complete the Autofs configurations on the client side, you witness a seamless integration of filesystems across Auto-q652-FS.\n")
                slow_validInput.print_slow(
                    "Users and applications can now access data with unprecedented ease, thanks to your expertise in configuring Autofs.\n")
                slow_validInput.print_slow(
                    "With the Autofs configurations perfected on both the server and client sides, Auto-q652-FS stands ready to embrace the future of data management.\n")
                slow_validInput.print_slow(
                    "As you prepare to depart for new adventures, you reflect on the impact of your actions, knowing that you have ushered Auto-q652-FS into a new era of efficiency and innovation.\n")
                slow_validInput.print_slow(
                    "Autofs configured successfully on the client side!\n")
                count += 1
                continue

            elif choice == '3':
                slow_validInput.print_slow(
                    "You install NFS, laying the groundwork for efficient file sharing and network communication.")
                if autofs_client.install_nfs() == False:
                    continue
                slow_validInput.print_slow(
                    "As the NFS exports are configured, you test the connectivity from client machines, verifying seamless access to the shared directories.\n")
                slow_validInput.print_slow(
                    "With NFS successfully installed and configured, Auto-q652-FS is now equipped with a robust network file sharing infrastructure, enabling seamless collaboration and data access across its interconnected systems.\n")
                slow_validInput.print_slow(
                    "As you prepare to depart for new adventures, you take pride in knowing that your expertise has strengthened the foundations of Auto-q652-FS, ensuring its continued prosperity in the vast expanse of the cosmos.\n")
                slow_validInput.print_slow("NFS installed successfully!\n")
                count += 1
                continue

            elif choice == '4':
                break

    except KeyboardInterrupt:
        print("\nExiting the task due to user interruption (Ctrl+C). Farewell!")
    except Exception as e:
        print("An error occurred:", e)
