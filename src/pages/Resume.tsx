import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { education, elements, experience, families, projects, site } from '../data/site'
import { ResumeLink } from '../components/ResumeLink'
import { ArrowDown, ArrowLeft, ArrowUpRight, Container, EASE } from '../components/ui'

const summary =
  'Business Analyst / Data Analyst with 3+ years driving data-driven process automation, reporting standardization and product enhancements for large-scale CMS federal health IT systems. Partners with technical and product stakeholders to define requirements, prioritize features and influence product roadmaps. Writes, optimizes and maintains SQL across large operational datasets and builds the query logic, data models and stored procedures behind dashboards, tracking tools and automated workflows.'

const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!

export function Resume() {
  const mearis = bySlug('cms-mearis')
  const arts = bySlug('financial-monitoring-dashboard')
  const hpms = bySlug('hpms-kpi-reporting')
  const jobRing = [...bySlug('candidate-stability-model').did, ...bySlug('data-ops-automation').did]
  const intern = experience.find((e) => e.org === 'MakeSense Inc.')!

  return (
    <main className="pb-10" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 112px)' }}>
      <Container className="max-w-[1080px]!">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-ink"
          >
            <ArrowLeft className="size-3.5" /> Portfolio
          </Link>
          <ResumeLink className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5">
            Download PDF <ArrowDown className="size-3.5" />
          </ResumeLink>
        </div>

        <motion.article
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-8 rounded-[32px] border border-line bg-surface p-6 sm:p-10 lg:p-14"
        >
          <header className="border-b border-line pb-8">
            <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[0.95] tracking-[-0.05em]">
              {site.name}
            </h1>
            <p className="mt-3 text-lg">
              Business Analyst <span className="text-ink-soft">|</span> Data Analyst{' '}
              <em className="font-serif italic text-ink-soft">SQL · process automation · product requirements</em>
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
              <span>{site.location}</span>
              <span className="select-all">{site.email}</span>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink">
                {site.linkedinLabel} <ArrowUpRight className="size-3" />
              </a>
            </div>
          </header>

          <Part title="Summary">
            <p className="max-w-[78ch] text-[15.5px] leading-relaxed">{summary}</p>
          </Part>

          <Part title="Skills">
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {families.map((f) => (
                <div key={f.id} className="min-w-0">
                  <dt className="flex items-center gap-2 text-sm font-semibold">
                    <span className="size-2 rounded-[2px]" style={{ background: `var(--fam-${f.id})` }} aria-hidden />
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-[14.5px] text-ink-soft">
                    {elements
                      .filter((e) => e.family === f.id)
                      .map((e) => e.name)
                      .join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </Part>

          <Part title="Experience">
            <Job
              title="Tria Federal (formerly Softrams)"
              meta="Windsor Mill, MD · CMS federal health IT programs"
              period="07/2023 – Present"
            >
              <SubRole title="Product Analyst — CMS MEARIS" period={mearis.period} points={mearis.did} />
              <SubRole title="Business Analyst / Associate Data Analyst — CMS ARTS" period="07/2023 – 09/2024" points={arts.did} />
              <SubRole title="Associate Data Analyst — CMS HPMS" period="07/2023 – 09/2024" points={hpms.did} />
              <SubRole title="Associate Data Analyst — Job Ring" period="07/2023 – 09/2024" points={jobRing} />
            </Job>
            <Job title={intern.org} meta={intern.where} period={intern.period}>
              <SubRole title={intern.role} points={intern.points} />
            </Job>
          </Part>

          <Part title="Education">
            <div className="flex flex-col gap-4">
              {education.map((e) => (
                <div key={e.role} className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-6">
                  <div className="min-w-0">
                    <div className="font-semibold">{e.role}</div>
                    <div className="text-[14.5px] text-ink-soft">
                      {e.org}, {e.where}
                    </div>
                  </div>
                  <span className="tabular shrink-0 font-mono text-[13px] text-ink-soft">{e.period}</span>
                </div>
              ))}
            </div>
          </Part>

          <Part title="Academic projects" last>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              {[bySlug('hospital-readmissions'), bySlug('ehr-database')].map((p) => (
                <li key={p.slug}>
                  <Link to={`/work/${p.slug}`} className="font-semibold underline decoration-line underline-offset-4 hover:decoration-ink">
                    {p.title}
                  </Link>
                  <span className="text-ink-soft"> — {p.summary}</span>
                </li>
              ))}
              <li>
                <span className="font-semibold">Chronic Kidney Disease Prediction</span>
                <span className="text-ink-soft">
                  {' '}
                  — Data-mining and ML model that identifies people at risk of CKD; hyperparameters tuned with grid and
                  random search.
                </span>
              </li>
            </ul>
          </Part>
        </motion.article>
      </Container>
    </main>
  )
}

function Part({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <section className={`grid gap-4 py-8 md:grid-cols-[170px_minmax(0,1fr)] md:gap-8 ${last ? 'pb-0' : 'border-b border-line'}`}>
      <h2 className="eyebrow pt-1">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Job({ title, meta, period, children }: { title: string; meta: string; period: string; children: ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-6">
        <div className="min-w-0">
          <div className="text-lg font-semibold tracking-[-0.01em]">{title}</div>
          <div className="text-[14px] text-ink-soft">{meta}</div>
        </div>
        <span className="tabular shrink-0 font-mono text-[13px] text-ink-soft">{period}</span>
      </div>
      <div className="mt-4 flex flex-col gap-5">{children}</div>
    </div>
  )
}

function SubRole({ title, period, points }: { title: string; period?: string; points: string[] }) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-6">
        <div className="text-[15px] font-medium">{title}</div>
        {period && <span className="tabular shrink-0 font-mono text-[12px] text-ink-soft">{period}</span>}
      </div>
      <ul className="mt-2 flex flex-col gap-1.5 text-[14.5px] text-ink-soft">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5">
            <span className="mt-[10px] h-px w-2.5 shrink-0 bg-ink-soft" aria-hidden />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
