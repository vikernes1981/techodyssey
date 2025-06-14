import chapter7_users_groups.CommandGenerator as CommandGenerator

grub2_list = CommandGenerator.CommandGenerator(
    action='list the environment options for modification for grub',
    correct_command='grub2-editenv list',
    hint='Hint: Use "grub2-editenv list" to list the environment options for modification for grub.',
    command_output=[
        """
saved_entry=e68408dd5cce4d3ca61789657a786401-5.14.0-362.18.1.el9_3.x86_64
menu_auto_hide=1
boot_success=0
boot_indeterminate=0
""",
    ],
    command_aspects=[
        """
- grub2-editenv: This is the command-line tool used to manage GRUB 2's environment block. It allows you to view, modify, or reset variables stored in the environment block.
- list: This is an argument passed to the grub2-editenv command, specifying that you want to list the current values of all variables in the environment block.
""",
    ],
    command_options=[
        """
  -h, --help            display this help and exit
  -V, --version         output version information and exit
  -v, --verbose         print verbose messages
  --debug               print debugging messages
  -q, --quiet           do not print any messages
  --force               overwrite changes to default environment variables
  --backup-file=FILE    make backup of FILE
  --boot-directory=DIR  set GRUB2 boot directory to DIR
  --grub-directory=DIR  set GRUB2 config directory to DIR

For more details, see grub2-editenv(1).
""",
    ],
    intro_text=['',],
    outro_text=['',],
)


grub2_set_default = CommandGenerator.CommandGenerator(
    action='set the current kernel as the default for boot',
    correct_command='grub2-set-default 0',
    hint='Hint: Use "grub2-set-default 0" to set the current kernel as the default for boot',
    command_output=[
        """
This command doesn't typically produce any output unless there is an error.
It simply sets the default boot entry to the specified index (in this case, 0)
""",
    ],
    command_aspects=[
        """
    grub2-set-default: This is the command used to set the default boot entry in the GRUB bootloader.
    0: This is the argument passed to the grub2-set-default command, specifying the index of the boot entry you want to set as the default.
""",
    ],
    command_options=[
        """
  -h, --help              display this help and exit
  -V, --version           output version information and exit
  -v, --verbose           increase verbosity
  -q, --quiet             decrease verbosity
  -N, --no-nvram          do not update NVRAM (default)
  -s, --save-default      save the choice as the new default
  -c, --config-file=FILE  use FILE as grubenv
  -n, --bootloader-id=ID  set default entry in GRUB2_BOOT_DIR
  -d, --directory=DIR     set GRUB2 directory to DIR

For more details, see grub2-set-default(8).

""",
    ],
    intro_text=['',],
    outro_text=['',],
)

grub2_mkconfig = CommandGenerator.CommandGenerator(
    action='view, modify and the apply configuration for entire grub configuration of your system',
    correct_command='grub2-mkconfig -o /boot/grub2/grub.cfg',
    hint='Hint: Use "grub2-mkconfig -o /boot/grub2/grub.cfg" to apply modifications on grub',
    command_output=[
        """
IMPORTANT NOTICE
-----------------

Modifying the GRUB configuration on a Red Hat system typically involves editing the /etc/default/grub file and then
rebuilding the GRUB configuration. Here's a step-by-step guide on how to do this:

    Open the GRUB configuration file for editing:

sudo nano /etc/default/grub

Replace nano with your preferred text editor if you have one.

Make your desired changes:

Inside the /etc/default/grub file, you'll find various configuration options. Some common modifications include:

    Changing the default boot entry.
    Modifying kernel parameters.
    Adjusting timeout values.
    Adding boot parameters.

Make your desired changes to the configuration file.

Save and close the file:

After making the necessary changes, save the file and close the text editor.

Update GRUB configuration:

After modifying the /etc/default/grub file, you need to update the GRUB configuration to apply the changes. Run the following command:

bash

    sudo grub2-mkconfig -o /boot/grub2/grub.cfg

    This command rebuilds the GRUB configuration file (grub.cfg) based on the changes made to /etc/default/grub.

    Verify the changes:

    Reboot your system, and during startup, you can see the changes reflected in the GRUB boot menu. For example, if you changed the default boot entry, you should see the system booting into the new default entry.

That's it! You've successfully modified the GRUB configuration on your Red Hat system. Remember to exercise caution when editing configuration files to avoid causing issues with system booting. It's always a good practice to create a backup of the original configuration file before making any changes.
""",
        """
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-4.18.0-305.el8.x86_64
Found initrd image: /boot/initramfs-4.18.0-305.el8.x86_64.img
Found linux image: /boot/vmlinuz-4.18.0-240.el8.x86_64
Found initrd image: /boot/initramfs-4.18.0-240.el8.x86_64.img
Found CentOS Linux release 8.5.2111 on /dev/sda1
done
""",
    ],
    command_aspects=[
        """
 grub2-mkconfig: This command generates a new GRUB configuration file based on the configuration files present in /etc/grub.d/ and the settings specified in /etc/default/grub. It scans for available operating systems and kernel images on the system and creates entries for them in the configuration file.
 -o /boot/grub2/grub.cfg: This option specifies the output file for the generated GRUB configuration. The -o flag followed by the file path (/boot/grub2/grub.cfg) indicates that the generated configuration will be saved to the specified file. In this case, it's /boot/grub2/grub.cfg, which is the default location for the GRUB configuration file on many Linux distributions, including Red Hat-based systems.
""",
    ],
    command_options=[
        """
Usage: grub2-mkconfig [OPTION...]
Generate grub config file.

  -o, --output=FILE          write output to FILE instead of stdout
  -d, --directory=DIR        use grub config files in DIR [default=/boot/grub2]
  -v, --verbose              print verbose messages
  -s, --silent               suppress normal output
  --version                  print version information and exit
  --help                     display this help and exit
""",
    ],
    intro_text=['',],
    outro_text=['',],
)

