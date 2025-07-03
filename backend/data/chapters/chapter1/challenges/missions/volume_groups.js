// Array of volume group management challenges for the Red Hat Odyssey
const volume_groups = [
    {
        id: "create_volume_group",
        title: "Create Volume Group",
        action: "create a volume group",
        // Scenario introduction and context for creating a volume group
        intro: `As you navigate through the challenges of storage management, you encounter a need to organize available Physical Volumes into a cohesive unit.
To facilitate efficient resource allocation and management, you decide to create a volume group.
Creating a volume group will enable you to group together Physical Volumes and manage them as a single entity.

With purpose in mind, you assess the requirements for creating the volume group.
You consider factors such as the Physical Volumes to include and the desired attributes of the volume group.

Issuing commands to create the volume group, you proceed with determination, specifying the desired parameters.
As the commands execute, you observe the creation process, ensuring that the volume group is set up according to your specifications.`,
        // Command solution for creating a volume group
        solution: "vgcreate vg1 /dev/sdb1",
        // Hints to assist the user
        hints: [
            "Hint: Use 'vgcreate vg1 /dev/sdb1' to create a volume group."
        ],
        // Expected output after successful creation
        output: `Volume group 'vg1' successfully created`,
        // Key aspects of the command and its parameters
        aspects: [
            "- 'vgcreate': Command to create a volume group",
            "- 'vg1': Name of the volume group to create",
            "- '/dev/sdb1': Path of the Physical Volume(s) to include in the volume group"
        ],
        // Available command options
        options: [
            "- '-v, --verbose': Provide verbose output",
            "- '-t, --test': Test mode. Only print what would be done without actually performing any actions",
            "- '-f, --force': Force the creation of the VG, even if it already exists or if it may be risky"
        ],
        // Scenario outro and reflection
        outro: `After the creation completes, you verify the system's status to confirm the successful establishment of the volume group.
You check for any errors or warnings, ensuring that the newly created volume group is ready for use.

As your quest to create the volume group concludes, you reflect on the journey.
Through deliberate planning and execution, you've successfully established a foundational component of the system's storage infrastructure.
With the volume group in place, you're equipped to streamline resource management and optimize storage efficiency in the Red Hat Odyssey.`
    },
    {
        id: "view_volume_groups",
        title: "View Volume Groups", 
        action: "view volume groups",
        // Scenario introduction for viewing volume groups
        intro: `As you delve deeper into the intricacies of storage management, you recognize the importance of gaining insights into volume groups.
Understanding the composition and usage of volume groups is essential for optimizing resource allocation and performance.
To this end, you embark on a quest to view and analyze the volume groups present in the system.

With curiosity as your guide, you navigate through the system's storage infrastructure, seeking information on volume groups.
You issue commands to view the details of all volume groups, eager to gain insights into their configurations and utilization.

As the commands execute, you meticulously review the output, noting the size, usage, and associated logical volumes of each volume group.
With each detail scrutinized, you gain a deeper understanding of the system's storage landscape and its underlying organization.`,
        // Command solution for viewing volume groups
        solution: "vgs",
        hints: [
            "Hint: Use 'vgs' to view volume groups."
        ],
        // Example output of the command
        output: `  VG     #PV #LV #SN Attr   VSize  VFree
  myvg   1   2   0  wz--n- 19.00g 9.00g`,
        aspects: [
            "- 'vgs': Command to view volume groups"
        ],
        options: [
            "- '--all': Display all volume groups, including those with no Physical Volumes",
            "- '-o, --options': Display only specified columns",
            "- '-v, --verbose': Provide verbose output"
        ],
        outro: `Armed with the insights gained from viewing volume groups, you analyze the system's storage utilization and identify areas for optimization.
You consider factors such as capacity, usage patterns, and performance requirements, devising strategies to further enhance storage efficiency.

As your quest to view volume groups concludes, you reflect on the journey.
Through exploration and analysis, you've gained valuable insights into the system's storage infrastructure.
With this knowledge, you're better equipped to optimize resource allocation and ensure the system's readiness for future challenges.`
    },
    {
        id: "extend_volume_group",
        title: "Extend Volume Group",
        action: "extend a volume group",
        // Scenario introduction for extending a volume group
        intro: `As you delve deeper into storage management, you realize the need to expand the capacity of a volume group.
Increased data demands or the addition of new storage devices may necessitate extending the volume group.
To accommodate these changes, you embark on a quest to extend the volume group.

With foresight and planning, you assess the requirements for extending the volume group.
You consider factors such as available Physical Volumes and the desired capacity increase, ensuring a smooth extension process.

Issuing commands to extend the volume group, you proceed methodically, specifying the additional Physical Volumes to be included.
As the commands execute, you monitor the extension process, verifying that the volume group expands seamlessly.`,
        // Command solution for extending a volume group
        solution: "vgextend vg1 /dev/sdb1",
        hints: [
            "Hint: Use 'vgextend vg1 /dev/sdb1' to extend a volume group."
        ],
        output: `Volume group 'vg1' successfully extended`,
        aspects: [
            "- 'vgextend': Command to extend a volume group",
            "- 'vg1': Name of the volume group to extend",
            "- '/dev/sdb1': Path of the Physical Volume(s) to add to the volume group"
        ],
        options: [
            "- '-v, --verbose': Provide verbose output",
            "- '-f, --force': Force the operation, even if it may be risky",
            "- '-A, --autobackup y|n': Enable or disable automatic backup of the VG metadata after the operation"
        ],
        outro: `After the extension completes, you verify the system's status to confirm the successful expansion of the volume group.
You check for any errors or warnings, ensuring that the extended volume group is fully functional and operational.

As your quest to extend the volume group concludes, you reflect on the journey.
Through careful planning and execution, you've successfully expanded the system's storage capacity.
With the volume group extended, you're well-prepared to meet the growing data demands in the Red Hat Odyssey.`
    },
    {
        id: "reduce_volume_group",
        title: "Reduce Volume Group",
        action: "remove a Physical Volume from a volume group",
        // Scenario introduction for reducing a volume group
        intro: `As you continue your exploration of storage management, you encounter a scenario where a Physical Volume needs to be removed from a volume group.
This may be due to various reasons such as retiring a storage device or redistributing storage resources.
To address this, you embark on a quest to safely remove the Physical Volume from the volume group.

With caution in mind, you assess the implications of removing the Physical Volume.
You review the volume group's configuration and usage, ensuring that removing the Physical Volume will not impact data integrity or system performance.

Issuing commands to remove the Physical Volume from the volume group, you proceed carefully, following best practices to minimize risks.
As the commands execute, you monitor the process closely, verifying that the Physical Volume is successfully detached from the volume group.`,
        // Command solution for reducing a volume group
        solution: "vgreduce vg1 /dev/sdb1",
        hints: [
            "Hint: Use 'vgreduce vg1 /dev/sdb1' to remove a Physical Volume from a volume group."
        ],
        output: `Removed /dev/sdb1 from volume group vg1`,
        aspects: [
            "- 'vgreduce': removes a Physical Volume from a volume group",
            "- 'vg1': volume group where the Physical Volume belongs",
            "- '/dev/sdb1': Physical Volume to be removed from a volume group"
        ],
        options: [
            "- '-a, --all': Remove all Physical Volumes belonging to the specified volume group",
            "- '-f, --force': Force removal without any prompt",
            "- '-v, --verbose': Provide verbose output"
        ],
        outro: `After the removal process completes, you verify the system's status to ensure that the volume group is still functional.
You check for any errors or warnings, taking proactive measures to address any potential issues.

As your quest to remove a Physical Volume from a volume group concludes, you reflect on the journey.
Through careful planning and execution, you've successfully managed to adjust the system's storage infrastructure.
With this task completed, you're better equipped to adapt the system to changing storage requirements in the Red Hat Odyssey.`
    },
    {
        id: "remove_volume_group",
        title: "Remove Volume Group",
        action: "remove a volume group",
        // Scenario introduction for removing a volume group
        intro: `As you continue your journey through the Red Hat Odyssey, you encounter the need to streamline the system's storage infrastructure.
Some volume groups have become obsolete or no longer serve their intended purpose, cluttering the system's configuration.
To maintain a lean and efficient environment, you embark on a quest to remove unnecessary volume groups.

With determination, you set out to identify and remove the obsolete volume groups.
Carefully assessing their usage and impact on the system, you make strategic decisions about which volume groups to remove.

Issuing commands to remove volume groups, you proceed with caution, ensuring that no critical data is lost in the process.
As the commands execute, you observe the removal process, monitoring for any unexpected issues or errors.`,
        // Command solution for removing a volume group
        solution: "vgremove vg1",
        hints: [
            "Hint: Use 'vgremove vg1' to remove a volume group."
        ],
        output: `Volume group 'vg1' successfully removed`,
        aspects: [
            "- 'vgremove': Command to remove a volume group",
            "- 'vg1': Name of the volume group to remove"
        ],
        options: [
            "- '-f, --force': Force removal of the volume group even if it is active",
            "- '-h, --help': Display a help message and exit",
            "- '-y, --yes': Automatically answer 'yes' to all prompts"
        ],
        outro: `Upon completion of the removal process, you review the system's storage configuration.
The removal of obsolete volume groups has streamlined the system, reducing clutter and improving resource allocation.

As your quest to remove volume groups concludes, you reflect on the journey.
Through careful analysis and execution, you've successfully optimized the system's storage infrastructure.
With a leaner and more efficient environment, you're better prepared to tackle the challenges that lie ahead in the Red Hat Odyssey.`
    }
];

export default volume_groups;