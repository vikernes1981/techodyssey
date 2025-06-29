import { useState, useEffect, useRef } from "react";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [lightboxContent, setLightboxContent] = useState(null);
  const [modalAnimation, setModalAnimation] = useState(false);
  const modalRef = useRef(null);

  // Handle modal animations
  useEffect(() => {
    if (isOpen) {
      setModalAnimation(true);
      // Focus modal for accessibility
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    } else {
      setModalAnimation(false);
      setLightboxContent(null);
    }
  }, [isOpen]);

  // Enhanced keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          if (lightboxContent) {
            setLightboxContent(null);
          } else {
            onClose();
          }
          break;
        case "Tab":
          // Keep focus within modal
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            e.preventDefault();
            modalRef.current.focus();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxContent, onClose, isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Main Modal */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        style={{ 
          animation: modalAnimation ? 'fadeIn 0.2s ease-out' : 'fadeOut 0.2s ease-in'
        }}
      >
        <div 
          ref={modalRef}
          tabIndex={-1}
          className="bg-black border border-green-600 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 focus:outline-none"
          style={{
            animation: modalAnimation ? 'slideIn 0.3s ease-out' : 'slideOut 0.3s ease-in',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-gray-800 px-6 py-4 border-b border-green-600 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Terminal-style decorations */}
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-60"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-60"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h2 className="text-xl text-green-300 font-bold">
                ./project/{project.id}
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="bg-black text-green-400 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            
            {/* Project Title & Description */}
            <div className="mb-6">
              <div className="text-green-300 text-sm mb-2">
                <span className="text-green-500">$</span> cat project_info.md
              </div>
              <div className="ml-4 space-y-3">
                <h3 className="text-2xl text-green-300 font-bold">{project.title}</h3>
                <p className="text-green-500 italic text-lg">{project.description}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <div className="text-green-300 text-sm mb-2">
                <span className="text-green-500">$</span> ls dependencies/
              </div>
              <div className="ml-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-900/30 border border-green-600 rounded text-green-300 text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="mb-6">
              <div className="text-green-300 text-sm mb-2">
                <span className="text-green-500">$</span> cat README.md
              </div>
              <div className="ml-4 text-green-400 leading-relaxed">
                <div className="prose prose-invert max-w-none">
                  {typeof project.content === "string" ? (
                    <div className="whitespace-pre-wrap">{project.content}</div>
                  ) : typeof project.content === "function" ? (
                    project.content(setLightboxContent)
                  ) : (
                    project.content
                  )}
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="border-t border-green-800 pt-6">
              <div className="text-green-300 text-sm mb-3">
                <span className="text-green-500">$</span> ls -la links/
              </div>
              <div className="ml-4 flex flex-wrap gap-4">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-green-600 rounded text-green-300 hover:bg-green-900/30 hover:text-green-200 transition-all duration-200 group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Source
                  </a>
                )}
                
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-900/30 border border-green-500 rounded text-green-300 hover:bg-green-800/50 hover:text-green-100 transition-all duration-200 group"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Terminal-style footer */}
            <div className="mt-8 pt-4 border-t border-green-800">
              <div className="text-green-600 text-xs">
                <span className="text-green-500">$</span> echo "Thanks for checking out {project.id}!"<br />
                <div className="ml-4 mt-1">
                  Press <kbd className="px-1 py-0.5 bg-gray-800 border border-gray-600 rounded text-xs">ESC</kbd> to close 
                  or click outside this window
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox */}
      {lightboxContent && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          onClick={() => setLightboxContent(null)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-7xl max-h-[95vh] bg-black border border-green-600 rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Lightbox Header */}
            <div className="absolute top-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-4 border-b border-green-600 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-green-300 font-mono">Media Viewer</h3>
                <button
                  onClick={() => setLightboxContent(null)}
                  className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded"
                  aria-label="Close lightbox"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Lightbox Content */}
            <div className="pt-16 p-4">
              {lightboxContent}
            </div>

            {/* Lightbox Footer */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-4 border-t border-green-600">
              <div className="text-center text-green-600 text-sm font-mono">
                Press <kbd className="px-2 py-1 bg-gray-800 border border-gray-600 rounded">ESC</kbd> or click outside to close
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideOut {
          from { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to { 
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
        }

        kbd {
          font-family: inherit;
        }
      `}</style>
    </>
  );
};

export default ProjectModal;