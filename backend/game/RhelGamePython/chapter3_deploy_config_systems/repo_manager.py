import chapter7_users_groups.CommandGenerator as CommandGenerator

utils_install = CommandGenerator.CommandGenerator(
    action='install yum-utils',
    correct_command='dnf install yum-utils',
    hint='Hint: Use "dnf install yum-utils"to install the package to be able to configure repositories',
    command_output=[
        """
Last metadata expiration check: 0:04:23 ago on Tue 01 Mar 2024 10:32:09 PM UTC.
Dependencies resolved.
================================================================================
 Package               Architecture  Version           Repository         Size
================================================================================
Installing:
 yum-utils             noarch        4.0.13-8.fc35     updates            186 k

Transaction Summary
================================================================================
Install  1 Package

Total download size: 186 k
Installed size: 561 k
Is this ok [y/N]: y
Downloading Packages:
yum-utils-4.0.13-8.fc35.noarch.rpm             194 kB/s | 186 kB     00:00    
--------------------------------------------------------------------------------
Total                                           140 kB/s | 186 kB     00:01     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1 
  Installing       : yum-utils-4.0.13-8.fc35.noarch                         1/1 
  Running scriptlet: yum-utils-4.0.13-8.fc35.noarch                         1/1 
  Verifying        : yum-utils-4.0.13-8.fc35.noarch                         1/1 

Installed:
  yum-utils-4.0.13-8.fc35.noarch                                                

Complete!
""",
    ],
    command_aspects=[
        """
- dnf: This stands for Dandified Yum, which is the next-generation package management tool for RPM-based Linux distributions, primarily used in Fedora, CentOS, and RHEL (Red Hat Enterprise Linux) distributions.
- install: This is the sub-command of dnf that tells the package manager to install the specified package(s) or dependencies.
- yum-utils: This is the package name. yum-utils provides a collection of utilities and tools that extend the capabilities of the yum package manager. It includes various commands and scripts for managing RPM packages, repositories, and dependencies.
""",
    ],
    command_options=[
        """
-y, --assumeyes: Automatically answer yes to all prompts. This option can be useful if you want to automate installations without needing to confirm each installation step.
-q, --quiet: Quiet operation. This option suppresses normal output, showing only error messages.
-v, --verbose: Increase verbosity. This option increases the amount of output shown, providing more details about the installation process.
--best: This option tells DNF to automatically select the best available version of a package to install, considering dependencies and conflicts.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

add_repo = CommandGenerator.CommandGenerator(
    action='add and enable http://example.com/repo',
    correct_command='dnf config-manager --add-repo=http://example.com/repo',
    hint='Hint: Use "dnf config-manager --add-repo=http://example.com/repo" to add and enable http://example.com/repo',
    command_output=[
        """
Adding repo from: http://example.com/repo
Repo added successfully.
""",
    ],
    command_aspects=[
        """
- dnf: This is the command-line package manager used in various RPM-based Linux distributions.
- config-manager: This is a sub-command of dnf used for managing DNF configuration options.
- --add-repo: This is an option for the config-manager sub-command. It specifies that we want to add a new repository to the DNF configuration.
- http://example.com/repo: This is the URL of the repository we want to add. 
- Replace 	http://example.com/repo with the actual URL of the repository you wish to add.
- Replace 	ftp://example.com/repo with the actual URL of the repository you wish to add if the repository is available over HTTP.
- Replace 	file:///path/to/local/repo with the actual URL of the repository you wish to add if the repository is local to the machine.
""",
    ],
    command_options=[
        """
 --set-enabled: Permanently marking a repository as enabled in the configuration file.
 --set-disabled: Permanently marking a repository as disabled in the configuration file.
 --setopt=option=value: Set specific options for the repository. For example, you can set the metadata_expire option to control how long DNF caches the metadata for the repository.
 --save: Save the changes to the configuration file. By default, changes made using dnf config-manager are not saved automatically.
 --add-repo: This is the option used to specify the URL of the repository you want to add.
"""
    ],
    intro_text=['',],
    outro_text=['',],
)

###   --disablerepo is used for temporary disabling of a repository during the current session, while --set-disabled is used for permanently marking a repository as disabled in the configuration file. ###

disable_repo = CommandGenerator.CommandGenerator(
    action='disable a repository by name temporary',
    correct_command='dnf config-manager  --disablerepo repository',
    hint='Hint: Use "dnf config-manager  --disablerepo repository" to disable a repository by name temporary',
    command_output=[
        """
If the command is successful, you won't see any confirmation message.
You can verify that the repository is disabled by checking the enabled/disabled status using dnf repolist or 
examining the repository configuration files in /etc/yum.repos.d/.
""",
    ],
    command_aspects=[
        """
- dnf: This is the command-line package manager used in various RPM-based Linux distributions.
- config-manager: This is a sub-command of dnf used for managing DNF configuration options.
- --disablerepo: This is an option for the config-manager sub-command. It specifies that we want to disable a specific repository.
- repository: This is the name of the repository you want to disable. Replace repository with the actual name of the repository you wish to disable.
""",
    ],
    command_options=[
        """
repository: This is the option used to specify the name of the repository you want to disable.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

enable_repo = CommandGenerator.CommandGenerator(
    action='enable a repository by name temporary',
    correct_command='dnf config-manager  --enablerepo repository',
    hint='Hint: Use "dnf config-manager  --enablerepo repository" to enable a repository by name temporary',
    command_output=[
        """
Repo 'repository' enabled successfully.
""",
    ],
    command_aspects=[
        """
- dnf: This is the command-line package manager used in various RPM-based Linux distributions.
- config-manager: This is a sub-command of dnf used for managing DNF configuration options.
- --enablerepo: This is an option for the config-manager sub-command. It specifies that we want to enable a specific repository.
- repository: This is the name of the repository you want to enable. Replace repository with the actual name of the repository you wish to enable.
""",
    ],
    command_options=[
        'repository: This is the option used to specify the name of the repository you want to enable.',
    ],
    intro_text=['',],
    outro_text=['',],
)

install_createrepo = CommandGenerator.CommandGenerator(
    action='install createrepo package',
    correct_command='dnf install createrepo',
    hint='Hint: Use "dnf install createrepo" to install createrepo package',
    command_output=[
        """
Last metadata expiration check: 0:00:15 ago on Wed 02 Mar 2024 10:00:00 AM UTC.
Dependencies resolved.
================================================================================
 Package             Arch       Version                Repository          Size
================================================================================
Installing:
 createrepo          noarch     0.17.2-12.fc35         updates             105 k

Transaction Summary
================================================================================
Install  1 Package

Total download size: 105 k
Installed size: 202 k
Is this ok [y/N]: y
Downloading Packages:
createrepo-0.17.2-12.fc35.noarch.rpm      180 kB/s | 105 kB     00:00
--------------------------------------------------------------------------------
Total                                          150 kB/s | 105 kB     00:00
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                        1/1
  Installing       : createrepo-0.17.2-12.fc35.noarch                        1/1
  Running scriptlet: createrepo-0.17.2-12.fc35.noarch                        1/1
  Verifying        : createrepo-0.17.2-12.fc35.noarch                        1/1
Installed products updated.

Installed:
  createrepo-0.17.2-12.fc35.noarch

Complete!
""",
    ],
    command_aspects=[
        """
- dnf: This is the package manager used in various RPM-based Linux distributions such as Fedora, CentOS, and RHEL.
- install: This is a sub-command of dnf used to install packages.
- createrepo: This is the package name. createrepo is a tool used to create the metadata required by YUM-based package managers to allow them to recognize and install packages from a repository.
""",
    ],
    command_options=[
        """
- -y, --assumeyes: Automatically answer yes to all prompts. This option can be useful if you want to automate installations without needing to confirm each installation step.
- -q, --quiet: Quiet operation. This option suppresses normal output, showing only error messages.
- --best: This option tells DNF to automatically select the best available version of a package to install, considering dependencies and conflicts.
- --allowerasing: Allow erasing of installed packages to resolve conflicts. This option can be useful if installing a new package requires removing another conflicting package.
- --downloadonly: Download packages to the cache directory without installing them. This option is helpful if you want to download packages for later installation or distribution.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

create_repo = CommandGenerator.CommandGenerator(
    action='create a repository file',
    correct_command='createrepo --database /root/local_repo',
    hint='Hint: Use "createrepo --database /root/local_repo" to create a repository file',
    command_output=[
        """
Initializing database in /root/local_repo...
Adding packages from /root/local_repo...
Processing packages...
Creating metadata...
Metadata creation complete.
""",
    ],
    command_aspects=[
        """
- Extra info : Copy all packages that you want to have in your repository into one directory, such as /root/local_repo.
- To add a new repository on the system you need the following configuration as a minimum this would need to be in an existing or new file within /etc/yum.repos.d/ with the .repo extension.

- [repository]
name=repository_name
baseurl=repository_url
gpgcheck=0

Replace repository_url with a URL to the directory where the repodata directory of a repository is located:

If the repository is available over HTTP, use: http://path/to/repo
If the repository is available over FTP, use: ftp://path/to/repo
If the repository is local to the machine, use: file:///path/to/local/repo


- createrepo: This is the command-line tool used to create and manage YUM repositories.
- --database: This option specifies that the command should create a database for the repository. The database is used by YUM to efficiently search and retrieve package information.
- /root/local_repo: This is the path to the directory containing the RPM packages for the repository. Replace /root/local_repo with the actual path to your repository directory.
""",
    ],
    command_options=[
        """
 -v, --verbose: Increase verbosity. This option increases the amount of output shown, providing more details about the repository creation process.
 -c, --cachedir: Specify the directory where the cache files will be stored.
 -o, --outputdir: Specify the directory where the repository metadata will be stored.
 -g, --groupfile: Specify a file containing package group information.
 -h, --help: Display a help message and exit.
 -q, --quiet: Suppress normal output, showing only errors.
 --update: Update an existing repository with new or modified packages.
 --checksum: Choose the checksum type to use for the repository metadata.
 --retain-old-md: Retain old metadata instead of removing it.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
