import chapter7_users_groups.CommandGenerator as CommandGenerator

podman_inspect = CommandGenerator.CommandGenerator(
    action='inspect an already pulled container image',
    correct_command='podman inspect <container image name>',
    hint='Hint: Use "podman inspect <container image name>" to inspect an already pulled container image',
    command_output=[
        """
[
    {
        "Id": "sha256:abcdef123456...",
        "RepoTags": [
            "registry.redhat.io/ubi8/ubi:latest"
        ],
        "RepoDigests": [
            "registry.redhat.io/ubi8/ubi@sha256:abcdef123456..."
        ],
        "Created": "2023-03-19T12:34:56.789012345Z",
        "Config": {
            "Hostname": "abcdef123456",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            ...
        },
        "Architecture": "amd64",
        "Os": "linux",
        ...
    }
]

""",
    ],
    command_aspects=[
        """
 podman: This is the command-line interface for interacting with containers and container images. Podman is similar to Docker, allowing you to manage containers but with different syntax and some added functionalities.
 inspect: This is a subcommand of Podman used to obtain detailed information about containers, images, volumes, or other resources. When you run podman inspect, followed by the name or ID of a container or image, Podman returns a JSON-formatted output containing detailed metadata about that resource.
 registry.redhat.io/ubi8/ubi: This is the identifier for the container image you want to inspect. In this case, it refers to an image named ubi from the Red Hat Universal Base Image (UBI) repository. The image is tagged with ubi8, indicating it is based on Red Hat Enterprise Linux (RHEL) version 8.
""",
    ],
    command_options=[
        """
- Format the Output (-f, --format): Specifies a Go template for formatting the output.
- Type of Resource (--type): Specifies the type of resource you want to inspect (container, image, volume, network, or all).
- All Information (-a, --all): Requests all available information, including internal details.
- Raw JSON Output (--format=json): Ensures JSON output format.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


skopeo_inspect = CommandGenerator.CommandGenerator(
    action='inspect a remote container image',
    correct_command='skopeo inspect <remote container image>',
    hint='Hint: Use "skopeo inspect <remote container image>"to inspect a remote container image',
    command_output=[
        """
{
    "Name": "registry.redhat.io/ubi8/ubi-init",
    "Digest": "sha256:abcdef123456...",
    "RepoTags": [
        "registry.redhat.io/ubi8/ubi-init:latest"
    ],
    "Created": "2023-03-19T12:34:56.789012345Z",
    "Architecture": "amd64",
    "Layers": [
        "sha256:abcdef123456...",
        "sha256:123456abcdef..."
    ],
    "Labels": {
        "com.redhat.component": "ubi-init-container",
        "vendor": "Red Hat, Inc.",
        ...
    },
    "Env": [
        "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        ...
    ],
    ...
}
""",
    ],
    command_aspects=[
        """
 skopeo: This is a command-line utility for working with container images and container image repositories. It allows you to perform various operations such as inspecting, copying, and transferring container images between different types of container registries.
 inspect: This is a subcommand of Skopeo used to obtain detailed information about a container image. When you run skopeo inspect, followed by the name or URL of a container image, Skopeo returns JSON-formatted metadata about that image.
 docker://registry.redhat.io/ubi8/ubi-init: This is the identifier for the container image you want to inspect. In this case, it refers to an image named ubi-init from the Red Hat Universal Base Image (UBI) repository. The image is hosted in the Docker registry registry.redhat.io, and ubi8 signifies that it is based on Red Hat Enterprise Linux (RHEL) version 8.
""",
    ],
    command_options=[
        """
- TLS Verification (--tls-verify=true/false): Specifies whether to verify TLS certificates when connecting to the registry. Default is true.
- Credentials (--creds=username:password): Specifies the username and password for authenticating with the registry. This option is useful if the registry requires authentication.
- TLSCAPath (--tls-ca-path=path): Specifies the path to a directory containing CA certificates for verifying the registry's certificate. This option is used when the registry's certificate is signed by a custom CA.
- Insecure Policy (--tls-verify=false): Specifies whether to skip TLS verification entirely. This option is used when connecting to registries without proper TLS certificates.
- Policy Path (--policy): Specifies the path to a file containing signature verification policies. This option is used when checking for signed content in the image.
- Signature Policy (--sign-by): Specifies the key to use for verifying signatures. This option is used when checking for signed content in the image.
- Format (--format): Specifies the format of the output. It can be 'json' or 'json-pretty'.
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
