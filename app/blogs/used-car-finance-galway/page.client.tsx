"use client";
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';


export default function LocalCarFinanceGuide() {
  const [activeTab, setActiveTab] = useState<'hp' | 'pcp' | 'loan'>('hp');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Calculator State
  const [carPrice, setCarPrice] = useState<number>(18500);
  const [deposit, setDeposit] = useState<number>(3500);
  const [loanTerm, setLoanTerm] = useState<number>(48); // months
  const [apr, setApr] = useState<number>(8.9); // standard Irish used car rate

  // Eligibility Checker State
  const [employmentStatus, setEmploymentStatus] = useState<string>('');
  const [creditHistory, setCreditHistory] = useState<string>('');
  const [bankStatements, setBankStatements] = useState<string>('');
  const [licenseType, setLicenseType] = useState<string>('');

  // Compute monthly payments based on selections
  const financeCalculations = useMemo(() => {
    const principal = Math.max(1000, carPrice - deposit);
    const monthlyRate = (apr / 100) / 12;
    const totalPayments = loanTerm;

    // 1. Hire Purchase (HP) Calculation (Amortizing loan to zero)
    let monthlyHP = 0;
    if (monthlyRate > 0) {
      monthlyHP = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                  (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyHP = principal / totalPayments;
    }

    const totalCostHP = monthlyHP * totalPayments + deposit;
    const totalInterestHP = totalCostHP - carPrice;

    // 2. Personal Contract Plan (PCP) Calculation (Assumes 30% GMFV / Balloon payment)
    const pcpBalloon = carPrice * 0.35; 
    const pcpPrincipal = principal - (pcpBalloon / Math.pow(1 + monthlyRate, totalPayments));
    
    let monthlyPCP = 0;
    if (monthlyRate > 0) {
      monthlyPCP = (pcpPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                   (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyPCP = pcpPrincipal / totalPayments;
    }

    const totalCostPCP = (monthlyPCP * totalPayments) + deposit + pcpBalloon;
    const totalInterestPCP = totalCostPCP - carPrice;

    // 3. Traditional Credit Union / Personal Loan (Simple interest amortizing)
    const personalApr = apr + 1.5; // typically slightly higher for unsecured bank loans
    const personalMonthlyRate = (personalApr / 100) / 12;
    let monthlyLoan = 0;
    if (personalMonthlyRate > 0) {
      monthlyLoan = (principal * personalMonthlyRate * Math.pow(1 + personalMonthlyRate, totalPayments)) / 
                    (Math.pow(1 + personalMonthlyRate, totalPayments) - 1);
    } else {
      monthlyLoan = principal / totalPayments;
    }
    const totalCostLoan = monthlyLoan * totalPayments + deposit;
    const totalInterestLoan = totalCostLoan - carPrice;

    return {
      principal,
      monthlyHP: Math.round(monthlyHP),
      totalCostHP: Math.round(totalCostHP),
      totalInterestHP: Math.round(totalInterestHP),
      monthlyPCP: Math.round(monthlyPCP),
      pcpBalloon: Math.round(pcpBalloon),
      totalCostPCP: Math.round(totalCostPCP),
      totalInterestPCP: Math.round(totalInterestPCP),
      monthlyLoan: Math.round(monthlyLoan),
      totalCostLoan: Math.round(totalCostLoan),
      totalInterestLoan: Math.round(totalInterestLoan),
      personalApr,
      chartData: [
        { name: 'Hire Purchase (HP)', Monthly: Math.round(monthlyHP), Interest: Math.round(totalInterestHP), Total: Math.round(totalCostHP) },
        { name: 'PCP (With Balloon)', Monthly: Math.round(monthlyPCP), Interest: Math.round(totalInterestPCP), Total: Math.round(totalCostPCP) },
        { name: 'Credit Union Loan', Monthly: Math.round(monthlyLoan), Interest: Math.round(totalInterestLoan), Total: Math.round(totalCostLoan) }
      ]
    };
  }, [carPrice, deposit, loanTerm, apr]);

  const eligibilityDiagnostic = useMemo(() => {
    if (!employmentStatus || !creditHistory || !bankStatements || !licenseType) {
      return { score: null, label: 'Awaiting Selections', color: 'text-slate-400 bg-slate-50 border-slate-200' };
    }

    let points = 0;
    // Employment Status scoring
    if (employmentStatus === 'ft') points += 30;
    else if (employmentStatus === 'pt' || employmentStatus === 'se') points += 15;
    else points += 5;

    // Credit History scoring
    if (creditHistory === 'clean') points += 30;
    else if (creditHistory === 'no_history') points += 15;
    else points -= 10;

    // Bank Statement status scoring
    if (bankStatements === 'healthy') points += 25;
    else if (bankStatements === 'overdraft') points += 10;
    else points += 0;

    // License Type scoring
    if (licenseType === 'full_irish') points += 15;
    else if (licenseType === 'full_uk' || licenseType === 'eu') points += 10;
    else points += 5;

    if (points >= 85) return { score: points, label: 'EXCELLENT APPROVAL ODDS (Tier A)', desc: 'You qualify for our lowest promotional APR rates. Quick automated underwriting in under 2 hours.', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (points >= 55) return { score: points, label: 'STRONG APPROVAL ODDS (Tier B)', desc: 'High likelihood of approval with mainstream lenders. A minor documentation request or solid deposit will secure standard rates.', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (points >= 35) return { score: points, label: 'CONDITIONAL APPROVAL ODDS (Tier C)', desc: 'Lenders may require a co-signer, a larger deposit (20%+), or proof of stable local employment to clear underwriting.', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { score: points, label: 'MANUAL ASSESSMENT REQUIRED', desc: 'Mainstream automated scoring may fail. ShahMotors specialist subprime underwriters will review your local account manually.', color: 'text-red-700 bg-red-50 border-red-200' };
  }, [employmentStatus, creditHistory, bankStatements, licenseType]);

  const faqItems = [
    {
      q: "What is the minimum documentation required to apply for used car finance in Galway?",
      a: "To obtain a fast finance decision in Ireland, you must provide several key legal documents. These include: 1) A clear, valid physical Photo ID (Full Irish/UK/EU Driving License or Passport). 2) Proof of Address issued within the past 3 months (such as a utility bill or official government letter). 3) Proof of Income (your 3 most recent monthly payslips or current Form 11 if self-employed). 4) Your 3 most recent months of consecutive personal bank statements, proving net monthly deposits and showing no recent unpaid direct debits or excessive gambling transactions."
    },
    {
      q: "How does Hire Purchase (HP) differ from a Personal Contract Plan (PCP) for second-hand cars?",
      a: "With Hire Purchase (HP), you pay a deposit and borrow the remaining balance over a fixed term (typically 36 to 60 months). Once the final monthly payment is cleared, you instantly own the car outright. With a Personal Contract Plan (PCP), your monthly payments are lower because a significant chunk of the car's value is deferred to the end of the term as a Guaranteed Minimum Future Value (GMFV) balloon payment. When the PCP term ends, you must either pay the large balloon payment to keep the car, return the vehicle, or trade it in for a new model using accumulated equity as a deposit."
    },
    {
      q: "Can I get car finance in Galway if I have a less-than-perfect credit rating?",
      a: "Yes, you can. While a poor credit record on the Central Credit Register (CCR) can cause high-street commercial banks to reject applications automatically, specialized subprime lenders look at current affordability. If you can show stable employment, possess a clean bank account history over the past 90 days, and can provide a slightly larger deposit (typically 15% to 20%), ShahMotors' dedicated finance specialists can work with niche credit lenders in Ireland to secure approval."
    },
    {
      q: "Is it better to get a car loan from a Galway Credit Union or dealership finance?",
      a: "Credit Union loans are unsecured personal loans. This means you own the car from day one, there are no early exit fees, and you can sell the car at any point. However, dealership finance (typically Hire Purchase) is secured directly against the vehicle. Dealership finance often has faster approval times (under 2 hours versus several days at a credit union), higher approval rates for marginal credit profiles, and lower promotional APR interest rates on specific high-grade Japanese imports."
    },
    {
      q: "What is the 'Half Rule' (Section 99) under Irish Hire Purchase agreements?",
      a: "The 'Half Rule' is a powerful consumer protection mechanism in Ireland under the Consumer Credit Act 1995. It states that you have a legal right to terminate a Hire Purchase (HP) or PCP agreement and return the car to the finance house at any point, provided you have paid at least half of the total hire purchase price (including deposit, monthly payments, and any balloon elements). The vehicle must be returned in reasonable condition, and any payment arrears up to that point must be cleared."
    },
    {
      q: "How does the Central Credit Register (CCR) affect my application in Galway?",
      a: "The Central Credit Register (CCR) is managed by the Central Bank of Ireland. It compiles a continuous record of all loans over €500, including credit cards, overdrafts, and personal loans. Every time you apply for used car finance in Galway, lenders query the CCR to view your repayment history over the past five years. Even minor slip-ups, like a missed direct debit for an old credit card or telephone contract, can lower your internal score, which is why we advise reviewing your CCR report online for free before submitting an application."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed font-sans scroll-smooth">
        <div className='relative max-w-7xl mx-auto py-16'>
            <Navbar />
        </div>

      {/* Hero Section */}
      <header className="pt-20 pb-24 bg-linear-to-br from-white via-red-50/50 to-red-100/40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-black uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            Galway Car Finance Navigation Manual
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            A Local’s Guide to Used Car <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500">Finance Options in Galway</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Confused by PCP, Hire Purchase, and Credit Union loans? We break down exactly how used car finance works in Ireland, how to build a bulletproof credit profile, and how to structure your budget for zero financial stress.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white shadow-xs border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#UsedCarFinanceGalway</span>
            <span className="px-4 py-2 bg-white shadow-xs border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#PCPvsHPireland</span>
            <span className="px-4 py-2 bg-white shadow-xs border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#CarFinanceApproval</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Sidebar Left */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-10">
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-6">Finance Chapters</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#intro" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    1. The Galway Market in 2026
                  </a>
                </li>
                <li>
                  <a href="#decoding" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    2. HP vs PCP vs Loans
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    3. Live Payment Estimator
                  </a>
                </li>
                <li>
                  <a href="#credit" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    4. The Central Credit Register
                  </a>
                </li>
                <li>
                  <a href="#eligibility" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    5. Approval Tier Checker
                  </a>
                </li>
                <li>
                  <a href="#documentation" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    6. The Required Paperwork
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

            {/* Live Finance CTA Box */}
            <div className="p-6 bg-slate-950 text-white rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <h4 className="text-lg font-black mb-2 text-white">Need a Fast Finance Decision?</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Skip the banking red tape. We work with leading credit underwriters in Ireland to secure HP approval in under 2 hours.
              </p>
                <button
                    onClick={() => {
                        const url = `https://wa.me/353833526830?text=${encodeURIComponent("Hi, Need a Fast Finance Decision?")}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                    }}
                    className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-red-900/30"
                >
                    APPLY FOR FINANCE NOW
                </button>
            </div>
          </div>
        </aside>

        {/* Content Panel Right */}
        <div className="lg:col-span-9 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          {/* Section 1: Introduction */}
          <section id="intro" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">1. Navigating the Galway Used Car Finance Landscape in 2026</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                The purchase of a quality used car is one of the most substantial financial investments most people in the West of Ireland will make. In 2026, navigating this process has become highly sophisticated. Shifting global supply dynamics, changes in European Central Bank (ECB) interest rate guidelines, and the post-Brexit reality have reshaped vehicle valuations across the country.
              </p>
              <p>
                In Galway, where public transit infrastructure is under constant geographical constraint (squeezed between Lough Corrib and the ocean), owning a reliable vehicle is often an absolute necessity rather than a luxury. Whether you are commuting past the daily bottlenecks at the Terryland Roundabout, transporting children to schools in Oranmore, or traveling back and forth across Connemara passes, you require a dependable vehicle. To make this investment affordable, over 70% of used car buyers now utilize some form of **used car finance Galway** programs to spread the cost.
              </p>
              <p>
                However, entering the credit market without clear planning is highly risky. Interest rate configurations, documentation standards, and different loan structures (such as Hire Purchase vs. PCP) can feel like a maze of financial jargon. For many drivers, a lack of understanding leads to selecting the wrong credit product, paying inflated APR percentages, or falling prey to bad-credit lending configurations. By taking a structured, analytical look at how Irish automotive lending works, you can negotiate with absolute confidence and protect your hard-earned income.
              </p>
              <div className="p-6 bg-red-50 border-l-4 border-red-600 rounded-r-2xl my-8">
                <p className="font-bold text-red-900 text-base mb-1">Financial Integrity Note:</p>
                <p className="text-red-900 text-sm italic">
                  "At ShahMotors, we believe that transparency is the absolute foundation of car sales. Used car finance is not about convincing you to take on debt—it is about structuring a predictable, flat-rate monthly cash flow that respects your household's monthly disposable budget."
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Decoding HP vs PCP vs Loans */}
          <section id="decoding" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">2. Decoding the Jargon: HP vs. PCP vs. Personal Loans</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                When you walk into an independent dealership or query a lender online, you will instantly be presented with three primary financial structures: <strong>Hire Purchase (HP)</strong>, <strong>Personal Contract Plans (PCP)</strong>, and unsecured <strong>Personal Car Loans</strong>. Choosing the right one determines your path to eventual ownership.
              </p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-6">A. Hire Purchase (HP): The Direct Path to Ownership</h3>
              <p>
                Hire Purchase is the most popular, straightforward credit agreement for second-hand vehicles in Ireland. Mechanically, HP functions as a secured loan. You pay an initial upfront deposit (typically between 10% and 30% of the car's cash price), and the remaining balance is divided into fixed monthly installments over a term of 24 to 60 months.
              </p>
              <p>
                Crucially, under a Hire Purchase agreement, <strong>you do not legally own the vehicle until the final payment is cleared</strong>. The vehicle is owned by the financial institution, and you act as the "hirer." Once the final payment (including a nominal 'purchase option fee' of €10) is processed, the legal ownership of the car instantly transfers to your name.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-6">B. Personal Contract Plan (PCP): Low Payments with a Balloon Sting</h3>
              <p>
                PCP is a three-stage credit agreement that has gained immense traction for newer or higher-tier used vehicles. It breaks the car's cost down into three sections:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>The Deposit:</strong> Typically 10% to 35% of the vehicle's retail value.</li>
                <li><strong>Monthly Installments:</strong> Unusually low monthly payments, calculated only on a portion of the car's depreciating value.</li>
                <li><strong>The GMFV (Guaranteed Minimum Future Value):</strong> A large deferred "balloon" payment due at the very end of the agreement (often 30% to 40% of the car's value).</li>
              </ul>
              <p>
                PCP offers very attractive monthly figures, but it leaves you with a major financial decision at the end of the term. You must either pay the large balloon payment in cash (or re-finance it) to keep the car, hand the keys back to the dealer with nothing more to pay (subject to strict mileage and condition criteria), or trade the car in for a newer model using any equity above the GMFV as a deposit.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-6">C. Unsecured Personal Loans (Banks & Credit Unions)</h3>
              <p>
                Unlike HP or PCP, a loan from a local **credit union car loan Galway** provider or a standard commercial bank is unsecured. The bank lends the cash directly to your bank account, and you use that cash to buy the vehicle outright from the dealer.
              </p>
              <p>
                Under this structure, <strong>you legally own the vehicle from day one</strong>. This gives you complete freedom to modify, put heavy mileage on, or sell the car at any point without needing the lender's consent. However, because the loan is unsecured, interest rates (APRs) can be slightly higher for buyers with marginal credit histories, and securing approval often requires several days of administrative review.
              </p>
            </div>
          </section>

          {/* Section 3: Interactive Calculator */}
          <section id="calculator" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">3. Interactive Used Car Finance Payment Calculator</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Plan your monthly budget dynamically. Move the sliders below to adjust the vehicle purchase price, your available deposit cash, the loan term, and the interest rate (APR). Compare the real-world impact of HP, PCP, and Personal Loans side by side.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/80 mb-8">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">Your Financing Variables</h4>
                
                {/* Car Price Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Vehicle Purchase Price:</span>
                    <span className="text-red-600 font-bold">€{carPrice.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="45000" 
                    step="500" 
                    value={carPrice} 
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Deposit Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Your Deposit Cash:</span>
                    <span className="text-red-600 font-bold">€{deposit.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max={Math.min(carPrice - 1000, 20000)} 
                    step="250" 
                    value={deposit} 
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Aim for at least 15% to 20% to secure standard interest brackets.</span>
                </div>

                {/* Term Selector */}
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-2">Finance Agreement Term:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[24, 36, 48, 60].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`py-2 rounded-xl text-xs font-bold border transition ${loanTerm === term ? 'bg-red-600 text-white border-red-600 shadow-xs' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                      >
                        {term / 12} Years
                      </button>
                    ))}
                  </div>
                </div>

                {/* APR Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Interest Rate (APR %):</span>
                    <span className="text-red-600 font-bold">{apr.toFixed(1)}% APR</span>
                  </div>
                  <input 
                    type="range" 
                    min="5.9" 
                    max="14.9" 
                    step="0.1" 
                    value={apr} 
                    onChange={(e) => setApr(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Cost Projection Results */}
              <div className="flex flex-col justify-between bg-slate-900 text-white p-6 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-xs font-black uppercase text-slate-400 block tracking-wider mb-4 text-center">Monthly Payment Estimates</span>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <div>
                        <span className="text-sm font-bold block">Hire Purchase (HP)</span>
                        <span className="text-[10px] text-slate-400">Own the car outright at the end</span>
                      </div>
                      <span className="text-xl font-black text-red-500">€{financeCalculations.monthlyHP}/mo</span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <div>
                        <span className="text-sm font-bold block">PCP (With Balloon)</span>
                        <span className="text-[10px] text-slate-400">Includes a €{financeCalculations.pcpBalloon} balloon at end</span>
                      </div>
                      <span className="text-xl font-black text-blue-400">€{financeCalculations.monthlyPCP}/mo</span>
                    </div>

                    <div className="flex justify-between items-center pb-2">
                      <div>
                        <span className="text-sm font-bold block">Credit Union Loan</span>
                        <span className="text-[10px] text-slate-400">Assumes unsecured interest of {financeCalculations.personalApr.toFixed(1)}%</span>
                      </div>
                      <span className="text-xl font-black text-emerald-400">€{financeCalculations.monthlyLoan}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 bg-slate-950 p-4 rounded-xl">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Car Price:</span>
                    <span>€{carPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Principal Amount Borrowed:</span>
                    <span className="font-semibold text-white">€{financeCalculations.principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Total HP Interest Cost:</span>
                    <span className="font-semibold text-red-400">€{financeCalculations.totalInterestHP.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: CCR */}
          <section id="credit" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">4. The Central Credit Register (CCR) & Your Credit Standing</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Every time you apply for used car finance in Galway, your lender performs a query on the <strong>Central Credit Register (CCR)</strong>. Established by the Central Bank of Ireland, the CCR acts as the central clearinghouse for all personal lending information over €500. This database keeps a continuous, month-by-month record of your repayment history over a rolling 5-year period.
              </p>
              <p>
                Many consumers hold incorrect beliefs regarding credit scores in Ireland. Unlike the United States or Great Britain, where a single numeric score dictates your credit health, Irish lenders look directly at your raw payment records. They check for late payments, skipped direct debits, restructured debts, or defaults.
              </p>
              <p>
                Even a minor issue, such as a missed payment on an old mobile phone contract or a credit card balance that sat slightly over its agreed limit, is recorded and visible to vehicle underwriters. A clean record on the CCR allows our lenders to automate approval, offering you the lowest possible APR tiers. If you do have historical issues, being prepared to show stable local employment and offering a larger upfront cash deposit is the single best way to secure underwriting approval.
              </p>
            </div>
          </section>

          {/* Section 5: Interactive Eligibility Checker */}
          <section id="eligibility" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4">5. Interactive Galway Finance Eligibility Checker Diagnostic</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Before submitting formal underwriting paperwork, use our quick, confidential diagnostic tool to check your potential eligibility tier and read recommended strategies to maximize your approval odds.
            </p>

            <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              
              <div className="space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-red-500">Eligibility Diagnostic Tool</span>
                <h3 className="text-xl md:text-2xl font-black">Answer these 4 simple parameters:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Employment Status */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Employment Status:</label>
                    <select 
                      value={employmentStatus} 
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="">-- Select Status --</option>
                      <option value="ft">Full-Time Contracted (9m+ Tenure)</option>
                      <option value="pt">Part-Time Contracted</option>
                      <option value="se">Self-Employed (Form 11 Filed)</option>
                      <option value="other">Contractor / Agency / Other</option>
                    </select>
                  </div>

                  {/* Credit History */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Repayment History standing:</label>
                    <select 
                      value={creditHistory} 
                      onChange={(e) => setCreditHistory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="">-- Select Standing --</option>
                      <option value="clean">Perfect CCR Record (No missed payments)</option>
                      <option value="no_history">No active loans or credit history</option>
                      <option value="minor_missed">1 or 2 historical late payments</option>
                      <option value="major_defaults">Historical defaults or active court judgments</option>
                    </select>
                  </div>

                  {/* Bank Statements */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Bank Account Status (Past 90 Days):</label>
                    <select 
                      value={bankStatements} 
                      onChange={(e) => setBankStatements(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="">-- Select Account Status --</option>
                      <option value="healthy">Clean (Savings balance, no overdraft use)</option>
                      <option value="overdraft">Occasional authorized overdraft use</option>
                      <option value="missed_dd">Recent missed/returned direct debits</option>
                    </select>
                  </div>

                  {/* License Type */}
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase block mb-2">Your Driving License Class:</label>
                    <select 
                      value={licenseType} 
                      onChange={(e) => setLicenseType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="">-- Select License Type --</option>
                      <option value="full_irish">Full Irish Driving License</option>
                      <option value="full_uk">Full UK Driving License</option>
                      <option value="eu">EU Member State Driving License</option>
                      <option value="provisional">Irish Learner / Provisional Permit</option>
                    </select>
                  </div>

                </div>

                {/* Eligibility Results Panel */}
                {eligibilityDiagnostic.score !== null && (
                  <div className="border-t border-slate-800 pt-6 mt-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Diagnostic Score Ranking:</span>
                        <div className={`px-4 py-2 rounded-xl text-xs font-black border uppercase inline-block ${eligibilityDiagnostic.color}`}>
                          {eligibilityDiagnostic.label}
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 max-w-md leading-relaxed">{eligibilityDiagnostic.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 6: Documentation */}
          <section id="documentation" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">6. The Step-by-Step Underwriting Checklist</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Lenders require physical evidence of income, identity, and residence. Ensuring you have these documents prepared beforehand allows us to secure approval within hours, avoiding administrative delays:
            </p>

            <div className="space-y-6">
              {[
                { title: "Proof of Identity (POI)", body: "Your original, unexpired plastic Photo Driving License (Full Irish, UK, or EU) or clear Passport. Ensure all names align exactly with your credit application." },
                { title: "Proof of Income (P0I - Net)", body: "Your three most recent monthly payslips or weekly equivalent. If self-employed, you must provide your latest Chapter 4 / Form 11 tax assessment from Revenue." },
                { title: "Proof of Residence (POR)", body: "An official document issued within the last 90 days. This must be a utility bill (electric, gas, broadband), a mortgage statement, or a Revenue document. Standard retail bank letters are often rejected." },
                { title: "Personal Bank Statements", body: "Three consecutive months of personal bank statements. Underwriters scan for stable payroll deposits, consistent overdraft clearance, and verify that there are no recent returned direct debits." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-slate-50 border border-slate-200/60 rounded-2xl hover:border-red-100 transition duration-150">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black shrink-0 text-sm">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: FAQ */}
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

          {/* Final Brand Box */}
          <div className="bg-linear-to-br from-red-600 to-red-500 text-white p-8 md:p-12 rounded-3xl shadow-xl mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4">Ready to Secure Your Car Finance?</h3>
            <p className="text-red-50 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8 opacity-90">
              Don't let complicated credit options hold you back. Let our experienced Galway financial team handle the paperwork. Get professional terms tailored to your budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <button 
                    onClick={() => {
                        const url = `https://wa.me/353833526830?text=${encodeURIComponent("Hi, Need a Fast Finance Decision?")}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                    }}
                    className="px-8 py-4 bg-white text-red-600 font-black rounded-xl hover:bg-slate-50 transition duration-150 shadow-lg"
                >
                    APPLY ONLINE NOW
                </button>
                <button
                    onClick={() => {
                        const url = `https://wa.me/353833526830?text=${encodeURIComponent("Hi, Need a Fast Finance Decision?")}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                    }}
                    className="px-8 py-4 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-900 transition duration-150 border border-slate-800"
                >
                    TALK TO OUR EXPERTS
                </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}