import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Shield,
  HeartPulse,
  AlertTriangle,
  Search,
  FileDown,
  LayoutDashboard,
  Dumbbell,
  History,
  Menu,
  X,
  ChevronRight,
  UserCheck,
  Printer,
  Crosshair,
  Sparkles,
  Settings,
  Moon,
  Server,
  ShieldAlert,
  Users,
  Filter,
  ArrowUpDown
} from 'lucide-react';

// ============================================================================
// FASTAPI BACKEND CONFIGURATION (Preserves existing VITE_API_URL / localhost:8000)
// ============================================================================
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

// ============================================================================
// EXACT INDIAN ARMY CIRCULAR GOLD EMBLEM
// ============================================================================
const IndianArmyEmblem = ({ className = 'w-12 h-12', holographic = false }) => (
  <svg
    viewBox="0 0 360 360"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Indian Army Emblem"
  >
    <defs>
      <linearGradient id="armyGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F9DF9B" />
        <stop offset="35%" stopColor="#E6B856" />
        <stop offset="70%" stopColor="#C48F35" />
        <stop offset="100%" stopColor="#F5D380" />
      </linearGradient>
      <linearGradient id="bladeSheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF0B8" />
        <stop offset="50%" stopColor="#E2B04A" />
        <stop offset="100%" stopColor="#B8822A" />
      </linearGradient>
      <radialGradient id="emblemBg" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor={holographic ? '#151E15' : '#0D100D'} />
        <stop offset="100%" stopColor="#030403" />
      </radialGradient>
    </defs>

    <circle cx="180" cy="180" r="176" fill="url(#emblemBg)" />
    <circle cx="180" cy="180" r="168" fill="none" stroke="url(#armyGold)" strokeWidth="5.5" />
    <circle cx="180" cy="180" r="158" fill="none" stroke="url(#armyGold)" strokeWidth="3" />

    <g transform="translate(180, 94)" fill="url(#armyGold)">
      <path d="M-21 -12 C-34 -18 -42 -4 -38 12 C-34 24 -25 26 -20 18 Z" opacity="0.92" />
      <path d="M21 -12 C34 -18 42 -4 38 12 C34 24 25 26 20 18 Z" opacity="0.92" />
      <path d="M-19 -26 C-19 -44 19 -44 19 -26 L23 18 L-23 18 Z" />
      <circle cx="-8" cy="-31" r="2.2" fill="#090A08" />
      <circle cx="8" cy="-31" r="2.2" fill="#090A08" />
      <path d="M-4 -23 Q0 -19 4 -23" stroke="#090A08" strokeWidth="2.2" fill="none" />
      <path
        d="M-14 -14 Q0 -10 14 -14 M-15 -7 Q0 -3 15 -7 M-16 0 Q0 4 16 0 M-16 7 Q0 11 16 7"
        stroke="#090A08"
        strokeWidth="1.6"
        fill="none"
      />
      <rect x="-27" y="18" width="54" height="15" rx="3" />
      <circle cx="0" cy="25.5" r="6.5" fill="#090A08" />
      <circle cx="0" cy="25.5" r="5" fill="none" stroke="url(#armyGold)" strokeWidth="1.2" />
      <path
        d="M0 20.5 L0 30.5 M-5 25.5 L5 25.5 M-3.5 22 L3.5 29 M3.5 22 L-3.5 29"
        stroke="url(#armyGold)"
        strokeWidth="0.9"
      />
      <ellipse cx="-16" cy="25.5" rx="4.5" ry="2.5" fill="#090A08" />
      <ellipse cx="16" cy="25.5" rx="4.5" ry="2.5" fill="#090A08" />
      <rect x="-23" y="34" width="46" height="4.5" rx="2" />
    </g>

    <text
      x="180"
      y="151"
      textAnchor="middle"
      fill="url(#armyGold)"
      fontSize="15"
      fontWeight="700"
      letterSpacing="0.8"
      fontFamily="serif"
    >
      सत्यमेव जयते
    </text>

    <g stroke="#090A08" strokeWidth="1.2">
      <g transform="translate(180, 198) rotate(-37)">
        <path d="M-112 -4 L96 -4 L118 0 L96 4 L-112 4 Z" fill="url(#bladeSheen)" />
        <line x1="-108" y1="0" x2="90" y2="0" stroke="#7A5214" strokeWidth="1.1" />
        <rect x="-116" y="-18" width="6" height="36" rx="3" fill="url(#armyGold)" />
        <circle cx="-113" cy="-19" r="3.8" fill="url(#armyGold)" />
        <circle cx="-113" cy="19" r="3.8" fill="url(#armyGold)" />
        <rect x="-148" y="-4.8" width="32" height="9.6" rx="2" fill="url(#armyGold)" />
        <circle cx="-154" cy="0" r="7.5" fill="url(#armyGold)" />
        <circle cx="-154" cy="0" r="3.8" fill="#090A08" />
      </g>

      <g transform="translate(180, 198) rotate(37)">
        <path d="M-96 -4 L112 -4 L112 4 L-96 4 L-118 0 Z" fill="url(#bladeSheen)" />
        <line x1="-90" y1="0" x2="108" y2="0" stroke="#7A5214" strokeWidth="1.1" />
        <rect x="110" y="-18" width="6" height="36" rx="3" fill="url(#armyGold)" />
        <circle cx="113" cy="-19" r="3.8" fill="url(#armyGold)" />
        <circle cx="113" cy="19" r="3.8" fill="url(#armyGold)" />
        <rect x="116" y="-4.8" width="32" height="9.6" rx="2" fill="url(#armyGold)" />
        <circle cx="154" cy="0" r="7.5" fill="url(#armyGold)" />
        <circle cx="154" cy="0" r="3.8" fill="#090A08" />
      </g>
    </g>

    <line x1="126" y1="274" x2="170" y2="274" stroke="url(#armyGold)" strokeWidth="1.6" />
    <polygon points="180,267 183,272 188,274 183,276 180,281 177,276 172,274 177,272" fill="url(#armyGold)" />
    <line x1="190" y1="274" x2="234" y2="274" stroke="url(#armyGold)" strokeWidth="1.6" />

    <text
      x="180"
      y="309"
      textAnchor="middle"
      fill="url(#armyGold)"
      fontSize="26"
      fontWeight="800"
      letterSpacing="2.2"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      INDIAN ARMY
    </text>
  </svg>
);

// ============================================================================
// TELEMETRY RECORDS (Fallback Cache When Backend Is Offline)
// ============================================================================
// Live soldier records are loaded from the FastAPI backend. No mock records are used.
const EMPTY_SOLDIER = {
  soldier_id: '',
  name: 'Select a soldier',
  rank: 'Not Available',
  unit: 'Not Available',
  age: null,
  gender: 'Not Available',
  assessment_date: 'Not Available',
  readiness_score: null,
  readiness_status: 'Not Available',
  physical_fitness: {
    score: null, status: 'Not Available', bpt_result: 'Not Available',
    push_ups: { value: null, target: null, unit: 'reps' },
    pull_ups: { value: null, target: null, unit: 'reps' },
    sit_ups: { value: null, target: null, unit: 'reps' },
    plank: { value: null, target: null, unit: 'sec' }
  },
  health_recovery: {
    prediction: 'Not Available', sleep_duration: null, sleep_quality: null,
    daily_steps: null, stress_level: null, physical_activity: null, heart_rate: null
  },
  injury_risk: {
    classification: 'Not Available', probability: null,
    historical_injury: 'Not Available', primary_load_zone: 'Not Available',
    notes: 'No assessment data available.'
  },
  problem_areas: [],
  prediction_history: []
};

const extractSoldierDigits = (value) => {
  const upper = String(value || '').toUpperCase();
  const marker = 'SARTHI-';
  const lastMarkerIdx = upper.lastIndexOf(marker);
  const rawPart = lastMarkerIdx >= 0 ? upper.slice(lastMarkerIdx + marker.length) : upper;
  const digits = rawPart.replace(/\D/g, '').slice(0, 4);
  if (digits && Number(digits) > 2000) return '2000';
  return digits;
};

const formatSoldierId = (value) => {
  const digits = extractSoldierDigits(value);
  if (!digits) return '';
  return `SARTHI-${digits.padStart(4, '0')}`;
};

const normalizeGender = (value) => {
  const cleaned = String(value ?? '').trim().toLowerCase();
  if (!cleaned || cleaned === 'not available') return 'Not Available';
  if (cleaned === 'male' || cleaned === 'm') return 'Male';
  if (cleaned === 'female' || cleaned === 'f') return 'Female';
  return String(value).trim();
};

