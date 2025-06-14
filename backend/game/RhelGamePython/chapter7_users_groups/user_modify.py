import CommandGenerator


useradd = CommandGenerator.CommandGenerator(
    action='create a local user account',
    correct_command='useradd user1',
    hint='Hint: Use "useradd user1" to create a local user account',
    command_output=[
        """
            If the user is successfully created, you might see no output.
            If the specified user already exists, you might see an error message indicating that the user already exists.
            If there are permission issues or other errors, you might see an error message indicating the nature of the problem.
        """,
    ],
    command_aspects=[
        """
        useradd is the command used to add a new user.
        user1 is the username of the new user being created.
        """,
    ],
    command_options=[
        """
            -c, --comment COMMENT: This option is used to add a comment associated with the user account. The comment typically contains additional information about the user, such as their full name or job title.
            -d, --home HOME_DIR: This option specifies the home directory for the new user. If not specified, the home directory is typically created under /home with the same name as the username.
            -m, --create-home: This option tells useradd to create the user's home directory if it doesn't already exist.
            -g, --gid GROUP: This option specifies the initial login group for the user. If not specified, the default behavior is to create a group with the same name as the user and use that as the initial login group.
            -G, --groups GROUPS: This option specifies additional groups to which the user belongs. Multiple groups can be specified, separated by commas.
            -s, --shell SHELL: This option specifies the login shell for the user. If not specified, the default shell specified in /etc/default/useradd is used.
            -u, --uid UID: This option specifies the numerical user ID for the new user. If not specified, the next available user ID is assigned automatically.
            -p, --password PASSWORD: This option allows you to set the encrypted password for the user account. Note that specifying the password on the command line is not recommended for security reasons.
            -e, --expiredate EXPIRE_DATE: This option sets the expiration date for the user account. The date should be provided in the format YYYY-MM-DD.
            -h, --help: Displays a help message that lists all available options for the useradd command.
        """,
    ],
    intro_text=['',],
    outro_text=['',],
)


userdel = CommandGenerator.CommandGenerator(
    action='delete a local user account',
    correct_command='userdel user1',
    hint='Hint: Use "userdel user1" to delete a local user account',
    command_output=[
        """
        If the command is successful, it typically does not produce any output. However, if there are errors or if the user does not exist, an appropriate message will be displayed indicating the outcome of the command.
        """,
    ],
    command_aspects=[
        """
        userdel is the command used to delete a user.
        user1 is the username of the user being deleted.
        """,
    ],
    command_options=[
        """
            -f, --force: This option forces the removal of the user account, even if the user is currently logged in. Use this option with caution as it can potentially disrupt active processes associated with the user.
            -r, --remove: This option removes the user's home directory and mail spool. This is useful when you want to completely remove all traces of the user from the system.
            -Z, --selinux-user: This option specifies the SELinux user mapping to remove along with the user.
            -h, --help: Displays a help message that lists all available options for the userdel command.
        """,
    ],
    intro_text=['',],
    outro_text=['',],
)