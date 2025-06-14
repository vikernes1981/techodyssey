import chapter7_users_groups.CommandGenerator as CommandGenerator


install_podman = CommandGenerator.CommandGenerator(
    action='install podman',
    correct_command='dnf install podman',
    hint='Hint: Use "dnf install podman" to install podman',
    command_output=[
        """
$ sudo dnf install podman
Last metadata expiration check: <timestamp>
Dependencies resolved.
=================================================================================================
 Package                      Architecture   Version                Repository              Size
=================================================================================================
Installing:
 podman                       x86_64         <version>              fedora                 <size>

Transaction Summary
=================================================================================================
Install  1 Package

Total download size: <size>
Installed size: <size>
Is this ok [y/N]: y
Downloading Packages:
podman-<version>.x86_64.rpm                             <size>  00:00:00

Total                                              <size>  00:00:00

Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                       1/1
  Installing       : podman-<version>.x86_64                                             1/1
  Running scriptlet: podman-<version>.x86_64                                             1/1
  Verifying        : podman-<version>.x86_64                                             1/1

Installed:
  podman-<version>.x86_64

Complete!
""",
    ],
    command_aspects=[
        """
 dnf: This is the package manager used in Fedora, Red Hat Enterprise Linux (RHEL), and related distributions. It stands for "Dandified Yum".
 install: This is the command used with DNF to install packages.
 podman: This is the name of the package that you want to install. In this case, it's Podman, a tool for managing containers, similar to Docker.
""",
    ],
    command_options=['',],
    intro_text=['',],
    outro_text=['',],
)

podman_search = CommandGenerator.CommandGenerator(
    action='search for a container',
    correct_command='podman search httpd',
    hint='Hint: Use "podman search httpd" to search for httpd container',
    command_output=[
        """
INDEX       NAME                                DESCRIPTION                                     STARS   OFFICIAL   AUTOMATED
docker.io   docker.io/httpd                     The Apache HTTP Server Project                  3327    [OK]       
docker.io   docker.io/httpd:2.4                 The Apache HTTP Server Project                  1582    [OK]       
docker.io   docker.io/fedora/httpd              Docker Official Image packaging for Fedora's  ...  9                 [OK]
docker.io   docker.io/centos/httpd              Docker Official Image packaging for CentOS's ...  8                 [OK]
docker.io   docker.io/alpinelinux/httpd         Docker Official Image packaging for Alpine' ...  4                 [OK]
docker.io   docker.io/amazonlinux/httpd         Docker Official Image packaging for Amazon  ...  4                 [OK]
docker.io   docker.io/library/httpd             Library content for httpd                       3                 [OK]
docker.io   docker.io/opensuse/httpd            Docker Official Image packaging for openSUSE    3                 [OK]
docker.io   docker.io/ubuntu/httpd              Docker Official Image packaging for Ubuntu' ...  2                 [OK]
docker.io   docker.io/debian/httpd              Docker Official Image packaging for Debian' ...  2                 [OK]
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line tool used for managing containers, similar to Docker.
 search: This is the subcommand of Podman used to search for container images.
 httpd: This is the search term used to find container images related to the Apache HTTP Server (commonly referred to as httpd).
""",
    ],
    command_options=[
        """
- --format: Specifies a Go template to format the output. The default template provides information about the name, description, stars, official status, and automated status of the images.
- --limit: Limits the number of search results returned. By default, it returns up to 25 results.
- --no-trunc: Disables truncating of output. By default, the output is truncated.
- --regexp: Interprets the search string as a regular expression.
- --source: Specifies a specific registry to search for images. The default registry is docker.io.
- --timeout: Sets the HTTP client timeout for the search operation. The default timeout is 30 seconds.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

podman_pull = CommandGenerator.CommandGenerator(
    action='pull a container',
    correct_command='podman pull docker.io/library/httpd',
    hint='Hint: Use "podman pull docker.io/library/httpd" to pull a container',
    command_output=[
        """
Trying to pull docker.io/library/httpd...
Getting image source signatures
Copying blob sha256:<sha> [======================================] <size> / <size>
Copying blob sha256:<sha> [======================================] <size> / <size>
Copying blob sha256:<sha> [======================================] <size> / <size>
Copying blob sha256:<sha> [======================================] <size> / <size>
Copying config sha256:<sha> [======================================] <size> / <size>
Writing manifest to image destination
Storing signatures
""",
    ],
    command_aspects=[
        """
 podman: This is the command-line tool used for managing containers, similar to Docker.
 pull: This is the subcommand of Podman used to pull container images from a container registry.
 docker.io/library/httpd: This is the name of the image you want to pull. In this case, you're pulling the httpd image from the library repository on Docker Hub.
""",
    ],
    command_options=[
        """
- --all-platforms: Fetches all available platforms for the image. This is useful when the image supports multiple architectures and you want to fetch all of them.
- --disable-compression: Disables compression of the image. By default, images are compressed during transfer to reduce bandwidth usage.
- --platform: Sets the platform if the server is multi-platform capable. This option allows you to specify a specific platform if the image supports multiple platforms.
- --quiet, -q: Pulls images with less output. This option reduces the verbosity of the output during the pull operation.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
