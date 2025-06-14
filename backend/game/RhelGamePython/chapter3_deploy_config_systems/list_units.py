import chapter7_users_groups.CommandGenerator as CommandGenerator

list_units = CommandGenerator.CommandGenerator(
    action='List all of the currently loaded targets units',
    correct_command='systemctl list-units --type target',
    hint='Hint: Use " systemctl list-units --type target" to find out default boot target',
    command_output=[
        """\nUNIT                   LOAD   ACTIVE SUB    DESCRIPTION
basic.target           loaded active active Basic System
cryptsetup.target      loaded active active Local Encrypted Volumes
getty.target           loaded active active Login Prompts
graphical.target       loaded active active Graphical Interface
local-fs.target        loaded active active Local File Systems
multi-user.target      loaded active active Multi-User System
network-online.target  loaded active active Network is Online
network.target         loaded active active Network
nss-user-lookup.target loaded active active User and Group Name Lookups
paths.target           loaded active active Paths
remote-fs.target       loaded active active Remote File Systems
rescue.target          loaded active active Rescue Mode
slices.target          loaded active active Slices
sockets.target         loaded active active Sockets
sound.target           loaded active active Sound Card
swap.target            loaded active active Swap
sysinit.target         loaded active active System Initialization
time-sync.target       loaded active active System Time Synchronized
timers.target          loaded active active Timers
""",],
    command_aspects=[
        "- systemctl: This is the main command-line utility used to control systemd, the init system used by many modern Linux distributions. It allows users to manage system services, units, and other aspects of the system's behavior.",
        "- list-units: This is the subcommand of systemctl used to list systemd units.",
        "- --type target: This option specifies that we only want to list units of the target type. Targets in systemd are similar to runlevels in traditional SysVinit systems. They represent a specific system state or set of services that should be reached."
    ],
    command_options=[
        "--all (-a): Show all units (including inactive units).",
        "--full: Enable full output, which shows all columns for unit properties.",
        "--no-legend: Suppress the header line showing the units' properties.",
        "--no-ask-password: Do not query the user for authentication for password-protected systemd units.",
    ],
    intro_text=[''],
    outro_text=[''],
)
list_units.execute()
