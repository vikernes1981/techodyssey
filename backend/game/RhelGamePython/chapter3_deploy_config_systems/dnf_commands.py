import chapter7_users_groups.CommandGenerator as CommandGenerator

search_dnf = CommandGenerator.CommandGenerator(
    action='search the package repositories accessible to your system for any packages related to nano',
    correct_command='dnf search nano',
    hint='Hint: Use "dnf search nano" to search the package repositories accessible to your system for any packages related to nano',
    command_output=["""Last metadata expiration check: 0:01:27 ago on Fri 28 Feb 2024 10:00:22 AM EST.
========================================= Name Exactly Matched: nano ==========================================
nano.x86_64 : A small text editor

  Name and summary matches only, use "search all" for everything.
"""],
    command_aspects=[
        '- dnf: This is the package manager command-line tool used in Fedora and other distributions based on Red Hat. It stands for "Dandified YUM," where YUM is the Yellowdog Updater, Modified. dnf is used for installing, updating, and removing packages on the system.',
        '- search: This is an action verb used with dnf to search for packages within the configured repositories. It allows you to find packages based on a given search term.',
        '- nano: This is the search term specified in the command. It\'s the name of a specific package or a keyword used to find relevant packages. In this case, it refers to the nano text editor.',
    ],
    command_options=[
        '-i, --info: Provides detailed information about each matching package, including its description, size, and other attributes.',
        '--name: Searches only by package name, ignoring descriptions and summaries.',
        '--summary: Searches only within package summaries, ignoring package names and descriptions.',
        '--provides: Searches for packages that provide a certain capability or feature.',
        '--description: Searches only within package descriptions, ignoring names and summaries.',
    ],
    intro_text=['',],
    outro_text=['',],
)


