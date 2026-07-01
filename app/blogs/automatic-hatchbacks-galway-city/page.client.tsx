"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

type HatchbackKey = 'aqua' | 'fit' | 'note' | 'mazda2' | 'swift';

interface HatchbackProfile {
  name: string;
  engine: string;
  transmission: string;
  economy: string;
  tax: string;
  insuranceGroup: string;
  widthLength: string;
  bestFor: string;
  knownIssues: string[];
  pros: string[];
  description: string;
}


export default function AutomaticHatchbacksGuide() {
  const [activeTab, setActiveTab] = useState<HatchbackKey>('aqua');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Strain & Cost Calculator state
  const [weeklyCommuteDistance, setWeeklyCommuteDistance] = useState<number>(120); // km per week in city traffic
  const [fuelPricePerLitre, setFuelPricePerLitre] = useState<number>(1.84); // € per litre
  
  // Interactive Hotspot Explorer state
  const [selectedHotspot, setSelectedHotspot] = useState<string>('quincentennial');

  // Interactive Hatch Matcher state
  const [matcherStep, setMatcherStep] = useState<number>(1);
  const [parkingNeed, setParkingNeed] = useState<string>('');
  const [drivingProfile, setDrivingProfile] = useState<string>('');
  const [fuelPreference, setFuelPreference] = useState<string>('');
  const [matcherResult, setMatcherResult] = useState<HatchbackKey | null>(null);

  const hatchbacks: Record<HatchbackKey, HatchbackProfile> = {
    aqua: {
      name: 'Toyota Aqua Hybrid (1.5L)',
      engine: '1.5L 4-Cylinder Petrol-Hybrid (1NZ-FXE)',
      transmission: 'Electronic CVT (e-CVT / Planetary Gearset)',
      economy: '3.4L/100km (Approx. 83 MPG)',
      tax: '€170 per year',
      insuranceGroup: 'Low-Medium (Group 11-13, Requires Immobiliser Upgrade)',
      widthLength: 'W: 1,695mm | L: 3,995mm',
      bestFor: 'Absolute gridlock survivors seeking rock-bottom running costs on the Headford Road and Quincentennial Bridge lanes.',
      knownIssues: ['Factory security missing on entry-level models (fixed by ShahMotors installation)', 'Rear legroom tight for very tall adults'],
      pros: ['Sips fuel in heavy stop-start gridlock', 'Legendary planetary gear durability', 'Excellent local mechanics familiarity'],
      description: 'The Toyota Aqua is the undisputed king of automatic import hatchbacks in Ireland. Operating on a series-parallel hybrid configuration, it relies on an electric motor to pull the car from a complete standstill, eliminating the mechanical wear of a mechanical clutch in heavy bumper-to-bumper city congestion.'
    },
    fit: {
      name: 'Honda Fit / Jazz Hybrid (1.5L i-VTEC)',
      engine: '1.5L i-VTEC Petrol-Hybrid (i-DCD Dual-Clutch / e:HEV)',
      transmission: '7-Speed Dual-Clutch Automatic / e-CVT',
      economy: '3.7L/100km (Approx. 76 MPG)',
      tax: '€180 per year',
      insuranceGroup: 'Low (Group 10-12)',
      widthLength: 'W: 1,695mm | L: 3,990mm',
      bestFor: 'Commuters who prioritize flexible cargo storage and passenger head-room for weekend trips to Connemara.',
      knownIssues: ['Dual-Clutch transmission fluid must be replaced strictly every 60,000km', 'Slightly firmer suspension over deep city potholes'],
      pros: ['Famous Honda "Magic Seats" fold completely flat', 'Outstanding glass visibility with slim A-pillars', 'Highly responsive acceleration profile'],
      description: 'The Honda Fit is an engineering marvel. It is incredibly compact on the outside, making it easy to parallel-park along the Salthill Promenade or down the back alleys of Woodquay. Inside, however, its interior packaging rivaling mid-size SUVs offers unprecedented modular space.'
    },
    note: {
      name: 'Nissan Note e-Power (1.2L Series-Hybrid)',
      engine: '1.2L 3-Cylinder Petrol (Generator Only) + Electric Drive Motor',
      transmission: 'Single-Speed Constant Ratio (Pure Electric Drive)',
      economy: '4.0L/100km (Approx. 70 MPG)',
      tax: '€180 per year',
      insuranceGroup: 'Medium (Group 12-14)',
      widthLength: 'W: 1,695mm | L: 4,100mm',
      bestFor: 'Commuters seeking the immediate instant torque of an electric vehicle without ever needing to plug into an EV charging cable.',
      knownIssues: ['Cabin insulation is thinner at motorway speeds', 'Slightly longer nose requires attention during tight parking'],
      pros: ['Genuine EV driving feel with instant throttle torque', 'One-Pedal driving mode eases foot fatigue in gridlock', 'Massive cabin rear-legroom'],
      description: 'Nissan’s revolutionary e-Power technology makes the Note a "series hybrid." The 1.2L petrol engine never actually connects to the front wheels; it acts purely as an on-board electrical generator to charge a compact lithium-ion battery, which in turn drives a high-torque electric motor.'
    },
    mazda2: {
      name: 'Mazda 2 SkyActiv-Drive (1.5L)',
      engine: '1.5L SkyActiv naturally-aspirated Petrol',
      transmission: '6-Speed Torque-Converter Automatic (No CVT)',
      economy: '5.2L/100km (Approx. 54 MPG)',
      tax: '€200 per year',
      insuranceGroup: 'Low-Medium (Group 11-13)',
      widthLength: 'W: 1,695mm | L: 4,060mm',
      bestFor: 'Traditionalists who prefer the natural shift feel of a geared automatic and do not want a hybrid battery system.',
      pros: ['Premium cabin interior leather-touch materials', 'Engaging, sporty physical chassis response', 'Simple mechanical design with no hybrid battery'],
      knownIssues: ['Tighter boot capacity than the Honda Fit', 'Higher fuel consumption during absolute bumper-to-bumper standstill traffic'],
      description: 'While most Japanese imports utilize CVTs, the Mazda 2 is built with a sophisticated 6-speed torque-converter lock-up transmission. It combines the direct fuel efficiency of a manual clutch with the silky smooth shifting of a fluid automatic gear-change.'
    },
    swift: {
      name: 'Suzuki Swift CVT (1.2L Dualjet)',
      engine: '1.2L Dualjet 4-Cylinder Petrol',
      transmission: 'Continuously Variable Transmission (CVT)',
      economy: '4.8L/100km (Approx. 59 MPG)',
      tax: '€190 per year',
      insuranceGroup: 'Very Low (Group 8-10)',
      widthLength: 'W: 1,735mm | L: 3,840mm',
      bestFor: 'New or younger drivers searching for the cheapest car insurance profile possible in Galway.',
      pros: ['Extremely short length makes it incredibly easy to park', 'Featherweight curb weight creates engaging handling', 'Simple and highly dependable mechanical setup'],
      knownIssues: ['Tiny boot space is limited to grocery bags', 'CVT drone noise can be audible under hard acceleration'],
      description: 'The Suzuki Swift is a visual and driving joy. At just under 3.9 meters in length, it can squeeze into parking spots that larger hatchbacks have to pass by. Its lightweight body ensures that even without hybrid aid, fuel usage remains highly economical.'
    }
  };

  const commuteCalculations = useMemo(() => {
    // Under constant stop-start conditions, manual clutch stress is massive
    // Manual Hatchback (1.2L Petrol): Avg 6.8L/100km in heavy stop-start urban traffic
    // Automatic Hybrid Hatchback (1.5L Aqua): Avg 3.6L/100km in stop-start (recovers energy)
    const annualMultiplier = 52; // Weeks in a year
    const annualKM = weeklyCommuteDistance * annualMultiplier;
    
    const manualFuelUsed = (annualKM / 100) * 6.8;
    const hybridFuelUsed = (annualKM / 100) * 3.6;

    const manualCost = Math.round(manualFuelUsed * fuelPricePerLitre);
    const hybridCost = Math.round(hybridFuelUsed * fuelPricePerLitre);
    const fuelSavings = manualCost - hybridCost;

    // Simulated annual physical clutch presses (Approx 15 manual clutch presses per City Kilometer)
    const annualClutchPresses = Math.round(annualKM * 15);

    return {
      annualKM,
      manualCost,
      hybridCost,
      fuelSavings,
      annualClutchPresses,
      charts: [
        { name: 'Manual Hatchback Fuel Cost', cost: manualCost },
        { name: 'Hybrid Automatic Fuel Cost', cost: hybridCost }
      ]
    };
  }, [weeklyCommuteDistance, fuelPricePerLitre]);

  const hotspots: Record<string, { name: string; stressLevel: string; typicalDelay: string; description: string; recommendation: string }> = {
    quincentennial: {
      name: 'Quincentennial Bridge (N6)',
      stressLevel: 'Critical / Severe (Red-Zone)',
      typicalDelay: '25 - 45 Minutes (Morning and Evening peaks)',
      description: 'The primary artery connecting Newcastle and Knocknacarra with the eastern business parks. Heavy gridlock leads to constant clutch holding, hill-start rolls, and immense foot fatigue in manual cars.',
      recommendation: 'A hybrid system with active creeping like the Toyota Aqua or Honda Fit allows you to drive completely with one foot, recovering kinetic braking energy on every crawl.'
    },
    terryland: {
      name: 'Terryland & Kirwan Roundabouts',
      stressLevel: 'High / Bumper-to-Bumper',
      typicalDelay: '15 - 30 Minutes',
      description: 'Rapid lane changes combined with stop-start entries can make clutch modulation tricky. Rolling backward on the sloping roundabout approaches creates high collision anxiety for first-time drivers.',
      recommendation: 'Vehicles equipped with "Hill-Start Assist" (such as the Suzuki Swift or Mazda 2) ensure you never roll backward, locking brakes automatically for 2 seconds while you switch pedals.'
    },
    tuamroad: {
      name: 'Tuam Road Junction (N84)',
      stressLevel: 'Severe Stop-Start',
      typicalDelay: '20 - 35 Minutes',
      description: 'Endless red-light sequences paired with heavy commercial delivery trucks create a constant stop-and-crawl profile that rapidly wears out manual clutches, inducing structural gearbox friction.',
      recommendation: 'The Nissan Note e-Power with "One-Pedal Driving" is a game-changer here. Releasing the accelerator applies regenerative motor-braking to slow the vehicle to a complete halt without your foot ever pressing the brake pedal.'
    },
    salthill: {
      name: 'Salthill Promenade (Weekend Congestion)',
      stressLevel: 'Moderate to High (Pedestrian Crossings)',
      typicalDelay: '10 - 20 Minutes (Sunny Weekends)',
      description: 'Endless pedestrian crossings, creeping holiday crowds, and micro-parking spaces require absolute slow-speed steering agility and persistent feathering of a vehicle clutch.',
      recommendation: 'The ultra-compact turn radius of the Suzuki Swift or the zero-emissions electric crawl of the Toyota Aqua makes navigating coastal pedestrian traffic simple and quiet.'
    }
  };

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'hotspots', title: "Galway Hotspots" },
    { id: 'top-picks', title: 'Top Hatchbacks' },
    { id: 'calculator', title: 'Strain Calculator' },
    { id: 'matcher', title: 'Hatch Matcher' },
    { id: 'insurance', title: 'Insurance & Security' },
    { id: 'analysis', title: 'Technical Analysis' },
    { id: 'faq', title: 'FAQs' }
  ];

  const faqItems = [
    {
      question: 'Do automatic hatchbacks cost more to insure in Ireland?',
      answer: 'Not necessarily. With a Thatcham-approved immobiliser and correct documentation, many insurers price Japanese imports competitively compared to equivalent local models.'
    },
    {
      question: 'How often should CVT fluid be changed?',
      answer: 'Most manufacturers recommend CVT fluid changes around every 60,000km, but always consult the specific service schedule for the vehicle variant.'
    },
    {
      question: 'Are hybrid batteries expensive to replace?',
      answer: 'Hybrid batteries can be costly, but well-maintained Toyota and Honda systems commonly last many years; purchasing from a reputable dealer typically includes battery health checks and warranty options.'
    }
  ];

  const resetMatcher = () => {
    setMatcherStep(1);
    setParkingNeed('');
    setDrivingProfile('');
    setFuelPreference('');
    setMatcherResult(null);
  };

  const handleMatcherNext = () => {
    if (matcherStep === 1 && parkingNeed) setMatcherStep(2);
    else if (matcherStep === 2 && drivingProfile) setMatcherStep(3);
    else if (matcherStep === 3 && fuelPreference) {
      if (parkingNeed === 'tight' && fuelPreference === 'petrol') {
        setMatcherResult('swift');
      } else if (drivingProfile === 'enthusiast' && fuelPreference === 'petrol') {
        setMatcherResult('mazda2');
      } else if (drivingProfile === 'commuter' && fuelPreference === 'series') {
        setMatcherResult('note');
      } else if (parkingNeed === 'cargo') {
        setMatcherResult('fit');
      } else {
        setMatcherResult('aqua');
      }
      setMatcherStep(4);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed">
      <div className='relative max-w-7xl mx-auto pb-16'>
        <Navbar />
      </div>
      {/* Hero Section */}
      <header className="pt-20 pb-24 bg-linear-to-br from-white via-red-50/50 to-red-100/40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-black uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            Galway Gridlock Survival Manual
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            Navigating the Galway City Commute: <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500">The Best Used Automatic Hatchbacks</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Tired of riding the clutch past the Tuam Road or sitting frozen on the Quincentennial Bridge? Learn why switching to a reliable, compact, second-hand automatic hatchback is the single smartest upgrade you can make for your daily West of Ireland commute.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#AutomaticCarsGalway</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#UsedAutomaticHatchbacks</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#JapaneseImportsIreland</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Sidebar Left */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-12 space-y-10">
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-6">Commute Survival Chapters</h4>
              <ul className="space-y-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                      <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live CTA Box */}
            <div className="p-6 bg-slate-950 text-white rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <h4 className="text-lg font-black mb-2 text-white">Tired of the Clutch?</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                We import only Grade 4.0+ automatic cars directly from Tokyo. Fully secure, alarms fitted, and warranty-ready.
              </p>
              <Link href="/cars" className="w-full flex items-center justify-center py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-red-900/30">
                VIEW AUTOMATIC STOCK
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Panel Right */}
        <div className="lg:col-span-9 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          {/* Section 1: Introduction */}
          <section id="intro" className="mb-16 scroll-mt-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">1. The Commuting Crisis: Navigating Galway's Daily Gridlock</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Any driver who has regularly attempted to cross the River Corrib during peak morning or evening hours knows that the Galway commute has graduated from a minor daily inconvenience to a full-blown test of physical and mental endurance. With the geographical landscape of Galway City squeezing traffic across a limited number of bridge crossings—specifically the Quincentennial Bridge and the Salmon Weir—traffic backup is a permanent fixture of daily life in the West of Ireland.
              </p>
              <p>
                For those operating a traditional manual gearbox, this constant crawling represents a massive mechanical strain. Bumper-to-bumper congestion down the Headford Road, Terryland Roundabout, and the Tuam Road requires a driver to engage, hold, feather, and disengage the clutch hundreds of times over a single mile. Over years of this daily routine, the physical strain on your left foot and knee is substantial. More worryingly, this intense stop-and-start cycle causes severe heat friction inside a manual gearbox, drastically accelerating clutch wear and leading to early (and highly expensive) clutch replacements that typically cost between €600 and €1,000.
              </p>
              <p>
                This is why there is an accelerating consumer trend toward high-quality, pre-owned <strong>automatic hatchbacks in Galway</strong>. Modern automatic gearboxes completely eliminate the left-foot physical pedal stress, letting the vehicle fluidly manage low-speed crawls while prioritizing driver relaxation. Furthermore, when selecting a self-charging hybrid automatic, the stop-and-start crawl is powered entirely by silent, zero-emissions electric motors—turning your gridlock wait from a fuel-burning financial sinkhole into an efficient energy-recovery process.
              </p>
              <div className="p-6 bg-red-50 border-l-4 border-red-600 rounded-r-2xl my-8">
                <p className="font-bold text-red-900 text-base mb-1">Commuter Insight:</p>
                <p className="text-red-900 text-sm italic">
                  "Commuting from Knocknacarra to the Parkmore Industrial Estate in a manual hatch means executing thousands of clutch shifts a week. Upgrading to a self-charging automatic JDM hybrid turns that stressful, foot-aching drive into a relaxed, smooth, and highly fuel-efficient crawl."
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Hotspot Grid Map Selector */}
          <section id="hotspots" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">2. Interactive Hotspot Explorer: Galway's Commuter Bottlenecks</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Different commuter routes present unique technical driving hazards. Click on any of Galway's notorious traffic junctions below to explore the specific mechanical strains they place on your vehicle, and read our tailored driving recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
              {Object.keys(hotspots).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedHotspot(key)}
                  className={`p-4 rounded-xl border text-left transition duration-150 ${selectedHotspot === key ? 'border-red-600 bg-red-50 text-red-600 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
                >
                  <span className="text-xs uppercase font-black text-slate-400 block mb-1">Commute Node</span>
                  <span className="text-sm tracking-tight">{hotspots[key].name.split(' ')[0]} {hotspots[key].name.split(' ')[1] || ''}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              <span className="text-xs font-black uppercase text-red-500 tracking-wider">Active Junction Diagnostic</span>
              <h3 className="text-2xl font-black mt-2 mb-4">{hotspots[selectedHotspot].name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <span className="text-xs text-slate-400 uppercase font-black block">Traffic Severity Index:</span>
                    <span className="text-sm font-semibold text-red-400">{hotspots[selectedHotspot].stressLevel}</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs text-slate-400 uppercase font-black block">Average Daily Peak Wait:</span>
                    <span className="text-sm font-semibold text-white">{hotspots[selectedHotspot].typicalDelay}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">The Strain Breakdown:</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{hotspots[selectedHotspot].description}</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-black uppercase text-slate-400 mb-2">Recommended Commuting Strategy:</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{hotspots[selectedHotspot].recommendation}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Top Picks */}
          <section id="top-picks" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-2 text-slate-900">3. Vetted Hatchback Profiles: Top 5 Used Automatics for Galway</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              If your criteria are bulletproof mechanical reliability, easy parallel parking down narrow city streets, low motor tax, and smooth gear transitions, these are the five best-performing used automatic hatchbacks.
            </p>

            {/* Interactive Selector Tabs */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl mb-8">
              {(Object.keys(hatchbacks) as HatchbackKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 text-xs md:text-sm font-black rounded-xl transition duration-150 ${activeTab === key ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {hatchbacks[key].name.split(' ')[0]} {hatchbacks[key].name.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-red-200 transition duration-300">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <span className="text-xs font-black uppercase text-red-600 tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    {hatchbacks[activeTab].transmission}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{hatchbacks[activeTab].name}</h3>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-bold border border-emerald-100">
                  City Verified Pick
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">{hatchbacks[activeTab].description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Technical Profile</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Engine Type</span>
                      <span className="font-bold text-slate-800 text-right">{hatchbacks[activeTab].engine}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Fuel Economy</span>
                      <span className="font-bold text-slate-800">{hatchbacks[activeTab].economy}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Irish Road Tax</span>
                      <span className="font-bold text-red-600">{hatchbacks[activeTab].tax}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Vehicle Dimensions</span>
                      <span className="font-bold text-slate-600">{hatchbacks[activeTab].widthLength}</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">West of Ireland Focus</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{hatchbacks[activeTab].bestFor}</p>
                  
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Known Issues to Guard Against:</h5>
                    <ul className="space-y-1 mb-4">
                      {hatchbacks[activeTab].knownIssues.map((issue, idx) => (
                        <li key={idx} className="text-xs text-red-600 font-semibold">• {issue}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hatchbacks[activeTab].pros.map((pro, i) => (
                      <span key={i} className="text-[10px] md:text-xs bg-slate-900 text-white px-3 py-1 rounded-lg font-bold tracking-tight">
                        ✓ {pro}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Commuter Calculator */}
          <section id="calculator" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">4. Commute Strain & Cost Calculator Simulator</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              When navigating bumper-to-bumper city congestion, a petrol hybrid automatic does not just save fuel; it prevents physical wear and tear on both you and your vehicle. Adjust the sliders below to calculate your true annual physical strain and fuel savings when moving from a standard manual hatchback to a self-charging hybrid automatic.
            </p>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/80 mb-8">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">Your Commute Variables</h4>
                
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Weekly City Commute Distance:</span>
                    <span className="text-red-600 font-bold">{weeklyCommuteDistance} km / week</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="400" 
                    step="10" 
                    value={weeklyCommuteDistance} 
                    onChange={(e) => setWeeklyCommuteDistance(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Includes daily crawls past Tuam Road, Headford Road, and across Newcastle.</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Average Fuel Price (per Litre):</span>
                    <span className="text-red-600 font-bold">€{fuelPricePerLitre.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1.60" 
                    max="2.10" 
                    step="0.02" 
                    value={fuelPricePerLitre} 
                    onChange={(e) => setFuelPricePerLitre(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Cost Chart Display */}
              <div className="h-64 w-full">
                <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Annual Fuel Cost Projections (€)</h5>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={commuteCalculations.charts}>
                    <defs>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: 12 }} />
                    <Area type="monotone" dataKey="cost" stroke="#dc2626" fillOpacity={1} fill="url(#colorCost)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Interactive Stats Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xs">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-1">Annual Distance Modeled</span>
                <span className="text-2xl font-black text-slate-900">{commuteCalculations.annualKM.toLocaleString()} km</span>
              </div>
              <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-xs">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-1">Annual Clutch Press Avoided</span>
                <span className="text-2xl font-black text-red-600">{commuteCalculations.annualClutchPresses.toLocaleString()} times</span>
              </div>
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl shadow-xs">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block mb-1">Annual Fuel Saving</span>
                <span className="text-2xl font-black text-emerald-600">€{commuteCalculations.fuelSavings.toLocaleString()}</span>
              </div>
            </div>
          </section>

          {/* Section 5: Dynamic Matcher Quiz */}
          <section id="matcher" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">5. Interactive Tool: Find Your Perfect Automatic Hatchback</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Not sure which automatic hatchback fits your lifestyle, physical storage needs, and driving style? Use our quick 3-step dynamic matcher tool to find the perfect fit.
            </p>

            <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              
              {matcherStep === 1 && (
                <div className="space-y-6">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500">Step 1 of 3</span>
                  <h3 className="text-xl md:text-2xl font-black">What is your priority regarding car length & cabin storage?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'tight', label: 'Maximum Compactness', desc: 'Squeezing into tiny parking spaces in Woodquay or Salthill.' },
                      { key: 'balanced', label: 'Balanced Footprint', desc: 'Normal passenger space with a standard city boot layout.' },
                      { key: 'cargo', label: 'Unrivaled Modular Storage', desc: 'Magic modular rear seats that carry golf clubs, dogs, or flatpack furniture.' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setParkingNeed(opt.key)}
                        className={`p-5 rounded-2xl border text-left transition duration-150 ${parkingNeed === opt.key ? 'border-red-600 bg-red-600/10 text-white' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                      >
                        <span className="block font-bold text-base mb-1">{opt.label}</span>
                        <span className="block text-xs text-slate-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      disabled={!parkingNeed}
                      onClick={handleMatcherNext}
                      className="px-6 py-3 bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed font-black rounded-xl text-white hover:bg-red-500 transition"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {matcherStep === 2 && (
                <div className="space-y-6">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500">Step 2 of 3</span>
                  <h3 className="text-xl md:text-2xl font-black">What is your typical weekly driving profile?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'commuter', label: 'Pure Bumper-to-Bumper Crawls', desc: 'Navigating Quincentennial Bridge and Terryland daily.' },
                      { key: 'mixed', label: 'Mixed City & Coastal Paths', desc: 'Regular city loops with weekend highway drives down to Clifden.' },
                      { key: 'enthusiast', label: 'Spirited Handling', desc: 'I prioritize premium cabin feel and direct mechanical chassis response.' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setDrivingProfile(opt.key)}
                        className={`p-5 rounded-2xl border text-left transition duration-150 ${drivingProfile === opt.key ? 'border-red-600 bg-red-600/10 text-white' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                      >
                        <span className="block font-bold text-base mb-1">{opt.label}</span>
                        <span className="block text-xs text-slate-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setMatcherStep(1)}
                      className="px-6 py-3 bg-slate-900 font-bold rounded-xl text-slate-400 hover:text-white transition"
                    >
                      Back
                    </button>
                    <button
                      disabled={!drivingProfile}
                      onClick={handleMatcherNext}
                      className="px-6 py-3 bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed font-black rounded-xl text-white hover:bg-red-500 transition"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {matcherStep === 3 && (
                <div className="space-y-6">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500">Step 3 of 3</span>
                  <h3 className="text-xl md:text-2xl font-black">What is your preference regarding battery drivetrains?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'parallel', label: 'Self-Charging Hybrid', desc: 'No plugging in ever. Automatically charges itself as you crawl.' },
                      { key: 'series', label: 'Instant Pure Electric Drive Feel', desc: 'Series hybrid system where the engine acts purely as an on-board generator.' },
                      { key: 'petrol', label: 'Simple Petrol Engine', desc: 'No hybrid battery pack. Simple mechanical reliability with lower purchase costs.' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setFuelPreference(opt.key)}
                        className={`p-5 rounded-2xl border text-left transition duration-150 ${fuelPreference === opt.key ? 'border-red-600 bg-red-600/10 text-white' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                      >
                        <span className="block font-bold text-base mb-1">{opt.label}</span>
                        <span className="block text-xs text-slate-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setMatcherStep(2)}
                      className="px-6 py-3 bg-slate-900 font-bold rounded-xl text-slate-400 hover:text-white transition"
                    >
                      Back
                    </button>
                    <button
                      disabled={!fuelPreference}
                      onClick={handleMatcherNext}
                      className="px-6 py-3 bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed font-black rounded-xl text-white hover:bg-red-500 transition"
                    >
                      Show Recommendation
                    </button>
                  </div>
                </div>
              )}

              {matcherStep === 4 && matcherResult && (
                <div className="space-y-6 text-center">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-500 block">Your Commuter match Found!</span>
                  <h3 className="text-3xl font-black text-white">{hatchbacks[matcherResult].name}</h3>
                  <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed">
                    {hatchbacks[matcherResult].bestFor} It returns an average fuel efficiency of {hatchbacks[matcherResult].economy} with annual Irish road tax of just {hatchbacks[matcherResult].tax}.
                  </p>
                  
                  <div className="flex justify-center gap-2 max-w-md mx-auto py-2">
                    {hatchbacks[matcherResult].pros.map((pro, idx) => (
                      <span key={idx} className="bg-slate-900 text-red-400 text-[10px] uppercase font-black px-3 py-1 rounded-full border border-slate-800">
                        {pro}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    <button
                      onClick={resetMatcher}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition text-sm"
                    >
                      Restart Matcher
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab(matcherResult);
                        const element = document.getElementById('top-picks');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition text-sm shadow-lg shadow-red-900/30"
                    >
                      View Full Specs Above
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 6: Insurance & Security */}
          <section id="insurance" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">6. The Security & Insurance Blueprint for Japanese Hatchbacks</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                A very common rumor circulating on Irish motoring forums and social media groups is that insuring a Japanese import hatchback in Galway is almost impossible, with underwriters either charging exorbitant premiums or refusing to issue quotes altogether. This claim is based on a real security difference between Japanese and European car markets, but it has a very simple and affordable fix.
              </p>
              <p>
                Because vehicle theft in Japan is exceptionally rare due to strict local laws and societal dynamics, many vehicles built for the Japanese Domestic Market (JDM)—such as early versions of the Toyota Aqua or Suzuki Swift—were manufactured without physical engine immobilisers or factory alarm systems. When these vehicles are imported into Ireland without modifications, insurance companies classify them as high-risk assets, leading to high quotes or outright rejections.
              </p>
              <p className="font-bold text-slate-900">
                The Solution: Thatcham-Approved Security Installation
              </p>
              <p>
                At ShahMotors, we have completely resolved this issue for our customers. Before any Japanese automatic hatchback is listed on our lot or delivered to your door in Galway, our certified electrical mechanics install an Irish-approved, Thatcham-certified engine immobiliser or advanced alarm system. 
              </p>
              <p>
                We supply the certified installation paperwork directly with the vehicle's logbook. This certificate serves as physical proof of security for underwriters like AXA, Liberty, Allianz, and FBD, ensuring you can secure standard, competitive insurance premiums from day one.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-950 mb-2">Immobiliser Protection</h4>
                  <p className="text-xs text-slate-600">Our physical engine immobiliser cuts off key-start electrical circuits unless the coded transponder key or fob is physically present. This completely blocks hotwiring attempts, satisfying Irish insurance requirements.</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-950 mb-2">NCT-Ready Prep</h4>
                  <p className="text-xs text-slate-600">All aftermarket security hardware we fit integrates cleanly with your vehicle's existing 12V electrical system. This ensures it does not cause dashboard warning lights or blow diagnostic fuses during your local Tuam Road NCT inspection.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Detailed Analysis */}
          <section id="analysis" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">7. Detailed Technical Analysis: CVT vs. Dual-Clutch vs. Torque Converter</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                If you are upgrading from a traditional manual transmission to an automatic, it is crucial to understand that not all automatic transmissions operate the same way. The mechanical architecture beneath your shifter console has a massive impact on fuel economy, acceleration feel, and long-term maintenance costs in Galway's specific damp coastal environment.
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-6">1. Continuously Variable Transmissions (CVT)</h3>
              <p>
                A CVT (such as those in the Toyota Aqua, Toyota Vitz, or Suzuki Swift) does not use traditional gears. Instead, it relies on a high-strength steel belt sliding between variable-diameter pulleys. This provides an infinite number of gear ratios, keeping the engine in its most efficient powerband. 
              </p>
              <p>
                For stop-start crawls past Terryland or along the Headford Road, CVTs are outstandingly smooth, completely eliminating the shifting "jerks" of traditional gearboxes. They require simple, scheduled oil changes (CVT Fluid replacement) every 60,000km to ensure the pulleys remain perfectly lubricated.
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-6">2. Dual-Clutch Automatic Transmissions (DCT)</h3>
              <p>
                Used in vehicles like the hybrid Honda Fit (i-DCD system), a Dual-Clutch transmission acts like two manual gearboxes housed in one unit—one managing odd gears (1st, 3rd, 5th) and the other managing even gears (2nd, 4th, 6th). 
              </p>
              <p>
                DCTs provide lightning-fast, highly crisp shifts and an engaging, sporty drive profile. However, because they use physical friction clutches, they must be serviced strictly on schedule. Using incorrect transmission fluids or skipping fluid intervals can cause actuator wear, leading to costly electronic gearbox repairs.
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-6">3. Traditional Torque-Converter Automatics</h3>
              <p>
                Found in the Mazda 2, torque-converter automatics use a specialized fluid coupling to transmit power from the engine to a physical set of planetary gears. 
              </p>
              <p>
                These gearboxes are renowned for their exceptional mechanical durability and smooth low-speed creeping. Because there are no slipping clutches to wear out and no belts to slide, they are incredibly robust under Galway's damp, salt-laden coastal conditions, though they return slightly higher fuel usage figures during absolute city standstills compared to hybrid CVTs.
              </p>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-slate-900">8. Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left transition hover:bg-slate-100 animate-duration-150"
                  >
                    <span className="font-bold text-slate-900 text-sm md:text-base">{item.question}</span>
                    <span className="text-slate-500 text-2xl shrink-0">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  <div className={`px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed transition-all duration-300 ${activeFaq === idx ? 'block' : 'hidden'}`}>
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final Brand Box */}
          <div className="bg-linear-to-br from-red-600 to-red-500 text-white p-8 md:p-12 rounded-3xl shadow-xl mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4">Ready to Transform Your Galway Commute?</h3>
            <p className="text-red-50 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8 opacity-90">
              Stop suffering through heavy stop-start clutch wear. Explore our verified range of Grade 4.0+ imported automatic hatchbacks, fitted with certified Irish security systems and ready to drive away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-red-600 font-black rounded-xl hover:bg-slate-50 transition duration-150 shadow-lg">
                BROWSE AUTOMATIC STOCK
              </button>
              <button className="px-8 py-4 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-900 transition duration-150 border border-slate-800">
                BOOK VEHICLE TEST DRIVE
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}