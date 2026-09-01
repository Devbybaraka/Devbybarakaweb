import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import api from '../api/api.js';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects').then((response) => setProjects(response.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Portfolio</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Selected work</h1>
      {loading ? <p className="mt-8 text-sm text-slate-600">Loading projects...</p> : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
              <img src={project.image} alt={project.title} className="h-60 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{project.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{tech}</span>)}</div>
                <div className="mt-6 flex gap-4 text-sm font-medium">
                  {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">Live site <ExternalLink size={14} /></a>}
                  {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">GitHub <Github size={14} /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
