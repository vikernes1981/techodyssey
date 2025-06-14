import CommandGenerator


groupadd = CommandGenerator.CommandGenerator(
    action='create a group without any associated user',
    correct_command='groupadd group1',
    hint='Hint: Use ""groupadd group1 to create a group without any associated user',
    command_output=[
        """
            If the group is successfully created, you might see no output.
            If the group already exists, you might see an error message indicating that the group already exists.
            If there are permission issues or other errors, you might see an error message indicating the nature of the problem.
        """,
    ],
    command_aspects=[
        """
        groupadd is the command used to create a new group.
        group1 is the name of the group being created.
        """,
    ],
    command_options=[
        """
            -g, --gid GID: This option is used to specify the numerical group ID for the new group. If not specified, the next available group ID is assigned automatically.
            -K, --key KEY=VALUE: This option allows you to override default configuration settings in the /etc/login.defs file. For example, you can use -K GID_MIN=500 to set the minimum group ID allowed.
            -o, --non-unique: This option allows the creation of a group with a non-unique numerical ID. By default, the numerical ID must be unique.
            -r, --system: This option creates a system group. System groups have lower GIDs and are usually used for system processes.
            -h, --help: Displays a help message that lists all available options for the groupadd command.
            -V, --version: Displays the version information for the groupadd command.
        """,
    ],
    intro_text=['',],
    outro_text=['',],
)

groupmod = CommandGenerator.CommandGenerator(
    action='make changes to existing group configurations',
    correct_command='groupmod -n group2 group1',
    hint='Hint: Use "groupmod -n group2 group2" to change name of group1',
    command_output=[
        """
            If the group name is successfully changed, you might see no output.
            If the specified group does not exist, you might see an error message indicating that the group does not exist.
            If there are permission issues or other errors, you might see an error message indicating the nature of the problem.
        """,
    ],
    command_aspects=[
        """
        groupmod is the command used to modify group attributes.
        -n group2 specifies that the name of the group should be changed to "group2".
        group1 is the current name of the group being modified.
        """,
    ],
    command_options=[
        """
            -g, --gid GID: This option is used to specify the new numerical group ID for the group.
            -n, --new-name NEW_GROUP_NAME: This option is used to specify the new name for the group.
            -o, --non-unique: This option allows the creation of a group with a non-unique numerical ID. By default, the numerical ID must be unique.
            -h, --help: Displays a help message that lists all available options for the groupmod command.
            -V, --version: Displays the version information for the groupmod command.
            -p, --password PASSWORD: This option allows you to set the group password. Group passwords are not commonly used, and their usage depends on system configuration.
            -K, --key KEY=VALUE: This option allows you to override default configuration settings in the /etc/login.defs file. For example, you can use -K GID_MIN=500 to set the minimum group ID allowed.
            -R, --root CHROOT_DIR: This option changes the root directory for the operation. This is useful for managing group attributes in a chroot environment.
            -P, --prefix PREFIX: This option specifies a prefix to add to each group name that is modified. The prefix is added before the group name.
            -S, --suffix SUFFIX: This option specifies a suffix to add to each group name that is modified. The suffix is added after the group name.
        """,
    ],
    intro_text=['',],
    outro_text=['',],
)


groupdel = CommandGenerator.CommandGenerator(
    action='remove a group without any associated user',
    correct_command='groupdel group1',
    hint='Hint: Use "groupdel group1" to remove a group without any associated user',
    command_output=[
        """
            If the group is successfully deleted, you might see no output.
            If the specified group does not exist, you might see an error message indicating that the group does not exist.
            If there are permission issues or other errors, you might see an error message indicating the nature of the problem.
        """,
    ],
    command_aspects=[
        """
        groupdel is the command used to delete a group.
        group1 is the name of the group being deleted.
        """,
    ],
    command_options=[
        """
        -h, --help                    display this help message and exit
        -R, --root CHROOT_DIR         directory to chroot into
        -P, --prefix PREFIX_DIR       prefix directory where are located the /etc/* files
        -f, --force                   delete group even if it is the primary group of a user
            --extrausers              Use the extra users database
        """,
    ],
    intro_text=['',],
    outro_text=['',],
)

gpasswd = CommandGenerator.CommandGenerator(
    action='manage group passwords and group membership',
    correct_command='gpasswd -a user1 group1',
    hint='Hint: Use "gpasswd -a user1 group1" to add a secondary group to a user account',
    command_output=[
        """
        $ sudo gpasswd -a user1 group1
        Adding user user1 to group group1
        """,
    ],
    command_aspects=[
        """
        gpasswd is the command used to manage group membership.
        -a user1 specifies that the user "user1" should be added to the group.
        group1 is the name of the group to which the user is being added.
        """,
    ],
    command_options=[
        """
        -a, --add USER                add USER to GROUP
        -d, --delete USER             remove USER from GROUP
        -h, --help                    display this help message and exit
        -Q, --root CHROOT_DIR         directory to chroot into
        -r, --remove-password         remove the GROUP's password
        -R, --restrict                restrict access to GROUP to its members
        -M, --members USER,...        set the list of members of GROUP
            --extrausers              use the extra users database
        -A, --administrators ADMIN,...
                                        set the list of administrators for GROUP
        Except for the -A and -M options, the options cannot be combined.

        """,
    ],
    intro_text=['',],
    outro_text=['',],
)

