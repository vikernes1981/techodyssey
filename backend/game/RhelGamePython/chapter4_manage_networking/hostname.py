import chapter7_users_groups.CommandGenerator as CommandGenerator

hostname = CommandGenerator.CommandGenerator(
    action="get machine's short name",
    correct_command='hostname',
    hint="Hint: Use 'hostname' to get machine's short name",
    command_output=[
        """
your-hostname
""",
    ],
    command_aspects=[
        """
When you run the hostname command without any options or arguments,
it simply outputs the current hostname of the system.
""",
    ],
    command_options=[
        """
- -f, --fqdn, --long: Display the FQDN (Fully Qualified Domain Name) of the system. This includes the hostname along with the domain name.
- -s, --short: Display only the short hostname, without the domain name.
- -d, --domain: Display only the domain name, without the hostname.
- -i, --ip-address: Display the IP address(es) associated with the system's hostname. This can be useful for obtaining the IP address without using tools like ifconfig or ip addr.
- -h, --help: Display help information about the hostname command and its options.
- -V, --version: Display version information about the hostname command.
""",
        """
Setting the Hostname:
You can also use the hostname command to set the hostname of the system. This is typically done by providing the desired hostname as an argument to the command, like so:

hostname new-hostname

This command sets the hostname of the system to "new-hostname". However, please note that this change is not persistent across reboots unless additional steps are taken to ensure it.

Hostname File (/etc/hostname):
On many Linux distributions, the hostname is stored in the /etc/hostname file. This file contains a single line with the hostname. When the system boots, it reads the hostname from this file and sets it accordingly.

Network Configuration:
The hostname is also used in network configuration. It's part of the Fully Qualified Domain Name (FQDN) of the system, which includes the hostname along with the domain name. The hostname is typically used to identify the system on a local network.

Hostnames in Shell Prompts:
The hostname is often included in shell prompts to provide context about the system you're currently working on. For example, the default shell prompt might include the hostname along with the current directory.

# hostnamectl	Force update on hostname
""",
        """
DNS or Domain Name Servers are special servers that provide resolution of a FQDN to an IP address.
This allows to have the added benefit of not having to type in the IP address every time you want to connect to a network device.

cat /etc/resolv.conf	See the current configured DNS servers
nmcli con mod eth0 ipv4.dns "8.8.8.8,  8.8.4.4" : Add/update the DNS servers on an interface (this example eth0)
nmcli con reload : Force read new configuration
systemctl restart NetworkManager : Force read new configuration
""",
        """
vim /etc/hosts	---
172.28.18.3 RHEL8.local RHEL8 :	Example entry
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
