import { useEffect, useRef, useState, useCallback } from "react";
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
  const [showCursor, setShowCursor] = useState(true);
  const [terminalFocused, setTerminalFocused] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for terminal header
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Handle project selection with error handling
  const handleRun = useCallback((id) => {
    try {
      const project = projects.find((p) => p.id === id);
      if (project) {
        setSelectedProject(project);
        setModalOpen(true);
      } else {
        console.error(`Project ${id} not found`);
      }
    } catch (error) {
      console.error('Error opening project:', error);
    }
  }, []);

  // Enhanced Q&A data with better descriptions
  const QA = [
    { user: "whoami", assistant: "Iordanis Tsitsirikos" },
    { user: "role", assistant: "Backend Developer & Linux Enthusiast" },
    {
      user: "about",
      assistant:
        "I'm a backend-focused developer with a system admin mindset. I build tools that solve problems — sometimes for fun, sometimes because someone was stealing my overtime.\n\nMy strength lies in understanding how systems work under the hood. I prefer working close to the metal: backend APIs, command-line tools, file structures, authentication, voice interfaces, or whatever else needs wiring.\n\nMost of what you'll see here was built alone, from scratch, without a template. I don't chase trends. I chase working solutions. I like building things I actually use. If I don't use it, I probably deleted it.",
    },
    { user: "skills", assistant: "Node.js • Python • React • MongoDB • Linux • Voice AI • System Administration" },
    { user: "contact", assistant: "joe_tsitsirikos@mail.techodyssey.org" },
    { user: "github", assistant: "https://github.com/vikernes1981" },
    { user: "ls projects/", assistant: "Listing all available projects..." },
  ];

  // Enhanced typing effect with variable speed
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
    }, 50 + Math.random() * 40); // Variable typing speed for human feel

    return () => clearInterval(typeInterval);
  }, [step]);

  // Smart auto-scroll - only during typing, not when user is reading
  useEffect(() => {
    if (terminalRef.current && !done) {
      // Only auto-scroll during the animation phase
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [step, assistantTyping, done]); // Only trigger on animation changes

  // Handle terminal focus
  const handleTerminalClick = () => {
    setTerminalFocused(true);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        // Could add interrupt functionality here
      }
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getCurrentPrompt = () => {
    return `iordanis@portfolio:~$ `;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-2 md:p-4 font-mono">
      {/* Terminal Window Frame - Now Much Larger */}
      <div className="h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)] bg-black rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        
        {/* Terminal Header/Title Bar */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            {/* Traffic Light Buttons */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer transition-colors"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer transition-colors"></div>
            </div>
            
            {/* Terminal Title */}
            <span className="text-gray-300 text-sm ml-4">
              Terminal — iordanis@portfolio: Portfolio
            </span>
          </div>
          
          {/* Time Display */}
          <div className="text-gray-400 text-xs hidden sm:block">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Terminal Content - Now Takes Full Available Height */}
        <div 
          ref={terminalRef} 
          onClick={handleTerminalClick}
          className="bg-black text-green-400 p-4 md:p-8 h-[calc(100vh-6rem)] md:h-[calc(100vh-7rem)] overflow-y-auto cursor-text scroll-smooth"
          style={{ 
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            lineHeight: "1.6"
          }}
        >
          {/* Welcome Banner */}
          <div className="text-green-300 mb-6 text-xs md:text-sm">
            <div className="border border-green-600 p-3 mb-4 rounded">
              <div className="text-center">
                ╭─────────────────────────────────────────────╮<br />
                │        Welcome to Iordanis Portfolio       │<br />
                │          Backend Dev & Linux Admin         │<br />
                ╰─────────────────────────────────────────────╯
              </div>
            </div>
            <div className="text-green-500 text-xs mb-4">
              Last login: {currentTime.toLocaleDateString()} on ttys001<br />
              Type 'help' for available commands or just sit back and watch...
            </div>
          </div>

          {/* Interactive Q&A Session */}
          {QA.slice(0, step + 1).map((qa, index) => (
            <div key={index} className="mb-4 w-full">
              {/* User Input Line */}
              <div className="mb-2 flex items-center flex-wrap">
                <span className="text-green-300 text-sm md:text-base">
                  {getCurrentPrompt()}
                </span>
                <span className="text-green-400 text-sm md:text-base ml-1">
                  {index === step ? typedText : qa.user}
                  {index === step && showCursor && (
                    <span className="bg-green-400 text-black ml-1 animate-pulse">▋</span>
                  )}
                </span>
              </div>
              
              {/* Assistant Response */}
              {index < step && (
                <div className="ml-4 md:ml-8 text-green-500 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                  {qa.assistant}
                </div>
              )}
              {index === step && assistantTyping && (
                <div className="ml-4 md:ml-8 text-green-500 whitespace-pre-wrap text-sm md:text-base leading-relaxed animate-pulse">
                  {qa.assistant}
                </div>
              )}
            </div>
          ))}

          {/* Projects Listing */}
          {done && (
            <div className="mt-8">
              {/* Projects Header */}
              <div className="mb-6">
                <div className="text-green-300 text-sm md:text-base mb-2">
                  {getCurrentPrompt()}ls -la projects/
                </div>
                <div className="ml-4 md:ml-8 text-green-500 text-xs md:text-sm mb-4">
                  total {projects.length}<br />
                  drwxr-xr-x  {projects.length + 2} iordanis  staff   {(projects.length + 2) * 64}B {currentTime.toLocaleDateString()}<br />
                </div>
              </div>

              {/* Enhanced Project List */}
              <div className="space-y-3">
                {projects.map((proj, i) => (
                  <div key={i} className="group">
                    <div className="ml-4 md:ml-8 text-green-400 text-sm md:text-base">
                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <div className="flex-1">
                          <span className="font-bold text-green-300">
                            {proj.id.padEnd(18)}
                          </span>
                          <span className="text-green-500 mx-2">—</span>
                          <span className="text-green-400">
                            {proj.description}
                          </span>
                        </div>
                        <div className="md:ml-4">
                          <button
                            onClick={() => handleRun(proj.id)}
                            className="inline-flex items-center px-3 py-1 text-xs md:text-sm bg-green-900/30 border border-green-600 rounded text-green-300 hover:bg-green-800/40 hover:text-green-200 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                          >
                            <span className="mr-1">→</span>
                            ./run {proj.id}
                          </button>
                        </div>
                      </div>
                      
                      {/* Stack Preview on Hover */}
                      <div className="ml-0 md:ml-20 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-green-600 text-xs">
                          stack: {proj.stack.join(' • ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Commands */}
              <div className="mt-8 pt-6 border-t border-green-900">
                <div className="text-green-300 text-sm md:text-base mb-2">
                  {getCurrentPrompt()}
                  <span className="animate-pulse">▋</span>
                </div>
                <div className="ml-4 md:ml-8 text-green-600 text-xs md:text-sm">
                  Available commands: whoami | about | contact | projects | clear | exit<br />
                  Pro tip: Click any project above to see detailed information and demos
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Status Bar */}
        <div className="bg-gray-800 px-4 py-1 border-t border-gray-700 flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span className={`w-2 h-2 rounded-full ${terminalFocused ? 'bg-green-500' : 'bg-gray-500'}`}></span>
            <span>UTF-8</span>
            <span>Bash</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span>Line {step + 1}</span>
            <span>Portfolio v2.0</span>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default HomePage;