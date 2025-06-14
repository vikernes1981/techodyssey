import slow_validInput


def start_game():
    """
    Start the Cybernetic Conquest game.
    """
    try:
        slow_validInput.print_slow("Welcome to Cybernetic Conquest!\n")
        slow_validInput.print_slow(
            "In the year 2200, humanity has spread across the galaxy, colonizing distant planets and harnessing advanced technology.")
        slow_validInput.print_slow(
            "As the galaxy flourished with innovation, so did the need for skilled cybernetic engineers to maintain order and progress.")
        slow_validInput.print_slow(
            "You, a renowned cybernetic engineer, have mastered the art of blending man and machine, creating marvels of technological prowess.")
        slow_validInput.print_slow(
            "Today, you embark on a journey that will test your ingenuity, bravery, and adaptability like never before.")
        slow_validInput.print_slow(
            "Welcome to Cybernetic Conquest, where heroes rise and civilizations fall amidst the vast expanse of the cosmos.\n")
        slow_validInput.print_slow(
            "As you step aboard your starship, you are surrounded by the hum of quantum engines and the glow of holographic displays.")
        slow_validInput.print_slow(
            "A transmission appears before you, urging you to unlock the mysteries of the cosmic frontier:")
        slow_validInput.print_slow(
            "'Greetings, adventurer. Your mission, if you dare to accept it, is to conquer the challenges that await")
        slow_validInput.print_slow(
            "and emerge as the supreme master of cybernetic engineering. But heed this warning, for the journey ahead is perilous and unpredictable.")
        slow_validInput.print_slow(
            "Only by utilizing your expertise and resourcefulness can you hope to triumph against the odds.'\n")
        input("Press Enter to embark on your cosmic journey...")
    except KeyboardInterrupt:
        print("\nGame interrupted. Exiting...")
        exit()
