  return (
    <div className="w-full animate-fade-in font-sans">
      {/* Main Content */}
      <div className="w-full space-y-10 bg-white dark:bg-[#111726] border border-[#E2E1DD] dark:border-gray-800 rounded-2xl p-6 sm:p-10 shadow-xs">

        {/* Section 1: Executive Overview */}
        <section id="as1-overview" className="scroll-mt-28 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            1. Executive Overview &amp; The Comparability Mandate
          </h2>
          <div className="bg-gradient-to-br from-[#EEF2FD] to-[#F5F0FF] dark:from-[#1A2542] dark:to-[#1E1A35] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl p-5 space-y-3">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider">Official Status</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[12px]">
              {[{label:'Standard',value:'AS 1'},{label:'Issued By',value:'ICAI'},{label:'Year Issued',value:'1979'},{label:'Effective From',value:'01 Apr 1991'}].map(item => (
                <div key={item.label} className="bg-white/70 dark:bg-white/5 rounded-lg p-2.5 text-center">
                  <p className="text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-[10px] mb-1">{item.label}</p>
                  <p className="text-slate-900 dark:text-white font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Accounting Standard 1 (AS 1), <strong>Disclosure of Accounting Policies</strong>, is the foundational governance standard issued by ICAI. It mandates that every enterprise disclose all significant accounting policies adopted in preparing and presenting its financial statements. <PdfRef page={2} />
          </p>
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">1.1 Why Diversity in Accounting Policies is Unavoidable</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-200 dark:border-gray-800">
                <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">Root Cause 1 — Codification Limits</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">Accounting standards cannot cover all areas of financial accounting. In unregulated areas, enterprises retain the freedom to adopt any reasonable accounting policy. <PdfRef page={2} /></p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-200 dark:border-gray-800">
                <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">Root Cause 2 — Business Diversity</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">Enterprises operating in different industries and economic climates legitimately require different treatments. A single universal policy for all situations is not practicable. <PdfRef page={2} /></p>
              </div>
            </div>
          </div>
          <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border-l-4 border-[#2D5BE3] p-4 rounded-r-xl">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">The Comparability Problem</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              When two enterprises follow different but permissible accounting policies, their financial statements are not directly comparable. This compromises <strong>comparability</strong> — a key qualitative characteristic. AS 1 addresses this by requiring disclosure of the specific policies adopted. <PdfRef page={2} />
            </p>
          </div>
        </section>

        {/* Section 2: Purpose & Objective */}
        <section id="as1-objective" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            2. Purpose &amp; Objective
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The purpose of AS 1 is to promote a better understanding of financial statements by requiring that significant accounting policies be disclosed in an <em>orderly</em> manner. <PdfRef page={2} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 p-4 bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50 rounded-xl">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-wider mb-1">Cross-Enterprise Comparison</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">A more meaningful comparison between financial statements of different enterprises for the same accounting period. <PdfRef page={2} /></p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-blue-900/50 rounded-xl">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-1">Period-to-Period Comparison</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">A comparison of the <em>same</em> enterprise's financial statements across different periods, especially when accounting policies change. <PdfRef page={2} /></p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Key Clarification</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              AS 1 is a <strong>disclosure standard</strong>, not a recognition or measurement standard. It does not prescribe which policy to adopt — only that whatever is adopted must be disclosed clearly.
            </p>
          </div>
        </section>

        {/* Section 3: Scope */}
        <section id="as1-scope" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            3. Scope &amp; Applicability
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            AS 1 applies to <strong>all enterprises</strong> in the preparation and presentation of general-purpose financial statements. <PdfRef page={2} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50">
              <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-widest mb-2.5">Mandatory Applicability</p>
              <ul className="space-y-2 text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> All corporate entities under Indian GAAP</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> Non-corporate entities: sole proprietorships, partnerships, LLPs, trusts preparing formal financial statements</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5 shrink-0">✓</span> All general-purpose financial statements <PdfRef page={2} /></li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50">
              <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-widest mb-2.5">Not Applicable To</p>
              <ul className="space-y-2 text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5 shrink-0">✗</span> Entities adopting Ind AS (IFRS-converged) — use Ind AS 1 instead</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5 shrink-0">✗</span> Cash-basis bookkeeping, not formal financial statements</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5 shrink-0">✗</span> Immaterial items — only significant policies require disclosure <PdfRef page={2} /></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Definition */}
        <section id="as1-definition" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            4. Definition of Accounting Policies
          </h2>
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-[#1E2640] dark:to-[#1A2542] border border-slate-200 dark:border-gray-700 rounded-xl p-5">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">Official Definition — Para 3</p>
            <p className="text-[15px] text-slate-800 dark:text-gray-100 leading-relaxed font-semibold italic">
              &ldquo;Accounting policies refer to the <strong>specific accounting principles</strong> and the <strong>methods of applying those principles</strong> adopted by an enterprise in the preparation and presentation of financial statements.&rdquo; <PdfRef page={4} />
            </p>
          </div>
          <p className="text-[15px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The definition has two components. <strong>Principles</strong> are the underlying rules (e.g., revenue recognised on delivery). <strong>Methods of applying principles</strong> are the specific techniques chosen (e.g., FIFO vs. Weighted Average). Both must be disclosed.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Policy vs. Estimate — Exam Alert</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              A <strong>change in accounting policy</strong> (e.g., switching from SLM to WDV depreciation method) is governed by AS 1. A <strong>change in accounting estimate</strong> (e.g., revising useful life from 10 to 8 years) is governed by AS 5. These are frequently confused in examinations.
            </p>
          </div>
        </section>

        {/* Section 5: Areas */}
        <section id="as1-areas" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            5. Key Areas Where Policy Diversity is Encountered
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            AS 1 specifically identifies the following areas where policy disclosure is required: <PdfRef page={4} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { area: 'Depreciation, depletion & amortisation methods', std: 'AS 6, AS 10', examples: 'SLM, WDV, Units of Production' },
              { area: 'Valuation of inventories', std: 'AS 2', examples: 'FIFO, Weighted Average, Specific Identification' },
              { area: 'Expenditure during construction', std: 'AS 10, AS 16', examples: 'Capitalise or expense as incurred' },
              { area: 'Foreign currency translation', std: 'AS 11', examples: 'Closing rate, average rate, historical rate' },
              { area: 'Valuation of investments', std: 'AS 13', examples: 'Cost, market value, lower of cost or market' },
              { area: 'Treatment of goodwill', std: 'AS 14, AS 26', examples: 'Capitalise & amortise, or write-off immediately' },
              { area: 'Retirement & employee benefits', std: 'AS 15', examples: 'Defined Benefit vs. Defined Contribution' },
              { area: 'Revenue on long-term contracts', std: 'AS 7', examples: 'Percentage of Completion, Completed Contract' },
            ].map((row, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-[#1E2640] rounded-xl border border-slate-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[13px] font-bold text-slate-800 dark:text-gray-200 pr-2">{row.area}</p>
                  <span className="text-[10px] bg-[#EEF2FD] dark:bg-[#1A2542] text-[#2D5BE3] dark:text-blue-400 font-bold px-1.5 py-0.5 rounded shrink-0">{row.std}</span>
                </div>
                <p className="text-[12px] text-slate-500 dark:text-gray-400 font-semibold">{row.examples}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Selection */}
        <section id="as1-selection" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            6. Considerations in the Selection of Accounting Policies
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            The primary consideration in selecting accounting policies is that financial statements must represent a <strong>true and fair view</strong>. Three governing considerations must guide policy selection: <PdfRef page={5} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'Prudence', desc: 'Do not anticipate profits; provide for all known losses. Profits are recognised only when realised.', color: 'amber' },
              { num: '02', title: 'Substance over Form', desc: 'Account for transactions based on economic substance, not merely their legal form.', color: 'purple' },
              { num: '03', title: 'Materiality', desc: 'Disclose all items whose omission might influence the economic decisions of financial statement users.', color: 'blue' },
            ].map(item => (
              <div key={item.num} className={`p-5 rounded-xl border ${
                item.color === 'amber' ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40' :
                item.color === 'purple' ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40' :
                'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40'
              }`}>
                <p className={`text-3xl font-black mb-2 ${
                  item.color === 'amber' ? 'text-amber-200 dark:text-amber-800' :
                  item.color === 'purple' ? 'text-purple-200 dark:text-purple-800' :
                  'text-blue-200 dark:text-blue-800'
                }`}>{item.num}</p>
                <p className={`text-sm font-bold mb-2 ${
                  item.color === 'amber' ? 'text-amber-700 dark:text-amber-400' :
                  item.color === 'purple' ? 'text-purple-700 dark:text-purple-400' :
                  'text-blue-700 dark:text-blue-400'
                }`}>{item.title}</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Prudence */}
        <section id="as1-prudence" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            7. Prudence (Conservatism)
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            In view of the uncertainty attached to future events, profits are <strong>not anticipated</strong> but are recognised only when realised. However, provision is made for all <strong>known liabilities and losses</strong>, even though the amount cannot be determined with certainty. <PdfRef page={5} />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#E8F7EE] dark:bg-[#1A2C22] border border-[#C5E9D4] dark:border-green-900/50 rounded-xl">
              <p className="text-xs font-bold text-[#1A7A4A] dark:text-emerald-400 uppercase tracking-wider mb-2">Prudence Permits</p>
              <ul className="space-y-1.5 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Recognising losses as soon as they are probable</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Creating provisions for known liabilities (warranty, bad debts)</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span> Valuing inventory at lower of cost or NRV</li>
              </ul>
            </div>
            <div className="p-4 bg-[#FDEEEE] dark:bg-[#2C1D1D] border border-[#F5C6C0] dark:border-red-900/50 rounded-xl">
              <p className="text-xs font-bold text-[#C0392B] dark:text-red-400 uppercase tracking-wider mb-2">Prudence Does NOT Permit</p>
              <ul className="space-y-1.5 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Creating <strong>hidden reserves</strong> by understating assets or profits</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Deliberately overstating liabilities or losses</li>
                <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">✗</span> Excessive conservatism resulting in misrepresentation <PdfRef page={5} /><PdfRef page={6} /></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Substance over Form */}
        <section id="as1-substance" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            8. Substance over Form
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Transactions should be accounted for in accordance with their <strong>economic substance and financial reality</strong>, not merely by their <strong>legal form</strong>. <PdfRef page={6} />
          </p>
          <div className="bg-slate-50 dark:bg-[#1E2640] border border-slate-200 dark:border-gray-700 rounded-xl p-5 space-y-3">
            <p className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Classic Illustration: Hire Purchase</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] font-bold text-red-600 dark:text-red-400 uppercase mb-1">Legal Form</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Legal title remains with the financier until the last instalment is paid. The buyer does not yet legally own the asset.</p>
              </div>
              <div>
                <p className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1">Economic Substance</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">The buyer enjoys all economic benefits and bears all risks from day one. The buyer economically controls the asset.</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-gray-700">
              <p className="text-[13px] font-bold text-[#2D5BE3] dark:text-blue-400">Accounting Treatment (Substance prevails):</p>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold mt-1">The buyer records the asset at possession date and charges depreciation — notwithstanding that legal title has not transferred. <PdfRef page={6} /></p>
            </div>
          </div>
        </section>

        {/* Section 9: Materiality */}
        <section id="as1-materiality" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            9. Materiality
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            Financial statements should disclose all <strong>material items</strong> — items whose knowledge might reasonably influence the economic decisions of users. Materiality depends on the size and nature of the item. <PdfRef page={6} />
          </p>
          <div className="bg-slate-50 dark:bg-[#1E2640] p-5 rounded-xl border border-slate-200 dark:border-gray-700 space-y-3">
            <p className="text-xs font-bold text-slate-700 dark:text-gray-200 uppercase tracking-wider">Schedule III Quantitative Thresholds</p>
            <div className="space-y-2 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#2D5BE3] dark:text-blue-400 shrink-0">①</span>
                <p><strong>Income / Expenditure:</strong> Disclose if item exceeds 1% of revenue from operations or ₹1,00,000, whichever is higher. <PdfRef page={6} /></p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-[#2D5BE3] dark:text-blue-400 shrink-0">②</span>
                <p><strong>Shareholdings:</strong> Disclose details of shareholders holding more than 5% shares.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Fundamental Assumptions */}
        <section id="as1-assumptions" className="scroll-mt-28 space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            10. Fundamental Accounting Assumptions
          </h2>
          <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl p-5">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">Para 10 — The Core Rule</p>
            <p className="text-[14px] text-slate-800 dark:text-gray-100 leading-relaxed font-semibold italic">
              &ldquo;Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. Disclosure is necessary if they are not followed.&rdquo; <PdfRef page={3} />
            </p>
          </div>
          <p className="text-[15px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            There are three fundamental assumptions. If followed — <strong>no disclosure required</strong>. If any is <strong>not followed</strong> — explicitly disclose which assumption is breached and the reasons. <PdfRef page={3} />
          </p>
        </section>

        {/* Section 10A: Going Concern */}
        <section id="as1-going-concern" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            10A. Going Concern
          </h2>
          <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
            <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              The enterprise is normally viewed as a <strong>going concern</strong> — meaning it will continue in operation for the foreseeable future, with neither the intention nor the necessity of liquidation. <PdfRef page={3} />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-700">
                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5">If Assumption IS Followed</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Assets valued at historical cost. No disclosure required. Default for all ongoing enterprises.</p>
              </div>
              <div className="p-3 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-700">
                <p className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5">If NOT Followed</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Assets must be valued on <strong>liquidation basis (NRV)</strong>. Deviation must be disclosed with reasons — signals potential insolvency or wind-up.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10B: Consistency */}
        <section id="as1-consistency" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            10B. Consistency
          </h2>
          <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
            <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Accounting policies are assumed to be <strong>consistent from one period to another</strong>, ensuring meaningful period-to-period comparison. <PdfRef page={3} />
            </p>
            <p className="text-[14px] font-bold text-slate-700 dark:text-gray-200">A change is permitted only in three circumstances:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { num: 'i', text: 'Required by a statute (e.g., Companies Act 2013 mandates a change)' },
                { num: 'ii', text: 'Required by an accounting standard (ICAI issues a revised standard)' },
                { num: 'iii', text: 'Results in a more appropriate presentation of the financial statements' },
              ].map(item => (
                <div key={item.num} className="p-3 bg-white dark:bg-[#111726] rounded-lg border border-slate-200 dark:border-gray-700 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                  <span className="font-black text-[#2D5BE3] dark:text-blue-400 mr-2">({item.num})</span>{item.text}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-slate-600 dark:text-gray-400 font-semibold italic">Mere convenience is NOT a valid reason for changing an accounting policy. <PdfRef page={3} /></p>
          </div>
        </section>

        {/* Section 10C: Accrual */}
        <section id="as1-accrual" className="scroll-mt-28 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            10C. Accrual Basis of Accounting
          </h2>
          <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
            <p className="text-[14px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Transactions are recognised when they <strong>occur</strong> — not when cash is received or paid — and recorded in the period to which they relate. <PdfRef page={3} /><PdfRef page={4} />
            </p>
            <div className="bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-lg p-3 text-[13px] font-semibold text-slate-700 dark:text-gray-300">
              <span className="font-bold text-[#2D5BE3] dark:text-blue-400">Legal Mandate:</span> Section 128(1) of the Companies Act, 2013 makes accrual accounting mandatory for all companies in India. <PdfRef page={4} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <p className="text-[12px] font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-1">Revenue</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Recognised when <strong>earned</strong> — creates a debtor for uncollected amounts.</p>
              </div>
              <div>
                <p className="text-[12px] font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-1">Expense</p>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Recognised when <strong>incurred</strong> — creates a creditor for unpaid amounts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Disclosure Requirements */}
        <section id="as1-disclosure" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            11. Disclosure Requirements
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            All <strong>significant accounting policies</strong> adopted in the preparation and presentation of financial statements must be disclosed. <PdfRef page={7} />
          </p>
          <div className="space-y-3">
            {[
              { title: 'Form Part of Financial Statements', para: 'Para 22', text: 'All disclosures of accounting policies must form part of the financial statements — not in separate documents.' },
              { title: 'Single Location Preferred', para: 'Para 23', text: 'Preferably make all disclosures in one place (Note 1 — Summary of Significant Accounting Policies), not scattered across statements.' },
              { title: 'Comprehensive Coverage', para: 'Para 24', text: 'Any significant policy relevant to proper understanding must be disclosed. The AS 1 list of examples is illustrative, not exhaustive.' },
              { title: 'Change Disclosures', para: 'Para 25–27', text: 'Nature of change, reason, and quantified financial impact must all be stated when a material policy change occurs.' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-700 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-[14px] text-slate-800 dark:text-gray-100">{item.title}</p>
                  <span className="text-[11px] bg-[#EEF2FD] dark:bg-[#1A2542] text-[#2D5BE3] dark:text-blue-400 font-bold px-2 py-0.5 rounded">{item.para}</span>
                </div>
                <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 12: Change in Accounting Policies */}
        <section id="as1-change-policy" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            12. Disclosure of Changes in Accounting Policies
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl">
              <p className="text-[13px] font-bold text-[#2D5BE3] dark:text-blue-400 mb-2">Rule 1 — Material effect in current period</p>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Disclose: (a) nature of change; (b) reason; (c) quantified impact, or state if not ascertainable. <PdfRef page={7} /></p>
            </div>
            <div className="p-4 bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl">
              <p className="text-[13px] font-bold text-[#2D5BE3] dark:text-blue-400 mb-2">Rule 2 — No current impact, but expected future material impact</p>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Disclose the fact of the change in the period of adoption. Proactive disclosure required. <PdfRef page={7} /></p>
            </div>
            <div className="p-4 bg-[#EEF2FD] dark:bg-[#1A2542] border border-[#C5D5F8] dark:border-[#2D3F7A] rounded-xl">
              <p className="text-[13px] font-bold text-[#2D5BE3] dark:text-blue-400 mb-2">Rule 3 — Neither current nor prospective material impact</p>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">No disclosure of the change is required. Avoids cluttering notes with trivial information.</p>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">Exam Alert: Policy vs. Estimate</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 leading-relaxed font-semibold">
              Change in depreciation method (SLM → WDV) = <strong>accounting policy</strong> (AS 1). | Change in estimated useful life = <strong>accounting estimate</strong> (AS 5).
            </p>
          </div>
        </section>

        {/* Section 13: Para 23 */}
        <section id="as1-para23" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            13. The Critical Rule — Para 23
          </h2>
          <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-800 p-6 rounded-xl space-y-3">
            <p className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-wider">⚠️ CRITICAL — Para 23 of AS 1</p>
            <p className="text-[16px] sm:text-[18px] font-bold text-slate-900 dark:text-white leading-snug italic">
              &ldquo;Disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts.&rdquo; <PdfRef page={5} /><PdfRef page={11} />
            </p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
              If an item has been accounted for incorrectly, merely <em>disclosing</em> this incorrect treatment in the notes does NOT make it acceptable under Indian GAAP. The auditor is still required to <strong>qualify the audit report</strong>.
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-[#1E2640] border border-slate-200 dark:border-gray-700 rounded-xl">
            <p className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-2">Illustrative Example</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
              A company capitalises advertising expenditure (₹50 lakhs) and discloses in Note 1: <em>&ldquo;The company capitalises advertising expenditure as an intangible asset and amortises it over 3 years.&rdquo;</em><br /><br />
              This is wrong under AS 26. The Note 1 disclosure does NOT make it correct. The auditor must qualify the report. <PdfRef page={11} />
            </p>
          </div>
        </section>

        {/* Section 14: Financial Statement Impact */}
        <section id="as1-financial-impact" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            14. Financial Statement Impact of Policy Changes
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#1E2640]">
                  <th className="text-left p-3 font-bold text-slate-700 dark:text-gray-200">Disclosure Element</th>
                  <th className="text-left p-3 font-bold text-slate-700 dark:text-gray-200">What to State</th>
                  <th className="text-left p-3 font-bold text-slate-700 dark:text-gray-200">Mandatory?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {[
                  { element: 'Nature of change', what: 'State old policy and new policy', mandatory: 'Yes' },
                  { element: 'Reason for change', what: 'Statute / standard / better presentation', mandatory: 'Yes' },
                  { element: 'Quantified impact', what: 'Monetary effect on profit/loss for current period', mandatory: 'If ascertainable' },
                  { element: 'Non-ascertainable impact', what: 'State that impact cannot be ascertained', mandatory: 'If not ascertainable' },
                  { element: 'Future impact disclosure', what: 'Fact of change even if no current impact', mandatory: 'If future impact expected' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/50 dark:bg-[#1E2640]/30'}>
                    <td className="p-3 font-semibold text-slate-800 dark:text-gray-200">{row.element}</td>
                    <td className="p-3 text-slate-600 dark:text-gray-400">{row.what}</td>
                    <td className="p-3">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${row.mandatory === 'Yes' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                        {row.mandatory}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 15: Practical Application */}
        <section id="as1-practical" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            15. Practical Application in Corporate Reporting
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
            AS 1 is applied through <strong>Note 1 — Summary of Significant Accounting Policies</strong> in every set of financial statements. <PdfRef page={2} />
          </p>
          <div className="bg-slate-50 dark:bg-[#1E2640] border border-slate-200 dark:border-gray-700 rounded-xl p-5 space-y-3">
            <p className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Analyst Use-Case: Normalising Financials</p>
            <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold leading-relaxed">
              Company A uses <strong>SLM</strong> for plant depreciation; Company B uses <strong>WDV</strong>. With identical operations, Company B reports lower profits in early years. A credit analyst reads AS 1 disclosures to recalculate and normalise EBITDA and net profit before making investment decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Basis of preparation of financial statements',
              'Revenue recognition policy',
              'Depreciation methods and useful lives',
              'Inventory valuation policy',
              'Foreign currency transaction policy',
              'Employee benefits (gratuity, leave encashment)',
              'Taxation policy (current and deferred)',
              'Provisions and contingent liabilities policy',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#111726] border border-slate-200 dark:border-gray-700 rounded-lg text-[13px] font-semibold text-slate-700 dark:text-gray-300">
                <span className="w-5 h-5 bg-[#2D5BE3]/10 dark:bg-[#2D5BE3]/20 rounded text-[#2D5BE3] dark:text-blue-400 font-black text-[10px] flex items-center justify-center shrink-0">{i + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Section 16: AS 1 vs Ind AS 1 */}
        <section id="as1-comparison" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            16. Comparison: AS 1 vs Ind AS 1
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-gray-700">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#1E2640]">
                  <th className="text-left p-3 font-bold text-slate-700 dark:text-gray-200 w-[160px]">Criterion</th>
                  <th className="text-left p-3 font-bold text-[#0F6B5E] dark:text-emerald-400">AS 1 (Indian GAAP)</th>
                  <th className="text-left p-3 font-bold text-[#6B3FA0] dark:text-purple-400">Ind AS 1 (IFRS-converged)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {[
                  { criterion: 'Primary Purpose', as: 'Disclosure of accounting policies only', indAs: 'Complete framework for presentation of financial statements' },
                  { criterion: 'Fundamental Assumptions', as: '3: Going Concern, Consistency, Accrual', indAs: 'Going Concern only; others in conceptual framework' },
                  { criterion: 'OCI', as: 'No concept of OCI', indAs: 'Required — revaluation gains, actuarial gains/losses, FVOCI instruments' },
                  { criterion: 'Statement of Changes in Equity', as: 'Not required under AS 1', indAs: 'Required as part of complete financial statements' },
                  { criterion: 'Fair Value', as: 'Not addressed in AS 1', indAs: 'Pervasive — Ind AS 113 applies' },
                  { criterion: 'Policy Change', as: 'Disclose reason and impact; AS 5 governs', indAs: 'Retrospective application unless impracticable (Ind AS 8)' },
                  { criterion: 'Applicability', as: 'All Indian GAAP entities', indAs: 'Listed and large unlisted companies per MCA roadmap' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/50 dark:bg-[#1E2640]/30'}>
                    <td className="p-3 font-bold text-slate-700 dark:text-gray-300">{row.criterion}</td>
                    <td className="p-3 text-slate-600 dark:text-gray-400">{row.as}</td>
                    <td className="p-3 text-slate-600 dark:text-gray-400">{row.indAs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 17: Journal Entry Guidance */}
        <section id="as1-journal" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            17. Journal Entry Guidance
          </h2>
          <div className="space-y-4">
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">A. Change in Depreciation Method (SLM → WDV)</h3>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Cumulative excess/shortfall adjusted against Retained Earnings.</p>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-200">
                <span className="text-emerald-400">Debit</span>  Retained Earnings / General Reserve A/c &nbsp;&nbsp;₹X<br />
                <span className="text-red-400">Credit</span> Accumulated Depreciation A/c &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹X<br />
                <span className="text-slate-400">(Being cumulative depreciation adjustment on change of policy SLM to WDV)</span>
              </div>
            </div>
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">B. Accrual of Outstanding Expenses (Accrual Assumption)</h3>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">Wages due but not paid at year-end must be recognised.</p>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-200">
                <span className="text-emerald-400">Debit</span>  Wages A/c &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹X<br />
                <span className="text-red-400">Credit</span> Outstanding Wages A/c &nbsp;&nbsp;₹X<br />
                <span className="text-slate-400">(Being wages accrued but unpaid — current liability per accrual basis, AS 1)</span>
              </div>
            </div>
            <div className="p-5 border border-slate-200 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-[#1E2640]/50 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">C. Inventory Write-down to NRV (Prudence)</h3>
              <p className="text-[13px] text-slate-700 dark:text-gray-300 font-semibold">If NRV falls below cost, an impairment provision is created — applying prudence.</p>
              <div className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-200">
                <span className="text-emerald-400">Debit</span>  Loss on Inventory Write-down A/c &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹X<br />
                <span className="text-red-400">Credit</span> Provision for Inventory Write-down A/c &nbsp;₹X<br />
                <span className="text-slate-400">(Being inventory written down to NRV — AS 2 / Prudence principle of AS 1)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 18: Examination Focus */}
        <section id="as1-exam-focus" className="scroll-mt-28 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
            18. Examination Focus (CA Intermediate)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                topic: 'Three Fundamental Assumptions',
                points: ['Name all three: Going Concern, Consistency, Accrual', 'If followed: no disclosure; if not followed: must disclose', 'Identify which assumption is breached in a given scenario'],
                color: 'blue',
              },
              {
                topic: 'Policy vs. Estimate Change',
                points: ['Policy change = AS 1 governs', 'Estimate change = AS 5 governs', 'Depreciation method = policy; Useful life = estimate'],
                color: 'purple',
              },
              {
                topic: 'Para 23 — The Critical Rule',
                points: ['Disclosure cannot remedy wrong accounting treatment', 'Auditor must qualify even if disclosure is made', 'Single most-tested concept in AS 1 theory questions'],
                color: 'red',
              },
              {
                topic: 'Quantified Impact Disclosure',
                points: ['If ascertainable: must state the amount', 'If not ascertainable: must state that fact explicitly', 'Common: depreciation method change and its P&L impact'],
                color: 'green',
              },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl border ${
                item.color === 'blue' ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40' :
                item.color === 'purple' ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40' :
                item.color === 'red' ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40' :
                'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
              }`}>
                <p className={`text-[12px] font-bold uppercase tracking-wider mb-3 ${
                  item.color === 'blue' ? 'text-blue-700 dark:text-blue-400' :
                  item.color === 'purple' ? 'text-purple-700 dark:text-purple-400' :
                  item.color === 'red' ? 'text-red-700 dark:text-red-400' :
                  'text-emerald-700 dark:text-emerald-400'
                }`}>{item.topic}</p>
                <ul className="space-y-1.5">
                  {item.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-slate-700 dark:text-gray-300 font-semibold">
                      <span className={`mt-0.5 shrink-0 font-black ${
                        item.color === 'blue' ? 'text-blue-500' :
                        item.color === 'purple' ? 'text-purple-500' :
                        item.color === 'red' ? 'text-red-500' :
                        'text-emerald-500'
                      }`}>→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-[#EEF2FD] dark:bg-[#1A2542] p-5 rounded-xl border border-[#C5D5F8] dark:border-[#2D3F7A]">
            <p className="text-xs font-bold text-[#2D5BE3] dark:text-blue-400 uppercase tracking-wider mb-2">Quick Recall: The AS 1 Framework</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] font-semibold">
              <div className="text-slate-700 dark:text-gray-300"><span className="font-bold text-[#2D5BE3] dark:text-blue-400">Purpose:</span> Promote comparability through disclosure</div>
              <div className="text-slate-700 dark:text-gray-300"><span className="font-bold text-[#2D5BE3] dark:text-blue-400">Key Test:</span> Is the policy significant / material?</div>
              <div className="text-slate-700 dark:text-gray-300"><span className="font-bold text-[#2D5BE3] dark:text-blue-400">Core Rule:</span> Disclosure cannot cure wrong treatment (Para 23)</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
