import CommandGenerator as CommandGenerator

label = "testlabel"
device = "/dev/sdb1"
mount_point = "/mnt"
correct_line = f'LABEL={label} /mnt ext4 defaults 0 0'


check_e2label_command = CommandGenerator.CommandGenerator(
    action="assign label",
    correct_command="e2label /dev/sdb1 testlabel",
    hint="Hint: Use 'e2label' to perform actions related to filesystem labels.",
    intro_text=[f"""
As you venture further into the intricate world of system administration, you find yourself immersed within the very core of a Red Hat system. 
It's a realm where every command, every keystroke, holds the potential to shape the digital landscape around you. Standing at the threshold, you confront the command line interface, a gateway to the inner workings of the system, where the pulse of the machine is felt with each character typed.
Within this domain of ones and zeros, whispers float through the digital ether, murmurs of a command that carries formidable capabilities: 'e2label'. It's spoken of in hushed tones among seasoned administrators, revered for its ability to manipulate filesystem labels with precision and finesse. 
This command is more than just a tool; it's a key to unlocking hidden pathways within the system, allowing administrators to navigate and manage the filesystem with greater clarity and efficiency.
As you absorb these whispers and let the significance of 'e2label' sink in, you realize that mastering this command is essential for your journey as a system administrator. It symbolizes not just the manipulation of labels, but the mastery of the system itself—a testament to your understanding of its inner workings and your ability to wield its power responsibly.
With determination burning in your eyes, you take a deep breath and prepare to embark on a journey of discovery and learning. Armed with the knowledge of 'e2label' and fueled by the passion for understanding, you step forward into the depths of the Red Hat system, ready to uncover its secrets and emerge as a skilled guardian of its digital realm.
Your quest begins with the discovery of the following \nLabel: {label}\nDevice : {device}\nMount point : {mount_point}\n"""],

    outro_text=["""\n\nAs you stand at the threshold of this Red Hat system, the command line interface beckons, a realm of untold power and potential awaiting your command.\nWith each keystroke, you navigate the intricate pathways of this digital landscape, your fingers dancing upon the keys like a maestro conducting a symphony.
The whispers of the 'e2label' command linger in the air, a tantalizing promise of control over filesystem labels, a key to unlocking hidden secrets within the system.\nWith determination blazing in your eyes, you embark on your quest, armed with newfound knowledge and a thirst for discovery.
The journey ahead may be fraught with challenges and obstacles, yet you press onward, fueled by the thrill of exploration and the promise of mastery.\nFor in this realm of ones and zeros, you are not merely a spectator but an active participant, shaping the destiny of the system with each command you execute.
And so, with the echoes of your footsteps fading into the digital ether, you venture forth into the unknown,\nready to conquer the depths of the Red Hat system and emerge victorious, a true master of system administration."""],

    command_output=["If command is correct there won't be any output"],

    command_aspects=["'e2label': This is the command itself. It is a utility used for setting or changing the label of an ext2, ext3, or ext4 filesystem.",
                     "\n'/dev/sdb1': This is the device file representing the partition whose label you want to set or change. In this example, '/dev/sdb1' refers to the first partition on the second SCSI disk (sdb). This could vary depending on your system configuration. It's crucial to ensure that you specify the correct device, as incorrect usage could lead to unintended consequences such as data loss.",
                     "\n'testlabel':	This is the label you want to assign to the filesystem. It can be any string of up to 16 characters in length. The label provides a human-readable identifier for the filesystem, making it easier to identify and manage.",
                     "\nSo, when you execute this command, it will attempt to set the label of the ext2, ext3, or ext4 filesystem on /dev/sdb1 to 'testlabel'.\nIf successful, the filesystem will now be identified by the label 'testlabel' instead of its default label or any previously set label.\nIf there are any errors during the execution of the command, relevant error messages will be displayed to indicate what went wrong.",
                     ],

    command_options=[
        "-c, --clear: This option clears the label from the filesystem. It sets the label to an empty string."]
)

