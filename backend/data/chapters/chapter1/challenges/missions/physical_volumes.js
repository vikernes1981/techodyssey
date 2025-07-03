// Array of physical volume management challenges for storage management training
const physical_volumes = [
    {
        id: "view_physical_volumes",
        title: "View Physical Volumes",
        action: "view physical volumes",
        // Scenario introduction: Explains the importance of viewing physical volumes
        intro: `As you delve deeper into storage management, you recognize the importance of gaining insights into the physical layer of storage.
Understanding the properties and status of physical volumes is essential for maintaining and optimizing storage infrastructure.
To this end, you embark on a quest to view and analyze the physical volumes present in the system.

With curiosity as your guide, you navigate through the system's storage devices, seeking information on physical volumes.
You issue commands to view the details of all physical volumes, eager to gain insights into their configurations and health.

As the commands execute, you meticulously review the information presented for each physical volume.
You observe attributes such as size, usage, and health status, gaining valuable insights into the underlying storage hardware.`,
        // Solution command for the challenge
        solution: "pvs",
        // Hints to help the user solve the challenge
        hints: [
            "Hint: Use the 'pvs' command to view physical volumes."
        ],
        // Example output of the solution command
        output: `PV Name               /dev/sdb1
VG Name               vg00
PV Size               <931.51 GiB / not usable 0
Allocatable           yes
PE Size               4.00 MiB
Total PE              238466
Free PE               138466
Allocated PE          100000
PV UUID               eARbpM-M43p-5vMz-hTtM-6F9m-3l6N-AgXYBv`,
        // Key aspects and concepts covered in this challenge
        aspects: [
            "- 'pvs': Lists Physical Volumes"
        ],
        // Command options relevant to the challenge
        options: [
            "- '-v, --verbose': Provide verbose output",
            "- '-C, --colon': Use colon separators",
            "- '-m, --maps': Display physical volume extent maps"
        ],
        // Scenario outro: Summarizes the learning outcome
        outro: `Armed with knowledge of physical volumes, you analyze the system's storage utilization and identify areas for optimization.
You consider factors such as capacity, usage patterns, and performance requirements, devising strategies to enhance storage efficiency.

As your quest to view physical volumes concludes, you reflect on the journey.
Through exploration and analysis, you've gained valuable insights into the system's storage infrastructure.
With this knowledge, you're better equipped to optimize storage resources and ensure the system's resilience in the Red Hat Odyssey.`
    },
    {
        id: "create_physical_volume",
        title: "Create Physical Volume",
        action: "create a physical volume",
        // Scenario introduction: Explains the process of creating a new physical volume
        intro: `As you delve deeper into storage management, you recognize the need to prepare additional storage devices for integration into the system.
Creating physical volumes is the first step in incorporating new storage devices into the storage infrastructure.
To expand the system's storage capacity and flexibility, you embark on a quest to create physical volumes.

With determination, you assess the available storage devices and select those to be designated as physical volumes.
You consider factors such as device type, capacity, and compatibility with the system.

Issuing commands to create physical volumes, you proceed with precision, specifying the parameters for each volume.
As the commands execute, you observe the creation process, ensuring that each physical volume is initialized successfully.`,
        // Solution command for the challenge
        solution: "pvcreate /dev/sdb1",
        // Hints to help the user solve the challenge
        hints: [
            "Hint: Use the 'pvcreate' command followed by the device name to create a physical volume (e.g., pvcreate /dev/sdb1)."
        ],
        // Example output of the solution command
        output: `Physical volume "/dev/sdb1" successfully created`,
        // Key aspects and concepts covered in this challenge
        aspects: [
            "- 'pvcreate': Creates a Physical Volume",
            "- '/dev/sdb1': Partition to become Physical Volume"
        ],
        // Command options relevant to the challenge
        options: [
            "- '-v, --verbose': Provide verbose output",
            "- '-ff, --force': Force initialization of device",
            "- '-M, --metadatatype': Set metadata format"
        ],
        // Scenario outro: Summarizes the learning outcome
        outro: `After the creation completes, you verify the system's status to confirm the successful establishment of the physical volumes.
You check for any errors or warnings, ensuring that the newly created physical volumes are ready for use.

As your quest to create physical volumes concludes, you reflect on the journey.
Through careful planning and execution, you've successfully prepared additional storage devices for integration into the system.
With the physical volumes created, you're well-positioned to expand the system's storage capacity and adapt to evolving data requirements in the Red Hat Odyssey.`
    },
    {
        id: "remove_physical_volume",
        title: "Remove Physical Volume",
        action: "remove a physical volume",
        // Scenario introduction: Explains the process of removing a physical volume
        intro: `As you continue your journey through storage management, you encounter scenarios where certain storage devices need to be retired or replaced.
Removing physical volumes associated with these devices is crucial to maintain the integrity and efficiency of the storage infrastructure.
To address this, you embark on a quest to safely remove the designated physical volumes.

With careful consideration, you assess the implications of removing the physical volumes.
You review the volume group configurations and ensure that removing the physical volumes will not compromise data integrity or system performance.

Issuing commands to remove the physical volumes, you proceed cautiously, following best practices to minimize risks.
As the commands execute, you monitor the removal process, ensuring that each physical volume is detached safely.`,
        // Solution command for the challenge
        solution: "pvremove /dev/sdb1",
        // Hints to help the user solve the challenge
        hints: [
            "Hint: Use the 'pvremove' command followed by the device name to remove a physical volume (e.g., pvremove /dev/sdb1)."
        ],
        // Example output of the solution command
        output: `Labels on physical volume "/dev/sdb1" successfully wiped.`,
        // Key aspects and concepts covered in this challenge
        aspects: [
            "- 'pvremove': Removes a physical volume",
            "- '/dev/sdb1': Physical Volume to be removed"
        ],
        // Command options relevant to the challenge
        options: [
            "- '-f, --force': Force removal of the physical volume",
            "- '-y, --yes': Assume 'yes' as answer to all questions",
            "- '-v, --verbose': Provide verbose output"
        ],
        // Scenario outro: Summarizes the learning outcome
        outro: `After the removal completes, you verify the system's status to confirm the successful removal of the designated physical volumes.
You check for any errors or warnings, ensuring that the storage infrastructure remains stable and operational.

As your quest to remove physical volumes concludes, you reflect on the journey.
Through careful planning and execution, you've successfully retired or replaced designated storage devices.
With the physical volumes removed, you're poised to maintain the integrity and efficiency of the storage infrastructure in the Red Hat Odyssey.`
    }
];

export default physical_volumes;