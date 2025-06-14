import chapter7_users_groups.CommandGenerator as CommandGenerator

module_list = CommandGenerator.CommandGenerator(
    action='list all the currently available modules',
    correct_command='dnf module list',
    hint='Hint: Use "dnf module list" to list all the currently available modules',
    command_output=[
        """
$ dnf module list
Red Hat Enterprise Linux 8 for x86_64 - AppStream (RPMs)
Name              Stream        Profiles              Summary
389-ds            1.4           default [d]           389 Directory Server (base)
                   1.4-client
                   1.4-common
                   1.4-devel
                   1.4-server
                   1.4-tools
ant               1.10          common [d]            Java build tool
container-tools   3.0           common [d]            Tools and dependencies for container development and testing
dhcp              4.1           common [d]            DHCP server and client
httpd             2.4 [d]       common [d]            Apache HTTP Server
                   2.4 [d]       minimal               Apache HTTP Server
                   2.4 [d]       common [d] [e]        Apache HTTP Server
                   2.4 [d]       minimal [e]           Apache HTTP Server
                   2.4 [d]       common [d] [i]        Apache HTTP Server
                   2.4 [d]       minimal [i]           Apache HTTP Server
                   2.4 [d]       common [d] [m]        Apache HTTP Server
                   2.4 [d]       minimal [m]           Apache HTTP Server
                   2.4 [d]       common [d] [n]        Apache HTTP Server
                   2.4 [d]       minimal [n]           Apache HTTP Server

""",
    ],
    command_aspects=[
        """
- dnf: Stands for Dandified Yum, a package manager used in various Linux distributions, including Red Hat Enterprise Linux.
- module: This subcommand is used to interact with modular content in the package manager. Modules provide alternative versions of software packages with different lifecycles and support policies.
- list: This is an argument for the module subcommand, instructing it to list available modules.
""",
    ],
    command_options=[
        """
    -h, --help: Displays a help message, listing available options and usage information.
    --all: Lists all available modules, including those that are not enabled by default.
    --enabled: Lists only enabled modules.
    --disabled: Lists only disabled modules.
    --state=<state>: Filters modules based on their state. Possible values for <state> include enabled, disabled, default, recommended, deprecated, stream, profile, and platform.
    --verbose: Provides detailed output, including additional information about each module.
    --quiet: Suppresses informational messages and only displays essential output.
    --refresh: Refreshes module metadata before listing modules.
    --repo=<repository>: Specifies a repository to use for listing modules.
    --show-streams: Displays available streams for each module.
    --show-profiles: Displays available profiles for each module.
    --show-platform: Displays available platform identifiers for each module.
"""
    ],
    intro_text=[
        """
Modules allow you to install specific versions of a application, a good example of this would be the PHP application.
The PHP application is available in the modules stream with multiple versions and editions,
this allows you to select and install the specific version that is required
""",],
    outro_text=['',],
)


