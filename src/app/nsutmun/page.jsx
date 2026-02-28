"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Raleway, Open_Sans } from 'next/font/google';
import Link from 'next/link';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
});
const opensans = Open_Sans({
  subsets: ['latin'],
  weight: ['500'],
});

const colors = {
  creme: "#eae6e0",
  tangerine: "#F7931E",
  black: "#1c1c1c",
  orange: "#ff7e00",
  red: "#fe3e00",
  teal: "#008582",
  darkblue: "#002236",
};

/* ─────────────────────────────────────────────────────────────────────
   HARDCODED COMMITTEE DATA — edit everything here
───────────────────────────────────────────────────────────────────── */
const COMMITTEES = [
  {
    id: 'unsc',
    name: 'UNSC',
    full: 'United Nations Security Council',
    color: colors.orange,
    accent: colors.red,
    banner: null, // replace with "/images/unsc-banner.jpg" when ready
    agenda: null, // replace with agenda string when ready
    agendaDetail: null,
    bgPdf: null, // replace with "/pdfs/unsc-bg.pdf" when ready
    portfolios: [
      // { id: 1, name: 'United States', country: 'P5 Member', image: null, bio: 'Permanent member with veto power.' },
    ],
    eb: [
      // { id: 1, name: 'John Doe', role: 'Chairperson', photo: '/images/eb/john.jpg' },
    ],
  },
  {
    id: 'unhrc',
    name: 'UNHRC',
    full: 'UN Human Rights Council',
    color: colors.red,
    accent: colors.orange,
    banner: null,
    agenda: null,
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    eb: [],
  },
  {
    id: 'uncsw',
    name: 'UNCSW',
    full: 'UN Commission on the Status of Women',
    color: colors.teal,
    accent: colors.orange,
    banner: null,
    agenda: null,
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    eb: [],
  },
  {
    id: 'unga',
    name: 'UNGA',
    full: 'United Nations General Assembly',
    color: colors.orange,
    accent: colors.teal,
    banner: null,
    agenda: null,
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    eb: [],
  },
  {
    id: 'lok-sabha',
    name: 'LOK SABHA',
    full: 'Lok Sabha — Indian Parliament',
    color: colors.red,
    accent: colors.teal,
    banner: null,
    agenda: null,
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    eb: [],
  },
  {
    id: 'scrf',
    name: 'SCRF',
    full: 'Special Committee on Regional Frontiers',
    color: colors.teal,
    accent: colors.red,
    banner: null,
    agenda: null,
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    eb: [],
  },
];

