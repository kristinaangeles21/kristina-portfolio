import { createElement, type FormEvent, type ReactNode, useEffect, useState } from "react";

type Page = "home" | "about" | "skills" | "projects" | "project" | "contact";
type IconName =
  | "arrow"
  | "bootstrap"
  | "browser"
  | "check"
  | "chevron"
  | "code"
  | "css"
  | "design"
  | "email"
  | "form"
  | "html"
  | "layout"
  | "menu"
  | "navigation"
  | "php"
  | "phone"
  | "spark"
  | "user"
  | "x";

type Project = {
  id: string;
  title: string;
  category: "Current Student Project" | "Previous Student Project";
  description: string;
  detailedDescription: string;
  purpose: string;
  features: string[];
  technologies: string[];
  role: string;
  contribution?: string;
  status: string;
  type: "portfolio" | "vet" | "pos";
  conceptual: boolean;
};

const projects: Project[] = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Current Student Project",
    description: "A personal website created to showcase my background, education, skills, and student projects.",
    detailedDescription:
      "This portfolio website was created as part of my web authoring activities. It brings together my personal information, educational background, skills, and projects in a simple and organized website. The project also helped me practice website design, navigation, and responsive layouts.",
    purpose: "To create an online portfolio and practice web authoring and design.",
    features: [
      "Home and About pages",
      "Skills section",
      "Project showcase",
      "Project Details pages",
      "Contact page",
      "Responsive layout",
      "Navigation between pages",
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "CSS"],
    role: "Student Web Developer and Designer",
    contribution:
      "I planned and designed my personal portfolio website using Figma, then worked on developing and customizing it using web development tools. I organized the website content, added my personal information and projects, and worked on improving the design and navigation with assistance from AI tools.",
    status: "Current Student Project",
    type: "portfolio",
    conceptual: false,
  },
  {
    id: "vet-appointment-tracker",
    title: "Vet Appointment and Patient Tracker",
    category: "Previous Student Project",
    description: "A simple veterinary appointment and patient tracking system for veterinarians and pet owners.",
    detailedDescription:
      "This was a student project designed to help veterinarians and pet owners organize animal information and appointments. Pet owners could book appointments and keep track of their animal's history, while veterinarians could view scheduled appointments and monitor patient records.",
    purpose: "To provide a simple way of organizing veterinary appointments and animal patient information.",
    features: [
      "Animal information records",
      "Animal history tracking",
      "Appointment booking for pet owners",
      "Appointment monitoring for veterinarians",
      "Viewing patient information",
    ],
    technologies: ["HTML", "CSS (through Bootstrap)", "Bootstrap", "PHP"],
    role: "Group Programmer",
    contribution:
      "I served as a programmer in our group, helping develop the veterinary appointment and patient tracking system. I worked on implementing the system's basic functionality using HTML, Bootstrap, and PHP.",
    status: "Previous Student Project — Original Files Unavailable",
    type: "vet",
    conceptual: true,
  },
  {
    id: "restaurant-pos-system",
    title: "Restaurant POS System",
    category: "Previous Student Project",
    description: "A basic point-of-sale system developed for a small restaurant.",
    detailedDescription:
      "This was a simple student project focused on creating a basic point-of-sale system for a small restaurant. It was designed to support basic restaurant transactions and demonstrate how a computerized POS interface could be used in a small business.",
    purpose: "To practice developing a simple system for restaurant transactions.",
    features: [
      "Basic restaurant point-of-sale interface",
      "Simple order and transaction workflow",
    ],
    technologies: ["Python", "HTML", "CSS", "JavaScript"],
    role: "Group Programmer",
    contribution:
      "I served as a programmer in our group, helping develop a basic restaurant point-of-sale system using Python, HTML, CSS, and JavaScript.",
    status: "Previous Student Project — Original Files Unavailable",
    type: "pos",
    conceptual: true,
  },
];

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Skills", page: "skills" },
  { label: "Projects", page: "projects" },
  { label: "Contact", page: "contact" },
];

