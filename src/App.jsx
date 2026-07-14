import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "./hooks/useReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const inquiryTopics = [
  ["Portfolio screening", "Screen a portfolio"],
  ["Investment advice", "Investment guidance"],
  ["Open brokerage account", "Open an account"],
  ["Shariah compliance review", "Shariah review"],
  ["Account transfer", "Transfer an account"],
  ["Other", "Something else"],
];

const journeySteps = [
  {
    number: "01",
    eyebrow: "Understand",
    title: "Start with the right account.",
    description:
      "We begin with your goals, timeline, and financial picture, then identify the right account.",
    artifact: "account",
  },
  {
    number: "02",
    eyebrow: "Review",
    title: "Know what you own.",
    description:
      "We organize your holdings, screen them using the agreed approach, and explain what needs attention.",
    artifact: "screening",
  },
  {
    number: "03",
    eyebrow: "Advise",
    title: "Leave with a plan.",
    description: "You receive priorities for what to keep, revisit, or change.",
    artifact: "plan",
  },
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
      <span className="brand-name">Mian Capital</span>
      <span className="brand-rule" aria-hidden="true" />
    </a>
  );
}

function Header({ isScrolled, onOpenInquiry }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main menu">
          <a href="/#journey">Our approach</a>
          <a href="/#report">Holdings review</a>
          <a href="/team">About</a>
        </nav>
        <button className="header-cta" type="button" onClick={onOpenInquiry}>
          Request a call
          <ArrowIcon />
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        id="mobile-menu"
      >
        <a href="/#journey" onClick={() => setMenuOpen(false)}>
          Our approach
        </a>
        <a href="/#report" onClick={() => setMenuOpen(false)}>
          Holdings review
        </a>
        <a href="/team" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            onOpenInquiry();
          }}
        >
          Request an introductory call
        </button>
      </div>
    </header>
  );
}

function ReviewDocument({ compact = false }) {
  return (
    <div className={`review-document${compact ? " is-compact" : ""}`}>
      <div className="document-masthead">
        <span>Mian Capital</span>
        <span>Sample review</span>
      </div>
      <div className="document-title-row">
        <div>
          <p>Investment review</p>
          <h2>Portfolio guidance</h2>
        </div>
        <span className="document-date">Prepared for you</span>
      </div>
      <div className="document-summary">
        <p>Review focus</p>
        <strong>Alignment, screening, and next actions</strong>
      </div>
      <div className="document-columns">
        <div>
          <p className="document-label">Review overview</p>
          <div className="document-row">
            <span>Account structure</span>
            <strong>Clarified</strong>
          </div>
          <div className="document-row">
            <span>Holdings screen</span>
            <strong>Complete</strong>
          </div>
          <div className="document-row">
            <span>Priority actions</span>
            <strong>3 notes</strong>
          </div>
        </div>
        <div className="allocation-figure" aria-hidden="true">
          <div className="allocation-ring" />
          <div className="allocation-key">
            <span>Core</span>
            <span>Review</span>
            <span>Reserve</span>
          </div>
        </div>
      </div>
      <div className="document-note">
        <span>Advisor note</span>
        <p>Focus on decisions that affect alignment and long-term goals.</p>
      </div>
    </div>
  );
}

function Hero({ onOpenInquiry }) {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="hero-copy">
        <p className="eyebrow">Islamic investment guidance</p>
        <h1 id="hero-title">A clearer way to invest with your values.</h1>
        <p className="hero-intro">
          Personal guidance for choosing the right account, reviewing your
          portfolio, and making Shariah-conscious investment decisions.
        </p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={onOpenInquiry}>
            Request an introductory call
            <ArrowIcon />
          </button>
          <a className="button button-secondary" href="#journey">
            See our process
            <ArrowIcon />
          </a>
        </div>
        <p className="hero-reassurance">
          A short introduction. No commitment required.
        </p>
      </div>
      <div className="hero-document" aria-label="Sample investment review">
        <ReviewDocument />
      </div>
    </section>
  );
}

function AccountArtifact() {
  return (
    <div className="artifact-sheet account-artifact">
      <div className="artifact-header">
        <span>Account brief</span>
      </div>
      <h4>Match the account to the goal.</h4>
      <div className="account-options">
        <div>
          <strong>Brokerage</strong>
          <span>Flexible investing</span>
        </div>
        <div className="is-marked">
          <strong>Roth IRA</strong>
          <span>Long-term retirement</span>
        </div>
        <div>
          <strong>529</strong>
          <span>Education planning</span>
        </div>
      </div>
      <p className="artifact-caption">Illustrative account comparison</p>
    </div>
  );
}

function ScreeningArtifact() {
  return (
    <div className="artifact-sheet screening-artifact">
      <div className="artifact-header">
        <span>Holdings screen</span>
      </div>
      <h4>Review each holding.</h4>
      <div className="screening-table">
        <div className="screening-heading">
          <span>Holding</span>
          <span>Review</span>
        </div>
        <div>
          <strong>U.S. equity fund</strong>
          <span className="status status-clear">Clear</span>
        </div>
        <div>
          <strong>Individual equity</strong>
          <span className="status status-review">Review</span>
        </div>
        <div>
          <strong>Fixed-income fund</strong>
          <span className="status status-action">Action</span>
        </div>
      </div>
    </div>
  );
}

