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
  content: (setLightboxContent) => (
    <>
      <p className="mb-4">Voice assistant for Linux that supports note-taking, system control, and audio playback.</p>

      <h3 className="text-green-300 mt-4 mb-2">Demo Video</h3>
      <div
        className="relative cursor-pointer mb-4 mx-auto max-w-md"
        onClick={() =>
          setLightboxContent(
            <video
              src="/assets/videos/Video2Assistant.mp4"
              controls
              autoPlay
              className="max-h-[90vh]"
            />
          )
        }
      >
        <img
          src="/assets/thumbnails/thumbnail.png"
          alt="Virtual Assistant demo thumbnail"
          className="w-full rounded"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-5xl">▶</span>
        </div>
      </div>
      <p className="mb-4 text-center">Features: system update, open/close Sublime & VirtualBox</p>

      <h3 className="text-green-300 mt-4 mb-2">Additional Features</h3>
      <div className="grid grid-cols-2 gap-4 text-sm justify-items-center">
        {[
          {
            src: "/assets/screenshots/help.png",
            alt: "Ask for help",
            caption: "See what the assistant can do",
          },
          {
            src: "/assets/screenshots/notes.png",
            alt: "View notes",
            caption: "Viewing saved notes",
          },
          {
            src: "/assets/screenshots/volume.png",
            alt: "Audio control",
            caption: "Control system audio",
          },
          {
            src: "/assets/screenshots/weather.png",
            alt: "Weather",
            caption: "Weather report (with a twist)",
          },
        ].map(({ src, alt, caption }) => (
          <div key={alt} className="max-w-[160px] text-center">
            <img
              src={src}
              alt={alt}
              className="cursor-pointer rounded"
              onClick={() =>
                setLightboxContent(
                  <img src={src} alt={alt + " enlarged"} className="max-h-[90vh]" />
                )
              }
            />
            <p className="mt-1">{caption}</p>
          </div>
        ))}
      </div>
    </>
  ),
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
