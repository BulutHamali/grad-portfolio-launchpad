import { CalendarDays, ExternalLink, ShieldCheck } from "lucide-react";

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    level: "Associate",
    issued: "October 2026",
    validThrough: "October 2029",
    image: "/certifications/aws-solutions-architect-associate.png",
    credentialUrl: "https://www.credly.com/badges/39436f04-6e17-4ae4-a5ab-1d3857e395bc",
    description:
      "Validated expertise in designing secure, resilient, high-performing, and cost-optimized architectures on AWS.",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    level: "Foundational",
    issued: "May 2026",
    validThrough: "October 2029",
    image: "/certifications/aws-cloud-practitioner.png",
    credentialUrl: "https://www.credly.com/badges/d3824c24-1683-45fc-84f1-ffde614283db",
    description:
      "Validated foundational knowledge of AWS Cloud concepts, services, security, architecture, pricing, and support.",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="bg-slate-900 py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-300">
              <ShieldCheck className="h-4 w-4" />
              AWS Training and Certification
            </div>
            <h2 className="mb-4 text-4xl font-bold">AWS Certifications</h2>
            <p className="mx-auto max-w-2xl text-slate-300">
              Two active AWS credentials spanning cloud fundamentals and production-ready architecture design.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {certifications.map((certification) => (
              <article
                key={certification.name}
                className="group flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-orange-400/60 hover:shadow-orange-950/30 sm:flex-row sm:items-center sm:gap-7"
              >
                <a
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${certification.name} on Credly`}
                  className="mx-auto mb-6 block shrink-0 sm:mb-0"
                >
                  <img
                    src={certification.image}
                    alt={`${certification.name} digital badge`}
                    width="176"
                    height="176"
                    loading="lazy"
                    className="h-40 w-40 object-contain transition duration-300 group-hover:scale-105"
                  />
                </a>

                <div className="flex flex-1 flex-col text-center sm:text-left">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                    {certification.level}
                  </span>
                  <h3 className="mb-3 text-xl font-semibold leading-snug text-white">
                    {certification.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">
                    {certification.description}
                  </p>
                  <div className="mb-5 flex items-center justify-center gap-2 text-xs text-slate-400 sm:justify-start">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      Issued {certification.issued} · Valid through {certification.validThrough}
                    </span>
                  </div>
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 font-semibold text-cyan-300 transition-colors hover:text-cyan-200 sm:justify-start"
                  >
                    Verify on Credly
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.credly.com/users/bulut-hamali"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              View complete Credly profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
