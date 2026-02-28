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
    banner: null, 
    agenda: null, 
    agendaDetail: null,
    bgPdf: null, 
    portfolios: [],
    eb: [],
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

/* ─── Shared Utilities for Dynamic Portfolios ──────────────────────── */
const normalizeStatus = (s) => s?.trim().toUpperCase();

const getStatusColor = (status) => {
  const s = normalizeStatus(status);
  if (s === 'VACANT') return 'bg-green-500/10 text-green-400 border-green-500/30';
  if (s === 'ON-HOLD' || s === 'ON HOLD') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
  if (s === 'ALLOTTED') return 'bg-red-500/10 text-red-400 border-red-500/30';
  return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
};

const scrfLabels = {
  nca: "National Cybersecurity Agency (NCA)",
  jcmd: "Joint Command for Maritime Defense (JCMD)",
  iscia: "Intell-Services & Counter-Interference (ISCIA)",
  pcsl: "Public Communication & Safety Liaison (PCSL)",
  srwe: "Strategic Resource & Waste Enforcement (SRWE)",
  isde: "Infrastructure & Space Defense Executive (ISDE)",
  rocm: "Regulatory Oversight & Compliance Management (ROCM)"
};

/* ─── Committee Panel ─────────────────────────────────────────────── */
const CommitteePanel = ({ committee }) => {
  const [expandedPortfolio, setExpandedPortfolio] = useState(null);
  const { color, accent, banner, agenda, agendaDetail, bgPdf, portfolios, eb } = committee;

  // Dynamic Portfolio States
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const requiresFetch = ['unsc', 'unhrc', 'lok-sabha', 'scrf'].includes(committee.id);

  useEffect(() => {
    if (!requiresFetch) return;
    
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        let endpoint = '';
        if (committee.id === 'unsc') endpoint = '/api/unsc';
        else if (committee.id === 'unhrc') endpoint = '/api/unhrc';
        else if (committee.id === 'lok-sabha') endpoint = '/api/loksabha';
        else if (committee.id === 'scrf') endpoint = '/api/scrf';

        const res = await fetch(endpoint);
        const data = await res.json();
        setLiveData(data);
      } catch (err) {
        console.error(`Error fetching ${committee.id} data:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [committee.id, requiresFetch]);

  // General list filter
  const filterList = (list, searchKey1, searchKey2 = '') => {
    if (!list) return [];
    return list.filter(item => {
      const term = search.toLowerCase();
      const val1 = item[searchKey1]?.toLowerCase() || '';
      const val2 = item[searchKey2]?.toLowerCase() || '';
      const matchesSearch = val1.includes(term) || val2.includes(term);
      const matchesFilter = filter === 'ALL' || normalizeStatus(item.status) === (filter === 'ON HOLD' ? 'ON-HOLD' : filter);
      return matchesSearch && matchesFilter;
    });
  };

  // Reusable List Item Card
  const ListItem = ({ title, subtitle, status, subLabelColor = color }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group">
      <div className="flex flex-col">
        <span className="text-white text-base sm:text-lg font-medium group-hover:translate-x-1 transition-transform">
          {title}
        </span>
        {subtitle && (
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1" style={{ color: subLabelColor }}>
            {subtitle}
          </span>
        )}
      </div>
      <span className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold border uppercase tracking-widest whitespace-nowrap ${getStatusColor(status)}`}>
        {normalizeStatus(status)}
      </span>
    </div>
  );

  const renderDynamicPortfolios = () => {
    if (loading) {
      return (
        <div className="text-center py-12 animate-pulse font-bold tracking-widest" style={{ color }}>
          LOADING DATABASE...
        </div>
      );
    }
    if (!liveData) return null;

    // --- UNSC RENDER ---
    if (committee.id === 'unsc') {
      const perm = filterList((liveData.permanent || []).filter(c => c.country && !c.country.toLowerCase().includes('permanent')), 'country');
      const nonPerm = filterList((liveData.non_permanent || []).filter(c => c.country && !c.country.toLowerCase().includes('permanent')), 'country');

      return (
        <div className="space-y-8">
          {perm.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-4">
                <h4 className="font-bold tracking-widest uppercase text-xs" style={{ color }}>Permanent Members (P5)</h4>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-2">
                {perm.map((c, i) => <ListItem key={i} title={c.country} status={c.status} />)}
              </div>
            </section>
          )}
          {nonPerm.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-4">
                <h4 className="font-bold tracking-widest uppercase text-xs" style={{ color: accent }}>Non-Permanent Members</h4>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid gap-2">
                {nonPerm.map((c, i) => <ListItem key={i} title={c.country} status={c.status} />)}
              </div>
            </section>
          )}
        </div>
      );
    }

    // --- LOK SABHA RENDER ---
    if (committee.id === 'lok-sabha') {
      const list = filterList(liveData, 'portfolio', 'party');
      return (
        <div className="grid gap-2">
          {list.length > 0 ? (
            list.map((item, i) => <ListItem key={i} title={item.portfolio} subtitle={item.party || 'No Party Assigned'} status={item.status} subLabelColor={accent} />)
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">No portfolios found.</div>
          )}
        </div>
      );
    }

    // --- SCRF RENDER ---
    if (committee.id === 'scrf') {
      return (
        <div className="space-y-10">
          {Object.entries(liveData).map(([key, items]) => {
            const filtered = filterList(items, 'portfolio');
            if (filtered.length === 0 && search) return null;
            if (!items || items.length === 0) return null;
            
            return (
              <section key={key}>
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="font-bold tracking-widest uppercase text-xs whitespace-nowrap" style={{ color }}>
                    {scrfLabels[key] || key.toUpperCase()}
                  </h4>
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] text-gray-500 font-bold">{filtered.length} UNITS</span>
                </div>
                <div className="grid gap-2">
                  {filtered.map((item, i) => <ListItem key={i} title={item.portfolio} status={item.status} />)}
                </div>
              </section>
            );
          })}
        </div>
      );
    }

    // --- UNHRC RENDER (Standard Flat List) ---
    if (committee.id === 'unhrc') {
      // Assuming UNHRC returns an array of { country, status }
      const list = filterList(Array.isArray(liveData) ? liveData : (liveData.countries || []), 'country');
      return (
        <div className="grid gap-2">
          {list.length > 0 ? (
            list.map((item, i) => <ListItem key={i} title={item.country || item.portfolio} status={item.status} />)
          ) : (
            <div className="text-center py-8 text-gray-500 text-sm">No members found.</div>
          )}
        </div>
      );
    }

    return null;
  };

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
        <div className="relative h-48 sm:h-64 overflow-hidden" style={{ borderLeft: `4px solid ${color}` }}>
          <img src={banner} alt={committee.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${colors.darkblue}ee, ${colors.darkblue}44)` }} />
          <div className="absolute bottom-5 left-6">
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>{committee.name}</p>
            <h3 className="text-white text-xl font-bold">{committee.full}</h3>
          </div>
        </div>
      ) : (
        <div className="relative h-24 flex items-center px-6" style={{ borderLeft: `4px solid ${color}`, background: `${color}10` }}>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>{committee.name}</p>
            <h3 className="text-white text-xl font-bold">{committee.full}</h3>
          </div>
        </div>
      )}

      {/* Agenda + BG Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px mt-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="lg:col-span-2 p-7" style={{ background: colors.darkblue }}>
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color }}>Agenda</p>
          {agenda ? (
            <>
              <p className="text-white text-lg font-semibold leading-snug">{agenda}</p>
              {agendaDetail && <p className="text-gray-400 text-sm mt-3 leading-relaxed">{agendaDetail}</p>}
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-gray-500 italic text-sm">Agenda to be announced — Coming Soon</span>
            </div>
          )}
        </div>

        <div className="p-7 flex flex-col" style={{ background: colors.darkblue }}>
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: accent }}>Background Guide</p>
          {bgPdf ? (
            <>
              <p className="text-gray-400 text-sm mb-5 flex-1">Official background guide for delegate preparation.</p>
              <a href={bgPdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wider uppercase w-fit transition-all duration-200 hover:gap-3" style={{ background: accent, color: colors.darkblue }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

      {/* Portfolios Section */}
      <div className="p-7 mt-px" style={{ background: colors.darkblue }}>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color }}>Portfolios & Status</p>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>

        {requiresFetch ? (
          <>
            {/* Search & Filter UI for Dynamic Committees */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 mb-8">
              <input
                type="text"
                placeholder={`Search ${committee.name} entries...`}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg mb-4 focus:ring-2 outline-none transition-all text-sm"
                style={{ focusRingColor: color }}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <div className="flex flex-wrap gap-2">
                {['ALL', 'VACANT', 'ON HOLD', 'ALLOTTED'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase border transition-all ${
                      filter === f ? 'text-black' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                    }`}
                    style={{ backgroundColor: filter === f ? color : '', borderColor: filter === f ? color : '' }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            {renderDynamicPortfolios()}
          </>
        ) : (
          /* Hardcoded Portfolios Fallback (For UNCSW, UNGA) */
          portfolios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
              {portfolios.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }}
                  onClick={() => setExpandedPortfolio(expandedPortfolio?.id === p.id ? null : p)}
                  className="group relative overflow-hidden p-5 cursor-pointer transition-all duration-300"
                  style={{ background: colors.darkblue }}
                  onMouseEnter={e => e.currentTarget.style.background = '#003050'}
                  onMouseLeave={e => e.currentTarget.style.background = colors.darkblue}
                >
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: color }} />
                  <div className="flex items-start gap-4">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-11 h-11 object-cover rounded border border-white/10 shrink-0" />
                    ) : (
                      <div className="w-11 h-11 rounded border border-white/10 flex items-center justify-center text-base font-bold shrink-0" style={{ background: color + '18', color }}>
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="text-gray-400 text-xs leading-relaxed mt-3 pt-3 border-t border-white/5">{p.bio}</p>
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
          )
        )}
      </div>

      {/* Executive Board */}
      {eb.length > 0 && (
        <div className="p-7 mt-px" style={{ background: colors.darkblue }}>
          <div className="flex items-center gap-4 mb-5">
            <p className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: accent }}>Executive Board</p>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {eb.map((m) => (
              <div key={m.id} className="group relative overflow-hidden p-5 transition-all duration-300" style={{ background: colors.darkblue }} onMouseEnter={e => e.currentTarget.style.background = '#003050'} onMouseLeave={e => e.currentTarget.style.background = colors.darkblue}>
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, ${color}, ${accent})` }} />
                <div className="flex justify-center mb-3">
                  <img src={m.photo || '/images/placeholder.jpg'} alt={m.name} className="w-16 h-16 object-cover rounded-full border border-white/10 group-hover:border-white/20 transition-colors" />
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
    { id: 1, image_url: "/images/mainbanner.jpg", title: "NSUT Model United Nations 2026", description: "Join us for the largest MUN conference at NSUT this year!", date: "Apr 11–12, 2026" },
    { id: 2, image_url: "/images/nsutmunbg.jpg", title: "NSUTMUN Committees", description: "Participate in exciting committees including UNSC, UNHRC, UNGA, and more", date: "Registration Open" },
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
        <div className="hidden md:block absolute inset-0 w-full h-full" style={{ backgroundImage: `url("/images/mainbanner.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="block md:hidden absolute inset-0 w-full h-full" style={{ backgroundImage: `url("/images/nsutmunbg.jpg")`, backgroundSize: 'contain', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundColor: colors.black }} />
      </div>

      {/* ── Committees Section ── */}
      <div ref={committeeSectionRef} className={`${raleway.className} relative py-20 px-6`} style={{ backgroundColor: colors.darkblue }}>
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
          <p className="text-gray-400 text-sm ml-5 mt-1">Select a committee to explore its agenda, portfolios, and executive board.</p>
        </div>

        <div className="max-w-6xl mx-auto mb-px">
          <div className="flex flex-wrap gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {COMMITTEES.map((c) => {
              const isActive = activeTab === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleTabClick(c.id)}
                  className="relative flex-1 min-w-[110px] px-4 py-4 text-left transition-all duration-300 overflow-hidden group"
                  style={{ background: isActive ? c.color : colors.darkblue }}
                >
                  {!isActive && <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: c.color + '18' }} />}
                  <span className="relative z-10 block text-xs font-bold tracking-[0.2em] uppercase" style={{ color: isActive ? colors.darkblue : c.color }}>{c.name}</span>
                  <span className="relative z-10 block text-xs mt-0.5 leading-tight hidden sm:block" style={{ color: isActive ? colors.darkblue + 'bb' : 'rgba(255,255,255,0.3)' }}>{c.full}</span>
                  <span className="absolute top-3 right-3 text-xs" style={{ color: isActive ? colors.darkblue + '88' : 'rgba(255,255,255,0.2)' }}>{isActive ? '▲' : '▼'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab && activeCommittee ? (
              <CommitteePanel key={activeTab} committee={activeCommittee} />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center border border-dashed border-white/10">
                <p className="text-gray-600 text-sm tracking-widest uppercase">Select a committee above to explore</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── About ── */}
      <div className={`${raleway.className} relative py-16 px-6`} style={{ backgroundColor: colors.creme }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center mb-8" style={{ color: colors.black }}>About NSUTMUN</motion.h2>
        <div className="max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-lg text-center mb-6" style={{ color: colors.black }}>NSUT Model United Nations is an annual diplomacy conference hosted by Netaji Subhas University of Technology, bringing together students from across the nation to debate pressing global issues and develop solutions through international cooperation.</motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="text-lg text-center mb-10" style={{ color: colors.black }}>With over 300 delegates participating each year, NSUTMUN provides a platform for students to enhance their diplomatic skills, critical thinking, and leadership abilities through simulated UN committee sessions.</motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[{ title: '6+ Committees', desc: 'From UNSC to SCRF, participate in exciting committees covering diverse global issues' }, { title: '300+ Delegates', desc: 'Connect with passionate delegates from top universities across India' }, { title: '₹50,000 in Prizes', desc: 'Compete for prestigious awards and cash prizes across all committees' }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }} className="p-6 rounded-lg" style={{ backgroundColor: colors.tangerine }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors.black }}>{item.title}</h3>
                <p style={{ color: colors.black }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={`${raleway.className} relative py-16 px-6 text-center`} style={{ backgroundColor: colors.tangerine }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6" style={{ color: colors.black }}>Ready to Join NSUTMUN 2026?</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} className="text-xl mb-8" style={{ color: colors.black }}>Registration is now open for delegates and International Press!</motion.p>
        <div className="flex justify-center space-x-4 mt-6">
          <a href="/NSUTMUN_Brochure.pdf" target="_blank" rel="noopener noreferrer">
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }} className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105" style={{ backgroundColor: colors.creme, color: colors.black }}>Read Brochure</motion.button>
          </a>
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105" style={{ backgroundColor: colors.black, color: colors.creme }}>
            <Link target="_blank" href="https://linktr.ee/NSUTMUN?fbclid=PAZXh0bgNhZW0CMTEAAab1z41rxKMzK6Hy97OD43bgPMzsdyrpdZcLF6Bre_6wwKLYpudvTWeJTIg_aem_a-kq22oUb-bdQiq1np9buw">Register Now</Link>
          </motion.button>
        </div>
        <div className="py-3">
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }} className="px-8 py-3 rounded-lg text-lg font-semibold transition-transform hover:scale-105" style={{ backgroundColor: colors.creme, color: colors.black }}>
            <Link target="_blank" href="https://www.instagram.com/nsutmodelun/">Follow Us</Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NSUTMUNPage;
