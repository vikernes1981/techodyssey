import { useState, useEffect } from "react";

const ProjectModal = ({ isOpen, onClose, project }) => {
const [lightboxContent, setLightboxContent] = useState(null);
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (lightboxContent) {
        setLightboxContent(null);
      } else {
        onClose();
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [lightboxContent, onClose]);


  if (!isOpen || !project) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-90 text-green-400 font-mono z-50 flex items-center justify-center">
        <div className="bg-black border border-green-600 p-6 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl text-green-300 mb-2">{project.title}</h2>
          <p className="mb-1 italic">{project.description}</p>
          <div className="mb-4">
            {
              typeof project.content === "string"
                ? project.content
                : typeof project.content === "function"
                  ? project.content(setLightboxContent)
                  : project.content
            }
          </div>
          <p className="text-sm mb-4">Stack: {project.stack.join(", ")}</p>
          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} className="underline" target="_blank">GitHub</a>
            )}
            {project.live && (
              <a href={project.live} className="underline" target="_blank">Live Demo</a>
            )}
          </div>
          <button onClick={onClose} className="mt-6 underline hover:text-green-200">Close</button>
        </div>
      </div>

      {lightboxContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setLightboxContent(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="p-4 bg-black rounded-lg border border-green-600">
            {lightboxContent}
            <button
              onClick={() => setLightboxContent(null)}
              className="block mt-4 text-green-300 underline hover:text-green-100 mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
