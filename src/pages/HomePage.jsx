import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Code2, LayoutTemplate, ShieldCheck, TabletSmartphone } from 'lucide-react';
import api from '../api/api.js';
import ProjectCard from '../components/ProjectCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

const serviceCards = [
  { icon: Code2, title: 'Custom Websites', description: 'High-converting business websites built to look premium and convert visitors into qualified leads.' },
  { icon: LayoutTemplate, title: 'Landing Pages', description: 'Focused marketing pages designed for campaigns, product launches, and service promotion.' },
  { icon: TabletSmartphone, title: 'Web Apps', description: 'Modern dashboard, booking, and client portal applications engineered for daily business use.' },
];

const packagePlans = [
  { name: 'Starter', price: 'KSh 25,000', description: 'One-page business website with contact form and basic SEO setup.' },
  { name: 'Growth', price: 'KSh 60,000', description: '5-page responsive website with portfolio, blog structure, and lead capture features.' },
  { name: 'Custom', price: 'From KSh 120,000', description: 'Tailored business system, full-stack app, or online store built around your workflow.' },
];

const processSteps = [
  'Tell us what your business needs, audience, and goals are.',
  'We plan the sitemap, content structure, and user flow for the best conversion path.',
  'We design, build, and launch the website with testing and deployment support.',
];

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    clientEmail: '',
    phoneNumber: '',
    projectType: 'Business Website',
    packagePlan: 'Starter',
    budgetRange: 'KSh 25,000 - KSh 50,000',
    timeline: '2-4 Weeks',
    projectDetails: '',
  });
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => ['All', ...new Set(projects.map((project) => project.category))], [projects]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 1. Check length before sending
    if (!formData.projectDetails || formData.projectDetails.trim().length < 20) {
        setSubmitState({ type: 'error', message: 'Project details must be at least 20 characters. Please describe your idea more.' });
        return;
    }

    setSubmitState({ type: 'info', message: 'Submitting your project request...' });

    try {
      // 2. Fix amount - take first number only
      const budgetNumbers = formData.budgetRange.match(/[0-9,]+/g);
      const firstBudget = budgetNumbers? Number(budgetNumbers[0].replace(/,/g, '')) : 25000;

      const payload = {
        clientName: formData.clientName,
        companyName: formData.companyName,
        clientEmail: formData.clientEmail,
        phoneNumber: formData.phoneNumber,
        projectType: formData.projectType,
        packagePlan: formData.packagePlan,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        projectDetails: formData.projectDetails.trim(),
        amount: firstBudget, // 25000 not 2500050000
      };

      const response = await api.post('/orders', payload);
      const orderId = response.data.order?._id;
      setSubmitState({ type: 'success', message: `Thanks! Your request ID is #${orderId}. You will be redirected to WhatsApp. We will confirm payment there. Status: Pending.` });
      if (response.data.whatsappUrl) {
        window.setTimeout(() => window.location.assign(response.data.whatsappUrl), 1200);
      }

      // 3. Reset WITH projectDetails
      setFormData({
        clientName: '',
        companyName: '',
        clientEmail: '',
        phoneNumber: '',
        projectType: 'Business Website',
        packagePlan: 'Starter',
        budgetRange: 'KSh 25,000 - KSh 50,000',
        timeline: '2-4 Weeks',
        projectDetails: '',
      });

    } catch (err) {
      const apiError = err.response?.data?.errors?.[0]?.message || err.response?.data?.message || 'Failed to submit';
      setSubmitState({ type: 'error', message: apiError });
      console.log("FULL ERROR:", err.response?.data); // check console
    }
};

  const visibleProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Freelance web development studio</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Professional websites that help businesses win more clients.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              We design and build modern websites, business portals, landing pages, and online stores for founders, brands, and growing companies in Kenya and beyond.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#work" className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                View projects
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-400">
                Book a project
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              <span>Business websites</span>
              <span>Landing pages</span>
              <span>Web apps</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Launch readiness</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">Fast, clean, results-driven</h3>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  4.9/5 rating
                </div>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Design quality</span>
                    <span>94%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[94%] rounded-full bg-slate-900" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Performance</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[90%] rounded-full bg-slate-900" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Projects</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">48</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Clients</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">32</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Web design and development solutions for credible brands."
            description="From small company websites to custom digital products, we design efficient systems that communicate trust and turn interest into action."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serviceCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                  <Icon size={20} className="text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Packages"
          title="Simple pricing for business-ready web projects."
          description="Choose the package that matches your immediate needs, then we tailor the scope to your business goals."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packagePlans.map((plan) => (
            <div key={plan.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                  {plan.price}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3"><BadgeCheck size={16} className="text-slate-900" /> Custom design direction</li>
                <li className="flex items-center gap-3"><BadgeCheck size={16} className="text-slate-900" /> Responsive layout</li>
                <li className="flex items-center gap-3"><BadgeCheck size={16} className="text-slate-900" /> Contact and conversion features</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Recent work"
            title="Selected websites and digital products."
            description="Portfolio examples built for service businesses, product founders, and growing online brands."
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] ${selectedCategory === category
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-10 text-sm text-slate-600">Loading projects...</div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section id="approach" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Process"
              title="A simple path from idea to launch."
              description="We keep the workflow streamlined so you always know what is happening and what comes next."
            />
          </div>
          <div className="space-y-5">
            {processSteps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700">
                  {index + 1}
                </div>
                <p className="text-base text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Project inquiry</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Tell us what you want to build.</h2>
            <p className="mt-4 text-base text-slate-600">
              Share your goals and timeline, and we will advise on the best solution, budget fit, and launch plan.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <ShieldCheck size={16} className="text-slate-900" />
                Secure project discussions and clear scope planning
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <BriefcaseBusiness size={16} className="text-slate-900" />
                Flexible packages for startups and established brands
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <BadgeCheck size={16} className="text-slate-900" />
                Payment confirmation handled personally after our discussion
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <input name="clientName" value={formData.clientName} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400" placeholder="Jane Wanjiku" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Business name</label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400" placeholder="Bluewave Labs" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input name="clientEmail" type="email" value={formData.clientEmail} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400" placeholder="name@company.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400" placeholder="+254 712 345678" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Project type</label>
                <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400">
                  <option>Business Website</option>
                  <option>Landing Page</option>
                  <option>E-Commerce Store</option>
                  <option>Web App</option>
                  <option>Website Design</option>
                  <option>Full-Stack System</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Package</label>
                <select name="packagePlan" value={formData.packagePlan} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400">
                  <option>Starter</option>
                  <option>Growth</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Budget range</label>
                <input name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400" placeholder="KSh 25,000 - KSh 50,000" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Timeline</label>
                <select name="timeline" value={formData.timeline} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400">
                  <option>2-4 Weeks</option>
                  <option>1 Month</option>
                  <option>2 Months</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Project details</label>
              <textarea name="projectDetails" rows="5" value={formData.projectDetails} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-slate-400" placeholder="Describe your business goals, target audience, current website, and what the new website should achieve." />
            </div>
            {submitState.message && (
              <div className={`rounded-md border px-3 py-2 text-sm ${submitState.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : submitState.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                {submitState.message}
              </div>
            )}
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Submit project request
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default HomePage;