get_label = CommandGenerator.CommandGenerator(
    action="Find the label associated with a disk or partition",
    correct_command="e2label /dev/sdb1",
    hint="Hint: Use 'e2label /dev/sdb1'.",
    command_output=[
        "This command would output the current label of the filesystem on /dev/sdb1, if there is one set. If there's no label set, it will output nothing."],
    command_aspects=["'e2label': This is the command itself. It is a utility used for setting or changing the label of an ext2, ext3, or ext4 filesystem.",
                     "\n'/dev/sdb1': This is the device file representing the partition whose label you want to set or change. In this example, '/dev/sdb1' refers to the first partition on the second SCSI disk (sdb). This could vary depending on your system configuration. It's crucial to ensure that you specify the correct device, as incorrect usage could lead to unintended consequences such as data loss.",
                     ],
    command_options=[
        "-c, --clear: This option clears the label from the filesystem. It sets the label to an empty string."],

    intro_text=["""
\n\nAs you embark on your journey to unravel the mysteries of storage systems, you find yourself standing at the threshold of a vast and enigmatic realm.\nThe realm of disk labels. 
Before you, a puzzle awaits, shrouded in the mists of uncertainty yet beckoning with the promise of revelation. It is the puzzle of unlocking the labels that adorn each disk and partition, a task that requires both cunning and expertise.
In this realm of data and bytes, the command 'e2label' emerges as your trusty companion—a tool imbued with the power to decipher the cryptic symbols that mark the boundaries of storage devices. With each invocation of 'e2label', you edge closer to unlocking the secrets concealed within the digital labyrinth.
But tread carefully, for the path ahead is fraught with challenges and choices. Each decision you make, each command you wield, shapes the outcome of your quest. Will you dare to venture into the depths of the unknown, exploring uncharted territories in search of hidden treasures? Or will you tread the beaten path, relying on tried-and-tested methods to navigate the complexities of storage administration?
As you stand at this crossroads of discovery, the command 'e2label' becomes more than just a tool—it becomes a symbol of your determination and resilience. With its guidance, you navigate the intricacies of disk management, unlocking the potential of storage systems with each label revealed.
And so, armed with the command 'e2label' and fueled by the fire of curiosity, you forge ahead on your journey. Through valleys of data and peaks of information, you persevere, knowing that beyond the puzzle lies the promise of enlightenment. As you chart your course through the realm of disk labels, you embrace the challenges that lie ahead, ready to uncover the truths that await within.\n"""],
    outro_text=["""
As the echoes of your journey through the realm of disk labels fade into the ether, you stand on the precipice of newfound knowledge and mastery. The command 'e2label' has served as your guiding light, illuminating the path through the labyrinthine corridors of storage administration.
With each label unlocked, you have not only deciphered the secrets hidden within the digital landscape but also forged a deeper understanding of the intricate workings of storage systems. Your quest has transformed you into a seasoned explorer, equipped with the wisdom and expertise needed to navigate the complexities of the ever-evolving technological frontier.
Though this chapter of your journey may come to a close, the adventure continues onward. Armed with the lessons learned and the challenges overcome, you embark on the next leg of your odyssey, ready to face whatever trials may lie ahead.
With the command 'e2label' as your steadfast companion and your indomitable spirit as your guide, you stride forward into the unknown, eager to explore new horizons and unravel the mysteries that await on the path ahead. For in the endless expanse of the digital universe, there are always more secrets to uncover, more challenges to conquer, and more adventures to be had. And with each step you take, you move ever closer to becoming a true master of the digital domain.
""",],
)


