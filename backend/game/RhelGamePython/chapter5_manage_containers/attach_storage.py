import chapter7_users_groups.CommandGenerator as CommandGenerator

container_mkdir = CommandGenerator.CommandGenerator(
    action='create directory to be mounted by container',
    correct_command='mkdir -p /home/user1/containers/storage1',
    hint='Hint: Use "mkdir -p /home/user1/containers/storage1" to create a directory to be persistently mounted by container',
    command_output=[
        """
If the command executes successfully, there will be no output. You'll just get the command prompt again.
""",
    ],
    command_aspects=[
        """
    mkdir: This is the command used to create directories (mkdir stands for "make directory").

    -p: This option ensures that the command creates parent directories as needed. If any of the parent directories in the path provided do not exist, they will be created.

    /home/user1/containers/storage1: This is the path where you want to create the directory. It specifies a directory named storage1 which should be created inside the containers directory, which should be inside the user1 directory, which in turn should be inside the /home directory.

So, when you execute mkdir -p /home/user1/containers/storage1, it will create the directory structure as follows:

    /home: If it doesn't exist, it will be created (assuming you have permissions to create directories here).
    /home/user1: If it doesn't exist, it will be created.
    /home/user1/containers: If it doesn't exist, it will be created.
    /home/user1/containers/storage1: This directory will be created.

The -p option ensures that all intermediate directories are created if they do not already exist.
""",
    ],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)

run_container = CommandGenerator.CommandGenerator(
    action='run the container with the priviledge command and -v option to mount',
    correct_command='podman run --privileged -it -v /home/user1/containers/storage1:/mnt httpd-server /bin/bash',
    hint='Hint: Use "podman run --privileged -it -v /home/user1/containers/storage1:/mnt httpd-server /bin/bash" to run the container with the priviledge command and -v option to mount',
    command_output=[
        """
The command output will depend on the specific setup of your container environment and the behavior of the httpd-server image. However, after running the command, you will likely see a new command prompt indicating that you are now inside the Bash shell of the container. Here's a simulated example of what the output might look like:

[root@container-id /]#

Here, container-id represents the unique identifier assigned to your container instance. You are now inside the container and can execute commands within its environment.
""",
    ],
    command_aspects=[
        """
    podman run: This is the command used to run containers with Podman.
    --privileged: This option gives the container additional privileges, which is often necessary for certain operations like mounting filesystems.
    -it: This option combines two separate options:
        -i or --interactive: This keeps STDIN open even if not attached.
        -t or --tty: Allocates a pseudo-TTY, which allows you to interact with the container using a terminal.
    -v /home/user1/containers/storage1:/mnt: This option mounts the directory /home/user1/containers/storage1 on the host to the directory /mnt inside the container. This allows the container to access files and directories from the host system.
    httpd-server: This is the name of the container image you're running. It seems like an image for an HTTP server (Apache HTTP Server, commonly known as httpd).
    /bin/bash: This is the command that will be executed inside the container. In this case, it starts an interactive Bash shell.
""",
    ],
    command_options=[
        'Can confirm the mount by using at the containers shell: df -h',],
    intro_text=['',],
    outro_text=['',],
)
