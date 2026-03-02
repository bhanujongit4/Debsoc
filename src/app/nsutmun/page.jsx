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

const useVisitCounter = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const increment = async () => {
      try {
        let current = 0;
        try {
          const result = await window.storage.get('visit_count', true); // shared = true so all users contribute
          current = parseInt(result.value) || 0;
        } catch (_) {}
        const next = current + 1;
        await window.storage.set('visit_count', String(next), true);
        setCount(next);
      } catch (err) {
        console.error('Visit counter error:', err);
      }
    };
    increment();
  }, []);

  return count;
};

/* ─────────────────────────────────────────────────────────────────────
   HARDCODED COMMITTEE DATA — edit everything here
───────────────────────────────────────────────────────────────────── */
const COMMITTEES = [
  {
    id: 'unsc',
    name: 'UNSC',
    full: 'UN Security Council : Double Delegation',
    color: colors.orange,
    accent: colors.red,
    banner: 'images/unsc.jpeg',
    agenda: 'Addressing maritime security in the Bab el-Mandeb Strait: Asymmetric maritime threats and legality of pre-emptive measures for safeguarding freedom on navigation.',
    agendaDetail: "Double Delegation: Each delegation will represent one country.",
    bgPdf: null,
    portfolios: [],
    instagramPostImage: null, // e.g. '/images/unsc-eb-post.jpg'
  },
  {
    id: 'unhrc',
    name: 'UNHRC',
    full: 'UN Human Rights Council : Double Delegation',
    color: colors.red,
    accent: colors.orange,
    banner: 'images/unhrc.jpeg',
    agenda: 'Upholding the rights of migrants, refugees and asylum seekers under domestic immigration enforcement mechanisms.',
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    instagramPostImage: null,
  },
  {
    id: 'uncsw',
    name: 'UNCSW',
    full: 'UN Commission on the Status of Women',
    color: colors.teal,
    accent: colors.orange,
    banner: 'images/uncsw.jpeg',
    agenda: 'Strengthening access to justice for women, by promoting equitable legal systems and addressing discriminatory laws,policies and structural barriers.',
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    instagramPostImage: null,
  },
  {
    id: 'unga',
    name: 'UNGA SPECPOL',
    full: 'United Nations General Assembly Special Political and Decolonization Committee',
    color: colors.orange,
    accent: colors.teal,
    banner: 'images/unga.jpeg',
    agenda: 'Countering Neo-Imperialist maneuvers in the exploitation of critical minerals: Safeguarding the right to self-determination.',
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    instagramPostImage: null,
  },
  {
    id: 'lok-sabha',
    name: 'LOK SABHA',
    full: 'Lok Sabha — Indian Parliament',
    color: colors.red,
    accent: colors.teal,
    banner: 'images/loksabha.jpeg',
    agenda: 'Addressing the budgetary viability of the VB-G RAM G Act and strengthening institutional safeguards for marginalized sections through the statutory implementation of Equal Opportunity Centres.',
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    instagramPostImage: null,
  },
  {
    id: 'scrf',
    name: 'SCRF',
    full: 'Security Council Of The Russian Federation',
    color: colors.teal,
    accent: colors.red,
    banner: 'images/scrf.jpeg',
    agenda: "Classified",
    agendaDetail: null,
    bgPdf: null,
    portfolios: [],
    instagramPostImage: null,
  },
];

// IP is separate — no portfolio matrix, just agenda/bg + post
const IP_COMMITTEE = {
  id: 'ip',
  name: 'IP',
  full: 'International Press',
  color: colors.tangerine,
  accent: colors.teal,
  banner: 'images/ip.png',
  agenda: 'Calling all Journalists and Photographers',
  agendaDetail: null,
  bgPdf: null,
  instagramPostImage: null, // e.g. '/images/ip-eb-post.jpg'
};

/* ─── Shared Utilities ──────────────────────────────────────────────── */
const normalizeStatus = (s) => s?.trim().toUpperCase();

