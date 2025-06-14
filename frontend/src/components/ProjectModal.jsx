const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 text-green-400 font-mono z-50 flex items-center justify-center">
      <div className="bg-black border border-green-600 p-6 rounded-lg max-w-xl w-full">
        <h2 className="text-xl text-green-300 mb-2">{project.title}</h2>
        <p className="mb-1 italic">{project.description}</p>
        <p className="mb-4">{project.content}</p>
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
  );
};

export default ProjectModal;
