import slow_validInput



def challenge_1():

        """
        First challenge: System Boot Configuration Phase
        """
       # try:
                slow_validInput.print_slow("\n\nChallenge 1: System Boot Configuration Phase\n\n")

                slow_validInput.print_slow("To ensure seamless operation, Olivia configures the systems to boot into a specific target automatically.")
                slow_validInput.print_slow("By setting the default target, she ensures that the servers start up in the desired state, ready to serve their purpose without manual intervention.")
                slow_validInput.print_slow("This involves modifying the systemd configuration files to specify the default target, which dictates the system services and applications that are started during boot.")
                slow_validInput.print_slow("Olivia carefully selects the target based on the server's role and function, ensuring optimal performance and resource allocation.")
                slow_validInput.print_slow("With this configuration in place, the servers seamlessly boot into the designated target, minimizing downtime and streamlining operations.\n")

                count = 0
                valid_choices = ["1", "2", "3", "4", "5", "6", "7"]

                slow_validInput.print_slow("Choose a task to proceed:")
                slow_validInput.print_slow("1. Configure systems to boot into a specific target automatically")
                slow_validInput.print_slow("2. Configure time service clients")
                slow_validInput.print_slow("3. Install and update software packages from Red Hat Network, a remote repository, or from the local file system")
                slow_validInput.print_slow("4. Modify the system bootloader")
                slow_validInput.print_slow("5. Schedule tasks using at and cron")
                slow_validInput.print_slow("6. Start and stop services and configure services to start automatically at boot")
                slow_validInput.print_slow("7. Work with package module streams\n")