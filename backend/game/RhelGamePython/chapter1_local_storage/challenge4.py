import physical_volumes
import ChallengeGenerator
import CommandGenerator as CommandGenerator

challenge_4 = ChallengeGenerator.ChallengeGenerator(
    quest_number=4,
    description='Uncover Physical Volumes Secrets',
    story="""\nAs you journey further into the depths of storage management, you recognize the importance of understanding the physical layer of storage.
Physical volumes serve as the foundation upon which logical volumes and volume groups are built.
To gain a comprehensive understanding of the system's storage infrastructure, you embark on a quest to explore physical volumes.\n
With curiosity as your guide, you delve into the intricacies of physical volumes.
You examine the available physical storage devices, assessing their characteristics and properties.\n""",
    options=[
        {
            'name': 'View Physical Volumes',
            'action': 'With a sense of anticipation, you peer into the darkness of the hidden chambers, revealing the physical volumes that lie within.',
            'function': physical_volumes.view_physical_volumes.execute,
            'success_message': """Issuing commands to view the details of physical volumes, you meticulously review the information presented.
You observe attributes such as size, usage, and health status, gaining valuable insights into the underlying storage hardware.\n
Physical volumes viewed successfully!""",
        },
        {
            'name': 'Create Physical Volume',
            'action': 'With determination in your heart, you forge a new path forward, creating a physical volume from the raw materials of the digital realm.',
            'function': physical_volumes.create_physical_volume.execute,
            'success_message': """Armed with knowledge of physical volumes, you consider strategies for optimizing storage performance and reliability.
You explore techniques such as load balancing and redundancy, ensuring that storage resources are utilized efficiently and resiliently.\n
Physical volume created successfully!""",
        },
        {
            'name': 'Remove Physical Volume',
            'action': 'With resolve guiding your hand, you remove a physical volume, untangling its threads from the fabric of the digital universe.',
            'function': physical_volumes.remove_physical_volume.execute,
            'success_message': """With resolve guiding your hand, you remove a physical volume, untangling its threads from the fabric of the digital universe.
Physical volume removed successfully!
As your quest to explore physical volumes concludes, you reflect on the journey.
Through exploration and analysis, you've gained a deeper understanding of the system's storage infrastructure.
With this knowledge, you're better equipped to optimize storage resources and ensure the system's resilience in the Red Hat Odyssey.\n""",
        },
    ]
)