const getReadinessCategory = (status) => {
  const cleaned = String(status ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
  if (cleaned === 'combat ready' || cleaned === 'fit') return 'FIT';
  if (cleaned === 'conditionally ready' || cleaned === 'conditional') return 'CONDITIONAL';
  if (cleaned.startsWith('not combat ready') || cleaned === 'unfit') return 'UNFIT';
  return 'UNAVAILABLE';
};

const toFiniteNumber = (value) => {
  if (value === null || value === undefined || typeof value === 'boolean') return null;
  if (typeof value === 'string' && value.trim() === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const fetchWithTimeout = async (url, timeoutMs = 4000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

let cacheFetchPromise = null;
const fetchCachedRosterOnce = () => {
  if (!cacheFetchPromise) {
    cacheFetchPromise = fetch('/readiness-cache.json')
      .then(async (response) => {
        if (!response.ok) throw new Error(`Cached roster unavailable (HTTP ${response.status})`);
        return response.json();
      })
      .catch((error) => {
        cacheFetchPromise = null;
        throw error;
      });
  }
  return cacheFetchPromise;
};

let rosterFetchPromise = null;
const fetchReadinessDirectoryOnce = () => {
  if (!rosterFetchPromise) {
    rosterFetchPromise = fetchWithTimeout(`${API_BASE_URL}/readiness-directory`, 90000)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Roster API returned HTTP ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        rosterFetchPromise = null;
        throw error;
      });
  }
  return rosterFetchPromise;
};

// Converts the live roster or individual dashboard response to the UI view model.
function normalizeSoldierPayload(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const profile = raw.soldier || raw;
  const records = raw.health_and_fitness || {};
  const physical = raw.physical_fitness || records.physical_fitness || {};
  const health = raw.health_recovery || records.health_recovery || {};
  const injury = raw.injury_risk || raw.injury_records || records.injury_records || {};
  const readiness = raw.readiness || {};
  const fusion = raw.fusion || raw.fusion_result || {};
  const readinessScore = raw.readiness_score ?? readiness.score ?? fusion.readiness_score ?? null;
  const readinessStatus = raw.readiness_status ?? readiness.status ?? fusion.readiness_status ?? 'Not Available';
  const injuryProbability = raw.injury_probability ??
    readiness.details?.components?.injury_probability ??
    fusion.predictions?.injury_risk?.data?.injury_probability ?? null;
  const physicalPrediction = raw.physical_fitness_score ??
    readiness.details?.components?.physical_fitness ??
    raw.latest_prediction?.Model_1_Prediction ??
    fusion.predictions?.physical_fitness?.data?.predicted_fitness_score ?? null;
  const healthNormalized = readiness.details?.components?.health_recovery_normalized;
  const healthPrediction = fusion.predictions?.health_recovery?.data?.predicted_fitness_score ??
    (healthNormalized != null ? Number(healthNormalized) / 10 : null) ??
    raw.latest_prediction?.Model_2_Prediction ?? null;
  const rawInjuryPrediction = raw.injury_prediction ??
    raw.latest_prediction?.Model_3_Prediction ??
    fusion.predictions?.injury_risk?.data?.predicted_injury ?? null;
  const derivedInjuryFlag = rawInjuryPrediction ?? (
    String(readinessStatus).toLowerCase().includes('injury risk') ||
    (toFiniteNumber(injuryProbability) !== null && Number(injuryProbability) >= 50)
      ? 'Yes'
      : toFiniteNumber(injuryProbability) !== null
      ? 'No'
      : 'Not Available'
  );

  const numberOrNull = toFiniteNumber;
  const display = (value) => {
    if (value === null || value === undefined) return 'Not Available';
    const str = String(value).trim();
    return str === '' ? 'Not Available' : str;
  };

  const historical = raw.historical_injury_outcome?.data || {};
  const rawHistory = raw.prediction_history?.history || raw.prediction_history || [];
  const normalizedHistory = Array.isArray(rawHistory)
    ? rawHistory.map((row) => {
        if (!row || typeof row !== 'object') return row;
        if ('date' in row || 'readiness' in row) return row;
        const m1 = toFiniteNumber(row.Model_1_Prediction);
        const m3 = row.Model_3_Prediction;
        return {
          date: row.Prediction_Timestamp ? String(row.Prediction_Timestamp).replace('T', ' ').slice(0, 16) : 'Not Available',
          readiness: 'N/A',
          fitness: m1 != null ? Number(m1.toFixed(1)) : 'N/A',
          injury_prob: 'N/A',
          status: m3 === 'Yes' ? 'Risk Flagged' : m3 === 'No' ? 'No Risk Flag' : 'Recorded'
        };
      })
    : [];
  const normalizedProblemAreas = Array.isArray(raw.problem_areas)
    ? raw.problem_areas.map((item) => ({
        area: item.area || 'Alert',
        severity: item.severity ?? item.status ?? 'Monitor',
        metric: item.metric ?? item.message ?? '',
        recommendation: item.recommendation ?? item.note ?? ''
      }))
    : [];

  return {
    soldier_id: display(profile.Soldier_ID ?? profile.soldier_id ?? raw.soldier_id),
    name: display(profile.Soldier_Name ?? profile.name),
    rank: display(profile.Rank ?? profile.rank),
    unit: display(profile.Unit ?? profile.unit),
    age: numberOrNull(profile.Age ?? profile.age),
    gender: normalizeGender(profile.Gender ?? profile.gender),
    assessment_date: display(physical.Assessment_Date ?? raw.assessment_date),
    readiness_score: numberOrNull(readinessScore),
    readiness_status: display(readinessStatus),
    physical_fitness: {
      score: numberOrNull(physicalPrediction ?? physical.Physical_Fitness_Score ?? physical.score),
      status: display(physical.Fitness_Status ?? physical.status),
      bpt_result: physical.BPT_Time_Minutes == null ? 'Not Available' : `${physical.BPT_Time_Minutes} min`,
      push_ups: { value: numberOrNull(physical.Pushups_Count ?? physical.push_ups?.value), target: null, unit: 'reps' },
      pull_ups: { value: numberOrNull(physical.Pullups_Count ?? physical.pull_ups?.value), target: null, unit: 'reps' },
      sit_ups: { value: numberOrNull(physical.Situps_Count ?? physical.sit_ups?.value), target: null, unit: 'reps' },
      plank: { value: numberOrNull(physical.Plank_Time_Seconds ?? physical.plank?.value), target: null, unit: 'sec' }
    },
    health_recovery: {
      prediction: healthPrediction == null ? 'Not Available' : `${Number(healthPrediction).toFixed(2)} / 10`,
      sleep_duration: numberOrNull(health['Sleep Duration'] ?? health.sleep_duration),
      sleep_quality: display(health['Quality of Sleep'] ?? health['Sleep Quality'] ?? health.sleep_quality),
      daily_steps: numberOrNull(health['Daily Steps'] ?? health.daily_steps),
      stress_level: numberOrNull(health['Stress Level'] ?? health.stress_level),
      physical_activity: display(health['Physical Activity Level'] ?? health.physical_activity),
      heart_rate: numberOrNull(health['Heart Rate'] ?? health.heart_rate)
    },
    injury_risk: {
      classification: derivedInjuryFlag === 'Not Available' ? 'Not Available' : (String(derivedInjuryFlag).toLowerCase() === 'yes' ? 'Risk Flagged' : 'No Risk Flag'),
      probability: numberOrNull(injuryProbability),
      historical_injury: display(historical.Injury_Occurred ?? injury.Injury_Occurred ?? injury.historical_injury),
      primary_load_zone: display(historical.Injury_Body_Part ?? injury.Injury_Body_Part ?? injury.primary_load_zone),
      notes: 'ML research demonstration prediction; not a medical diagnosis.'
    },
    problem_areas: normalizedProblemAreas,
    prediction_history: normalizedHistory,
    assessment_available: raw.assessment_available ?? readiness.score != null
  };
}

// ============================================================================
// WOODLAND CAMOUFLAGE & TACTICAL BLACK BACKGROUND
// ============================================================================
const WoodlandCamoBackground = ({ cursorPos, isHovering, isDark }) => (
  <div
    className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#040507]' : 'bg-[#1A241B]'
    }`}
  >
    <svg
      className={`w-full h-full transition-all duration-300 ease-out ${
        isDark ? 'opacity-[0.07]' : 'opacity-45'
      }`}
      style={{
        transform: `translate3d(${(cursorPos.x - 600) * -0.01}px, ${(cursorPos.y - 400) * -0.01}px, 0) scale(1.03)`
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="indianArmyCamo" width="320" height="320" patternUnits="userSpaceOnUse">
          <rect width="320" height="320" fill="#4B6933" />
          <path d="M-15 35 C20 15, 78 30, 82 78 C86 125, 34 148, -10 130 Z" fill="#B7A777" />
          <path d="M175 68 C215 45, 275 65, 268 118 C262 162, 202 168, 178 132 C160 106, 152 82, 175 68 Z" fill="#B7A777" />
          <path d="M42 205 C95 190, 145 225, 132 272 C120 315, 55 318, 28 282 C5 252, 12 215, 42 205 Z" fill="#B7A777" />
          <path d="M245 235 C285 220, 330 245, 325 288 C318 322, 265 320, 242 292 Z" fill="#B7A777" />
          <path d="M112 102 C148 88, 178 106, 165 138 C154 166, 185 192, 212 212 C232 228, 210 268, 174 264 C138 260, 132 288, 95 282 C62 276, 56 242, 78 218 C98 196, 65 168, 84 142 C98 122, 90 110, 112 102 Z" fill="#4D3819" />
          <path d="M165 -12 C205 -15, 255 -5, 262 28 C268 58, 215 62, 185 42 C162 26, 145 5, 165 -12 Z" fill="#4D3819" />
          <ellipse cx="235" cy="96" rx="22" ry="18" fill="#4D3819" />
          <ellipse cx="26" cy="245" rx="11" ry="8" fill="#4D3819" />
          <path d="M192 -8 C242 -10, 315 15, 308 88 C302 142, 255 152, 218 148 C178 144, 162 178, 195 198 C225 216, 295 182, 318 218 L325 120 L315 -15 Z" fill="#172018" />
          <path d="M-8 72 C24 68, 48 92, 42 122 C36 148, 8 152, -12 138 Z" fill="#172018" />
          <path d="M52 278 C98 268, 152 292, 148 325 L45 325 Z" fill="#172018" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#indianArmyCamo)" />
    </svg>

    <div
      className="absolute inset-0 transition-opacity duration-300"
      style={{
        opacity: isHovering ? 1 : 0.35,
        background: `radial-gradient(360px circle at ${cursorPos.x}px ${cursorPos.y}px, ${
          isDark ? 'rgba(230, 184, 86, 0.09)' : 'rgba(230, 184, 86, 0.14)'
        }, transparent 75%)`
      }}
    />
  </div>
);

// ============================================================================
// CIRCULAR READINESS SCORE GAUGE
// ============================================================================
const ReadinessGauge = ({ score, status, isDark }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const numericScore = toFiniteNumber(score) ?? 0;
  const strokeDashoffset = circumference - (numericScore / 100) * circumference;

  const strokeColor =
    numericScore >= 80
      ? isDark
        ? '#68D391'
        : '#88B856'
      : numericScore >= 55
      ? '#E6B856'
      : '#F87171';

  return (
    <div className="relative flex flex-col items-center justify-center shrink-0">
      <svg className="w-36 h-36 -rotate-90" viewBox="0 0 132 132">
        <circle
          cx="66"
          cy="66"
          r={radius}
          fill="none"
          stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(216,200,155,0.22)'}
          strokeWidth="10"
        />
        <circle
          cx="66"
          cy="66"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold tracking-tight" style={{ color: strokeColor }}>
          {score ?? '--'}
        </span>
        <span
          className={`text-[10px] font-mono uppercase tracking-widest mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-[#C4BEA8]'
          }`}
        >
          / 100 INDEX
        </span>
      </div>
      <span className="mt-1 text-[11px] font-mono font-semibold tracking-wider uppercase text-[#E6B856]">
        {status}
      </span>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [showHologram, setShowHologram] = useState(true);
  const [holoFade, setHoloFade] = useState(false);
  const [bootStep, setBootStep] = useState(0);

  const [isDark, setIsDark] = useState(false);
  const [fontSizeMode, setFontSizeMode] = useState(() => {
    try {
      return window.localStorage.getItem('sarthi_font_size') || 'medium';
    } catch {
      return 'medium';
    }
  });
  const [activeNav, setActiveNav] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [ageFilter, setAgeFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('readiness_desc');
  const [rosterQuery, setRosterQuery] = useState('');

  const [recordsMap, setRecordsMap] = useState({});
  const [backendStatus, setBackendStatus] = useState('CHECKING');
  const [searchInput, setSearchInput] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const [cursorPos, setCursorPos] = useState({ x: 640, y: 360 });
  const [isHoveringApp, setIsHoveringApp] = useState(false);
  const appRef = useRef(null);

  const soldier = recordsMap[selectedId] || EMPTY_SOLDIER;

  // Load the 2,000-soldier roster immediately from the bundled snapshot and sync live FastAPI if reachable.
  useEffect(() => {
    let cancelled = false;

    const applyRosterItems = (items) => {
      const mapped = {};
      items.forEach((item) => {
        const normalized = normalizeSoldierPayload(item);
        if (normalized?.soldier_id && normalized.soldier_id !== 'Not Available') {
          mapped[normalized.soldier_id] = normalized;
        }
      });
      if (cancelled) return;
      setRecordsMap((previous) => ({ ...previous, ...mapped }));
      if (items.length > 0) {
        const first = items[0].soldier_id;
        setSelectedId((prev) => prev || first);
        setSearchInput((prev) => prev || extractSoldierDigits(first));
      }
    };

    const loadRoster = async () => {
      setBackendStatus('CHECKING');
      let loadedCache = false;
      try {
        const cachedPayload = await fetchCachedRosterOnce();
        const cachedItems = Array.isArray(cachedPayload.soldiers) ? cachedPayload.soldiers : [];
        if (cachedItems.length > 0) {
          applyRosterItems(cachedItems);
          loadedCache = true;
        }
      } catch {
        // Ignore cache error and rely on live API below.
      }

      try {
        const healthRes = await fetchWithTimeout(`${API_BASE_URL}/health`, 2500);
        if (!healthRes.ok) throw new Error(`Backend health HTTP ${healthRes.status}`);
        if (cancelled) return;
        setBackendStatus('CONNECTED');

        const livePayload = await fetchReadinessDirectoryOnce();
        const liveItems = Array.isArray(livePayload.soldiers) ? livePayload.soldiers : [];
        if (liveItems.length > 0) {
          applyRosterItems(liveItems);
        }
      } catch (error) {
        if (!cancelled) {
          setBackendStatus('STANDBY');
          if (!loadedCache) {
            setSearchError(`Unable to load soldier roster: ${error.message}`);
          }
        }
      }
    };

    loadRoster();
    return () => { cancelled = true; };
  }, []);

  const allSoldiersList = useMemo(() => Object.values(recordsMap), [recordsMap]);
  const fitCount = useMemo(
    () => allSoldiersList.filter((s) => getReadinessCategory(s.readiness_status) === 'FIT').length,
    [allSoldiersList]
  );
  const conditionalCount = useMemo(
    () => allSoldiersList.filter((s) => getReadinessCategory(s.readiness_status) === 'CONDITIONAL').length,
    [allSoldiersList]
  );
  const unfitCount = useMemo(
    () => allSoldiersList.filter((s) => getReadinessCategory(s.readiness_status) === 'UNFIT').length,
    [allSoldiersList]
  );

  // Apply roster filters and sorting without mutating the source dataset.
  const filteredSoldiers = useMemo(() => {
    const query = rosterQuery.trim().replace(/\s+/g, ' ').toLowerCase();
    const compareNumeric = (valA, valB, direction, idA, idB) => {
      const a = toFiniteNumber(valA);
      const b = toFiniteNumber(valB);
      if (a === null && b === null) return String(idA || '').localeCompare(String(idB || ''));
      if (a === null) return 1;
      if (b === null) return -1;
      const diff = direction === 'asc' ? a - b : b - a;
      return diff !== 0 ? diff : String(idA || '').localeCompare(String(idB || ''));
    };

    return allSoldiersList
      .filter((s) => {
        const category = getReadinessCategory(s.readiness_status);
        if (statusFilter === 'FIT' && category !== 'FIT') return false;
        if (statusFilter === 'CONDITIONAL' && category !== 'CONDITIONAL') return false;
        if (statusFilter === 'UNFIT' && category !== 'UNFIT') return false;
        if (genderFilter !== 'ALL' && normalizeGender(s.gender) !== genderFilter) return false;
        const age = toFiniteNumber(s.age);
        if (ageFilter === 'UNDER_28' && (age === null || age >= 28)) return false;
        if (ageFilter === '28_34' && (age === null || age < 28 || age > 34)) return false;
        if (ageFilter === '35_PLUS' && (age === null || age < 35)) return false;
        if (query) {
          const searchable = [s.name, s.soldier_id, s.rank, s.unit].filter(
            (v) => v && String(v).trim().toLowerCase() !== 'not available'
          );
          const match = searchable.some((v) => String(v).toLowerCase().includes(query));
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'readiness_desc') return compareNumeric(a.readiness_score, b.readiness_score, 'desc', a.soldier_id, b.soldier_id);
        if (sortBy === 'readiness_asc') return compareNumeric(a.readiness_score, b.readiness_score, 'asc', a.soldier_id, b.soldier_id);
        if (sortBy === 'age_asc') return compareNumeric(a.age, b.age, 'asc', a.soldier_id, b.soldier_id);
        if (sortBy === 'age_desc') return compareNumeric(a.age, b.age, 'desc', a.soldier_id, b.soldier_id);
        if (sortBy === 'injury_desc') return compareNumeric(a.injury_risk?.probability, b.injury_risk?.probability, 'desc', a.soldier_id, b.soldier_id);
        if (sortBy === 'name_asc') {
          const nameA = a.name && a.name !== 'Not Available' ? String(a.name).trim() : '';
          const nameB = b.name && b.name !== 'Not Available' ? String(b.name).trim() : '';
          if (!nameA && !nameB) return String(a.soldier_id || '').localeCompare(String(b.soldier_id || ''));
          if (!nameA) return 1;
          if (!nameB) return -1;
          const cmp = nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
          return cmp !== 0 ? cmp : String(a.soldier_id || '').localeCompare(String(b.soldier_id || ''));
        }
        return 0;
      });
  }, [allSoldiersList, statusFilter, genderFilter, ageFilter, rosterQuery, sortBy]);

  const hasActiveRosterFilters =
    statusFilter !== 'ALL' || genderFilter !== 'ALL' || ageFilter !== 'ALL' || rosterQuery.trim() !== '';

  const clearRosterFilters = () => {
    setStatusFilter('ALL');
    setGenderFilter('ALL');
    setAgeFilter('ALL');
    setRosterQuery('');
  };


  const triggerHologram = () => {
    setBootStep(0);
    setHoloFade(false);
    setShowHologram(true);
  };

  useEffect(() => {
    if (!showHologram) return;

    const t1 = setTimeout(() => setBootStep(1), 400);
    const t2 = setTimeout(() => setBootStep(2), 1100);
    const t3 = setTimeout(() => setBootStep(3), 1850);
    const t4 = setTimeout(() => setHoloFade(true), 3200);
    const t5 = setTimeout(() => {
      setShowHologram(false);
      setHoloFade(false);
    }, 3650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [showHologram]);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (!isHoveringApp) setIsHoveringApp(true);
  };

  const loadSoldierById = async (targetId) => {
    setIsSearching(true);
    setSearchError('');
    try {
      if (backendStatus === 'CONNECTED') {
        const response = await fetchWithTimeout(
          `${API_BASE_URL}/dashboard/${encodeURIComponent(targetId)}`,
          4000
        );
        if (response.status === 404) {
          const detail = await response.json().catch(() => ({}));
          throw new Error(detail.detail || `Soldier ID '${targetId}' not found`);
        }
        if (response.ok) {
          const dashboard = await response.json();
          const normalized = normalizeSoldierPayload(dashboard);
          if (!normalized) throw new Error('Backend returned an invalid soldier profile.');
          setRecordsMap((previous) => ({ ...previous, [normalized.soldier_id]: normalized }));
          setSelectedId(normalized.soldier_id);
          setSearchInput(extractSoldierDigits(normalized.soldier_id));
          setActiveNav('dashboard');
          return;
        }
      }
      throw new Error('OFFLINE_FALLBACK');
    } catch (error) {
      if (recordsMap[targetId] && (error.message === 'OFFLINE_FALLBACK' || error.name === 'AbortError' || error instanceof TypeError)) {
        if (backendStatus === 'CONNECTED') setBackendStatus('STANDBY');
        setSelectedId(targetId);
        setSearchInput(extractSoldierDigits(targetId));
        setActiveNav('dashboard');
      } else if (error.message === 'OFFLINE_FALLBACK' || error.name === 'AbortError' || error instanceof TypeError) {
        setSearchError(`Soldier ID '${targetId}' not found.`);
      } else {
        setSearchError(error.message || 'Unable to load soldier dashboard.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSoldierSearch = async (e) => {
    e.preventDefault();
    const digits = extractSoldierDigits(searchInput);
    const formattedId = formatSoldierId(digits);
    if (!formattedId) {
      setSearchError('Enter a Soldier ID.');
      return;
    }
    const numericId = Number(digits);
    if (!Number.isFinite(numericId) || numericId < 0 || numericId > 2000) {
      setSearchError('Soldier ID must be between 0 and 2000.');
      return;
    }
    await loadSoldierById(formattedId);
  };

  const handleInspectSoldier = async (soldierId) => {
    await loadSoldierById(soldierId);
  };

  const handleDownloadPdfReport = async () => {
    if (!soldier.soldier_id) {
      setSearchError('Select a soldier before generating a report.');
      return;
    }
    if (backendStatus !== 'CONNECTED') {
      setShowPdfPreview(true);
      return;
    }
    setIsDownloadingPdf(true);
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/soldiers/${encodeURIComponent(soldier.soldier_id)}/report`,
        6000
      );
      if (!response.ok) throw new Error(`PDF endpoint returned HTTP ${response.status}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `SARTHI_Readiness_Report_${soldier.soldier_id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      setShowPdfPreview(true);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const getStatusBadgeStyle = (status) => {
    if (status === 'Combat Ready') {
      return isDark
        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
        : 'bg-[#4B6933]/40 text-[#B8E68C] border-[#7AA84F]/60';
    }
    if (status === 'Conditionally Ready') {
      return isDark
        ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
        : 'bg-[#6E5320]/45 text-[#F6D37A] border-[#D9A74A]/60';
    }
    return 'bg-red-950/80 text-red-300 border-red-500/50';
  };

  const getSeverityBadgeStyle = (severity) => {
    if (severity === 'Critical' || severity === 'High') {
      return 'bg-red-950/75 text-red-300 border-red-500/40';
    }
    if (severity === 'Moderate') {
      return 'bg-amber-950/75 text-amber-300 border-amber-500/40';
    }
    return isDark
      ? 'bg-emerald-950/75 text-emerald-300 border-emerald-500/40'
      : 'bg-[#4B6933]/45 text-[#B8E68C] border-[#7AA84F]/50';
  };

  useEffect(() => {
    const sizeMap = { small: '14px', medium: '16px', large: '18px' };
    document.documentElement.style.fontSize = sizeMap[fontSizeMode] || '16px';
    try {
      window.localStorage.setItem('sarthi_font_size', fontSizeMode);
    } catch {
      // Ignore storage restrictions.
    }
  }, [fontSizeMode]);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'roster', label: 'Fit / Unfit Soldiers', icon: Users },
    { id: 'fitness', label: 'Physical Fitness', icon: Dumbbell },
    { id: 'health', label: 'Health & Recovery', icon: HeartPulse },
    { id: 'injury', label: 'Injury Risk & History', icon: AlertTriangle },
    { id: 'settings', label: 'Settings & Info', icon: Settings }
  ];

  const cardSurface = isDark
    ? 'bg-[#0B0E11]/95 border-white/10 hover:border-[#E6B856]/45 shadow-2xl'
    : 'bg-[#151E16]/90 border-[#B7A777]/25 hover:border-[#E6B856]/55 shadow-xl';

  const innerTileSurface = isDark
    ? 'bg-[#12161B] border-white/10 hover:border-[#E6B856]/35'
    : 'bg-[#1C271D]/90 border-[#B7A777]/20 hover:border-[#E6B856]/40';

  const primaryText = isDark ? 'text-slate-100' : 'text-[#F5F1E3]';
  const mutedText = isDark ? 'text-slate-400' : 'text-[#C4BEA8]';
  const goldAccent = 'text-[#F3CE78]';

  return (
    <div
      ref={appRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHoveringApp(false)}
      className={`min-h-screen overflow-x-clip flex flex-col lg:flex-row relative selection:bg-[#E6B856]/30 selection:text-white transition-colors duration-300 ${
        isDark ? 'bg-[#040507] text-slate-100' : 'bg-[#1A241B] text-[#F5F1E3]'
      }`}
    >
      <style>{`
        @keyframes holoSweep {
          0% { top: 6%; opacity: 0.2; }
          50% { top: 90%; opacity: 0.9; }
          100% { top: 6%; opacity: 0.2; }
        }
        @keyframes holoPulse {
          0%, 100% {
            filter: drop-shadow(0 0 12px rgba(230, 184, 86, 0.5))
                    drop-shadow(0 0 26px rgba(104, 168, 72, 0.35));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(249, 223, 155, 0.8))
                    drop-shadow(0 0 36px rgba(230, 184, 86, 0.45));
          }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .holo-scanlines {
          background: repeating-linear-gradient(
            to bottom,
            rgba(230, 184, 86, 0.05) 0px,
            rgba(230, 184, 86, 0.05) 1px,
            transparent 2px,
            transparent 4px
          );
        }
        .tactical-card {
          transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .tactical-card:hover {
          transform: translateY(-2px);
        }
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>

      <WoodlandCamoBackground cursorPos={cursorPos} isHovering={isHoveringApp} isDark={isDark} />

      {showHologram && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto transition-opacity duration-500 ${
            holoFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 42%, #0F1318 0%, #050608 72%, #020203 100%)'
              : 'radial-gradient(circle at 50% 42%, #1E291D 0%, #0B100B 72%, #050705 100%)'
          }}
        >
          <div className="absolute inset-0 holo-scanlines pointer-events-none opacity-65" />

          <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center my-auto py-4">
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[#E6B856]/40"
                style={{ animation: 'spinSlow 18s linear infinite' }}
              />
              <div
                className="absolute inset-2.5 rounded-full border border-[#88B856]/40"
                style={{ animation: 'spinReverse 12s linear infinite' }}
              />
              <div className="absolute -inset-2 rounded-full bg-[#E6B856]/15 blur-xl pointer-events-none" />

              <div
                className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden flex items-center justify-center border border-[#E6B856]/65"
                style={{ animation: 'holoPulse 2.6s ease-in-out infinite' }}
              >
                <IndianArmyEmblem className="w-full h-full" holographic={true} />
                <div className="absolute inset-0 holo-scanlines pointer-events-none" />
                <div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFF0B8] to-transparent shadow-[0_0_12px_#F9DF9B]"
                  style={{ animation: 'holoSweep 2.2s ease-in-out infinite' }}
                />
              </div>
            </div>

            <div className="w-40 h-2 -mt-1 rounded-full bg-gradient-to-r from-transparent via-[#E6B856]/55 to-transparent blur-[2px]" />

            <div
              className={`mt-5 transition-all duration-500 ${
                bootStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <h1
                className="text-3xl sm:text-4xl font-black tracking-[0.26em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF3C4] via-[#E6B856] to-[#B8822A]"
                style={{ textShadow: '0 0 24px rgba(230, 184, 86, 0.35)' }}
              >
                S.A.R.T.H.I.
              </h1>
              <p className="mt-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#D8C89B]">
                Soldier AI Readiness, Tracking, Health &amp; Intelligence
              </p>
            </div>

            <div
              className={`mt-4 transition-all duration-500 ${
                bootStep >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-[#E6B856]/55 bg-[#121912]/90 shadow-[0_0_20px_rgba(230,184,86,0.2)]">
                <span className="h-2 w-2 rounded-full bg-[#FF9933]" />
                <span className="text-sm sm:text-base font-extrabold tracking-[0.3em] text-[#FFF0B8]">
                  JAI HIND
                </span>
                <span className="h-2 w-2 rounded-full bg-[#138808]" />
              </div>
            </div>

            <div
              className={`mt-5 w-full max-w-xs transition-opacity duration-500 ${
                bootStep >= 3 ? 'opacity-100' : 'opacity-65'
              }`}
            >
              <div className="flex justify-between text-[10px] font-mono text-[#C4BEA8] mb-1.5">
                <span>DEFENCE TELEMETRY LINK</span>
                <span className="text-[#F3CE78]">
                  {bootStep >= 3 ? 'VERIFIED' : 'CALIBRATING...'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4B6933] via-[#E6B856] to-[#FFF0B8] transition-all duration-700"
                  style={{ width: bootStep === 0 ? '25%' : bootStep === 1 ? '55%' : bootStep === 2 ? '85%' : '100%' }}
                />
              </div>
            </div>

            <button
              onClick={() => setShowHologram(false)}
              className="mt-5 px-5 py-2 rounded-lg text-[11px] font-mono uppercase tracking-widest border border-[#E6B856]/45 text-[#F3CE78] bg-black/50 hover:bg-[#E6B856]/15 transition-colors cursor-pointer"
            >
              Enter Command Center &rarr;
            </button>
          </div>
        </div>
      )}

      {showPdfPreview && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-2xl w-full shadow-2xl border border-slate-300 overflow-hidden">
            <div className="bg-[#1C261B] text-[#F5F1E3] px-6 py-4 flex items-center justify-between border-b-2 border-[#E6B856]">
              <div className="flex items-center gap-3">
                <IndianArmyEmblem className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="font-bold text-sm tracking-wider uppercase text-[#F3CE78]">
                    S.A.R.T.H.I. Official Readiness Dossier
                  </h3>
                  <p className="text-xs text-[#C4BEA8]">
                    Indian Army AI/ML Soldier Readiness &amp; Intelligence System
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPdfPreview(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 cursor-pointer"
                aria-label="Close Report Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm max-h-[75vh] overflow-y-auto">
              <div className="flex flex-wrap justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Soldier Identification</p>
                  <p className="text-lg font-bold text-slate-900">{soldier.name}</p>
                  <p className="text-slate-600 font-mono text-xs">
                    ID: {soldier.soldier_id} | {soldier.rank} | {soldier.unit}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-bold rounded bg-[#273823] text-[#F3CE78]">
                    {soldier.readiness_status} ({soldier.readiness_score}/100)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Physical Fitness</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {soldier.physical_fitness.score}/100 ({soldier.physical_fitness.status})
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{soldier.physical_fitness.bpt_result}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Health &amp; Recovery</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {soldier.health_recovery.prediction}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Sleep: {soldier.health_recovery.sleep_duration}h | HR: {soldier.health_recovery.heart_rate} BPM
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">ML Injury Risk</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {soldier.injury_risk.classification} ({soldier.injury_risk.probability}%)
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{soldier.injury_risk.primary_load_zone}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1.5">
                  Clinical &amp; Command Observations
                </p>
                <p className="text-slate-700 text-xs leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {soldier.injury_risk.notes}
                </p>
              </div>
            </div>

            <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-semibold">JAI HIND — S.A.R.T.H.I. TELEMETRY</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#273823] text-[#F3CE78] hover:bg-[#32472D] flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside
        className={`no-print z-20 w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-b lg:border-b-0 lg:border-r backdrop-blur-md flex flex-col justify-between transition-colors duration-300 ${
          isDark
            ? 'bg-[#080A0D]/95 border-white/10'
            : 'bg-[#121913]/95 border-[#B7A777]/25'
        }`}
      >
        <div>
          <div
            className={`px-4 py-4 border-b flex items-center justify-between gap-2 ${
              isDark ? 'border-white/10' : 'border-[#B7A777]/20'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-full shrink-0 border border-[#E6B856]/65 shadow-[0_0_14px_rgba(230,184,86,0.2)] overflow-hidden">
                <IndianArmyEmblem className="w-full h-full" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-[0.14em] text-[#F3CE78] truncate">
                    S.A.R.T.H.I.
                  </span>
                </div>
                <p className={`text-[10px] font-mono tracking-wider uppercase truncate mt-0.5 ${mutedText}`}>
                  Indian Army
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border shrink-0 cursor-pointer ${
                isDark
                  ? 'border-white/15 text-slate-300 hover:bg-white/10'
                  : 'border-[#B7A777]/30 text-[#D8C89B] hover:bg-white/5'
              }`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block p-3 space-y-1.5`}>
            <p className={`px-3 pt-1 pb-2 text-[10px] font-mono uppercase tracking-widest ${mutedText}`}>
              Tactical Intelligence
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-[#E6B856]/15 text-[#F3CE78] border border-[#E6B856]/45'
                        : 'bg-[#4B6933]/55 text-[#FFF0B8] border border-[#E6B856]/45 shadow-md'
                      : isDark
                      ? 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                      : 'text-[#D8C89B] hover:bg-[#4B6933]/25 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#F3CE78]' : isDark ? 'text-slate-400' : 'text-[#A4B88E]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.id === 'roster' ? (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-black/35 text-[#F3CE78] border border-[#E6B856]/30 shrink-0">
                      {allSoldiersList.length}
                    </span>
                  ) : (
                    isActive && <ChevronRight className="w-3.5 h-3.5 text-[#F3CE78] shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div
          className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block p-3 border-t ${
            isDark ? 'border-white/10' : 'border-[#B7A777]/20'
          }`}
        >
          <div
            className={`p-3 rounded-lg border text-[11px] font-mono space-y-1.5 ${
              isDark ? 'bg-[#101419] border-white/10' : 'bg-[#1A241B]/90 border-[#B7A777]/25'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`flex items-center gap-1.5 ${mutedText}`}>
                <Crosshair className="w-3.5 h-3.5 text-[#E6B856]" />
                GRID TRACK
              </span>
              <span className="text-[#F3CE78]">
                {Math.round(cursorPos.x)}:{Math.round(cursorPos.y)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={mutedText}>FASTAPI LINK</span>
              <span
                className={`flex items-center gap-1.5 ${
                  backendStatus === 'CONNECTED' ? 'text-emerald-400' : 'text-[#E6B856]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    backendStatus === 'CONNECTED' ? 'bg-emerald-400' : 'bg-[#E6B856]'
                  }`}
                />
                {backendStatus === 'CONNECTED' ? 'ONLINE' : 'CACHE READY'}
              </span>
            </div>
            <div className={`pt-1.5 mt-1.5 border-t text-center text-[10px] tracking-wide opacity-80 ${isDark ? 'border-white/10 text-slate-400' : 'border-[#B7A777]/20 text-[#C4BEA8]'}`}>
              Made by <span className="text-[#F3CE78] font-semibold">Nishreyash Tripathi</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col z-10">
        <header
          className={`no-print sticky top-0 z-20 backdrop-blur-md border-b px-4 sm:px-6 py-3.5 transition-colors duration-300 ${
            isDark
              ? 'bg-[#080A0D]/90 border-white/10'
              : 'bg-[#121913]/90 border-[#B7A777]/25'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className={`text-base sm:text-lg font-extrabold tracking-wide uppercase ${goldAccent}`}>
                  {navItems.find((n) => n.id === activeNav)?.label || 'Overview'}
                </h2>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${
                    isDark
                      ? 'bg-white/5 text-slate-300 border-white/15'
                      : 'bg-[#4B6933]/45 text-[#B8E68C] border-[#7AA84F]/50'
                  }`}
                >
                  JAI HIND
                </span>
              </div>
              <p className={`text-xs truncate ${mutedText}`}>
                Soldier AI Readiness, Tracking, Health &amp; Intelligence
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <form onSubmit={handleSoldierSearch} className="flex items-center gap-1.5 w-full sm:w-auto sm:flex-initial">
                <div
                  className={`flex items-center flex-1 sm:w-52 px-3 py-1.5 rounded-lg text-xs font-mono border focus-within:border-[#E6B856] transition-colors ${
                    isDark
                      ? 'bg-[#11151A] border-white/15 text-slate-100'
                      : 'bg-[#1D271E] border-[#B7A777]/30 text-[#F5F1E3]'
                  }`}
                >
                  <Search className={`w-4 h-4 shrink-0 mr-2 ${mutedText}`} />
                  <span className="select-none font-mono font-semibold text-[#F3CE78] shrink-0">
                    SARTHI-
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={searchInput}
                    onChange={(e) => setSearchInput(extractSoldierDigits(e.target.value))}
                    placeholder="0001"
                    aria-label="Search Soldier ID"
                    className={`w-full min-w-0 bg-transparent text-xs font-mono focus:outline-none ${
                      isDark
                        ? 'text-slate-100 placeholder-slate-500'
                        : 'text-[#F5F1E3] placeholder-[#C4BEA8]/60'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/15 text-[#F3CE78] border-white/15'
                      : 'bg-[#4B6933] hover:bg-[#5B7E3E] text-[#FFF0B8] border-[#7AA84F]/60'
                  }`}
                >
                  {isSearching ? '...' : 'Search'}
                </button>
              </form>

              <button
                onClick={() => setIsDark(!isDark)}
                title="Switch between Dark Olive Camo and Stealth Black Dark Mode"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isDark
                    ? 'bg-[#E6B856]/15 border-[#E6B856]/45 text-[#F3CE78] hover:bg-[#E6B856]/25'
                    : 'bg-[#1D271E] border-[#B7A777]/30 text-[#D8C89B] hover:border-[#E6B856]/60'
                }`}
              >
                {isDark ? (
                  <>
                    <Shield className="w-3.5 h-3.5 text-[#88B856]" />
                    <span>Dark Olive</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#E6B856]" />
                    <span>Black Dark</span>
                  </>
                )}
              </button>

              <button
                onClick={triggerHologram}
                title="Replay Indian Army Hologram"
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isDark
                    ? 'bg-[#11151A] border-white/15 text-slate-300 hover:border-[#E6B856]/50'
                    : 'bg-[#1D271E] border-[#B7A777]/30 text-[#D8C89B] hover:border-[#E6B856]/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E6B856]" />
                <span className="hidden sm:inline">Hologram</span>
              </button>

              <button
                onClick={handleDownloadPdfReport}
                disabled={isDownloadingPdf}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E6B856] hover:bg-[#F3CE78] text-[#141913] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{isDownloadingPdf ? 'Exporting...' : 'PDF Report'}</span>
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-2.5 flex items-center gap-2 flex-wrap text-xs">
            <span className={`font-mono text-[10px] uppercase tracking-wider ${mutedText}`}>
              Active Dossier:
            </span>
            {selectedId && recordsMap[selectedId] ? (
              <span className="px-2.5 py-0.5 rounded font-mono text-[11px] border border-[#E6B856]/60 bg-[#4B6933]/45 text-[#FFF0B8]">
                {recordsMap[selectedId].soldier_id} &bull; {String(recordsMap[selectedId].readiness_status || 'Not Available').split(' ')[0]}
              </span>
            ) : (
              <span className={`text-[11px] ${mutedText}`}>No soldier selected</span>
            )}
          </div>

          {searchError && (
            <div className="max-w-7xl mx-auto mt-2.5 px-3 py-1.5 rounded-lg bg-red-950/85 border border-red-500/45 text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{searchError}</span>
            </div>
          )}
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
          {activeNav !== 'settings' && activeNav !== 'roster' && (
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-5">
              <div
                className={`tactical-card xl:col-span-8 backdrop-blur-md rounded-xl p-5 border flex flex-col justify-between ${cardSurface}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${
                        isDark
                          ? 'bg-white/5 border-white/15 text-[#F3CE78]'
                          : 'bg-[#4B6933]/45 border-[#E6B856]/45 text-[#F3CE78]'
                      }`}
                    >
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-[11px] font-mono font-semibold rounded border ${
                            isDark
                              ? 'bg-white/5 text-[#F3CE78] border-white/15'
                              : 'bg-[#4D3819]/65 text-[#F3CE78] border-[#E6B856]/45'
                          }`}
                        >
                          {soldier.soldier_id}
                        </span>
                      </div>
                      <h1 className={`text-xl sm:text-2xl font-extrabold mt-1.5 truncate ${primaryText}`}>
                        {soldier.name}
                      </h1>
                      <p className={`text-xs sm:text-sm mt-0.5 truncate ${mutedText}`}>{soldier.unit}</p>
                    </div>
                  </div>

                  <span
                    className={`self-start max-w-full whitespace-normal sm:whitespace-nowrap text-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border shrink-0 ${getStatusBadgeStyle(
                      soldier.readiness_status
                    )}`}
                  >
                    {soldier.readiness_status}
                  </span>
                </div>

                <div
                  className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t text-xs ${
                    isDark ? 'border-white/10' : 'border-[#B7A777]/20'
                  }`}
                >
                  <div>
                    <p className={`font-mono uppercase text-[10px] ${mutedText}`}>Rank</p>
                    <p className={`font-bold mt-0.5 ${goldAccent}`}>{soldier.rank}</p>
                  </div>
                  <div>
                    <p className={`font-mono uppercase text-[10px] ${mutedText}`}>Age</p>
                    <p className={`font-bold mt-0.5 ${primaryText}`}>
                      {soldier.age == null ? 'N/A' : `${soldier.age} Yrs`}
                    </p>
                  </div>
                  <div>
                    <p className={`font-mono uppercase text-[10px] ${mutedText}`}>Gender</p>
                    <p className={`font-bold mt-0.5 ${primaryText}`}>{soldier.gender}</p>
                  </div>
                  <div>
                    <p className={`font-mono uppercase text-[10px] ${mutedText}`}>Historical Injury</p>
                    <p className={`font-bold mt-0.5 truncate ${primaryText}`} title={soldier.injury_risk.historical_injury}>
                      {soldier.injury_risk.historical_injury}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`tactical-card xl:col-span-4 backdrop-blur-md rounded-xl p-5 border flex flex-col items-center justify-center text-center ${cardSurface}`}
              >
                <p className={`text-xs font-mono uppercase tracking-widest mb-2 ${goldAccent}`}>
                  Overall AI Readiness Score
                </p>
                <ReadinessGauge
                  score={soldier.readiness_score}
                  status={soldier.readiness_status}
                  isDark={isDark}
                />
                <p className={`text-xs mt-2.5 leading-relaxed ${mutedText}`}>
                  Composite index across Physical ({soldier.physical_fitness.score}/100), Recovery &amp; Injury Risk ({soldier.injury_risk.probability}%).
                </p>
              </div>
            </section>
          )}

          {activeNav === 'dashboard' && (
            <>
              <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div
                  onClick={() => setActiveNav('fitness')}
                  className={`tactical-card backdrop-blur-md rounded-xl p-5 border cursor-pointer ${cardSurface}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono uppercase ${mutedText}`}>Physical Fitness</span>
                    <Dumbbell className="w-4 h-4 text-[#88B856]" />
                  </div>
                  <div className="mt-2.5 flex items-baseline justify-between">
                    <span className={`text-2xl font-extrabold ${primaryText}`}>
                      {soldier.physical_fitness.score}{' '}
                      <span className={`text-xs font-normal ${mutedText}`}>/ 100</span>
                    </span>
                    <span className="text-xs font-bold text-[#88B856]">
                      {soldier.physical_fitness.status}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-black/40 rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-[#7AA84F] rounded-full transition-all duration-500"
                      style={{ width: `${soldier.physical_fitness.score}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-3 font-mono truncate ${mutedText}`}>
                    BPT: {soldier.physical_fitness.bpt_result}
                  </p>
                </div>

                <div
                  onClick={() => setActiveNav('health')}
                  className={`tactical-card backdrop-blur-md rounded-xl p-5 border cursor-pointer ${cardSurface}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono uppercase ${mutedText}`}>Health &amp; Recovery</span>
                    <HeartPulse className="w-4 h-4 text-[#E6B856]" />
                  </div>
                  <div className="mt-2.5">
                    <span className={`text-lg font-extrabold ${primaryText}`}>
                      {soldier.health_recovery.prediction}
                    </span>
                  </div>
                  <div className={`grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t text-xs ${isDark ? 'border-white/10' : 'border-[#B7A777]/20'}`}>
                    <div>
                      <span className={mutedText}>Sleep: </span>
                      <span className={`font-bold ${primaryText}`}>{soldier.health_recovery.sleep_duration}h</span>
                    </div>
                    <div>
                      <span className={mutedText}>Resting HR: </span>
                      <span className={`font-bold ${primaryText}`}>{soldier.health_recovery.heart_rate} BPM</span>
                    </div>
                  </div>
                  <p className={`text-xs mt-2 truncate ${mutedText}`}>
                    Stress: {soldier.health_recovery.stress_level}
                  </p>
                </div>

                <div
                  onClick={() => setActiveNav('injury')}
                  className={`tactical-card backdrop-blur-md rounded-xl p-5 border cursor-pointer ${cardSurface}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono uppercase ${mutedText}`}>Injury Risk Prediction</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="mt-2.5 flex items-baseline justify-between">
                    <span className={`text-2xl font-extrabold ${primaryText}`}>
                      {soldier.injury_risk.probability}%
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        soldier.injury_risk.probability >= 60
                          ? 'text-red-400'
                          : soldier.injury_risk.probability >= 35
                          ? 'text-[#E6B856]'
                          : 'text-[#88B856]'
                      }`}
                    >
                      {soldier.injury_risk.classification}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-black/40 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        soldier.injury_risk.probability >= 60
                          ? 'bg-red-500'
                          : soldier.injury_risk.probability >= 35
                          ? 'bg-[#E6B856]'
                          : 'bg-[#7AA84F]'
                      }`}
                      style={{ width: `${soldier.injury_risk.probability}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-3 truncate ${mutedText}`}>
                    Focus: {soldier.injury_risk.primary_load_zone}
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className={`tactical-card lg:col-span-6 backdrop-blur-md rounded-xl p-5 border ${cardSurface}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-sm font-extrabold uppercase tracking-wider ${goldAccent}`}>
                        Important Problem Areas
                      </h3>
                      <p className={`text-xs ${mutedText}`}>
                        AI-detected physiological &amp; biomechanical flags
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-mono rounded bg-[#4D3819]/75 text-[#F3CE78] border border-[#E6B856]/40">
                      {soldier.problem_areas.length} Flagged
                    </span>
                  </div>

                  <div className="space-y-3">
                    {soldier.problem_areas.map((item, idx) => (
                      <div key={idx} className={`p-3.5 rounded-lg border transition-colors ${innerTileSurface}`}>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`font-bold text-sm ${primaryText}`}>{item.area}</h4>
                          <span className={`px-2 py-0.5 text-[11px] font-semibold rounded border shrink-0 ${getSeverityBadgeStyle(item.severity)}`}>
                            {item.severity}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-[#F3CE78] mt-1">{item.metric}</p>
                        <p className={`text-xs mt-1.5 leading-relaxed ${mutedText}`}>
                          Action: {item.recommendation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`tactical-card lg:col-span-6 backdrop-blur-md rounded-xl p-5 border ${cardSurface}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-sm font-extrabold uppercase tracking-wider ${goldAccent}`}>
                        Prediction History
                      </h3>
                      <p className={`text-xs ${mutedText}`}>
                        Longitudinal readiness &amp; injury risk assessments
                      </p>
                    </div>
                    <History className="w-4 h-4 text-[#E6B856]" />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className={`border-b font-mono uppercase text-[11px] ${isDark ? 'border-white/10 text-slate-400' : 'border-[#B7A777]/20 text-[#C4BEA8]'}`}>
                          <th className="py-2.5 pr-3">Date</th>
                          <th className="py-2.5 px-3">Readiness</th>
                          <th className="py-2.5 px-3">Fitness</th>
                          <th className="py-2.5 px-3">Injury %</th>
                          <th className="py-2.5 pl-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-[#B7A777]/15'}`}>
                        {soldier.prediction_history.length === 0 ? (
                          <tr>
                            <td colSpan={5} className={`py-4 text-center ${mutedText}`}>
                              No prediction history recorded for this soldier.
                            </td>
                          </tr>
                        ) : (
                          soldier.prediction_history.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className={`py-2.5 pr-3 font-mono ${primaryText}`}>{row.date}</td>
                              <td className="py-2.5 px-3 font-bold text-[#F3CE78]">
                                {row.readiness === 'N/A' || row.readiness == null ? 'N/A' : `${row.readiness}/100`}
                              </td>
                              <td className={`py-2.5 px-3 ${mutedText}`}>
                                {row.fitness === 'N/A' || row.fitness == null ? 'N/A' : `${row.fitness}/100`}
                              </td>
                              <td className={`py-2.5 px-3 font-mono ${primaryText}`}>
                                {row.injury_prob === 'N/A' || row.injury_prob == null ? 'N/A' : `${row.injury_prob}%`}
                              </td>
                              <td className="py-2.5 pl-3 text-right">
                                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadgeStyle(row.status)}`}>
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeNav === 'roster' && (
            <section className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`tactical-card p-4 rounded-xl border text-left cursor-pointer ${
                    statusFilter === 'ALL'
                      ? 'border-[#E6B856] bg-[#E6B856]/15'
                      : cardSurface
                  }`}
                >
                  <p className={`text-[11px] font-mono uppercase ${mutedText}`}>Total Battalion</p>
                  <p className={`text-2xl font-black mt-1 ${primaryText}`}>{allSoldiersList.length}</p>
                  <p className="text-[11px] text-[#F3CE78] mt-1">All Assessed Personnel</p>
                </button>

                <button
                  onClick={() => setStatusFilter('FIT')}
                  className={`tactical-card p-4 rounded-xl border text-left cursor-pointer ${
                    statusFilter === 'FIT'
                      ? 'border-emerald-400 bg-emerald-950/60'
                      : cardSurface
                  }`}
                >
                  <p className={`text-[11px] font-mono uppercase ${mutedText}`}>Fit (Combat Ready)</p>
                  <p className="text-2xl font-black mt-1 text-emerald-400">{fitCount}</p>
                  <p className="text-[11px] text-emerald-300/80 mt-1">Cleared for Deployment</p>
                </button>

                <button
                  onClick={() => setStatusFilter('CONDITIONAL')}
                  className={`tactical-card p-4 rounded-xl border text-left cursor-pointer ${
                    statusFilter === 'CONDITIONAL'
                      ? 'border-amber-400 bg-amber-950/60'
                      : cardSurface
                  }`}
                >
                  <p className={`text-[11px] font-mono uppercase ${mutedText}`}>Conditionally Ready</p>
                  <p className="text-2xl font-black mt-1 text-[#E6B856]">{conditionalCount}</p>
                  <p className="text-[11px] text-[#F3CE78]/80 mt-1">Monitored / Light Duty</p>
                </button>

                <button
                  onClick={() => setStatusFilter('UNFIT')}
                  className={`tactical-card p-4 rounded-xl border text-left cursor-pointer ${
                    statusFilter === 'UNFIT'
                      ? 'border-red-400 bg-red-950/60'
                      : cardSurface
                  }`}
                >
                  <p className={`text-[11px] font-mono uppercase ${mutedText}`}>Unfit (Not Ready)</p>
                  <p className="text-2xl font-black mt-1 text-red-400">{unfitCount}</p>
                  <p className="text-[11px] text-red-300/80 mt-1">Medical Hold / Rehab</p>
                </button>
              </div>

              <div className={`backdrop-blur-md rounded-xl p-5 border space-y-4 ${cardSurface}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#E6B856]" />
                    <h3 className={`text-sm font-extrabold uppercase tracking-wider ${goldAccent}`}>
                      Filter &amp; Sort Soldiers Roster
                    </h3>
                  </div>

                  <div className="relative w-full lg:w-64">
                    <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${mutedText}`} />
                    <input
                      type="text"
                      value={rosterQuery}
                      onChange={(e) => setRosterQuery(e.target.value)}
                      placeholder="Filter name, rank, unit, ID..."
                      className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border focus:outline-none focus:border-[#E6B856] ${
                        isDark
                          ? 'bg-[#11151A] border-white/15 text-slate-100 placeholder-slate-500'
                          : 'bg-[#1D271E] border-[#B7A777]/30 text-[#F5F1E3] placeholder-[#C4BEA8]/60'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className={`flex items-center h-4 font-mono text-[10px] uppercase mb-1 ${mutedText}`}>
                      Fitness / Readiness Status
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border font-semibold focus:outline-none focus:border-[#E6B856] cursor-pointer ${
                        isDark
                          ? 'bg-[#11151A] border-white/15 text-slate-100'
                          : 'bg-[#1D271E] border-[#B7A777]/30 text-[#F5F1E3]'
                      }`}
                    >
                      <option value="ALL">All Soldiers ({allSoldiersList.length})</option>
                      <option value="FIT">Fit — Combat Ready ({fitCount})</option>
                      <option value="CONDITIONAL">Conditionally Ready ({conditionalCount})</option>
                      <option value="UNFIT">Unfit — Not Combat Ready ({unfitCount})</option>
                    </select>
                  </div>

                  <div>
                    <label className={`flex items-center h-4 font-mono text-[10px] uppercase mb-1 ${mutedText}`}>
                      Gender
                    </label>
                    <select
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border font-semibold focus:outline-none focus:border-[#E6B856] cursor-pointer ${
                        isDark
                          ? 'bg-[#11151A] border-white/15 text-slate-100'
                          : 'bg-[#1D271E] border-[#B7A777]/30 text-[#F5F1E3]'
                      }`}
                    >
                      <option value="ALL">All Genders (Male &amp; Female)</option>
                      <option value="Male">Male Personnel</option>
                      <option value="Female">Female Personnel</option>
                    </select>
                  </div>

                  <div>
                    <label className={`flex items-center h-4 font-mono text-[10px] uppercase mb-1 ${mutedText}`}>
                      Age Group
                    </label>
                    <select
                      value={ageFilter}
                      onChange={(e) => setAgeFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border font-semibold focus:outline-none focus:border-[#E6B856] cursor-pointer ${
                        isDark
                          ? 'bg-[#11151A] border-white/15 text-slate-100'
                          : 'bg-[#1D271E] border-[#B7A777]/30 text-[#F5F1E3]'
                      }`}
                    >
                      <option value="ALL">All Ages</option>
                      <option value="UNDER_28">Under 28 Years</option>
                      <option value="28_34">28 – 34 Years</option>
                      <option value="35_PLUS">35+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className={`flex items-center h-4 font-mono text-[10px] uppercase mb-1 ${mutedText}`}>
                      <span className="inline-flex items-center gap-1">
                        <ArrowUpDown className="w-3 h-3 text-[#E6B856]" />
                        Sort By Factor
                      </span>
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border font-semibold focus:outline-none focus:border-[#E6B856] cursor-pointer ${
                        isDark
                          ? 'bg-[#11151A] border-white/15 text-slate-100'
                          : 'bg-[#1D271E] border-[#B7A777]/30 text-[#F5F1E3]'
                      }`}
                    >
                      <option value="readiness_desc">Readiness Score (Highest &rarr; Lowest)</option>
                      <option value="readiness_asc">Readiness Score (Lowest &rarr; Highest)</option>
                      <option value="age_asc">Age (Youngest &rarr; Oldest)</option>
                      <option value="age_desc">Age (Oldest &rarr; Youngest)</option>
                      <option value="injury_desc">Injury Risk % (Highest First)</option>
                      <option value="name_asc">Name (A &rarr; Z)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                  <p className={`text-xs ${mutedText}`} aria-live="polite">
                    {backendStatus === 'CHECKING' && allSoldiersList.length < 2
                      ? `Loading battalion roster... (${allSoldiersList.length} loaded so far)`
                      : `Showing ${filteredSoldiers.length} of ${allSoldiersList.length} soldiers — results update automatically`}
                  </p>
                  {hasActiveRosterFilters && (
                    <button
                      type="button"
                      onClick={clearRosterFilters}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer shrink-0 ${
                        isDark
                          ? 'border-white/15 text-[#F3CE78] hover:bg-white/10'
                          : 'border-[#B7A777]/30 text-[#F3CE78] hover:bg-[#4B6933]/30'
                      }`}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className={`rounded-xl border overflow-x-auto ${isDark ? 'border-white/10' : 'border-[#B7A777]/20'}`}>
                  <div className="min-w-[460px]">
                    <div className={`grid grid-cols-4 gap-2 px-4 py-3 text-[10px] font-mono font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 text-slate-400' : 'bg-[#4B6933]/20 text-[#C4BEA8]'}`}>
                      <span>Soldier ID</span>
                      <span>Name</span>
                      <span>Rank</span>
                      <span className="text-right">Age</span>
                    </div>
                    {filteredSoldiers.length === 0 ? (
                      <div className={`py-8 text-center text-xs ${mutedText}`}>
                        {backendStatus === 'CHECKING'
                          ? 'Loading soldier roster from backend...'
                          : 'No soldiers match the selected filters.'}
                      </div>
                    ) : (
                      <div className={`divide-y ${isDark ? 'divide-white/10' : 'divide-[#B7A777]/15'}`}>
                        {filteredSoldiers.map((s) => (
                          <button
                            type="button"
                            key={s.soldier_id}
                            onClick={() => handleInspectSoldier(s.soldier_id)}
                            className={`w-full grid grid-cols-4 gap-2 items-center px-4 py-3 text-left text-xs transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-[#4B6933]/20'}`}
                          >
                            <span className="font-mono font-bold text-[#F3CE78] whitespace-nowrap">{s.soldier_id}</span>
                            <span className={`font-semibold truncate ${primaryText}`}>{s.name || 'Not Available'}</span>
                            <span className={`truncate ${mutedText}`}>{s.rank || 'Not Available'}</span>
                            <span className={`text-right font-mono whitespace-nowrap ${primaryText}`}>{s.age == null ? 'N/A' : `${s.age} yrs`}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeNav === 'fitness' && (
            <section className={`backdrop-blur-md rounded-xl p-6 border space-y-6 ${cardSurface}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className={`text-base font-extrabold uppercase tracking-wider ${goldAccent}`}>
                    Physical Fitness &amp; Battle Physical Efficiency (BPT)
                  </h3>
                  <p className={`text-xs mt-0.5 ${mutedText}`}>
                    Standardized strength, endurance, and combat conditioning benchmarks
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#4B6933]/45 border border-[#7AA84F]/50 text-[#B8E68C] text-xs font-mono font-bold">
                    {soldier.physical_fitness.bpt_result}
                  </span>
                  <span className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold text-[#F3CE78] ${innerTileSurface}`}>
                    Score: {soldier.physical_fitness.score}/100 ({soldier.physical_fitness.status})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Push-Ups', ...soldier.physical_fitness.push_ups },
                  { label: 'Pull-Ups', ...soldier.physical_fitness.pull_ups },
                  { label: 'Sit-Ups', ...soldier.physical_fitness.sit_ups },
                  { label: 'Core Plank', ...soldier.physical_fitness.plank }
                ].map((metric) => {
                  const hasTarget = metric.target != null && metric.target > 0;
                  const pct =
                    hasTarget && metric.value != null
                      ? Math.min(100, Math.round((metric.value / metric.target) * 100))
                      : metric.value != null
                      ? 100
                      : 0;
                  const passed = hasTarget && metric.value != null ? metric.value >= metric.target : true;
                  return (
                    <div key={metric.label} className={`tactical-card p-4 rounded-xl border ${innerTileSurface}`}>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-semibold ${mutedText}`}>{metric.label}</span>
                        <span className={`font-mono ${passed ? 'text-[#88B856]' : 'text-[#E6B856]'}`}>
                          {hasTarget ? `Target: ${metric.target} ${metric.unit}` : 'Recorded'}
                        </span>
                      </div>
                      <p className={`text-2xl font-extrabold mt-2 ${primaryText}`}>
                        {metric.value ?? 'N/A'}{' '}
                        <span className={`text-xs font-normal ${mutedText}`}>{metric.unit}</span>
                      </p>
                      <div className="w-full h-2 bg-black/45 rounded-full mt-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${passed ? 'bg-[#7AA84F]' : 'bg-[#E6B856]'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {activeNav === 'health' && (
            <section className={`backdrop-blur-md rounded-xl p-6 border space-y-6 ${cardSurface}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className={`text-base font-extrabold uppercase tracking-wider ${goldAccent}`}>
                    Health, Autonomic Recovery &amp; Biometrics
                  </h3>
                  <p className={`text-xs mt-0.5 ${mutedText}`}>
                    Continuous Wearable Telemetry &amp; Physiological Stress Analysis
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#4D3819]/65 border border-[#E6B856]/45 text-[#F3CE78] text-xs font-bold">
                  AI Prediction: {soldier.health_recovery.prediction}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    label: 'Sleep Duration',
                    value: `${soldier.health_recovery.sleep_duration} hrs`,
                    sub: 'Recommended: 7.0 – 8.0 hrs'
                  },
                  {
                    label: 'Sleep Quality',
                    value: soldier.health_recovery.sleep_quality,
                    sub: 'REM & Deep Sleep Index'
                  },
                  {
                    label: 'Daily Steps',
                    value: (soldier.health_recovery.daily_steps == null ? 'Not Available' : Number(soldier.health_recovery.daily_steps).toLocaleString()),
                    sub: '24-Hour Locomotion Count'
                  },
                  {
                    label: 'Stress Level',
                    value: soldier.health_recovery.stress_level,
                    sub: 'HRV-Derived Autonomic Load'
                  },
                  {
                    label: 'Physical Activity',
                    value: soldier.health_recovery.physical_activity,
                    sub: 'Operational Duty Classification'
                  },
                  {
                    label: 'Resting Heart Rate',
                    value: `${soldier.health_recovery.heart_rate} BPM`,
                    sub: 'Baseline Cardiovascular Telemetry'
                  }
                ].map((tile) => (
                  <div key={tile.label} className={`tactical-card p-4 rounded-xl border ${innerTileSurface}`}>
                    <p className={`text-xs font-mono uppercase ${mutedText}`}>{tile.label}</p>
                    <p className={`text-xl font-extrabold mt-1.5 ${primaryText}`}>{tile.value}</p>
                    <p className={`text-xs mt-1 ${mutedText}`}>{tile.sub}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeNav === 'injury' && (
            <section className="space-y-6">
              <div className={`backdrop-blur-md rounded-xl p-6 border space-y-5 ${cardSurface}`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className={`text-base font-extrabold uppercase tracking-wider ${goldAccent}`}>
                      ML Musculoskeletal Injury Risk Assessment
                    </h3>
                    <p className={`text-xs mt-0.5 ${mutedText}`}>
                      Predictive injury classification, historical trauma profile, and load-zone analysis
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getSeverityBadgeStyle(String(soldier.injury_risk.classification || 'Not Available').split(' ')[0])}`}>
                    {soldier.injury_risk.classification} — {soldier.injury_risk.probability}% Probability
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className={`tactical-card p-4 rounded-xl border ${innerTileSurface}`}>
                    <p className={`font-mono uppercase text-[10px] ${mutedText}`}>Predicted Classification</p>
                    <p className={`text-base font-bold mt-1 ${primaryText}`}>{soldier.injury_risk.classification}</p>
                  </div>
                  <div className={`tactical-card p-4 rounded-xl border ${innerTileSurface}`}>
                    <p className={`font-mono uppercase text-[10px] ${mutedText}`}>Historical Injury Record</p>
                    <p className={`text-base font-bold mt-1 ${primaryText}`}>{soldier.injury_risk.historical_injury}</p>
                  </div>
                  <div className={`tactical-card p-4 rounded-xl border ${innerTileSurface}`}>
                    <p className={`font-mono uppercase text-[10px] ${mutedText}`}>Primary Load Zone</p>
                    <p className={`text-base font-bold mt-1 ${primaryText}`}>{soldier.injury_risk.primary_load_zone}</p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border text-xs leading-relaxed ${innerTileSurface} ${primaryText}`}>
                  <span className={`font-bold uppercase font-mono mr-2 ${goldAccent}`}>Clinical Telemetry Note:</span>
                  {soldier.injury_risk.notes}
                </div>
              </div>

              <div className={`backdrop-blur-md rounded-xl p-6 border ${cardSurface}`}>
                <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-4 ${goldAccent}`}>
                  Longitudinal Prediction History
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className={`border-b font-mono uppercase text-[11px] ${isDark ? 'border-white/10 text-slate-400' : 'border-[#B7A777]/20 text-[#C4BEA8]'}`}>
                        <th className="py-2.5 pr-4">Date</th>
                        <th className="py-2.5 px-4">Readiness Score</th>
                        <th className="py-2.5 px-4">Physical Fitness</th>
                        <th className="py-2.5 px-4">Injury Probability</th>
                        <th className="py-2.5 pl-4 text-right">Readiness Classification</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-[#B7A777]/15'}`}>
                      {soldier.prediction_history.length === 0 ? (
                        <tr>
                          <td colSpan={5} className={`py-4 text-center ${mutedText}`}>
                            No prediction history recorded for this soldier.
                          </td>
                        </tr>
                      ) : (
                        soldier.prediction_history.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/5">
                            <td className={`py-3 pr-4 font-mono ${primaryText}`}>{row.date}</td>
                            <td className="py-3 px-4 font-bold text-[#F3CE78]">
                              {row.readiness === 'N/A' || row.readiness == null ? 'N/A' : `${row.readiness}/100`}
                            </td>
                            <td className={`py-3 px-4 ${mutedText}`}>
                              {row.fitness === 'N/A' || row.fitness == null ? 'N/A' : `${row.fitness}/100`}
                            </td>
                            <td className={`py-3 px-4 font-mono ${primaryText}`}>
                              {row.injury_prob === 'N/A' || row.injury_prob == null ? 'N/A' : `${row.injury_prob}%`}
                            </td>
                            <td className="py-3 pl-4 text-right">
                              <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadgeStyle(row.status)}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeNav === 'settings' && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`tactical-card backdrop-blur-md rounded-xl p-6 border space-y-5 ${cardSurface}`}>
                <div className="flex items-center gap-2.5">
                  <Settings className="w-5 h-5 text-[#E6B856]" />
                  <div>
                    <h3 className={`text-sm font-extrabold uppercase tracking-wider ${goldAccent}`}>
                      Appearance &amp; Display Settings
                    </h3>
                    <p className={`text-xs ${mutedText}`}>
                      Switch between Dark Olive Green Camo and Stealth Black Dark Mode
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${innerTileSurface}`}>
                  <div>
                    <p className={`text-sm font-bold ${primaryText}`}>Command Interface Theme</p>
                    <p className={`text-xs mt-0.5 ${mutedText}`}>
                      Active Mode: <span className="font-mono text-[#F3CE78]">{isDark ? 'Stealth Black Dark Mode' : 'Dark Olive Green Camo'}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="self-start sm:self-auto px-4 py-2 rounded-lg text-xs font-bold bg-[#E6B856] hover:bg-[#F3CE78] text-[#141913] transition-colors cursor-pointer shrink-0"
                  >
                    {isDark ? 'Switch to Dark Olive' : 'Switch to Black Dark'}
                  </button>
                </div>

                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${innerTileSurface}`}>
                  <div>
                    <p className={`text-sm font-bold ${primaryText}`}>Interface Font Size</p>
                    <p className={`text-xs mt-0.5 ${mutedText}`}>
                      Adjust text scale across all panels ({fontSizeMode === 'small' ? 'Compact 14px' : fontSizeMode === 'large' ? 'Large 18px' : 'Default 16px'})
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {[
                      { id: 'small', label: 'Small' },
                      { id: 'medium', label: 'Default' },
                      { id: 'large', label: 'Large' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFontSizeMode(opt.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                          fontSizeMode === opt.id
                            ? 'bg-[#E6B856] text-[#141913] border-[#E6B856]'
                            : isDark
                            ? 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
                            : 'bg-[#121913]/60 border-[#B7A777]/30 text-[#D8C89B] hover:border-[#E6B856]/55'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${innerTileSurface}`}>
                  <div>
                    <p className={`text-sm font-bold ${primaryText}`}>Indian Army Hologram Projection</p>
                    <p className={`text-xs mt-0.5 ${mutedText}`}>
                      Trigger the startup volumetric emblem &amp; JAI HIND boot screen
                    </p>
                  </div>
                  <button
                    onClick={triggerHologram}
                    className={`self-start sm:self-auto px-4 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer shrink-0 ${
                      isDark
                        ? 'bg-white/10 border-white/15 text-[#F3CE78] hover:bg-white/15'
                        : 'bg-[#4B6933] border-[#7AA84F]/60 text-[#FFF0B8] hover:bg-[#5B7E3E]'
                    }`}
                  >
                    Launch Hologram
                  </button>
                </div>
              </div>

              <div className={`tactical-card backdrop-blur-md rounded-xl p-6 border space-y-5 ${cardSurface}`}>
                <div className="flex items-center gap-2.5">
                  <Server className="w-5 h-5 text-[#E6B856]" />
                  <div>
                    <h3 className={`text-sm font-extrabold uppercase tracking-wider ${goldAccent}`}>
                      System &amp; Backend Architecture
                    </h3>
                    <p className={`text-xs ${mutedText}`}>
                      BTech CSE (AI/ML) Final-Year Defence Intelligence Project
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border space-y-2.5 text-xs ${innerTileSurface}`}>
                  <div className="flex flex-wrap justify-between gap-1 sm:gap-3">
                    <span className={mutedText}>Project Title</span>
                    <span className={`font-bold ${primaryText}`}>S.A.R.T.H.I. v2.4</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-1 sm:gap-3">
                    <span className={mutedText}>Backend Endpoint</span>
                    <span className="font-mono text-[#F3CE78] break-all text-right">{API_BASE_URL}</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-1 sm:gap-3">
                    <span className={mutedText}>Connection Status</span>
                    <span className="font-mono text-emerald-400">
                      {backendStatus === 'CONNECTED' ? 'FastAPI Live Connected' : 'Standby / Local Cache Active'}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-1 sm:gap-3">
                    <span className={mutedText}>Inference Pipeline</span>
                    <span className={primaryText}>Multi-Modal Readiness &amp; Injury ML</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${innerTileSurface}`}>
                  <ShieldAlert className="w-4 h-4 text-[#E6B856] shrink-0 mt-0.5" />
                  <p className={mutedText}>
                    <strong className={primaryText}>Research Disclaimer:</strong> S.A.R.T.H.I. is developed for academic AI/ML decision-support demonstration. All automated readiness scores and injury risk probabilities supplement, and do not replace, certified Army Medical Corps clinical evaluations.
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}