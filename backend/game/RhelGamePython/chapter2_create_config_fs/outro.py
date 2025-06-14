import slow_validInput


def end_game():
    """
    End the Cybernetic Conquest game with an extended outro.
    """
    try:
        slow_validInput.print_slow("\nCongratulations, valiant explorer!\n")
        slow_validInput.print_slow(
            "You stand as a paragon of ingenuity and resilience, having surmounted every obstacle in your path.")
        slow_validInput.print_slow(
            "Throughout your journey, you have demonstrated unparalleled skill and courage, shaping the destiny of worlds.")
        slow_validInput.print_slow(
            "As the echoes of your triumph reverberate across the cosmos, know that your legacy shall endure for eons to come.\n")
        slow_validInput.print_slow(
            "The stars themselves bear witness to your greatness, as you emerge victorious from the crucible of cosmic conquest.")
        slow_validInput.print_slow(
            "Your name shall be whispered in awe by generations yet unborn, a testament to the indomitable spirit of humanity.\n")
        slow_validInput.print_slow(
            "But even as you revel in your triumph, remember that the universe is vast and infinite,")
        slow_validInput.print_slow(
            "teeming with mysteries waiting to be unraveled and frontiers waiting to be explored.")
        slow_validInput.print_slow(
            "As you chart your course through the cosmic tapestry, may your thirst for knowledge never be quenched,")
        slow_validInput.print_slow(
            "and may your adventures be as boundless as the reaches of space itself.\n")
        slow_validInput.print_slow(
            "Farewell, noble adventurer, and may the stars guide you on your endless journey through the void.\n")
    except KeyboardInterrupt:
        print("\nOutro interrupted. Exiting...")
        exit()