const skillItems: { name: string; icon: IconName; note: string }[] = [
  { name: "HTML", icon: "html", note: "Page structure" },
  { name: "CSS", icon: "css", note: "Visual styling" },
  { name: "Bootstrap", icon: "bootstrap", note: "Responsive layouts" },
  { name: "Basic JavaScript", icon: "code", note: "Web interactions" },
  { name: "Basic PHP", icon: "php", note: "Server-side basics" },
  { name: "Web Forms", icon: "form", note: "Input experiences" },
  { name: "Page Navigation", icon: "navigation", note: "Connected pages" },
  { name: "UI Design", icon: "design", note: "Interface layouts" },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bootstrap: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M9 8v8h4.2a2.2 2.2 0 0 0 0-4.4H9h3.6a1.8 1.8 0 0 0 0-3.6Z" />
      </>
    ),
    browser: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8h18M7 6h.01M10 6h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    code: (
      <>
        <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
      </>
    ),
    css: (
      <>
        <path d="M5 3h14l-1.5 16L12 21l-5.5-2Z" />
        <path d="M8.5 8H16l-.5 7-3.5 1-3.5-1" />
      </>
    ),
    design: (
      <>
        <path d="M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a1.5 1.5 0 0 1 0-3h2a7 7 0 0 0 0-14Z" />
        <circle cx="7.5" cy="10.5" r=".75" fill="currentColor" stroke="none" />
        <circle cx="9.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
      </>
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    form: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </>
    ),
    html: (
      <>
        <path d="M5 3h14l-1.5 16L12 21l-5.5-2Z" />
        <path d="M8 8h8l-.5 7-3.5 1-3.5-1-.2-2" />
      </>
    ),
    layout: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M9 9v11" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    navigation: (
      <>
        <path d="M4 6h11a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H8" />
        <path d="m11 11-3 3 3 3" />
      </>
    ),
    php: (
      <>
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <path d="M6 15V9h3a2 2 0 0 1 0 4H6M13 15l1.5-6M14 12h3.5l-.7 3" />
      </>
    ),
    phone: (
      <path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-4.5-1-1 2.5a14 14 0 0 1-10-10L8 7.5Z" />
    ),
    spark: <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6ZM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6Z" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    x: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

function Heading({
  as = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
}) {
  return createElement(as, { className }, children);
}

