import chapter7_users_groups.CommandGenerator as CommandGenerator


get_facl = CommandGenerator.CommandGenerator(
    action='view current file access control list (facl)',
    correct_command='getfacl myfile.txt',
    hint='Hint: Use "getfacl myfile.txt" to view current file access control list (facl)',
    command_output=[
        """
$ getfacl myfile.txt
# file: myfile.txt
# owner: user1
# group: group1
user::rw-
user:user2:r--
group::r--
mask::r--
other::r--
""",
    ],
    command_aspects=[
        """
 setfacl: This is the command itself that you run in the terminal.
 myfile.txt: This is the name of the file or directory for which you want to set the ACLs.
""",
    ],
    command_options=[
        """
- -t, --tabular: This option formats the output in a tabular format, making it easier to read and understand.
- -R, --recursive: This option is used with directories to recursively display ACLs for all files and subdirectories within the specified directory.
- -c, --omit-header: This option suppresses the initial comment lines that describe the file or directory being displayed.
- -s, --skip-base: This option skips the base ACL entries and only displays the extended ACL entries.
- -b, --absolute-names: This option displays absolute path names for files and directories instead of relative path names.
- -n, --omit-default: This option skips displaying default ACL entries for directories.
- -, --stdin: This option allows you to provide a list of files or directories from standard input, rather than specifying them as command-line arguments.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


set_facl = CommandGenerator.CommandGenerator(
    action='add a new user ACL to a file use.',
    correct_command='setfacl -m u:user1:rw- myfile.txt',
    hint="""
Hint: Use "setfacl -m u:user1:rw- myfile.txt" to add a new user ACL to a file use, in this case read and write. Note the options here are read(r), write(w) and execute(x)
Groups are managed in the same way just using g: rather than u:
""",
    command_output=[
        """
This command sets read and write permissions for user1 on myfile.txt. Here's how the output would look like if successful:
""",
        """
$ getfacl myfile.txt
# file: myfile.txt
# owner: your_username
# group: your_group
user::rw-
user:user1:rw-       <--- ACL entry added for user1
group::r--
mask::rw-
other::r--
""",
    ],
    command_aspects=[
        """
 setfacl: This is the command used to set Access Control Lists (ACLs) for files and directories.
 -m: This option specifies that we want to modify the ACL of the file.
 u:user1:rw-: This part specifies the ACL entry to be added or modified.
     u:user1 indicates that we are modifying permissions for a specific user (user1).
     rw- indicates the permissions being granted or modified. rw- means read and write permissions are granted, but no execute permission.
 myfile.txt: This is the name of the file for which we are modifying the ACLs.
""",
    ],
    command_options=[
        """
- -m, --modify: Modify the ACL of a file or directory by adding or modifying specific permissions or entries.
- -x, --remove: Remove specified entries from the ACL of a file or directory.
- -b, --remove-all: Remove all ACL entries from a file or directory, resetting it to default permissions.
- -k, --remove-default: Remove default ACL entries from a directory, resetting it to default permissions.
- -R, --recursive: Apply ACL modifications recursively to all files and subdirectories within the specified directory.
- -d, --default: Set default ACLs for directories. Default ACLs are applied to newly created files and directories within the specified directory.
- -n, --no-mask: Prevent setfacl from automatically modifying the effective rights mask based on the ACL entries.
- -m mask: Specify an explicit mask for the ACL entries, overriding the default behavior.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