const getStatusColor = (status) => {
  const s = normalizeStatus(status);
  if (s === 'VACANT') return 'bg-green-500/10 text-green-400 border-green-500/30';
  if (s === 'ON-HOLD' || s === 'ON HOLD') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
  if (s === 'ALLOTTED') return 'bg-red-500/10 text-red-400 border-red-500/30';
  return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
};

const scrfLabels = {
  nca: "National Command Authority (NCA)",
  jfmc: "Joint Federal Millitary Command (JFMC)",
  iscia: "Internal Security and Counter-Insurgency Apparatus (ISCIA)",
  pcsl: "Political Consensus and State Legitimacy (PCSL)",
  srwe: "Strategic Resource & War Economy (SRWE)",
  isde: "International Strategy and Diplomatic Engagement (ISDE)",
  rocm: "Regional Operations and Caucasus Management (ROCM)"
};

/* ─── Portfolio Stats Counter ───────────────────────────────────────── */
const PortfolioStats = ({ items, color, accent }) => {
  if (!items || items.length === 0) return null;
  const total = items.length;
  const vacant = items.filter(i => normalizeStatus(i.status) === 'VACANT').length;
  const onHold = items.filter(i => ['ON-HOLD','ON HOLD'].includes(normalizeStatus(i.status))).length;
  const allotted = items.filter(i => normalizeStatus(i.status) === 'ALLOTTED').length;

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {[
        { label: 'Total', count: total, cls: 'bg-white/5 text-white border-white/20' },
        { label: 'Vacant', count: vacant, cls: 'bg-green-500/10 text-green-400 border-green-500/30' },
        { label: 'On Hold', count: onHold, cls: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' },
        { label: 'Allotted', count: allotted, cls: 'bg-red-500/10 text-red-400 border-red-500/30' },
      ].map(({ label, count, cls }) => (
        <div key={label} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold tracking-widest uppercase ${cls}`}>
          <span className="text-lg font-extrabold">{count}</span>
          <span className="opacity-70">{label}</span>
        </div>
      ))}
    </div>
  );
};

/* ─── Instagram Post Block ──────────────────────────────────────────── */
const InstagramPostBlock = ({ image, color, accent, label = "Executive Board" }) => (
  <div className="p-7 mt-px" style={{ background: colors.darkblue }}>
    <div className="flex items-center gap-4 mb-5">
      <p className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: accent }}>{label}</p>
      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
    <div className="max-w-sm mx-auto">
      {image ? (
        <div className="relative" style={{ aspectRatio: '1/1' }}>
          <img
            src={image}
            alt={label}
            className="w-full h-full object-cover rounded-lg border border-white/10"
          />
        </div>
      ) : (
        <div
          className="w-full rounded-lg border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-3 text-center p-8"
          style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.03)' }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ background: color + '22' }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs tracking-widest uppercase font-bold" style={{ color }}>Post Coming Soon</p>
          <p className="text-gray-600 text-xs">The {label} announcement post will appear here</p>
        </div>
      )}
    </div>
  </div>
);

/* ─── Committee Panel ─────────────────────────────────────────────── */
const CommitteePanel = ({ committee, isIP = false }) => {
  const { color, accent, banner, agenda, agendaDetail, bgPdf, portfolios, instagramPostImage } = committee;

  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const requiresFetch = ['unsc', 'unhrc', 'lok-sabha', 'scrf', 'uncsw', 'unga'].includes(committee.id);

  useEffect(() => {
    if (!requiresFetch) return;
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        let endpoint = '';
        if (committee.id === 'unsc') endpoint = '/api/portfolio';
        else if (committee.id === 'unhrc') endpoint = '/api/unhrc';
        else if (committee.id === 'lok-sabha') endpoint = '/api/loksabha';
        else if (committee.id === 'scrf') endpoint = '/api/scrf';
        else if (committee.id === 'uncsw') endpoint = '/api/uncsw';
        else if (committee.id === 'unga') endpoint = '/api/unga';

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

  // Flatten all items for stats
  const getAllItems = () => {
    if (!liveData) return portfolios;
    if (committee.id === 'unsc') return [...(liveData.permanent || []), ...(liveData.non_permanent || [])];
    if (committee.id === 'unhrc') return [...(liveData.members || []), ...(liveData.observers || [])];
    if (committee.id === 'scrf') return Object.values(liveData).flat();
    if (Array.isArray(liveData)) return liveData;
    return [];
  };

  const renderDynamicPortfolios = () => {
    if (loading) {
      return (
        <div className="text-center py-12 animate-pulse font-bold tracking-widest" style={{ color }}>
          LOADING DATABASE...
        </div>
      );
    }
    if (!liveData) return null;

    // UNSC
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

    // LOK SABHA
    if (committee.id === 'lok-sabha') {
      const list = filterList(liveData, 'portfolio', 'party');
      return (
        <div className="grid gap-2">
          {list.length > 0
            ? list.map((item, i) => <ListItem key={i} title={item.portfolio} subtitle={item.party || 'No Party Assigned'} status={item.status} subLabelColor={accent} />)
            : <div className="text-center py-8 text-gray-500 text-sm">No portfolios found.</div>
          }
        </div>
      );
    }

    // SCRF
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

    // UNHRC
    if (committee.id === 'unhrc') {
      const members = filterList(liveData?.members || [], 'country');
      const observers = filterList(liveData?.observers || [], 'country');
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg text-yellow-100 font-semibold mb-3">Members</h2>
            <div className="grid gap-2">
              {members.length > 0
                ? members.map((item, i) => <ListItem key={`member-${i}`} title={item.country} status={item.status} />)
                : <div className="text-gray-200 text-sm">No members found.</div>
              }
            </div>
          </div>
          <div>
            <h2 className="text-lg text-yellow-100 font-semibold mb-3">Observers</h2>
            <div className="grid gap-2">
              {observers.length > 0
                ? observers.map((item, i) => <ListItem key={`observer-${i}`} title={item.country} status={item.status} />)
                : <div className="text-gray-200 text-sm">No observers found.</div>
              }
            </div>
          </div>
        </div>
      );
    }

   // UNCSW — flat list of countries
    if (committee.id === 'uncsw') {
      const list = filterList(Array.isArray(liveData) ? liveData : (liveData.countries || liveData.members || []), 'portfolio');
      return (
        <div className="grid gap-2">
          {list.length > 0
            ? list.map((item, i) => <ListItem key={i} title={item.portfolio} status={item.status} />)
            : <div className="text-center py-8 text-gray-500 text-sm">No portfolios found.</div>
          }
        </div>
      );
    }

    // UNGA — flat list
    if (committee.id === 'unga') {
      const list = filterList(Array.isArray(liveData) ? liveData : (liveData.countries || liveData.members || []), 'portfolio');
      return (
        <div className="grid gap-2">
          {list.length > 0
            ? list.map((item, i) => <ListItem key={i} title={item.portfolio} status={item.status} />)
            : <div className="text-center py-8 text-gray-500 text-sm">No portfolios found.</div>
          }
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
      {/* Banner — responsive */}
      {banner ? (
        <div
          className="relative overflow-hidden"
          style={{
            borderLeft: `4px solid ${color}`,
            height: 'clamp(160px, 35vw, 320px)',
          }}
        >
          <img
            src={banner}
            alt={committee.name}
            className="w-full h-full object-cover object-center"
            style={{ display: 'block' }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${colors.darkblue}ee, ${colors.darkblue}44)` }} />
          <div className="absolute bottom-5 left-6">
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>{committee.name}</p>
            <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">{committee.full}</h3>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center px-6 py-6 sm:py-8" style={{ borderLeft: `4px solid ${color}`, background: `${color}10` }}>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>{committee.name}</p>
            <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">{committee.full}</h3>
          </div>
        </div>
      )}

      {/* Agenda + BG Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px mt-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="lg:col-span-2 p-5 sm:p-7" style={{ background: colors.darkblue }}>
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color }}>Agenda</p>
          {agenda ? (
            <>
              <p className="text-white text-base sm:text-lg font-semibold leading-snug">{agenda}</p>
              {agendaDetail && <p className="text-gray-400 text-sm mt-3 leading-relaxed">{agendaDetail}</p>}
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-gray-500 italic text-sm">Agenda to be announced — Coming Soon</span>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-7 flex flex-col" style={{ background: colors.darkblue }}>
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

      {/* ── Portfolio Section (not shown for IP) ── */}
      {!isIP && (
        <div className="p-5 sm:p-7 mt-px" style={{ background: colors.darkblue }}>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color }}>Portfolios & Status</p>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>

          {requiresFetch ? (
            <>
              {/* Stats */}
              {liveData && <PortfolioStats items={getAllItems()} color={color} accent={accent} />}

              {/* Search & Filter */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 mb-8">
                <input
                  type="text"
                  placeholder={`Search ${committee.name} entries...`}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg mb-4 focus:ring-2 outline-none transition-all text-sm text-white placeholder-gray-500"
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
            portfolios.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {portfolios.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }}
                    className="group relative overflow-hidden p-5 transition-all duration-300"
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
      )}

      {/* ── Instagram Post (EB) ── */}
      <InstagramPostBlock
        image={instagramPostImage}
        color={color}
        accent={accent}
        label="Executive Board"
      />
    </motion.div>
  );
};

