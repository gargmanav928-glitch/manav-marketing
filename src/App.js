import { useState, useEffect, useRef } from "react";

// ─── Fonts via Google Fonts (injected once) ───────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink: #0a0a0f;
      --ink-2: #14141f;
      --ink-3: #1e1e2e;
      --surface: #f7f6f2;
      --surface-2: #eeece6;
      --gold: #c9a84c;
      --gold-light: #e8c87a;
      --gold-dim: rgba(201,168,76,0.15);
      --white: #ffffff;
      --text-muted: rgba(247,246,242,0.5);
      --text-dim: rgba(247,246,242,0.7);
      --glass: rgba(255,255,255,0.04);
      --glass-border: rgba(255,255,255,0.08);
      --font-display: 'Playfair Display', serif;
      --font-ui: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --radius: 16px;
      --radius-sm: 10px;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--ink);
      color: var(--surface);
      font-family: var(--font-body);
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::selection { background: var(--gold-dim); color: var(--gold-light); }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--ink-2); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes grain {
      0%, 100% { transform: translate(0,0); }
      10%  { transform: translate(-2%,-3%); }
      20%  { transform: translate(2%,2%); }
      30%  { transform: translate(-1%,3%); }
      40%  { transform: translate(3%,-1%); }
      50%  { transform: translate(-3%,2%); }
      60%  { transform: translate(1%,-2%); }
      70%  { transform: translate(2%,3%); }
      80%  { transform: translate(-2%,-2%); }
      90%  { transform: translate(3%,1%); }
    }

    .fade-up { animation: fadeUp 0.7s ease both; }
    .fade-in { animation: fadeIn 0.6s ease both; }

    /* ── Section reveal ── */
    .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    /* ── Gold shimmer text ── */
    .gold-text {
      background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    /* ── Button base ── */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 32px; border-radius: 50px; font-family: var(--font-ui);
      font-size: 14px; font-weight: 600; letter-spacing: 0.04em;
      text-transform: uppercase; cursor: pointer; border: none;
      text-decoration: none; transition: all 0.3s ease; white-space: nowrap;
    }
    .btn-gold {
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      color: var(--ink); box-shadow: 0 0 30px rgba(201,168,76,0.3);
    }
    .btn-gold:hover {
      box-shadow: 0 0 50px rgba(201,168,76,0.5);
      transform: translateY(-2px);
    }
    .btn-outline {
      background: transparent; color: var(--surface);
      border: 1.5px solid var(--glass-border);
      backdrop-filter: blur(10px);
    }
    .btn-outline:hover {
      border-color: var(--gold); color: var(--gold);
      background: var(--gold-dim); transform: translateY(-2px);
    }

    /* ── Glass card ── */
    .glass-card {
      background: var(--glass); border: 1px solid var(--glass-border);
      backdrop-filter: blur(20px); border-radius: var(--radius);
    }

    /* ── Section wrapper ── */
    .section { padding: 120px 0; position: relative; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

    /* ── Section label ── */
    .section-label {
      font-family: var(--font-ui); font-size: 11px; font-weight: 700;
      letter-spacing: 0.25em; text-transform: uppercase;
      color: var(--gold); display: flex; align-items: center; gap: 12px;
      margin-bottom: 20px;
    }
    .section-label::before {
      content: ''; display: block; width: 32px; height: 1.5px;
      background: var(--gold);
    }

    /* ── Divider ── */
    .divider {
      width: 100%; height: 1px;
      background: linear-gradient(90deg, transparent, var(--glass-border), transparent);
    }

    /* ── Nav ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 20px 0; transition: all 0.4s ease;
    }
    nav.scrolled {
      background: rgba(10,10,15,0.85); backdrop-filter: blur(20px);
      padding: 14px 0; border-bottom: 1px solid var(--glass-border);
    }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      font-family: var(--font-display); font-size: 22px; font-weight: 700;
      color: var(--surface); text-decoration: none; letter-spacing: -0.02em;
    }
    .nav-logo span { color: var(--gold); }
    .nav-links {
      display: flex; align-items: center; gap: 36px; list-style: none;
    }
    .nav-links a {
      font-family: var(--font-ui); font-size: 13px; font-weight: 500;
      letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-dim);
      text-decoration: none; transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--surface); }
    .nav-cta { display: flex; align-items: center; gap: 16px; }

    /* ── Mobile nav ── */
    .hamburger {
      display: none; flex-direction: column; gap: 5px; cursor: pointer;
      padding: 4px;
    }
    .hamburger span {
      display: block; width: 24px; height: 2px; background: var(--surface);
      border-radius: 2px; transition: all 0.3s ease;
    }
    .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

    .mobile-menu {
      display: none; position: fixed; inset: 0; z-index: 999;
      background: rgba(10,10,15,0.97); backdrop-filter: blur(20px);
      flex-direction: column; align-items: center; justify-content: center;
      gap: 32px;
    }
    .mobile-menu.open { display: flex; }
    .mobile-menu a {
      font-family: var(--font-display); font-size: 32px; font-weight: 700;
      color: var(--surface); text-decoration: none;
      transition: color 0.2s;
    }
    .mobile-menu a:hover { color: var(--gold); }

    /* ── Hero ── */
    .hero {
      min-height: 100vh; display: flex; align-items: center;
      position: relative; overflow: hidden; padding: 140px 0 80px;
    }
    .hero-bg {
      position: absolute; inset: 0; pointer-events: none;
    }
    .hero-orb {
      position: absolute; border-radius: 50%; filter: blur(80px);
      pointer-events: none;
    }
    .hero-orb-1 {
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%);
      top: -100px; right: -100px; animation: float 8s ease-in-out infinite;
    }
    .hero-orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%);
      bottom: 0; left: -100px; animation: float 10s ease-in-out infinite reverse;
    }
    .hero-grid {
      position: absolute; inset: 0; opacity: 0.03;
      background-image: linear-gradient(var(--surface) 1px, transparent 1px),
                        linear-gradient(90deg, var(--surface) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .hero-content { position: relative; max-width: 800px; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 20px; border-radius: 50px; margin-bottom: 32px;
      background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.25);
      font-family: var(--font-ui); font-size: 12px; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold);
    }
    .hero-badge-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--gold);
      position: relative;
    }
    .hero-badge-dot::after {
      content: ''; position: absolute; inset: -3px; border-radius: 50%;
      border: 1px solid var(--gold); animation: pulse-ring 2s ease infinite;
    }
    .hero-title {
      font-family: var(--font-display); font-size: clamp(52px, 8vw, 96px);
      font-weight: 900; line-height: 1.0; letter-spacing: -0.03em;
      color: var(--surface); margin-bottom: 24px;
    }
    .hero-title .name { display: block; }
    .hero-title .role {
      display: block; font-size: 0.5em; font-weight: 400;
      font-style: italic; color: var(--text-dim); letter-spacing: 0;
      line-height: 1.4; margin-top: 8px;
    }
    .hero-subtitle {
      font-size: 18px; color: var(--text-dim); max-width: 560px;
      margin-bottom: 48px; line-height: 1.7; font-weight: 300;
    }
    .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 72px; }
    .hero-stats {
      display: flex; gap: 48px; flex-wrap: wrap;
    }
    .hero-stat-num {
      font-family: var(--font-display); font-size: 42px; font-weight: 900;
      line-height: 1; letter-spacing: -0.03em;
    }
    .hero-stat-label {
      font-family: var(--font-ui); font-size: 11px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted);
      margin-top: 4px;
    }

    /* ── Stats band ── */
    .stats-band {
      padding: 60px 0; border-top: 1px solid var(--glass-border);
      border-bottom: 1px solid var(--glass-border);
      background: linear-gradient(135deg, rgba(201,168,76,0.03), transparent);
    }
    .stats-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px;
      text-align: center;
    }
    .stat-item {}
    .stat-num {
      font-family: var(--font-display); font-size: 48px; font-weight: 900;
      line-height: 1; letter-spacing: -0.03em; margin-bottom: 8px;
    }
    .stat-desc {
      font-family: var(--font-ui); font-size: 12px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted);
    }

    /* ── About ── */
    .about-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
    }
    .about-left {}
    .about-heading {
      font-family: var(--font-display); font-size: clamp(36px, 5vw, 58px);
      font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
      margin-bottom: 28px;
    }
    .about-body { color: var(--text-dim); line-height: 1.8; font-size: 17px; font-weight: 300; margin-bottom: 40px; }
    .about-right {}
    .skill-group { margin-bottom: 36px; }
    .skill-group-title {
      font-family: var(--font-ui); font-size: 11px; font-weight: 700;
      letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
      margin-bottom: 16px;
    }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill-tag {
      padding: 8px 18px; border-radius: 50px; font-family: var(--font-ui);
      font-size: 13px; font-weight: 500; background: var(--glass);
      border: 1px solid var(--glass-border); color: var(--text-dim);
      transition: all 0.2s;
    }
    .skill-tag:hover {
      border-color: var(--gold); color: var(--gold); background: var(--gold-dim);
    }
    .industry-tag {
      padding: 6px 14px; border-radius: 6px; font-size: 12px;
      background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.15);
      color: var(--gold-light); font-family: var(--font-body);
    }

    /* ── Services ── */
    .services-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    }
    .service-card {
      padding: 40px 32px; border-radius: var(--radius);
      background: var(--ink-2); border: 1px solid var(--glass-border);
      position: relative; overflow: hidden;
      transition: all 0.4s ease; cursor: default;
    }
    .service-card::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent);
      opacity: 0; transition: opacity 0.4s;
    }
    .service-card:hover { transform: translateY(-8px); border-color: rgba(201,168,76,0.3); }
    .service-card:hover::before { opacity: 1; }
    .service-icon {
      width: 56px; height: 56px; border-radius: 14px;
      background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 26px; margin-bottom: 28px;
    }
    .service-title {
      font-family: var(--font-display); font-size: 22px; font-weight: 700;
      margin-bottom: 14px; line-height: 1.2;
    }
    .service-desc {
      font-size: 14px; color: var(--text-dim); line-height: 1.7;
      margin-bottom: 24px; font-weight: 300;
    }
    .service-deliverables { list-style: none; }
    .service-deliverables li {
      font-size: 13px; color: var(--text-dim); padding: 6px 0;
      border-bottom: 1px solid var(--glass-border);
      display: flex; align-items: center; gap: 10px; font-weight: 300;
    }
    .service-deliverables li::before {
      content: ''; display: block; width: 5px; height: 5px; border-radius: 50%;
      background: var(--gold); flex-shrink: 0;
    }
    .service-deliverables li:last-child { border-bottom: none; }

    /* ── Case Studies ── */
    .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .case-card {
      border-radius: var(--radius); overflow: hidden; position: relative;
      background: var(--ink-2); border: 1px solid var(--glass-border);
      transition: all 0.4s;
    }
    .case-card:hover { transform: translateY(-6px); border-color: rgba(201,168,76,0.3); }
    .case-card-top {
      height: 200px; position: relative; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      font-size: 64px;
    }
    .case-card-top-bg {
      position: absolute; inset: 0;
    }
    .case-card-body { padding: 32px; }
    .case-tag {
      display: inline-block; padding: 4px 12px; border-radius: 50px;
      font-family: var(--font-ui); font-size: 10px; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase;
      background: var(--gold-dim); color: var(--gold); margin-bottom: 16px;
    }
    .case-title {
      font-family: var(--font-display); font-size: 22px; font-weight: 700;
      margin-bottom: 16px; line-height: 1.2;
    }
    .case-results { display: flex; flex-direction: column; gap: 10px; }
    .case-result {
      display: flex; align-items: center; gap: 12px;
      font-size: 14px; color: var(--text-dim); font-weight: 300;
    }
    .case-result-icon {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; flex-shrink: 0; color: var(--ink); font-weight: 700;
    }

    /* ── Why Work With Me ── */
    .why-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
    .why-card {
      padding: 36px 24px; border-radius: var(--radius);
      background: var(--ink-2); border: 1px solid var(--glass-border);
      text-align: center; transition: all 0.3s;
    }
    .why-card:hover {
      border-color: rgba(201,168,76,0.3); transform: translateY(-4px);
      background: linear-gradient(135deg, rgba(201,168,76,0.05), var(--ink-2));
    }
    .why-icon { font-size: 40px; margin-bottom: 16px; display: block; }
    .why-title {
      font-family: var(--font-display); font-size: 17px; font-weight: 700;
      margin-bottom: 10px; line-height: 1.2;
    }
    .why-desc { font-size: 13px; color: var(--text-muted); font-weight: 300; line-height: 1.6; }

    /* ── Pricing ── */
    .pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; align-items: start; }
    .pricing-card {
      padding: 40px 32px; border-radius: var(--radius);
      background: var(--ink-2); border: 1px solid var(--glass-border);
      position: relative; transition: all 0.3s;
    }
    .pricing-card.featured {
      background: linear-gradient(160deg, rgba(201,168,76,0.12), var(--ink-2));
      border-color: rgba(201,168,76,0.4);
      transform: scale(1.03);
    }
    .pricing-card:hover:not(.featured) { border-color: rgba(201,168,76,0.25); transform: translateY(-4px); }
    .pricing-badge {
      position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      color: var(--ink); font-family: var(--font-ui); font-size: 10px;
      font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;
      padding: 5px 16px; border-radius: 50px; white-space: nowrap;
    }
    .pricing-plan {
      font-family: var(--font-ui); font-size: 12px; font-weight: 700;
      letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold);
      margin-bottom: 16px;
    }
    .pricing-price {
      font-family: var(--font-display); font-size: 40px; font-weight: 900;
      line-height: 1; letter-spacing: -0.03em; margin-bottom: 6px;
    }
    .pricing-period { font-size: 13px; color: var(--text-muted); margin-bottom: 28px; }
    .pricing-features { list-style: none; margin-bottom: 36px; }
    .pricing-features li {
      display: flex; align-items: flex-start; gap: 10px; padding: 9px 0;
      font-size: 14px; color: var(--text-dim); font-weight: 300;
      border-bottom: 1px solid var(--glass-border);
    }
    .pricing-features li:last-child { border-bottom: none; }
    .pricing-check { color: var(--gold); font-size: 14px; flex-shrink: 0; margin-top: 2px; }

    /* ── Testimonials ── */
    .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .testimonial-card {
      padding: 40px 32px; border-radius: var(--radius);
      background: var(--ink-2); border: 1px solid var(--glass-border);
      position: relative;
    }
    .testimonial-quote {
      position: absolute; top: 24px; right: 28px;
      font-family: var(--font-display); font-size: 80px; font-weight: 900;
      color: var(--gold-dim); line-height: 1; color: rgba(201,168,76,0.12);
    }
    .testimonial-stars { color: var(--gold); font-size: 15px; letter-spacing: 2px; margin-bottom: 18px; }
    .testimonial-text {
      font-size: 15px; color: var(--text-dim); line-height: 1.8; font-weight: 300;
      margin-bottom: 28px; font-style: italic;
    }
    .testimonial-author { display: flex; align-items: center; gap: 14px; }
    .testimonial-avatar {
      width: 46px; height: 46px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-display); font-size: 18px; font-weight: 700;
      color: var(--ink);
    }
    .testimonial-name {
      font-family: var(--font-ui); font-size: 15px; font-weight: 700;
    }
    .testimonial-role { font-size: 12px; color: var(--text-muted); }

    /* ── Contact ── */
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
    .contact-heading {
      font-family: var(--font-display); font-size: clamp(36px, 5vw, 56px);
      font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
      margin-bottom: 24px;
    }
    .contact-desc { color: var(--text-dim); font-size: 17px; line-height: 1.7; font-weight: 300; margin-bottom: 40px; }
    .contact-info { display: flex; flex-direction: column; gap: 20px; }
    .contact-info-item {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 24px; border-radius: var(--radius-sm);
      background: var(--glass); border: 1px solid var(--glass-border);
      text-decoration: none; color: inherit; transition: all 0.2s;
    }
    .contact-info-item:hover { border-color: var(--gold); color: var(--gold); }
    .contact-info-icon {
      width: 44px; height: 44px; border-radius: 10px;
      background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    .contact-info-label { font-size: 11px; color: var(--text-muted); font-family: var(--font-ui); letter-spacing: 0.1em; text-transform: uppercase; }
    .contact-info-value { font-size: 15px; font-weight: 500; margin-top: 2px; }

    /* ── Form ── */
    .form { display: flex; flex-direction: column; gap: 18px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .form-field { display: flex; flex-direction: column; gap: 8px; }
    .form-label { font-family: var(--font-ui); font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
    .form-input, .form-textarea {
      padding: 14px 18px; border-radius: var(--radius-sm);
      background: var(--glass); border: 1px solid var(--glass-border);
      color: var(--surface); font-family: var(--font-body); font-size: 15px;
      outline: none; transition: border-color 0.2s; resize: none;
    }
    .form-input:focus, .form-textarea:focus { border-color: var(--gold); }
    .form-input::placeholder, .form-textarea::placeholder { color: var(--text-muted); }
    .form-textarea { height: 140px; }
    .form-select {
      padding: 14px 18px; border-radius: var(--radius-sm);
      background: var(--ink-3); border: 1px solid var(--glass-border);
      color: var(--surface); font-family: var(--font-body); font-size: 15px;
      outline: none; transition: border-color 0.2s; appearance: none;
    }
    .form-select:focus { border-color: var(--gold); }

    /* ── Footer ── */
    footer {
      padding: 60px 0 32px; border-top: 1px solid var(--glass-border);
    }
    .footer-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; flex-wrap: wrap; gap: 40px; }
    .footer-logo {
      font-family: var(--font-display); font-size: 26px; font-weight: 700;
      color: var(--surface); margin-bottom: 12px;
    }
    .footer-logo span { color: var(--gold); }
    .footer-tagline { font-size: 14px; color: var(--text-muted); font-weight: 300; }
    .footer-links-group { }
    .footer-links-title {
      font-family: var(--font-ui); font-size: 11px; font-weight: 700;
      letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
      margin-bottom: 20px;
    }
    .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
    .footer-links a { font-size: 14px; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: var(--surface); }
    .footer-social { display: flex; gap: 12px; }
    .social-btn {
      width: 42px; height: 42px; border-radius: 10px;
      background: var(--glass); border: 1px solid var(--glass-border);
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; font-size: 17px; transition: all 0.2s;
      color: var(--text-dim);
    }
    .social-btn:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }
    .footer-bottom {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 32px; border-top: 1px solid var(--glass-border);
      flex-wrap: wrap; gap: 16px;
    }
    .footer-copy { font-size: 13px; color: var(--text-muted); }

    /* ── Floating buttons ── */
    .floating-wa {
      position: fixed; bottom: 32px; right: 32px; z-index: 900;
      width: 58px; height: 58px; border-radius: 50%;
      background: #25D366; display: flex; align-items: center; justify-content: center;
      font-size: 28px; text-decoration: none; box-shadow: 0 8px 32px rgba(37,211,102,0.35);
      transition: all 0.3s; animation: float 4s ease-in-out infinite;
    }
    .floating-wa:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(37,211,102,0.5); }

    .sticky-cta {
      display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 800;
      padding: 16px 24px; background: rgba(10,10,15,0.95); backdrop-filter: blur(20px);
      border-top: 1px solid var(--glass-border);
    }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .why-grid { grid-template-columns: repeat(3, 1fr); }
      .pricing-grid { grid-template-columns: repeat(2, 1fr); }
      .pricing-card.featured { transform: none; }
    }
    @media (max-width: 768px) {
      .section { padding: 80px 0; }
      .nav-links { display: none; }
      .nav-cta .btn { display: none; }
      .hamburger { display: flex; }
      .about-grid { grid-template-columns: 1fr; gap: 48px; }
      .services-grid { grid-template-columns: 1fr; }
      .case-grid { grid-template-columns: 1fr; }
      .why-grid { grid-template-columns: repeat(2, 1fr); }
      .pricing-grid { grid-template-columns: 1fr; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .contact-grid { grid-template-columns: 1fr; gap: 48px; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .form-row { grid-template-columns: 1fr; }
      .sticky-cta { display: block; }
      .floating-wa { bottom: 90px; right: 20px; }
      .hero-stats { gap: 32px; }
      .footer-top { flex-direction: column; }
    }
    @media (max-width: 480px) {
      .why-grid { grid-template-columns: 1fr; }
      .hero-ctas { flex-direction: column; }
      .hero-ctas .btn { justify-content: center; }
    }
  `}</style>
);

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["About", "Services", "Work", "Pricing", "Contact"];

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo">Manav<span>.</span></a>
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
              ))}
            </ul>
            <div className="nav-cta">
              <a href="#contact" className="btn btn-gold" style={{ padding: "12px 26px", fontSize: "13px" }}>
                Book Consultation
              </a>
              <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                <span /><span /><span />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <a href="#contact" className="btn btn-gold" onClick={() => setMenuOpen(false)} style={{ marginTop: 16 }}>
          Book Consultation
        </a>
      </div>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="hero-badge-dot" />
            Available for New Projects
          </div>

          <h1 className="hero-title fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="name">Manav Garg</span>
            <span className="role">Performance Marketing Consultant</span>
          </h1>

          <p className="hero-subtitle fade-up" style={{ animationDelay: "0.3s" }}>
            12+ Years of expertise in Meta Ads, Google Ads & Lead Generation.
            Helping businesses generate quality leads, improve ROI, and scale
            revenue through data-driven strategies.
          </p>

          <div className="hero-ctas fade-up" style={{ animationDelay: "0.4s" }}>
            <a href="#contact" className="btn btn-gold">
              <span>✦</span> Book a Consultation
            </a>
            <a href="#services" className="btn btn-outline">
              View Services →
            </a>
          </div>

          <div className="hero-stats fade-up" style={{ animationDelay: "0.5s" }}>
            {[
              { num: "12+", label: "Years Experience" },
              { num: "6+", label: "Industries Served" },
              { num: "ROI", label: "Focused Results" },
            ].map((s) => (
              <div key={s.label}>
                <div className="hero-stat-num gold-text">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Band ───────────────────────────────────────────────────────────────
function StatsBand() {
  return (
    <div className="stats-band">
      <div className="container">
        <div className="stats-grid">
          {[
            { num: "12+", label: "Years Experience", color: "var(--gold)" },
            { num: "6+", label: "Industries", color: "var(--surface)" },
            { num: "100%", label: "Performance Focused", color: "var(--gold)" },
            { num: "ROI", label: "Always Driven", color: "var(--surface)" },
          ].map((s) => (
            <div className="stat-item reveal" key={s.label}>
              <div className="stat-num" style={{ color: s.color }}>{s.num}</div>
              <div className="stat-desc">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const specializations = ["Meta Ads", "Google Ads", "Lead Generation", "Funnel Optimization", "Retargeting", "Conversion Tracking", "Growth Strategy"];
  const industries = ["Beauty & Wellness", "Education & Academies", "Clinics", "Local Businesses", "Real Estate", "Service Businesses"];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-label reveal">About</div>
            <h2 className="about-heading reveal reveal-delay-1">
              Data-Driven Marketer.<br />
              <span className="gold-text">Results-Obsessed.</span>
            </h2>
            <p className="about-body reveal reveal-delay-2">
              Manav Garg is a performance marketer with 12+ years of experience helping
              businesses generate quality leads, improve ROI, and scale revenue through
              data-driven digital marketing strategies.
            </p>
            <p className="about-body reveal reveal-delay-3" style={{ marginBottom: 0 }}>
              With a deep understanding of paid media landscapes, Manav crafts campaigns
              that don't just reach audiences — they convert. Every rupee spent is tracked,
              optimized, and accountable to measurable business outcomes.
            </p>
          </div>

          <div className="about-right reveal reveal-delay-2">
            <div className="skill-group">
              <div className="skill-group-title">Specializations</div>
              <div className="skill-tags">
                {specializations.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="skill-group">
              <div className="skill-group-title">Industries Served</div>
              <div className="skill-tags">
                {industries.map((i) => (
                  <span key={i} className="skill-tag industry-tag">{i}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: "📣",
      title: "Meta Ads Management",
      desc: "Strategic Facebook & Instagram advertising campaigns designed to generate high-quality leads and maximize your ad spend efficiency.",
      deliverables: ["Campaign Setup & Structure", "Audience Research & Targeting", "Creative Direction", "A/B Testing", "Weekly Optimization", "Performance Reports"],
    },
    {
      icon: "🔍",
      title: "Google Ads Management",
      desc: "Data-driven Search, Display & YouTube campaigns that capture high-intent traffic and convert prospects into paying customers.",
      deliverables: ["Search & Display Campaigns", "Keyword Strategy", "Landing Page Alignment", "Bid Management", "Quality Score Optimization", "Monthly Reports"],
    },
    {
      icon: "🎯",
      title: "Lead Generation Strategy",
      desc: "End-to-end lead generation frameworks that attract, capture and qualify prospects to deliver a consistent pipeline of business opportunities.",
      deliverables: ["Lead Magnet Creation", "Form & CTA Optimization", "Lead Scoring Setup", "CRM Integration", "Follow-up Sequence", "Quality Assurance"],
    },
    {
      icon: "⚡",
      title: "Funnel Optimization",
      desc: "Identifying and fixing leakages in your marketing funnel to dramatically improve conversion rates at every stage of the buyer journey.",
      deliverables: ["Funnel Audit & Analysis", "Conversion Rate Optimization", "Heatmap Analysis", "UX Recommendations", "Retargeting Strategy", "Revenue Attribution"],
    },
    {
      icon: "📊",
      title: "Performance Consulting",
      desc: "High-level strategic consulting for businesses looking to build or transform their performance marketing operations for scale.",
      deliverables: ["Marketing Audit", "Strategy Roadmap", "Team Training", "Tool & Stack Review", "KPI Framework", "Ongoing Advisory"],
    },
  ];

  return (
    <section id="services" className="section" style={{ background: "var(--ink-2)" }}>
      <div className="container">
        <div className="section-label reveal">Services</div>
        <h2 className="about-heading reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 60 }}>
          Everything You Need to<br />
          <span className="gold-text">Grow With Paid Media</span>
        </h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className={`service-card reveal reveal-delay-${(i % 4) + 1}`} key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-deliverables">
                {s.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────
function CaseStudies() {
  const cases = [
    {
      emoji: "💄",
      tag: "Beauty Academy",
      title: "Lead Generation for Beauty Academy",
      gradient: "linear-gradient(135deg, #2d1b69, #11998e)",
      results: [
        { icon: "↓", text: "Reduced CPL by 45% in 60 days" },
        { icon: "↑", text: "Improved lead quality & intent" },
        { icon: "🎓", text: "Increased admissions by 3×" },
      ],
    },
    {
      emoji: "🏫",
      tag: "Education Institute",
      title: "Scaling an Education Institute",
      gradient: "linear-gradient(135deg, #1a1a2e, #e94560)",
      results: [
        { icon: "↑", text: "3× increase in qualified leads" },
        { icon: "💰", text: "Improved ROAS from 1.8 to 4.2" },
        { icon: "⚡", text: "Full funnel optimization" },
      ],
    },
    {
      emoji: "🏢",
      tag: "Local Business",
      title: "Local Business Campaign Growth",
      gradient: "linear-gradient(135deg, #0f3460, #533483)",
      results: [
        { icon: "📈", text: "Consistent monthly lead flow" },
        { icon: "↓", text: "Reduced acquisition cost by 38%" },
        { icon: "🚀", text: "Built scalable campaign structure" },
      ],
    },
  ];

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-label reveal">Case Studies</div>
        <h2 className="about-heading reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 60 }}>
          Real Campaigns.<br />
          <span className="gold-text">Measurable Results.</span>
        </h2>
        <div className="case-grid">
          {cases.map((c, i) => (
            <div className={`case-card reveal reveal-delay-${i + 1}`} key={c.title}>
              <div className="case-card-top">
                <div className="case-card-top-bg" style={{ background: c.gradient }} />
                <span style={{ position: "relative", zIndex: 1 }}>{c.emoji}</span>
              </div>
              <div className="case-card-body">
                <div className="case-tag">{c.tag}</div>
                <h3 className="case-title">{c.title}</h3>
                <div className="case-results">
                  {c.results.map((r) => (
                    <div className="case-result" key={r.text}>
                      <div className="case-result-icon">{r.icon}</div>
                      <span>{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Work With Me ─────────────────────────────────────────────────────────
function WhyMe() {
  const reasons = [
    { icon: "🏆", title: "12+ Years Experience", desc: "Deep expertise across platforms, industries, and campaign types." },
    { icon: "📈", title: "ROI Focused", desc: "Every decision is tied to your bottom line — not vanity metrics." },
    { icon: "🎯", title: "Lead Quality", desc: "Attracting prospects who actually convert, not just click." },
    { icon: "🔬", title: "Data-Driven", desc: "Strategy backed by numbers, not gut feelings or guesswork." },
    { icon: "🤝", title: "Business-First", desc: "Marketing that aligns with your sales process and growth goals." },
  ];

  return (
    <section className="section" style={{ background: "var(--ink-2)" }}>
      <div className="container">
        <div className="section-label reveal">Why Choose Me</div>
        <h2 className="about-heading reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 60 }}>
          The Difference<br />
          <span className="gold-text">Experience Makes</span>
        </h2>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div className={`why-card reveal reveal-delay-${i + 1}`} key={r.title}>
              <span className="why-icon">{r.icon}</span>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      plan: "Starter",
      price: "₹25,000",
      period: "per month",
      features: ["Meta Ads Management", "Weekly Optimization", "Monthly Reporting", "Campaign Setup", "Audience Research", "Basic Retargeting"],
      featured: false,
    },
    {
      plan: "Growth",
      price: "₹50,000",
      period: "per month",
      features: ["Meta + Google Ads", "Advanced Retargeting", "Funnel Optimization", "Bi-weekly Report Calls", "A/B Testing", "Conversion Tracking"],
      featured: true,
      badge: "Most Popular",
    },
    {
      plan: "Scale",
      price: "₹1,00,000",
      period: "per month",
      features: ["Full Performance Marketing", "Daily Optimization", "CRM Coordination", "Weekly Strategy Calls", "Scaling Support", "Priority Access"],
      featured: false,
    },
    {
      plan: "Consulting",
      price: "₹5,000",
      period: "per hour",
      features: ["1-on-1 Strategy Call", "Campaign Audit", "Actionable Roadmap", "Q&A Session", "Follow-up Notes", "Flexible Scheduling"],
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-label reveal">Pricing</div>
        <h2 className="about-heading reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 60 }}>
          Transparent Pricing.<br />
          <span className="gold-text">No Hidden Costs.</span>
        </h2>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div className={`pricing-card reveal reveal-delay-${i + 1} ${p.featured ? "featured" : ""}`} key={p.plan}>
              {p.badge && <div className="pricing-badge">{p.badge}</div>}
              <div className="pricing-plan">{p.plan}</div>
              <div className="pricing-price">
                {p.plan !== "Consulting" ? p.price : <span className="gold-text">{p.price}</span>}
              </div>
              <div className="pricing-period">{p.period}</div>
              <ul className="pricing-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <span className="pricing-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${p.featured ? "btn-gold" : "btn-outline"}`} style={{ width: "100%", justifyContent: "center" }}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      text: "Manav completely transformed our lead generation. Within 3 months our cost per lead dropped dramatically and the quality of inquiries we received improved noticeably. Highly recommend.",
      name: "Priya Sharma",
      role: "Director, Elite Beauty Academy",
      initial: "P",
    },
    {
      text: "We were burning budget on Google Ads with minimal results. Manav audited everything, restructured our campaigns and within 6 weeks our ROAS doubled. He knows his craft deeply.",
      name: "Rahul Mehta",
      role: "Founder, EduGrowth Institute",
      initial: "R",
    },
    {
      text: "Working with Manav felt like having a full marketing team. He understood our business, set realistic expectations, and delivered consistent results month after month. Exceptional work.",
      name: "Sonia Kapoor",
      role: "Owner, Glow Wellness Clinic",
      initial: "S",
    },
  ];

  return (
    <section className="section" style={{ background: "var(--ink-2)" }}>
      <div className="container">
        <div className="section-label reveal">Testimonials</div>
        <h2 className="about-heading reveal reveal-delay-1" style={{ maxWidth: 600, marginBottom: 60 }}>
          What Clients<br />
          <span className="gold-text">Say About Working Together</span>
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className={`testimonial-card reveal reveal-delay-${i + 1}`} key={t.name}>
              <div className="testimonial-quote">"</div>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="section-label reveal">Contact</div>
            <h2 className="contact-heading reveal reveal-delay-1">
              Let's Grow<br />
              <span className="gold-text">Your Business</span>
            </h2>
            <p className="contact-desc reveal reveal-delay-2">
              Ready to scale your leads and ROI? Reach out for a free initial
              consultation and let's discuss how performance marketing can
              transform your business.
            </p>
            <div className="contact-info reveal reveal-delay-3">
              <a className="contact-info-item" href="mailto:gargmanav928@gmail.com">
                <div className="contact-info-icon">✉️</div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">gargmanav928@gmail.com</div>
                </div>
              </a>
              <a className="contact-info-item" href="tel:+919999692435">
                <div className="contact-info-icon">📞</div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+91-9999692435</div>
                </div>
              </a>
              <a className="contact-info-item" href="https://www.linkedin.com/in/manav-gargg/" target="_blank" rel="noreferrer">
                <div className="contact-info-icon">💼</div>
                <div>
                  <div className="contact-info-label">LinkedIn</div>
                  <div className="contact-info-value">linkedin.com/in/manav-gargg</div>
                </div>
              </a>
              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-value">India (Serving Clients Worldwide)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div className="glass-card" style={{ padding: 60, textAlign: "center" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: "var(--text-dim)", fontWeight: 300 }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="form glass-card" style={{ padding: 40 }} onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 24 }}>Send a Message</h3>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Name</label>
                    <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Phone</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 xxxxxxxxxx" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Business Type</label>
                    <input className="form-input" name="business" value={form.business} onChange={handleChange} placeholder="e.g. Beauty Academy" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Service Interested In</label>
                  <select className="form-select" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service…</option>
                    <option>Meta Ads Management</option>
                    <option>Google Ads Management</option>
                    <option>Lead Generation Strategy</option>
                    <option>Funnel Optimization</option>
                    <option>Performance Consulting</option>
                    <option>Full Package</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your business and goals…" />
                </div>
                <button type="submit" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", padding: "16px" }}>
                  ✦ Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">Manav<span>.</span></div>
            <div className="footer-tagline">Performance Marketing Consultant<br />Meta Ads · Google Ads · Lead Generation</div>
            <div className="footer-social" style={{ marginTop: 24 }}>
              <a href="https://www.linkedin.com/in/manav-gargg/" target="_blank" rel="noreferrer" className="social-btn">in</a>
              <a href="https://wa.me/919999692435" target="_blank" rel="noreferrer" className="social-btn">📱</a>
              <a href="mailto:gargmanav928@gmail.com" className="social-btn">✉</a>
            </div>
          </div>

          <div>
            <div className="footer-links-title">Quick Links</div>
            <ul className="footer-links">
              {["About", "Services", "Case Studies", "Pricing", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase().replace(" ", "")}`}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-links-title">Services</div>
            <ul className="footer-links">
              {["Meta Ads Management", "Google Ads Management", "Lead Generation", "Funnel Optimization", "Performance Consulting"].map((s) => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-links-title">Get In Touch</div>
            <ul className="footer-links">
              <li><a href="mailto:gargmanav928@gmail.com">gargmanav928@gmail.com</a></li>
              <li><a href="tel:+919999692435">+91-9999692435</a></li>
              <li><a href="https://www.linkedin.com/in/manav-gargg/" target="_blank" rel="noreferrer">LinkedIn Profile</a></li>
              <li><span style={{ color: "var(--text-muted)" }}>India</span></li>
            </ul>
            <div style={{ marginTop: 28 }}>
              <a href="#contact" className="btn btn-gold" style={{ fontSize: "12px", padding: "12px 24px" }}>Book Consultation</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Manav Garg. All rights reserved.</div>
          <div className="footer-copy">Performance Marketing · Lead Generation · ROI Growth</div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();

  return (
    <>
      <FontLink />
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <About />
        <Services />
        <CaseStudies />
        <WhyMe />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919999692435?text=Hi%20Manav%2C%20I%27m%20interested%20in%20your%20performance%20marketing%20services."
        target="_blank"
        rel="noreferrer"
        className="floating-wa"
        title="Chat on WhatsApp"
      >
        💬
      </a>

      {/* Sticky Mobile CTA */}
      <div className="sticky-cta">
        <a href="#contact" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
          Book a Free Consultation
        </a>
      </div>
    </>
  );
}
