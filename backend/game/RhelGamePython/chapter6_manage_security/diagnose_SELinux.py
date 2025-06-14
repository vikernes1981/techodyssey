import chapter7_users_groups.CommandGenerator as CommandGenerator


troubleshoot_server = CommandGenerator.CommandGenerator(
    action="install setroubleshoot-server",
    correct_command="dnf install setroubleshoot-server",
    hint='Hint: Use "dnf install setroubleshoot-server" to install setroubleshoot-server',
    command_output=[
        """
$ sudo dnf install setroubleshoot-server
Last metadata expiration check: <timestamp>
Dependencies resolved.
================================================================================
 Package                 Arch       Version                Repository     Size
================================================================================
Installing:
 setroubleshoot-server   x86_64     <version>              <repository>  <size>

Transaction Summary
================================================================================
Install  1 Package

Total download size: <size>
Installed size: <size>
Is this ok [y/N]: y
Downloading Packages:
setroubleshoot-server-<version>.x86_64.rpm   <===========================> 100%
[------------------------------------->] eta
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                       1/1
  Installing       : setroubleshoot-server-<version>.x86_64                 1/1
  Running scriptlet: setroubleshoot-server-<version>.x86_64                 1/1
  Verifying        : setroubleshoot-server-<version>.x86_64                 1/1
Installed products updated.

Installed:
  setroubleshoot-server-<version>.x86_64

Complete!
""",
    ],
    command_aspects=[
        """
 dnf: This is the package management tool used in Red Hat-based Linux distributions, such as Fedora and CentOS. It stands for "Dandified Yum", and it's a modernized version of the yum package manager.
 install: This is the subcommand of dnf used to install packages. It instructs dnf to download and install the specified package(s) and any dependencies required.
 setroubleshoot-server: This is the name of the package to be installed. In this case, it's the setroubleshoot-server package, which provides tools and utilities for troubleshooting SELinux-related issues on the server.
""",
    ],
    command_options=[
        """- Package Name: This is the name of the package(s) you want to install. You can specify one or more package names separated by spaces.
- -y, --assumeyes: Automatically answer yes to all prompts. This option is useful for automating installations without needing to manually confirm each package installation.
- -q, --quiet: Suppress output except for errors and warnings. This option is useful for reducing the amount of output when installing packages.
- --refresh: Refresh package metadata before installing packages. This option ensures that dnf retrieves the latest package information from the repositories before attempting to install packages.
- --enablerepo=REPO: Enable a specific repository for installation. This option allows you to specify a repository by name or ID from which to install packages.
- --disablerepo=REPO: Disable a specific repository for installation. This option allows you to specify a repository by name or ID that should not be used for installing packages.
- --best: Install the best available version of packages. This option instructs dnf to choose the best version of a package based on the repository configuration and dependencies.
- --allowerasing: Allow dnf to erase packages if necessary to resolve conflicts. This option is useful when installing packages that conflict with existing packages.
- --setopt=OPTION: Set a configuration option for the installation process. This option allows you to specify various configuration options for dnf during package installation.

""",
    ],
    intro_text=[
        "",
    ],
    outro_text=[
        "",
    ],
)

sealert = CommandGenerator.CommandGenerator(
    action="view all current policy violations for SELinux",
    correct_command="sealert -a /var/log/audit/audit.log",
    hint='Hint: Use "sealert -a /var/log/audit/audit.log" to view all current policy violations for SELinux',
    command_output=[
        """
        100% done
found 2 alerts in /var/log/audit/audit.log
--------------------------------------------------------------------------------

SELinux is preventing /usr/bin/ssh-keygen from read access on the file authorized_keys.

*****  Plugin catchall (100. confidence) suggests   **************************

If you believe that ssh-keygen should be allowed read access on the authorized_keys file by default.
Then you should report this as a bug.
You can generate a local policy module to allow this access.
Do
allow this access for now by executing:
# ausearch -c 'ssh-keygen' --raw | audit2allow -M my-sshkeygen
# semodule -i my-sshkeygen.pp

--------------------------------------------------------------------------------

SELinux is preventing /usr/sbin/httpd from write access on the directory /var/www/html.

*****  Plugin catchall (100. confidence) suggests   **************************

If you believe that httpd should be allowed write access on the html directory by default.
Then you should report this as a bug.
You can generate a local policy module to allow this access.
Do
allow this access for now by executing:
# ausearch -c 'httpd' --raw | audit2allow -M my-httpd
# semodule -i my-httpd.pp

--------------------------------------------------------------------------------

        """,
    ],
    command_aspects=[
        """
    sealert: This is the command-line utility used for analyzing SELinux-related events and generating reports on SELinux denials and other issues.
    -a: This is an option or flag for the sealert command. The -a flag stands for "analyze." It tells sealert to analyze the specified audit log file for SELinux-related events.
    /var/log/audit/audit.log: This is the path to the audit log file that sealert should analyze. SELinux audit messages are typically logged to this file. /var/log/audit/audit.log is the default location for the audit log file on many Linux distributions.
    """,
    ],
    command_options=[
        """
    -a, --analyze: Analyze the audit log file for SELinux-related events and generate reports.
    -b, --browser: Open the generated HTML reports in a web browser.
    -l, --list: List all available SELinux alerts.
    -o, --last: Show only the last (most recent) alert.
    -s, --show: Show detailed information about a specific SELinux alert by its ID.
    -t, --type: Filter alerts by a specific SELinux type.
    -u, --user: Filter alerts by a specific user.
    -i, --ignore: Ignore specified alerts by their IDs.
    -p, --no-ignore-previously-seen: Don't ignore previously seen alerts when generating reports.
    -n, --no-ignore-new: Don't ignore new alerts when generating reports.
    -r, --get-reasons: Get detailed reasons for SELinux denials.
    -d, --dontaudit: Show denials with 'dontaudit' attribute.
        """,
    ],
    intro_text=[
        "",
    ],
    outro_text=[
        "",
    ],
)