function PlanArtifact() {
  return (
    <div className="artifact-sheet plan-artifact">
      <div className="artifact-header">
        <span>Advisor notes</span>
      </div>
      <h4>Priorities you can act on.</h4>
      <ul className="action-list">
        <li>
          <p>Confirm the account structure.</p>
        </li>
        <li>
          <p>Resolve the flagged exposure.</p>
        </li>
        <li>
          <p>Set a review schedule.</p>
        </li>
      </ul>
    </div>
  );
}

function JourneyArtifact({ type }) {
  if (type === "account") return <AccountArtifact />;
  if (type === "screening") return <ScreeningArtifact />;
  return <PlanArtifact />;
}

function Journey() {
  return (
    <section
      className="journey section-shell section-space"
      id="journey"
      aria-label="Our approach"
    >
      <div className="journey-label reveal">
        <p className="eyebrow">Our approach</p>
      </div>
      <div className="journey-list">
        {journeySteps.map((step) => (
          <article className="journey-item reveal" key={step.number}>
            <div className="journey-copy">
              <span className="journey-number">{step.number}</span>
              <p className="eyebrow">{step.eyebrow}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <JourneyArtifact type={step.artifact} />
          </article>
        ))}
      </div>
    </section>
  );
}

function FullReport() {
  const rows = [
    ["U.S. equity fund", "Business activity", "Clear", "Keep"],
    ["Individual equity", "Financial ratios", "Review", "Confirm"],
    ["Fixed-income fund", "Instrument structure", "Action", "Replace"],
  ];

  return (
    <div className="full-report reveal" aria-label="Sample holdings review">
      <div className="full-report-top">
        <div>
          <span>Mian Capital</span>
          <strong>Holdings Review</strong>
        </div>
        <div>
          <span>Sample client</span>
          <strong>Illustrative report</strong>
        </div>
      </div>
      <div className="full-report-heading">
        <p>Portfolio review</p>
        <h3>Screening summary</h3>
      </div>
      <div className="report-table">
        <div className="report-table-heading">
          <span>Holding</span>
          <span>Primary screen</span>
          <span>Status</span>
          <span>Next action</span>
        </div>
        {rows.map(([holding, screen, status, action]) => (
          <div className="report-table-row" key={holding}>
            <strong>{holding}</strong>
            <span>{screen}</span>
            <span>{status}</span>
            <strong>{action}</strong>
          </div>
        ))}
      </div>
      <div className="report-lower">
        <div>
          <p className="report-kicker">Methodology note</p>
          <p>
            Business activity and financial-ratio screens are reviewed using
            current data and the agreed methodology. Classifications can change
            as company data changes.
          </p>
        </div>
      </div>
      <div className="report-footnote">
        <span>Sample for illustration only</span>
        <span>Page 1 of 1</span>
      </div>
    </div>
  );
}

function ReportSection() {
  return (
    <section
      className="report-section section-shell section-space"
      id="report"
      aria-labelledby="report-title"
    >
      <div className="report-intro reveal">
        <div>
          <p className="eyebrow">Holdings review</p>
          <h2 id="report-title">A report you can use.</h2>
        </div>
        <p>Each conclusion includes a reason and a next step.</p>
      </div>
      <FullReport />
    </section>
  );
}

function TeamPage({ onOpenInquiry }) {
  return (
    <main className="team-page" id="top">
      <section className="team-hero section-shell section-space">
        <div className="portrait-placeholder reveal" aria-hidden="true">
          <span>MC</span>
          <small>Founder portrait</small>
        </div>
        <div className="team-copy reveal">
          <p className="eyebrow">About Mian Capital</p>
          <h1>Personal investment guidance.</h1>
          <p>
            Work directly with Mian Capital on account selection, portfolio
            reviews, and investment decisions.
          </p>
          <div className="profile-notice">
            Founder name, professional biography, credentials, and portrait will
            be added here before launch.
          </div>
          <button className="button button-primary" onClick={onOpenInquiry}>
            Request an introductory call
            <ArrowIcon />
          </button>
        </div>
      </section>
    </main>
  );
}

function HomePage({ onOpenInquiry }) {
  return (
    <main id="top">
      <Hero onOpenInquiry={onOpenInquiry} />
      <Journey />
      <ReportSection />
    </main>
  );
}

function Footer({ onOpenInquiry }) {
  return (
    <footer className="site-footer section-shell">
      <div>
        <Brand />
        <p>Invest Islamically.</p>
      </div>
      <div className="footer-links">
        <a href="/#journey">Our approach</a>
        <a href="/#report">Holdings review</a>
        <a href="/team">About</a>
      </div>
      <button type="button" onClick={onOpenInquiry}>
        Start a conversation
        <ArrowIcon />
      </button>
    </footer>
  );
}

