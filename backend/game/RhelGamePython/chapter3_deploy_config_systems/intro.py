import slow_validInput


def start_game():
    """
    Chronicles of the Crimson Kernel: A Red Hat Saga
    """
    try:
        # Introduction

        slow_validInput.print_slow(
            "\n\nWelcome to the Chronicles of the Crimson Kernel: A Red Hat Saga.\n")
        slow_validInput.print_slow(
            "In the not-so-distant future, the world had become a complex network of interconnected systems, ")
        slow_validInput.print_slow(
            "both physical and digital. Amidst this intricate web, the guardians of digital fortresses, the sysadmins, held a crucial role.")
        slow_validInput.print_slow(
            "Among them, a select few were entrusted with the formidable task of deploying, configuring, ")
        slow_validInput.print_slow(
            "and maintaining the Red Hat systems, known for their resilience and stability in the ever-evolving cyber realm.\n")

        # Olivia's Journey Begins

        slow_validInput.print_slow(
            "Our tale begins with Olivia, a seasoned sysadmin with a penchant for the intricate dance of ")
        slow_validInput.print_slow("code and commands.")
        slow_validInput.print_slow(
            "Assigned to a mission critical project, she embarks on a journey to deploy a cluster of ")
        slow_validInput.print_slow(
            "Red Hat Enterprise Linux servers to power a cutting-edge AI-driven analytics platform for a global corporation.\n")

        # Deployment Phase

        slow_validInput.print_slow(
            "With meticulous planning and unwavering focus, Olivia orchestrates the deployment process.")
        slow_validInput.print_slow(
            "Each server is meticulously configured to optimize performance and security.")
        slow_validInput.print_slow(
            "Through the command line interface, she weaves her magic, installing packages, setting up ")
        slow_validInput.print_slow(
            "firewalls, and fine-tuning kernel parameters.")
        slow_validInput.print_slow(
            "As the installations progress, Olivia's confidence grows, her fingers dancing across the keyboard ")
        slow_validInput.print_slow("with practiced precision.")
        slow_validInput.print_slow(
            "However, the cyber realm is fraught with challenges, and no deployment is without its trials.")
        slow_validInput.print_slow(
            "Olivia encounters unexpected hurdles, from compatibility issues with legacy systems to network ")
        slow_validInput.print_slow("configuration quirks.")
        slow_validInput.print_slow(
            "Yet, armed with her expertise and the vast knowledge base of the Red Hat community, ")
        slow_validInput.print_slow(
            "she navigates through the storm, emerging victorious with each obstacle conquered.\n")

        # Configuration Phase

        slow_validInput.print_slow(
            "As the sun sets on the deployment phase, Olivia's journey transitions into the realm of configuration.")
        slow_validInput.print_slow(
            "With the servers humming to life, she delves deep into the heart of each system, customizing ")
        slow_validInput.print_slow(
            "settings and crafting the perfect environment for the forthcoming workload.")
        slow_validInput.print_slow(
            "Utilizing Red Hat's powerful management tools, she orchestrates the servers into a ")
        slow_validInput.print_slow(
            "harmonious symphony of computational prowess, ready to tackle any task thrown their way.\n")

        # Maintenance Phase

        slow_validInput.print_slow(
            "But the journey does not end with deployment and configuration; the true test lies in maintenance.")
        slow_validInput.print_slow(
            "With vigilant eyes, Olivia monitors the health and performance of the Red Hat systems, ")
        slow_validInput.print_slow(
            "preempting potential issues before they can manifest.")
        slow_validInput.print_slow(
            "Regular updates and patches are applied, ensuring the fortress remains fortified against the ")
        slow_validInput.print_slow("ever-looming specter of cyber threats.\n")

        input("Press Enter to embark on your journey...")

        # Conclusion

        slow_validInput.print_slow(
            "\nThrough the trials and triumphs of deploying, configuring, and maintaining Red Hat systems, ")
        slow_validInput.print_slow("Olivia will emerge as a skilled sysadmin.")
        slow_validInput.print_slow(
            "Her dedication and expertise will stand as a testament to the enduring legacy of Red Hat, ")
        slow_validInput.print_slow(
            "forging a path towards a future where cyber landscapes are conquered and secured, one command at a time.\n")

    except KeyboardInterrupt:
        slow_validInput.print_slow("\nGame interrupted. Exiting...")
        exit()


start_game()
