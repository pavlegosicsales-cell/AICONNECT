import Image from "next/image";

/*
  Kružni pečat 20/44 — zvanični logo u centru + rotirajući tekst po obimu.
  Točak: spoljni prsten sa tekstom se okreće, logo miruje u sredini.
*/
export default function Badge({ className = "" }: { className?: string }) {
  const text =
    "20/44 · UNDERGROUND · SAVAMALA · BEOGRAD · MUZIKA ISPRED SVEGA · ";
  return (
    <div className={`relative ${className}`}>
      {/* Rotirajući tekst-prsten + spoljni obruč */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full text-bone"
        aria-hidden="true"
      >
        <defs>
          <path
            id="badge-circle"
            d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
          />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="97"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.9"
        />
        <g className="animate-spin-slow" style={{ transformOrigin: "100px 100px" }}>
          <text
            fill="currentColor"
            fontSize="8.5"
            letterSpacing="2.4"
            fontFamily="var(--font-mono), monospace"
          >
            <textPath href="#badge-circle" startOffset="0%">
              {text + text}
            </textPath>
          </text>
        </g>
      </svg>

      {/* Zvanični logo u centru */}
      <div className="absolute inset-[16%] flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="20/44 logo"
          width={512}
          height={512}
          priority
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
