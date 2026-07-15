"use client";

import React, { useState, useMemo, useTransition } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';


export default function WestIrelandWeatherGuide() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedHazard, setSelectedHazard] = useState<string>('gale');
  
  // Safety Spec Calculator State
  const [drivetrain, setDrivetrain] = useState<string>('fwd');
  const [headlights, setHeadlights] = useState<string>('halogen');
  const [tyreTread, setTyreTread] = useState<number>(1.6); // mm tread depth
  const [groundClearance, setGroundClearance] = useState<number>(140); // mm clearance
  const [isPending, startTransition] = useTransition();

  // loading on button click
  const router = useRouter();
  const handleClick = () => {
    startTransition(() => {
      router.push("/cars");
    });
  };

  const hazardScenarios: Record<string, { name: string; wind: string; rain: string; hazard: string; advice: string }> = {
    gale: {
      name: 'Atlantic Coast Storm (Coastal Gales)',
      wind: '80 - 110 km/h gusts (Salthill / Claddagh)',
      rain: 'Torrential horizontal spray',
      hazard: 'Severe side-wind vehicle buffeting, flying debris, saltwater foam on windscreen.',
      advice: 'Vehicles with a low center of gravity combined with active lane keep assist are significantly less susceptible to crosswind sway. Heavy, top-heavy panel vans and older tall RWD saloons suffer high lateral instability. Japanese hybrid imports with modern Electronic Stability Control (ESC) react in milliseconds to micro-adjust wheel braking and keep the chassis straight.'
    },
    flood: {
      name: 'N59 Torrential Downpour & Road Pooling',
      wind: '40 - 60 km/h gusts (Connemara mountain passes)',
      rain: '35mm standing water accumulation',
      hazard: 'Aquaplaning, hidden deep potholes, undercarriage water damage, sudden loss of steering feedback.',
      advice: 'Ground clearance is key. A standard saloon sitting at 130mm clearance risks hydro-locking the engine intake or drowning key electronic sensors if wading through local surface flooding. SUVs with 180mm+ clearance (such as the Toyota RAV4 Hybrid or Subaru Forester) safely split water away. Symmetrical AWD distributes torque dynamically to wheels with high grip, preventing rapid tire spin.'
    },
    fog: {
      name: 'Joyces Country Mountain Mist (Freezing Fog)',
      wind: 'Calm to 15 km/h',
      rain: 'Heavy condensated moisture / Black ice',
      hazard: 'Visibility drops below 10 meters, micro-patches of ungritted black ice on sharp rural curves.',
      advice: 'Standard yellow halogen bulbs fail to penetrate dense droplets, causing immediate light scatter back into the driver\'s eyes. High-tier Matrix LED headlight technology actively steers light beams beneath the fog line. Permanent AWD layouts, combined with an active traction control module, continuously monitor steering angles to catch slide pivots before they result in ditch impact.'
    }
  };

  const resilienceAnalysis = useMemo(() => {
    let score = 20; // Base score
    const details = [];

    // 1. Drivetrain contribution
    if (drivetrain === 'awd') {
      score += 30;
      details.push({ system: 'Traction Layout', status: 'Optimal', comment: 'All-Wheel Drive continuously divides torque, drastically reducing slides on greasy coastal tarmac.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' });
    } else if (drivetrain === 'fwd') {
      score += 15;
      details.push({ system: 'Traction Layout', status: 'Moderate', comment: 'Front-Wheel Drive pulls the chassis cleanly, but can suffer heavy understeer on slick, ungritted country lanes.', color: 'text-amber-600 bg-amber-50 border-amber-200' });
    } else {
      score += 5;
      details.push({ system: 'Traction Layout', status: 'High Risk', comment: 'Rear-Wheel Drive vehicles are highly prone to sudden power-oversteer slides (tail fish-tailing) on wet leaves or frost.', color: 'text-red-600 bg-red-50 border-red-200' });
    }

    // 2. Headlights contribution
    if (headlights === 'matrix') {
      score += 25;
      details.push({ system: 'Illumination Tech', status: 'Optimal', comment: 'Matrix/Adaptive LED projects sharp patterns, highlighting sheep, debris, and unlit curves without blinding oncoming drivers.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' });
    } else if (headlights === 'led') {
      score += 15;
      details.push({ system: 'Illumination Tech', status: 'Strong', comment: 'White LED provides bright contrast, vastly outperforming yellow halogen lamps in rain.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' });
    } else {
      score += 5;
      details.push({ system: 'Illumination Tech', status: 'Weak', comment: 'Halogen bulbs offer poor contrast in storm conditions and fail to cut through Connemara mountain fog.', color: 'text-red-600 bg-red-50 border-red-200' });
    }

    // 3. Tyres contribution
    if (tyreTread >= 3.0) {
      score += 15;
      details.push({ system: 'Tyre Tread Depth', status: 'Excellent', comment: 'Treads above 3mm evacuate up to 8 liters of water per second, keeping physical rubber in contact with tarmac.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' });
    } else if (tyreTread >= 1.6) {
      score += 5;
      details.push({ system: 'Tyre Tread Depth', status: 'Warning', comment: 'Sitting close to the legal 1.6mm limit drastically increases aquaplaning risks at speeds above 60km/h.', color: 'text-amber-600 bg-amber-50 border-amber-200' });
    } else {
      score -= 10;
      details.push({ system: 'Tyre Tread Depth', status: 'Critical Failure', comment: 'Below legal limits. Your vehicle is practically skimming over surface pooling, losing complete braking force.', color: 'text-red-600 bg-red-50 border-red-200' });
    }

    // 4. Ground clearance contribution
    if (groundClearance >= 180) {
      score += 10;
      details.push({ system: 'Undercarriage Clearance', status: 'Optimal', comment: '180mm+ clearance keeps the oily mechanical components, fuel lines, and exhaust above localized flooding pools.', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' });
    } else if (groundClearance >= 145) {
      score += 5;
      details.push({ system: 'Undercarriage Clearance', status: 'Standard', comment: 'Sufficient for minor road spray, but exercise extreme caution around deep puddles in low-lying bog lanes.', color: 'text-amber-600 bg-amber-50 border-amber-200' });
    } else {
      score -= 5;
      details.push({ system: 'Undercarriage Clearance', status: 'High Vulnerability', comment: 'Low sport structures run a high risk of bottoming out on sunken roads or ingesting water into air intakes.', color: 'text-red-600 bg-red-50 border-red-200' });
    }

    const finalScore = Math.min(100, Math.max(0, score));
    let evaluation = 'MODERATE';
    let alertColor = 'text-amber-600 bg-amber-50 border-amber-200';
    if (finalScore >= 80) {
      evaluation = 'EXCELLENT (Storm Ready)';
      alertColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
    } else if (finalScore < 50) {
      evaluation = 'VULNERABLE (Avoid Mountain Storms)';
      alertColor = 'text-red-600 bg-red-50 border-red-200';
    }

    return { score: finalScore, evaluation, alertColor, details };
  }, [drivetrain, headlights, tyreTread, groundClearance]);

  const rainStats = [
    { name: 'Jan', Days: 22, mm: 140 },
    { name: 'Feb', Days: 18, mm: 110 },
    { name: 'Mar', Days: 19, mm: 95 },
    { name: 'Apr', Days: 16, mm: 75 },
    { name: 'May', Days: 15, mm: 65 },
    { name: 'Jun', Days: 14, mm: 70 },
    { name: 'Jul', Days: 16, mm: 85 },
    { name: 'Aug', Days: 17, mm: 100 },
    { name: 'Sep', Days: 18, mm: 115 },
    { name: 'Oct', Days: 21, mm: 135 },
    { name: 'Nov', Days: 22, mm: 145 },
    { name: 'Dec', Days: 23, mm: 150 },
  ];

  const faqItems = [
    {
      q: "Why does the West of Ireland experience such severe driving conditions compared to the East?",
      a: "The geography of the West Coast exposes counties like Galway directly to prevailing Atlantic wind patterns. Atlantic depressions funnel high-speed air streams directly into coastal terrain, creating persistent high-wind zones, extreme wind shear, and high volumes of localized rainfall. Galway averages up to 230 to 250 wet days per year. When combined with old, winding, and unlit secondary rural roads (like portions of the N59 or coastal Connemara lanes), these weather cycles demand vehicles with exceptional mechanical traction, higher chassis clearances, and premium headlight layouts to ensure safe passage."
    },
    {
      q: "Does All-Wheel Drive (AWD) really make a difference in rain, or is it only for snow?",
      a: "Yes, All-Wheel Drive is extremely beneficial in heavy rain. When torrential downpours hit ungritted roads, greasy films of oil, rubber dust, and mud rise to the surface. In a typical front-wheel-drive or rear-wheel-drive car, if one power wheel hits a patch of greasy water, the tire instantly spins and loses complete traction, triggering a slide. Active AWD systems monitor wheel spin in milliseconds. The instant traction slip is detected, torque is routed directly to the wheels with maximum grip, stabilizing the chassis instantly and preventing understeer or tail-slides."
    },
    {
      q: "How does coastal salt air affect used vehicles in regions like Salthill and Barna?",
      a: "Coastal air carries fine ocean salt spray which settles on the metal undersides of parked or driven vehicles. Salt is an aggressive chemical catalyst that rapidly accelerates the electrochemical process of oxidation (rusting). Over time, vehicles with raw, untreated undercarriages suffer structural damage to chassis sills, exhaust hangers, brake lines, and suspension brackets. Sourcing high-grade, metropolitan Japanese imports is highly recommended because regions like Tokyo do not salt their roads, and Japanese vehicle culture emphasizes spotless undercarriages. At ShahMotors, we apply thick, marine-grade protective rust-proofing to all import vehicles before delivery."
    },
    {
      q: "What tyre tread depth should I run during the wet winter months in Galway?",
      a: "While the Irish legal minimum tyre tread depth is 1.6mm, driving at this level in wet weather is highly dangerous. At 1.6mm of tread depth, tires lose over 70% of their water evacuation capacity. At standard driving speeds (80km/h), a thin-tread tire will ride up on a cushion of water (aquaplane), leaving you with zero steering or braking control. For driving in the West of Ireland, we strongly advise replacing your tyres the moment they drop below 3.0mm of tread depth. Deep-channel, wet-weather compound tyres are critical for dispersing heavy surface road water."
    },
    {
      q: "Why are Matrix LED and Adaptive headlights recommended for Connemara routes?",
      a: "Much of Connemara's secondary road network (such as routes connecting Oughterard, Maam Cross, and Letterfrack) completely lacks overhead street lighting. Driving through sudden winter storms or mountain mist with standard yellow halogen bulbs is stressful, as their low contrast makes it difficult to spot dark asphalt borders, fallen branches, or wandering black-faced sheep. Matrix LED and Adaptive headlights produce a brilliant white light that mimics natural daylight, significantly increasing road sign visibility. Adaptive models also swivel their lenses into sharp bends as you turn the steering wheel, illuminating the road ahead before you enter the turn."
    },
    {
      q: "Can hybrid vehicle battery compartments tolerate driving through flooded roads?",
      a: "Yes, provided the water level remains within reasonable limits. High-quality Japanese hybrid imports like the Toyota RAV4 Hybrid or Mitsubishi Outlander PHEV have their high-voltage battery compartments completely sealed and insulated under the floor panels. However, no passenger car or domestic hybrid is designed to be treated as an amphibious vehicle. While these vehicles can wade through shallow, slow-moving road pooling up to their lower wheel rim line safely, attempting to drive through deep, fast-flowing floods can cause severe damage to cooling fans, intake ducts, and electronic modules."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed font-sans scroll-smooth">
      <div className="relative max-w-7xl mx-auto pb-16">
        <Navbar />
      </div>

      {/* Hero Section */}
      {}
      <header className="pt-20 pb-24 bg-linear-to-br from-white via-red-50/40 to-slate-200/50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-black uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            West of Ireland Storm Resilience redprint
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            West of Ireland Driving: <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-700 to-red-600">How Severe Weather Affects Cars</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Rain, heavy coastal winds, and freezing mountain fog are staples of life in County Galway. Learn which mechanical features—from smart AWD systems to adaptive lighting tech—you must prioritize to survive the elements safely.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white shadow-xs border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#GalwayWeatherDriving</span>
            <span className="px-4 py-2 bg-white shadow-xs border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#AWDUsedCarsIreland</span>
            <span className="px-4 py-2 bg-white shadow-xs border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#CoastalRustPrevention</span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      {}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Sidebar Left */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-10">
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-6">Storm-Proof Chapters</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#intro" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    1. The West\'s Extreme Climates
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    2. Dynamic Weather Simulator
                  </a>
                </li>
                <li>
                  <a href="#tech" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    3. Crucial Vehicle Technology
                  </a>
                </li>
                <li>
                  <a href="#priority" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    4. Weather Spec Calculator
                  </a>
                </li>
                <li>
                  <a href="#picks" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    5. Top Safe Vehicle Picks
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    6. Cold-Season Diagnostics
                  </a>
                </li>
                <li>
                  <a href="#faq" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    7. Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </div>

            {/* Weather Alert CTA Box */}
            <div className="p-6 bg-slate-950 text-white rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <h4 className="text-lg font-black mb-2 text-white">Drive with Absolute Trust</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Don\'t let winter downpours catch you out. Our Japanese hybrid imports are pre-waxed, rust-proofed, and fitted with certified security systems.
              </p>
              <Link href="/cars" className="w-full flex items-center justify-center py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-red-900/30">
                STORM-PROOF CARS
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Panel Right */}
        {}
        <div className="lg:col-span-9 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          <section id="intro" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">1. Climatology and Connacht Geography: The Coastal Driving Reality</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                To tourists, driving along the winding roads of Connemara, through Maam Cross, or past the steep mountains of Clifden is a postcard-perfect dream. For the local people who live and work here, however, driving in the West of Ireland is a daily lesson in mechanical survival. Our unique geography positions County Galway directly in the path of active Atlantic weather depressions, resulting in some of the most challenging driving conditions in northern Europe.
              </p>
              <p>
                Galway experiences up to 230 to 250 rainy days per year. It is not just the volume of water that is challenging; it is how the water meets the terrain. In Connemara, sudden cloudbursts funnel torrential rainfall down steep valleys, turning low-lying roads like the <strong>N59 corridor</strong> or local lanes around Joyces Country into temporary water channels within minutes.
              </p>
              <p>
                Furthermore, the coastal routes—running from the busy docks of Galway City, past Salthill, and outward along Barna, Spiddal, and Roundstone—face intense ocean gales and salt air. Coastal storms produce crosswinds that can exceed 100km/h, hitting the sides of high-profile vehicles with immense lateral force. These gales also carry fine saltwater spray, creating a highly corrosive environment for vehicle undercarriages.
              </p>
              
              {/* Climate Data Graph */}
              <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-3xl">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 text-center">Average Monthly Rain Volume & Wet Days (Galway Region)</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={rainStats}>
                      <defs>
                        <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f80606" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f80606" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 10 }} label={{ value: 'Rain (mm)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#f80606' } }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} label={{ value: 'Wet Days', angle: 90, position: 'insideRight', style: { fontSize: 12, fill: '#f80606' } }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: 12 }} />
                      <Area yAxisId="left" type="monotone" dataKey="mm" stroke="#f80606" fillOpacity={1} fill="url(#colorRain)" name="Volume (mm)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <span className="text-xs text-slate-500 block text-center mt-2 italic">Data reflects long-term regional weather profiles. Peak volumes occur from October through January.</span>
              </div>

              <p>
                Faced with these persistent environmental cycles, your choice of vehicle cannot be based solely on styling, price, or brand prestige. A vehicle that is perfectly suited for dry, well-lit suburban lanes in eastern counties will quickly show its vulnerabilities on the West Coast. To ensure safe, confident, and reliable travel, your car must be mechanically prepared to withstand coastal salt air, deep surface water, slick asphalt films, and dark, unlit rural roads.
              </p>
            </div>
          </section>

          {/* Section 2: Storm Simulator */}
          {}
          <section id="simulator" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">2. Interactive Simulator: Galway Weather Hazard Strains</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Select a typical West of Ireland winter weather hazard below to see the specific mechanical strains it places on your vehicle, along with recommended preventive specifications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              {Object.keys(hazardScenarios).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedHazard(key)}
                  className={`p-4 rounded-xl border text-left transition duration-150 ${selectedHazard === key ? 'border-red-600 bg-red-50 text-red-600 font-bold shadow-xs' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  <span className="text-[10px] uppercase font-black text-slate-400 block mb-1">Select Condition</span>
                  <span className="text-xs font-bold block truncate">{hazardScenarios[key].name.split(' (')[0]}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              <span className="text-xs font-black uppercase text-red-500 tracking-wider">Active Hazard Diagnostics</span>
              <h3 className="text-xl md:text-2xl font-black mt-2 mb-4">{hazardScenarios[selectedHazard].name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">Wind Intensity Profile:</span>
                    <span className="font-semibold text-red-400">{hazardScenarios[selectedHazard].wind}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">Rainfall/Moisture Level:</span>
                    <span className="font-semibold text-white">{hazardScenarios[selectedHazard].rain}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">Key Driving Threat:</span>
                    <span className="font-semibold text-red-400">{hazardScenarios[selectedHazard].hazard}</span>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 mb-2">Automotive Solution Guide:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{hazardScenarios[selectedHazard].advice}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Crucial Tech */}
          {}
          <section id="tech" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">3. Crucial Vehicle Technology for the Irish Elements</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Drivetrain Architecture: FWD vs RWD vs AWD</h3>
                <p>
                  The mechanical layout of your vehicle\'s drivetrain plays a huge role in handling slick, rain-soaked Irish secondary roads. 
                </p>
                <p>
                  <strong>Rear-Wheel Drive (RWD)</strong> is a popular choice for executive saloons, but can be highly problematic in the West. Because power is delivered to the rear wheels while the steering is managed by the front, RWD cars are highly prone to "oversteer" (where the rear of the car slides outward) when accelerating on ungritted, wet, or frosty lanes. 
                </p>
                <p>
                  <strong>Front-Wheel Drive (FWD)</strong> is significantly safer for daily driving, as the weight of the engine sits directly over the drive wheels, maximizing grip. FWD cars generally suffer from "understeer" (sliding slightly wide when cornering too fast), which is much easier for a driver to correct safely.
                </p>
                <p>
                  However, the absolute gold standard for safety in Connacht is <strong>All-Wheel Drive (AWD)</strong>. Modern electronic AWD systems (such as Toyota\'s E-Four or Subaru\'s Symmetrical AWD) continuously monitor wheel traction. The instant they detect slipping, torque is distributed dynamically to the wheels with the strongest grip. This provides unmatched stability on muddy roads, greasy asphalt, and water pooling.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Advanced Driver Assistance Systems (ADAS) & ESC</h3>
                <p>
                  When high winds hit your car along exposed routes like the Quincentennial Bridge or the M6 motorway bypass, the car\'s stability systems are your primary line of defense. 
                </p>
                <p>
                  <strong>Electronic Stability Control (ESC)</strong> is a lifesaver in extreme weather. It continuously monitors your steering input and wheel rotation. If the system detects the car is sliding or drifting sideways due to a sudden crosswind gust, it automatically brakes individual wheels in milliseconds to pull the car back on line. When coupled with Lane Keep Assist (LKA) and Blind Spot Monitoring, these safety modules work together to counteract wind-induced drift.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Headlight Technology: Cutting Through Mountain Mist</h3>
                <p>
                  Navigating the unlit N59 routes past Maam Cross in pitch-black storm conditions requires premium lighting. 
                </p>
                <p>
                  Older <strong>halogen bulbs</strong> emit a warm, yellow light that struggles to pierce dense fog and rain, causing significant glare back into the driver\'s eyes. Modern <strong>LED headlights</strong> produce a crisp, daylight-white beam that vastly increases roadside contrast, making it much easier to spot debris, standing water, and wandering sheep.
                </p>
                <p>
                  For the ultimate in night safety, search for vehicles fitted with <strong>Adaptive / Matrix LED headlights</strong>. These systems dynamically adjust the light beam to steer into curves as you turn and dim specific sections of the beam to avoid blinding oncoming traffic while keeping the roadside brilliantly lit.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">4. Underbody Rust Protection</h3>
                <p>
                  As salt air settles on your vehicle\'s underside in coastal areas like Salthill and Barna, raw steel components are highly vulnerable to rust. 
                </p>
                <p>
                  This is why sourcing a high-grade Japanese import is a smart choice for long-term durability. Because metropolitan Japan does not use road salt, imported vehicles arrive with exceptionally clean, rust-free chassis. At <strong>ShahMotors</strong>, we ensure all our vehicles are thoroughly treated with premium underbody rust-proofing before delivery, protecting your investment for years of West of Ireland winters.
                </p>
              </div>

            </div>
          </section>

          {/* Section 4: Safety Spec Calculator */}
          {}
          <section id="priority" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">4. Diagnostic Tool: Calculate Your Car\'s Storm Resilience</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Select your vehicle\'s current specifications below to calculate an immediate "Connacht Storm Resilience Score" and view safety recommendations.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/80 mb-8">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">Your Vehicle Specs</h4>
                
                {/* Drivetrain Selection */}
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-2">Drivetrain Configuration:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['fwd', 'rwd', 'awd'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setDrivetrain(item)}
                        className={`py-2 rounded-xl text-xs font-bold border transition uppercase ${drivetrain === item ? 'bg-red-600 text-white border-red-600 shadow-xs' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Headlights Selection */}
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-2">Lighting System:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['halogen', 'led', 'matrix'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setHeadlights(item)}
                        className={`py-2 rounded-xl text-xs font-bold border transition uppercase ${headlights === item ? 'bg-red-600 text-white border-red-600 shadow-xs' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tyre Tread Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Tyre Tread Depth (mm):</span>
                    <span className="text-red-600 font-bold">{tyreTread.toFixed(1)} mm</span>
                  </div>
                  <input 
                    type="range" 
                    min="1.0" 
                    max="6.0" 
                    step="0.1" 
                    value={tyreTread} 
                    onChange={(e) => setTyreTread(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Irish legal minimum is 1.6mm. 3mm+ is highly recommended for safety in rain.</span>
                </div>

                {/* Ground Clearance Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Ground Clearance (mm):</span>
                    <span className="text-red-600 font-bold">{groundClearance} mm</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="220" 
                    step="10" 
                    value={groundClearance} 
                    onChange={(e) => setGroundClearance(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Score Display Panel */}
              <div className="flex flex-col justify-between bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 text-center">
                <div>
                  <span className="text-xs font-black uppercase text-slate-400 block tracking-wider mb-2">Resilience Score</span>
                  <div className="text-5xl font-black text-red-500 mb-2">{resilienceAnalysis.score}%</div>
                  <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-black border uppercase ${resilienceAnalysis.alertColor}`}>
                    {resilienceAnalysis.evaluation}
                  </div>
                </div>

                <div className="mt-6 text-left space-y-3">
                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Systems Evaluation:</h5>
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {resilienceAnalysis.details.map((item, idx) => (
                      <div key={idx} className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-slate-400">{item.system}</span>
                          <span className="text-red-400">{item.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-1 leading-normal">{item.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Top Picks */}
          {}
          <section id="picks" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">5. Vetted & Proven: Safe Car Categories for the West Coast</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Based on overall stability, ground clearance, safety systems, and rust resistance, these three premium categories offer outstanding performance in harsh Irish winter conditions.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "1. Premium Japanese Hybrid SUVs (e.g., Toyota RAV4 Hybrid AWD-i)",
                  desc: "The absolute gold standard for families. Merging a robust, reliable 2.5L petrol engine with dynamic rear electric motors creates a highly intelligent AWD system that reacts instantly to slipping tires. Combined with an elevated ground clearance (approx 190mm), these SUVs wade through localized pooling safely while keeping cabin comfort exceptionally high.",
                  tech: "AWD-i, LED Headlights, Lane Trace Assist, Underbody Rust Treatment"
                },
                {
                  title: "2. Symmetrical AWD Cross-Country Vehicles (e.g., Subaru Forester AWD)",
                  desc: "Designed specifically for harsh, rugged, and unpaved terrain. Symmetrical Permanent AWD ensures that power is continuously split across all four tires, providing exceptional stability on mud, gravel, and ungritted mountain passes around Connemara. A low center of gravity from its Boxer engine minimizes body sway during coastal wind gusts.",
                  tech: "Symmetrical AWD, EyeSight ADAS, X-Mode Offroad System"
                },
                {
                  title: "3. Compact Elevated Hatchbacks (e.g., Suzuki Vitara AllGrip / JDM Hybrid March)",
                  desc: "Ideal for solo commuters or couples who want SUV safety with a compact footprint that makes parking on narrow Galway City streets a breeze. These vehicles offer a slightly elevated seating position to vastly improve road visibility over stone walls, whileselectable AllGrip systems provide instant 4WD reassurance when needed.",
                  tech: "AllGrip Selectable AWD, Compact Turn Radius, Mild Hybrid Efficiency"
                }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl hover:border-red-200 transition duration-300">
                  <h4 className="text-lg font-black text-slate-950 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                      Primary Tech: {item.tech}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Winter Checklist */}
          {}
          <section id="checklist" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">6. Cold-Season Diagnostics: Prepare Your Vehicle for Irish Winters</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Regular maintenance is critical for safety when severe weather hits. Use our simple pre-winter diagnostic checklist to ensure your car is fully prepared:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "1. Tyre Tread & Wet Grip Checks", body: "Ensure all tires have at least 3.0mm of tread depth before the rain and frost seasons arrive. Check for uneven shoulder wear, which indicates steering misalignment—an issue that can cause unsafe handling on uneven roads." },
                { title: "2. Windscreen Wipers & Defrost Prep", body: "Inspect wiper blades for tears or smearing. Heavy wind and ocean foam require spotless visibility. Ensure your screenwash reservoir is topped up with a high-concentration winter formula to prevent the lines from freezing." },
                { title: "3. 12V Accessory Battery Vetting", body: "Cold winter mornings place massive stress on your starter battery. Have a professional check your 12V battery\'s cranking health to avoid getting stranded with a flat battery." },
                { title: "4. Illumination & Bulb Check", body: "Verify that all bulbs—hazard lights, main beams, fog lights, and reverse lights—are working perfectly. Blown bulbs significantly reduce your visibility and are an immediate NCT failure." }
              ].map((chk, idx) => (
                <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-950 text-sm mb-2">{chk.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{chk.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: FAQ */}
          {}
          <section id="faq" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-slate-900">7. Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left transition hover:bg-slate-100"
                  >
                    <span className="font-bold text-slate-900 text-sm md:text-base">{item.q}</span>
                    <span className="text-slate-500 text-2xl shrink-0">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  <div className={`px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed transition-all duration-300 ${activeFaq === idx ? 'block' : 'hidden'}`}>
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final Call To Action */}
          {}
          <div className="bg-linear-to-br from-red-700 to-slate-900 text-white p-8 md:p-12 rounded-3xl shadow-xl mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4">Need a Storm-Resilient Vehicle?</h3>
            <p className="text-red-100 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8 opacity-90">
              Don\'t risk your family\'s safety in unvetted private sales. Explore our range of highly inspected, pre-owned Japanese import SUVs and 4x4s. Fully serviced, alarm-equipped, rust-proofed, and ready to face the elements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleClick}
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-black rounded-xl hover:bg-slate-50 transition duration-150 shadow-lg disabled:opacity-80 disabled:cursor-not-allowed min-w-70"
              >
                {isPending ? (
                  <>
                    {/* Tailwind Loading Spinner */}
                    <svg
                      className="animate-spin h-5 w-5 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        // removed the invalid disabled={isPending} line from here
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    LOADING...
                  </>
                ) : (
                  "VIEW INSTANT SUV STOCK"
                )}
              </button>
              <button 
                onClick={() => {
                  const url = `https://wa.me/353833526830?text=${encodeURIComponent("Hi, I'd like to book a test drive!")}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="px-8 py-4 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-900 transition duration-150 border border-slate-800"
              >
                BOOK TEST DRIVE
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}