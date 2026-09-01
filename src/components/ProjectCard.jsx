import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => (
  <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:border-slate-300">
    <div className="overflow-hidden border-b border-slate-200">
      <img
        src={project.image}
        alt={project.title}
        className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
    </div>
    <div className="space-y-5 p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
          {project.category}
        </span>
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 transition hover:text-slate-900">
            Live <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-4">
        <Link to={`/projects/${project._id}`} className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
          Read case study
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  </article>
);

export default ProjectCard;
