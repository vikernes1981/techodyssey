import { useEffect, useRef, useState } from "react";
import ProjectModal from "./ProjectModal";
import { projects } from "./projects";

const HomePage = () => {
  const terminalRef = useRef(null);
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [done, setDone] = useState(false);
  const [assistantTyping, setAssistantTyping] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleRun = (id) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setSelectedProject(project);
      setModalOpen(true);
    }
  };

  const QA = [
    {
      user: "whoami",
      assistant: "Iordanis Tsitsirikos",
    },
    {
      user: "role",
      assistant: "Backend Developer & Linux Enthusiast",
    },
    {
      user: "about",
      assistant:
        "I'm a backend-focused developer with a system admin mindset. I build tools that solve problems — sometimes for fun, sometimes because someone was stealing my overtime. My strength lies in understanding how systems work under the hood. I prefer working close to the metal: backend APIs, command-line tools, file structures, authentication, voice interfaces, or whatever else needs wiring. Most of what you’ll see here was built alone, from scratch, without a template. I don't chase trends. I chase working solutions. I like building things I actually use. If I don't use it, I probably deleted it.",
    },
    {
      user: "contact",
      assistant: "joe_tsitsirikos@mail.techodyssey.org",
    },
    {
      user: "github",
      assistant: "https://github.com/vikernes1981",
    },
    {
      user: "projects",
      assistant: "Listing all available projects...",
    },
  ];

  useEffect(() => {
    const current = QA[step];
    if (!current) {
      setDone(true);
      return;
    }

    setAssistantTyping(false);
    setTypedText("");

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < current.user.length) {
        setTypedText(current.user.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        setAssistantTyping(true);
        setTimeout(() => {
          setStep((prev) => prev + 1);
        }, 800);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [step]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  });

  return (
    <div className="flex flex-col justify-start items-start w-screen h-screen p-8 bg-black text-green-400 font-mono text-base overflow-y-auto">
      {QA.slice(0, step + 1).map((qa, index) => (
        <div key={index}>
          <div className="mb-2">
            <span className="text-green-400">$ </span>
            {index === step ? typedText : qa.user}
          </div>
          {index < step && (
            <div className="ml-4 text-green-500 whitespace-pre-wrap">
              {qa.assistant}
            </div>
          )}
          {index === step && assistantTyping && (
            <div className="ml-4 text-green-600">{qa.assistant}</div>
          )}
        </div>
      ))}

      {done && (
        <div className="flex flex-col justify-start items-start w-screen h-screen p-8 bg-black text-green-400 font-mono text-base overflow-y-auto"> 

          {projects.map((proj, i) => (
            <div key={i} className="ml-4 text-green-400">
              {proj.id.padEnd(18)} — {proj.description}
              <div>
                <button
                  onClick={() => handleRun(proj.id)}
                  className="text-green-300 underline hover:text-green-200"
                >
                  → run {proj.id}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default HomePage;