function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  ariaCurrent,
  ariaExpanded,
  ariaControls,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "text";
  type?: "button" | "submit";
  className?: string;
  ariaCurrent?: "page";
  ariaExpanded?: boolean;
  ariaControls?: string;
}) {
  return (
    <button
      aria-controls={ariaControls}
      aria-current={ariaCurrent}
      aria-expanded={ariaExpanded}
      className={`button button--${variant} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

function Link({
  children,
  href,
  className = "",
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <a
      aria-label={ariaLabel}
      className={className}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function PageIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <Heading as="h1" className="page-title">
        {title}
      </Heading>
      <p className="page-subtitle">{subtitle}</p>
    </div>
  );
}

function ProfileArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`profile-art ${compact ? "profile-art--compact" : ""}`}>
      <div className="profile-art__figure">
        <img
          alt="Kristina Angeles — Profile Photo"
          className="profile-art__image"
          height="1448"
          src="/images/kristina-angeles-profile.jpg"
          width="1086"
        />
      </div>
      <div className="profile-art__label">
        <Icon name="user" size={17} />
        Profile photo
      </div>
    </div>
  );
}

function ProjectPreview({ project, large = false }: { project: Project; large?: boolean }) {
  const preview = {
    portfolio: {
      alt: "Screenshot of Kristina Angeles's Personal Portfolio home page",
      src: "/images/personal-portfolio.png",
    },
    vet: {
      alt: "Conceptual PawCare veterinary appointment and patient tracker dashboard mockup",
      src: "/images/vet-appointment.png",
    },
    pos: {
      alt: "Conceptual Carl's Cafe point-of-sale dashboard mockup",
      src: "/images/carls-cafe-pos.png",
    },
  }[project.type];

  return (
    <div
      className={`project-preview project-preview--${project.type} ${large ? "project-preview--large" : ""}`}
    >
      <img alt={preview.alt} className="project-preview__image" src={preview.src} />
      {project.conceptual && <span className="project-preview__badge">Conceptual mockup</span>}
    </div>
  );
}

function Header({
  page,
  navigate,
}: {
  page: Page;
  navigate: (page: Page) => void;
}) {
  const [open, setOpen] = useState(false);
  const activePage = page === "project" ? "projects" : page;

  const selectPage = (next: Page) => {
    setOpen(false);
    navigate(next);
  };

  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <Button className="brand" variant="text" onClick={() => selectPage("home")}>
          <span className="brand__mark">KA</span>
          <span className="brand__name">Kristina Angeles</span>
        </Button>
        <nav
          id="primary-navigation"
          className={`nav ${open ? "nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Button
              ariaCurrent={activePage === item.page ? "page" : undefined}
              className={activePage === item.page ? "nav__link nav__link--active" : "nav__link"}
              key={item.page}
              onClick={() => selectPage(item.page)}
              variant="text"
            >
              {item.label}
            </Button>
          ))}
        </nav>
        <Button
          ariaControls="primary-navigation"
          ariaExpanded={open}
          className="nav-toggle"
          onClick={() => setOpen((value) => !value)}
          variant="text"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <Icon name={open ? "x" : "menu"} size={24} />
        </Button>
      </div>
    </header>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <span className="brand__mark brand__mark--footer">KA</span>
          <div>
            <strong>Kristina Angeles</strong>
            <span>Web Authoring &amp; Design</span>
          </div>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          {navItems.map((item) => (
            <Button key={item.page} onClick={() => navigate(item.page)} variant="text">
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  const interests = [
    { icon: "browser" as IconName, title: "Web Design", text: "Creating clean and readable webpage designs." },
    { icon: "form" as IconName, title: "Web Forms", text: "Building practical and user-friendly input forms." },
    { icon: "layout" as IconName, title: "UI Layouts", text: "Exploring balanced and responsive interfaces." },
  ];

  return (
    <main>
      <section className="hero">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Hello, I&apos;m</span>
            <Heading as="h1" className="hero__title">
              Kristina <span>Angeles</span>
            </Heading>
            <p className="hero__subtitle">Web Authoring &amp; Design</p>
            <div className="student-label">
              <span />
              BS Information Systems Student
            </div>
            <p className="hero__text">
              I have some experience in web authoring through projects. I have worked on creating
              basic webpages and exploring different tools used in web development.
            </p>
            <p className="hero__text">
              I am still developing my skills and continue to learn through practice. I am open to
              training, guidance, and new opportunities that can help me improve and gain more
              practical experience.
            </p>
            <div className="button-row">
              <Button onClick={() => navigate("projects")}>
                View My Work <Icon name="arrow" size={18} />
              </Button>
              <Button onClick={() => navigate("contact")} variant="secondary">
                Contact Me
              </Button>
            </div>
          </div>
          <ProfileArtwork />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="about-preview">
            <div>
              <span className="eyebrow">A little about me</span>
              <Heading className="section-title">Learning by creating.</Heading>
            </div>
            <div>
              <p>
                I&apos;m an Information Systems student at Carlos Hilado Memorial State University,
                exploring how thoughtful design and web technologies come together.
              </p>
              <Button onClick={() => navigate("about")} variant="text" className="text-link">
                Read More <Icon name="arrow" size={17} />
              </Button>
            </div>
          </div>
          <div className="interest-grid">
            {interests.map((item, index) => (
              <article className="interest-card" key={item.title}>
                <span className="interest-card__number">0{index + 1}</span>
                <div className="icon-tile">
                  <Icon name={item.icon} size={24} />
                </div>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  const education = [
    {
      level: "Elementary",
      school: "Efigenio Enrica Lizares Memorial School I",
      detail: "Talisay City, Negros Occidental",
    },
    {
      level: "Secondary",
      school: "Rafael B. Lacson Memorial High School",
      detail: "Talisay City, Negros Occidental",
    },
    {
      level: "College",
      school: "Carlos Hilado Memorial State University",
      detail: "Bachelor of Science in Information Systems",
      date: "September 2023 – Present",
    },
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="shell">
          <PageIntro
            eyebrow="Get to know me"
            title="About Me"
            subtitle="My background, education, and growing interest in web authoring."
          />
        </div>
      </section>
      <section className="section section--first">
        <div className="shell about-grid">
          <ProfileArtwork compact />
          <div className="about-copy">
            <span className="eyebrow">Student profile</span>
            <Heading className="section-title">Building a foundation in technology and design.</Heading>
            <p>
              I am a Bachelor of Science in Information Systems student at Carlos Hilado Memorial
              State University. I have experience working on basic web authoring projects and
              exploring tools used in web development.
            </p>
            <p>I continue to improve my skills through learning and practice.</p>
            <div className="profile-facts">
              <div>
                <span>Course</span>
                <strong>BS Information Systems</strong>
              </div>
              <div>
                <span>School</span>
                <strong>Carlos Hilado Memorial State University</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--muted">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">My journey</span>
              <Heading className="section-title">Education</Heading>
            </div>
            <p>The schools that have shaped my learning journey.</p>
          </div>
          <div className="timeline">
            {education.map((item, index) => (
              <article className="timeline-card" key={item.level}>
                <span className="timeline-card__step">0{index + 1}</span>
                <div className="timeline-card__line" />
                <div>
                  <span className="timeline-card__level">{item.level}</span>
                  <Heading as="h3">{item.school}</Heading>
                  <p>{item.detail}</p>
                  {item.date && <time>{item.date}</time>}
                </div>
              </article>
            ))}
          </div>
          <div className="center-action">
            <Button onClick={() => navigate("skills")}>
              View My Skills <Icon name="arrow" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Skills({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main>
      <section className="page-hero">
        <div className="shell">
          <PageIntro
            eyebrow="Growing toolkit"
            title="My Skills"
            subtitle="Technologies and web authoring skills I am currently learning and practicing."
          />
        </div>
      </section>
      <section className="section section--first">
        <div className="shell">
          <div className="skills-grid">
            {skillItems.map((skill, index) => (
              <article className="skill-card" key={skill.name}>
                <span className="skill-card__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="skill-card__icon">
                  <Icon name={skill.icon} size={27} />
                </div>
                <div>
                  <Heading as="h3">{skill.name}</Heading>
                  <p>{skill.note}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="learning-note">
            <div className="icon-tile icon-tile--light">
              <Icon name="spark" size={23} />
            </div>
            <div>
              <Heading as="h3">Always learning</Heading>
              <p>Each skill grows through coursework, practice, and student projects.</p>
            </div>
            <Button onClick={() => navigate("projects")}>
              View My Projects <Icon name="arrow" size={18} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Projects({
  openProject,
}: {
  openProject: (project: Project) => void;
}) {
  return (
    <main>
      <section className="page-hero">
        <div className="shell">
          <PageIntro
            eyebrow="Practice in progress"
            title="My Projects"
            subtitle="Selected student projects and web authoring activities."
          />
        </div>
      </section>
      <section className="section section--first">
        <div className="shell">
          <div className="notice">
            <Icon name="spark" size={19} />
            <p>Selected work from current and previous student projects.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.id}>
                <ProjectPreview project={project} />
                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span>{project.category}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <Heading as="h3">{project.title}</Heading>
                  <p>{project.description}</p>
                  <div className="project-card__footer">
                    <span className="tag">
                      {project.technologies.length > 0
                        ? project.technologies.slice(0, 2).join(" · ")
                        : "Tools not specified"}
                    </span>
                    <Button
                      onClick={() => openProject(project)}
                      variant="secondary"
                      className="project-card__button"
                    >
                      View Project <Icon name="arrow" size={17} />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectDetails({
  project,
  navigate,
}: {
  project: Project;
  navigate: (page: Page) => void;
}) {
  return (
    <main>
      <section className="detail-hero">
        <div className="shell">
          <Button variant="text" className="back-link" onClick={() => navigate("projects")}>
            <Icon name="arrow" size={18} /> Back to Projects
          </Button>
          <div className="detail-heading">
            <div>
              <span className="eyebrow">{project.category}</span>
              <Heading as="h1" className="page-title">
                {project.title}
              </Heading>
            </div>
            <span className="detail-status">
              <i /> {project.status}
            </span>
          </div>
          <ProjectPreview project={project} large />
        </div>
      </section>
      <section className="section detail-content">
        <div className="shell detail-grid">
          <div className="detail-main">
            <div className="detail-section">
              <span className="detail-section__number">01</span>
              <div>
                <Heading as="h2">Project Description</Heading>
                <p>{project.detailedDescription}</p>
                {project.conceptual && (
                  <p className="concept-note">
                    The original project files are unavailable. This illustration is a conceptual mockup created to represent the project.
                  </p>
                )}
              </div>
            </div>
            <div className="detail-section">
              <span className="detail-section__number">02</span>
              <div>
                <Heading as="h2">Project Purpose</Heading>
                <p>{project.purpose}</p>
              </div>
            </div>
            <div className="detail-section">
              <span className="detail-section__number">03</span>
              <div>
                <Heading as="h2">Main Features</Heading>
                <ul className="detail-features">
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
              </div>
            </div>
            <div className="detail-section">
              <span className="detail-section__number">04</span>
              <div>
                <Heading as="h2">My Role / Contribution</Heading>
                {project.contribution ? (
                  <>
                    <p><strong>My Role:</strong> {project.role}</p>
                    <p><strong>My Contribution:</strong> {project.contribution}</p>
                  </>
                ) : (
                  <p>{project.role}</p>
                )}
              </div>
            </div>
          </div>
          <aside className="project-info">
            <Heading as="h2">Project Information</Heading>
            <dl>
              <div>
                <dt>Category</dt>
                <dd>{project.category}</dd>
              </div>
            </dl>
            <div className="project-info__tools">
              <span>Technologies / Tools Used</span>
              {project.technologies.length > 0 ? (
                <ul>
                  {project.technologies.map((technology) => <li className="tag" key={technology}>{technology}</li>)}
                </ul>
              ) : (
                <p>Not specified</p>
              )}
            </div>
          </aside>
        </div>
        <div className="shell detail-bottom">
          <Button onClick={() => navigate("projects")} variant="secondary">
            Back to Projects
          </Button>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  error?: string;
  onChange?: () => void;
}) {
  const id = `contact-${name}`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required
        type={type}
      />
      {error && (
        <span className="field__error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

type ContactField = "name" | "email" | "message";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});

  const clearError = (field: ContactField) => {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSubmitted(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const nameField = form.elements.namedItem("name") as HTMLInputElement;
    const emailField = form.elements.namedItem("email") as HTMLInputElement;
    const messageField = form.elements.namedItem("message") as HTMLTextAreaElement;
    const nextErrors: Partial<Record<ContactField, string>> = {};

    if (!nameField.value.trim()) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!emailField.value.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!emailField.validity.valid) {
      nextErrors.email = "Enter a valid email address, like name@example.com.";
    }
    if (!messageField.value.trim()) {
      nextErrors.message = "Please enter a message.";
    }

    setErrors(nextErrors);
    setSubmitted(false);

    const firstError = Object.keys(nextErrors)[0] as ContactField | undefined;
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement).focus();
      return;
    }

    setSubmitted(true);
  };

  return (
    <main>
      <section className="page-hero">
        <div className="shell">
          <PageIntro
            eyebrow="Let’s connect"
            title="Contact Me"
            subtitle="Feel free to reach out for questions, learning opportunities, or collaboration."
          />
        </div>
      </section>
      <section className="section section--first">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">Contact information</span>
            <Heading className="section-title">I&apos;d be glad to hear from you.</Heading>
            <p>
              Have a question or want to connect? You can reach me directly using the details below.
            </p>
            <div className="contact-list">
              <Link href="tel:+639703650456" className="contact-item">
                <span className="contact-item__icon">
                  <Icon name="phone" size={22} />
                </span>
                <span>
                  <small>Phone</small>
                  <strong>0970 365 0456</strong>
                </span>
                <Icon name="chevron" size={18} />
              </Link>
              <Link href="mailto:kristinaaangeles.chmsu@gmail.com" className="contact-item">
                <span className="contact-item__icon">
                  <Icon name="email" size={22} />
                </span>
                <span>
                  <small>Email</small>
                  <strong>kristinaaangeles.chmsu@gmail.com</strong>
                </span>
                <Icon name="chevron" size={18} />
              </Link>
            </div>
            <div className="school-note">
              <span>Currently studying at</span>
              <strong>Carlos Hilado Memorial State University</strong>
            </div>
          </div>
          <form className="contact-form" noValidate onSubmit={submit}>
            <div>
              <span className="eyebrow">Send a message</span>
              <Heading as="h2">Let&apos;s start a conversation.</Heading>
            </div>
            <Field
              error={errors.name}
              label="Full Name"
              name="name"
              onChange={() => clearError("name")}
              placeholder="Enter your full name"
            />
            <Field
              error={errors.email}
              label="Email Address"
              name="email"
              onChange={() => clearError("email")}
              placeholder="Enter your email address"
              type="email"
            />
            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                aria-invalid={Boolean(errors.message)}
                id="contact-message"
                name="message"
                onChange={() => clearError("message")}
                placeholder="Write your message here..."
                required
                rows={5}
              />
              {errors.message && (
                <span className="field__error" id="contact-message-error" role="alert">
                  {errors.message}
                </span>
              )}
            </div>
            <Button type="submit" className="submit-button">
              Send Message <Icon name="arrow" size={18} />
            </Button>
            <p aria-live="polite" className="form-note" role="status">
              {submitted
                ? "Thank you! This prototype does not send messages yet. Please use the email link to get in touch."
                : "Prototype form only — no message service is connected."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function getInitialState(): { page: Page; project: Project } {
  const hash = window.location.hash.replace("#/", "");
  if (hash.startsWith("project/")) {
    const found = projects.find((item) => item.id === hash.split("/")[1]);
    return { page: "project", project: found ?? projects[0] };
  }
  const validPages: Page[] = ["home", "about", "skills", "projects", "contact"];
  return {
    page: validPages.includes(hash as Page) ? (hash as Page) : "home",
    project: projects[0],
  };
}

export default function App() {
  const initial = getInitialState();
  const [page, setPage] = useState<Page>(initial.page);
  const [selectedProject, setSelectedProject] = useState<Project>(initial.project);

  useEffect(() => {
    const syncHash = () => {
      const next = getInitialState();
      setPage(next.page);
      setSelectedProject(next.project);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const navigate = (next: Page) => {
    const target = next === "project" ? `project/${selectedProject.id}` : next;
    if (window.location.hash === `#/${target}`) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = `/${target}`;
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = `/project/${project.id}`;
  };

  return (
    <div className="app">
      <Header page={page} navigate={navigate} />
      <div className="page-transition" key={`${page}-${selectedProject.id}`}>
        {page === "home" && <Home navigate={navigate} />}
        {page === "about" && <About navigate={navigate} />}
        {page === "skills" && <Skills navigate={navigate} />}
        {page === "projects" && <Projects openProject={openProject} />}
        {page === "project" && <ProjectDetails project={selectedProject} navigate={navigate} />}
        {page === "contact" && <Contact />}
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
