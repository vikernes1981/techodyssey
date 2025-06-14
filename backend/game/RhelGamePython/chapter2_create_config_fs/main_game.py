import intro
import challenge1
import challenge2
import challenge3
import challenge4
import challenge5
import bash_script
import outro


def main():
    """
    Main function to run the game.
    """
    try:
        intro.start_game()
        challenge1.configure_stratis()
        challenge2.configure_vdo()
        challenge3.configure_autofs_server_client_nfs()
        challenge4.manage_filesystems()
        challenge5.manage_permissions()
        bash_script.write_advanced_bash_script()
        # Display the conclusion after completing all challenges.
        outro.end_game()
    except Exception as e:
        print("An error occurred during the game:", e)


if __name__ == "__main__":
    main()
