'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';

type PanelId = 'projects' | 'details' | 'about' | 'experience' | 'education';
const panels: { id: PanelId; title: string; short: string }[] = [
  { id: 'projects', title: 'PROJECTS / INDEX', short: 'Projects' },
  { id: 'details', title: 'PROJECT / DETAILS', short: 'Details' },
  { id: 'about', title: 'ABOUT / GURU', short: 'About' },
  { id: 'experience', title: 'EXPERIENCE / LOG', short: 'Experience' },
  { id: 'education', title: 'EDUCATION', short: 'Education' },
];
const projects = [
  { title: 'Agentic AI Retrieval', full: 'Production RAG & Agentic AI Retrieval System', type: 'AI ENGINEERING', description: 'Turning a collection of documents into answers you can trace back to their source.', details: 'Built an end-to-end pipeline for document ingestion, recursive chunking, embeddings, vector persistence, retrieval, and grounded LLM responses. Combined semantic search with BM25 and Reciprocal Rank Fusion, with LangGraph orchestrating the workflow.', stack: ['Python', 'LangGraph', 'FastAPI', 'ChromaDB', 'pgvector'] },
  { title: 'Doodle Recognition', full: 'Doodle Recognition Web Application', type: 'MACHINE LEARNING', description: 'A quick sketch becomes a conversation with a neural network.', details: 'Trained a seven-layer convolutional neural network on 414,000+ vector images. Converted the model to TensorFlow Lite and connected it to a FastAPI image-processing backend and an interactive browser canvas.', stack: ['TensorFlow', 'TensorFlow Lite', 'FastAPI', 'Python'] }
];
const jobs = [
  { company: 'ZABLY AI', role: 'Software Engineer', dates: 'JUL 2025 — AUG 2026', points: ['Built an on-demand marketplace across Next.js and React Native/Expo, from Figma prototypes through App Store compliance.', 'Designed Node.js and FastAPI microservices with gRPC and RabbitMQ, and managed Kubernetes deployments with Tilt and Jaeger.', 'Developed Google Maps and OSRM routing services for real-time proximity matching.'] },
  { company: 'UWM ARC', role: 'Web Accessibility Developer', dates: 'SEP 2024 — MAY 2025', points: ['Evaluated React applications and university platforms against WCAG 2.1 AA, ARIA, and ADA requirements.', 'Resolved keyboard, contrast, and screen-reader issues at the UWM Accessibility Resource Center.'] },
  { company: 'STACK APPS', role: 'Software Engineer', dates: 'APR 2021 — JUN 2023', points: ['Integrated Kafka into financial workflows with idempotent consumers to prevent duplicate transaction processing.', 'Built Go services with OAuth 2.0 and RBAC, contributing to PCI-DSS initiatives and reducing security incidents by 35%.', 'Supported 5,000+ monthly transactions with PostgreSQL procedures, reducing manual work by 30% and error rates to below 2%.'] }
];


