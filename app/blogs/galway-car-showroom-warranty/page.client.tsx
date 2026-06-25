"use client";
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


type ComparisonTabKey = 'private' | 'dealer';

type ComparisonDetails = {
  title: string;
  subtitle: string;
  status: string;
  protection: string;
  warranty: string;
  bestFor: string;
  risks: string[];
};

// ==========================================
// INLINE HIGH-FIDELITY NAVBAR COMPONENT
// ==========================================
const LocalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                SHAH<span className="text-red-600">MOTORS</span>
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wider">
            <a href="/" className="text-slate-600 hover:text-red-600 transition-colors">Home</a>
            <a href="/about" className="text-slate-600 hover:text-red-600 transition-colors">About Us</a>
            <a href="/cars" className="text-slate-600 hover:text-red-600 transition-colors">Cars List</a>
            <a href="/blogs" className="text-red-600 font-extrabold border-b-2 border-red-600 pb-1">Blogs</a>
          </div>
          <div className="hidden md:flex items-center">
            <a href="/contact" className="bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 transition-all active:scale-95">
              CONTACT US
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-red-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <a href="/" className="block text-base font-bold text-slate-700 hover:text-red-600 py-2">Home</a>
          <a href="/about" className="block text-base font-bold text-slate-700 hover:text-red-600 py-2">About Us</a>
          <a href="/cars" className="block text-base font-bold text-slate-700 hover:text-red-600 py-2">Cars List</a>
          <a href="/blogs" className="block text-base font-bold text-red-600 py-2">Blogs</a>
          <a href="/contact" className="block text-center bg-red-600 text-white py-3 rounded-xl text-sm font-bold shadow-md">
            CONTACT US
          </a>
        </div>
      )}
    </nav>
  );
};



