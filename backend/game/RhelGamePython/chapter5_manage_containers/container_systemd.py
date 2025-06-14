import chapter7_users_groups.CommandGenerator as CommandGenerator


enable_boolean = CommandGenerator.CommandGenerator(
    action='enable the boolean for selinux to allow the execution of a container via systemd',
    correct_command='setsebool -P container_manage_cgroup on',
    hint='Hint: Use "setsebool -P container_manage_cgroup on" to enable the boolean for selinux to allow the execution of a container via systemd',
    command_output=[
        """
setsebool:  SELinux is enabled.
""",
    ],
    command_aspects=[
        """
 setsebool: This is the command used to set SELinux boolean values.
 -P: This option makes the change persistent across reboots. Without this option, the change would only be temporary and would be lost when the system restarts.
 container_manage_cgroup: This is the SELinux boolean that we are setting. SELinux booleans are flags that control various aspects of SELinux policy.
 on: This is the value we are setting the boolean to. In SELinux, boolean values can be either on or off.
"""
    ],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)


name_container = CommandGenerator.CommandGenerator(
    action='name your container',
    correct_command='podman run -d --name httpd-server -p 8080:80 httpd',
    hint='Hint: Use "podman run -d --name httpd-server -p 8080:80 httpd" to name your container',
    command_output=[
        """
f3a5b0ac7325a2cbb798cc1af307b1f63c47e317d3f24df8ad99f5659d30b11e

This output represents the unique identifier assigned to your container instance by Podman. The container is now running in the background.
""",
    ],
    command_aspects=[
        """
 podman run: This is the command used to run containers with Podman.
 -d: This option runs the container in detached mode, meaning it runs in the background and you can continue using the terminal after starting it.
 --name httpd-server: This option assigns a name to the container. In this case, the name is httpd-server.
 -p 8080:80: This option maps port 8080 on the host to port 80 inside the container. This means that you can access the web server running inside the container via port 8080 on the host system.
 httpd: This is the name of the container image you're running. It seems to be an image for an HTTP server (Apache HTTP Server, commonly known as httpd).
""",
    ],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)

generate_systemd = CommandGenerator.CommandGenerator(
    action='this command generates a systemd unit file for the container named httpd-server',
    correct_command='podman generate systemd httpd-server > /etc/systemd/system/httpd-container.service',
    hint='Use "podman generate systemd httpd-server > /etc/systemd/system/httpd-container.service" to generate a systemd unit file',
    command_output=[
        """
Assuming the command executes successfully, there won't be any output displayed in the terminal. You'll simply get back to the command prompt.
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line tool used for managing containers, similar to Docker.
 generate systemd httpd-server: This part of the command instructs Podman to generate a systemd unit file for managing a container named httpd-server. This unit file will contain instructions for systemd on how to start, stop, and manage this specific container.
 >: This is a redirection operator in Unix-like operating systems. It directs the standard output of the command on the left side to the file specified on the right side.
 /etc/systemd/system/httpd-container.service: This is the path where the generated systemd unit file will be written. This location is where systemd expects unit files to be placed for service management.
""",
    ],
    command_options=[
        """
Use : 
	systemctl enable httpd-container.service
	systemctl start httpd-container.service
to enable the service to start at boot and start it immediately
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
