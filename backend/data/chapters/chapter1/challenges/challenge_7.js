import lv_swap_partition from './missions/lv_swap_partition.js';

const challenge_7 = {
  id: "challenge_7", 
  title: "Creation of LV Swap Partition",
  story: `As you delve deeper into the digital wilderness, you encounter a challenge that tests your mastery over memory management.
In this part, you must create a Logical Volume (LV) for swap partition, harnessing the power of abstraction to enhance system performance and stability.

Choose your actions wisely, for the fate of the digital wilderness hangs in the balance.`,
  briefing: `Master logical volume swap partition creation and management.`,
  prompt: `Create and manage LV swap partitions:`,
  options: lv_swap_partition,
}

export default challenge_7;