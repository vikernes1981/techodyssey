import chapter7_users_groups.CommandGenerator as CommandGenerator


podman_run = CommandGenerator.CommandGenerator(
    action='run a container',
    correct_command='podman run docker.io/library/httpd',
    hint='Hint: Use "podman run docker.io/library/httpd" to run containers',
    command_output=[
        """
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 172.17.0.2. Set the 'ServerName' directive globally to suppress this message
[Fri Jan 31 18:26:55.058280 2020] [mpm_event:notice] [pid 1:tid 140429405252352] AH00489: Apache/2.4.38 (Debian) configured -- resuming normal operations
[Fri Jan 31 18:26:55.058403 2020] [core:notice] [pid 1:tid 140429405252352] AH00094: Command line: 'httpd -D FOREGROUND'
""",
        """
This output shows that Apache HTTP Server (httpd) is starting up and serving requests.
The exact output might vary based on the specific version of the httpd image you're using and any 
configuration changes you've made.
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface (CLI) for Podman, which is a container management tool similar to Docker. It allows you to manage containers on your system.
 run: This sub-command tells Podman to create and run a new container.
 docker.io/library/httpd: This is the name of the image to use for creating the container. Here's what each part of the image name represents:
     docker.io: This specifies the Docker Hub registry where the image is located. docker.io is the default Docker registry and is often omitted.
     library: This is the namespace or organization on Docker Hub. The library namespace contains official images maintained by Docker.
     httpd: This is the name of the image. In this case, it's the official Apache HTTP Server image.
""",
    ],
    command_options=[
        """
- -d, --detach: Run the container in the background (detached mode).
- --name <name>: Assign a name to the container.
- -p, --publish <host_port>:<container_port>: Publish a container's port(s) to the host.
- -v, --volume <host_path>:<container_path>: Bind mount a volume from the host into the container.
- --rm: Automatically remove the container when it exits.
- -e, --env <key=value>: Set environment variables in the container.
- -i, --interactive: Keep STDIN open even if not attached.
- -t, --tty: Allocate a pseudo-TTY.
- --network <network_name>: Connect the container to a specified network.
- --user <username or UID>: Specify the username or UID to run the container as.
- --restart <policy>: Restart policy for the container.
- --security-opt <options>: Security options for the container.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


list_running_containers = CommandGenerator.CommandGenerator(
    action='list running containers',
    correct_command='podman ps',
    hint='Hint: Use "podman ps" to list running containers',
    command_output=[
        """
CONTAINER ID  IMAGE                           COMMAND               CREATED        STATUS            PORTS                   NAMES
8b3d7321881b  docker.io/library/httpd:latest  httpd-foreground      2 minutes ago  Up 2 minutes ago  0.0.0.0:8080->80/tcp    web_server
d6170b8d3711  docker.io/library/mysql:latest  mysqld                5 days ago     Up 5 days         0.0.0.0:3306->3306/tcp  db_server
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for Podman, a container management tool.
 ps: This is a sub-command of Podman, used to list containers.
""",
    ],
    command_options=[
        """
- -a, --all: Show all containers, including those that are stopped.
- --filter: Filter output based on conditions provided.
- --format: Customize the output format using Go templates.
- -n, --last <N>: Show only the last N created containers, including non-running ones.
- --latest, -l: Show the latest created container, including non-running ones.
- --no-trunc: Do not truncate output.
- --quiet, -q: Only display container IDs.
- --size, -s: Display total file sizes.
- --timestamps, -T: Show timestamps.
- --untracked: Show containers created but not started.
- --until, -u: Show containers created before a specific time.
- --since, -S: Show containers created after a specific time.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


podman_logs = CommandGenerator.CommandGenerator(
    action='get the logs from a particular container',
    correct_command='podman logs http-server',
    hint='Hint: Use "podman logs http-server" to get the logs from a particular container',
    command_output=[
        """
[Mon Mar 21 08:00:00 2024] [notice] Apache/2.4.38 (Debian) configured -- resuming normal operations
[Mon Mar 21 08:00:00 2024] [info] Server built: Mar 21 2024 07:59:59
[Mon Mar 21 08:00:00 2024] [debug] worker.c(1759): Accept mutex: sysvsem (default: sysvsem)
[Mon Mar 21 08:00:00 2024] [notice] Child 1: starting thread to listen on port 80
[Mon Mar 21 08:00:00 2024] [notice] Child 2: starting thread to listen on port 443
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for Podman, a container management tool.
 logs: This is a sub-command of Podman, used to fetch the logs of a specific container.
 8b3d7321881b: This is the Container ID of the container for which you want to view the logs.
""",
    ],
    command_options=[
        """
- -f, --follow: Follow the log output. This option allows you to continuously stream the logs as new logs are generated.
- --since: Show logs since a specific timestamp.
- --tail: Output the specified number of lines from the end of the logs.
- --timestamps: Include timestamps in the log output.
- --details: Show extra details provided by the container runtime.
- --no-color: Disable colorized output.
- --latest, -l: Fetch logs from the latest created container.
- --no-trunc: Do not truncate output.
- --stream: Stream logs, similar to the -f, --follow option.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


podman_top = CommandGenerator.CommandGenerator(
    action='get running proccesses in a container',
    correct_command='podman top http-server',
    hint='Hint: Use "podman top http-server" to get running proccesses in http-server container',
    command_output=[
        """
UID         PID   PPID   C STIME TTY          TIME CMD
root          1      0  0 14:06 ?        00:00:02 httpd -DFOREGROUND
""",
        """
This example indicates that there's one process running in the container with the command httpd -DFOREGROUND.
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for Podman, a container management tool.
 top: This is a sub-command of Podman, used to display the running processes within a container.
 http-server: This is the name or ID of the container for which you want to view the running processes.
""",
    ],
    command_options=[
        """
- -l, --latest: Show the top processes of the latest created container.
- --format: Specify the output format using a Go template.
- --pidfile: Path to the file where the PID of the container is stored.
- --no-headers: Do not print column headers.
- -n, --iterations: Number of iterations to display. Default is 1.
- -c, --cpu: Sort by CPU usage.
- -m, --memory: Sort by memory usage.
- -p, --processes: Number of processes to display. Default is all.
- -u, --user: Display processes for a specific user.
- -w, --watch: Watch for changes and continuously display process information.
- --quiet: Only display process IDs (PIDs).
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

podman_stop = CommandGenerator.CommandGenerator(
    action='stop a container',
    correct_command='podman stop http-server',
    hint='Hint: Use "podman stop http-server" to stop http-server',
    command_output=[
        """
http-server
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for Podman, a container management tool.
 stop: This is a sub-command of Podman, used to stop one or more running containers.
 http-server: This is the name or ID of the container you want to stop.
""",
    ],
    command_options=[
        """
- --time, -t: Seconds to wait for stop before killing it (default 10).
- --all, -a: Stop all running containers.
- --latest, -l: Stop the latest created container.
- --ignore, -i: Ignore errors if the container doesn't exist or is already stopped.
- --timeout: Timeout for pod to stop.
- --force, -f: Force stop the container.
- --wait, -w: Wait for the container to stop before returning.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


podman_start = CommandGenerator.CommandGenerator(
    action='start a container',
    correct_command='podman start http-server',
    hint='Hint: Use "podman start http-server" to start http-server',
    command_output=[
        """
http-server
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for Podman, a container management tool.
 start: This is a sub-command of Podman, used to start one or more previously stopped containers.
 http-server: This is the name or ID of the container you want to start.
""",
    ],
    command_options=[
        """
- --attach, -a: Attach to the container after starting it.
- --all, -a: Start all stopped containers.
- --latest, -l: Start the latest created container.
- --ignore, -i: Ignore errors if the container is already started.
- --timeout: Timeout for the start operation.
- --cgroup-manager: Specify the cgroup manager to use.
- --name, -n: Assign a name to the container.
- --detach-keys: Override the key sequence for detaching a container.
- --enable-ipv6: Enable IPv6 networking for the container.
- --enable-ipv4: Enable IPv4 networking for the container.
- --network, -n: Connect the container to a specified network.
- --restart-policy: Restart policy for the container.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


podman_remove = CommandGenerator.CommandGenerator(
    action='remove a container',
    correct_command='podman remove http-server',
    hint='Hint: Use "podman remove http-server" to remove http-server',
    command_output=[
        """
http-server
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for Podman, a container management tool.
 remove: This is a sub-command of Podman, used to remove one or more containers.
 http-server: This is the name or ID of the container you want to remove.
""",
    ],
    command_options=[
        """
- --force, -f: Force removal of the container(s) even if they are running.
- --all, -a: Remove all containers, not just those specified.
- --volumes, -v: Remove volumes associated with the container(s).
- --storage, -s: Specify an alternate storage path.
- --ignore, -i: Ignore errors if the container does not exist.
- --latest, -l: Remove the latest created container.
- --untagged, -u: Remove untagged container images.
- --prune, -p: Prune stopped containers and unused volumes.
- --pod: Remove all containers in the specified pod.
- --force-all, -fa: Force removal of all containers, including those with running exec sessions.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

podman_build = CommandGenerator.CommandGenerator(
    action='build a container image',
    correct_command='podman build -t http-server .',
    hint='Hint: Use "podman build -t http-server ." to build a container image',
    command_output=[
        """
STEP 1: FROM docker.io/library/httpd:latest
STEP 2: LABEL authors="Your Name <your.email@example.com>"
STEP 3: RUN apt-get update && apt-get install -y nginx
STEP 4: CMD ["nginx", "-g", "daemon off;"]

Building image from Dockerfile at: .
Getting image source signatures
Copying blob 5f70bf18a086 done
Copying blob a55b24e5372f done
Copying blob a9eb17255234 done
Copying blob 58cb8cbe6ea3 done
Copying config 073e2f232ed done
Writing manifest to image destination
Storing signatures
STEP 1: FROM docker.io/library/httpd:latest
STEP 2: LABEL authors="Your Name <your.email@example.com>"
STEP 3: RUN apt-get update && apt-get install -y nginx
STEP 4: CMD ["nginx", "-g", "daemon off;"]
STEP 5: COMMIT http-server

http-server:latest
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for Podman, a container management tool.
 build: This is a sub-command of Podman, used to build a container image.
 -t http-server: This option specifies the name and optionally a tag for the image being built. In this case, the image will be named http-server. The -t option is shorthand for --tag.
 .: This specifies the build context, which is the directory containing the Dockerfile and any other files required for building the image. In this case, . represents the current directory.
""",
    ],
    command_options=[
        """
- --file, -f: Specify the path to the Dockerfile. By default, Podman looks for a file named Dockerfile in the build context directory.
- --tag, -t: Assign a name and optionally a tag to the built image.
- --no-cache: Do not use cache when building the image.
- --squash: Squash newly built layers into a single new layer.
- --build-arg: Set build-time variables for the Dockerfile.
- --label: Add metadata to the image.
- --format: Specify the format of the output.
- --force-rm: Always remove intermediate containers after a successful build.
- --pull: Always attempt to pull a newer version of the base image before building.
- --security-opt: Override default security options for the build process.
- --isolation: Specify the container isolation technology to use during the build process.
- --quiet, -q: Suppress output of build process details, only show built image IDs.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

dockerfile = CommandGenerator.CommandGenerator(
    action='create a Dockerfile for podman to create a container',
    correct_command="""
FROM docker.io/library/httpd:latest 
RUN yum -y install httpd; yum clean all; systemctl enable httpd;
RUN echo "Successful Web Server Test" redirect-to /var/www/html/index.html 
RUN mkdir /etc/systemd/system/httpd.service.d/; echo -e '[Service]\nRestart=always' > /etc/systemd/system/httpd.service.d/httpd.conf 
EXPOSE 80 
""",
    hint="""
Hint: 
FROM docker.io/library/httpd:latest 
RUN yum -y install httpd; yum clean all; systemctl enable httpd;
RUN echo "Successful Web Server Test" redirect-to /var/www/html/index.html 
RUN mkdir /etc/systemd/system/httpd.service.d/; echo -e '[Service]\nRestart=always' > /etc/systemd/system/httpd.service.d/httpd.conf 
EXPOSE 80 
""",
    command_output=[
        """
This will be writen in a new file named Dockerfile using a text editor so there won't be any output.
After you save the file use :
podman build -t <the tag you wish to give to container> .
""",
    ],
    command_aspects=[
        """
 FROM docker.io/library/httpd:latest: This line specifies the base image to use for the container. It pulls the latest version of the httpd image from the Docker Hub registry. This image provides the Apache HTTP Server.
 RUN yum -y install httpd; yum clean all; systemctl enable httpd;: This line installs the Apache HTTP Server (httpd) package using the package manager yum. It then cleans up the package cache with yum clean all to reduce the image size. Finally, it enables the httpd service to start automatically when the container starts using systemctl enable httpd.
 RUN echo "Successful Web Server Test" redirect-to /var/www/html/index.html: This line creates a simple HTML file with the content "Successful Web Server Test" and redirects it to /var/www/html/index.html. This file will be served by the Apache HTTP Server.
 RUN mkdir /etc/systemd/system/httpd.service.d/; echo -e '[Service]\nRestart=always' > /etc/systemd/system/httpd.service.d/httpd.conf: This line creates a directory /etc/systemd/system/httpd.service.d/ and creates a file named httpd.conf inside it. It sets the Restart option to always for the httpd service. This configuration ensures that the Apache HTTP Server service restarts automatically if it crashes or stops unexpectedly.
 EXPOSE 80: This line exposes port 80 from the container to allow incoming connections to the Apache HTTP Server. It indicates that the container will listen for HTTP traffic on port 80.
""",
    ],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)
