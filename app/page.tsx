import GradientASCII from '@/components/GradientASCII';

export default function Page() {
  return (
    <main style={{ width: '100vw', height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <GradientASCII
        colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={18}
        density={0.8}
        glyphOpacity={0}
        glow={0.2}
        depthOfField={0}
        flicker={0.2}
        softness={0.5}
        scale={1}
        flow={0.5}
        speed={1}
        gradientOpacity={0.9}
        grain={0.08}
        variation={0}
        mouseInteraction
        scrambleRadius={0.1}
        clickEffect="wave"
        intro
        lightMode={false}
      />
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 sm:p-4">
        <span className="px-3 py-1.5 font-sans text-xl font-semibold tracking-tight text-black sm:text-2xl">
          Gurucharan V
        </span>
        <button
          type="button"
          disabled
          title="Resume link coming soon"
          className="inline-flex items-center gap-1.5 border-0 bg-transparent px-3 py-1.5 font-sans text-xs font-semibold tracking-tight text-black disabled:cursor-default"
        >
          My Resume
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </button>
      </div>
      <div className="absolute inset-x-6 top-24 bottom-6 z-10 grid content-start gap-8 overflow-y-auto text-left font-sans text-black sm:inset-x-7 sm:top-28 sm:grid-cols-2 sm:gap-12">
        <section
          aria-label="About me"
        >
          <h1 className="font-sans text-xs font-semibold tracking-tight">
            TL;DR
          </h1>
          <p className="mt-3 font-sans text-base font-semibold leading-relaxed tracking-tight sm:text-lg">
            Hi, I’m Guru Charan, a software engineer and tech enthusiast. I build things,
            break a few along the way, and usually know how to put them back together.
            I’m especially curious about backend systems and what happens when thousands
            of people show up at once.
          </p>
        </section>
        <section aria-labelledby="education-heading" className="sm:justify-self-end sm:min-w-[260px]">
          <div className="mt-3">
            <h3 className="text-base font-semibold tracking-tight sm:text-lg">M.S., Information Technology</h3>
            <p className="mt-1 text-sm leading-relaxed">University of Wisconsin-Milwaukee</p>
          </div>
          <div className="mt-5">
            <h3 className="text-base font-semibold tracking-tight sm:text-lg">B.E., Computer Science</h3>
            <p className="mt-1 text-sm leading-relaxed">NBKRIST (JNTUA)</p>
          </div>
        </section>
      </div>
    </main>
  );
}
