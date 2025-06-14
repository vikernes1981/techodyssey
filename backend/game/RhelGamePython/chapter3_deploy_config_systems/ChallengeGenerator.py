import slow_validInput


class ChallengeGenerator:
    def __init__(self, quest_number, description, story, options):
        self.quest_number = quest_number
        self.description = description
        self.story = story
        self.options = options

    def execute(self):
        try:
            slow_validInput.print_slow("\n\nquest {}: {}\n\n".format(
                self.quest_number, self.description))
            slow_validInput.print_slow(self.story)

            count = 0
            valid_choices = [str(i) for i in range(1, len(self.options)+1)]
            valid_choices.append(str(len(self.options)+1))
            while True:
                if count == len(self.options):
                    break
                print("Options:")
                for i, option in enumerate(self.options, 1):
                    print(f"{i}. {option['name']}")
                print(f"{len(self.options)+1}. Continue to next quest\n")

                choice = slow_validInput.get_valid_input(
                    "Enter your choice (1-{}): ".format(len(self.options) + 1), valid_choices)

                if choice == str(len(self.options) + 1):
                    break

                selected_option = self.options[int(choice) - 1]
                slow_validInput.print_slow(selected_option['action'])

                if not selected_option['function']():
                    continue
                slow_validInput.print_slow("{} successfully!\n".format(
                    selected_option['success_message']))
                count += 1
        except Exception as e:
            print("An error occurred:", e)
