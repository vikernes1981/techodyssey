import chapter7_users_groups.CommandGenerator as CommandGenerator


### Na ta spase se perissotera functions!? ###

firewall_cmd_state = CommandGenerator.CommandGenerator(
    action='display the current state of the firewall',
    correct_command='firewall-cmd --state',
    hint='Hint: Use "firewall-cmd --state" to display the current state of the firewall',
    command_output=[
        """
running
""",
    ],
    command_aspects=[
        """
 firewall-cmd: This is the command-line tool used to interact with the firewalld firewall management service on Linux systems.
 --state: This is an option provided to the firewall-cmd command, indicating that we want to check the current state of the firewall.
""",
    ],
    command_options=[
        """
- --state: Displays the current state of the firewall.
- --list-all: Lists all rules and zones currently configured.
- --get-default-zone: Displays the default zone.
- --set-default-zone=<zone>: Sets the default zone.
- --get-active-zones: Lists all zones and interfaces associated with them.
- --get-zones: Lists all available zones.
- --zone=<zone>: Specifies the zone to work with.
- --add-service=<service>: Opens ports for a service.
- --remove-service=<service>: Closes ports for a service.
- --add-port=<port>/tcp|udp: Opens a specific port.
- --remove-port=<port>/tcp|udp: Closes a specific port.
- --add-source=<source>: Allows traffic from a specific source IP address or network.
- --remove-source=<source>: Blocks traffic from a specific source IP address or network.
- --add-interface=<interface>: Assigns an interface to a zone.
- --remove-interface=<interface>: Removes an interface from a zone.
- --query-service=<service>: Checks if a service is enabled in the firewall configuration.
- --reload: Reloads the firewall configuration.
- --permanent: Makes changes permanent (requires a subsequent --reload).
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


firewall_cmd_add_service = CommandGenerator.CommandGenerator(
    action='opens ports for a service',
    correct_command='firewall-cmd --zone servers --add-service ssh --permanent',
    hint='Hint: Use "firewall-cmd --zone servers --add-service ssh --permanent" to open ports for a service',
    command_output=[
        """
If the command is successful, it typically doesn't produce any output. However, if there are errors or warnings, they will be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
 firewall-cmd: This is the command-line tool used to interact with the firewalld firewall management service on Linux systems.
 --zone servers: This option specifies the firewall zone to which the rule will be applied. In this case, it's specifying the "servers" zone.
 --add-service ssh: This option adds the SSH service to the specified zone's firewall rules. It allows incoming traffic on the SSH port (default is TCP port 22) through the firewall.
 --permanent: This option indicates that the change should be made permanently in the firewall configuration. It ensures that the rule persists even after a firewall reload or system reboot.
""",
    ],
    command_options=[
        """
- --state: Displays the current state of the firewall.
- --list-all: Lists all rules and zones currently configured.
- --get-default-zone: Displays the default zone.
- --set-default-zone=<zone>: Sets the default zone.
- --get-active-zones: Lists all zones and interfaces associated with them.
- --get-zones: Lists all available zones.
- --zone=<zone>: Specifies the zone to work with.
- --add-service=<service>: Opens ports for a service.
- --remove-service=<service>: Closes ports for a service.
- --add-port=<port>/tcp|udp: Opens a specific port.
- --remove-port=<port>/tcp|udp: Closes a specific port.
- --add-source=<source>: Allows traffic from a specific source IP address or network.
- --remove-source=<source>: Blocks traffic from a specific source IP address or network.
- --add-interface=<interface>: Assigns an interface to a zone.
- --remove-interface=<interface>: Removes an interface from a zone.
- --query-service=<service>: Checks if a service is enabled in the firewall configuration.
- --reload: Reloads the firewall configuration.
- --permanent: Makes changes permanent (requires a subsequent --reload).
"""
    ],
    intro_text=['',],
    outro_text=['',],
)

firewall_cmd_add_port = CommandGenerator.CommandGenerator(
    action='add a individual port to the whitelist',
    correct_command='firewall-cmd --add-port 8080/tcp --permanent',
    hint='Hint: Use "firewall-cmd --add-port 8080/tcp --permanent" to add an individual port to the whitelist',
    command_output=[
        """
If the command is successful, it typically doesn't produce any output. However, if there are errors or warnings, they will be displayed in the terminal.
""",
    ],
    command_aspects=[
        """
 firewall-cmd: This is the command-line tool used to interact with the firewalld firewall management service on Linux systems.
 --add-port 8080/tcp: This option adds a rule to open TCP port 8080 in the firewall configuration. Specifically, it opens port 8080 for TCP traffic.
 --permanent: This option indicates that the change should be made permanently in the firewall configuration. It ensures that the rule persists even after a firewall reload or system reboot.
""",
    ],
    command_options=[
        """
- --state: Displays the current state of the firewall.
- --list-all: Lists all rules and zones currently configured.
- --get-default-zone: Displays the default zone.
- --set-default-zone=<zone>: Sets the default zone.
- --get-active-zones: Lists all zones and interfaces associated with them.
- --get-zones: Lists all available zones.
- --zone=<zone>: Specifies the zone to work with.
- --add-service=<service>: Opens ports for a service.
- --remove-service=<service>: Closes ports for a service.
- --add-port=<port>/tcp|udp: Opens a specific port.
- --remove-port=<port>/tcp|udp: Closes a specific port.
- --add-source=<source>: Allows traffic from a specific source IP address or network.
- --remove-source=<source>: Blocks traffic from a specific source IP address or network.
- --add-interface=<interface>: Assigns an interface to a zone.
- --remove-interface=<interface>: Removes an interface from a zone.
- --query-service=<service>: Checks if a service is enabled in the firewall configuration.
- --reload: Reloads the firewall configuration.
- --permanent: Makes changes permanent (requires a subsequent --reload).
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

firewall_cmd_reload = CommandGenerator.CommandGenerator(
    action='reload the firewall configuration.',
    correct_command='firewall-cmd --reload',
    hint='Hint: Use "firewall-cmd --reload" to reload the firewall configuration',
    command_output=[
        """
Success
""",
    ],
    command_aspects=[
        """
 firewall-cmd: This is the command-line tool used to interact with the firewalld firewall management service on Linux systems.
 --reload: This option instructs firewalld to reload its configuration. When you execute this command, firewalld will re-read its configuration files and apply any changes that have been made since the last reload or restart.
""",
    ],
    command_options=[
        """
- --state: Displays the current state of the firewall.
- --list-all: Lists all rules and zones currently configured.
- --get-default-zone: Displays the default zone.
- --set-default-zone=<zone>: Sets the default zone.
- --get-active-zones: Lists all zones and interfaces associated with them.
- --get-zones: Lists all available zones.
- --zone=<zone>: Specifies the zone to work with.
- --add-service=<service>: Opens ports for a service.
- --remove-service=<service>: Closes ports for a service.
- --add-port=<port>/tcp|udp: Opens a specific port.
- --remove-port=<port>/tcp|udp: Closes a specific port.
- --add-source=<source>: Allows traffic from a specific source IP address or network.
- --remove-source=<source>: Blocks traffic from a specific source IP address or network.
- --add-interface=<interface>: Assigns an interface to a zone.
- --remove-interface=<interface>: Removes an interface from a zone.
- --query-service=<service>: Checks if a service is enabled in the firewall configuration.
- --reload: Reloads the firewall configuration.
- --permanent: Makes changes permanent (requires a subsequent --reload).
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