/* ─── IP Committee Panel ─────────────────────────────────────────────── */
const IPPanel = ({ committee }) => {
  const { color, accent, banner, agenda, agendaDetail, bgPdf, instagramPostImage } = committee;

  return (
    <motion.div
      key="ip"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      {banner ? (
        <div
          className="relative overflow-hidden"
          style={{ borderLeft: `4px solid ${color}`, height: 'clamp(160px, 35vw, 320px)' }}
        >
          <img src={banner} alt="IP" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${colors.darkblue}ee, ${colors.darkblue}44)` }} />
          <div className="absolute bottom-5 left-6">
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>IP</p>
            <h3 className="text-white text-lg sm:text-xl font-bold">{committee.full}</h3>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center px-6 py-6 sm:py-8" style={{ borderLeft: `4px solid ${color}`, background: `${color}10` }}>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-bold mb-1" style={{ color }}>IP</p>
            <h3 className="text-white text-lg sm:text-xl font-bold">{committee.full}</h3>
          </div>
        </div>
      )}

      {/* Agenda + BG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px mt-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="lg:col-span-2 p-5 sm:p-7" style={{ background: colors.darkblue }}>
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color }}>Agenda</p>
          {agenda ? (
            <p className="text-white text-base sm:text-lg font-semibold leading-snug">{agenda}</p>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
              <span className="text-gray-500 italic text-sm">Agenda to be announced — Coming Soon</span>
            </div>
          )}
        </div>
        <div className="p-5 sm:p-7 flex flex-col" style={{ background: colors.darkblue }}>
          <p className="text-xs tracking-[0.3em] uppercase font-bold mb-3" style={{ color: accent }}>Background Guide</p>
          {bgPdf ? (
            <a href={bgPdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wider uppercase w-fit" style={{ background: accent, color: colors.darkblue }}>
              Download PDF
            </a>
          ) : (
            <div className="border border-dashed border-white/10 rounded p-5 text-center mt-2">
              <span className="text-gray-600 text-xs tracking-widest uppercase">Coming Soon</span>
            </div>
          )}
        </div>
      </div>

      {/* EB Post */}
      <InstagramPostBlock
        image={instagramPostImage}
        color={color}
        accent={accent}
        label="Executive Board"
      />
    </motion.div>
  );
};

/* ─── Main Page ─────────────────────────────────────────────────────── */
const NSUTMUNPage = () => {
    const visitCount = useVisitCounter();
  const [activeTab, setActiveTab] = useState(null);
  const [activeIP, setActiveIP] = useState(false);
  const committeeSectionRef = React.useRef(null);
  

  const handleTabClick = (id) => {
    if (id === 'ip') {
      if (activeIP) { setActiveIP(false); return; }
      setActiveTab(null);
      setActiveIP(true);
    } else {
      if (activeTab === id) { setActiveTab(null); return; }
      setActiveIP(false);
      setActiveTab(id);
    }
    setTimeout(() => {
      committeeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const activeCommittee = COMMITTEES.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.black }}>

      {/* ── Hero ── */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-screen">
        <div className="hidden md:block absolute inset-0 w-full h-full" style={{ backgroundImage: `url("/images/Dates Out.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="block md:hidden absolute inset-0 w-full h-full" style={{ backgroundImage: `url("/images/Dates Out(1).png")`, backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundColor: colors.black }} />
      </div>

      {/* ── Committees Section ── */}
      <div ref={committeeSectionRef} className={`${raleway.className} relative py-16 sm:py-20 px-4 sm:px-6`} style={{ backgroundColor: colors.darkblue }}>
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex flex-col gap-1">
              <div className="w-1.5 h-5" style={{ background: colors.orange }} />
              <div className="w-1.5 h-5" style={{ background: colors.red }} />
              <div className="w-1.5 h-5" style={{ background: colors.teal }} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Committees</h2>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${colors.orange}66, transparent)` }} />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ color: colors.orange }}>7 Councils</span>
          </div>
          <p className="text-gray-400 text-sm ml-5 mt-1">Select a committee to explore its agenda, portfolios, and executive board.</p>
        </div>

        {/* Main committee tabs */}
        <div className="max-w-6xl mx-auto mb-px">
          <div className="flex flex-wrap gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {COMMITTEES.map((c) => {
              const isActive = activeTab === c.id && !activeIP;
              return (
                <button
                  key={c.id}
                  onClick={() => handleTabClick(c.id)}
                  className="relative flex-1 min-w-[90px] sm:min-w-[110px] px-3 sm:px-4 py-4 text-left transition-all duration-300 overflow-hidden group"
                  style={{ background: isActive ? c.color : colors.darkblue }}
                >
                  {!isActive && <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: c.color + '18' }} />}
                  <span className="relative z-10 block text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase" style={{ color: isActive ? colors.darkblue : c.color }}>{c.name}</span>
                  <span className="relative z-10 block text-[10px] sm:text-xs mt-0.5 leading-tight hidden sm:block" style={{ color: isActive ? colors.darkblue + 'bb' : 'rgba(255,255,255,0.3)' }}>{c.full}</span>
                  <span className="absolute top-3 right-3 text-xs" style={{ color: isActive ? colors.darkblue + '88' : 'rgba(255,255,255,0.2)' }}>{isActive ? '▲' : '▼'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* IP tab — separated */}
        <div className="max-w-6xl mx-auto mt-2 mb-px">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">Press</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <button
            onClick={() => handleTabClick('ip')}
            className="relative w-full sm:w-auto min-w-[140px] px-5 py-4 text-left transition-all duration-300 overflow-hidden group"
            style={{ background: activeIP ? IP_COMMITTEE.color : colors.darkblue }}
          >
            {!activeIP && <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: IP_COMMITTEE.color + '18' }} />}
            <span className="relative z-10 block text-xs font-bold tracking-[0.2em] uppercase" style={{ color: activeIP ? colors.darkblue : IP_COMMITTEE.color }}>{IP_COMMITTEE.name}</span>
            <span className="relative z-10 block text-[10px] sm:text-xs mt-0.5 hidden sm:block" style={{ color: activeIP ? colors.darkblue + 'bb' : 'rgba(255,255,255,0.3)' }}>{IP_COMMITTEE.full}</span>
            <span className="absolute top-3 right-3 text-xs" style={{ color: activeIP ? colors.darkblue + '88' : 'rgba(255,255,255,0.2)' }}>{activeIP ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Panel */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeIP ? (
              <IPPanel key="ip" committee={IP_COMMITTEE} />
            ) : activeTab && activeCommittee ? (
              <CommitteePanel key={activeTab} committee={activeCommittee} />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center border border-dashed border-white/10">
                <p className="text-gray-600 text-sm tracking-widest uppercase">Select a committee above to explore</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Decorative top border */}
        <div className="w-full h-1" style={{ background: `linear-gradient(to right, ${colors.darkblue}, ${colors.orange}, ${colors.red})` }} />
      {/* ── About ── */}
      <div className={`${raleway.className} relative py-16 px-4 sm:px-6`} style={{ backgroundColor: colors.teal }}>
        
        <div className="max-w-4xl mx-auto pt-14">
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${colors.darkblue}88)` }} />
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">About <span style={{ color: colors.darkblue }}>NSUTMUN</span></h2>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${colors.orange}88)` }} />
          </div>
          <p className="text-gray-300 text-base sm:text-lg text-center mb-6 leading-relaxed">
            NSUT Model United Nations is an annual diplomacy conference hosted by Netaji Subhas University of Technology, bringing together students from across the nation to debate pressing global issues and develop solutions through international cooperation.
          </p>
          <p className="text-gray-100 text-base sm:text-lg text-center mb-12 leading-relaxed">
            With over 300 delegates participating each year, NSUTMUN provides a platform for students to enhance their diplomatic skills, critical thinking, and leadership abilities through simulated UN committee sessions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center">
            {[
              { title: '6+ Committees', desc: 'From UNSC to SCRF, participate in exciting committees covering diverse global issues', accent: colors.creme },
              { title: '300+ Delegates', desc: 'Connect with passionate delegates from top universities across India', accent: colors.orange },
              { title: '₹1,00,000+ in Prizes', desc: 'Compete for prestigious awards and cash prizes across all committees', accent: colors.red },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }}
                className="p-6 rounded-lg border border-white/10 relative overflow-hidden"
                style={{ backgroundColor: '#001929' }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: item.accent }} />
                <h3 className="text-xl font-bold mb-3" style={{ color: item.accent }}>{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={`${raleway.className} relative py-16 px-4 sm:px-6 text-center overflow-hidden`} style={{ backgroundColor: "#eae6e0" }}>
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 20% 50%, ${colors.teal} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${colors.orange} 0%, transparent 50%)` }} />
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, ${colors.red}, ${colors.orange}, ${colors.teal})` }} />

        <div className="relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase font-bold mb-3" style={{ color: colors.teal }}>NSUTMUN 2026</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            <span style={{ color: colors.orange }}> Ready to Join NSUTMUN 2026?</span>
          </h2>
          <p style={{ color: colors.darkblue }} className="text-lg sm:text-xl mb-10">Registration is now open for delegates and International Press!</p>

          {visitCount !== null && (
  <div className="flex items-center justify-center gap-2 mb-8">
    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: colors.teal }} />
    <p className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: colors.teal }}>
      {visitCount.toLocaleString()} visit{visitCount !== 1 ? 's' : ''} since launch
    </p>
    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: colors.teal }} />
  </div>
)}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/NSUTMUN_Brochure.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                className="px-7 py-3 rounded-lg text-base font-bold tracking-wide border-2 transition-all hover:scale-105"
                style={{ borderColor: colors.teal, color: colors.teal, backgroundColor: 'transparent' }}
              >
                Read Brochure
              </motion.button>
            </a>
            <Link target="_blank" href="https://linktr.ee/NSUTMUN?fbclid=PAZXh0bgNhZW0CMTEAAab1z41rxKMzK6Hy97OD43bgPMzsdyrpdZcLF6Bre_6wwKLYpudvTWeJTIg_aem_a-kq22oUb-bdQiq1np9buw">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                className="px-7 py-3 rounded-lg text-base font-bold tracking-wide transition-all hover:scale-105"
                style={{ backgroundColor: colors.orange, color: colors.darkblue }}
              >
                Register Now
              </motion.button>
            </Link>
            <Link target="_blank" href="https://www.instagram.com/nsutmodelun/">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                className="px-7 py-3 rounded-lg text-base font-bold tracking-wide border-2 transition-all hover:scale-105"
                style={{ borderColor: colors.red, color: colors.red, backgroundColor: 'transparent' }}
              >
                Follow Us
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NSUTMUNPage;