function ContactInquiryModal({ open, onClose }) {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    topics: [],
    details: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const [submission, setSubmission] = useState({
    status: "idle",
    message: "",
  });
  const statusRef = useRef(submission.status);
  const modalRef = useRef(null);

  useEffect(() => {
    statusRef.current = submission.status;
  }, [submission.status]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    setSubmission({ status: "idle", message: "" });

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && statusRef.current !== "submitting") {
        onClose();
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll(
            "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])",
          ),
        );
        const first = focusable[0];
        const last = focusable.at(-1);

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const toggleTopic = (topic) => {
    setFormState((current) => ({
      ...current,
      topics: current.topics.includes(topic)
        ? current.topics.filter((item) => item !== topic)
        : [...current.topics, topic],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmission({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your request.");
      }

      setFormState(initialFormState);
      setSubmission({ status: "success", message: "" });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your request. Please try again.",
      });
      requestAnimationFrame(() => {
        document
          .querySelector(".inquiry-status")
          ?.scrollIntoView({ block: "nearest" });
      });
    }
  };

  const isSubmitting = submission.status === "submitting";

  return (
    <div
      className="inquiry-backdrop"
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
    >
      <div
        className="inquiry-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        aria-describedby={
          submission.status === "success" ? "inquiry-success-copy" : undefined
        }
        onClick={(event) => event.stopPropagation()}
      >
        {submission.status === "success" ? (
          <div className="inquiry-success">
            <span className="success-mark" aria-hidden="true">
              ✓
            </span>
            <p className="eyebrow">Request received</p>
            <h2 id="inquiry-title">Thank you for reaching out.</h2>
            <p id="inquiry-success-copy">
              We will respond directly within one business day.
            </p>
            <button className="button button-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="inquiry-header">
              <div>
                <p className="eyebrow">Start a conversation</p>
                <h2 id="inquiry-title">Tell us what you’re looking for.</h2>
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
                    autoComplete="name"
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
                    autoComplete="email"
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
                <label className="field field-phone">
                  <span>Phone (optional)</span>
                  <input
                    autoComplete="tel"
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
                <legend>How can we help?</legend>
                <div className="topic-grid">
                  {inquiryTopics.map(([value, label]) => (
                    <label
                      className={`topic-chip${
                        formState.topics.includes(value) ? " is-selected" : ""
                      }`}
                      key={value}
                    >
                      <input
                        type="checkbox"
                        checked={formState.topics.includes(value)}
                        disabled={isSubmitting}
                        onChange={() => toggleTopic(value)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="field field-textarea">
                <span>Anything else? (optional)</span>
                <textarea
                  rows={4}
                  placeholder="Add a goal, question, or relevant detail."
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
              {submission.status === "error" ? (
                <div
                  className="inquiry-status inquiry-status-error"
                  role="alert"
                >
                  <strong>{submission.message}</strong>
                  <span>
                    Try again or email{" "}
                    <a href="mailto:wlmian31@gmail.com">wlmian31@gmail.com</a>.
                  </span>
                </div>
              ) : null}
              <div className="inquiry-actions">
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="sending-label">
                      <span className="spinner" aria-hidden="true" />
                      Sending
                    </span>
                  ) : (
                    <>
                      Send request
                      <ArrowIcon />
                    </>
                  )}
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const page = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [path, setPath] = useState(() =>
    window.location.pathname === "/team" ? "/team" : "/",
  );
  const openInquiry = () => setIsInquiryOpen(true);
  const routeNames = useMemo(() => ["/", "/team"], []);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const heroElements = gsap.utils.toArray(".hero-copy > *, .hero-document");
      if (heroElements.length) {
        gsap.fromTo(
          heroElements,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          },
        );
      }

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [path, reducedMotion], revertOnUpdate: true, scope: page },
  );

  useEffect(() => {
    let ticking = false;
    const updateHeader = () => {
      ticking = false;
      setIsScrolled(window.scrollY > 12);
    };
    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateHeader);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    requestUpdate();
    return () => window.removeEventListener("scroll", requestUpdate);
  }, []);

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
      if (!routeNames.includes(url.pathname)) return;

      event.preventDefault();
      window.history.pushState({}, "", `${url.pathname}${url.hash}`);
      setPath(url.pathname === "/team" ? "/team" : "/");

      requestAnimationFrame(() => {
        const target = url.hash
          ? document.querySelector(url.hash)
          : document.querySelector("#top");
        target?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    };

    document.addEventListener("click", handleNavigation);
    return () => document.removeEventListener("click", handleNavigation);
  }, [reducedMotion, routeNames]);

  return (
    <div className="page-shell" ref={page}>
      <Header isScrolled={isScrolled} onOpenInquiry={openInquiry} />
      {path === "/team" ? (
        <TeamPage onOpenInquiry={openInquiry} />
      ) : (
        <HomePage onOpenInquiry={openInquiry} />
      )}
      <Footer onOpenInquiry={openInquiry} />
      <ContactInquiryModal
        open={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </div>
  );
}

export default App;
