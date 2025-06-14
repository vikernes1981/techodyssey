import chapter7_users_groups.CommandGenerator as CommandGenerator

reboot = CommandGenerator.CommandGenerator(
    action='reboot system',
    correct_command='systemctl reboot',
    hint='Hint: Use "systemctl reboot" to reboot system',
    command_output=['No output, reboots PC',],
    command_aspects=[
        "- systemctl: This is the main command-line utility used to control systemd, the init system used by many modern Linux distributions. It allows users to manage system services, units, and other aspects of the system's behavior.",
        "- reboot: This is the subcommand of systemctl. It instructs systemctl to reboot the system.",
    ],
    command_options=[
        "--force: Forces immediate execution without asking for confirmation or unmounting file systems cleanly. This option can be used to force a reboot even if processes are still running or if there are open files.",
        "\n--dry-run: Simulates the reboot process without actually rebooting the system. This option is useful for testing or previewing the effects of a reboot command without actually performing the reboot",
        "\n--no-wait: Executes the reboot command and returns immediately without waiting for the reboot process to complete. This option is useful for scripting or automation purposes where you don't want the command to block the script execution.",
    ],
    intro_text=[''],
    outro_text=[''],
)
