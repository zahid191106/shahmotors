"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type ClassComparisonKey = 'saloons' | 'hybrids';

type ClassDetails = {
  title: string;
  subtitle: string;
  verdict: string;
  fuelEfficiency: string;
  maintenanceCost: string;
  idealFor: string;
  topModels: string[];
};


// ==========================================
// MAIN REUSABLE APP COMPONENT
// ==========================================
const App = () => {
  const [activeTab, setActiveTab] = useState<ClassComparisonKey>('saloons');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Recharts Data comparing running costs over typical long-distance commutes (Euro / Year based on 30,000 km)
  const costComparisonData = [
    { name: 'Petrol 1.4 TSI', fuel: 2850, tax: 280, service: 350 },
    { name: 'Diesel 2.0 TDI', fuel: 1980, tax: 200, service: 450 },
    { name: 'Hybrid 1.8 HSD', fuel: 1840, tax: 180, service: 300 },
    { name: 'Plug-in PHEV', fuel: 1650, tax: 170, service: 400 },
  ];

  const comparisonMap: Record<ClassComparisonKey, ClassDetails> = {
    saloons: {
      title: "Traditional Diesel Saloons (D-Segment)",
      subtitle: "The unmatched workhorses of the motorway. Power, heavy chassis weight, and long wheelbase comfort.",
      verdict: "Outstanding for straight lines, crosswinds, and high high-speed stability across the Shannon basin.",
      fuelEfficiency: "4.2L - 5.0L/100km (Approx. 56 - 67 MPG on the motorway)",
      maintenanceCost: "Moderate to high. Complex turbo and emissions filter systems require rigorous scheduling.",
      idealFor: "Commuters driving 3+ times per week who prioritize quiet high-speed road manners and long wheelbases.",
      topModels: ["Volkswagen Passat 2.0 TDI", "Skoda Octavia 2.0 TDI", "Toyota Avensis D-4D"]
    },
    hybrids: {
      title: "Self-Charging / Plug-In Hybrids",
      subtitle: "The modern efficiency champions. Synergy engine drives that excel in both city queues and motorway cruising.",
      verdict: "Unbeatable overall running costs, bulletproof reliability, and zero emissions in heavy urban traffic jams.",
      fuelEfficiency: "3.8L - 4.5L/100km (Approx. 62 - 74 MPG average)",
      maintenanceCost: "Low. Lighter friction on braking components and simplified mechanical transmission layouts.",
      idealFor: "Daily commuters navigating deep into Dublin's city center quays after exiting the M6/M4 toll points.",
      topModels: ["Toyota Prius (Gen 4)", "Hyundai Ioniq Hybrid", "Toyota Corolla Saloon Hybrid"]
    }
  };

  const faqItems = [
    {
      question: "Is diesel still the best option for a daily Galway-to-Dublin M6 commute?",
      answer: "Yes, diesel remains highly competitive for the M6 commute because high-speed motorway driving (120 km/h) allows the engine to operate at its peak thermal efficiency. It also keeps the Diesel Particulate Filter (DPF) hot enough to perform continuous regeneration, preventing soot buildup. However, modern self-charging hybrids are very close in motorway fuel economy while offering much lower maintenance costs."
    },
    {
      question: "How long does a typical commute between Galway and Dublin take on the M6?",
      answer: "The distance from Galway city center to Dublin city center is approximately 205 km. Driving at the legal speed limits of 120 km/h on the motorway sections and navigating city traffic on both ends, a single leg takes roughly 2 hours to 2 hours and 30 minutes, depending heavily on the peak rush hour bottleneck at the West-Link toll bridge or the Dublin Quays."
    },
    {
      question: "What is the toll cost between Galway and Dublin, and how can I pay?",
      answer: "There are two toll points along the route: the M6 toll near Ballinasloe (currently €2.10 for private cars) and the M50 toll if you bypass into Dublin (currently €2.30 to €3.50 depending on registration). Commuters should invest in an automated eFlow tag to skip manual queues and automatically secure discounted monthly billing."
    },
    {
      question: "Why does wind stability matter so much on the M6 motorway?",
      answer: "The M6 motorway cuts directly across the flat, open geographical plains of the Irish midlands (the Shannon Basin). This makes the route highly susceptible to strong, gusty crosswinds blowing in from the Atlantic. Cars with a low profile, wider stance, and heavier curb weight (like traditional saloons) are much more stable and comfortable to drive in these conditions."
    },
    {
      question: "Can I save money by choosing a Plug-In Hybrid (PHEV) for the M6 commute?",
      answer: "PHEVs are exceptional if you can charge the battery at both ends of your commute. This allows you to drive the first 40–50 km on pure electricity. However, once the battery drains, you are carrying the heavy weight of an electric battery using a small petrol engine, which can actually decrease fuel efficiency on high-speed motorway runs."
    },
    {
      question: "How does Adaptive Cruise Control (ACC) improve the commuter experience?",
      answer: "Adaptive Cruise Control is a game-changer for long-distance drivers. Traditional cruise control maintains a fixed speed, but ACC uses radar sensors to detect the speed of the vehicle ahead, automatically braking and accelerating to keep a safe gap. This significantly reduces driver fatigue, especially during unexpected traffic slowdowns near Athlone or Maynooth."
    },
    {
      question: "What are the key safety features to prioritize for driving in the dark on unlit roads?",
      answer: "Large stretches of the M6 motorway and regional approach roads in Galway are entirely unlit. Prioritize commuter cars equipped with high-performance LED or Xenon projector headlights, Automatic High-Beam Assist (AHB), and Lane Keep Assist (LKA) to help you stay centered and highly visible during rainy winter nights."
    },
    {
      question: "What is the difference in road tax between older diesel and modern hybrid commuter cars?",
      answer: "Emissions-based motor tax systems in Ireland favor low-emission vehicles. Most modern self-charging hybrid cars sit in the lowest tax brackets (typically €170 or €180 per year). Older, larger-capacity diesel saloons can range from €200 to €280 per year. Over a multi-year ownership cycle, these tax differences add up significantly."
    },
    {
      question: "How often should I service my car if I am doing 30,000+ kilometers a year?",
      answer: "Frequent high-mileage drivers should adjust their service schedules. Instead of annual intervals, service your vehicle every 10,000 to 15,000 kilometers. This includes fresh high-grade synthetic engine oil, oil filters, and cabin air filters. Regular servicing is critical for protecting turbochargers on diesels and maintaining peak efficiency on hybrids."
    },
    {
      question: "Will a small engine car (like a 1.0-litre petrol hatchback) survive the daily M6 commute?",
      answer: "While 1.0L petrol engines are excellent for city runabouts, they have to work extremely hard at 120 km/h on the motorway. Running at high RPMs for extended periods increases fuel consumption, noise levels, and engine wear. For comfortable, long-term M6 commuting, we strongly recommend a minimum of a 1.5L hybrid or a 2.0L diesel engine."
    }
  ];

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'economics', title: '1. Fuel Math (Diesel vs Hybrid)' },
    { id: 'specs', title: '2. Motorway Feature Essentials' },
    { id: 'comparison', title: '3. Saloon vs. Hybrid Specs' },
    { id: 'top5', title: '4. Top 5 Used Commuter Cars' },
    { id: 'maintenance', title: '5. High-Mileage Care Guide' },
    { id: 'analysis', title: 'In-Depth Technical Analysis' },
    { id: 'faq', title: 'FAQs' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed font-sans">
        {/* Navigation */}
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>

      {/* Hero Section */}
      <header className="pt-40 pb-20 bg-gradient-to-br from-white via-red-50 to-red-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
            The Best Used Commuter Cars <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">For the Galway-to-Dublin M6 Drive</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Commuting across the Irish midlands weekly or daily? Discover the ultimate used saloons, hatchbacks, and hybrids engineered to make your 400km journey comfortable, safe, and highly affordable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#CommuterCarsIreland</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#M6MotorwayDriving</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#UsedCarsGalway</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar Left side */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 space-y-10">
            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest text-slate-400 mb-6">Table of Contents</h4>
              <ul className="space-y-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`} 
                      className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm"
                    >
                      <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Sidebar Box */}
            <div className="p-5 bg-red-600 rounded-3xl text-white shadow-2xl shadow-red-200">
              <h4 className="text-lg font-black mb-3">Long Commute?</h4>
              <p className="text-base text-red-50/80 mb-6 leading-relaxed">Let us find you the perfect hybrid or diesel cruiser. Browse our highly fuel-efficient vehicles today.</p>
              <a 
                href="/catalog"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full py-4 bg-white text-red-600 font-black cursor-pointer rounded-xl hover:bg-slate-100 transition-transform active:scale-95 shadow-lg">
                  VIEW COMMUTER STOCK
                </button>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Area Right side */}
        <div className="lg:col-span-9 bg-white p-4 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          <section id="intro" className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Introduction: Navigating Ireland's Great East-West Corridor</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                The Galway-to-Dublin commute is one of the most heavily traversed long-distance corridors in Ireland. Spanning approximately 205 kilometers from the edge of Galway Bay, across the heart of the Shannon basin, and into the busy capital on the Irish Sea, the M6 motorway is a vital economic lifeline. 
              </p>
              <p className="mb-4">
                However, executing this drive on a recurring daily or weekly basis is physically demanding on both the driver and the machine. It exposes vehicles to relentless coastal crosswinds, heavy winter downpours, unexpected motorway gridlocks near Athlone, and the slow, stop-start traffic waiting at Dublin's West-Link or Liffey Quays.
              </p>
              <p className="mb-4">
                To keep your monthly commuting budget under control, you need a highly specialized vehicle. The perfect M6 commuter cruiser cannot simply be a cheap city runabout. It must offer exceptional fuel economy at sustained high speeds (120 km/h), high-level cabin insulation to keep wind noise low, supportive ergonomic seating to prevent back fatigue, and robust active safety features.
              </p>
              <p className="mb-8 font-semibold text-red-600">
                At ShahMotors, we specialize in supplying high-performance, ultra-reliable commuter vehicles. This comprehensive guide breaks down the technical math, essential specifications, and the top five used vehicles to turn the M6 into a stress-free, cost-efficient drive.
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section id="economics" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">1. The Commuter's Math: Diesel vs. Petrol vs. Hybrid</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                The single biggest expense for any regular M6 commuter is fuel. When you are driving 400 kilometers round-trip, even minor differences in fuel economy translate to hundreds of Euros saved or lost over a single month.
              </p>
              <p className="mb-4">
                Historically, the default choice for long-distance driving was always a manual diesel car. Diesel engines operate at high thermal efficiency under sustained loads. For straight motorway cruising at 120 km/h, a modern 2.0-litre turbodiesel remains exceptionally efficient.
              </p>
              <p className="mb-4">
                However, self-charging hybrids have advanced rapidly. Models like the Gen 4 Toyota Prius leverage aerodynamic styling and smart energy recapturing to deliver motorway fuel economy that easily rivals traditional diesel vehicles. Furthermore, hybrids do not suffer from the expensive emissions system failures (like blocked DPFs or leaking AdBlue lines) that can occur in diesel cars.
              </p>
            </div>

            {/* Recharts Fuel / Cost Comparison Chart */}
            <div className="my-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 text-center tracking-widest">Estimated Annual Commuter Running Costs (Euro / 30,000 KM)</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                    />
                    <Legend verticalAlign="top" align="right" />
                    <Bar dataKey="fuel" fill="#dc2626" name="Fuel Expense (€)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="tax" fill="#0284c7" name="Annual Motor Tax (€)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="service" fill="#475569" name="Est. Servicing (€)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-400 mt-4 italic text-center">Calculations based on average fuel costs in Ireland, representing a typical cross-country commuting cycle.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="specs" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">2. Motorway Essentials: Features That Keep You Fresh</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                When you spend four hours a day behind the wheel, driving comfort is not a luxury; it is a critical safety factor. High fatigue levels degrade reaction times, making driver environment layout and in-car features incredibly important.
              </p>
              <p className="mb-4">
                If you are shopping for second-hand cars in Galway to complete the M6 journey, look for models configured with these three essential motorway features:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
                <li><strong>Adaptive Cruise Control (ACC):</strong> Unlike standard cruise control, ACC uses radar sensors to match the speed of the vehicle ahead of you. It makes long motorway runs and heavy commuter queues near the M50 transition incredibly easy.</li>
                <li><strong>Sound Insulation and NVH Dampening:</strong> Sustained wind and tyre road roar (Noise, Vibration, and Harshness) can cause headaches and mental fatigue. Saloons generally offer better sound isolation compared to hatchbacks because the boot area is separated from the passenger cabin by a steel bulkhead.</li>
                <li><strong>Ergonomic Lumbar Seats:</strong> Ensure the car has multi-point seat adjustments, specifically adjustable under-thigh and lower back lumbar support. This keeps your posture properly aligned and prevents lower back pain on long drives.</li>
              </ul>
            </div>

            <p className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 rounded-r-lg italic">
              <strong>Motorway Tip:</strong> Don't underestimate the impact of tyre selection on fuel economy. Replacing budget, high-rolling-resistance tyres with premium eco-focused tyres from Michelin or Bridgestone can improve fuel efficiency by up to 4% on long-distance motorway runs.
            </p>
          </section>

          {/* Section 3 */}
          <section id="comparison" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">3. Class War: Heavy Saloons vs. High-Efficiency Hybrids</h2>
            <p className="mb-6">
              When choosing your next M6 cruiser, the main decision comes down to vehicle class. Let's compare traditional diesel saloons against modern self-charging hybrids.
            </p>
            
            {/* Interactive Tabs */}
            <div className="flex space-x-1 p-1 bg-slate-100 rounded-xl mb-8">
              <button 
                onClick={() => setActiveTab('saloons')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${activeTab === 'saloons' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Traditional D-Segment Saloons
              </button>
              <button 
                onClick={() => setActiveTab('hybrids')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${activeTab === 'hybrids' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Modern Self-Charging Hybrids
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-red-300 transition group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold group-hover:text-red-600 transition">{comparisonMap[activeTab].title}</h3>
                <span className="text-xs px-3 py-1 rounded-full font-bold bg-green-100 text-green-700">
                  {activeTab === 'saloons' ? 'Motorway King' : 'Efficiency Champion'}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-6 font-medium">{comparisonMap[activeTab].subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Performance Specifications</h4>
                  <ul className="space-y-4">
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Motorway Stability Rating</span>
                      <span className="font-semibold text-sm text-slate-800">{comparisonMap[activeTab].verdict}</span>
                    </li>
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Real-World Motorway Fuel Economy</span>
                      <span className="font-semibold text-sm text-slate-800">{comparisonMap[activeTab].fuelEfficiency}</span>
                    </li>
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Expected Servicing Costs</span>
                      <span className="font-semibold text-sm text-red-600">{comparisonMap[activeTab].maintenanceCost}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Target Profile & Top Options</h4>
                  <p className="text-sm text-slate-600 mb-4">{comparisonMap[activeTab].idealFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {comparisonMap[activeTab].topModels.map((model, i) => (
                      <span key={i} className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">✔ {model}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 prose prose-slate max-w-none">
              <p className="mb-4">
                Traditional D-segment saloons like the Volkswagen Passat or Skoda Superb are unmatched in their high-speed stability. Their longer wheelbase and heavier curb weight make them highly resistant to crosswinds blowing across the open midland plains, resulting in a very relaxed, planted driving feel.
              </p>
              <p className="mb-4">
                On the other hand, compact hybrid hatchbacks and saloons (like the Toyota Prius or Corolla Hybrid) shine when it comes to overall running costs. They are mechanically simpler—having no traditional starter motor, alternator, clutch, or timing belt in many variants—which translates to lower long-term maintenance costs and exceptional reliability.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="top5" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">4. Top 5 Used Commuter Cars for the M6 Motorway</h2>
            <p className="mb-6">
              Based on real-world reliability, fuel efficiency, cabin comfort, and parts availability in Ireland, these are the top five used vehicles recommended by our team for long-distance commuters.
            </p>

            <div className="space-y-8">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-red-500 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">1. Skoda Octavia (2.0 TDI)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  The Skoda Octavia is the absolute king of Irish motorways. Built on the Volkswagen Group's MQB platform, the Octavia combines massive boot space, a robust cabin, and exceptional fuel economy. The 2.0-litre TDI engine offers plenty of power for overtaking, comfortably achieving over 60 MPG under continuous cruising. It is a highly practical, reliable option for daily commuters.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Class: C-Segment</span>
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Engine: 2.0L Diesel</span>
                  <span className="text-[10px] bg-red-50 border border-red-100 px-2.5 py-1 rounded-md font-bold text-red-600 uppercase">Est. Tax: €190</span>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-red-500 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">2. Toyota Prius Gen 4 (1.8 Hybrid)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  If overall reliability is your top priority, a Japanese-import Toyota Prius is exceptionally hard to beat. The fourth-generation model features a highly aerodynamic body shape (0.24 drag coefficient) that minimizes wind resistance at motorway speeds. The 1.8-litre self-charging hybrid engine is incredibly reliable, and because the car uses regenerative braking, brake discs and pads last significantly longer than in standard vehicles.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Class: Hybrid Hatchback</span>
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Engine: 1.8L Petrol Hybrid</span>
                  <span className="text-[10px] bg-red-50 border border-red-100 px-2.5 py-1 rounded-md font-bold text-red-600 uppercase">Est. Tax: €170</span>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-red-500 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">3. Volkswagen Passat (2.0 TDI)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  For drivers who want a more refined, premium experience, the Volkswagen Passat is a superb choice. It features a longer wheelbase and superior sound dampening compared to smaller hatchbacks, keeping wind and road noise incredibly quiet at 120 km/h. Inside, the cabin layout and supportive seating are designed specifically to prevent driver fatigue on long cross-country journeys.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Class: D-Segment Saloon</span>
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Engine: 2.0L Diesel</span>
                  <span className="text-[10px] bg-red-50 border border-red-100 px-2.5 py-1 rounded-md font-bold text-red-600 uppercase">Est. Tax: €200</span>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-red-500 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">4. Hyundai Ioniq Hybrid (1.6 GDI)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  The Hyundai Ioniq is a direct competitor to the Toyota Prius, offering a highly modern interior and excellent standard equipment (such as Lane Keep Assist and Adaptive Cruise Control). The key differentiator is its dual-clutch automatic transmission, which behaves like a traditional automatic and eliminates the 'drone' noise associated with CVT gearboxes under hard acceleration. It is an incredibly efficient, tech-rich commuter.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Class: Hybrid Fastback</span>
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Engine: 1.6L Petrol Hybrid</span>
                  <span className="text-[10px] bg-red-50 border border-red-100 px-2.5 py-1 rounded-md font-bold text-red-600 uppercase">Est. Tax: €170</span>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-red-500 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-2">5. Toyota Avensis (1.6 or 2.0 D-4D)</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Though production ended in 2018, the Toyota Avensis remains an absolute favorite for high-mileage drivers across Ireland. Its reputation for bulletproof reliability is well-deserved. The late-generation models feature a clean, quiet cabin and comfortable seating, making them an excellent value-for-money option for commuters who want a dependable saloon without the price tag of a newer vehicle.
                </p>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Class: D-Segment Saloon</span>
                  <span className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md font-bold text-slate-500 uppercase">Engine: 2.0L Diesel</span>
                  <span className="text-[10px] bg-red-50 border border-red-100 px-2.5 py-1 rounded-md font-bold text-red-600 uppercase">Est. Tax: €200</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="maintenance" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">5. High-Mileage Maintenance: Preventing Breakdown Stress</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                Doing a sustained cross-country commute means your car will accumulate mileage at double or triple the national average rate. To prevent unexpected breakdowns on the M6, high-mileage commuters must prioritize proactive maintenance.
              </p>
              <p className="mb-4">
                Do not wait for the manufacturer's maximum service light to illuminate. When a car is subjected to daily high-speed runs, oil gets exposed to high thermal stress. We recommend a full engine oil and filter change every 10,000 to 12,000 kilometers using premium-grade, fully synthetic oil.
              </p>
              <p className="mb-4">
                Furthermore, pay close attention to your steering alignment and tracking. Hitting deep potholes around Galway or driving over rough rural lanes can knock your alignment out of balance. Misaligned wheels increase rolling resistance, which can decrease fuel economy by up to 5% and cause uneven, premature wear on your tyres.
              </p>
            </div>
          </section>

          {/* Detailed In-Depth Content */}
          <section id='analysis' className="mb-20 border-t border-slate-100 pt-12 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6">In-Depth Technical Analysis: Motorway Aerodynamics and Gearbox Efficiency</h2>
            <div className="prose prose-sm prose-slate max-w-none text-slate-500">
              <p className="mb-4">
                To maximize your fuel efficiency on the M6, we must look at the physics of motorway driving. Once a vehicle exceeds 80 km/h, the engine's primary job changes: it is no longer fighting vehicle weight; it is fighting **aerodynamic drag**.
              </p>
              <p className="mb-4">
                Aerodynamic drag increases exponentially with speed. A car driving at 120 km/h experiences almost twice as much drag as one driving at 80 km/h. This is why vehicles with a highly aerodynamic profile (such as the Toyota Prius or Hyundai Ioniq) achieve such outstanding motorway fuel economy despite having petrol hybrid drivetrains.
              </p>
              <p className="mb-4">
                Transmission design is also critical. Motorway commuter cars must have gears configured for low RPMs at high speeds. For diesel cars, this means a 6-speed manual or a modern 7-speed dual-clutch automatic (such as Volkswagen's DSG). By keeping the engine spinning at a quiet, efficient 1,800 RPM at 120 km/h, fuel consumption is minimized, and cabin vibration is significantly reduced.
              </p>
              <p className="mb-4">
                Before purchasing any commuter vehicle, have a qualified technician perform a full diagnostic scan of the transmission and hybrid battery pack. At ShahMotors, every vehicle listed in our catalog undergoes these rigorous checks, ensuring your new commuter car is fully prepared for the demands of the Galway-to-Dublin drive.
              </p>
            </div>
          </section>

          {/* Interactive FAQs */}
          <section id="faq" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-slate-900 transition hover:bg-slate-100"
                  >
                    <span className="font-semibold text-lg">{idx + 1}. {item.question}</span>
                    <span className="text-slate-500 text-2xl">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  <div className={`px-6 pb-5 text-slate-600 transition-all duration-300 ${activeFaq === idx ? 'max-h-[500px] opacity-100 font-medium' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <p className="text-base leading-7">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why ShahMotors Block */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 mb-5">
            <h3 className="text-lg font-bold mb-4 text-slate-900 italic">Why ShahMotors?</h3>
            <p className="text-base text-slate-600 mb-6 italic leading-relaxed">
              We understand that your commute is demanding, which is why we only offer vehicles that meet strict quality, reliability, and fuel efficiency standards. Whether you prefer a premium diesel saloon or a highly efficient Japanese hybrid, ShahMotors is here to support you.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-black"><span className='text-red-600'>S</span>M</div>
              <div>
                <span className="block text-sm font-bold text-slate-900 uppercase">Management Team</span>
                <span className="block text-[14px] text-slate-400">ShahMotors Ireland</span>
              </div>
            </div>
          </div>

          {/* Tag Pill Box */}
          <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
            <h4 className="font-bold text-red-900 mb-2">Search Terms Used in this Guide:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Best Commuter Cars Ireland', 'M6 Motorway Driving', 'Fuel Efficient Cars Ireland', 'Used Cars Galway', 'Toyota Prius Ireland', 'Skoda Octavia Used Ireland', 'Used Cars Dublin'
              ].map(tag => (
                <span key={tag} className="text-[14px] font-bold text-red-400 px-2 py-1 bg-white rounded border border-red-100">{tag}</span>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;