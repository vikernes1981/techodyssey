export const projects = [
  {
    id: "TechOdyssey",
    title: "TechOdyssey",
    description: "Terminal interface & AI logic playground",
    stack: ["React", "Express", "GPT-4", "SQLite"],
    github: "https://github.com/vikernes1981/techodyssey",
    live: "https://blog.techodyssey.org/terminal-chat",
    content:
      "TechOdyssey is an interactive terminal-style portfolio and AI experiment sandbox. It simulates a Linux shell, handles token-based GPT interactions, supports command validation, and displays dynamic project data. All content is loaded in a retro terminal UI built from scratch with React. The assistant interface includes token tracking, typing delay simulation, soft caps, and real-time feedback. It's both a showcase and a functional environment — all running in the browser.",
  },
  {
    id: "Assistant",
    title: "Virtual Assistant",
    description: "Voice-driven Linux assistant",
    stack: ["Python", "Whisper", "Wit.ai", "gTTS", "OpenAI"],
    github: "https://github.com/vikernes1981/VirtualAssistant_0.1",
    live: null,
    content:
      "A modular local voice assistant for Linux. It activates via wake word, listens for commands, and performs real actions like opening apps, muting volume, or transcribing dictation. Commands are parsed using a fallback chain: Wit.ai → keyword rules → GPT-4 fallback if needed. Dictation is saved to a local SQLite DB. There's even a YouTube audiobook mode. Everything runs locally except GPT. It's fast, functional, and built entirely in Python.",
  },
  {
    id: "Pawsome Homes",
    title: "Pawsome Homes",
    description: "Pet adoption + admin panel",
    stack: ["React", "Node.js", "MongoDB", "JWT"],
    github: "https://github.com/vikernes1981/pawsome_homes",
    live: "https://pawsome-homes.vercel.app",
    content:
      "PawsomeHomes is a full-stack adoption dashboard. The public side shows available pets, while admins can log in to add, edit, or remove entries. The backend supports role-based auth using JWTs. Admin-only tools include pet status toggling, live updates, and form validations. Originally built during a bootcamp and fully refactored afterward for real use. Secure, minimal, and practical.",
  },
];
