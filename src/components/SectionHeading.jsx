const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="max-w-2xl">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base text-slate-600">{description}</p>}
  </div>
);

export default SectionHeading;