grubby_install = CommandGenerator.CommandGenerator(
    action='install grubby',
    correct_command='dnf install grubby',
    hint='Hint: Use "dnf install grubby" to install grubby',
    command_output=[
        """
$ sudo dnf install grubby
[sudo] password for user:
Last metadata expiration check: <timestamp>
Dependencies resolved.
================================================================================
 Package       Architecture    Version                 Repository         Size
================================================================================
Installing:
 grubby        x86_64          <version>               <repository>      <size>

Transaction Summary
================================================================================
Install  1 Package

Total download size: <size>
Installed size: <size>
Is this ok [y/N]: y
Downloading Packages:
<Downloading progress...>
""",
    ],
    command_aspects=[
        """
- dnf: This is the package manager used in Fedora and other Red Hat-based Linux distributions. It stands for "Dandified Yum", and it's used for installing, updating, and removing software packages on the system.
- install: This is the subcommand of dnf used to install packages. When you specify install, you're telling dnf that you want to install the specified package(s).
- grubby: This is the name of the package you want to install. In this case, you're installing the grubby package, which is a tool used to manipulate the GRUB (GRand Unified Bootloader) configuration on Fedora and Red Hat-based Linux systems.
""",
    ],
    command_options=[
        """
  -y, --assumeyes: Automatically answer "yes" to all prompts. This can be useful for scripting or when you want to install packages without interactive confirmation.
  --nobest: Don't install the "best" package version. By default, DNF installs the highest available version of a package. This option disables that behavior.
  --allowerasing: Allow DNF to remove packages to satisfy dependencies. This can be useful if a package conflicts with others that are already installed.
""",
        """
HERE ARE GRUBBY OPTIONS
------------------------

Usage: grubby [OPTION...]
-a --add-kernel=KERNEL_PATH
     Add new kernel to boot menu
-A --append-kernel=KERNEL_PATH
     Append the given kernel to the existing kernel line
-d --default-kernel=KERNEL_PATH
     Set the default kernel
-D --remove-kernel=KERNEL_PATH
     Remove kernel from boot menu
-l --list-kernel
     List kernels
-i --info=KERNEL_PATH
     Get information about a kernel
-g --grub=GRUB_PATH
     Path to grub.conf
-r --root-directory=DIR
     Directory to operate on
-e --edit-kernel=KERNEL_PATH
     Edit kernel's title and kernel command line
-s --set-default=KERNEL_PATH
     Set default kernel to the one specified
-S --remove-default
     Remove default kernel setting
-t --title=TITLE
     Title to use with --add-kernel
-b --bootloader-id=ID
     Bootloader identifier
-h --help
     Print this message and exit
-v --verbose
     Verbose output
""",
    ],
    intro_text=['',],
    outro_text=['',],
)
