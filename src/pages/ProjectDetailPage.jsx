import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import api from '../api/api.js';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${slug}`);
        setProject(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-sm text-slate-600 sm:px-6 lg:px-8">Loading project details...</div>;
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-700 shadow-soft">
          Project not found.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
        <ArrowLeft size={16} />
        Back to work
      </Link>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <img src={project.image} alt={project.title} className="h-[420px] w-full object-cover" />
        <div className="space-y-8 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{project.category}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{project.title}</h1>
            </div>
            <div className="flex gap-3">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800">
                  <ExternalLink size={16} />
                  Live site
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800">
                  <Github size={16} />
                  GitHub
                </a>
              )}
            </div>
          </div>

          <p className="max-w-3xl text-lg text-slate-600">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                {tech}
              </span>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Business challenge</h2>
              <div className="mt-4 prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: project.description }} />
            </div>
            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Project snapshot</h3>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Client</dt>
                  <dd className="mt-1 text-sm text-slate-800">{project.clientName || 'Private client'}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Category</dt>
                  <dd className="mt-1 text-sm text-slate-800">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">Delivery</dt>
                  <dd className="mt-1 text-sm text-slate-800">Full-stack platform design and implementation</dd>
                </div>
              </dl>
            </aside>
          </div>

        </div>
      </article>
    </div>
  );
};

export default ProjectDetailPage;
