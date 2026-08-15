/**
 * Console Ledger page: infrastructure editorial layout, calm dark enterprise surfaces, Signal Cyan accents.
 */
import { useEffect, useState } from "react";
import {
  ArrowDownRight, ArrowUpRight, Award, BookOpen, Check, ChevronRight, Cloud, Command,
  Download, ExternalLink, FileText, Github, Linkedin, Mail, Menu, Moon, Network, Phone,
  ServerCog, Sun, TerminalSquare, X, Zap,
} from "lucide-react";
import PortfolioTerminal from "@/components/PortfolioTerminal";

const profileImage = "/manus-storage/ahmed-azab-profile-identity-crop_e8cfdedc.jpg";
const cvUrl = "/manus-storage/ahmed-azab-cv_1bca25d1.pdf";

type Certificate = { title: string; issuer: string; date: string; url: string; category: string };

const certificates: Certificate[] = [
  { title: "Introduction to DevOps", issuer: "IBM · Coursera", date: "Feb 2025", category: "DevOps", url: "/manus-storage/certificate-networking-basics_052df7cc.pdf" },
  { title: "Introduction to Cloud Computing", issuer: "IBM · Coursera", date: "Jun 2025", category: "Cloud", url: "/manus-storage/certificate-it-support_7391d5ef.pdf" },
  { title: "Linux Server Management and Security", issuer: "University of Colorado System · Coursera", date: "Nov 2025", category: "Linux", url: "/manus-storage/certificate-linux-command-line_6fd751e3.pdf" },
  { title: "Introduction to Agile Development and Scrum", issuer: "IBM · Coursera", date: "Nov 2025", category: "Process", url: "/manus-storage/certificate-agile-scrum_bd13222a.pdf" },
];

const skills = [
  {
    icon: ServerCog, number: "01", title: "Operating systems",
    detail: "Linux administration with a hands-on focus on Red Hat / AlmaLinux environments.",
    items: ["Linux", "AlmaLinux", "Ubuntu", "Package Management"], status: "Working with",
  },
  {
    icon: Network, number: "02", title: "Networking",
    detail: "A strong CCNA curriculum foundation, expanded through Packet Tracer configuration practice.",
    items: ["TCP/IP + OSI", "VLANs + VLSM", "Routing + ACLs", "DHCP + DNS"], status: "Building",
  },
  {
    icon: TerminalSquare, number: "03", title: "System administration",
    detail: "Core administration practices for permissions, users, services, storage, and secure access.",
    items: ["SSH", "Users + Groups", "Permissions", "System Services"], status: "Working with",
  },
  {
    icon: Command, number: "04", title: "Tooling",
    detail: "Tools that support repeatable labs, virtualization, troubleshooting, and future automation.",
    items: ["VMware", "Bash", "Git", "Cisco Packet Tracer"], status: "Learning",
  },
];

const learning = [
  { title: "Linux administration", note: "Hands-on labs across permissions, services, and management", width: "88%", tag: "Working with" },
  { title: "Networking / CCNA", note: "Curriculum complete; practicing configurations and troubleshooting", width: "76%", tag: "Building" },
  { title: "Virtualization + availability", note: "VMware environments, redundancy and Veeam fundamentals", width: "53%", tag: "Exploring" },
  { title: "Automation with Bash", note: "Building the scripting foundation for repeatable operations", width: "42%", tag: "Learning" },
];

const navItems = [
  ["About", "#about"], ["Skills", "#skills"], ["Journey", "#journey"], ["Certifications", "#certifications"], ["Labs", "#labs"], ["Contact", "#contact"],
];

function ScrollLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return <a href={href} onClick={onClick}>{label}</a>;
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    const openPalette = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setActiveCertificate(null);
      }
    };
    window.addEventListener("keydown", openPalette);
    return () => window.removeEventListener("keydown", openPalette);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`portfolio-site ${dark ? "theme-dark" : "theme-light"}`}>
      <div className="site-grain" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ahmed Azab home">
          <img src="/manus-storage/ahmed-azab-terminal-mark_c7bb0232.png" alt="" />
          <span>Ahmed <b>Azab</b></span>
        </a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
          {navItems.map(([label, href]) => <ScrollLink key={href} label={label} href={href} onClick={closeMenu} />)}
          <a className="nav-cv" href={cvUrl} target="_blank" rel="noreferrer"><Download size={13} /> CV</a>
        </nav>
        <div className="header-actions">
          <button className="shortcut-button" onClick={() => setCommandOpen(true)} aria-label="Open quick navigation"><Command size={15} /><span>⌘K</span></button>
          <button className="theme-switch" onClick={() => setDark((value) => !value)} aria-label="Toggle light and dark mode">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <img className="hero-visual" src="/manus-storage/ahmed-azab-hero-infrastructure_238b99c6.jpg" alt="Abstract infrastructure signal network" />
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-kicker"><span className="status-dot" /> Available for internship opportunities</div>
            <p className="system-label">01 / SYSTEM IDENTITY</p>
            <h1>Building reliable<br /><i>foundations</i>, one<br />system at a time.</h1>
            <p className="hero-copy">I’m <strong>Ahmed Azab</strong>, a Network Engineering student building hands-on capability in Linux, networking, and systems administration.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#journey">Explore my direction <ArrowDownRight size={18} /></a>
              <a className="button button-quiet" href={cvUrl} target="_blank" rel="noreferrer"><Download size={16} /> Download CV</a>
            </div>
            <div className="hero-meta">
              <span><b>BASE</b> Cairo, Egypt</span>
              <span><b>FOCUS</b> Linux + Infrastructure</span>
            </div>
          </div>
          <div className="hero-terminal-wrap"><PortfolioTerminal /></div>
          <div className="hero-line" aria-hidden="true"><span /><i /></div>
        </section>

        <section id="about" className="about section-shell section-anchored">
          <div className="section-rail" aria-hidden="true"><span>01</span><i /></div>
          <div className="about-photo-wrap reveal-up">
            <div className="photo-topline"><span>PROFILE / 2026</span><span className="photo-live"><i /> ONLINE</span></div>
            <img src={profileImage} alt="Ahmed Azab in a professional suit" />
            <div className="photo-stamp"><span>AA</span><em>NETWORK<br />ENGINEERING</em></div>
          </div>
          <div className="about-copy reveal-up delay-one">
            <p className="system-label">02 / ABOUT ME</p>
            <h2>Curious about the systems that make <i>everything else work.</i></h2>
            <p className="lead">I’m a third-year Information Technology / Software Engineering student at New Cairo Technological University, specializing in Networks.</p>
            <p>My goal is to grow into a capable System Administrator by pairing structured study with practical Linux, networking, virtualization, and infrastructure work. I care about reliable systems, clear documentation, and always learning the “why” behind the configuration.</p>
            <div className="fact-grid">
              <div><b>03<sup>rd</sup></b><span>Year · Networks Major</span></div>
              <div><b>2026</b><span>Building for internship</span></div>
              <div><b>∞</b><span>Learning mindset</span></div>
            </div>
            <a className="inline-link" href="#contact">More than a resume <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section id="skills" className="skills section-shell section-anchored">
          <div className="skills-header">
            <div><p className="system-label">03 / TECHNICAL STACK</p><h2>Capabilities, <i>with context.</i></h2></div>
            <p>I show the tools I’m actively using and learning—not a list of labels without the work behind them.</p>
          </div>
          <div className="skill-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return <article className={`skill-card reveal-up delay-${index + 1}`} key={skill.title}>
                <div className="skill-card-top"><span>{skill.number}</span><Icon size={23} /></div>
                <h3>{skill.title}</h3>
                <p>{skill.detail}</p>
                <ul>{skill.items.map((item) => <li key={item}><Check size={14} /> {item}</li>)}</ul>
                <div className="skill-status"><span>{skill.status}</span><i /></div>
              </article>;
            })}
          </div>
        </section>

        <section className="learning section-shell section-anchored">
          <div className="learning-side">
            <p className="system-label">04 / CURRENTLY LEARNING</p>
            <h2>Progress is a <i>practice.</i></h2>
            <p>These indicators reflect what I’m actively working with today. They’re signals of my current focus, not claims of mastery.</p>
            <div className="learning-note"><Zap size={15} /><span>Current target: turn study into reliable, repeatable lab work.</span></div>
          </div>
          <div className="learning-list">
            {learning.map((item, index) => <div className="learning-item" key={item.title}>
              <div className="learning-index">0{index + 1}</div>
              <div className="learning-info"><div><h3>{item.title}</h3><span>{item.tag}</span></div><p>{item.note}</p><div className="meter"><i style={{ width: item.width }} /></div></div>
            </div>)}
          </div>
        </section>

        <section className="mindset section-shell section-anchored">
          <div className="mindset-visual" aria-hidden="true">
            <div className="mindset-orbit orbit-a" /><div className="mindset-orbit orbit-b" />
            <div className="mindset-core"><ServerCog size={31} /><span>OPERATE<br />WITH CARE</span></div>
            <span className="node node-a" /><span className="node node-b" /><span className="node node-c" /><span className="node node-d" />
          </div>
          <div className="mindset-copy">
            <p className="system-label">05 / SYSTEMS MINDSET</p>
            <h2>Technology works better when the <i>whole system</i> is understood.</h2>
            <div className="principles"><span><b>01</b> Reliability first</span><span><b>02</b> Troubleshoot methodically</span><span><b>03</b> Document the process</span><span><b>04</b> Automate the repeatable</span></div>
          </div>
        </section>

        <section id="journey" className="journey section-shell section-anchored">
          <div className="journey-image"><img src="/manus-storage/ahmed-azab-systems-map_3844fd7a.jpg" alt="Abstract systems map showing connected infrastructure" /><div className="journey-image-caption">PATH / INFRASTRUCTURE</div></div>
          <div className="journey-content">
            <p className="system-label">06 / MY DIRECTION</p>
            <h2>One path,<br /><i>built in layers.</i></h2>
            <div className="journey-steps">
              <div className="journey-step is-current"><span>NOW</span><b>Network Engineering</b><p>Building a practical base in systems and networking.</p></div>
              <ChevronRight className="journey-arrow" size={19} />
              <div className="journey-step"><span>BUILDING</span><b>Linux + SysAdmin</b><p>Growing confident with servers, services, and operations.</p></div>
              <ChevronRight className="journey-arrow" size={19} />
              <div className="journey-step"><span>NEXT</span><b>Infrastructure + Cloud</b><p>Learning how connected systems scale and recover.</p></div>
              <ChevronRight className="journey-arrow" size={19} />
              <div className="journey-step"><span>DIRECTION</span><b>DevOps</b><p>Bringing automation and systems thinking together.</p></div>
            </div>
            <div className="journey-goal"><Cloud size={22} /><p><span>LONG-TERM TARGET</span> Become a strong Mid-Level System Administrator with a thoughtful path into DevOps.</p></div>
          </div>
        </section>

        <section id="certifications" className="certifications section-shell section-anchored">
          <div className="cert-header"><div><p className="system-label">07 / CERTIFICATIONS & LEARNING</p><h2>Verified learning,<br /><i>kept in the record.</i></h2></div><div className="cert-count"><Award size={23} /><span><b>04</b> verified certificates</span></div></div>
          <div className="cert-list">
            {certificates.map((certificate, index) => <button className="certificate-row" key={certificate.title} onClick={() => setActiveCertificate(certificate)}>
              <span className="certificate-number">0{index + 1}</span><span className="certificate-category">{certificate.category}</span><span className="certificate-title"><b>{certificate.title}</b><small>{certificate.issuer}</small></span><span className="certificate-date">{certificate.date}</span><span className="certificate-open">View <ExternalLink size={15} /></span>
            </button>)}
          </div>
          <p className="cert-footnote"><FileText size={15} /> Select a record to open its original certificate.</p>
        </section>

        <section id="labs" className="labs section-shell section-anchored">
          <img src="/manus-storage/ahmed-azab-labs-ambient_bede3e73.jpg" alt="Abstract technical documentation and network connections" />
          <div className="labs-overlay" />
          <div className="labs-content"><p className="system-label">08 / LABS & HANDS-ON</p><h2>The next entries are<br /><i>being written now.</i></h2><p>Practical labs are the next stage of this portfolio. This space is ready for Linux server, network infrastructure, automation, and DevOps work as it becomes part of the record.</p><div className="coming-soon"><span>QUEUE STATUS</span><b><i /> Lab documentation coming soon</b></div></div>
        </section>

        <section id="contact" className="contact section-shell section-anchored">
          <div className="contact-heading"><p className="system-label">09 / OPEN A CONNECTION</p><h2>Let’s talk<br /><i>infrastructure.</i></h2><p>Whether you’re discussing an internship, a learning opportunity, or systems work, I’d be happy to connect.</p><a className="button button-primary" href="mailto:azab95320@gmail.com">Start a conversation <ArrowUpRight size={18} /></a></div>
          <div className="contact-links">
            <a href="mailto:azab95320@gmail.com"><Mail size={19} /><span><small>EMAIL</small><b>azab95320@gmail.com</b></span><ArrowUpRight size={18} /></a>
            <a href="https://github.com/Ahmed-Azab20" target="_blank" rel="noreferrer"><Github size={19} /><span><small>GITHUB</small><b>Ahmed-Azab20</b></span><ArrowUpRight size={18} /></a>
            <a href="https://www.linkedin.com/in/ahmed-azab-it" target="_blank" rel="noreferrer"><Linkedin size={19} /><span><small>LINKEDIN</small><b>ahmed-azab-it</b></span><ArrowUpRight size={18} /></a>
            <a href="tel:+201029564641"><Phone size={19} /><span><small>PHONE</small><b>+20 102 956 4641</b></span><ArrowUpRight size={18} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell"><a className="brand" href="#top"><img src="/manus-storage/ahmed-azab-terminal-mark_c7bb0232.png" alt="" /><span>Ahmed <b>Azab</b></span></a><p>Linux · Networking · Infrastructure · DevOps</p><span>© 2026 Ahmed Azab</span></footer>

      {commandOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setCommandOpen(false)}><div className="command-palette" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={(event) => event.stopPropagation()}><div className="palette-top"><Command size={18} /><span>Jump to a section or connection</span><kbd>ESC</kbd></div>{navItems.map(([label, href], index) => <a key={href} href={href} onClick={() => setCommandOpen(false)}><span><i>{String(index + 1).padStart(2, "0")}</i>{label}</span><ChevronRight size={16} /></a>)}<a href="https://github.com/Ahmed-Azab20" target="_blank" rel="noreferrer"><span><i>GH</i>GitHub</span><ExternalLink size={16} /></a></div></div>}
      {activeCertificate && <div className="modal-backdrop certificate-modal-backdrop" role="presentation" onMouseDown={() => setActiveCertificate(null)}><div className="certificate-modal" role="dialog" aria-modal="true" aria-label={`Certificate: ${activeCertificate.title}`} onMouseDown={(event) => event.stopPropagation()}><div className="certificate-modal-head"><div><span>{activeCertificate.category}</span><h3>{activeCertificate.title}</h3><p>{activeCertificate.issuer} · {activeCertificate.date}</p></div><div><a href={activeCertificate.url} target="_blank" rel="noreferrer" aria-label="Open certificate in new tab"><ExternalLink size={17} /></a><button onClick={() => setActiveCertificate(null)} aria-label="Close certificate preview"><X size={19} /></button></div></div><iframe src={activeCertificate.url} title={activeCertificate.title} /></div></div>}
    </div>
  );
}