function WindowPanel({ id, title, children, collapsed, onCollapse, onExpand, layer, onRaise, epoch, active }: {
  id: PanelId; title: string; children: ReactNode; collapsed: boolean; onCollapse: () => void; onExpand: () => void;
  layer: number; onRaise: () => void; epoch: number; active: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; left: number; top: number; maxX: number; maxY: number; startX: number; startY: number } | null>(null);
  const move = (x: number, y: number) => {
    offset.current = { x, y };
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  useEffect(() => {
    const reset = () => { drag.current = null; move(0, 0); };
    reset();
    window.addEventListener('resize', reset);
    return () => window.removeEventListener('resize', reset);
  }, [epoch]);
  const begin = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0 || window.matchMedia('(max-width: 900px)').matches) return;
    const el = ref.current;
    if (!el?.parentElement) return;
    const box = el.getBoundingClientRect();
    const bounds = el.parentElement.getBoundingClientRect();
    onRaise();
    drag.current = { x: e.clientX, y: e.clientY, left: box.left - bounds.left - offset.current.x, top: box.top - bounds.top - offset.current.y, maxX: bounds.width - box.width, maxY: bounds.height - box.height, startX: offset.current.x, startY: offset.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  return <section id={`panel-${id}`} ref={ref} className={`desk-window panel-${id}${collapsed ? ' is-collapsed' : ''}${active ? ' mobile-active' : ''}`} style={{ zIndex: layer } as CSSProperties} aria-label={title} onPointerDown={onRaise}>
    <header className="window-bar">
      <button className="drag-handle" aria-label={`Move ${title} panel. Use arrow keys to reposition.`} title="Drag to move · Arrow keys when focused" onPointerDown={begin} onPointerMove={e => {
        const d = drag.current;
        if (!d) return;
        move(Math.max(-d.left, Math.min(d.maxX - d.left, d.startX + e.clientX - d.x)), Math.max(-d.top, Math.min(d.maxY - d.top, d.startY + e.clientY - d.y)));
      }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onKeyDown={e => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) || window.matchMedia('(max-width: 900px)').matches) return;
        e.preventDefault();
        const el = ref.current;
        if (!el?.parentElement) return;
        const b = el.getBoundingClientRect(), p = el.parentElement.getBoundingClientRect();
        const dx = e.key === 'ArrowLeft' ? -16 : e.key === 'ArrowRight' ? 16 : 0;
        const dy = e.key === 'ArrowUp' ? -16 : e.key === 'ArrowDown' ? 16 : 0;
        move(offset.current.x + Math.max(p.left - b.left, Math.min(p.right - b.right, dx)), offset.current.y + Math.max(p.top - b.top, Math.min(p.bottom - b.bottom, dy)));
      }}><span aria-hidden="true">⠿</span></button>
      <h2>[{title}]</h2>
      <button className="window-control minimize" onClick={onCollapse} aria-label={`${collapsed ? 'Restore' : 'Minimize'} ${title}`} aria-expanded={!collapsed}>{collapsed ? '+' : '−'}</button>
      <button className="window-control" onClick={onExpand} aria-label={`Expand ${title}`} title="Expand panel">↗</button>
    </header>
    <div className="window-body" hidden={collapsed}>{children}</div>
  </section>;
}