ausearch = CommandGenerator.CommandGenerator(
    action="search all logs in the audit log",
    correct_command="ausearch -m AVC,USER_AVC,SELINUX_ERR",
    hint='Hint: Use "ausearch -m AVC,USER_AVC,SELINUX_ERR" to search all logs in the audit log',
    command_output=[
        """type=AVC msg=audit(1432139821.083:564): avc:  denied  { read } for  pid=22195 comm="httpd" name="authorized_keys" dev="dm-0" ino=18176442 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:home_ssh_t:s0 tclass=file
type=AVC msg=audit(1432139821.083:565): avc:  denied  { getattr } for  pid=22195 comm="httpd" path="/home/user1/.ssh/authorized_keys" dev="dm-0" ino=18176442 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:home_ssh_t:s0 tclass=file
type=USER_AVC msg=audit(1432139821.083:566): pid=22195 uid=48 auid=4294967295 ses=4294967295 subj=system_u:system_r:httpd_t:s0 msg='avc:  denied  { read } for  pid=22195 comm="httpd" name="authorized_keys" dev="dm-0" ino=18176442 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:home_ssh_t:s0 tclass=file'   
type=SELINUX_ERR msg=audit(1432139821.083:567): op=security_bounded_transition seresult=denied oldcontext=system_u:system_r:httpd_t:s0 newcontext=system_u:system_r:httpd_t:s0
""",
    ],
    command_aspects=[
        """    ausearch: This is the command-line utility used to search the audit log for specific types of events.

    -m AVC,USER_AVC,SELINUX_ERR: These are the event types specified for the search using the -m flag. In this case, we're searching for three types of SELinux-related events:
        AVC: Represents SELinux access vector cache (AVC) denials, which occur when a process attempts to perform an action that is denied by SELinux policy.
        USER_AVC: Represents AVC denials associated with user sessions, showing which user triggered the denial.
        SELINUX_ERR: Represents general SELinux errors or issues.""",
    ],
    command_options=[
        """    -a, --all: Display all events (default behavior if no other options are provided).
    -c <command>, --comm <command>: Filter events by the specified command.
    -ts <time>, --start <time>: Filter events starting from the specified time (format: YYYY-MM-DD HH:MM:SS).
    -te <time>, --end <time>: Filter events until the specified time (format: YYYY-MM-DD HH:MM:SS).
    -k <key>, --key <key>: Filter events by the specified key (used for filtering by audit event keys).
    -f <file>, --file <file>: Filter events based on the specified file.
    -i, --interpret: Interpret numerical values in event output.
    -m <type>, --message <type>: Filter events by message type (e.g., AVC, USER_AVC, SELINUX_ERR).
    -p <pid>, --pid <pid>: Filter events by process ID.
    -u <user>, --uid <user>: Filter events by user ID.
    -r <role>, --role <role>: Filter events by SELinux security role.
    -R <role>, --runas <role>: Filter events by SELinux run-as role.
    -t <type>, --type <type>: Filter events by type (e.g., execve, socketcall).
    -x <field=value>, --expr <field=value>: Additional search expressions in the form of field=value.
    -sv, --summary: Display a summary of events matching the search criteria.""",
    ],
    intro_text=[
        "",
    ],
    outro_text=[
        "",
    ],
)