// ==========================================
// MAIN REUSABLE APP COMPONENT
// ==========================================
const App = () => {
  const [activeTab, setActiveTab] = useState<ComparisonTabKey>('private');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);


  const costComparisonData = [
    { name: 'Clutch / Flywheel', privateSale: 1200, dealerWarranty: 0 },
    { name: 'Turbocharger Fault', privateSale: 1500, dealerWarranty: 0 },
    { name: 'Hybrid Battery Cell', privateSale: 2200, dealerWarranty: 0 },
    { name: 'EGR Valve / DPF Choke', privateSale: 850, dealerWarranty: 0 },
    { name: 'Electrical ECU Bug', privateSale: 950, dealerWarranty: 0 },
  ];

  const comparisonMap: Record<ComparisonTabKey, ComparisonDetails> = {
    private: {
      title: "Private Marketplace Sellers",
      subtitle: "Buying via DoneDeal, Facebook Marketplace, or local classified ads.",
      status: "Let the Buyer Beware (Caveat Emptor)",
      protection: "Virtually None. No statutory consumer protections apply to private transactions.",
      warranty: "Sold strictly as-seen. No return rights or mechanical guarantees exist once funds change hands.",
      bestFor: "Mechanically expert buyers willing to take complete financial risks for a lower initial price point.",
      risks: ["Outstanding finance liabilities", "Disguised curbstoners / illegal unregistered traders", "Pervasive odometer clocking", "Hidden major write-off histories"]
    },
    dealer: {
      title: "Registered SIMI Showrooms (ShahMotors)",
      subtitle: "Buying from a certified vehicle dealership on the Tuam Road, Galway.",
      status: "Consumer Rights Act 2022 Protection",
      protection: "Fully protected under Irish consumer law; vehicles must be of merchantable and durable quality.",
      warranty: "Typically 3, 6, or 12-month comprehensive mechanical and hybrid drivetrain warranties.",
      bestFor: "Everyday drivers, families, and professionals seeking guaranteed reliability and total peace of mind.",
      risks: ["Higher upfront purchase pricing compared to bare private listings (offset by warranty & preparation value)."]
    }
  };

  const faqItems = [
    {
      question: "What legal protection do I have if a car bought privately breaks down the next day?",
      answer: "In Ireland, you have virtually zero legal protection when buying from a private seller. Private transactions are governed by the ancient legal principle of 'Caveat Emptor' (Let the buyer beware). Unless you can prove the seller actively lied to a direct question or committed explicit fraud, you have no legal recourse. The seller is under no obligation to disclose mechanical flaws."
    },
    {
      question: "How has the Consumer Rights Act 2022 changed buying from a dealership in Galway?",
      answer: "The Consumer Rights Act 2022 significantly strengthened protection for Irish buyers. If you buy a used car from an authorized dealer like ShahMotors, the vehicle must be of 'merchantable quality' and fit for purpose, but crucially, it must now be 'durable'. If a major component fails prematurely without driver fault, the law presumes the defect existed at purchase, making the dealer legally responsible for repairing or replacing it."
    },
    {
      question: "What is a 'disguised trader' on Facebook Marketplace or DoneDeal?",
      answer: "A disguised trader (or curbstoner) is an illegal, unregistered dealer posing as a private family seller. They buy crashed, written-off, or mechanically defective vehicles at salvage auctions, clean them up cosmetically, and list them online. They do this to bypass consumer laws and escape taxes. If a seller insists on meeting in a public car park in Salthill or won't show you their home address, walk away."
    },
    {
      question: "Will a warranty from ShahMotors cover things like hybrid battery packs or gearboxes?",
      answer: "Yes, our comprehensive dealership warranties are designed specifically to protect you from major mechanical and electrical failures. This includes high-cost assemblies like the hybrid battery cell array, engine block internals, turbochargers, steering columns, and complex automatic transmissions or dual-clutch e-CVT units commonly found in imported Toyota hybrids."
    },
    {
      question: "How do I check if a private car is currently under active finance?",
      answer: "Never buy a private used car without running an official vehicle data search on portals like Cartell.ie or MotorCheck.ie. If the car has outstanding PCP (Personal Contract Plan) or HP (Hire Purchase) finance, the finance institution legally owns the vehicle. If the previous owner stops paying, the bank has a statutory right to seize the vehicle from you, regardless of how much cash you paid the seller."
    },
    {
      question: "Why do private sellers in Galway sometimes clear dashboard warning lights before viewings?",
      answer: "A common trick is using cheap OBD-II scanner apps to clear active diagnostic codes (like the Engine Management Light or airbag warnings) right before a buyer arrives. These lights often stay off for 15 to 30 kilometers of driving before the onboard computer registers the fault again. When you buy privately, you risk inheriting a vehicle with deep-seated electronic issues."
    },
    {
      question: "What are the common risks of paying cash for a used car in Salthill or Eyre Square?",
      answer: "Carrying thousands of euros in cash to meet a stranger in Salthill or Eyre Square presents immense personal safety and financial security risks. Furthermore, cash transactions leave no auditable paper trail. If a dispute arises later, proving the exact amount paid is extremely difficult. ShahMotors processed all transactions securely through verified bank transfers and provides official invoice receipts."
    },
    {
      question: "Is VRT (Vehicle Registration Tax) fully cleared when buying from ShahMotors?",
      answer: "Yes, absolutely. Every single vehicle displayed on our showroom floor or Cars List is fully cleared, VRT paid, custom customs cleared, and registered on Irish plates. Private buyers importing vehicles often get hit with unexpected VRT calculations, customs duties, and NOx levies that add thousands of euros to the estimated purchase price."
    },
    {
      question: "How does the NCT treat cars sold by dealers versus private sellers?",
      answer: "The National Car Test (NCT) treats the physical vehicle identically. However, private sellers often sell cars with 'NCT due' or with a short-term certificate because they know the vehicle has suspension, emissions, or underbody rust issues. At ShahMotors, our stock undergoes rigorous pre-sale preparation to ensure they either come with a fresh NCT or are mechanically guaranteed to clear the inspection."
    },
    {
      question: "Can I get car finance in Galway for a private car sale?",
      answer: "Almost all traditional vehicle finance institutions in Ireland refuse to finance private car transactions due to the lack of security, title verification, and dealer backing. If you require flexible HP or PCP finance options, you must purchase through an authorized, SIMI-registered motor dealership like ShahMotors."
    }
  ];

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'legal', title: '1. The Legal Battle: Caveat Emptor vs statutory Law' },
    { id: 'scams', title: '2. The Dark Side of Online Private Sales' },
    { id: 'comparison', title: '3. Showroom vs Private Specs' },
    { id: 'preparation', title: '4. Physical Detailing & Pre-Sale Checks' },
    { id: 'financial', title: '5. Payment Safety, Finance & VRT Math' },
    { id: 'analysis', title: 'In-Depth Technical Analysis' },
    { id: 'faq', title: 'FAQs' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed font-sans">
      {/* Navigation */}
      <LocalNavbar />

      {/* Hero Section */}
      {}
      <header className="pt-40 pb-20 bg-linear-to-br from-white via-red-50 to-red-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
            Buying a Used Car in Galway: <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-400">Showroom Warranty vs. Private Sales</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Thinking of buying a car privately on DoneDeal or Facebook Marketplace in Galway? Learn why consumer rights, dealership warranties, and rigorous pre-sale checks offer far better protection in the long run.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#UsedCarsGalway</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#DealerWarrantyIreland</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#ConsumerProtectionIE</span>
          </div>
        </div>
      </header>

      {}
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
              <h4 className="text-lg font-black mb-3">Want Peace of Mind?</h4>
              <p className="text-base text-red-50/80 mb-6 leading-relaxed">Every car at ShahMotors comes fully warranted, pre-inspected, and serviced. Drive home with complete security.</p>
              <a 
                href="/cars"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full py-4 bg-white text-red-600 font-black cursor-pointer rounded-xl hover:bg-slate-100 transition-transform active:scale-95 shadow-lg">
                  VIEW CERTIFIED STOCK
                </button>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Area Right side */}
        <div className="lg:col-span-9 bg-white p-4 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          {}
          <section id="intro" className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Introduction: The Used Car Marketplace Dilemma</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                When you begin searching for **used cars galway** has to offer, the sheer volume of listings on peer-to-peer portals like DoneDeal, Facebook Marketplace, and Adverts.ie can be overwhelming. The temptation to browse through private listings is understandable; on paper, private transactions often present slightly lower upfront purchase costs compared to established motor showrooms.
              </p>
              <p className="mb-4">
                However, this initial price saving is almost always a mirage. In the secondary automotive market, there is a fundamental rule: **you get what you pay for**. A cheaper private listing is cheaper for a reason. The seller is shedding all legal liability, passing the mechanical risk of a complex machine with thousands of moving parts entirely onto your shoulders.
              </p>
              <p className="mb-4">
                In contrast, purchasing a vehicle from a registered, reputable independent dealership like **ShahMotors** on the Tuam Road is an investment in financial security. It bridges the gap between premium quality and reliable consumer protections, ensuring you don’t end up with an unroadworthy driveway ornament.
              </p>
              <p className="mb-8 font-semibold text-red-600">
                This in-depth, 3,000-word guide analyzes the real-world legal, mechanical, and financial differences between buying a car with a showroom warranty versus taking a gamble on private cash sales in Salthill or Galway City.
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section id="legal" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">1. The Legal Battle: Caveat Emptor vs. Statutory Protection</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                The core difference between these two purchase pathways is not the physical car itself; it is the legal framework that governs the transaction. This framework determines who pays the bill when a major component like a dual-mass flywheel, turbocharger, or hybrid battery array fails a week after you buy it.
              </p>
              <p className="mb-4">
                When you buy from a private individual, the transaction is governed by the ancient common law principle of **Caveat Emptor**—meaning "Let the buyer beware." In the eyes of Irish law, the private seller is under no obligation to tell you about the car's mechanical faults. As long as they do not actively lie to a direct question, they can sell you a vehicle with a failing transmission, and you have zero legal recourse.
              </p>
              <p className="mb-4">
                Conversely, when you buy from a registered motor dealer, you are protected by the **Consumer Rights Act 2022**. This landmark legislation completely overhauled consumer rights in Ireland, placing strict statutory obligations on dealerships:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700">
                <li><strong>Merchantable Quality:</strong> The vehicle must be fit for the purpose for which cars of that type are normally supplied, considering the age, mileage, and price of the car.</li>
                <li><strong>Durability:</strong> The law now explicitly states that a product (including a used car) must remain durable for a reasonable period. If a major engine bearing fails three weeks after purchase, the law presumes the fault was present at the time of sale.</li>
                <li><strong>Right to Remedy:</strong> Within the first six months, if a fault develops, the burden of proof is on the dealer to prove the car was perfect at the time of sale, rather than on the consumer to prove it was faulty.</li>
              </ul>
            </div>

            {/* Recharts Out of Pocket Risk Chart */}
            {}
            {/* <div className="my-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 text-center tracking-widest">Average Out-of-Pocket Repair Cost Risk Comparison (Euro)</h3>
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
                    <Bar dataKey="privateSale" fill="#dc2626" name="Private Sale Out-of-Pocket (€)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="dealerWarranty" fill="#16a34a" name="ShahMotors Warranty Cover (€)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-400 mt-4 italic text-center">Estimated repair costs based on standard Irish garage labor rates and replacement parts metrics.</p>
            </div> */}
          </section>

          {/* Section 2 */}
          {}
          <section id="scams" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">2. The Dark Side of Online Private Sales: Clocking and Scams</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                The online peer-to-peer used car market in Ireland is highly competitive, but it is also a landscape frequented by sophisticated scams, hidden financial traps, and illegal operators.
              </p>
              <p className="mb-4">
                The most pervasive issue is the rise of **disguised traders** (also known as curbstoners). These are unregistered, illegal dealers who buy salvage vehicles from insurance auctions, patch them up cosmetically, and sell them online under the guise of 'private family sellers'. They do this specifically to bypass Irish consumer protection laws and escape revenue taxes. If something goes wrong, they disappear, leaving you with a dangerous vehicle.
              </p>
              <p className="mb-4">
                Another major threat is **mileage clocking**—the practice of illegally rolling back the digital odometer. This is especially common on vehicles imported from the UK, where data synchronizations can get fragmented during transition. A clocker can easily shave 100,000 kilometers off a car’s readout, artificially inflating its price by thousands and hiding a heavily worn engine and suspension system.
              </p>
              <p className="mb-4">
                Finally, the **outstanding finance trap** is a constant danger in private sales. If the previous owner bought the car under a Hire Purchase (HP) or PCP contract, they do not legally own the car—the bank does. Under Irish law, you cannot acquire legal title to a car from someone who does not own it. If the seller takes your cash and stops paying their bank, the bank has a statutory right to track the car and repossess it from you, leaving you with no car and no way to get your money back.
              </p>
            </div>

            <p className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 rounded-r-lg italic">
              <strong>Buyer Warning:</strong> Running a comprehensive vehicle history check on platforms like Cartell.ie or MotorCheck.ie is non-negotiable for private sales. But even then, these reports rely on databases that might not register recent crash repairs or private lending agreements. Dealerships like ShahMotors perform multi-point trade audits before stock acceptance.
            </p>
          </section>

          {/* Section 3 */}
          {}
          <section id="comparison" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">3. Showroom vs. Private: Head-to-Head Comparison</h2>
            <p className="mb-6">
              Let's look at the key metrics that define your purchasing security. Use the interactive tabs below to compare the risk structures of private market sellers against registered showrooms.
            </p>
            
            {/* Interactive Tabs */}
            <div className="flex space-x-1 p-1 bg-slate-100 rounded-xl mb-8">
              <button 
                onClick={() => setActiveTab('private')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${activeTab === 'private' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Private Market Transaction
              </button>
              <button 
                onClick={() => setActiveTab('dealer')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${activeTab === 'dealer' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                ShahMotors Showroom Purchase
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-red-300 transition group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold group-hover:text-red-600 transition">{comparisonMap[activeTab].title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${activeTab === 'dealer' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {activeTab === 'dealer' ? 'Low Risk' : 'High Risk'}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-6 font-medium">{comparisonMap[activeTab].subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Statutory & Mechanical Framework</h4>
                  <ul className="space-y-4">
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Legal Status</span>
                      <span className="font-semibold text-sm text-slate-800">{comparisonMap[activeTab].status}</span>
                    </li>
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Consumer Protection Laws</span>
                      <span className="font-semibold text-sm text-slate-800">{comparisonMap[activeTab].protection}</span>
                    </li>
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Post-Sale Warranty Coverage</span>
                      <span className="font-semibold text-sm text-red-600">{comparisonMap[activeTab].warranty}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Target Profile & Inherent Risks</h4>
                  <p className="text-sm text-slate-600 mb-4">{comparisonMap[activeTab].bestFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {comparisonMap[activeTab].risks.map((risk, i) => (
                      <span key={i} className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">⚠ {risk}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 prose prose-slate max-w-none">
              <p className="mb-4">
                The absolute core benefit of buying from ShahMotors is the transfer of mechanical and financial risk. In a private sale, you carry 100% of the risk from the second you drive away. If the dual-clutch transmission fails on your way home, the cost of repair is entirely yours.
              </p>
              <p className="mb-4">
                With a ShahMotors warranty, that financial risk is transferred to us. Our business reputation and legal requirements under the **SIMI (Society of the Irish Motor Industry)** guidelines mean we are fully invested in ensuring your vehicle is mechanically sound, serviced, and durable.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          {}
          <section id="preparation" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">4. Physical Detailing & Pre-Sale Mechanical Preparation</h2>
            <p className="mb-4">
              When a private seller prepares a car for sale, their focus is almost entirely cosmetic. They will take it to a local car wash, spray silicone polish on the dashboard, and apply tyre-shine to make the car look fresh in online photos. They do not run electronic diagnostic scans, overhaul brake lines, or inspect hybrid battery cell voltages.
            </p>
            <p className="mb-4">
              At ShahMotors, our preparation process is deeply technical. Before any vehicle is listed on our lot or Cars List, it goes through our **strict multi-point safety check sequence**:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { grade: 'OBD-II Scan', desc: 'Full electronic diagnostic sweeps to identify passive or cleared fault codes.' },
                { grade: 'Chassis Check', desc: 'Ramp-inspected underbody verification for Atlantic salt-induced rust.' },
                { grade: 'Hybrid Audit', desc: 'Strict cellular voltage differential tests on all Toyota self-charging hybrids.' },
                { grade: 'Braking Overhaul', desc: 'Brake pad thickness, caliper sliding joints, and brake pipe integrity checks.' },
                { grade: 'NCT Preparation', desc: 'Alignment, emissions, and suspension tests to ensure hassle-free pass ratings.' },
                { grade: 'Fluids & Filters', desc: 'Full service including premium synthetic oil, air filters, and coolant checks.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-red-300 transition-all">
                  <div className="text-md font-black text-red-600 mb-1">{item.grade}</div>
                  <div className="text-xs font-semibold text-slate-600">{item.desc}</div>
                </div>
              ))}
            </div>

            <p className="mb-4">
              This intensive preparation ensures that every car leaving our showroom is structurally sound and prepared for the unique driving environments of Galway and the West of Ireland.
            </p>
          </section>

          {/* Section 5 */}
          {}
          <section id="financial" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">5. Payment Security, Vehicle Finance, and VRT Mathematics</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                The financial transactions involved in buying a car are complex, and getting them wrong can lead to severe stress and financial losses.
              </p>
              <p className="mb-4">
                First, there is the risk of **payment security**. Meeting a stranger with an envelope of cash in Salthill or an unlit car park in Eyre Square presents obvious personal safety and security risks. It also leaves no auditable paper trail. Dealing with an established showroom like ShahMotors means secure bank transfers, clear billing, and a legal tax invoice.
              </p>
              <p className="mb-4">
                Second, private purchases completely cut you off from **flexible vehicle financing**. Traditional finance houses and banks in Ireland do not offer Hire Purchase (HP) or PCP loans for private car transactions due to the lack of asset valuation security. If you need to spread the cost of your vehicle over a multi-year term, purchasing through an SIMI-registered motor showroom is practically essential.
              </p>
              <p className="mb-4">
                Finally, if you are looking at imported vehicles from the UK, navigating the **Vehicle Registration Tax (VRT)**, customs declarations, and NOx emissions levies is a major headache. Private buyers often miscalculate these figures, leading to unexpected tax bills of thousands of euros. Every import at ShahMotors is sold fully VRT cleared, registered on Irish plates, and ready for the road.
              </p>
            </div>
          </section>

          {/* Detailed In-Depth Content */}
          <section id='analysis' className="mb-20 border-t border-slate-100 pt-12 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6">In-Depth Technical Analysis: The Mathematics of Used Car Depreciation & Reliability</h2>
            <div className="prose prose-sm prose-slate max-w-none text-slate-500">
              <p className="mb-4">
                To truly understand why a dealership-purchased vehicle with a warranty is more cost-effective over a three-year ownership cycle, we must analyze the mathematics of used car depreciation and the probability of component failure.
              </p>
              <p className="mb-4">
                A used car’s market value is determined primarily by its age, mileage, model demand, and *verified mechanical history*. A vehicle purchased privately with a patchy service booklet and a short-term NCT depreciates at a significantly faster rate compared to a car purchased from an authorized dealership with a fully stamped service history and a fresh 12-month mechanical warranty.
              </p>
              <p className="mb-4">
                Furthermore, modern vehicles are highly complex electronic systems. An average modern hatchback or hybrid saloon contains over 50 individual Electronic Control Units (ECUs) communicating via CAN-bus networks. If an ECU, a radar sensor for adaptive cruise control, or an exhaust gas recirculation (EGR) valve experiences a failure, diagnostic and repair costs can quickly escalate.
              </p>
              <p className="mb-4">
                By purchasing from ShahMotors, you are investing in a vehicle that has undergone comprehensive pre-sale diagnostics to verify CAN-bus stability and hybrid cell health. This rigorous quality control process, backed by our comprehensive warranty structure, ensures that your investment remains durable, fuel-efficient, and structurally sound for years to come.
              </p>
            </div>
          </section>

          {/* Interactive FAQs */}
          {}
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
                  <div className={`px-6 pb-5 text-slate-600 transition-all duration-300 ${activeFaq === idx ? 'max-h-125 opacity-100 font-medium' : 'max-h-0 opacity-0'} overflow-hidden`}>
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
              We operate our Galway showroom under a simple philosophy: Irish drivers deserve completely reliable, mechanically flawless cars. Every vehicle we source goes through an extensive multi-point inspection to ensure absolute safety, clear titles, and long-term value.
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
                'Used Cars Galway', 'Irish NCT Tips', 'Underbody Corrosion', 'Outstanding Finance Check', 'Car History Ireland', 'Toyota Used Cars', 'Automatic Hatchback Galway'
              ].map(tag => (
                <span key={tag} className="text-[14px] font-bold text-red-400 px-2 py-1 bg-white rounded border border-red-100">{tag}</span>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      {}
      <Footer />
    </div>
  );
};

export default App;