list_dnf = CommandGenerator.CommandGenerator(
    action='list all installed packages on the system',
    correct_command='dnf list',
    hint='Hint: use "dnf list" to list all installed packages on the system',
    command_output=[
        """
Installed Packages
acl.x86_64                                  2.2.53-1.el8                             @rhel-8-for-x86_64-baseos-rpms
adwaita-icon-theme.noarch                   3.28.0-3.el8                             @anaconda
alsa-lib.x86_64                             1.2.2-1.el8                               @rhel-8-for-x86_64-appstream-rpms
alsa-tools-firmware.x86_64                  1.1.8-4.el8                               @rhel-8-for-x86_64-appstream-rpms
alsa-ucm.noarch                             1.2.2-1.el8                               @rhel-8-for-x86_64-appstream-rpms
alsa-utils.x86_64                           1.1.8-1.el8                               @rhel-8-for-x86_64-appstream-rpms
...
Available Packages
389-ds-base.x86_64                          1.4.3.16-16.module+el8.4.0+9933+ff16c3da  rhel-8-for-x86_64-appstream-rpms
389-ds-base-devel.x86_64                    1.4.3.16-16.module+el8.4.0+9933+ff16c3da  rhel-8-for-x86_64-appstream-rpms
389-ds-base-libs.x86_64                     1.4.3.16-16.module+el8.4.0+9933+ff16c3da  rhel-8-for-x86_64-appstream-rpms
389-ds-base-snmp.x86_64                     1.4.3.16-16.module+el8.4.0+9933+ff16c3da  rhel-8-for-x86_64-appstream-rpms
4pane.x86_64                                6.0-1.module+el8.4.0+8668+142d98c8         rhel-8-for-x86_64-appstream-rpms
aalib.x86_64                                1.4.0-0.38.rc5.el8                        rhel-8-for-x86_64-appstream-rpms
aarch64-linux-gnu-binutils.x86_64           2.31.1-37.el8                             rhel-8-for-x86_64-baseos-rpms
...

""",
    ],
    command_aspects=[
        '- dnf: This is the package management tool used in Fedora, RHEL, and other distributions. It stands for "Dandified YUM", a newer and improved version of the traditional Yellowdog Updater, Modified (YUM) package manager.',
        '- list: This is the action verb used with dnf to list packages. When you run dnf list, it displays a list of packages based on certain criteria.',
    ],
    command_options=[
        """
-a, --all: Shows all packages, including duplicates.
--installed: Shows only installed packages.
--available: Shows only available packages (not installed).
--refresh: Refreshes metadata before listing packages.
--disablerepo=: Disables specified repositories (can be used multiple times).
- groups list:  List all available package groups
- history list: List all of the actions completed using dnf

There are many more options, just use 'dnf --help'
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


info_dnf = CommandGenerator.CommandGenerator(
    action='get info about a package',
    correct_command='dnf info nano',
    hint='Hint: Use "dnf info nano" to get information about nano package',
    command_output=[
        """
Available Packages
Name         : nano
Epoch        : 3
Version      : 5.6
Release      : 1.fc34
Arch         : x86_64
Size         : 803 k
Source       : nano-5.6-1.fc34.src.rpm
Repository   : updates
Summary      : A small text editor
URL          : https://nano-editor.org/
License      : GPLv3+
Description  : GNU nano is a small and friendly text editor.
""",
    ],
    command_aspects=[
        """
- dnf: This is the package management tool used in Fedora, RHEL, and other distributions. It stands for "Dandified YUM," which is a newer and improved version of the traditional Yellowdog Updater, Modified (YUM) package manager.
- info: This is the action verb used with dnf to display detailed information about a specific package.
- nano: This is the name of the package for which you want to display information. In this case, it refers to the nano text editor.
""",
    ],
    command_options=[
        """
-q, --quiet: Suppresses output except for errors.
-v, --verbose: Increases verbosity, providing more detailed output.
--installed: Shows information only about installed packages.
--last: Shows information about the last package that was installed or updated.
--history: Shows information about packages in the transaction history.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

install_dnf = CommandGenerator.CommandGenerator(
    action='install packages in Red Hat',
    correct_command='dnf install nano',
    hint='Hint: Use "dnf install nano" to install nano on your system',
    command_output=[
        """
Last metadata expiration check: 0:15:36 ago on Tue 01 Mar 2024 09:00:02 AM EST.
Dependencies resolved.
================================================================================
 Package            Arch   Version            Repository                 Size
================================================================================
Installing:
 nano               x86_64 5.6-1.fc34         updates                   803 k
Installing dependencies:
 libfoo             x86_64 1.2.3-1.fc34       fedora                    100 k
Transaction Summary
================================================================================
Install  1 Package
Total download size: 903 k
Installed size: 2.0 M
Is this ok [y/N]: y
Downloading Packages:
(1/2): libfoo-1.2.3-1.fc34.x86_64.rpm       100 kB/s | 100 kB     00:01    
(2/2): nano-5.6-1.fc34.x86_64.rpm           300 kB/s | 803 kB     00:02    
--------------------------------------------------------------------------------
Total                                           200 kB/s | 903 kB     00:04     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1 
  Installing       : libfoo-1.2.3-1.fc34.x86_64                             1/2 
  Running scriptlet: libfoo-1.2.3-1.fc34.x86_64                             1/2 
  Installing       : nano-5.6-1.fc34.x86_64                                 2/2 
  Running scriptlet: nano-5.6-1.fc34.x86_64                                 2/2 
  Verifying        : libfoo-1.2.3-1.fc34.x86_64                             1/2 
  Verifying        : nano-5.6-1.fc34.x86_64                                 2/2 
Installed products updated.
Installed:
  nano-5.6-1.fc34.x86_64          libfoo-1.2.3-1.fc34.x86_64         

Complete!
""",
    ],
    command_aspects=[
        """
    dnf: This is the package management tool used in Fedora, RHEL, and other similar Linux distributions.
    install: This is the action verb used with dnf to install packages.
    nano: This is the name of the package you want to install. In this case, it refers to the nano text editor.
""",
    ],
    command_options=[
        """
-h, --help: Shows help message and exits.
-y, --assumeyes: Automatically answers "yes" to all questions; useful for scripting or automated installations.
--assumeno: Automatically answers "no" to all questions; useful for scripting or automated installations.
--best: Attempts to install the best available version of a package; useful for ensuring the highest available package version is installed.
--nobest: Prevents dnf from attempting to upgrade to the best available package version.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

remove_dnf = CommandGenerator.CommandGenerator(
    action='remove packages in Red Hat',
    correct_command='dnf remove nano',
    hint='Hint: Use "dnf remove nano" to remove nano on your system',
    command_output=[
        """
Removing:
 nano                                            x86_64                         5.6-1.fc34                           @updates                                2.0 M

Transaction Summary
================================================================================
Remove  1 Package

Freed space: 2.0 M
Is this ok [y/N]: y
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1 
  Erasing          : nano-5.6-1.fc34.x86_64                                  1/1 
  Running scriptlet: nano-5.6-1.fc34.x86_64                                  1/1 
  Verifying        : nano-5.6-1.fc34.x86_64                                  1/1 

Removed:
  nano-5.6-1.fc34.x86_64
Complete!
""",
    ],
    command_aspects=[
        """
    dnf: This is the package management tool used in Fedora, RHEL, and other similar Linux distributions.
    remove: This is the action verb used with dnf to remove packages.
    nano: This is the name of the package you want to remove. In this case, it refers to the nano text editor.
""",
    ],
    command_options=[
        """
-h, --help: Shows help message and exits.
-y, --assumeyes: Automatically answers "yes" to all questions; useful for scripting or automated removals.
--assumeno: Automatically answers "no" to all questions; useful for scripting or automated removals.
--allowerasing: Allows dnf to erase installed packages if necessary to satisfy dependencies during removal.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

provides_dnf = CommandGenerator.CommandGenerator(
    action='  find out what package provides a particular file',
    correct_command='dnf provides git',
    hint='Hint: Use "dnf provides git" to find which package provides the git command',
    command_output=[
        """
Last metadata expiration check: 0:01:23 ago on Thu 03 Mar 2024 12:00:00 PM UTC.
git-2.35.1-1.fc34.x86_64 : Fast Version Control System
Repo        : updates
Matched from:
Provide    : git = 2.35.1-1.fc34

git-2.35.0-1.fc34.x86_64 : Fast Version Control System
Repo        : updates
Matched from:
Provide    : git = 2.35.0-1.fc34
"""
    ],
    command_aspects=[
        """
    dnf: This is the package management tool used in Fedora, RHEL, and other similar Linux distributions.
    provides: This is the action verb used with dnf to search for packages that provide a specific capability.
    git: This is the capability or feature you're searching for. In this case, you're looking for packages that provide the git command or functionality.
""",
    ],
    command_options=[
        """
-h, --help: Shows help message and exits.
-q, --quiet: Suppresses output except for errors.
-v, --verbose: Increases verbosity, providing more detailed output.
--best: Considers only the best available package versions.
--all: Searches all enabled repositorie
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

localinstall_dnf = CommandGenerator.CommandGenerator(
    action='install local packages',
    correct_command='dnf localinstall nano.rpm',
    hint='Hint: Use "dnf localinstall nano.rpm" to install a local package',
    command_output=[
        """
Last metadata expiration check: 0:02:21 ago on Fri 04 Mar 2024 10:00:00 AM UTC.
Dependencies resolved.
================================================================================
 Package          Arch    Version           Repository                 Size
================================================================================
Installing:
 nano             x86_64  5.6-1.fc34        /path/to/nano.rpm          803 k
Transaction Summary
================================================================================
Install  1 Package
Total size: 803 k
Installed size: 2.0 M
Is this ok [y/N]: y
Downloading Packages:
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Preparing        :                                                        1/1 
  Installing       : nano-5.6-1.fc34.x86_64                                1/1 
  Running scriptlet: nano-5.6-1.fc34.x86_64                                1/1 
  Verifying        : nano-5.6-1.fc34.x86_64                                1/1 
Installed:
  nano-5.6-1.fc34.x86_64                           
Complete!
""",
    ],
    command_aspects=[
        """
- dnf: This is the package management tool used in Fedora, RHEL, and other similar Linux distributions.
- localinstall: This is a subcommand of dnf used to install packages that are available locally on your system, typically in RPM format.
- nano.rpm: This is the path to the RPM package you want to install. In this case, it refers to a package named nano.rpm located in the current directory.
""",
    ],
    command_options=[
        """
-h, --help: Displays help information about the dnf localinstall command and its options.
-y, --assumeyes: Automatically answers "yes" to all questions; useful for scripting or automated installations.
--assumeno: Automatically answers "no" to all questions; useful for scripting or automated installations.
--refresh: Forces dnf to refresh package metadata before installing the specified local RPM package; useful for ensuring that the latest package information is used.""",
    ],
    intro_text=['',],
    outro_text=['',],
)


group_install = CommandGenerator.CommandGenerator(
    action='install all packages in System tools package-group',
    correct_command='dnf group install "System Tools"',
    hint='Hint: Use "dnf group install \"System Tools\"" to install all packages in System tools package-group',
    command_output=[
        """
Last metadata expiration check: 0:10:23 ago on Tue 01 Mar 2024 10:00:00 AM UTC.
Dependencies resolved.
================================================================================
 Package                 Arch   Version                Repository         Size
================================================================================
Installing group/module packages:
 htop                    x86_64  3.0.5-1.fc34           updates           128 k
 iotop                   noarch  0.6-21.fc34            fedora             28 k
 mc                      x86_64  4.8.28-2.fc34          updates           2.0 M
 strace                  x86_64  5.16-1.fc34            updates           268 k

Transaction Summary
================================================================================
Install  4 Packages

Total download size: 2.4 M
Installed size: 8.2 M
Is this ok [y/N]: y
Downloading Packages:
(1/4): htop-3.0.5-1.fc34.x86_64.rpm        200 kB/s | 128 kB     00:00    
(2/4): iotop-0.6-21.fc34.noarch.rpm        100 kB/s |  28 kB     00:00    
(3/4): mc-4.8.28-2.fc34.x86_64.rpm         1.5 MB/s | 2.0 MB     00:01    
(4/4): strace-5.16-1.fc34.x86_64.rpm       500 kB/s | 268 kB     00:00    
--------------------------------------------------------------------------------
Total                                          1.0 MB/s | 2.4 MB     00:02     
Running transaction check
Transaction check succeeded
Running transaction test
Transaction test succeeded
Running transaction
  Preparing        :                                                        1/1 
  Installing       : strace-5.16-1.fc34.x86_64                               1/4 
  Installing       : iotop-0.6-21.fc34.noarch                                2/4 
  Installing       : mc-4.8.28-2.fc34.x86_64                                 3/4 
  Installing       : htop-3.0.5-1.fc34.x86_64                                4/4 
  Running scriptlet: mc-4.8.28-2.fc34.x86_64                                 4/4 
  Verifying        : htop-3.0.5-1.fc34.x86_64                                1/4 
  Verifying        : mc-4.8.28-2.fc34.x86_64                                 2/4 
  Verifying        : iotop-0.6-21.fc34.noarch                                3/4 
  Verifying        : strace-5.16-1.fc34.x86_64                               4/4 

Installed:
  htop-3.0.5-1.fc34.x86_64                iotop-0.6-21.fc34.noarch             
  mc-4.8.28-2.fc34.x86_64                 strace-5.16-1.fc34.x86_64             

Complete!
""",
    ],
    command_aspects=[
        """
- dnf: This is the package management tool used in Fedora, RHEL, and other similar Linux distributions.
- group: This is a subcommand of dnf used to manage package groups.
- install: This is the action verb used with dnf group to install packages belonging to a specific group.
- "System Tools": This is the name of the group you want to install packages from. In this case, it refers to the "System Tools" group, which typically includes various utilities and tools useful for system administration and maintenance.
""",
    ],
    command_options=[
        """
-h, --help: Displays help information about the dnf group install command and its options.
-y, --assumeyes: Automatically answers "yes" to all questions; useful for scripting or automated installations.
--assumeno: Automatically answers "no" to all questions; useful for scripting or automated installations.
--skip-broken: Skips packages that cannot be installed due to dependency issues.
--nobest: Skips installation of packages with versions lower than the best available version.
--allowerasing: Allows dnf to remove installed packages if necessary to satisfy dependencies during installation.
--with-optional: Includes optional packages in the installation process.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

group_remove = CommandGenerator.CommandGenerator(
    action='remove all all packages in System tools package-group',
    correct_command='dnf group remove "System Tools"',
    hint='Hint: Use "dnf group install \"System Tools\"" to install all packages in System tools package-group',
    command_output=[
        """
Removing group packages:
   htop
   iotop
   mc
   strace

Transaction Summary
================================================================================
Remove  4 Packages

Total freed space: 2.5 M
Is this ok [y/N]: y
Running transaction check
Transaction check succeeded
Running transaction test
Transaction test succeeded
Running transaction
  Erasing        : htop-3.0.5-1.fc34.x86_64                           1/4 
  Erasing        : iotop-0.6-21.fc34.noarch                           2/4 
  Erasing        : mc-4.8.28-2.fc34.x86_64                            3/4 
  Erasing        : strace-5.16-1.fc34.x86_64                          4/4 
  Running scriptlet: mc-4.8.28-2.fc34.x86_64                          4/4 
  Verifying      : htop-3.0.5-1.fc34.x86_64                           1/4 
  Verifying      : iotop-0.6-21.fc34.noarch                           2/4 
  Verifying      : mc-4.8.28-2.fc34.x86_64                            3/4 
  Verifying      : strace-5.16-1.fc34.x86_64                          4/4 

Removed:
  htop-3.0.5-1.fc34.x86_64                   iotop-0.6-21.fc34.noarch               
  mc-4.8.28-2.fc34.x86_64                    strace-5.16-1.fc34.x86_64               

Complete!
""",
    ],
    command_aspects=[
        """
- dnf: This is the package management tool used in Fedora, RHEL, and other similar Linux distributions.
- group: This is a subcommand of dnf used to manage package groups.
- remove: This is the action verb used with dnf group to remove packages belonging to a specific group.
- "System Tools": This is the name of the group from which you want to remove packages. In this case, it refers to the "System Tools" group, which typically includes various utilities and tools useful for system administration and maintenance.
""",
    ],
    command_options=[
        """
-h, --help: Displays help information about the dnf group install command and its options.
-y, --assumeyes: Automatically answers "yes" to all questions; useful for scripting or automated installations.
--assumeno: Automatically answers "no" to all questions; useful for scripting or automated installations.
--skip-broken: Skips packages that cannot be installed due to dependency issues.
--nobest: Skips installation of packages with versions lower than the best available version.
--allowerasing: Allows dnf to remove installed packages if necessary to satisfy dependencies during installation.
--with-optional: Includes optional packages in the installation process.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

redo_history = CommandGenerator.CommandGenerator(
    action='redo a particular action',
    correct_command='dnf history redo 1',
    hint='Hint: Use "dnf history redo 1" to re-do a particular action',
    command_output=[
        """
# dnf history redo 1
Last metadata expiration check: 0:08:15 ago on Tue 01 Mar 2024 09:24:52 PM UTC.
Dependencies resolved.
============================================================================================================
 Package                         Arch             Version                    Repository                Size
============================================================================================================
Installing:
 htop                            x86_64           3.1.1-2.fc34               updates                  131 k

Transaction Summary
============================================================================================================
Install  1 Package

Total download size: 131 k
Installed size: 316 k
Is this ok [y/N]: y
Downloading Packages:
htop-3.1.1-2.fc34.x86_64.rpm                                      138 kB/s | 131 kB     00:00    
------------------------------------------------------------------------------------------------------------
Total                                                                                   117 kB/s | 131 kB     00:01     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                    1/1 
  Installing       : htop-3.1.1-2.fc34.x86_64                                                          1/1 
  Running scriptlet: htop-3.1.1-2.fc34.x86_64                                                          1/1 
  Verifying        : htop-3.1.1-2.fc34.x86_64                                                          1/1 

Installed:
  htop-3.1.1-2.fc34.x86_64                                                                                 

Complete!
""",
    ],
    command_aspects=[
        """
- dnf: This is the package manager used in Fedora and other Red Hat-based Linux distributions. It stands for "Dandified Yum," which was the predecessor to DNF.
- history: This sub-command is used to view and manage the history of transactions (installations, updates, removals, etc.) performed by DNF. It allows you to see what changes have been made to the system via package management.
- redo: This action allows you to redo a specific transaction from the history. In this case, we're redoing transaction number 1. Redoing a transaction means repeating the actions that were performed during that transaction.
- 1: This is the transaction number. In the history list, each transaction has a unique number associated with it. We're specifying here that we want to redo transaction number 1.
""",
    ],
    command_options=[
        """
-h, --help       Show this help message and exit
-y, --assumeyes  Automatic yes to confirmation prompts
-q, --quiet      Do not print informational messages
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


undo_history = CommandGenerator.CommandGenerator(
    action='undo  a particular action',
    correct_command='dnf history undo 1',
    hint='Hint: Use "dnf history undo 1" to undo a particular action',
    command_output=[
        """
# dnf history undo 1
Undoing transaction 1, from Tue 01 Mar 2024 09:00:00 PM UTC
Removed:
  htop.x86_64 3.1.1-2.fc34
Transaction successfully undone.
""",
    ],
    command_aspects=[
        """
- dnf: This is the command-line package manager used in Fedora and other Linux distributions based on the Red Hat ecosystem. It stands for "Dandified Yum," which was a predecessor to DNF.
- history: This is a sub-command of dnf that deals specifically with viewing and managing the history of transactions performed by DNF. It allows users to see a chronological list of changes made to the system via package installations, updates, removals, etc.
- undo: This is an action performed on a specific transaction listed in the history. When you use undo, you are instructing DNF to revert the changes made during a particular transaction.
- 1: This number specifies the transaction ID you want to undo. Each transaction listed in the history has a unique ID associated with it. In this case, 1 refers to the first transaction in the history list.
""",
    ],
    command_options=[
        """
-h, --help: Displays the help message for the dnf history undo command, listing its options and usage instructions.
-y, --assumeyes: Automatically answers "yes" to any confirmation prompts, allowing the command to proceed without requiring manual confirmation for each action.
-q, --quiet: Suppresses informational messages, reducing the output verbosity of the command.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
