"use client";

import {
  Activity,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  CloudSun,
  Command,
  Download,
  FileCheck2,
  FileText,
  FolderOpen,
  Gauge,
  HardHat,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Moon,
  MoreHorizontal,
  PackageCheck,
  PanelLeftClose,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  Upload,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Workspace =
  | "Overview"
  | "Projects"
  | "Schedule"
  | "Tasks"
  | "Financials"
  | "Team"
  | "Documents"
  | "Safety"
  | "Client portal"
  | "Employee portal"
  | "Settings";

type Role = "Admin" | "Client" | "Employee";

const projectData = [
  {
    name: "Riverside Residence",
    type: "Residential · Stuttgart",
    progress: 68,
    budget: "€2.48M",
    due: "Oct 18",
    tone: "copper",
    status: "On track",
    team: ["MK", "LS", "AR"],
  },
  {
    name: "Nordhafen Offices",
    type: "Commercial · Hamburg",
    progress: 42,
    budget: "€6.12M",
    due: "Feb 26",
    tone: "blue",
    status: "At risk",
    team: ["JB", "TN", "MH"],
  },
  {
    name: "Villa Eichenpark",
    type: "Residential · München",
    progress: 87,
    budget: "€1.86M",
    due: "Sep 04",
    tone: "sage",
    status: "On track",
    team: ["EK", "AR", "JM"],
  },
  {
    name: "Kronen Quartier",
    type: "Mixed use · Berlin",
    progress: 24,
    budget: "€8.74M",
    due: "Jun 12",
    tone: "violet",
    status: "On track",
    team: ["MK", "ND", "SW"],
  },
];

const timeline = [
  { time: "08:00", title: "Site coordination", detail: "Riverside · 8 attendees", icon: Users },
  { time: "10:30", title: "Concrete inspection", detail: "Nordhafen · Foundation B", icon: ClipboardCheck },
  { time: "13:00", title: "Client walkthrough", detail: "Villa Eichenpark", icon: Building2 },
  { time: "15:30", title: "Safety briefing", detail: "Kronen Quartier · Crew A", icon: ShieldCheck },
];

const nav: { label: Workspace; icon: LucideIcon; group?: string }[] = [
  { label: "Overview", icon: LayoutDashboard, group: "Workspace" },
  { label: "Projects", icon: Building2 },
  { label: "Schedule", icon: CalendarDays },
  { label: "Tasks", icon: ClipboardCheck },
  { label: "Financials", icon: WalletCards, group: "Management" },
  { label: "Team", icon: Users },
  { label: "Documents", icon: FolderOpen },
  { label: "Safety", icon: ShieldCheck },
  { label: "Client portal", icon: MessageSquareText, group: "Portals" },
  { label: "Employee portal", icon: HardHat },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <span className="brand-mark">
        <i />
        <b />
      </span>
      {!compact && <span>Constructa</span>}
    </div>
  );
}

function AvatarStack({ people }: { people: string[] }) {
  return (
    <div className="avatar-stack" aria-label={`${people.length} team members`}>
      {people.map((person) => (
        <span key={person}>{person}</span>
      ))}
      <em>+4</em>
    </div>
  );
}

function Ring({ value, size = "large" }: { value: number; size?: "small" | "large" }) {
  return (
    <div
      className={`progress-ring ${size}`}
      style={{ "--progress": `${value * 3.6}deg` } as React.CSSProperties}
    >
      <span>{value}%</span>
    </div>
  );
}

