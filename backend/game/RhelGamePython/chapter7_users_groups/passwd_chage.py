import CommandGenerator


passwd = CommandGenerator.CommandGenerator(
    action='change current password',
    correct_command='passwd',
    hint='Hint: Use "passwd" to change current password',
    command_output=[
        """
        $ passwd
        Changing password for user your_username.
        (current) UNIX password: 
        Enter new UNIX password: 
        Retype new UNIX password: 
        passwd: password updated successfully

        """,
    ],
    command_aspects=[
        """
            Changing Passwords: The primary function of passwd is to change user passwords. When run without any options, it prompts the user to enter their current password and then enter a new password twice for confirmation.
            Administrative Actions: With different options, passwd can perform various administrative actions such as locking or unlocking user accounts, setting password expiration policies, deleting passwords, etc.
        """,
    ],
    command_options=[
        """
            -a, --all: This option is used with the -S option to display password status information for all users.
            -d, --delete: This option deletes the password for the specified user account. It disables the account by making the password empty.
            -e, --expire: This option immediately expires the password for the specified user account. The user will be forced to change their password the next time they log in.
            -h, --help: Displays a help message that lists all available options for the passwd command.
            -l, --lock: This option locks the specified user account by putting a '!' character in front of the encrypted password in the /etc/shadow file. This effectively disables the account until it's unlocked.
            -u, --unlock: This option unlocks a previously locked user account.
            -n, --mindays: Sets the minimum number of days required between password changes.
            -x, --maxdays: Sets the maximum number of days the password is valid.
            -w, --warndays: Sets the number of days before the password expires that the user is warned about it.
            -i, --inactive: Sets the number of days after the password expires until the account is disabled.
        """,
    ],
    intro_text=['',],
    outro_text=['',],
    
)

chage = CommandGenerator.CommandGenerator(
    action='change the aging information for password',
    correct_command='chage user1',
    hint='Hint: Use "chage user1" to change the aging information for password',
    command_output=[
        """
        When you run chage user1 without any additional options, it will let you modify the current password aging information for the specified user. This information typically includes:

        Last password change date.
        Password expiration date.
        Password inactivity period.
        Account expiration date.
        Minimum and maximum number of days between password changes.
        Number of days of warning before password expiration.
        """,
    ],
    command_aspects=[
        """
            chage: This is the command itself. It stands for "change age" and is used for modifying password aging information for users.
            user1: This is the username of the user for which you want to view or modify password aging settings. Replace "user1" with the actual username you're interested in.
        """,
    ],
    command_options=[
        """
            -d, --lastday LAST_DAY: Sets the date of the last password change. This option requires the date to be provided in the format YYYY-MM-DD.
            -E, --expiredate EXPIRE_DATE: Sets the date when the account will expire. The date should be provided in the format YYYY-MM-DD.
            -h, --help: Displays a help message that lists all available options for the chage command.
            -I, --inactive INACTIVE: Sets the number of days after the password expires until the account is locked. This option specifies the number of days of inactivity allowed after the password has expired.
            -l, --list: Displays the current password aging information for the specified user.
            -m, --mindays MIN_DAYS: Sets the minimum number of days before the password can be changed.
            -M, --maxdays MAX_DAYS: Sets the maximum number of days before the password expires.
            -W, --warndays WARN_DAYS: Sets the number of days of warning before the password expires.
            -E, --expiredate DATE: Specifies the date when the account will expire. The date should be provided in the format YYYY-MM-DD.

            /etc/login.defs : The default configuration for the password expiration is stored here
        """,
    ],
    intro_text=['',],
    outro_text=['',],
)