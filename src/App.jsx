import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import ViewportVisual from "./components/ViewportVisual";
import { useReducedMotion } from "./hooks/useReducedMotion";
import journeyAccounts from "./assets/journey-accounts.png";
import journeyGrowth from "./assets/journey-growth.png";
import journeyScreening from "./assets/journey-screening.png";

const ShaderAtmosphere = lazy(() => import("./components/ShaderAtmosphere"));
gsap.registerPlugin(useGSAP, ScrollTrigger);

const reportDeliverables = [
  [
    "Compliance snapshot",
    "A clear summary of how your holdings screen against Shariah guidelines.",
  ],
  [
    "Holdings review",
    "Positions organized by compliant, review-needed, and avoid/watch categories.",
  ],
  [
    "Action notes",
    "Plain-English next steps so you do not have to dig through brokerage screens.",
  ],
];

const inquiryTopics = [
  "Portfolio screening",
  "Investment advice",
  "Open brokerage account",
  "Shariah compliance review",
  "Account transfer",
  "Other",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

function Brand() {
  return (
    <a className="brand" href="/" aria-label="Mian Capital home">
      <span className="brand-wordmark" aria-hidden="true">
        <span className="brand-wordmark-main">Mian</span>
        <span className="brand-wordmark-capital">Capital</span>
      </span>
      <span className="brand-copy">
        <strong>Mian Capital</strong>
        <small>Values-based investing</small>
      </span>
    </a>
  );
}

function Header({ isScrolled }) {
  return (
    <header
      className={`site-header${isScrolled ? " is-scrolled" : ""}`}
      aria-label="Primary navigation"
    >
      <Brand />
      <nav className="desktop-nav" aria-label="Main menu">
        <a href="/#journey">How it works</a>
        <a href="/#features">Advisory</a>
        <a href="/team">Team</a>
      </nav>
    </header>
  );
}

function HeroReport() {
  const reportItems = [
    ["Open account", "Brokerage, Roth IRA, traditional IRA, or 529."],
    ["Screen holdings", "Current portfolio or ideas you want to buy."],
    ["Build portfolio", "Allocate, invest, and keep it growing."],
  ];

  return (
    <aside className="hero-report" aria-label="Advisory report preview">
      <div className="report-topline">
        <p className="dash-label">Advisory report</p>
        <span>Prepared for you</span>
      </div>
      <h2>Open the account. Screen the holdings. Build the portfolio.</h2>
      <div className="report-lines">
        {reportItems.map(([title, description]) => (
          <div className="report-line" key={title}>
            <span aria-hidden="true" />
            <div>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Hero({ reducedMotion, onOpenInquiry }) {
  return (
    <section className="hero section-pad" aria-labelledby="hero-title">
      <ViewportVisual>
        <Suspense fallback={null}>
          <ShaderAtmosphere variant="hero" reducedMotion={reducedMotion} />
        </Suspense>
      </ViewportVisual>
      <div className="pattern pattern-hero" aria-hidden="true" />
      <div className="hero-copy reveal">
        <h1 id="hero-title">Build wealth with your values.</h1>
        <p>
          Get help setting up brokerage accounts, screening your holdings for
          Shariah and ethical compliance, and building an investing approach
          aligned with your goals and values.
        </p>
        <div className="hero-actions" aria-label="Hero actions">
          <button
            className="button button-lime"
            type="button"
            onClick={onOpenInquiry}
          >
            Start investing
            <ArrowIcon />
          </button>
          <a className="button button-outline" href="#journey">
            See how it works
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="hero-visual reveal">
        <HeroReport />
      </div>
    </section>
  );
}

function Journey({ activeStep, reducedMotion }) {
  const steps = [
    {
      name: "setup",
      number: "01",
      label: "Open account",
      stepTitle: "Open your account",
      title: "Open the account that fits your goal.",
      image: journeyAccounts,
      description:
        "We help you choose the account that fits your goals, complete the application, and connect your funding source.",
    },
    {
      name: "screening",
      number: "02",
      label: "Screen holdings",
      stepTitle: "Review current holdings or new ideas",
      title: "Review what you own or want to buy.",
      image: journeyScreening,
      description:
        "If you already have a portfolio, we review it and suggest what to keep, trim, or rebalance around your goals. If you are starting fresh, we screen what you are considering before you buy.",
    },
    {
      name: "advice",
      number: "03",
      label: "Build portfolio",
      stepTitle: "Build the portfolio and let it grow",
      title: "Build the portfolio and let it grow.",
      image: journeyGrowth,
      description: "Invest, monitor, and rebalance as your goals change.",
    },
  ];

  return (
    <section
      className="scrolly section-pad"
      id="journey"
      aria-labelledby="journey-title"
    >
      <div className="scrolly-copy">
        <div className="section-heading reveal">
          <h2 id="journey-title">From review to action</h2>
          <svg className="underline" viewBox="0 0 360 24" aria-hidden="true">
            <path d="M8 16c76-14 151-15 344 0" />
          </svg>
        </div>
      </div>
      <div className="journey-rows" aria-live="polite">
        {steps.map((panel) => (
          <div className="journey-row" key={panel.name}>
            <JourneyStep
              activeStep={activeStep}
              name={panel.name}
              number={panel.number}
              title={panel.stepTitle}
            >
              {panel.description}
            </JourneyStep>
            <StagePanel
              active={activeStep === panel.name}
              name={panel.name}
              panel={panel}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function JourneyStep({ activeStep, children, name, number, title }) {
  return (
    <article
      className={`step reveal${activeStep === name ? " is-active" : ""}`}
      data-step={name}
    >
      <span className="step-number">
        <span>{number}</span>
      </span>
      <div className="step-body">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

function StagePanel({ active, name, panel }) {
  return (
    <div
      className={`stage-card${active ? " is-active" : ""}`}
      data-panel={name}
    >
      <div className="stage-media">
        <img src={panel.image} alt={panel.title} />
      </div>
      <div className="stage-copy">
        <p className="dash-label">{panel.label}</p>
        <h4>{panel.title}</h4>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section
      className="features section-pad"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="section-split reveal">
        <div>
          <p className="section-label">Holdings report</p>
          <h2 id="features-title">
            A simplified review of your investments, holdings, and compliance
          </h2>
        </div>
        <p>
          Send over your holdings and receive a practical report. No brokerage
          login walkthroughs, no confusing screens, and no need to interpret
          everything yourself.
        </p>
      </div>
      <div className="report-section-grid">
        <ReportPreview />
        <div className="advisory-cards">
          {reportDeliverables.map(([title, description], index) => (
            <article className="advisory-card reveal" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportPreview() {
  return (
    <aside
      className="report-preview reveal"
      aria-label="Sample holdings report"
    >
      <div className="report-paper">
        <div className="report-paper-header">
          <div>
            <p className="dash-label">Sample report</p>
            <h3>Holdings Compliance Report</h3>
          </div>
          <span>PDF</span>
        </div>
        <div className="report-paper-meta">
          <span>Prepared for: Client portfolio</span>
          <span>Review date: Sample</span>
        </div>
        <div className="report-paper-summary">
          <strong>82% estimated compliant</strong>
          <p>
            Based on the holdings provided, most positions appear aligned. A few
            should be reviewed before adding more capital.
          </p>
        </div>
        <div className="report-paper-section">
          <h4>Holdings review</h4>
          {[
            ["Large-cap ETF", "Compliant"],
            ["Individual stock", "Needs review"],
            ["Cash position", "Clear"],
          ].map(([holding, status]) => (
            <div className="report-paper-row" key={holding}>
              <span>{holding}</span>
              <strong>{status}</strong>
            </div>
          ))}
        </div>
        <div className="report-paper-section">
          <h4>Action notes</h4>
          <p>
            Keep compliant positions, review flagged exposure, and avoid buying
            more until the concern is clarified.
          </p>
        </div>
      </div>
    </aside>
  );
}

function Team() {
  return (
    <section
      className="team section-pad"
      id="team"
      aria-labelledby="team-title"
    >
      <div className="team-card reveal">
        <div className="founder-photo-placeholder" aria-hidden="true">
          <span>Founder photo</span>
        </div>
        <div className="team-copy">
          <p className="section-label">Team</p>
          <h2 id="team-title">
            Guidance from someone who understands the brief.
          </h2>
          <p>
            Founder description placeholder. Add a short bio here covering
            investing experience, Islamic finance focus, credentials, and why
            Mian Capital was started.
          </p>
          <p>
            Keep this section personal and concise: who clients work with, how
            the review process feels, and what kind of support they can expect.
          </p>
        </div>
      </div>
    </section>
  );
}

function HomePage({ activeStep, onOpenInquiry, reducedMotion }) {
  return (
    <main id="top">
      <Hero reducedMotion={reducedMotion} onOpenInquiry={onOpenInquiry} />
      <Journey activeStep={activeStep} reducedMotion={reducedMotion} />
      <Features />
    </main>
  );
}

function TeamPage() {
  return (
    <main className="team-page" id="top">
      <Team />
    </main>
  );
}

function Footer({ onOpenInquiry }) {
  return (
    <footer className="site-footer">
      <Brand />
      <button className="footer-contact" type="button" onClick={onOpenInquiry}>
        Start a conversation
      </button>
    </footer>
  );
}

function ContactInquiryModal({ open, onClose }) {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    topics: ["Portfolio screening"],
    details: "",
  };
  const [formState, setFormState] = useState({
    ...initialFormState,
  });
  const [submission, setSubmission] = useState({
    status: "idle",
    message: "",
  });
  const submissionStatus = useRef(submission.status);

  useEffect(() => {
    submissionStatus.current = submission.status;
  }, [submission.status]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSubmission({ status: "idle", message: "" });

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && submissionStatus.current !== "submitting") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const toggleTopic = (topic) => {
    setFormState((current) => {
      const topics = current.topics.includes(topic)
        ? current.topics.filter((item) => item !== topic)
        : [...current.topics, topic];

      return { ...current, topics };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmission({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your request.");
      }

      setFormState({ ...initialFormState });
      setSubmission({
        status: "success",
        message:
          "Your intake was sent. We will review it and follow up directly.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your request. Please try again.",
      });
    }
  };

  const isSubmitting = submission.status === "submitting";

  return (
    <div
      className="inquiry-backdrop"
      onClick={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        className="inquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="inquiry-header">
          <div>
            <p className="section-label">Start investing</p>
            <h2 id="inquiry-title">Send a brief intake</h2>
          </div>
          <button
            className="dialog-close"
            type="button"
            onClick={onClose}
            aria-label="Close form"
          >
            <span aria-hidden="true" />
          </button>
        </div>

        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Name</span>
              <input
                autoFocus
                required
                type="text"
                value={formState.name}
                disabled={isSubmitting}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                required
                type="email"
                value={formState.email}
                disabled={isSubmitting}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field">
              <span>Phone</span>
              <input
                type="tel"
                value={formState.phone}
                disabled={isSubmitting}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
              />
            </label>
          </div>

          <fieldset className="topic-fieldset">
            <legend>What do you need?</legend>
            <div className="topic-grid">
              {inquiryTopics.map((topic) => (
                <label
                  className={`topic-chip${
                    formState.topics.includes(topic) ? " is-selected" : ""
                  }`}
                  key={topic}
                >
                  <input
                    type="checkbox"
                    checked={formState.topics.includes(topic)}
                    disabled={isSubmitting}
                    onChange={() => toggleTopic(topic)}
                  />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field field-textarea">
            <span>Optional details</span>
            <textarea
              rows={5}
              value={formState.details}
              disabled={isSubmitting}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  details: event.target.value,
                }))
              }
            />
          </label>

          {submission.message ? (
            <p
              className={`inquiry-status inquiry-status-${submission.status}`}
              role={submission.status === "error" ? "alert" : "status"}
            >
              {submission.message}
            </p>
          ) : null}

          <div className="inquiry-actions">
            <button
              className="button button-lime"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send request"}
              <ArrowIcon />
            </button>
            <button
              className="button button-outline"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {submission.status === "success" ? "Close" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const page = useRef(null);
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState("setup");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [path, setPath] = useState(() =>
    window.location.pathname === "/team" ? "/team" : "/",
  );
  const stepNames = useMemo(() => ["setup", "screening", "advice"], []);

  useGSAP(
    () => {
      const isMobile = window.matchMedia("(max-width: 720px)").matches;
      const revealDistance = isMobile ? 14 : 24;
      const heroCopy = page.current?.querySelector(".hero-copy");
      const heroVisual = page.current?.querySelector(".hero-visual");
      const reportLines = gsap.utils.toArray(".report-line");
      const stageCards = gsap.utils.toArray(".stage-card");

      if (reducedMotion) {
        gsap.set(".reveal", {
          autoAlpha: 1,
          clearProps: "transform",
        });
        if (heroCopy) {
          gsap.set(".hero-copy > *", {
            autoAlpha: 1,
            clearProps: "transform",
          });
        }
        if (reportLines.length) {
          gsap.set(reportLines, {
            autoAlpha: 1,
            clearProps: "transform",
          });
        }
        if (stageCards.length) {
          gsap.set(stageCards, { autoAlpha: 1, y: 0, scale: 1 });
        }
        return;
      }

      gsap.set(".reveal", { autoAlpha: 0, y: revealDistance });
      if (heroCopy) {
        const heroChildren = Array.from(heroCopy.children);
        gsap.set(heroCopy, { autoAlpha: 1, y: 0 });
        gsap.set(heroChildren, {
          autoAlpha: 0,
          y: isMobile ? 14 : 20,
        });
        if (reportLines.length) {
          gsap.set(reportLines, { autoAlpha: 0, y: 10 });
        }

        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });
        heroTimeline.to(heroChildren, {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.1,
        });
        if (heroVisual) {
          heroTimeline.to(
            heroVisual,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: isMobile ? 0.58 : 0.84,
            },
            "-=0.42",
          );
        }
        if (reportLines.length) {
          heroTimeline.to(
            reportLines,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.045,
            },
            "-=0.35",
          );
        }
      }

      gsap.utils
        .toArray(
          ".reveal:not(.hero-copy):not(.hero-visual):not(.advisory-card)",
        )
        .forEach((element) => {
          gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          });
        });

      const advisoryCards = gsap.utils.toArray(".advisory-card");
      const advisoryGrid = page.current?.querySelector(".advisory-cards");
      if (advisoryCards.length && advisoryGrid) {
        gsap.to(advisoryCards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.68,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: advisoryGrid,
            start: "top 84%",
            once: true,
          },
        });
      }

      ScrollTrigger.refresh();
    },
    { dependencies: [reducedMotion, path], revertOnUpdate: true, scope: page },
  );

  useEffect(() => {
    const scope = page.current;
    if (!scope) return undefined;

    const activePanel = scope.querySelector(
      `.stage-card[data-panel="${activeStep}"]`,
    );
    const activeStepElement = scope.querySelector(
      `.step[data-step="${activeStep}"]`,
    );
    if (reducedMotion) {
      const panels = Array.from(scope.querySelectorAll(".stage-card"));
      if (panels.length) {
        gsap.set(panels, { autoAlpha: 1, y: 0, scale: 1 });
      }
      return undefined;
    }

    if (activePanel) {
      const panelChildren = Array.from(activePanel.children);
      gsap.killTweensOf(panelChildren);
      gsap.fromTo(
        panelChildren,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: "power3.out",
          stagger: 0.045,
          delay: 0.08,
        },
      );
    }

    if (activeStepElement) {
      const stepNumber = activeStepElement.querySelector(".step-number");
      gsap.fromTo(
        stepNumber,
        { y: 6 },
        { y: 0, duration: 0.34, ease: "power2.out" },
      );
    }

    return () => {
      if (activePanel) {
        gsap.killTweensOf(Array.from(activePanel.children));
      }
    };
  }, [activeStep, reducedMotion]);

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll(".step"));
    let ticking = false;

    const updateStep = () => {
      ticking = false;
      setIsScrolled(window.scrollY > 12);
      const section = document.querySelector(".scrolly");
      if (!section || !steps.length) return;

      const sectionRect = section.getBoundingClientRect();
      if (
        sectionRect.bottom <= 160 ||
        sectionRect.top >= window.innerHeight - 160
      ) {
        return;
      }

      const activationLine = window.innerHeight * 0.42;
      const active =
        steps.findLast((step) => {
          const rect = step.getBoundingClientRect();
          return rect.top <= activationLine;
        }) ?? steps[0];

      if (stepNames.includes(active.dataset.step)) {
        setActiveStep(active.dataset.step);
      }
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateStep);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [stepNames]);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname === "/team" ? "/team" : "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleNavigation = (event) => {
      const link = event.target.closest("a[href]");
      if (!link) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!["/", "/team"].includes(url.pathname)) return;

      event.preventDefault();
      window.history.pushState({}, "", `${url.pathname}${url.hash}`);
      setPath(url.pathname === "/team" ? "/team" : "/");

      requestAnimationFrame(() => {
        const target = url.hash
          ? document.querySelector(url.hash)
          : document.querySelector("#top");
        if (!target) return;

        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    };

    document.addEventListener("click", handleNavigation);
    return () => document.removeEventListener("click", handleNavigation);
  }, [reducedMotion]);

  return (
    <div className="page-shell" ref={page}>
      <Header isScrolled={isScrolled} />
      {path === "/team" ? (
        <TeamPage />
      ) : (
        <HomePage
          activeStep={activeStep}
          reducedMotion={reducedMotion}
          onOpenInquiry={() => setIsInquiryOpen(true)}
        />
      )}
      <Footer onOpenInquiry={() => setIsInquiryOpen(true)} />
      <ContactInquiryModal
        open={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}

export default App;
