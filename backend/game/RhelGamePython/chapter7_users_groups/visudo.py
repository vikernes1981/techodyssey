import CommandGenerator


visudo = CommandGenerator.CommandGenerator(
    action='edit sudoers file',
    correct_command='visudo',
    hint='Hint: Use "visudo" to edit sudoers file',
    command_output=[
        """
        # /etc/sudoers
        #
        # This file MUST be edited with the 'visudo' command as root.
        #
        # See the sudoers man page for the details on how to write a sudoers file.
        #

        # User privilege specification
        root    ALL=(ALL:ALL) ALL

        # Allow members of the admin group to execute any command
        %admin  ALL=(ALL) ALL

        # Allow members of the wheel group to execute any command
        %wheel  ALL=(ALL) ALL

        # Allow a specific user to restart Apache without a password
        john    ALL=NOPASSWD: /usr/sbin/service apache2 restart

        # Allow a specific user to run specific commands with sudo
        jane    ALL=(ALL) /bin/kill, /usr/bin/ps

        # Allow a specific group to run specific commands with sudo
        %support    ALL=(ALL) /bin/systemctl restart nginx, /bin/systemctl reload nginx

        """,
    ],
    command_aspects=[
        """
        visudo: This is the command itself. It stands for "edit sudoers."

        Functionality:

            Edit sudoers File: The primary function of visudo is to open the sudoers file (/etc/sudoers) in a text editor. This file contains the configuration for the sudo command, which allows users to run programs with the security privileges of another user (typically the root user).
            Secure Editing: visudo ensures secure editing of the sudoers file by performing syntax checking before saving any changes. This helps prevent syntax errors that could potentially lock users out of administrative privileges.
        """,
    ],
    command_options=[
        """
        The visudo command doesn't have many options, but it does have one important one:

        -f, --file=file: This option allows you to specify a different file to edit instead of the default /etc/sudoers file. For example:
        """,
        """
        Configure superuser access
        A superuser in Linux is managed via the sudoers file, this is a file that stores the list of the users that can escalate their privileges and what they can escalate it to.

        Editing that file can only be done by a privileged user and only using visudo if you don’t use that application you can irreparably damage your Linux installation.

        Commands	Comments
        #visudo	Edit sudoers file
        If you review the entries in the sudoers file that’s there already, you will see a line that looks like this:

        %wheel ALL=(ALL) ALL

        As there is a % for the first entry that means it is specifying a group that would have access. In this case it is the wheel group.

        The format of the entry is as follows:

        User Host = (Runas) Command
        %Group Host = (Runas) Command

        Based on this, and the above previously mentioned configuration for the wheel group, we can describe the wheel group access as thusly.
        The wheel group has access to escalate to the root user and run any command from any host.

        To give the user superuser access, we just need to add them to the wheel group, we can do this by:

        # usermod -aG wheel user1

        We can login as user1 to test via:

        # su - user1

        The user1 user can escalate their privileges to root via sudo, for example to escalate their
        bash shell:

        # sudo bash

        Finally, another example for the sudoers configuration:

        user2 ALL=(root) /bin/ls, /bin/df -h, /bin/date

        This would allow the user2 user to run from any host the listed commands as root. Any other commands would be blocked.
        """,
    ],
    intro_text=['',],
    outro_text=['',],
)