module_info = CommandGenerator.CommandGenerator(
    action='list information about a specific module',
    correct_command='dnf module info php',
    hint='Hint: Use "dnf module info php" to list information about a specific module',
    command_output=[
        """
$ dnf module info php

Name          : php
Stream        : 7.4 [d]
Version       : 8014112021062508457
Context       : c9340299
Architecture  : x86_64
Profiles      : common [d], devel, minimal, standard
Default profiles: common [d]
Repositories  : rhel-8-for-x86_64-appstream-rpms
Summary       : PHP scripting language
Description   : PHP is an HTML-embedded scripting language commonly used for web development.
""",
    ],
    command_aspects=[
        """
- dnf: This is the Dandified Yum package manager used in various Linux distributions, including Red Hat Enterprise Linux.
- module: This subcommand is used to interact with modular content in the package manager. Modules provide alternative versions of software packages with different lifecycles and support policies.
- info: This is an argument for the module subcommand, instructing it to display detailed information about a specific module.
- php: This is the name of the module you want to get information about. In this case, it's the PHP module, which is used for server-side scripting.
""",
    ],
    command_options=[
        """
 --profile=<profile>: Provides information about a specific profile of the module. For example, dnf module info php --profile=common will give information about the common profile of the PHP module.
 --stream=<stream>: Specifies a specific stream of the module for which to retrieve information. For example, dnf module info php --stream=7.4 will give information about the PHP module in stream version 7.4.
 --verbose: Provides more detailed output, including additional information about the module.
 --quiet: Suppresses informational messages and only displays essential output.
 --refresh: Refreshes module metadata before displaying information about the module.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


module_install = CommandGenerator.CommandGenerator(
    action='install a module',
    correct_command='dnf module install php',
    hint='Hint: Use "dnf module install php" to install a module',
    command_output=[
        """
$ sudo dnf module install php
Updating Subscription Management repositories.
Red Hat Enterprise Linux 8 for x86_64 - AppStream (RPMs)                                                                                                                                                             0.0  B/s |   0  B     00:00    
Red Hat Enterprise Linux 8 for x86_64 - BaseOS (RPMs)                                                                                                                                                               0.0  B/s |   0  B     00:00    
Last metadata expiration check: 0:00:01 ago on Sun 06 Mar 2022 10:33:24 PM EST.
Dependencies resolved.
=========================================================================================================================================================================================================================
 Package                                                      Architecture                          Version                                                Repository                                              Size
=========================================================================================================================================================================================================================
Installing module profiles:
 php/common                                                   x86_64                                7.4-2.el8                                              rhel-8-for-x86_64-appstream-rpms                        109 k
 php/devel                                                    x86_64                                7.4-2.el8                                              rhel-8-for-x86_64-appstream-rpms                        109 k
 php/minimal                                                  x86_64                                7.4-2.el8                                              rhel-8-for-x86_64-appstream-rpms                        109 k
 php/standard                                                 x86_64                                7.4-2.el8                                              rhel-8-for-x86_64-appstream-rpms                        109 k

Transaction Summary
=========================================================================================================================================================================================================================
Install  4 Packages

Total download size: 436 k
Installed size: 1.8 M
Is this ok [y/N]: y
Downloading Packages:
(1/4): php-common-7.4-2.el8.x86_64.rpm                                                                                                                                                                              184 kB/s | 109 kB     00:00    
(2/4): php-devel-7.4-2.el8.x86_64.rpm                                                                                                                                                                               114 kB/s | 109 kB     00:00    
(3/4): php-minimal-7.4-2.el8.x86_64.rpm                                                                                                                                                                             132 kB/s | 109 kB     00:00    
(4/4): php-standard-7.4-2.el8.x86_64.rpm                                                                                                                                                                            108 kB/s | 109 kB     00:00    
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                         107 kB/s | 436 kB     00:04     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                 
  Installing       : php-common-7.4-2.el8.x86_64                                                                                                                                                                     
  Running scriptlet: php-common-7.4-2.el8.x86_64                                                                                                                                                                     
  Installing       : php-minimal-7.4-2.el8.x86_64                                                                                                                                                                    
  Running scriptlet: php-minimal-7.4-2.el8.x86_64                                                                                                                                                                    
  Installing       : php-devel-7.4-2.el8.x86_64                                                                                                                                                                      
  Running scriptlet: php-devel-7.4-2.el8.x86_64                                                                                                                                                                      
  Installing       : php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Running scriptlet: php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Running scriptlet: php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Verifying        : php-common-7.4-2.el8.x86_64                                                                                                                                                                      
  Verifying        : php-devel-7.4-2.el8.x86_64                                                                                                                                                                       
  Verifying        : php-minimal-7.4-2.el8.x86_64                                                                                                                                                                     
  Verifying        : php-standard-7.4-2.el8.x86_64                                                                                                                                                                    
Installed products updated.
Complete!
""",
    ],
    command_aspects=[
        """
- dnf: Stands for Dandified Yum, a package manager used in various Linux distributions, including Red Hat Enterprise Linux.
- module: This subcommand is used to interact with modular content in the package manager. Modules provide alternative versions of software packages with different lifecycles and support policies.
- install: This is an argument for the module subcommand, instructing it to install the specified module.
- php: This is the name of the module you want to install. In this case, it's the PHP module, which is used for server-side scripting.
""",
    ],
    command_options=[
        """
  -h, --help: Displays a help message, listing available options and usage information.
  --allowerasing: Allows dnf to remove installed packages to satisfy dependencies during installation.
  --assumeno, --assumeyes: These options answer 'no' or 'yes' respectively to all questions asked by dnf. For automated installations, --assumeyes can be useful.
  --disableexcludes: Disables the excludes defined in configuration files.
  --disableplugin=<plugin>: Disables a specific plugin during the command execution.
  --enableplugin=<plugin>: Enables a specific plugin during the command execution.
  --refresh: Refreshes the metadata for all repositories before installing packages.
  --best: Attempts to upgrade to the best version available, ignoring the release number.
  --nobest: Opposite of --best, installs the highest available version with the highest release number.
  --quiet: Suppresses output except for errors and important messages.
  --verbose: Enables verbose output, showing more detailed information about the installation process.
  --releasever=<release_version>: Specifies a release version to use when installing packages.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


module_remove = CommandGenerator.CommandGenerator(
    action='remove a module',
    correct_command='dnf module remove php',
    hint='Hint: Use "dnf module remove php" to remove a module',
    command_output=[
        """
$ sudo dnf module remove php
Updating Subscription Management repositories.
Red Hat Enterprise Linux 8 for x86_64 - AppStream (RPMs)                                                                                                                                                             0.0  B/s |   0  B     00:00    
Red Hat Enterprise Linux 8 for x86_64 - BaseOS (RPMs)                                                                                                                                                               0.0  B/s |   0  B     00:00    
Last metadata expiration check: 0:00:01 ago on Sun 06 Mar 2022 10:33:24 PM EST.
Dependencies resolved.
=========================================================================================================================================================================================================================
 Package                                  Architecture                      Version                          Repository                                                    Size
=========================================================================================================================================================================================================================
Removing module profiles:
 php/common                               x86_64                            7.4-2.el8                        @rhel-8-for-x86_64-appstream-rpms                         9.0 k
 php/devel                                x86_64                            7.4-2.el8                        @rhel-8-for-x86_64-appstream-rpms                         9.0 k
 php/minimal                              x86_64                            7.4-2.el8                        @rhel-8-for-x86_64-appstream-rpms                         9.0 k
 php/standard                             x86_64                            7.4-2.el8                        @rhel-8-for-x86_64-appstream-rpms                         9.0 k

Transaction Summary
=========================================================================================================================================================================================================================
Remove  4 Packages

Installed size: 0  
Is this ok [y/N]: y
Downloading Packages:
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                 
  Erasing          : php-common-7.4-2.el8.x86_64                                                                                                                                                                     
  Running scriptlet: php-common-7.4-2.el8.x86_64                                                                                                                                                                     
  Erasing          : php-minimal-7.4-2.el8.x86_64                                                                                                                                                                    
  Running scriptlet: php-minimal-7.4-2.el8.x86_64                                                                                                                                                                    
  Erasing          : php-devel-7.4-2.el8.x86_64                                                                                                                                                                      
  Running scriptlet: php-devel-7.4-2.el8.x86_64                                                                                                                                                                      
  Erasing          : php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Running scriptlet: php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Running scriptlet: php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Verifying        : php-common-7.4-2.el8.x86_64                                                                                                                                                                      
  Verifying        : php-devel-7.4-2.el8.x86_64                                                                                                                                                                       
  Verifying        : php-minimal-7.4-2.el8.x86_64                                                                                                                                                                     
  Verifying        : php-standard-7.4-2.el8.x86_64                                                                                                                                                                    
Removed products updated.
Complete!
""",
    ],
    command_aspects=[
        """
 dnf: Stands for Dandified Yum, a package manager used in various Linux distributions, including Red Hat Enterprise Linux.
 module: This subcommand is used to interact with modular content in the package manager. Modules provide alternative versions of software packages with different lifecycles and support policies.
 remove: This is an argument for the module subcommand, instructing it to remove the specified module.
 php: This is the name of the module you want to remove. In this case, it's the PHP module, which is used for server-side scripting.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message, listing available options and usage information.
- --allowerasing: Allows dnf to remove installed packages to satisfy dependencies during removal.
- --assumeno, --assumeyes: These options answer 'no' or 'yes' respectively to all questions asked by dnf. For automated removals, --assumeyes can be useful.
- --disableexcludes: Disables the excludes defined in configuration files.
- --disableplugin=<plugin>: Disables a specific plugin during the command execution.
- --enableplugin=<plugin>: Enables a specific plugin during the command execution.
- --refresh: Refreshes the metadata for all repositories before removing packages.
- --best: Attempts to remove the best version available, ignoring the release number.
- --nobest: Opposite of --best, removes the highest available version with the highest release number.
- --quiet: Suppresses output except for errors and important messages.
- --verbose: Enables verbose output, showing more detailed information about the removal process.
- --releasever=<release_version>: Specifies a release version to use when removing packages.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


module_reset = CommandGenerator.CommandGenerator(
    action='reset the module post removal (if you would like to install a different version)',
    correct_command='dnf module reset php',
    hint='Hint: Use "dnf module reset php" to reset the module post removal',
    command_output=[
        """
$ sudo dnf module reset php
Updating Subscription Management repositories.
Red Hat Enterprise Linux 8 for x86_64 - AppStream (RPMs)                                                                                                                                                             0.0  B/s |   0  B     00:00    
Red Hat Enterprise Linux 8 for x86_64 - BaseOS (RPMs)                                                                                                                                                               0.0  B/s |   0  B     00:00    
Last metadata expiration check: 0:00:01 ago on Sun 06 Mar 2022 10:33:24 PM EST.
Resetting module profiles to defaults.
Dependencies resolved.
=========================================================================================================================================================================================================================
 Package                                   Architecture                        Version                            Repository                                                        Size
=========================================================================================================================================================================================================================
Resetting module profiles:
 php/common                                x86_64                              7.4-2.el8                          rhel-8-for-x86_64-appstream-rpms                             10 k
 php/devel                                 x86_64                              7.4-2.el8                          rhel-8-for-x86_64-appstream-rpms                             10 k
 php/minimal                               x86_64                              7.4-2.el8                          rhel-8-for-x86_64-appstream-rpms                             10 k
 php/standard                              x86_64                              7.4-2.el8                          rhel-8-for-x86_64-appstream-rpms                             10 k

Transaction Summary
=========================================================================================================================================================================================================================
Reset  4 Packages

Installed size: 0  
Is this ok [y/N]: y
Downloading Packages:
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                 
  Resetting        : php-common-7.4-2.el8.x86_64                                                                                                                                                                     
  Running scriptlet: php-common-7.4-2.el8.x86_64                                                                                                                                                                     
  Resetting        : php-minimal-7.4-2.el8.x86_64                                                                                                                                                                    
  Running scriptlet: php-minimal-7.4-2.el8.x86_64                                                                                                                                                                    
  Resetting        : php-devel-7.4-2.el8.x86_64                                                                                                                                                                      
  Running scriptlet: php-devel-7.4-2.el8.x86_64                                                                                                                                                                      
  Resetting        : php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Running scriptlet: php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Running scriptlet: php-standard-7.4-2.el8.x86_64                                                                                                                                                                   
  Verifying        : php-common-7.4-2.el8.x86_64                                                                                                                                                                      
  Verifying        : php-devel-7.4-2.el8.x86_64                                                                                                                                                                       
  Verifying        : php-minimal-7.4-2.el8.x86_64                                                                                                                                                                     
  Verifying        : php-standard-7.4-2.el8.x86_64                                                                                                                                                                    
Resetting products updated.
Complete!
"""
    ],
    command_aspects=[
        """
 dnf: Stands for Dandified Yum, a package manager used in various Linux distributions, including Red Hat Enterprise Linux.
 module: This subcommand is used to interact with modular content in the package manager. Modules provide alternative versions of software packages with different lifecycles and support policies.
 reset: This is an argument for the module subcommand, instructing it to reset the specified module.
 php: This is the name of the module you want to reset. In this case, it's the PHP module, which is used for server-side scripting.
""",
    ],
    command_options=[
        """
- -h, --help: Displays a help message, listing available options and usage information.
- --allowerasing: Allows dnf to remove installed packages to satisfy dependencies during reset.
- --assumeno, --assumeyes: These options answer 'no' or 'yes' respectively to all questions asked by dnf. For automated resets, --assumeyes can be useful.
- --disableexcludes: Disables the excludes defined in configuration files.
- --disableplugin=<plugin>: Disables a specific plugin during the command execution.
- --enableplugin=<plugin>: Enables a specific plugin during the command execution.
- --refresh: Refreshes the metadata for all repositories before resetting modules.
- --quiet: Suppresses output except for errors and important messages.
- --verbose: Enables verbose output, showing more detailed information about the reset process.
- --releasever=<release_version>: Specifies a release version to use when resetting modules.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