/* ─── Committee Panel ─────────────────────────────────────────────── */
const CommitteePanel = ({ committee }) => {
  const [expandedPortfolio, setExpandedPortfolio] = useState(null);
  const { color, accent, banner, agenda, agendaDetail, bgPdf, portfolios, eb } = committee;

  return (
    <motion.div
      key={committee.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      {/* Banner */}
      {banner ? (
        <div
          className="relative h-48 sm:h-64 overflow-hidden"
          style={{ borderLeft: `4px solid ${color}` }}
        >
          <img src={banner} alt={committee.name} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${colors.darkblue}ee, ${colors.darkblue}44)` }}
          />
          <div className="absolute bottom-5 left-6">
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>{committee.name}</p>
            <h3 className="text-white text-xl font-bold">{committee.full}</h3>
          </div>
        </div>
      ) : (
        <div
          className="relative h-24 flex items-center px-6"
          style={{ borderLeft: `4px solid ${color}`, background: `${color}10` }}
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>{committee.name}</p>
            <h3 className="text-white text-xl font-bold">{committee.full}</h3>
          </div>
        </div>
      )}

      {/* Agenda + BG Guide */}
      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-px mt-px"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        {/* Agenda */}
        <div className="lg:col-span-2 p-7" style={{ background: colors.darkblue }}>
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color }}>Agenda</p>
          {agenda ? (
            <>
              <p className="text-white text-lg font-semibold leading-snug">{agenda}</p>
              {agendaDetail && (
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{agendaDetail}</p>
              )}
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-gray-500 italic text-sm">Agenda to be announced — Coming Soon</span>
            </div>
          )}
        </div>

        {/* BG Guide */}
        <div className="p-7 flex flex-col" style={{ background: colors.darkblue }}>
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: accent }}>
            Background Guide
          </p>
          {bgPdf ? (
            <>
              <p className="text-gray-400 text-sm mb-5 flex-1">
                Official background guide for delegate preparation.
              </p>
              <a
                href={bgPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wider uppercase w-fit transition-all duration-200 hover:gap-3"
                style={{ background: accent, color: colors.darkblue }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </>
          ) : (
            <div className="border border-dashed border-white/10 rounded p-5 text-center mt-2">
              <span className="text-gray-600 text-xs tracking-widest uppercase">Coming Soon</span>
            </div>
          )}
        </div>
      </div>

      {/* Portfolios */}
      <div className="p-7 mt-px" style={{ background: colors.darkblue }}>
        <div className="flex items-center gap-4 mb-5">
          <p className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color }}>Portfolios</p>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          {portfolios.length > 0 && (
            <span className="text-xs text-gray-500 font-semibold">{portfolios.length} Seats</span>
          )}
        </div>

        {portfolios.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {portfolios.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.03 * i }}
                onClick={() => setExpandedPortfolio(expandedPortfolio?.id === p.id ? null : p)}
                className="group relative overflow-hidden p-5 cursor-pointer transition-all duration-300"
                style={{ background: colors.darkblue }}
                onMouseEnter={e => e.currentTarget.style.background = '#003050'}
                onMouseLeave={e => e.currentTarget.style.background = colors.darkblue}
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: color }}
                />
                <div className="flex items-start gap-4">
                  {p.image ? (
                    <img src={p.image} alt={p.name}
                      className="w-11 h-11 object-cover rounded border border-white/10 shrink-0" />
                  ) : (
                    <div
                      className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-base font-bold shrink-0"
                      style={{ background: color + '18', color }}
                    >
                      {p.name[0]}
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-semibold text-sm">{p.name}</h4>
                    {p.country && <p className="text-gray-500 text-xs mt-0.5">{p.country}</p>}
                  </div>
                </div>
                <AnimatePresence>
                  {expandedPortfolio?.id === p.id && p.bio && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 text-xs leading-relaxed mt-3 pt-3 border-t border-white/5">
                        {p.bio}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded py-10 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-gray-600 text-xs tracking-widest uppercase">Portfolios Coming Soon</span>
            </div>
          </div>
        )}
      </div>

      {/* Executive Board */}
      {eb.length > 0 && (
        <div className="p-7 mt-px" style={{ background: colors.darkblue }}>
          <div className="flex items-center gap-4 mb-5">
            <p className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: accent }}>
              Executive Board
            </p>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {eb.map((m) => (
              <div
                key={m.id}
                className="group relative overflow-hidden p-5 transition-all duration-300"
                style={{ background: colors.darkblue }}
                onMouseEnter={e => e.currentTarget.style.background = '#003050'}
                onMouseLeave={e => e.currentTarget.style.background = colors.darkblue}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${color}, ${accent})` }}
                />
                <div className="flex justify-center mb-3">
                  <img
                    src={m.photo || '/images/placeholder.jpg'}
                    alt={m.name}
                    className="w-16 h-16 object-cover rounded-full border border-white/10 group-hover:border-white/20 transition-colors"
                  />
                </div>
                <div className="text-center">
                  <h4 className="text-white font-semibold text-sm">{m.name}</h4>
                  <div className="w-6 h-px mx-auto my-2" style={{ background: color }} />
                  <p className="text-xs font-bold tracking-wider uppercase" style={{ color }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Main Page ─────────────────────────────────────────────────────── */
const NSUTMUNPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(null);
  const committeeSectionRef = React.useRef(null);

  const slideshowImages = [
    {
      id: 1,
      image_url: "/images/mainbanner.jpg",
      title: "NSUT Model United Nations 2026",
      description: "Join us for the largest MUN conference at NSUT this year!",
      date: "Apr 11–12, 2026",
    },
    {
      id: 2,
      image_url: "/images/nsutmunbg.jpg",
      title: "NSUTMUN Committees",
      description: "Participate in exciting committees including UNSC, UNHRC, UNGA, and more",
      date: "Registration Open",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (id) => {
    if (activeTab === id) {
      setActiveTab(null);
      return;
    }
    setActiveTab(id);
    setTimeout(() => {
      committeeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const activeCommittee = COMMITTEES.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.black }}>

      {/* ── Hero ── */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-screen">
        <div
          className="hidden md:block absolute inset-0 w-full h-full"
          style={{ backgroundImage: `url("/images/mainbanner.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div
          className="block md:hidden absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url("/images/nsutmunbg.jpg")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundColor: colors.black,
          }}
        />
      </div>

      

      {/* ── Committees Section ── */}
      <div
        ref={committeeSectionRef}
        className={`${raleway.className} relative py-20 px-6`}
        style={{ backgroundColor: colors.darkblue }}
      >
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex flex-col gap-1">
              <div className="w-1.5 h-5" style={{ background: colors.orange }} />
              <div className="w-1.5 h-5" style={{ background: colors.red }} />
              <div className="w-1.5 h-5" style={{ background: colors.teal }} />
            </div>
            <h2 className="text-4xl font-bold text-white">Committees</h2>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${colors.orange}66, transparent)` }} />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: colors.orange }}>6 Councils</span>
          </div>
          <p className="text-gray-400 text-sm ml-5 mt-1">
            Select a committee to explore its agenda, portfolios, and executive board.
          </p>
        </div>

        {/* Tab Bar */}
        <div className="max-w-6xl mx-auto mb-px">
          <div className="flex flex-wrap gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {COMMITTEES.map((c) => {
              const isActive = activeTab === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleTabClick(c.id)}
                  className="relative flex-1 min-w-[110px] px-4 py-4 text-left transition-all duration-300 overflow-hidden group"
                  style={{
                    background: isActive ? c.color : colors.darkblue,
                  }}
                >
                  {!isActive && (
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: c.color + '18' }}
                    />
                  )}
                  <span
                    className="relative z-10 block text-xs font-bold tracking-[0.2em] uppercase"
                    style={{ color: isActive ? colors.darkblue : c.color }}
                  >
                    {c.name}
                  </span>
                  <span
                    className="relative z-10 block text-xs mt-0.5 leading-tight hidden sm:block"
                    style={{ color: isActive ? colors.darkblue + 'bb' : 'rgba(255,255,255,0.3)' }}
                  >
                    {c.full}
                  </span>
                  <span
                    className="absolute top-3 right-3 text-xs"
                    style={{ color: isActive ? colors.darkblue + '88' : 'rgba(255,255,255,0.2)' }}
                  >
                    {isActive ? '▲' : '▼'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab && activeCommittee ? (
              <CommitteePanel key={activeTab} committee={activeCommittee} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center border border-dashed border-white/10"
              >
                <p className="text-gray-600 text-sm tracking-widest uppercase">
                  Select a committee above to explore
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── About ── */}
      <div className={`${raleway.className} relative py-16 px-6`} style={{ backgroundColor: colors.creme }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8" style={{ color: colors.black }}
        >
          About NSUTMUN
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-lg text-center mb-6" style={{ color: colors.black }}
          >
            NSUT Model United Nations is an annual diplomacy conference hosted by Netaji Subhas University of Technology,
            bringing together students from across the nation to debate pressing global issues and develop solutions through
            international cooperation.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="text-lg text-center mb-10" style={{ color: colors.black }}
          >
            With over 300 delegates participating each year, NSUTMUN provides a platform for students to enhance their
            diplomatic skills, critical thinking, and leadership abilities through simulated UN committee sessions.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { title: '6+ Committees', desc: 'From UNSC to SCRF, participate in exciting committees covering diverse global issues' },
              { title: '300+ Delegates', desc: 'Connect with passionate delegates from top universities across India' },
              { title: '₹50,000 in Prizes', desc: 'Compete for prestigious awards and cash prizes across all committees' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }}
                className="p-6 rounded-lg"
                style={{ backgroundColor: colors.tangerine }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.black }}>{item.title}</h3>
                <p style={{ color: colors.black }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div
        className={`${raleway.className} relative py-16 px-6 text-center`}
        style={{ backgroundColor: colors.tangerine }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6" style={{ color: colors.black }}
        >
          Ready to Join NSUTMUN 2026?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          className="text-xl mb-8" style={{ color: colors.black }}
        >
          Registration is now open for delegates and International Press!
        </motion.p>
        <div className="flex justify-center space-x-4 mt-6">
          <a href="/NSUTMUN_Brochure.pdf" target="_blank" rel="noopener noreferrer">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: colors.creme, color: colors.black }}
            >
              Read Brochure
            </motion.button>
          </a>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: colors.black, color: colors.creme }}
          >
            <Link target="_blank" href="https://linktr.ee/NSUTMUN?fbclid=PAZXh0bgNhZW0CMTEAAab1z41rxKMzK6Hy97OD43bgPMzsdyrpdZcLF6Bre_6wwKLYpudvTWeJTIg_aem_a-kq22oUb-bdQiq1np9buw">
              Register Now
            </Link>
          </motion.button>
        </div>
        <div className="py-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: colors.creme, color: colors.black }}
          >
            <Link target="_blank" href="https://www.instagram.com/nsutmodelun/">
              Follow Us
            </Link>
          </motion.button>
        </div>
      </div>

    </div>
  );
};

export default NSUTMUNPage;
