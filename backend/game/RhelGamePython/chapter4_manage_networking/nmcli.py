import chapter7_users_groups.CommandGenerator as CommandGenerator


nmcli_device = CommandGenerator.CommandGenerator(
    action='list all available network devices',
    correct_command='nmcli device show',
    hint='Hint: Use "nmcli device show" to list all available network devices',
    command_output=[
        """
GENERAL.DEVICE: wlan0
GENERAL.TYPE: wifi
GENERAL.HWADDR: 12:34:56:78:9A:BC
GENERAL.MTU: 1500
GENERAL.STATE: connected
GENERAL.CONNECTION: My_WiFi_Network
GENERAL.CON-PATH: /org/freedesktop/NetworkManager/ActiveConnection/1
IP4.ADDRESS[1]: 192.168.1.2/24
IP4.GATEWAY: 192.168.1.1
IP4.DNS[1]: 8.8.8.8
IP4.DNS[2]: 8.8.4.4

GENERAL.DEVICE: eth0
GENERAL.TYPE: ethernet
GENERAL.HWADDR: 12:34:56:78:9A:BD
GENERAL.MTU: 1500
GENERAL.STATE: disconnected
""",
    ],
    command_aspects=[
        """
 nmcli: This is the command-line tool used to interact with NetworkManager, which is a network management daemon for Linux.
 device: This is a subcommand of nmcli used to manage network devices.
 show: This is an option or argument provided to the device subcommand, indicating that we want to display information about network devices.
""",
    ],
    command_options=[
        """
- show: Displays detailed information about network devices, including their names, types, states, IP addresses, and connection statuses.
- status: Shows the status of all network devices, indicating whether they are connected or disconnected.
- reapply: Reapplies the current connection configuration to the specified device. Useful for applying changes or troubleshooting network connections.
- disconnect: Disconnects the specified network device from its current connection.
- wifi: Provides additional options specific to Wi-Fi devices, such as scanning for available networks or connecting to a Wi-Fi network.
- ethernet: Offers additional options specific to Ethernet devices, such as configuring Ethernet connections or managing Ethernet interfaces.
- set: Modifies properties of a network device, allowing you to change configuration settings such as MTU (Maximum Transmission Unit) or DHCP settings.
- list: Lists available network devices along with their basic information, such as names and types.
- monitor: Monitors state changes of network devices in real-time, providing updates on connection status changes or network events.
- show-long: Displays detailed information about network devices, providing more comprehensive output compared to the standard "show" option.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

nmcli_connection = CommandGenerator.CommandGenerator(
    action='list all available connections',
    correct_command='nmcli connection show',
    hint='Hint: Use "nmcli connection show" to list all available connections',
    command_output=[
        """
NAME                UUID                                  TYPE      DEVICE  
Wired connection 1  01234567-89ab-cdef-0123-456789abcdef  ethernet  eth0    
Wi-Fi connection    98765432-fedc-ba98-7654-3210fedcba98  wifi      wlan0   
""",
    ],
    command_aspects=[
        """
 nmcli: This is the command-line tool used to interact with NetworkManager, the network management daemon for Linux.
 connection: This is a subcommand of nmcli used to manage network connections.
 show: This is an option or argument provided to the connection subcommand, indicating that we want to display information about network connections.
""",
    ],
    command_options=[
        """
- add: Adds a new connection.
	# nmcli connection add con-name eth0 ifname enp0s8 type ethernet ip4 10.0.2.16/24 gw4 10.0.2.2
- modify: Modifies an existing connection.
	# nmcli connection modify eth0 ipv4.address 10.0.2.15/24
	# nmcli connection modify eth0 ipv4.gateway 10.0.2.2

- delete: Deletes a connection.
	# nmcli connection delete enp0s3

- up: Brings up a connection.
	# nmcli connection up eth0	

- down: Brings down a connection.
	# nmcli connection down eth0

- show: Shows details of one or all connections.
- reload: Reloads connections from disk.
- load: Loads connection profiles from files.
- export: Exports connections to a file.
- import: Imports connections from a file.
""",
        """
The same commands apply for ipv6
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
