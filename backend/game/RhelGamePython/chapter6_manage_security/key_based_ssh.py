import chapter7_users_groups.CommandGenerator as CommandGenerator


ssh_keygen = CommandGenerator.CommandGenerator(
    action='generate public/private keys and .ssh dir',
    correct_command='ssh-keygen',
    hint='Hint: Use "ssh-keygen" to generate public/private keys and .ssh dir',
    command_output=[
        """
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/user/.ssh/id_rsa.
Your public key has been saved in /home/user/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:abcdefghijklmnopqrstuvwxyz1234567890 user@hostname
The key's randomart image is:
+---[RSA 2048]----+
|      .+=+o+*o+o |
|       oo+ooB=+o.|
|      . .o=*B+ +o|
|     .   .+oE+ o.|
|        S o .o . |
|       . .   .   |
|                 |
|                 |
|                 |
+----[SHA256]-----+
""",
    ],
    command_aspects=[
        """
 ssh-keygen primarily generates pairs of public and private SSH keys for authentication. These keys come in different types, commonly RSA and DSA.
""",
    ],
    command_options=[
        """
- -t: Specifies the type of key to create (e.g., rsa, dsa, ecdsa, ed25519).
- -b: Specifies the number of bits in the key. For RSA keys, the default is 2048 bits.
- -f: Specifies the filename of the generated key file.
- -N: Provides a new passphrase for the key file. If not provided, the key will be created without a passphrase.
- -C: Adds a comment to the key file.
- -q: Quiet mode. Suppresses warning and diagnostic messages.
- -A: Forces creation of key files for all authentication methods (generally for the server).
- -B: Show the bubblebabble digest of the key file.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


ssh_copy_id = CommandGenerator.CommandGenerator(
    action='copy your key to target user',
    correct_command='ssh-copy-id user@hostname',
    hint='Hint: Use "ssh-copy-id user@hostname" to copy your key to target user',
    command_output=[
        """
$ ssh-copy-id user@hostname
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/user/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
user@hostname's password:

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'user@hostname'"
and check to make sure that only the key(s) you wanted were added.
""",
    ],
    command_aspects=[
        """
 ssh-copy-id: This is the command itself, used for copying SSH public keys to a remote host.
 user@hostname: This part of the command specifies the target user (username)
 and the hostname or IP address of the remote server (remote-host). This is where you want to copy your SSH public key.
""",
    ],
    command_options=[
        """
- -i identity_file: This option specifies the identity file (private key) to use for authentication. If not specified, it uses the default identity file, usually ~/.ssh/id_rsa.
- -p port: Specifies the port number to connect to on the remote host. If not specified, it defaults to port 22.
- -f: Forces the copying of the key without trying to check if it's already present in the authorized_keys file. This can be useful for automation scripts, but be cautious as it might overwrite existing keys.
- -h: Suppresses the display of the usage message.
- -n: Dry run mode. Doesn't actually copy the key but shows what would be done.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


ssh_resume = CommandGenerator.CommandGenerator(
    action='sum up of the procedure',
    correct_command='',
    hint='Hint: Use "Enter" to continue',
    command_output=[
        """
1) Generate SSH Key Pair:
     Use a tool like ssh-keygen on your local machine to generate an SSH key pair. This typically involves running a command that generates a public key and a private key.

2) Copy Public Key to Remote Server:
     Transfer the public key (usually named id_rsa.pub) to the remote server. This can be done manually by copying the contents of the public key file and pasting it into the authorized_keys file on the remote server. Alternatively, you can use tools like ssh-copy-id to automate this process.

3) Set Permissions:
     Ensure that the .ssh directory on the remote server has the correct permissions (700). The authorized_keys file within this directory should have permissions set to 600.

4) Test SSH Connection:
     Attempt to SSH into the remote server from your local machine. If everything is configured correctly, you should be able to log in without being prompted for a password.

5) Optional: Disable Password Authentication:
     For increased security, you may want to disable password authentication and only allow SSH key-based authentication. This can be done by modifying the SSH server configuration file (sshd_config) on the remote server and setting the PasswordAuthentication option to no. Remember to restart the SSH service after making this change.

6) Ensure Backup Access:
     Before disabling password authentication or making significant changes to SSH configurations, ensure you have another means of accessing the server in case something goes wrong. This could include maintaining an active SSH session or having access to the server's console.

By following these steps, you'll effectively configure key-based authentication for SSH, enhancing the security of your remote server access.
""",
    ],
    command_aspects=['',],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)
