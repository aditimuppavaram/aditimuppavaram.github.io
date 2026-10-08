import { motion } from 'motion/react'
import type { VisualKind } from '../data/site'

/**
 * Small illustrated mock-ups for each project. They are drawn in SVG from the
 * theme tokens, so they follow light and dark mode. They illustrate the kind of
 * work, not real figures: the only numbers shown come from the resume.
 */
export function ProjectVisual({ kind, className = '' }: { kind: VisualKind; className?: string }) {
  const Comp = {
    pipeline: Pipeline,
    dashboard: Dashboard,
    reports: Reports,
    model: Model,
    automation: Automation,
    roc: Roc,
    schema: Schema,
  }[kind]
  return (
    <div className={`relative overflow-hidden rounded-[22px] border border-line bg-wash ${className}`}>
      <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label={labels[kind]}>
        <Comp />
      </svg>
    </div>
  )
}

const labels: Record<VisualKind, string> = {
  pipeline: 'Illustration: applications moving from intake to review to decision',
  dashboard: 'Illustration: a financial monitoring dashboard',
  reports: 'Illustration: a wall of standardized KPI reports',
  model: 'Illustration: a gauge showing 85% model accuracy',
  automation: 'Illustration: an automated daily data workflow',
  roc: 'Illustration: an ROC curve used to compare models',
  schema: 'Illustration: a relational EHR database schema',
}

const MONO = 'font-mono'

function Chip({ x, y, label, dark = false, size = 8.5 }: { x: number; y: number; label: string; dark?: boolean; size?: number }) {
  const w = label.length * size * 0.61 + 16
  return (
    <g>
      <rect x={x} y={y} width={w} height={size + 10} rx={(size + 10) / 2} className={dark ? 'fill-ink' : 'fill-surface stroke-line'} />
      <text x={x + 8} y={y + size + 3.5} fontSize={size} className={`${MONO} ${dark ? 'fill-paper' : 'fill-ink'}`}>
        {label}
      </text>
    </g>
  )
}

function chipWidth(label: string, size = 8.5) {
  return label.length * size * 0.61 + 16
}

function ChipRow({ x, y, labels, darkFirst = false, gap = 6 }: { x: number; y: number; labels: string[]; darkFirst?: boolean; gap?: number }) {
  let cx = x
  return (
    <g>
      {labels.map((l, i) => {
        const el = <Chip key={l} x={cx} y={y} label={l} dark={darkFirst && i === 0} />
        cx += chipWidth(l) + gap
        return el
      })}
    </g>
  )
}

