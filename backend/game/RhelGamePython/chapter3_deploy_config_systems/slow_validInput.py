import time


def print_slow(text):
    """
    Print text slowly for better storytelling.

    Args:
    text (str): The text to be printed slowly.
    """
    for char in text:
        print(char, end='', flush=True)
        time.sleep(0.002)
    print()


def get_valid_input(prompt, valid_choices):
    """
    Get valid input from the user.

    Args:
    prompt (str): The prompt to be displayed to the user.
    valid_choices (list): A list of valid choices.

    Returns:
    str: The user's valid choice.
    """
    while True:
        try:
            choice = input(prompt)
            if choice in valid_choices:
                return choice
            else:
                print("Invalid choice. Please enter a valid option.")
        except KeyboardInterrupt:
            print("\nGame interrupted. Exiting...")
            exit()
