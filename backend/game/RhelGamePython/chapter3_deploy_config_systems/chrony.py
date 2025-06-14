import chapter7_users_groups.CommandGenerator as CommandGenerator

chrony_install = CommandGenerator.CommandGenerator(
    action='install Chrony NTP package',
    correct_command='dnf install chrony',
    hint='Hint: Use "dnf install chrony" to install chrony',
    command_output=[
        """
Dependencies resolved.
================================================================================
 Package        Architecture   Version               Repository            Size
================================================================================
Installing:
 chrony         x86_64         <version_number>      <repository>          <size>

Transaction Summary
================================================================================
Install  1 Package

Total download size: <download_size>
Installed size: <installed_size>

Downloading Packages:
[Downloading progress]

Installed:
  chrony.x86_64 <version>

Complete!
""",
    ],
    command_aspects=[
        """
 dnf: This is the package manager used in certain Linux distributions, such as Fedora, CentOS, and RHEL (Red Hat Enterprise Linux).
 install: This is the action being performed by the package manager. In this case, it's instructing DNF to install a package.
 chrony: This is the name of the package that we want to install. In this case, it's Chrony, which is a software package used for network time synchronization.
""",
    ],
    command_options=[
        """
- -y, --assumeyes: This option automatically answers "yes" to any prompts that would normally require user input, allowing the installation to proceed without manual confirmation.
- --nobest: By default, DNF will install the "best" available version of a package based on dependencies and other factors. This option disables that behavior.
- --allowerasing: This option allows DNF to remove installed packages if necessary to satisfy dependencies for the package being installed.
- --enablerepo=REPOID: This option allows you to enable a specific repository to install the package from.
- --disablerepo=REPOID: This option allows you to disable a specific repository from which you don't want to install packages.
"""
    ],
    intro_text=['',],
    outro_text=['',],
)

chrony_enable = CommandGenerator.CommandGenerator(
    action='enable chrony to start after boot',
    correct_command='systemctl enable chronyd',
    hint='Hint: Use "systemctl enable chronyd" to enable chrony to start after boot',
    command_output=[
        """
Created symlink /etc/systemd/system/multi-user.target.wants/chronyd.service → /usr/lib/systemd/system/chronyd.service.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command-line utility used to control the systemd system and service manager. It allows you to start, stop, enable, disable, and otherwise manage system services.
 enable: This is the action being performed by systemctl. In this case, it's instructing systemd to enable a service, which means configuring it to start automatically at boot time.
 chronyd: This is the name of the service that we want to enable. In this case, it's Chrony daemon (chronyd), which is responsible for network time synchronization.
"""
    ],
    command_options=[
        """
The systemctl enable command doesn't have many options, but you can combine it with some common flags to control its behavior. Here are some options you might use with systemctl enable chronyd:
- --now: This option not only enables the service but also starts it immediately after enabling.
- --runtime: This option enables the service only for the current runtime session, without affecting the system's behavior at boot time.
- --root=PATH: This option allows you to specify an alternative root directory. Useful when operating on a different root filesystem for system recovery or maintenance purposes.
- --force: This option forcefully enables the service, even if it's a masked unit or lacks certain dependencies. Use with caution.
"""
    ],
    intro_text=['',],
    outro_text=['',],
)


chrony_client = CommandGenerator.CommandGenerator(
    action='turn chrony into NTP client',
    correct_command='allow 192.168.0.5/24',
    hint='Hint: Use "allow 192.168.0.5/24" to turn chrony into NTP client.',
    command_output=[
        """
There is no output for this.To turn Chrony into the NTP client add the following line into the main Chrony /etc/chrony.conf configuration file.
Change the IP address accordingly to point to your local Chrony NTP server
""",
    ],
    command_aspects=['',],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)

crony_server = CommandGenerator.CommandGenerator(
    action='turn chrony into NTP server',
    correct_command='server 192.168.0.5',
    hint='Hint: Use "server 192.168.0.5" to turn chrony into NTP server',
    command_output=[
        """
There is no output for this.To turn Chrony into the NTP client add the following line into the main Chrony /etc/chrony.conf configuration file.
Change the IP address accordingly to point to your local Chrony NTP server
""",
    ],
    command_aspects=['',],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)

