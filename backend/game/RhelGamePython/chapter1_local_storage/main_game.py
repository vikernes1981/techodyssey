import intro
import challenge1
import challenge2
import challenge3
import challenge4
import challenge5
import challenge6
import challenge7
import outro
import ChallengeGenerator


def main():
    """
    Main function to run the game.
    """
    try:
        intro.start_game()
        challenge1.challenge_1.execute()
        challenge2.challenge_2.execute()
        challenge3.challenge_3.execute()
        challenge4.challenge_4.execute()
        challenge5.challenge_5.execute()
        challenge6.challenge_6 .execute()
        challenge7.challenge_7.execute()
        # Display the conclusion after completing all challenges.
        outro.conclusion()
    except Exception as e:
        print("An error occurred during the game:", e)


if __name__ == "__main__":
    main()
