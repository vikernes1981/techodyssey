import CommandGenerator as CommandGenerator

check_remove_logical_volume_command = CommandGenerator.CommandGenerator(
    action="remove logical volume",
    correct_command="lvremove /dev/vg1/lv1",
    hint="Hint: Use 'lvremove /dev/vg1/lv1' to remove a logical volume.",
    command_output=[
        "Logical volume lv1 in volume group vg1 successfully removed\n"],
    command_aspects=["- 'lvremove': Command to release a logical volume from its captivity",
                     "- '/dev/vg1/lv1': Path of the logical volume to liberate",
                     "The 'lvremove' command grants freedom to logical volumes trapped within volume groups,allowing them to transcend the boundaries of their current existence.\n",
                     ],
    command_options=["- '-f, --force': Override any barriers hindering the liberation",
                     "- '-y, --yes': Automatically respond 'yes' to all queries, expediting the liberation",
                     ],

    intro_text=["""\nHowever, as you continue to optimize the system, you realize that some logical volumes are no longer needed.
With careful consideration, you decide to remove these unnecessary volumes to free up storage space.\n
You issue commands to remove the identified logical volumes, double-checking to ensure that no critical data will be lost.
As the commands execute, you watch attentively, confirming that each volume is successfully removed from the system.\n
With each unnecessary logical volume removed, you feel a sense of liberation, knowing that you're reclaiming valuable storage resources.
You carefully review the remaining volumes, ensuring that the system's storage is optimized for maximum efficiency.
As the system undergoes this transformation, you reflect on the importance of maintaining a lean and efficient infrastructure.
By removing unnecessary clutter, you're ensuring that the system remains agile and responsive to future challenges.\n"""],

    outro_text=["""As you wield the 'lvremove' command, the whispers of the liberated volumes echo through the chamber,ushering forth a symphony of newfound freedom.\n
With the removal of the identified logical volumes, you take a moment to appreciate the system's streamlined configuration.
Each action taken brings you closer to your goal of mastering Red Hat administration and safeguarding the cybernetic infrastructure.
As you prepare for the next challenge, you're filled with confidence, knowing that you're making a difference in the digital world.\n""",
                ],
)

check_resize_logical_volume_command = CommandGenerator.CommandGenerator(
    action="resize logical volume",
    correct_command="lvresize -L +1G /dev/vg1/lv1",
    hint="Hint: Use 'lvresize -L +1G /dev/vg1/lv1' to resize a logical volume.",
    command_output=["Size of logical volume lv1 changed from X to Y\n",],
    command_aspects=[
        "- 'lvresize': Command to resize a logical volume",
        "- '-L +1G': Option to specify the size to increase the logical volume (1 gigabyte in this case)",
        "- '/dev/vg1/lv1': Path of the logical volume to resize",
    ],
    command_options=[
        "- '-r, --resizefs': Resize the underlying filesystem alongside the logical volume",
        "- '-l, --extents': Extend or reduce the logical volume by a specified number of logical extents",
    ],
    intro_text=["""\nAs you delve deeper into system optimization, you realize the need to adjust the sizes of certain logical volumes.
With careful planning, you decide to resize these volumes to better allocate storage resources.\n
You issue commands to resize the identified logical volumes, ensuring that the changes are made smoothly and without data loss.
As the commands execute, you observe the resizing process, verifying that each volume is adjusted according to your specifications.\n
With the resizing of the logical volumes complete, you feel a sense of satisfaction, knowing that you've optimized storage allocation.
You carefully review the updated volumes, ensuring that the system's resources are distributed efficiently.
As the system adapts to the resized volumes, you marvel at the flexibility of modern storage technologies.
By adjusting volumes on-the-fly, you're able to meet changing demands and maintain optimal performance.\n""",
                ],
    outro_text=["""As you utter the command, the fabric of storage space begins to ripple and expand, accommodating your will.\n
With the successful resizing of logical volumes, you take a moment to appreciate the system's enhanced flexibility.
Each action taken brings you closer to mastering the intricacies of Red Hat administration and ensuring the system's resilience.
As you prepare for the next challenge, you're filled with confidence, knowing that you can adapt to whatever the digital world throws your way.\n""",
                ],
)


