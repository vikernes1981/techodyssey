import filesystem_mounting from './missions/filesystem_mounting.js';

const challenge_6 = {
  id: "challenge_6", 
  title: "Configure File System Mounting with UUID or Label",
  story: `As you delve deeper into storage configuration, you recognize the importance of reliable and consistent file system mounting.
Mounting file systems using UUIDs or labels ensures stability and resilience, even in dynamic storage environments.
To achieve this, you embark on a quest to configure file system mounting using UUIDs or labels.

With foresight and planning, you assess the file systems and their corresponding UUIDs or labels.
You consider factors such as file system types, mount points, and compatibility with the system.

The modern Linux system administrator must understand both UUID-based and label-based mounting strategies. UUIDs provide guaranteed uniqueness across all systems, while labels offer human-readable filesystem identification. Both methods solve the critical problem of device name changes that can occur when hardware is added, removed, or reconfigured.

Mastering these mounting techniques ensures your systems remain stable and predictable, regardless of hardware changes or system reconfigurations.`,
  briefing: `Master filesystem mounting using UUIDs and labels for reliable storage management.`,
  prompt: `Configure robust filesystem mounting with UUIDs and labels:`,
  options: filesystem_mounting,
}

export default challenge_6;