chrony_restart = CommandGenerator.CommandGenerator(
    action='restart chrony service',
    correct_command='systemctl restart chronyd',
    hint='Hint: Use "systemctl restart chronyd" to restart chronyd',
    command_output=[
        """
● chronyd.service - NTP client/server
   Loaded: loaded (/usr/lib/systemd/system/chronyd.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2024-03-06 12:15:38 UTC; 2s ago
 Main PID: 12345 (chronyd)
    Tasks: 1 (limit: 12345)
   Memory: 2.9M
   CGroup: /system.slice/chronyd.service
           └─12345 /usr/sbin/chronyd -f /etc/chrony.conf

Mar 06 12:15:38 yourhostname systemd[1]: Starting NTP client/server...
Mar 06 12:15:38 yourhostname chronyd[12345]: chronyd version X.XX starting (+CMDMON +NTP +REFCLOCK +RTC +PRIVDROP +SCFILTER +SIGND +ASYNCDNS +SECHASH +IPV6 +DEBUG)
Mar 06 12:15:38 yourhostname chronyd[12345]: Frequency XXXXXX.XXXXXX from <source>
Mar 06 12:15:38 yourhostname systemd[1]: Started NTP client/server.
""",
    ],
    command_aspects=[
        """
 systemctl: This is a command-line utility used to control the systemd system and service manager.
 restart: This is the action being performed by systemctl. In this case, it's instructing systemd to restart a service.
 chronyd: This is the name of the service that we want to restart. In this case, it's the Chrony daemon (chronyd), which is responsible for network time synchronization.
""",
    ],
    command_options=[
        """
- --no-block: This option tells systemd not to wait until the service has completely started before returning control to the terminal. It allows the command to return immediately after starting the service.
- --force: This option forcefully restarts the service, even if it's in a failed state or if there are other issues.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

chrony_sources = CommandGenerator.CommandGenerator(
    action='check for NTP server sources. Your local NTP server should be listed',
    correct_command='chronyc sources',
    hint='Hint: Use "chronyc sources" to check for NTP servers',
    command_output=[
        """
210 Number of sources = 4
MS Name/IP address         Stratum Poll Reach LastRx Last sample
===============================================================================
^+ time.nist.gov                1   6   377   263   -101us[ -101us] +/-  145ms
^* time.cloudflare.com          1   6   377   206   -143us[ -143us] +/-  112ms
^- ntp.ubuntu.com               2   6   377   201   -114us[ -113us] +/-  123ms
^- pool.ntp.org                 2   6   377   192   -125us[ -125us] +/-  126ms
""",
    ],
    command_aspects=[
        """
 chronyc: This is the command-line interface for interacting with the Chrony daemon, which is responsible for network time synchronization.
 sources: This is a subcommand of chronyc. When you run chronyc sources, it instructs the Chrony daemon to display information about the current sources from which it's obtaining time synchronization.
""",
    ],
    command_options=[
        """
- -v, --verbose: Provides a more detailed output, including additional information about the sources.
- -n, --numeric: Displays numeric IP addresses instead of resolving them to hostnames.
- -c, --compact: Displays the output in a compact format, which can be easier to parse.
- -l, --list: Lists all configured sources, including sources that are not currently being used for synchronization.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


chrony_clients = CommandGenerator.CommandGenerator(
    action='check NTP client list on the NTP server',
    correct_command='chronyc clients',
    hint='Hint: Use "chronyc clients" to check NTP client list',
    command_output=[
        """
Hostname                      IP Address              Version     RTC   Plot
===============================================================================
client1.example.com          192.168.1.10            4           -      *
client2.example.com          192.168.1.20            4           -      -
""",
    ],
    command_aspects=[
        """
 chronyc: This is the command-line interface for interacting with the Chrony daemon.
 clients: This is a subcommand of chronyc. When you run chronyc clients, it instructs the Chrony daemon to display information about the clients that are currently connected to it.
""",
    ],
    command_options=[
        """
- -v, --verbose: Provides more detailed output, including additional information about the clients.
- -n, --numeric: Displays numeric IP addresses instead of resolving them to hostnames.
- -c, --compact: Displays the output in a compact format, which can be easier to parse.
- -l, --list: Lists all configured clients, including those not currently connected.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


chrony_firewall = CommandGenerator.CommandGenerator(
    action='add NTP service in firewall rules',
    correct_command='firewall-cmd --permanent --add-service=ntp',
    hint='Hint: Use "firewall-cmd --permanent --add-service=ntp" to add NTP service in firewall rules',
    command_output=[
        """
success
""",
        """
Always after any changes on firewall-cmd do firewall-cmd --reload 
to reload the firewall so that changes are accepted
""",
    ],
    command_aspects=[
        """
 firewall-cmd: This is the command-line utility used to interact with the firewalld firewall daemon on systems running firewalld.
 --permanent: This option specifies that the firewall rule should be applied permanently. Permanent changes made with this option will persist across firewall reloads or system reboots.
 --add-service=ntp: This option adds the specified service (in this case, NTP) to the firewall rules. It configures the firewall to allow incoming network traffic associated with the NTP service.
""",
    ],
    command_options=[
        """
- --zone=ZONE: Specifies the zone to which the rule should be added.
- --remove-service=SERVICE: Removes the specified service from the firewall rules.
- --list-services: Lists all the services allowed through the firewall.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


general_commands = CommandGenerator.CommandGenerator(
    action='show time/date',
    correct_command='date',
    hint='Hint: Use "date" to show time/date',
    command_output=[
        """
Sa 16. Mar 19:28:51 CET 2024
""",
    ],
    command_aspects=[
        """
 Day of the Week: The day of the week is often abbreviated to three letters (e.g., Mon, Tue, Wed, etc.). It indicates the current day in the week.
 Month: The month is usually displayed as its full name or abbreviated to three letters (e.g., January, Jan, February, Feb, etc.). It represents the current month.
 Day of the Month: This component indicates the numerical day of the month (e.g., 1, 2, 3, ..., 31), representing the current day within the month.
 Time (Hour:Minute:Second): This component represents the current time in hours, minutes, and seconds. It's typically displayed in the format HH:MM:SS (24-hour format).
 Timezone: The timezone component indicates the current timezone in which the system is operating. It may be displayed as an abbreviation (e.g., UTC, PST, EST) or as an offset from UTC (e.g., +0300).
 Year: The year component represents the current year (e.g., 2022, 2023, etc.).
"""
    ],
    command_options=[
        """
- date +%d%m%y-%H%M%S: use date to print out the current date and time in a particular format you can use the date variable
- touch logfile-date +%d%m%y-%H%M%S.log: This can be used in a script to produce a new log file name everytime the script is run
- -d, --date=STRING: Display the date and time specified by STRING.
- -I[FMT], --iso-8601[=FMT]: Display date and time in ISO 8601 format. If FMT is specified, use it as the format string; otherwise, use the default format.
- -R, --rfc-email: Output date and time in RFC 5322 email format.
- -u, --utc, --universal: Display or set Coordinated Universal Time (UTC) instead of the local time.
- --help: Display help message and exit.
- --version: Display version information and exit.
- +%FORMAT: Specify a custom format for the output. Replace FORMAT with a format string containing format specifiers.
- -s, --set=STRING: Set the system date and time to the specified STRING.
- --rfc-3339=TIMESPEC: Output date and time in RFC 3339 format. TIMESPEC can be 'date', 'seconds', or 'ns' for date and time, seconds since the Unix epoch, or nanoseconds since the Unix epoch, respectively.
- +%s: Output the current time in seconds since the Unix epoch.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

hwclock = CommandGenerator.CommandGenerator(
    action='get current hardware clock time',
    correct_command='hwclock',
    hint='Hint: Use "hwclock" to get current hardware clock time',
    command_output=[
        """
2024-03-16 19:37:57.364266+01:00
""",
    ],
    command_aspects=[
        """
 hwclock command is used to read the hardware clock of the system.
 The hardware clock is a battery-powered clock built into the computer's 
 motherboard that keeps track of time even when the system is powered off.
 When invoked without options, hwclock reads the hardware clock and displays its value.
""",
    ],
    command_options=[
        """
- -r, --show: Displays the current time stored in the hardware clock.
- -w, --systohc: Writes the current system time to the hardware clock.
- -s, --hctosys: Sets the system time from the hardware clock.
- -u, --utc: Specifies that the hardware clock is in UTC (Coordinated Universal Time).
- -l, --localtime: Specifies that the hardware clock is in local time.
- -z, --timezone TZ: Specifies the timezone to use when displaying or setting the hardware clock time.
- -f FILE, --file FILE: Specifies a file containing the time value to set the hardware clock.
- -a, --adjust: Adjusts the time from the hardware clock to compensate for systematic drift.
- -t, --test: Tests whether the hardware clock is functioning properly.
- -i, --show-drift: Displays the estimated drift rate of the hardware clock.
- -v, --verbose: Provides verbose output, including debugging information.
- --systz: Sets the system time zone from the hardware clock's time zone.
- --noadjfile: Disables the use of the adjtime file for maintaining time adjustments.
- --noadjfile_set: Disables the use of the adjtime file for setting time adjustments.
- -h, --help: Displays help information about hwclock command options.
- -V, --version: Displays the version information of hwclock.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

timedatectl = CommandGenerator.CommandGenerator(
    action='see the current time and timezone information',
    correct_command='timedatectl',
    hint='Hint: Use "timedatectl" to see the current time and timezone information',
    command_output=[
        """
               Local time: Sa 2024-03-16 19:44:17 CET
           Universal time: Sa 2024-03-16 18:44:17 UTC
                 RTC time: Sa 2024-03-16 18:44:17
                Time zone: Europe/Berlin (CET, +0100)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no
""",
    ],
    command_aspects=[
        """
    Display Current Date and Time:
    When invoked without options, timedatectl displays the current system date, time, and related settings.

    Display Timezone:
    The timedatectl command can be used to display the configured timezone of the system. This includes the timezone name, abbreviation, and offset from UTC.

    Set Timezone:
    You can use timedatectl to set the system's timezone. This changes the timezone used for displaying and interpreting time-related information.

    Enable/Disable Network Time Synchronization:
    timedatectl allows you to enable or disable network time synchronization using NTP (Network Time Protocol). Enabling NTP ensures that the system's time is synchronized with an external time server over the network.

    Set NTP Servers:
    You can configure timedatectl to use specific NTP servers for time synchronization. This allows you to specify custom time servers if needed.

    Set Local RTC Time:
    timedatectl can be used to set the system's real-time clock (RTC) to either UTC or local time. This affects how the hardware clock maintains time when the system is powered off.

    Display Local RTC Time Setting:
    You can query timedatectl to display whether the system's RTC is set to UTC or local time.

    Set Time and Date:
    timedatectl provides options to set the system's time and date directly. This allows for manual adjustments if needed.

    Enable/Disable Automatic Timezone Updates:
    On some distributions, timedatectl allows you to enable or disable automatic timezone updates. When enabled, the system automatically adjusts the timezone based on location changes.

    Display Detailed System Clock Information:
    timedatectl can provide detailed information about the system clock, including its accuracy, time zone, and whether NTP synchronization is enabled.

    Set Local Time
    You can use timedatectl to set the system's clock to a specific local time. This is particularly useful when dual-booting with other operating systems that expect the hardware clock to be in local time.
""",
    ],
    command_options=[
        """
 status: Displays the current system time, time zone, RTC time, NTP synchronization status, and other related information.
 set-time 2020-18-03: Sets the system time to the specified TIME. The format for TIME can be in various formats, including "YYYY-MM-DD HH:MM:SS" or "now".
 set-timezone Australia/Melbourne: Sets the system time zone to the specified ZONE. For example, America/New_York.
 list-timezones: Lists all available time zones.
 set-local-rtc BOOL: Sets whether the system's real-time clock (RTC) is in local time (yes) or UTC (no).
 set-ntp BOOL: Enables (true) or disables (false) NTP (Network Time Protocol) synchronization.
 show-local-rtc: Displays whether the system's RTC is in local time or UTC.
 show-ntp: Displays whether NTP synchronization is enabled or disabled.
 show-time: Displays the current system time.
 show-timezone: Displays the current system time zone.
 set-local-rtc: Sets whether the hardware clock is in local time or UTC.
 set-ntp yes: Enables or disables NTP time synchronization.
 set-time 10:26:00: Sets the system time.
 set-timezone: Sets the system time zone.
 help: Displays help information.
 version: Displays version information.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
