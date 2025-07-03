const logical_volumes = [
    {
        id: "create_logical_volume",
        title: "Create Logical Volume",
        action: "create logical volume",
        // Scenario: User needs to add new storage by creating a logical volume
        intro: `As you assess the system's storage requirements, you identify the need for additional storage space to accommodate growing data.
With careful planning, you decide to create new logical volumes to address this need and enhance the system's storage capacity.
You issue commands to create new logical volumes, specifying the size and characteristics of each volume.
As the commands execute, you observe the creation process, ensuring that each volume is set up according to your specifications.
With each logical volume successfully created, you feel a sense of accomplishment, knowing that you've expanded the system's storage capacity.
You review the details of the new volumes, confirming that they meet the system's requirements and will effectively serve their intended purposes.
As the system incorporates the new volumes, you envision the possibilities they bring for storing and managing data.
With each volume strategically allocated, you're confident in the system's ability to handle current and future data needs.`,
        solution: "lvcreate -L 1G -n lv1 vg1", // Command to create a 1GB logical volume named lv1 in volume group vg1
        hints: [
            "Hint: Use 'lvcreate -L 1G -n lv1 vg1' to create a logical volume."
        ],
        output: `Logical volume lv1 created.`,
        aspects: [
            "- 'lvcreate': Command to create a logical volume",
            "- '-L 1G': Option to specify the size of the logical volume (1 gigabyte in this case)",
            "- '-n lv1': Option to specify the name of the logical volume",
            "- 'vg1': Name of the volume group to which the logical volume belongs"
        ],
        options: [
            "- '-i, --stripes': Create a striped logical volume",
            "- '-I, --stripesize': Specify the stripe size for a striped logical volume"
        ],
        outro: `With the successful creation of logical volumes, you take a moment to appreciate the system's enhanced storage capabilities.
Each action taken brings you closer to mastering the intricacies of Red Hat administration and ensuring the system's readiness for evolving demands.
As you prepare for the next challenge, you do so with renewed confidence, knowing that you've effectively expanded the system's storage resources.`
    },
    {
        id: "view_logical_volumes",
        title: "View Logical Volumes",
        action: "view logical volumes",
        // Scenario: User needs to check the current logical volumes and their details
        intro: `With the system optimization underway, you recognize the importance of regularly monitoring the status of logical volumes.
To gain insights into the current configuration, you decide to view the details of all logical volumes.
You issue commands to view the details of all logical volumes, seeking information on their sizes, usage, and mount points.
As the commands execute, you analyze the output, gaining valuable insights into the system's storage infrastructure.
As you review the details of each logical volume, you gain a deeper understanding of the system's storage utilization.
You make mental notes of any areas that may require further optimization or adjustment.
Armed with this information, you feel more confident in your ability to maintain the system's stability and performance.
Regular monitoring and analysis of logical volumes will ensure that the system remains resilient to potential challenges.`,
        solution: "lvs", // Command to list all logical volumes
        hints: [
            "Hint: Use 'lvs' to view Logical Volumes."
        ],
        output: `  LV       VG   Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
    lv_root  vg00 -wi-ao----  50.00g
    lv_home  vg00 -wi-ao---- 100.00g
    lv_var   vg01 -wi-a----- 150.00g`,
        aspects: [
            "- 'lvs': Command to view Logical Volumes"
        ],
        options: [
            "No available options"
        ],
        outro: `As you invoke the command, the veil of mystery lifts, revealing the intricate tapestry of Logical Volumes.
With the successful viewing of logical volumes, you take a moment to appreciate the insights gained.
Each action taken brings you closer to mastering the art of Red Hat administration and ensuring the system's reliability.
As you prepare to tackle the next task, you do so with renewed confidence, knowing that you have a clear understanding of the system's storage infrastructure.`
    },
    {
        id: "extend_logical_volume",
        title: "Extend Logical Volume",
        action: "extend logical volume",
        // Scenario: User needs to increase the size of an existing logical volume
        intro: `As you continue to monitor the system's storage usage, you notice that certain volumes are approaching capacity.
To prevent potential issues and accommodate future growth, you decide to extend these volumes to increase their capacity.
You issue commands to extend the identified logical volumes, carefully specifying the additional size to be allocated.
As the commands execute, you observe the extension process, ensuring that each volume is expanded without data loss.
With each volume successfully extended, you feel a sense of relief, knowing that you've proactively addressed potential storage constraints.
You review the updated volumes, confirming that they now have the capacity to accommodate future data growth.
As the system adapts to the expanded volumes, you marvel at the flexibility of modern storage technologies.
By extending volumes seamlessly, you're able to ensure the system's readiness for evolving storage demands.`,
        solution: "lvextend -L+1G /dev/vg1/lv1", // Command to extend lv1 by 1GB
        hints: [
            "Hint: Use 'lvextend -L+1G /dev/vg1/lv1' to extend a Logical Volume by 1GB."
        ],
        output: `Size of logical volume vg1/lv1 changed from X to Y.`,
        aspects: [
            "- 'lvextend': Command to extend a Logical Volume",
            "- '-L+1G': Option to specify the size by which to extend the Logical Volume (1 gigabyte in this case)",
            "- '/dev/vg1/lv1': Path of the Logical Volume to extend"
        ],
        options: [
            "- '-r, --resizefs': Resize the filesystem along with the logical volume"
        ],
        outro: `With the successful extension of logical volumes, you take a moment to appreciate the system's enhanced scalability.
Each action taken brings you closer to mastering the intricacies of Red Hat administration and ensuring the system's resilience.
As you prepare for the next challenge, you do so with renewed confidence, knowing that you've effectively managed the system's storage resources.`
    },
    {
        id: "resize_logical_volume",
        title: "Resize Logical Volume",
        action: "resize logical volume",
        // Scenario: User needs to adjust the size of a logical volume (increase or decrease)
        intro: `As you delve deeper into system optimization, you realize the need to adjust the sizes of certain logical volumes.
With careful planning, you decide to resize these volumes to better allocate storage resources.
You issue commands to resize the identified logical volumes, ensuring that the changes are made smoothly and without data loss.
As the commands execute, you observe the resizing process, verifying that each volume is adjusted according to your specifications.
With the resizing of the logical volumes complete, you feel a sense of satisfaction, knowing that you've optimized storage allocation.
You carefully review the updated volumes, ensuring that the system's resources are distributed efficiently.
As the system adapts to the resized volumes, you marvel at the flexibility of modern storage technologies.
By adjusting volumes on-the-fly, you're able to meet changing demands and maintain optimal performance.`,
        solution: "lvresize -L +1G /dev/vg1/lv1", // Command to resize lv1 by increasing its size by 1GB
        hints: [
            "Hint: Use 'lvresize -L +1G /dev/vg1/lv1' to resize a logical volume."
        ],
        output: `Size of logical volume lv1 changed from X to Y`,
        aspects: [
            "- 'lvresize': Command to resize a logical volume",
            "- '-L +1G': Option to specify the size to increase the logical volume (1 gigabyte in this case)",
            "- '/dev/vg1/lv1': Path of the logical volume to resize"
        ],
        options: [
            "- '-r, --resizefs': Resize the underlying filesystem alongside the logical volume",
            "- '-l, --extents': Extend or reduce the logical volume by a specified number of logical extents"
        ],
        outro: `As you utter the command, the fabric of storage space begins to ripple and expand, accommodating your will.
With the successful resizing of logical volumes, you take a moment to appreciate the system's enhanced flexibility.
Each action taken brings you closer to mastering the intricacies of Red Hat administration and ensuring the system's resilience.
As you prepare for the next challenge, you're filled with confidence, knowing that you can adapt to whatever the digital world throws your way.`
    },
    {
        id: "remove_logical_volume",
        title: "Remove Logical Volume",
        action: "remove logical volume",
        // Scenario: User needs to delete an unnecessary logical volume to free up space
        intro: `However, as you continue to optimize the system, you realize that some logical volumes are no longer needed.
With careful consideration, you decide to remove these unnecessary volumes to free up storage space.
You issue commands to remove the identified logical volumes, double-checking to ensure that no critical data will be lost.
As the commands execute, you watch attentively, confirming that each volume is successfully removed from the system.
With each unnecessary logical volume removed, you feel a sense of liberation, knowing that you're reclaiming valuable storage resources.
You carefully review the remaining volumes, ensuring that the system's storage is optimized for maximum efficiency.
As the system undergoes this transformation, you reflect on the importance of maintaining a lean and efficient infrastructure.
By removing unnecessary clutter, you're ensuring that the system remains agile and responsive to future challenges.`,
        solution: "lvremove /dev/vg1/lv1", // Command to remove lv1 from volume group vg1
        hints: [
            "Hint: Use 'lvremove /dev/vg1/lv1' to remove a logical volume."
        ],
        output: `Logical volume lv1 in volume group vg1 successfully removed`,
        aspects: [
            "- 'lvremove': Command to release a logical volume from its captivity",
            "- '/dev/vg1/lv1': Path of the logical volume to liberate",
            "The 'lvremove' command grants freedom to logical volumes trapped within volume groups,allowing them to transcend the boundaries of their current existence."
        ],
        options: [
            "- '-f, --force': Override any barriers hindering the liberation",
            "- '-y, --yes': Automatically respond 'yes' to all queries, expediting the liberation"
        ],
        outro: `As you wield the 'lvremove' command, the whispers of the liberated volumes echo through the chamber, ushering forth a symphony of newfound freedom.
With the removal of the identified logical volumes, you take a moment to appreciate the system's streamlined configuration.
Each action taken brings you closer to your goal of mastering Red Hat administration and safeguarding the cybernetic infrastructure.
As you prepare for the next challenge, you're filled with confidence, knowing that you're making a difference in the digital world.`
    }
];

// Export the logical_volumes array for use in other modules
export default logical_volumes;