journalctl = CommandGenerator.CommandGenerator(
    action="view anything logged in the journal",
    correct_command="journalctl -t setroubleshoot",
    hint='Hint: Use "journalctl -t setroubleshoot" to view anything logged in the journal',
    command_output=[
        """    Mar 20 10:25:34 hostname setroubleshoot[1234]: SELinux is preventing /usr/bin/ssh-keygen from read access on the file authorized_keys.
Mar 20 10:25:34 hostname setroubleshoot[1234]: Plugin catchall (100. confidence) suggests...
Mar 20 10:25:34 hostname setroubleshoot[1234]: If you believe that ssh-keygen should be allowed read access...
        

        """,
    ],
    command_aspects=[
        """    journalctl: This is the command-line utility for querying and displaying messages from the journal, which is the logging system used by systemd.
    -t setroubleshoot: This is an option or flag for the journalctl command. The -t flag allows you to filter messages by tag. In this case, setroubleshoot is the tag specified for filtering.""",
    ],
    command_options=[
        """    -b, --boot: Show logs from the current boot.
    -k, --dmesg: Show kernel messages.
    -u <unit>, --unit=<unit>: Show logs for a specific systemd unit.
    -u <unit-pattern>, --unit=<unit-pattern>: Show logs matching a unit pattern.
    -r, --reverse: Display the output in reverse order (newest entries first).
    -n <lines>, --lines=<lines>: Show the last N lines of the journal.
    -S <time>, --since=<time>: Show entries since the specified time (e.g., "2024-03-01 12:00:00").
    -U <time>, --until=<time>: Show entries until the specified time.
    -F, --follow: Follow the journal in real-time.
    -f, --field=<field>: Filter by field (e.g., _SYSTEMD_UNIT=sshd.service).
    -t <tag>, --identifier=<tag>: Show entries with the specified identifier.
    -o <format>, --output=<format>: Set the output format (e.g., json, json-pretty, export).
    -m, --merge: Merge multiple journal files into one view.
    -M, --no-pager: Do not use a pager to display output.
    --since=<time>, --until=<time>: Show entries within a time range (e.g., "2 hours ago").
    -h, --help: Show help message and exit.
    -V, --version: Show version information and exit.""",
    ],
    intro_text=[
        "",
    ],
    outro_text=[
        "",
    ],
)


audit2why = CommandGenerator.CommandGenerator(
    action="interpret audit log entries related to SELinux denials and provide human-readable explanations of why the denials occurred",
    correct_command="audit2why",
    hint='Hint: Use "audit2why" to interpret audit log entries related to SELinux denials and provide human-readable explanations of why the denials occurred',
    command_output=[
        """
        type=AVC msg=audit(1432139821.083:567): avc:  denied  { read } for  pid=22195 comm="httpd" name="authorized_keys" dev="dm-0" ino=18176442 scontext=system_u:system_r:httpd_t:s0 tcontext=unconfined_u:object_r:home_ssh_t:s0 tclass=file

    Was caused by:
        Missing type enforcement (TE) allow rule.

    You can use audit2allow to generate a loadable module to allow this access.

        """,
    ],
    command_aspects=[
        """
        audit2why: This is the command-line utility used to interpret SELinux audit log entries and provide human-readable explanations of the denials.
        """,
    ],
    command_options=[
        """
            -a, --auto: Automatically answer "yes" to all questions, which is useful for scripting.
    -h, --help: Display help message and exit.
    -V, --version: Display version information and exit.
        """,
    ],
    intro_text=[
        "",
    ],
    outro_text=[
        "",
    ],
)


audit2allow = CommandGenerator.CommandGenerator(
    action="attempt to get resolutions to the issues",
    correct_command="audit2allow",
    hint='Hint: Use "audit2allow" to attempt to get resolutions to the issues',
    command_output=[
        """module myapp 1.0;

require {
        type myapp_t;
        class file { read write };
}

#============= myapp_t ==============
allow myapp_t self:file { read write };
""",
    ],
    command_aspects=[
        """
        audit2allow: This is the command-line utility used to analyze SELinux audit log entries and generate SELinux policy modules based on the denials.
        """,
    ],
    command_options=[
        """
            -i <file>, --input=<file>: Specifies the input file containing SELinux audit denials. This is typically the audit log file (/var/log/audit/audit.log), but it can also be a custom file containing SELinux denials.
    -m <module>, --module=<module>: Specifies the name of the SELinux policy module to be generated. This option is required when generating a policy module.
    -l, --list: Lists existing SELinux policy modules.
    -L, --list-avcs: Lists AVCs (Access Vector Cache) from the audit log.
    -R, --reference=<module>: Generate a policy module based on the given reference module. This is useful when creating new policy modules based on existing ones.
    -c, --create: Create the policy module file. By default, audit2allow only prints the policy module to standard output. Use this option to actually create the policy module file.
    -p, --policy: Generate a policy module suitable for the specified policy format (e.g., strict, mls). By default, audit2allow generates policy modules compatible with the strict policy.
    -D, --dgraph: Generate a directed graph of the policy module.
    -S, --suppress: Suppress duplicate rules in the generated policy module.
    -v, --verbose: Provide verbose output, including additional information during the analysis process.
    -h, --help: Display help message and exit.
    -V, --version: Display version information and exit.
        """,
    ],
    intro_text=[
        "",
    ],
    outro_text=[
        "",
    ],
)
