import chapter7_users_groups.CommandGenerator as CommandGenerator


at_install = CommandGenerator.CommandGenerator(
    action='install at',
    correct_command='dnf install at',
    hint='Hint: Use "dnf install at" to install at package',
    command_output=[
        """
Last metadata expiration check: <timestamp>
Dependencies resolved.
===============================================================================================================================================================
 Package                                  Architecture                         Version                           Repository                           Size
===============================================================================================================================================================
Installing:
 at                                       x86_64                               3.1.20-8.fc33                     updates                             121 k

Transaction Summary
===============================================================================================================================================================
Install  1 Package

Total download size: 121 k
Installed size: 282 k
Is this ok [y/N]: 
""",
    ],
    command_aspects=[
        """
 dnf: This is the package manager for the DNF (Dandified YUM) package management system. It's used primarily in Linux distributions such as Fedora, CentOS, and RHEL (Red Hat Enterprise Linux) to install, update, and remove packages.
 install: This is a subcommand of dnf used to install packages. When you specify install, dnf knows that you want to install a package or packages.
 at: This is the package name that you want to install. In this case, it refers to the at package, which is a utility used to schedule commands or scripts to be executed at a later time.
""",
    ],
    command_options=[
        """
Schedule a command to run at a specific time: echo "echo 'Hello, World!'" | at 10:00
Using a script with at: echo "/path/to/script.sh" | at 12:00 2024-03-16
View scheduled jobs: atq
Remove a scheduled job: atrm 1
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

crontab = CommandGenerator.CommandGenerator(
    action='edit crontab',
    correct_command='crontab -e',
    hint='Hint: Use "crontab -e" to edit crontab',
    command_output=[
        """
# Edit this file to introduce tasks to be run by cron.
#
# Each task to run has to be defined through a single line
# indicating with different fields when the task will be run
# and what command to run for the task
#
# To define the time you can provide concrete values for
# minute (m), hour (h), day of month (dom), month (mon),
# and day of week (dow) or use '*' in these fields (for 'any').
#
# Notice that tasks will be started based on the cron's system
# daemon's notion of time and timezones.
#
# Output of the crontab jobs (including errors) is sent through
# email to the user the crontab file belongs to (unless redirected).
#
# For example, you can run a backup of all your user accounts
# at 5 a.m every week with:
# 0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
#
# For more information see the manual pages of crontab(5) and cron(8)
#
# m h  dom mon dow   command

""",
    ],
    command_aspects=[
        """
 crontab: This is the command-line utility used to manage cron jobs on Unix-like operating systems. "Cron" is a time-based job scheduler in Unix-like operating systems, and crontab is used to create, modify, and delete cron job schedules.
 -e: This option tells the crontab command to open the user's crontab file in a text editor for editing. The default text editor used is typically defined by the EDITOR environment variable.
""",
    ],
    command_options=[
        """
- -e: Edit the current user's crontab file. This option opens the default text editor to edit the cron jobs.
- -l: List the current user's cron jobs. This option displays the contents of the user's crontab file.
- -r: Remove the current user's crontab file. This option deletes all cron jobs for the current user.
- -u user: Specify a different user's crontab file to edit, list, or remove. This option requires administrative privileges (usually root access).
- -i: Prompt for confirmation before removing the crontab file. This option is used in conjunction with the -r option.
- -c file: Specify a different file to use instead of the default crontab file for editing, listing, or removing.
- -s: Display the cron daemon's version and the system's crontab directory.
""",
        """
**The crontab entries are of the form:**

**Minutes Hours Date Month Day-of-Week command**

**where:**
**Minutes = [0 to 59]
Hours   = [0 to 23]
Date    = [1 to 31]
Month   = [1 to 12]
Day-of-Week = [0 to 6] 0=Sunday - 6=Saturday
command = a script file or a shell command.
Other special characters can be used:**
- An asterisk (*) can be used to specify all valid values.
- A hyphen (-) between integers specifies a range of integers.
- A list of values separated by commas (,) specifies a list.
- A forward slash (/) can be used to specify step values.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