check_view_logical_volume_command = CommandGenerator.CommandGenerator(
    action="view logical volumes",
    correct_command="lvs",
    hint="Hint: Use 'lvs' to view Logical Volumes.",
    command_output=[
        "  LV       VG   Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert",
        "  lv_root  vg00 -wi-ao----  50.00g",
        "  lv_home  vg00 -wi-ao---- 100.00g",
        "  lv_var   vg01 -wi-a----- 150.00g",
    ],
    command_aspects=["- 'lvs': Command to view Logical Volumes",],
    command_options=["No available options",],

    intro_text=["""'\nWith the system optimization underway, you recognize the importance of regularly monitoring the status of logical volumes.
To gain insights into the current configuration, you decide to view the details of all logical volumes.\n
You issue commands to view the details of all logical volumes, seeking information on their sizes, usage, and mount points.
As the commands execute, you analyze the output, gaining valuable insights into the system's storage infrastructure.\n
As you review the details of each logical volume, you gain a deeper understanding of the system's storage utilization.
You make mental notes of any areas that may require further optimization or adjustment.
Armed with this information, you feel more confident in your ability to maintain the system's stability and performance.
Regular monitoring and analysis of logical volumes will ensure that the system remains resilient to potential challenges.\n""",
                ],

    outro_text=["""\nAs you invoke the command, the veil of mystery lifts, revealing the intricate tapestry of Logical Volumes.\n
With the successful viewing of logical volumes, you take a moment to appreciate the insights gained.
Each action taken brings you closer to mastering the art of Red Hat administration and ensuring the system's reliability.
As you prepare to tackle the next task, you do so with renewed confidence, knowing that you have a clear understanding of the system's storage infrastructure.\n""",
                ],
)


check_extend_logical_volume_command = CommandGenerator.CommandGenerator(
    action="extend logical volume",
    correct_command="lvextend -L+1G /dev/vg1/lv1",
    hint="Hint: Use 'lvextend -L+1G /dev/vg1/lv1' to extend a Logical Volume by 1GB.",
    command_output=[
        "Size of logical volume vg1/lv1 changed from X to Y.",
    ],
    command_aspects=[
        "- 'lvextend': Command to extend a Logical Volume",
        "- '-L+1G': Option to specify the size by which to extend the Logical Volume (1 gigabyte in this case)",
        "- '/dev/vg1/lv1': Path of the Logical Volume to extend",
    ],
    command_options=[
        "- '-r, --resizefs': Resize the filesystem along with the logical volume",
    ],

    intro_text=["""\nAs you continue to monitor the system's storage usage, you notice that certain volumes are approaching capacity.
To prevent potential issues and accommodate future growth, you decide to extend these volumes to increase their capacity.\n
You issue commands to extend the identified logical volumes, carefully specifying the additional size to be allocated.
As the commands execute, you observe the extension process, ensuring that each volume is expanded without data loss.\n
With each volume successfully extended, you feel a sense of relief, knowing that you've proactively addressed potentia storage constraints.
You review the updated volumes, confirming that they now have the capacity to accommodate future data growth.
As the system adapts to the expanded volumes, you marvel at the flexibility of modern storage technologies.
By extending volumes seamlessly, you're able to ensure the system's readiness for evolving storage demands.\n""",
                ],

    outro_text=["""\nWith the successful extension of logical volumes, you take a moment to appreciate the system's enhanced scalability.
Each action taken brings you closer to mastering the intricacies of Red Hat administration and ensuring the system's resilience.
As you prepare for the next challenge, you do so with renewed confidence, knowing that you've effectively managed the system's storage resources.\n""",
                ],
)


check_create_logical_volume_command = CommandGenerator.CommandGenerator(
    action="create logical volume",
    correct_command="lvcreate -L 1G -n lv1 vg1",
    hint="Hint: Use 'lvcreate -L 1G -n lv1 vg1' to create a logical volume.",
    command_output=["Logical volume lv1 created."],
    command_aspects=[
        "- 'lvcreate': Command to create a logical volume",
        "- '-L 1G': Option to specify the size of the logical volume (1 gigabyte in this case)",
        "- '-n lv1': Option to specify the name of the logical volume",
        "- 'vg1': Name of the volume group to which the logical volume belongs",
    ],
    command_options=[
        "- '-i, --stripes': Create a striped logical volume",
        "- '-I, --stripesize': Specify the stripe size for a striped logical volume",
    ],

    intro_text=["""\nAs you assess the system's storage requirements, you identify the need for additional storage space to accommodate growing data.
With careful planning, you decide to create new logical volumes to address this need and enhance the system's storage capacity.\n
You issue commands to create new logical volumes, specifying the size and characteristics of each volume.
As the commands execute, you observe the creation process, ensuring that each volume is set up according to your specifications.\n
With each logical volume successfully created, you feel a sense of accomplishment, knowing that you've expanded the system's storage capacity.
You review the details of the new volumes, confirming that they meet the system's requirements and will effectively serve their intended purposes.
As the system incorporates the new volumes, you envision the possibilities they bring for storing and managing data.
With each volume strategically allocated, you're confident in the system's ability to handle current and future data needs.\n"""
                ],

    outro_text=["""\nWith the successful creation of logical volumes, you take a moment to appreciate the system's enhanced storage capabilities.
Each action taken brings you closer to mastering the intricacies of Red Hat administration and ensuring the system's readiness for evolving demands.
As you prepare for the next challenge, you do so with renewed confidence, knowing that you've effectively expanded the system's storage resources.\n"""
                ],
)
