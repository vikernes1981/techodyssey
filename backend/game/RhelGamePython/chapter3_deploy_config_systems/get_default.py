import chapter7_users_groups.CommandGenerator as CommandGenerator

get_default = CommandGenerator.CommandGenerator(
    action='get default boot target',
    correct_command='systemctl get-default',
    hint='Hint: Use "systemctl get-default" to find out default boot target',
    command_output=['graphical.target',],
    command_aspects=[
        "- systemctl: This is the main command-line utility used to control systemd, the init system used by many modern Linux distributions. It allows users to manage system services, units, and other aspects of the system's behavior.",
        "- get-default: This is the subcommand of systemctl. It instructs systemctl to retrieve information about the default target of the system. The default target, also known as the default runlevel, is the systemd target that defines the initial system state during boot-up.",
    ],
    command_options=[
        "The systemctl get-default command doesn't have any specific options. It's a simple command used to retrieve the default target (runlevel) of the system. Therefore, you just use it as is without any additional flags or options.",],
    intro_text=[''],
    outro_text=[''],
)

set_default = CommandGenerator.CommandGenerator(
    action='set default boot target',
    correct_command='systemctl set-default multi-user.target',
    hint='Hint: Use "systemctl set-default multi-user.target" to set default boot target',
    command_output=["The command output would typically be empty if successful. If there's an error, such as invalid syntax or permission issues, an error message will be displayed indicating the problem."],
    command_aspects=[
        "- systemctl: This is the main command-line utility used to control systemd, the init system used by many modern Linux distributions. It allows users to manage system services, units, and other aspects of the system's behavior.",
        "- set-default: This is the subcommand of systemctl used to set the default target (runlevel) of the system.",
        "- multi-user.target: This is the target (runlevel) that we are setting as the default. In this case, multi-user.target represents a non-graphical, multi-user environment. It typically includes essential system services needed for a multi-user, non-graphical environment"
    ],
    command_options=[
        "- The systemctl set-default command itself does not have additional options. However, you can specify a different target instead of multi-user.target according to your system's requirements.",
        "- systemctl set-default graphical.target : set the default target to a graphical environment",
        "- systemctl set-default rescue.target :  set to a rescue mode for system recovery purposes",
    ],
    intro_text=[''],
    outro_text=[''],
)
