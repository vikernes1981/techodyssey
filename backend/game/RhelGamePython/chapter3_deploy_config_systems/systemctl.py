import chapter7_users_groups.CommandGenerator as CommandGenerator


start_systemctl = CommandGenerator.CommandGenerator(
    action='start sshd service',
    correct_command='systemctl start sshd',
    hint='Hint: Use "systemctl start sshd" to start sshd service',
    command_output=[
        """
There might not be any output if the command runs successfully.
If there's an error, it will typically be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
- systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
- start: This is an argument passed to the systemctl command. It tells systemd to start a specific service.
- sshd: This is the name of the service that you want to start. In this case, it refers to the SSH (Secure Shell) daemon, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- --no-block: This option instructs systemctl not to wait for the service to start before returning. It immediately returns control to the terminal.
- --no-wall: Suppresses sending a message to all users before the service is started.
- -q, --quiet: Suppresses output. It makes the command less verbose.
- -H, --host: Specifies a remote host to operate on when managing services on a different machine.
- -P, --privileged: Allows running the command as the root user.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


restart_systemctl = CommandGenerator.CommandGenerator(
    action='restart sshd service',
    correct_command='systemctl restart sshd',
    hint='Hint: Use "systemctl restart sshd" to restart sshd service',
    command_output=[
        """
If the command executes successfully, there might not be any output.
If there are any errors or warnings, they will typically be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 restart: This is an argument passed to the systemctl command. It tells systemd to restart a specific service.
 sshd: This is the name of the service that you want to restart. In this case, it refers to the SSH (Secure Shell) daemon, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- -q, --quiet: Suppresses output. It makes the command less verbose.
- -H, --host: Specifies a remote host to operate on when managing services on a different machine.
- -P, --privileged: Allows running the command as the root user.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


reload_systemctl = CommandGenerator.CommandGenerator(
    action='reload sshd service',
    correct_command='systemctl reload sshd',
    hint='Hint: Use "systemctl reload sshd" to reload sshd service',
    command_output=[
        """
If the command executes successfully, it may not produce any output.
However, if there are any errors or warnings related to the reload process, they will typically be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 reload: This is an argument passed to the systemctl command. It tells systemd to reload the configuration of a specific service.
 sshd: This is the name of the service that you want to reload. In this case, it refers to the SSH (Secure Shell) daemon, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- -q, --quiet: Suppresses output. It makes the command less verbose.
- -H, --host: Specifies a remote host to operate on when managing services on a different machine.
- -P, --privileged: Allows running the command as the root user.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


reload_or_restart_systemctl = CommandGenerator.CommandGenerator(
    action='try reloading and if doesn’t work then restart the service',
    correct_command='systemctl reload-or-restart sshd',
    hint='Hint: Use "systemctl reload-or-restart sshd" to try reloading and if doesn’t work then restart the service',
    command_output=[
        """
If the command executes successfully, it may not produce any output.
However, if there are any errors or warnings related to the reload process, they will typically be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 reload-or-restart: This is an argument passed to the systemctl command. It tells systemd to reload the configuration of a specific service and if it fails, to restart the service
 sshd: This is the name of the service that you want to reload. In this case, it refers to the SSH (Secure Shell) daemon, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
  -h --help              Show this help
     --version           Show package version
     --system            Connect to system manager
     --user              Connect to user service manager
  -H --host=[USER@]HOST  Operate on remote host
  -M --machine=CONTAINER Operate on a local container
  -t --type=TYPE         List units of a particular type
     --state=STATE       List units with particular LOAD or SUB or ACTIVE state
     --failed            Shortcut for --state=failed
  -p --property=NAME     Show only properties by this name
  -P NAME                Equivalent to --value --property=NAME
  -a --all               Show all properties/all units currently in memory,
                         including dead/empty ones. To list all units installed
                         on the system, use 'list-unit-files' instead.
  -l --full              Don't ellipsize unit names on output
""",
    ],
    intro_text=['',],
    command_output=['',],
)


enable_systemctl = CommandGenerator.CommandGenerator(
    action='enable the service to run at startup',
    correct_command='systemctl enable sshd.service',
    hint='Hint: Use "systemctl enable sshd.service" to enable the service to run at startup',
    command_output=[
        """
Created symlink /etc/systemd/system/multi-user.target.wants/sshd.service → /usr/lib/systemd/system/sshd.service.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 enable: This is an argument passed to the systemctl command. It tells systemd to enable a specific service.
 sshd.service: This is the name of the service that you want to enable. In this case, it refers to the SSH (Secure Shell) daemon service, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- -f, --force: Enables the unit file regardless of the symlinks that already exist. This can be useful if you want to override existing symlinks or if you want to ensure that the service is enabled.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


disable_systemctl = CommandGenerator.CommandGenerator(
    action='disable a service from running at boot',
    correct_command='systemctl disable sshd.service',
    hint='Hint: Use "systemctl disable sshd.service" to disable a service from running at boot',
    command_output=[
        """
Removed symlink /etc/systemd/system/multi-user.target.wants/sshd.service.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 disable: This is an argument passed to the systemctl command. It tells systemd to disable a specific service.
 sshd.service: This is the name of the service that you want to disable. In this case, it refers to the SSH (Secure Shell) daemon service, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- --now: This option can be used to disable the service immediately and stop it if it is currently running.
- --runtime: Specifies that the unit shall be enabled only for the runtime of the next boot.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


is_enabled_systemctl = CommandGenerator.CommandGenerator(
    action='check if the service is enabled to run at boot',
    correct_command='systemctl is-enabled sshd',
    hint='Hint: Use "systemctl is-enabled sshd" to check if the service is enabled to run at boot',
    command_output=[
        """
  enabled: Indicates that the service is enabled and will start automatically during system boot.
  disabled: Indicates that the service is disabled and will not start automatically during system boot.
  static: Indicates that the unit file is enabled but cannot be started or stopped by the user. This often happens with units managed by another unit.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 is-enabled: This is an argument passed to the systemctl command. It tells systemd to check whether a specific service or unit is enabled or not.
 sshd: This is the name of the service or unit that you want to check. In this case, it refers to the SSH (Secure Shell) daemon service, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
-h, --help: Displays a help message explaining how to use the systemctl command and its options.
--root: Specifies an alternative root directory
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


is_failed_systemctl = CommandGenerator.CommandGenerator(
    action='check if the service is running correctly',
    correct_command='systemctl is-failed sshd',
    hint='Hint: Use "systemctl is-failed sshd" to check if the service is running correctly',
    command_output=[
        """
  failed: Indicates that the service or unit has failed.
  inactive: Indicates that the service or unit is inactive, but not necessarily failed.
  active: Indicates that the service or unit is active and functioning as expected.
  activating: Indicates that the service or unit is currently in the process of being activated.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 is-failed: This is an argument passed to the systemctl command. It tells systemd to check whether a specific service or unit has failed.
 sshd: This is the name of the service or unit that you want to check. In this case, it refers to the SSH (Secure Shell) daemon service, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


cat_systemctl = CommandGenerator.CommandGenerator(
    action='check the systemctl configuration of the service',
    correct_command='systemctl cat sshd.service',
    hint='Hint: Use "systemctl cat sshd.service" to check the systemctl configuration of the service',
    command_output=[
        """
# /etc/systemd/system/sshd.service
[Unit]
Description=OpenSSH server daemon
Documentation=man:sshd(8) man:sshd_config(5)
After=network.target sshd-keygen.service
Wants=sshd-keygen.service

[Service]
Type=notify
EnvironmentFile=/etc/sysconfig/sshd
ExecStart=/usr/sbin/sshd -D $OPTIONS
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure
RestartSec=42s

[Install]
WantedBy=multi-user.target
Alias=sshd.service
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 cat: This is a command used in Unix-like operating systems to concatenate and display the contents of files. When used with systemctl, it's used to display the contents of a unit file.
 sshd.service: This is the name of the service unit file that you want to view. In this case, it refers to the SSH (Secure Shell) daemon service unit file, which contains configuration information for the SSH service.
""",
    ],
    command_options=[
        """
 -h, --help: Displays a help message explaining how to use the systemctl command and its options.
 --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


list_dependencies_systemctl = CommandGenerator.CommandGenerator(
    action=' list all the dependencies of the service and confirm if they are all running',
    correct_command='systemctl list-dependencies sshd.service',
    hint='Hint: Use "systemctl list-dependencies sshd.service" to list all the dependencies of the service and confirm if they are all running',
    command_output=[
        """
sshd.service
● ├─system.slice
● ├─network.target
● └─sysinit.target
●   ├─systemd-journal-flush.service
●   ├─systemd-tmpfiles-setup.service
●   ├─local-fs.target
●   │ ├─boot.mount
●   │ ├─systemd-fsck@dev-disk-by\\x2duuid-8c2238db\\x2d0d6d\\x2d495e\\x2d8cd9\\x2d47e8c8584e2d.service
●   │ └─systemd-fsck@dev-disk-by\\x2duuid-8c2238db\\x2d0d6d\\x2d495e\\x2d8cd9\\x2d47e8c8584e2d.service
●   ├─swap.target
●   └─basic.target

""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 list-dependencies: This is an argument passed to the systemctl command. It tells systemd to list the dependencies of a specific service.
 sshd: This is the name of the service for which you want to list the dependencies. In this case, it refers to the SSH (Secure Shell) daemon service, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- --all: Shows all units and their dependencies, even inactive ones.
- --reverse: Shows reverse dependencies, i.e., units that depend on the specified unit.
- --plain: Uses plain output format without any indentation or special characters.
---order: Shows dependencies in a topological order.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


mask_systemctl = CommandGenerator.CommandGenerator(
    action='completely disable a service (stops from starting up with the system and being started by a user)',
    correct_command='systemctl mask sshd.service',
    hint='Hint: Use "systemctl mask sshd.service" to completely disable a service (stop it from starting up with the system and being started by a user)',
    command_output=[
        """
If the command executes successfully, it may not produce any output.
However, if there are any errors or warnings related to the reload process, they will typically be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 mask: This is an argument passed to the systemctl command. It tells systemd to mask (disable) a specific service.
 sshd.service: This is the name of the service that you want to mask. In this case, it refers to the SSH (Secure Shell) daemon service, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- --now: Masks the unit immediately and stops it if it is currently running.
- --runtime: Specifies that the unit shall be masked only for the runtime of the next boot.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


unmask_systemctl = CommandGenerator.CommandGenerator(
    action='re-enable the service',
    correct_command='systemctl unmask sshd.service',
    hint='Hint: Use "systemctl unmask sshd.service" to re-enable the service',
    command_output=[
        """
If the command executes successfully, it may not produce any output.
However, if there are any errors or warnings related to the reload process, they will typically be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command used in Linux distributions that use systemd as their init system. Systemd is responsible for managing various aspects of the operating system, including services.
 unmask: This is an argument passed to the systemctl command. It tells systemd to unmask (enable) a specific service.
 sshd.service: This is the name of the service that you want to unmask. In this case, it refers to the SSH (Secure Shell) daemon service, which is responsible for providing secure shell access to the system.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message explaining how to use the systemctl command and its options.
- --root: Specifies an alternative root directory.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