provide_label_line = CommandGenerator.CommandGenerator(
    action="To mount a partition automaticaly on boot",
    correct_command=correct_line,
    hint=f"Hint: Use 'LABEL={label} /mnt ext4 defaults 0 0' to provide the label line.",
    command_output=["If command is correct there won't be any output"],

    command_aspects=[f"\nLABEL={label}: This part of the line specifies the label of the filesystem. In this context, {label} is a placeholder that would be replaced with the actual label name. When a filesystem is mounted using a label, the system looks for a filesystem with that specific label and mounts it accordingly",
                     f"\n{mount_point}: This part of the line specifies the mount point, which is the directory in the filesystem where the contents of the device will be accessible after it's mounted. In this case, the filesystem will be mounted at the {mount_point} directory",
                     "\next4: This part specifies the filesystem type. It indicates that the filesystem being mounted is of type ext4. The filesystem type is important for the system to understand how to interpret and handle the data on the device",
                     "\ndefaults: This part specifies the mount options. In this case, it specifies that the default mount options should be used. These options typically include settings for read-write access, permissions, and other parameters that control how the filesystem is mounted.",
                     "\n0: This part specifies the dump option. The dump option is used by the dump utility to determine whether the filesystem needs to be backed up. A value of 0 indicates that the filesystem should not be backed up by default.",
                     "\n0: This part specifies the fsck option. The fsck option is used by the fsck utility to determine the order in which filesystems should be checked during system boot. A value of 0 indicates that the filesystem should not be checked.",
                     "\nOverall, this line is a configuration entry in the /etc/fstab file, which is used by the system to automatically mount filesystems during boot. It specifies the details of how a particular filesystem should be mounted, including its label, mount point, filesystem type, mount options, and other parameters.",
                     ],
    command_options=["",],

    intro_text=[f"""
As you journey through the digital wilderness, you stumble upon a mysterious path. This path, known only to the wise, leads to the heart of the filesystem, where labels reside. As you approach, the whispers of the ancients guide your steps, revealing a hidden truth: Each label holds the key to a realm of data, waiting to be unlocked by those who dare to seek. With courage in your heart, you take a step forward, ready to embrace the challenge.

Your quest begins with the discovery of the following Label:
{label}
and the Mount point:
{mount_point}

As the whispers of ancient wisdom fade into the ether, you find yourself standing at the precipice of newfound understanding, your quest for knowledge within the digital wilderness nearing its conclusion. The path you've traversed, though fraught with challenges, has led you to the threshold of enlightenment.
Armed with the revelations of labels and mount points, you now possess the keys to unlock the hidden realms of data that lie within the filesystem. But your journey is far from over. For every mystery unraveled, countless more await discovery, beckoning you to delve deeper into the depths of the digital expanse.
With the courage and determination that have guided you thus far, you step forward into the unknown, ready to embrace the challenges and revelations that lie ahead. The echoes of your footsteps mingle with the whispers of the ancients, a testament to the endless quest for knowledge that drives you ever onward.
As you continue your exploration of the digital wilderness, remember that each discovery, each revelation, brings you closer to unlocking the secrets of the universe encoded within the bytes and bits of the filesystem. With each step, you affirm your status as a fearless explorer, boldly venturing where others fear to tread.
And so, with the promise of new horizons beckoning on the digital horizon, you embark on the next chapter of your journey, ready to chart a course through the ever-expanding frontier of knowledge that awaits within the vast expanse of the digital wilderness.\n
""",
                ],
    outro_text=["""
As the whispers of ancient wisdom fade into the ether, you find yourself standing at the precipice of newfound understanding, your quest for knowledge within the digital wilderness nearing its conclusion. The path you've traversed, though fraught with challenges, has led you to the threshold of enlightenment.
Armed with the revelations of labels and mount points, you now possess the keys to unlock the hidden realms of data that lie within the filesystem. But your journey is far from over. For every mystery unraveled, countless more await discovery, beckoning you to delve deeper into the depths of the digital expanse.
With the courage and determination that have guided you thus far, you step forward into the unknown, ready to embrace the challenges and revelations that lie ahead. The echoes of your footsteps mingle with the whispers of the ancients, a testament to the endless quest for knowledge that drives you ever onward.
As you continue your exploration of the digital wilderness, remember that each discovery, each revelation, brings you closer to unlocking the secrets of the universe encoded within the bytes and bits of the filesystem. With each step, you affirm your status as a fearless explorer, boldly venturing where others fear to tread.
And so, with the promise of new horizons beckoning on the digital horizon, you embark on the next chapter of your journey, ready to chart a course through the ever-expanding frontier of knowledge that awaits within the vast expanse of the digital wilderness.
""",],
)