export default function ConstructaExperience() {
  const [experience, setExperience] = useState<"public" | "platform">("public");
  const [active, setActive] = useState<Workspace>("Overview");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [role, setRole] = useState<Role>("Admin");
  const [sidebar, setSidebar] = useState(false);
  const [quote, setQuote] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const openPlatform = (nextRole: Role = "Admin") => {
    setRole(nextRole);
    setActive(nextRole === "Client" ? "Client portal" : nextRole === "Employee" ? "Employee portal" : "Overview");
    setExperience("platform");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (experience === "public") {
    return (
      <PublicSite
        onPlatform={() => openPlatform("Admin")}
        onRole={openPlatform}
        onQuote={() => setQuote(true)}
        theme={theme}
        setTheme={setTheme}
        quote={quote}
        closeQuote={() => setQuote(false)}
      />
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebar ? "open" : ""}`}>
        <div className="sidebar-top">
          <button className="logo-button" onClick={() => setExperience("public")} aria-label="Back to website">
            <Logo />
          </button>
          <button className="icon-button close-mobile" onClick={() => setSidebar(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <button className="company-switcher">
          <span className="company-avatar">AC</span>
          <span><b>Axiom Construction</b><small>Enterprise workspace</small></span>
          <ChevronDown size={15} />
        </button>

        <nav className="side-nav">
          {nav.map((item) => (
            <div key={item.label}>
              {item.group && <p>{item.group}</p>}
              <button
                className={active === item.label ? "active" : ""}
                onClick={() => {
                  setActive(item.label);
                  setSidebar(false);
                }}
              >
                <item.icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.label === "Tasks" && <em>12</em>}
              </button>
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => setActive("Settings")}>
            <Settings size={17} /> Settings
          </button>
          <div className="user-card">
            <span className="profile-photo">AR</span>
            <span><b>Arbër Rexha</b><small>{role} workspace</small></span>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace-header">
          <div className="header-left">
            <button className="icon-button menu-mobile" onClick={() => setSidebar(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
            <div>
              <p>Axiom Construction <ChevronRight size={12} /> {role}</p>
              <h1>{active}</h1>
            </div>
          </div>
          <div className="header-actions">
            <label className="search-box">
              <Search size={16} />
              <input placeholder="Search everything…" aria-label="Search" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="icon-button notification" aria-label="Notifications">
              <Bell size={18} /><i />
            </button>
            <button className="primary-button small"><Plus size={16} /> New</button>
          </div>
        </header>

        <div className="demo-bar">
          <span><Sparkles size={14} /> Live product demo</span>
          <p>Switch workspace to experience each role</p>
          <div>
            {(["Admin", "Client", "Employee"] as Role[]).map((item) => (
              <button
                className={role === item ? "active" : ""}
                key={item}
                onClick={() => {
                  setRole(item);
                  setActive(item === "Admin" ? "Overview" : item === "Client" ? "Client portal" : "Employee portal");
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <section className="workspace-content">
          {active === "Overview" && <Overview onNavigate={setActive} />}
          {active === "Projects" && <Projects />}
          {active === "Schedule" && <Schedule />}
          {active === "Tasks" && <Tasks />}
          {active === "Financials" && <Financials />}
          {active === "Team" && <Team />}
          {active === "Documents" && <Documents />}
          {active === "Safety" && <Safety />}
          {active === "Client portal" && <ClientPortal />}
          {active === "Employee portal" && <EmployeePortal />}
          {active === "Settings" && <SettingsPage />}
        </section>
      </main>
    </div>
  );
}

function PublicSite({
  onPlatform,
  onRole,
  onQuote,
  theme,
  setTheme,
  quote,
  closeQuote,
}: {
  onPlatform: () => void;
  onRole: (role: Role) => void;
  onQuote: () => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  quote: boolean;
  closeQuote: () => void;
}) {
  return (
    <main className="marketing">
      <nav className="marketing-nav">
        <Logo />
        <div className="marketing-links">
          <a href="#platform">Platform</a>
          <a href="#projects">Projects</a>
          <a href="#services">Services</a>
          <a href="#company">Company</a>
        </div>
        <div className="marketing-actions">
          <button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="text-button" onClick={onPlatform}>Sign in</button>
          <button className="light-button" onClick={onQuote}>Request a demo <ArrowRight size={15} /></button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className="eyebrow"><i /> The operating system for construction</div>
        <h1>Build with clarity.<br /><span>Deliver with confidence.</span></h1>
        <p>
          One calm workspace for projects, people, budgets and clients.
          Constructa replaces scattered spreadsheets with a single source of truth.
        </p>
        <div className="hero-actions">
          <button className="light-button large" onClick={onPlatform}>Explore the platform <ArrowRight size={17} /></button>
          <button className="ghost-button large" onClick={onQuote}>Book a private demo</button>
        </div>
        <div className="trusted-row">
          <span>Trusted on 240+ active sites</span>
          <i />
          <span>€1.8B managed value</span>
          <i />
          <span>99.99% uptime</span>
        </div>

        <div className="product-stage" id="platform">
          <div className="stage-toolbar">
            <div><span /><span /><span /></div>
            <p><ShieldCheck size={13} /> app.constructa.build</p>
            <button><MoreHorizontal size={16} /></button>
          </div>
          <div className="stage-body">
            <div className="mini-sidebar">
              <Logo compact />
              {[LayoutDashboard, Building2, CalendarDays, ClipboardCheck, WalletCards, Users].map((Icon, index) => (
                <button className={index === 0 ? "active" : ""} key={index}><Icon size={17} /></button>
              ))}
            </div>
            <div className="stage-content">
              <div className="stage-heading">
                <div><small>MONDAY, 27 JULY</small><h2>Good morning, Arbër.</h2></div>
                <button><Plus size={14} /> New project</button>
              </div>
              <div className="stage-metrics">
                <article><span><Building2 size={15} /></span><small>ACTIVE PROJECTS</small><b>14</b><em>+2 this month</em></article>
                <article><span><TrendingUp size={15} /></span><small>PORTFOLIO VALUE</small><b>€24.8M</b><em>↑ 8.2%</em></article>
                <article><span><Users size={15} /></span><small>TEAM ON SITE</small><b>86</b><em>92% capacity</em></article>
                <article><span><ClipboardCheck size={15} /></span><small>OPEN TASKS</small><b>128</b><em>12 due today</em></article>
              </div>
              <div className="stage-grid">
                <article className="stage-projects">
                  <div className="card-title"><span><b>Project performance</b><small>Live portfolio overview</small></span><MoreHorizontal size={16} /></div>
                  {projectData.slice(0, 3).map((project) => (
                    <div className="stage-project" key={project.name}>
                      <span className={`project-thumb ${project.tone}`}><Building2 size={16} /></span>
                      <span><b>{project.name}</b><small>{project.type}</small></span>
                      <span className="mini-progress"><i style={{ width: `${project.progress}%` }} /></span>
                      <strong>{project.progress}%</strong>
                    </div>
                  ))}
                </article>
                <article className="stage-chart">
                  <div className="card-title"><span><b>Budget health</b><small>Across all projects</small></span></div>
                  <Ring value={76} />
                  <div><span><i className="budget-dot committed" /> Committed <b>€18.4M</b></span><span><i className="budget-dot remaining" /> Remaining <b>€6.4M</b></span></div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="role-section" id="services">
        <div className="section-copy">
          <span className="section-kicker">One platform. Every stakeholder.</span>
          <h2>From the office to the jobsite.</h2>
          <p>Every person sees exactly what they need — without losing the full picture.</p>
        </div>
        <div className="role-grid">
          <button onClick={() => onRole("Admin")}><span><Command size={20} /></span><b>Company command</b><p>Revenue, resources, analytics and every active project.</p><em>Open admin workspace <ArrowRight size={15} /></em></button>
          <button onClick={() => onRole("Client")}><span><Building2 size={20} /></span><b>Client confidence</b><p>Progress, approvals, photos, contracts and invoices.</p><em>Open client portal <ArrowRight size={15} /></em></button>
          <button onClick={() => onRole("Employee")}><span><HardHat size={20} /></span><b>Field productivity</b><p>Daily tasks, time, equipment and safety in one tap.</p><em>Open employee portal <ArrowRight size={15} /></em></button>
        </div>
      </section>

      <section className="projects-showcase" id="projects">
        <div className="showcase-copy">
          <span className="section-kicker">Project intelligence</span>
          <h2>See the whole build.<br />Before it becomes a problem.</h2>
          <p>Live schedules, risk signals and budget forecasting turn site activity into decisions.</p>
          <ul>
            <li><Check size={15} /> One source of truth across every project</li>
            <li><Check size={15} /> Automatic progress and budget reporting</li>
            <li><Check size={15} /> Client approvals without email chains</li>
          </ul>
          <button className="light-button large" onClick={onPlatform}>Explore project control <ArrowRight size={16} /></button>
        </div>
        <div className="showcase-board">
          <div className="blueprint-grid" />
          <div className="floating-plan">
            <small>RIVERSIDE RESIDENCE · LEVEL 02</small>
            <div className="floor-plan">
              <span /><span /><span /><span /><span />
            </div>
            <div className="plan-status"><i /> Live site plan <b>18 updates</b></div>
          </div>
          <div className="floating-note"><span><CheckCircle2 size={17} /></span><p><b>Milestone completed</b><small>Structural framing · 2 min ago</small></p></div>
          <div className="floating-cost"><small>Budget variance</small><b>−1.8%</b><span>under forecast</span></div>
        </div>
      </section>

      <footer id="company">
        <Logo />
        <p>Construction, orchestrated.</p>
        <div><a href="#">Privacy</a><a href="#">Security</a><a href="#">Contact</a><span>© 2026 Constructa</span></div>
      </footer>

      {quote && <QuoteModal onClose={closeQuote} />}
    </main>
  );
}

function QuoteModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="quote-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={19} /></button>
        {sent ? (
          <div className="success-state">
            <span><Check size={28} /></span>
            <h2>Your private demo is requested.</h2>
            <p>Our construction technology team will reach out within one business day.</p>
            <button className="light-button large" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <span className="section-kicker">Request a private demo</span>
            <h2>Let’s modernize how you build.</h2>
            <p>Tell us a little about your company and we’ll tailor the walkthrough to your workflow.</p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div><label>Full name<input required placeholder="Your name" /></label><label>Work email<input required type="email" placeholder="name@company.com" /></label></div>
              <div><label>Company<input required placeholder="Company name" /></label><label>Team size<select defaultValue=""><option value="" disabled>Select size</option><option>1–25</option><option>26–100</option><option>101–500</option><option>500+</option></select></label></div>
              <label>What would you like to improve?<textarea placeholder="Project visibility, client communication, site operations…" /></label>
              <button className="light-button large" type="submit">Request demo <ArrowRight size={16} /></button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (view: Workspace) => void }) {
  return (
    <>
      <div className="welcome-row">
        <div><p>MONDAY, 27 JULY</p><h2>Good morning, Arbër.</h2><span>Here’s what’s moving across your company today.</span></div>
        <div><button className="secondary-button"><Download size={16} /> Export report</button><button className="primary-button" onClick={() => onNavigate("Projects")}><Plus size={16} /> New project</button></div>
      </div>

      <div className="metric-grid">
        <Metric icon={Building2} label="Active projects" value="14" change="+2 this month" />
        <Metric icon={CircleDollarSign} label="Portfolio value" value="€24.8M" change="↑ 8.2% vs last month" positive />
        <Metric icon={Users} label="Team on site" value="86" change="92% capacity" />
        <Metric icon={ClipboardCheck} label="Open tasks" value="128" change="12 due today" warning />
      </div>

      <div className="dashboard-grid">
        <article className="panel project-panel">
          <PanelHeader title="Project performance" subtitle="Live overview across active sites" action="View all" onAction={() => onNavigate("Projects")} />
          <div className="project-table">
            <div className="table-head"><span>Project</span><span>Progress</span><span>Budget</span><span>Due</span><span /></div>
            {projectData.map((project) => (
              <div className="project-row" key={project.name}>
                <span className="project-name"><i className={`project-thumb ${project.tone}`}><Building2 size={17} /></i><span><b>{project.name}</b><small>{project.type}</small></span></span>
                <span className="progress-cell"><span><i style={{ width: `${project.progress}%` }} /></span><b>{project.progress}%</b></span>
                <span><b>{project.budget}</b><small className={project.status === "At risk" ? "risk" : "track"}>{project.status}</small></span>
                <span><b>{project.due}</b><small>2026</small></span>
                <button className="icon-button"><MoreHorizontal size={17} /></button>
              </div>
            ))}
          </div>
        </article>

        <article className="panel budget-panel">
          <PanelHeader title="Budget health" subtitle="Total portfolio" />
          <div className="ring-wrap"><Ring value={76} /><span><b>€24.8M</b><small>total value</small></span></div>
          <div className="budget-legend">
            <span><i className="budget-dot committed" /><small>Committed</small><b>€18.4M</b></span>
            <span><i className="budget-dot remaining" /><small>Remaining</small><b>€6.4M</b></span>
            <span><i className="budget-dot invoiced" /><small>Invoiced</small><b>€14.1M</b></span>
          </div>
          <div className="budget-note"><TrendingUp size={16} /><p><b>3.2% under budget</b><small>Across all active projects</small></p></div>
        </article>

        <article className="panel schedule-panel">
          <PanelHeader title="Today’s schedule" subtitle="Monday, 27 July" action="Calendar" onAction={() => onNavigate("Schedule")} />
          <div className="timeline-list">
            {timeline.map((item, index) => (
              <div key={item.time}><time>{item.time}</time><span className="timeline-line"><i className={index === 0 ? "active" : ""} /></span><span className="timeline-icon"><item.icon size={16} /></span><p><b>{item.title}</b><small>{item.detail}</small></p></div>
            ))}
          </div>
        </article>

        <article className="panel activity-panel">
          <PanelHeader title="Live activity" subtitle="Across your organization" />
          <div className="activity-list">
            <ActivityItem initials="MK" title="Mara approved change order #28" detail="Riverside Residence · 3 min ago" />
            <ActivityItem initials="JB" title="Inspection report uploaded" detail="Nordhafen Offices · 18 min ago" />
            <ActivityItem initials="LS" title="Milestone marked complete" detail="Villa Eichenpark · 42 min ago" />
            <ActivityItem initials="TN" title="Budget forecast updated" detail="Kronen Quartier · 1 hr ago" />
          </div>
        </article>
      </div>
    </>
  );
}

function Metric({ icon: Icon, label, value, change, positive, warning }: { icon: LucideIcon; label: string; value: string; change: string; positive?: boolean; warning?: boolean }) {
  return <article className="metric-card"><div><span><Icon size={17} /></span><small>{label}</small><button><MoreHorizontal size={16} /></button></div><b>{value}</b><p className={positive ? "positive" : warning ? "warning" : ""}>{change}</p><i className="sparkline"><em /><em /><em /><em /><em /><em /><em /></i></article>;
}

function PanelHeader({ title, subtitle, action, onAction }: { title: string; subtitle: string; action?: string; onAction?: () => void }) {
  return <div className="panel-header"><span><b>{title}</b><small>{subtitle}</small></span>{action ? <button onClick={onAction}>{action} <ArrowRight size={14} /></button> : <button className="icon-button"><MoreHorizontal size={17} /></button>}</div>;
}

function ActivityItem({ initials, title, detail }: { initials: string; title: string; detail: string }) {
  return <div><span>{initials}</span><p><b>{title}</b><small>{detail}</small></p><button><ChevronRight size={15} /></button></div>;
}

function Projects() {
  const [filter, setFilter] = useState("All projects");
  const shown = filter === "All projects" ? projectData : projectData.filter((p) => filter === "At risk" ? p.status === "At risk" : p.status === "On track");
  return (
    <>
      <PageIntro title="Project portfolio" subtitle="Every site, milestone and risk in one portfolio." button="Create project" />
      <div className="filter-row">
        <div>{["All projects", "On track", "At risk"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <button className="secondary-button"><Gauge size={15} /> Portfolio health: 91%</button>
      </div>
      <div className="project-card-grid">
        {shown.map((project) => (
          <article className="portfolio-card" key={project.name}>
            <div className={`project-visual ${project.tone}`}><span>{project.type.split(" · ")[0]}</span><Building2 size={54} strokeWidth={1} /><em>{project.status}</em></div>
            <div className="portfolio-body">
              <div><h3>{project.name}</h3><button><MoreHorizontal size={17} /></button></div><p>{project.type}</p>
              <div className="portfolio-progress"><span><i style={{ width: `${project.progress}%` }} /></span><b>{project.progress}%</b></div>
              <div className="portfolio-meta"><span><small>Budget</small><b>{project.budget}</b></span><span><small>Handover</small><b>{project.due}</b></span></div>
              <div className="portfolio-footer"><AvatarStack people={project.team} /><button>Open project <ArrowRight size={14} /></button></div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Schedule() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <>
      <PageIntro title="Project schedule" subtitle="Coordinate milestones, crews and inspections." button="New event" />
      <article className="panel calendar-panel">
        <div className="calendar-toolbar"><div><button>‹</button><h3>July 2026</h3><button>›</button><span>Today</span></div><div><button className="active">Month</button><button>Week</button><button>Day</button></div></div>
        <div className="calendar-grid">{["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d => <b key={d}>{d}</b>)}{days.map((day, i) => <div key={i} className={day < 1 || day > 31 ? "muted" : day === 27 ? "today" : ""}><span>{day < 1 ? 30 + day : day > 31 ? day - 31 : day}</span>{day === 3 && <em className="event blue">Steel delivery</em>}{day === 8 && <em className="event sage">Client review</em>}{day === 14 && <em className="event amber">Inspection</em>}{day === 18 && <em className="event violet">Milestone</em>}{day === 27 && <><em className="event blue">Site coordination</em><em className="event amber">Concrete inspection</em></>}</div>)}</div>
      </article>
    </>
  );
}

function Tasks() {
  const columns = [
    { title: "To do", count: 5, tasks: [["Confirm glazing measurements","Riverside","LS","Today"],["Approve electrical layout","Nordhafen","MK","Tomorrow"],["Order oak flooring","Villa Eichenpark","AR","Jul 30"]] },
    { title: "In progress", count: 3, tasks: [["Level 2 concrete pour","Nordhafen","JB","Today"],["Install facade anchors","Riverside","TN","Jul 29"],["Safety signage update","Kronen Quartier","SW","Jul 31"]] },
    { title: "Review", count: 2, tasks: [["HVAC commissioning report","Villa Eichenpark","EK","Today"],["Change order #28","Riverside","MK","Today"]] },
    { title: "Complete", count: 18, tasks: [["Foundation waterproofing","Nordhafen","JB","Jul 25"],["Window sample approval","Riverside","LS","Jul 24"]] },
  ];
  return (
    <>
      <PageIntro title="Tasks" subtitle="Plan, assign and deliver the next critical action." button="Create task" />
      <div className="kanban">
        {columns.map((column, ci) => <section key={column.title}><header><span><i className={`kanban-dot k${ci}`} /><b>{column.title}</b><em>{column.count}</em></span><Plus size={16} /></header>{column.tasks.map(task => <article key={task[0]}><div><span className="task-priority" /><MoreHorizontal size={15} /></div><h4>{task[0]}</h4><p><Building2 size={13} /> {task[1]}</p><footer><span>{task[2]}</span><time><Clock3 size={12} /> {task[3]}</time></footer></article>)}</section>)}
      </div>
    </>
  );
}

function Financials() {
  return (
    <>
      <PageIntro title="Financial control" subtitle="Live profitability, cash flow and cost commitments." button="New invoice" />
      <div className="metric-grid finance-metrics">
        <Metric icon={CircleDollarSign} label="Contracted revenue" value="€24.8M" change="+8.2% year to date" positive />
        <Metric icon={TrendingUp} label="Gross margin" value="21.4%" change="+1.8% vs forecast" positive />
        <Metric icon={WalletCards} label="Outstanding" value="€1.26M" change="14 invoices" warning />
        <Metric icon={PackageCheck} label="Committed costs" value="€18.4M" change="74.2% of portfolio" />
      </div>
      <div className="finance-grid">
        <article className="panel revenue-chart"><PanelHeader title="Revenue & cost" subtitle="January — December 2026" /><div className="chart-legend"><span><i /> Revenue</span><span><i /> Cost</span></div><div className="bar-chart">{[42,55,48,72,64,80,76,88,82,94,86,98].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><em style={{height:`${h-19}%`}}/><small>{"JFMAMJJASOND"[i]}</small></div>)}</div></article>
        <article className="panel invoice-list"><PanelHeader title="Recent invoices" subtitle="Client receivables" action="View all" /><div className="invoice-head"><span>Invoice</span><span>Client</span><span>Amount</span><span>Status</span></div>{[["INV-2026-184","Südraum AG","€148,400","Paid"],["INV-2026-183","Nordhafen GmbH","€286,900","Due"],["INV-2026-182","Eichenpark KG","€92,600","Paid"],["INV-2026-181","Kronen Group","€318,200","Overdue"]].map(row=><div className="invoice-row" key={row[0]}>{row.map((v,i)=><span key={v} className={i===3?v.toLowerCase():""}>{v}</span>)}</div>)}</article>
      </div>
    </>
  );
}

function Team() {
  const people = [
    ["Mara Klein","Project Director","MK","Riverside Residence","On site"],
    ["Jonas Becker","Site Manager","JB","Nordhafen Offices","On site"],
    ["Lena Schmidt","Architect","LS","Riverside Residence","Remote"],
    ["Tim Neumann","Site Engineer","TN","Kronen Quartier","On site"],
    ["Elena König","Project Manager","EK","Villa Eichenpark","Available"],
    ["Amir Rahmani","Cost Manager","AR","Portfolio","Office"],
  ];
  return (
    <>
      <PageIntro title="People & capacity" subtitle="The right people on the right projects." button="Add employee" />
      <div className="team-summary"><span><b>112</b><small>Total employees</small></span><span><b>86</b><small>On site today</small></span><span><b>92%</b><small>Capacity allocated</small></span><span><b>4</b><small>Open positions</small></span></div>
      <article className="panel people-table"><div className="people-head"><span>Employee</span><span>Role</span><span>Current allocation</span><span>Status</span><span /></div>{people.map(p=><div className="people-row" key={p[0]}><span><i>{p[2]}</i><b>{p[0]}</b></span><span>{p[1]}</span><span>{p[3]}</span><span><em className={p[4].toLowerCase().replace(" ","-")}>{p[4]}</em></span><button><MoreHorizontal size={17}/></button></div>)}</article>
    </>
  );
}

function Documents() {
  const docs = [["General Contract — Riverside","Contract","PDF","2.4 MB","Today"],["Structural Inspection 07/24","Report","PDF","8.1 MB","Jul 24"],["Level 02 — Architectural Set","Drawing","DWG","32.8 MB","Jul 22"],["Change Order #28","Change order","PDF","1.2 MB","Jul 21"],["Fire Safety Documentation","Safety","ZIP","18.6 MB","Jul 19"]];
  return (
    <>
      <PageIntro title="Document control" subtitle="Current, approved and accessible from every site." button="Upload document" buttonIcon={Upload} />
      <div className="document-folders">{["Contracts","Drawings","Reports","Invoices"].map((f,i)=><article key={f}><span><FolderOpen size={22}/></span><div><b>{f}</b><small>{[28,184,92,46][i]} files</small></div><MoreHorizontal size={16}/></article>)}</div>
      <article className="panel doc-table"><div className="doc-head"><span>Name</span><span>Type</span><span>Size</span><span>Updated</span><span /></div>{docs.map(doc=><div className="doc-row" key={doc[0]}><span><i><FileText size={17}/></i><b>{doc[0]}</b></span><span>{doc[1]}</span><span>{doc[3]}</span><span>{doc[4]}</span><button><Download size={16}/></button></div>)}</article>
    </>
  );
}

function Safety() {
  return (
    <>
      <PageIntro title="Safety & compliance" subtitle="Make every person, document and inspection accountable." button="New inspection" />
      <div className="safety-hero"><div><span><ShieldCheck size={25}/></span><p><small>COMPANY SAFETY SCORE</small><b>96.4</b><em>Excellent performance</em></p></div><div className="safety-bars"><span><small>Inspections passed</small><i><em style={{width:"94%"}}/></i><b>94%</b></span><span><small>Training current</small><i><em style={{width:"98%"}}/></i><b>98%</b></span><span><small>Documents valid</small><i><em style={{width:"97%"}}/></i><b>97%</b></span></div></div>
      <div className="safety-grid"><article className="panel"><PanelHeader title="Upcoming inspections" subtitle="Next 14 days" />{timeline.slice(0,3).map((t,i)=><div className="safety-item" key={t.title}><span>{28+i*3}<small>{i?"AUG":"JUL"}</small></span><p><b>{["Scaffolding inspection","Electrical safety audit","Monthly site review"][i]}</b><small>{projectData[i].name}</small></p><em>{i?"Scheduled":"Tomorrow"}</em></div>)}</article><article className="panel compliance-list"><PanelHeader title="Compliance actions" subtitle="Requires attention" /><p><span><FileCheck2 size={17}/></span><b>3 certificates expiring</b><small>Within the next 30 days</small><ChevronRight size={16}/></p><p><span><HardHat size={17}/></span><b>5 training renewals</b><small>Two employees overdue</small><ChevronRight size={16}/></p><p><span><Activity size={17}/></span><b>1 open incident review</b><small>Low severity · Nordhafen</small><ChevronRight size={16}/></p></article></div>
    </>
  );
}

function ClientPortal() {
  const [approved, setApproved] = useState(false);
  return (
    <div className="portal-wrap">
      <div className="portal-welcome"><div><span>RIVERSIDE RESIDENCE</span><h2>Welcome back, Sophie.</h2><p>Your home is taking shape. Here’s the latest from the site.</p></div><div className="weather-card"><CloudSun size={31}/><span><b>24°C</b><small>Clear · Stuttgart</small></span></div></div>
      <div className="client-progress panel"><div><span><small>OVERALL PROGRESS</small><b>68%</b><p>Construction is on track for handover in October.</p></span><Ring value={68}/></div><div className="milestone-track"><i className="done"/><i className="done"/><i className="done"/><i className="active"/><i/><span>Design<em>Complete</em></span><span>Structure<em>Complete</em></span><span>Envelope<em>Complete</em></span><span>Interiors<em>In progress</em></span><span>Handover<em>Oct 2026</em></span></div></div>
      <div className="client-grid">
        <article className="panel client-update"><PanelHeader title="Latest from site" subtitle="Updated 2 hours ago" /><div className="site-photo"><Building2 size={64}/><span>LEVEL 02 · SOUTH ELEVATION</span></div><h3>Facade installation is underway</h3><p>The first set of natural stone panels is now installed on the south elevation. Interior services are progressing on schedule.</p><button>View 24 new photos <ArrowRight size={14}/></button></article>
        <article className="panel approval-card"><span className="approval-icon"><ClipboardCheck size={22}/></span><small>YOUR APPROVAL NEEDED</small><h3>Kitchen stone selection</h3><p>Please approve the Calacatta finish for the kitchen island before 30 July.</p><div className="material-swatch"><i/><span><b>Calacatta Oro</b><small>Honed natural stone</small></span></div><button className={approved?"approved":""} onClick={()=>setApproved(!approved)}>{approved?<><Check size={16}/> Approved</>:<>Review & approve <ArrowRight size={14}/></>}</button></article>
        <article className="panel quick-links"><PanelHeader title="Project access" subtitle="Everything in one place" /><div>{[[FileCheck2,"Contracts","4 documents"],[WalletCards,"Invoices","2 outstanding"],[FolderOpen,"Documents","48 files"],[MessageSquareText,"Messages","3 unread"]].map(([Icon,title,sub])=><button key={String(title)}><span><Icon size={18}/></span><p><b>{String(title)}</b><small>{String(sub)}</small></p><ChevronRight size={15}/></button>)}</div></article>
      </div>
    </div>
  );
}

function EmployeePortal() {
  const [clocked, setClocked] = useState(false);
  return (
    <div className="employee-wrap">
      <div className="employee-hero"><div><p>MONDAY, 27 JULY · RIVERSIDE RESIDENCE</p><h2>Ready for today, Jonas?</h2><span>Your shift starts at 07:00 · Site weather is clear, 24°C</span></div><button className={clocked?"clocked":""} onClick={()=>setClocked(!clocked)}><span><Clock3 size={20}/></span><p><small>{clocked?"SHIFT ACTIVE":"TODAY'S SHIFT"}</small><b>{clocked?"Clock out":"Clock in"}</b></p><em>{clocked?"06:42 elapsed":"07:00 — 16:00"}</em></button></div>
      <div className="employee-grid">
        <article className="panel daily-tasks"><PanelHeader title="Today’s tasks" subtitle="3 assigned · 1 complete" />{[["Inspect facade anchors","Zone C · Level 02","High",false],["Coordinate window delivery","Loading bay · 10:30","Normal",false],["Morning safety walk","Entire site","Complete",true]].map(([title,sub,priority,done])=><div className={done?"done":""} key={String(title)}><button><Check size={14}/></button><p><b>{String(title)}</b><small>{String(sub)}</small></p><em className={String(priority).toLowerCase()}>{String(priority)}</em><ChevronRight size={15}/></div>)}</article>
        <article className="panel site-brief"><PanelHeader title="Site briefing" subtitle="Updated 06:40" /><div className="brief-weather"><CloudSun size={31}/><span><b>24°C · Clear</b><small>Low wind · Good crane conditions</small></span></div><p><ShieldCheck size={17}/><span><b>Safety focus</b><small>Keep east access route clear for deliveries.</small></span></p><p><PackageCheck size={17}/><span><b>Deliveries</b><small>Windows 10:30 · Stone panels 13:00</small></span></p></article>
        <article className="panel employee-actions"><PanelHeader title="Quick actions" subtitle="Field tools" /><div>{[[Upload,"Upload site photo"],[PackageCheck,"Report equipment"],[ShieldCheck,"Safety document"],[CalendarDays,"Request leave"]].map(([Icon,label])=><button key={String(label)}><Icon size={19}/><span>{String(label)}</span><ChevronRight size={14}/></button>)}</div></article>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <>
      <PageIntro title="Company settings" subtitle="Configure your workspace, access and preferences." />
      <div className="settings-layout"><aside>{["Company profile","Workspace","Roles & permissions","Notifications","Integrations","Billing"].map((s,i)=><button className={i===0?"active":""} key={s}>{s}</button>)}</aside><article className="panel settings-form"><div><h3>Company profile</h3><p>Update the details shown across your workspace and client portals.</p></div><div className="logo-upload"><span>AC</span><button>Change logo</button><small>PNG, JPG or SVG · Max 2 MB</small></div><form><div><label>Company name<input defaultValue="Axiom Construction GmbH"/></label><label>Company ID<input defaultValue="HRB 728194"/></label></div><label>Business address<input defaultValue="Königstraße 44, 70173 Stuttgart, Germany"/></label><div><label>Phone<input defaultValue="+49 711 480 2290"/></label><label>Company email<input defaultValue="office@axiom-bau.de"/></label></div><button className="primary-button" type="button">Save changes</button></form></article></div>
    </>
  );
}

function PageIntro({ title, subtitle, button, buttonIcon: ButtonIcon = Plus }: { title: string; subtitle: string; button?: string; buttonIcon?: LucideIcon }) {
  return <div className="page-intro"><div><h2>{title}</h2><p>{subtitle}</p></div>{button&&<button className="primary-button"><ButtonIcon size={16}/>{button}</button>}</div>;
}