export default function PortfolioDesktop() {
  const [selected, setSelected] = useState(0);
  const [job, setJob] = useState(0);
  const [motion, setMotion] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try { setDark(localStorage.getItem('portfolio-theme') === 'dark'); } catch { /* Storage can be unavailable. */ }
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem('portfolio-theme', next ? 'dark' : 'light'); } catch { /* The toggle still works without storage. */ }
  };
  const [collapsed, setCollapsed] = useState<PanelId[]>([]);
  const [active, setActive] = useState<PanelId>('about');
  const [expanded, setExpanded] = useState<PanelId | null>(null);
  const [layers, setLayers] = useState<Partial<Record<PanelId, number>>>({});
  const top = useRef(10);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const raise = useCallback((id: PanelId) => setLayers(prev => ({ ...prev, [id]: ++top.current })), []);
  const open = useCallback((id: PanelId) => { setCollapsed(prev => prev.filter(value => value !== id)); setActive(id); raise(id); document.getElementById(`panel-${id}`)?.scrollIntoView({ block: 'nearest' }); }, [raise]);
  const expand = (id: PanelId) => { returnFocus.current = document.activeElement as HTMLElement; setExpanded(id); };
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotion(!preference.matches);
    sync(); preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (expanded) dialog.current?.showModal();
    else if (dialog.current?.open) { dialog.current.close(); returnFocus.current?.focus(); }
  }, [expanded]);
  const project = projects[selected];
  const chooseProject = (index: number) => { setSelected(index); open('details'); if (expanded === 'projects') setExpanded('details'); };
  const body = (id: PanelId) => {
    switch (id) {
      case 'projects': return <>
        <div className="panel-kicker">SELECTED WORK <span>02 ENTRIES</span></div>
        <div className="project-list">{projects.map((p, i) => <button key={p.title} onClick={() => chooseProject(i)} aria-pressed={selected === i} className={selected === i ? 'selected' : ''}><span className="entry-index">0{i + 1}</span><span>{p.title}<small>{p.type}</small></span><span className="entry-arrow">↗</span></button>)}</div>
        <p className="micro-copy">Select a project to explore the details.</p>
      </>;
      case 'details': return <><div className="panel-kicker">PROJECT 0{selected + 1}<span>{project.type}</span></div><h3 className="detail-title">{project.full}</h3><p>{project.description}</p><p className="detail-description">{project.details}</p><div className="chips">{project.stack.map(s => <span key={s}>{s}</span>)}</div><a className="inline-link" href="https://github.com/gvemuru1" target="_blank" rel="noopener noreferrer">EXPLORE MY GITHUB ↗</a></>;
      case 'about': return <><div className="about-line"><span className="monogram" aria-hidden="true">gv.</span><div><h3>Guru Charan</h3><span className="small-label">SOFTWARE ENGINEER</span></div></div><p>Hi, I’m Guru Charan, a software engineer and tech enthusiast. I build things, break a few along the way, and usually know how to put them back together.</p><p>I’m especially curious about backend systems and what happens when thousands of people show up at once.</p><div className="about-foot"><span>BASED IN MILWAUKEE, WI</span><a href="mailto:gurucharanvemuru@gmail.com" aria-label="Email Guru Charan">SAY HELLO ↗</a></div></>;
      case 'experience': return <><div className="job-tabs" aria-label="Select employer">{jobs.map((j, i) => <button key={j.company} onClick={() => { setJob(i); }} aria-pressed={job === i}>{j.company}</button>)}</div><div className="job-heading"><h3>{jobs[job].role}</h3><span>{jobs[job].dates}</span></div><ul className="experience-points">{jobs[job].points.map(point => <li key={point}>{point}</li>)}</ul></>;
      case 'education': return <><article className="degree"><span className="degree-year">2025</span><div><h3>M.S., Information Technology</h3><p>University of Wisconsin-Milwaukee</p></div></article><article className="degree"><span className="degree-year">2022</span><div><h3>B.E., Computer Science</h3><p>NBKR Institute Of Science and Technology (JNTUA)</p></div></article></>;
    }
  };
  return <main className={`portfolio-desktop with-grid${motion ? ' motion-on' : ''}${dark ? ' dark-theme' : ''}`}>
    <header className="identity-bar"><div className="identity-group"><button className="identity-name" onClick={() => open('about')}>GURU CHARAN <span>+</span></button></div><button className="theme-toggle" onClick={toggleTheme} aria-pressed={dark} aria-label="Dark mode">{dark ? 'LIGHT MODE ☀' : 'DARK MODE ◐'}</button></header>
    <div className="workspace">
      <div className="background-type" aria-hidden="true">GURU<br /><span>CHARAN</span></div>
      {panels.map(panel => <WindowPanel key={panel.id} {...panel} layer={layers[panel.id] ?? 2} active={active === panel.id} collapsed={collapsed.includes(panel.id)} onRaise={() => raise(panel.id)} onCollapse={() => { setCollapsed(prev => prev.includes(panel.id) ? prev.filter(id => id !== panel.id) : [...prev, panel.id]); }} onExpand={() => expand(panel.id)} epoch={0}>{body(panel.id)}</WindowPanel>)}
    </div>
    <footer className="desktop-footer"><nav aria-label="Contact links"><a href="https://www.linkedin.com/in/gurucharanvem" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><a href="https://github.com/gvemuru1" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="mailto:gurucharanvemuru@gmail.com">GMAIL ↗</a><a href="/Gurucharan_Vemuru_Resume.pdf" target="_blank" rel="noopener noreferrer">RESUME ↗</a></nav></footer>
    <dialog ref={dialog} className="expanded-window" onCancel={() => setExpanded(null)} onClick={e => { if (e.target === e.currentTarget) setExpanded(null); }} aria-labelledby="expanded-heading"><div className="expanded-inner"><header className="window-bar"><span className="drag-symbol" aria-hidden="true">⠿</span><h2 id="expanded-heading">[{panels.find(p => p.id === expanded)?.title}]</h2><button className="window-control" onClick={() => setExpanded(null)} aria-label="Close expanded panel" autoFocus>×</button></header><div className="expanded-body">{expanded && body(expanded)}</div></div></dialog>
  </main>;
}
