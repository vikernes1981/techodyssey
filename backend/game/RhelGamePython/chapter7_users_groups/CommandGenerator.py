import slow_validInput


class CommandGenerator:
    def __init__(self, action, correct_command, command_aspects, hint, intro_text=[], outro_text=[], command_options=None, command_output=None):
        self.action = action
        self.correct_command = correct_command
        self.command_aspects = command_aspects
        self.hint = hint
        self.intro_text = intro_text
        self.outro_text = outro_text
        self.command_options = command_options
        self.command_output = command_output

    def execute(self):
        try:
            slow_validInput.print_slow(self.intro_text[0])
            while True:
                user_input = input(
                    f"Enter the command to {self.action} or type 'quit/q' to exit: ").strip()
                if user_input.lower() in ['quit', 'q']:
                    print("Exiting the program. Goodbye!")
                    return False
                elif user_input.strip() == self.correct_command:
                    self.handle_correct_command(user_input)
                    return True
                else:
                    print("Incorrect command. Please try again.")
                    print(self.hint)
                    continue
        except KeyboardInterrupt:
            print("\nExiting the program due to user interruption (Ctrl+C). Goodbye!")
            return False
        except Exception as e:
            print("An error occurred:", e)

    def handle_correct_command(self, user_input):
        print("\nCommand is correct. Here are the aspects of the command:")
        print("Command:", user_input)
        print("Purpose:", self.action.capitalize())
        if self.command_aspects:
            print("\nAdditional Aspects:")
            for aspect in self.command_aspects:
                print(aspect)
        if self.command_options:
            print("\nOptions:")
            for option in self.command_options:
                print(option)
        if self.command_output:
            print("\nOutput Example:")
            for output in self.command_output:
                print(output)
        slow_validInput.print_slow(self.outro_text[0])
        print("\nYou can continue with the game.")