/* ------------------------------------------------------------ MEARIS -- */
function Pipeline() {
  const cols = [
    { x: 14, title: 'Intake', cards: ['NTAP', 'MS-DRG', 'ICD-10-PCS'] },
    { x: 140, title: 'Review', cards: ['MS-DRG', 'NTAP'] },
    { x: 266, title: 'Decision', cards: ['ICD-10-PCS'] },
  ]
  return (
    <g>
      {cols.map((c) => (
        <g key={c.title}>
          <text x={c.x + 4} y={24} fontSize="10" className={`${MONO} fill-ink-soft`}>
            {c.title.toUpperCase()}
          </text>
          <rect x={c.x} y={34} width={120} height={254} rx={14} className="fill-paper stroke-line" />
          {c.cards.map((label, i) => (
            <g key={label + i}>
              <rect x={c.x + 8} y={44 + i * 60} width={104} height={50} rx={9} className="fill-surface stroke-line" />
              <Chip x={c.x + 16} y={52 + i * 60} label={label} size={7.5} />
              <rect x={c.x + 16} y={78 + i * 60} width={80} height={4} rx={2} className="fill-wash" />
              <rect x={c.x + 16} y={86 + i * 60} width={52} height={4} rx={2} className="fill-wash" />
              {c.title === 'Decision' && (
                <g>
                  <circle cx={c.x + 98} cy={58 + i * 60} r={8} className="fill-ink" />
                  <path d={`M${c.x + 94} ${58 + i * 60} l3 3 l5 -6`} className="stroke-paper" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </g>
              )}
            </g>
          ))}
        </g>
      ))}
      <motion.g
        animate={{ x: [0, 0, 126, 126, 252, 252] }}
        transition={{ duration: 7, times: [0, 0.18, 0.38, 0.6, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x={22} y={228} width={104} height={50} rx={9} className="fill-ink" />
        <rect x={30} y={236} width={58} height={17} rx={8.5} className="fill-paper" opacity="0.18" />
        <text x={38} y={248} fontSize="7.5" className={`${MONO} fill-paper`}>
          NEW APP
        </text>
        <rect x={30} y={262} width={80} height={4} rx={2} className="fill-paper" opacity="0.35" />
      </motion.g>
    </g>
  )
}

/* ------------------------------------------------------- ARTS dashboard -- */
function Dashboard() {
  const bars = [62, 94, 74, 112, 84, 124, 68, 100, 82]
  const tops = bars.map((h, i) => `${41 + i * 38},${270 - h}`).join(' ')
  return (
    <g>
      <ChipRow x={14} y={12} labels={['Proposals', 'Cost reports', 'Deliverables', 'Workload']} darkFirst />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={14 + i * 127} y={44} width={118} height={66} rx={12} className="fill-surface stroke-line" />
          <rect x={26 + i * 127} y={56} width={[52, 40, 60][i]} height={5} rx={2.5} className="fill-line" />
          {i === 0 && (
            <polyline
              points="26,96 40,90 54,93 68,82 82,85 96,74 110,70 124,64"
              className="stroke-ink"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          {i === 1 &&
            [16, 24, 12, 28, 20, 32].map((h, j) => (
              <rect key={j} x={153 + j * 15} y={100 - h} width={9} height={h} rx={2} className={j === 5 ? 'fill-ink' : 'fill-wash'} />
            ))}
          {i === 2 && (
            <g>
              <rect x={280} y={86} width={94} height={8} rx={4} className="fill-wash" />
              <rect x={280} y={86} width={70} height={8} rx={4} className="fill-ink" />
            </g>
          )}
        </g>
      ))}
      <rect x={14} y={122} width={372} height={166} rx={14} className="fill-surface stroke-line" />
      <text x={28} y={144} fontSize="9.5" className={`${MONO} fill-ink-soft`}>
        CONTRACTOR SPEND
      </text>
      {[190, 222, 254].map((y) => (
        <line key={y} x1={28} x2={372} y1={y} y2={y} className="stroke-line" strokeDasharray="3 4" />
      ))}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={32 + i * 38}
          width={18}
          rx={4}
          className={i === 5 ? 'fill-ink' : 'fill-wash'}
          initial={{ height: 0, y: 270 }}
          whileInView={{ height: h, y: 270 - h }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      <polyline points={tops} className="stroke-ink-soft" strokeWidth="1.4" fill="none" strokeDasharray="2 3" />
      <line x1={28} x2={372} y1={270} y2={270} className="stroke-line" />
    </g>
  )
}

/* ----------------------------------------------------------- HPMS reports -- */
function Reports() {
  const cells = Array.from({ length: 12 }, (_, i) => i)
  return (
    <g>
      {cells.map((i) => {
        const x = 14 + (i % 4) * 94
        const y = 12 + Math.floor(i / 4) * 84
        const dark = i === 5
        const fg = dark ? 'fill-paper' : 'fill-ink'
        const soft = dark ? 'fill-paper' : 'fill-wash'
        const kind = i % 4
        return (
          <g key={i}>
            <rect x={x} y={y} width={86} height={76} rx={10} className={dark ? 'fill-ink' : 'fill-surface stroke-line'} />
            <rect x={x + 9} y={y + 10} width={36} height={4} rx={2} className={dark ? 'fill-paper' : 'fill-line'} opacity={dark ? 0.5 : 1} />
            {kind === 0 &&
              [18, 30, 22, 36, 26].map((h, j) => (
                <rect key={j} x={x + 10 + j * 14} y={y + 66 - h} width={8} height={h} rx={2} className={j === 3 ? fg : soft} opacity={dark && j !== 3 ? 0.35 : 1} />
              ))}
            {kind === 1 && (
              <polyline
                points={`${x + 10},${y + 60} ${x + 26},${y + 50} ${x + 42},${y + 54} ${x + 58},${y + 38} ${x + 76},${y + 30}`}
                className={dark ? 'stroke-paper' : 'stroke-ink'}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {kind === 2 && (
              <g>
                <circle cx={x + 43} cy={y + 46} r={17} className={dark ? 'stroke-paper' : 'stroke-wash'} strokeWidth="7" fill="none" opacity={dark ? 0.3 : 1} />
                <circle
                  cx={x + 43}
                  cy={y + 46}
                  r={17}
                  className={dark ? 'stroke-paper' : 'stroke-ink'}
                  strokeWidth="7"
                  fill="none"
                  pathLength={100}
                  strokeDasharray="62 100"
                  transform={`rotate(-90 ${x + 43} ${y + 46})`}
                />
              </g>
            )}
            {kind === 3 &&
              [0, 1, 2, 3].map((r) => (
                <g key={r}>
                  <rect x={x + 10} y={y + 26 + r * 11} width={30} height={4} rx={2} className={soft} opacity={dark ? 0.4 : 1} />
                  <rect x={x + 50} y={y + 26 + r * 11} width={26} height={4} rx={2} className={r === 1 ? fg : soft} opacity={dark && r !== 1 ? 0.4 : 1} />
                </g>
              ))}
          </g>
        )
      })}
      <ChipRow x={14} y={268} labels={['50+ KPI reports', 'Medicare Advantage', 'Part D']} darkFirst />
    </g>
  )
}

/* -------------------------------------------------- candidate stability -- */
function Model() {
  const arc = 'M 34 186 A 88 88 0 0 1 210 186'
  const rows = [
    { label: 'Likely to stay', w: 104 },
    { label: 'Uncertain', w: 58 },
    { label: 'At risk', w: 34 },
  ]
  return (
    <g>
      <rect x={14} y={14} width={216} height={238} rx={16} className="fill-surface stroke-line" />
      <text x={30} y={38} fontSize="9.5" className={`${MONO} fill-ink-soft`}>
        MODEL ACCURACY
      </text>
      <path d={arc} className="stroke-wash" strokeWidth="18" fill="none" strokeLinecap="round" />
      <motion.path
        d={arc}
        className="stroke-ink"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 0.85 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <text x={122} y={176} textAnchor="middle" fontSize="38" className="fill-ink font-display font-semibold" letterSpacing="-1.5">
        85%
      </text>
      <text x={122} y={236} textAnchor="middle" fontSize="9" className={`${MONO} fill-ink-soft`}>
        CANDIDATE STABILITY
      </text>
      <text x={34} y={214} fontSize="8.5" className={`${MONO} fill-ink-soft`}>
        0
      </text>
      <text x={210} y={214} textAnchor="end" fontSize="8.5" className={`${MONO} fill-ink-soft`}>
        100
      </text>

      <rect x={240} y={14} width={146} height={238} rx={16} className="fill-surface stroke-line" />
      <text x={254} y={38} fontSize="9.5" className={`${MONO} fill-ink-soft`}>
        PREDICTIONS
      </text>
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x={254} y={78 + i * 56} fontSize="10" className="fill-ink font-display font-medium">
            {r.label}
          </text>
          <rect x={254} y={88 + i * 56} width={118} height={10} rx={5} className="fill-wash" />
          <motion.rect
            x={254}
            y={88 + i * 56}
            height={10}
            rx={5}
            className={i === 0 ? 'fill-ink' : 'fill-ink-soft'}
            initial={{ width: 0 }}
            whileInView={{ width: r.w }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </g>
      ))}
      <ChipRow x={14} y={266} labels={['Python', 'SQL', 'Tableau']} />
    </g>
  )
}

/* ------------------------------------------------------- data ops flow -- */
function Automation() {
  const nodes = [
    { x: 16, y: 26, t: 'Daily schedule', s: 'runs on its own' },
    { x: 234, y: 26, t: 'PL/SQL procedure', s: 'reusable' },
    { x: 234, y: 146, t: 'AWS DynamoDB', s: 'storage & retrieval' },
    { x: 16, y: 146, t: 'Workflows', s: 'less manual work' },
  ]
  return (
    <g>
      <path d="M166 54 H234" className="stroke-ink dash-flow" strokeWidth="2" fill="none" />
      <path d="M309 82 V146" className="stroke-ink dash-flow" strokeWidth="2" fill="none" />
      <path d="M234 174 H166" className="stroke-ink dash-flow" strokeWidth="2" fill="none" />
      <path d="M91 146 V82" className="stroke-line" strokeWidth="2" fill="none" strokeDasharray="2 5" />
      <path d="M228 50 l6 4 -6 4" className="stroke-ink" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M305 140 l4 6 4 -6" className="stroke-ink" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M172 170 l-6 4 6 4" className="stroke-ink" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {nodes.map((n, i) => (
        <g key={n.t}>
          <rect x={n.x} y={n.y} width={150} height={56} rx={14} className={i === 1 ? 'fill-ink' : 'fill-surface stroke-line'} />
          <circle cx={n.x + 22} cy={n.y + 28} r={9} className={i === 1 ? 'fill-paper' : 'fill-wash'} opacity={i === 1 ? 0.2 : 1} />
          <text x={n.x + 22} y={n.y + 31.5} textAnchor="middle" fontSize="9" className={`${MONO} ${i === 1 ? 'fill-paper' : 'fill-ink'}`}>
            {i + 1}
          </text>
          <text x={n.x + 40} y={n.y + 26} fontSize="11" className={`font-display font-semibold ${i === 1 ? 'fill-paper' : 'fill-ink'}`}>
            {n.t}
          </text>
          <text x={n.x + 40} y={n.y + 40} fontSize="8.5" className={`${MONO} ${i === 1 ? 'fill-paper' : 'fill-ink-soft'}`} opacity={i === 1 ? 0.7 : 1}>
            {n.s}
          </text>
        </g>
      ))}
      <rect x={16} y={222} width={368} height={64} rx={14} className="fill-paper stroke-line" />
      <text x={30} y={244} fontSize="9.5" className={`${MONO} fill-ink-soft`}>
        DATABASE ADMIN
      </text>
      <ChipRow x={30} y={254} labels={['Users', 'Roles', 'Security patches']} />
    </g>
  )
}

/* ------------------------------------------------------------- ROC curve -- */
function Roc() {
  const x0 = 58
  const y0 = 26
  const w = 310
  const h = 200
  const curve = `M${x0} ${y0 + h} C ${x0 + 22} ${y0 + 70} ${x0 + 96} ${y0 + 18} ${x0 + w} ${y0}`
  return (
    <g>
      <rect x={14} y={10} width={372} height={250} rx={16} className="fill-surface stroke-line" />
      {[0.25, 0.5, 0.75].map((t) => (
        <g key={t}>
          <line x1={x0 + w * t} x2={x0 + w * t} y1={y0} y2={y0 + h} className="stroke-line" strokeDasharray="2 4" />
          <line x1={x0} x2={x0 + w} y1={y0 + h * t} y2={y0 + h * t} className="stroke-line" strokeDasharray="2 4" />
        </g>
      ))}
      <path d={`${curve} L ${x0 + w} ${y0 + h} Z`} className="fill-wash" />
      <line x1={x0} y1={y0 + h} x2={x0 + w} y2={y0} className="stroke-ink-soft" strokeDasharray="4 4" />
      <motion.path
        d={curve}
        className="stroke-ink"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <rect x={x0} y={y0} width={w} height={h} className="stroke-line" fill="none" />
      <text x={x0} y={y0 + h + 14} textAnchor="middle" fontSize="8.5" className={`${MONO} fill-ink-soft`}>
        0
      </text>
      <text x={x0 + w} y={y0 + h + 14} textAnchor="middle" fontSize="8.5" className={`${MONO} fill-ink-soft`}>
        1
      </text>
      <text x={x0 - 8} y={y0 + 4} textAnchor="end" fontSize="8.5" className={`${MONO} fill-ink-soft`}>
        1
      </text>
      <text x={x0 + w / 2} y={y0 + h + 26} textAnchor="middle" fontSize="8.5" className={`${MONO} fill-ink-soft`}>
        FALSE POSITIVE RATE
      </text>
      <text
        x={0}
        y={0}
        transform={`translate(${x0 - 20} ${y0 + h / 2}) rotate(-90)`}
        textAnchor="middle"
        fontSize="8.5"
        className={`${MONO} fill-ink-soft`}
      >
        TRUE POSITIVE RATE
      </text>
      <ChipRow x={14} y={268} labels={['Accuracy', 'Precision', 'F1-score', 'ROC-AUC']} darkFirst={false} />
    </g>
  )
}

/* ------------------------------------------------------------ EHR schema -- */
function Schema() {
  const tables = [
    { x: 144, y: 96, name: 'patients', rows: ['patient_id  PK', 'name', 'dob'], main: true },
    { x: 14, y: 14, name: 'history', rows: ['history_id  PK', 'patient_id  FK'] },
    { x: 274, y: 14, name: 'treatments', rows: ['treat_id  PK', 'patient_id  FK'] },
    { x: 14, y: 190, name: 'labs', rows: ['lab_id  PK', 'patient_id  FK'] },
    { x: 274, y: 190, name: 'roles', rows: ['role', 'access  RBAC'] },
  ]
  const links = [
    'M126 56 C 136 56 134 112 144 112',
    'M274 56 C 264 56 266 112 256 112',
    'M126 232 C 136 232 134 172 144 172',
    'M274 232 C 264 232 266 172 256 172',
  ]
  return (
    <g>
      {links.map((d) => (
        <path key={d} d={d} className="stroke-ink-soft" strokeWidth="1.5" fill="none" />
      ))}
      {tables.map((t) => {
        const hgt = 26 + t.rows.length * 16 + 8
        return (
          <g key={t.name}>
            <rect x={t.x} y={t.y} width={112} height={hgt} rx={10} className="fill-surface stroke-line" />
            <path
              d={`M${t.x} ${t.y + 10} a10 10 0 0 1 10 -10 h92 a10 10 0 0 1 10 10 v12 h-112 z`}
              className={t.main ? 'fill-ink' : 'fill-wash'}
            />
            <text x={t.x + 10} y={t.y + 15} fontSize="9" className={`${MONO} font-medium ${t.main ? 'fill-paper' : 'fill-ink'}`}>
              {t.name}
            </text>
            {t.rows.map((r, i) => (
              <text key={r} x={t.x + 10} y={t.y + 38 + i * 16} fontSize="8" className={`${MONO} fill-ink-soft`}>
                {r}
              </text>
            ))}
          </g>
        )
      })}
      <g transform="translate(360 196)">
        <rect x={0} y={6} width={14} height={11} rx={2} className="fill-ink" />
        <path d="M3 6 v-2 a4 4 0 0 1 8 0 v2" className="stroke-ink" strokeWidth="1.6" fill="none" />
      </g>
      <ChipRow x={14} y={270} labels={['HL7 review', 'Backup & DR runbook']} />
    </g>
  )
}
