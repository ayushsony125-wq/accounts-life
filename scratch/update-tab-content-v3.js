const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/standards/learning/LearningPortalClient.tsx');
let fileContent = fs.readFileSync(filePath, 'utf8');

const startMarker = 'function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS1StandardTabContentProps) {';
const endMarker = 'interface LearningPortalClientProps {';

const startIndex = fileContent.indexOf(startMarker);
const endIndex = fileContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const newFunctionContent = `function AS1StandardTabContent({ navigateToPdfPage, renderTextWithReferences }: AS1StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'depr': true,
  })

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const scrollContainer = document.getElementById('as1-overview')?.closest('.overflow-y-auto') || null;
    
    const sectionToChapterMap: Record<string, string> = {
      'overview': 'overview',
      'scope': 'scope',
      'definition': 'definition',
      'areas': 'areas',
      'selection': 'selection',
      'prudence': 'selection',
      'substance': 'selection',
      'materiality': 'selection',
      'assumptions': 'assumptions',
      'going-concern': 'assumptions',
      'consistency': 'assumptions',
      'accrual': 'assumptions',
      'disclosure': 'disclosure',
      'change-policy': 'change-policy',
      'para23': 'change-policy',
      'footnotes': 'footnotes'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const secId = entry.target.id.replace('as1-', '');
            const chapterId = sectionToChapterMap[secId] || secId;
            setActiveSection(chapterId);
          }
        })
      },
      {
        root: scrollContainer,
        rootMargin: '-110px 0px -65% 0px',
        threshold: 0
      }
    )

    const allIds = [
      'overview', 'scope', 'definition', 'areas', 'selection', 'prudence', 'substance', 
      'materiality', 'assumptions', 'going-concern', 'consistency', 'accrual', 
      'disclosure', 'change-policy', 'para23', 'footnotes'
    ];

    allIds.forEach((id) => {
      const el = document.getElementById(\`as1-\${id}\`)
      if (el) {
        observer.observe(el)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-650 dark:text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer select-none align-middle leading-none"
      title={\`Open ICAI AS 1 PDF — Page \${page}\`}
    >
      <FileText size={9} className="shrink-0" />
      p.{page}
    </button>
  )

  const as1Chapters = [
    { id: 'overview',     title: 'I. INTRODUCTION' },
    { id: 'scope',        title: 'II. SCOPE' },
    { id: 'definition',   title: 'III. DEFINITIONS' },
    { id: 'areas',        title: 'IV. AREAS OF DIVERSITY' },
    { id: 'selection',    title: 'V. CONSIDERATIONS' },
    { id: 'assumptions',  title: 'VI. ASSUMPTIONS' },
    { id: 'disclosure',   title: 'VII. DISCLOSURE' },
    { id: 'change-policy',title: 'VIII. CHANGES' },
    { id: 'footnotes',    title: 'IX. STATUTORY' }
  ]

  const ChapterHeader = ({ num, title, description }: { num: number; title: string; description: string }) => (
    <div className="border-y border-slate-200/80 dark:border-slate-800 py-6 mb-8 bg-slate-50/20 dark:bg-slate-900/5 select-none w-full">
      <div className="text-amber-800 dark:text-amber-500 font-serif font-black tracking-widest text-center text-xs uppercase mb-1">
        — Chapter {num} —
      </div>
      <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-905 dark:text-white text-center tracking-tight leading-tight uppercase py-1">
        {title}
      </h2>
      <div className="w-12 h-[1px] bg-amber-600 dark:bg-amber-500 mx-auto my-2"></div>
      <p className="text-[12.5px] italic font-serif text-slate-500 dark:text-slate-400 text-center max-w-3xl mx-auto px-4 mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  )

  const AccordionItem = ({ 
    id, 
    num, 
    title, 
    refStd, 
    choice, 
    impact, 
    detail 
  }: { 
    id: string; 
    num: string; 
    title: string; 
    refStd: string; 
    choice: string; 
    impact: string; 
    detail: string;
  }) => {
    const isOpen = openAccordions[id];
    return (
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-[#FAFAF9]/30 dark:bg-[#151d30]/30 transition-all hover:shadow-xs w-full">
        <button
          onClick={() => toggleAccordion(id)}
          className="w-full text-left font-serif font-bold text-slate-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400 flex items-center justify-between p-4 select-none cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span className="text-amber-750 dark:text-amber-500 font-mono text-xs font-bold bg-amber-50 dark:bg-amber-955 px-2 py-0.5 rounded">
              {num}
            </span>
            <span className="text-sm sm:text-[15px]">{title}</span>
          </span>
          <ChevronDown 
            size={15} 
            className={\`transform transition-transform text-slate-400 \${isOpen ? 'rotate-180 text-amber-700' : ''}\`} 
          />
        </button>
        {isOpen && (
          <div className="border-t border-slate-200/80 dark:border-slate-850 bg-white dark:bg-[#0f1422] p-6 space-y-4 font-serif text-[14px] w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-850 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">
                  Standard Reference
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-sans font-semibold text-xs bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-800 inline-block">
                  {refStd}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">
                  Key Policy Choice
                </span>
                <span className="text-slate-850 dark:text-slate-200 font-medium text-xs font-sans">
                  {choice}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">
                  Financial Impact
                </span>
                <span className="text-slate-700 dark:text-slate-350 leading-normal font-sans text-xs">
                  {impact}
                </span>
              </div>
            </div>
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-[13.5px] pt-1">
              {detail}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F8FAFC] dark:bg-[#070A10] -m-4 md:-m-6 p-4 sm:p-6 lg:p-8">
      {/* Sticky Table of Contents Header */}
      <div className="sticky top-[58px] bg-white/95 dark:bg-[#0f1422]/95 backdrop-blur-md py-3 px-6 border-b border-slate-200 dark:border-slate-800/80 z-20 max-w-full w-full select-none rounded-t-2xl shadow-md">
        <div className="flex flex-row flex-nowrap items-center justify-between gap-x-6 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <span className="font-serif text-slate-800 dark:text-slate-250 font-bold text-xs uppercase tracking-widest shrink-0 pr-4 border-r border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <BookOpen size={13} className="text-amber-705 dark:text-amber-500" />
            AS 1 REFERENCE MANUAL
          </span>
          <div className="flex flex-row items-center gap-x-4 overflow-x-auto scroll-smooth py-0.5 font-serif text-[11px] font-bold uppercase tracking-wider">
            {as1Chapters.map((sec, idx) => (
              <React.Fragment key={sec.id}>
                {idx > 0 && <span className="text-slate-300 dark:text-slate-700 select-none">•</span>}
                <button
                  onClick={() => {
                    const el = document.getElementById(\`as1-\${sec.id}\`);
                    if (el) {
                      const scrollContainer = el.closest('.overflow-y-auto');
                      if (scrollContainer) {
                        const containerRect = scrollContainer.getBoundingClientRect();
                        const elRect = el.getBoundingClientRect();
                        const relativeTop = elRect.top - containerRect.top + scrollContainer.scrollTop;
                        scrollContainer.scrollTo({
                          top: relativeTop - 110,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }}
                  className={\`transition-all hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer py-1 \${
                    activeSection === sec.id
                      ? 'text-amber-700 dark:text-amber-450 font-extrabold border-b-2 border-amber-600 dark:border-amber-450'
                      : 'text-slate-500 dark:text-gray-400'
                  }\`}
                >
                  {sec.title}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Publication Sheet Canvas - expanded to 100% of disponible width */}
      <div className="bg-white dark:bg-[#0f1422] shadow-2xl border-x border-b border-slate-200/80 dark:border-gray-800/85 rounded-b-2xl max-w-full w-full p-8 sm:p-16 lg:p-20 space-y-20 relative">
        
        {/* Cover Document Header */}
        <div className="border-b-4 border-double border-amber-700/80 dark:border-amber-500/60 pb-10 mb-16 text-center select-none w-full">
          <div className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3 font-mono">
            Accounting Standards Board • The Institute of Chartered Accountants of India
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif tracking-tight mb-3">
            Accounting Standard (AS) 1
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 font-serif italic font-medium">
            Disclosure of Accounting Policies
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            <span>Universal Application</span>
            <span>•</span>
            <span>Mandatory under Companies Act 2013</span>
          </div>
        </div>

        {/* Chapter 1: Introduction & Purpose */}
        <section id="as1-overview" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={1} 
            title="Introduction & Purpose of the Standard" 
            description="Overview of the primary causes of diversity in financial reporting, the inherent limits of accounting standardization, and the qualitative necessity of systematic policy disclosure to ensure comparability."
          />
          
          <div className="max-w-4xl mx-auto">
            <p className="text-[15px] font-serif text-slate-800 dark:text-slate-250 leading-relaxed">
              Irrespective of the extent of standardization, diversity in accounting policies is unavoidable for two primary reasons:
            </p>
          </div>

          {/* Reason for Diversity Comparison Block */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden my-6 bg-slate-50/20 dark:bg-[#131a2c]/20 w-full">
            <div className="bg-slate-50 dark:bg-[#161f33] px-6 py-3.5 border-b border-slate-200 dark:border-slate-850">
              <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-205 uppercase tracking-widest font-mono">
                Reason for Diversity in Accounting Policies
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-amber-50 dark:bg-amber-955 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">Limits</span>
                  <h5 className="font-serif font-bold text-[15.5px] text-slate-900 dark:text-white">Standardization Limits</h5>
                </div>
                <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                  Accounting standards cannot and do not cover all possible areas of accounting, leaving enterprises with the freedom to adopt any reasonable accounting policy in areas not covered by a standard. <PdfRef page={2} />
                </p>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-amber-50 dark:bg-amber-955 text-amber-805 dark:text-amber-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">Diversity</span>
                  <h5 className="font-serif font-bold text-[15.5px] text-slate-900 dark:text-white">Operating Diversity</h5>
                </div>
                <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                  Since enterprises operate in diverse situations, it is impossible to develop a single set of policies applicable to all enterprises for all time. <PdfRef page={2} />
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-5 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Differences in accounting policies lead to differences in reported financial information even if the underlying transactions are identical.
            </p>
            <p>
              The qualitative characteristic of comparability of financial statements, therefore, suffers due to this diversity of accounting policies. Since uniformity is impossible, and accounting standards permit alternatives, it is not enough to say that all standards have been complied with. <PdfRef page={2} />
            </p>
            
            <div className="p-6 my-8 border-l-4 border-amber-600 dark:border-amber-500 bg-amber-50/20 dark:bg-amber-955/10 rounded-r-lg font-serif">
              <p className="text-[14.5px] font-medium text-slate-850 dark:text-slate-200 leading-relaxed">
                For these reasons, Accounting Standard 1 requires enterprises to disclose significant accounting policies actually adopted by them in the preparation of their financial statements. Such disclosures allow the users of financial statements to take the differences in accounting policies into consideration and to make necessary adjustments in their analysis of such financial statements. <PdfRef page={2} />
              </p>
            </div>

            <p>
              The purpose of Accounting Standard 1, Disclosure of Accounting Policies, is to promote a better understanding of financial statements by requiring disclosure of significant accounting policies in an orderly manner. Such disclosures facilitate more meaningful comparison between financial statements of different enterprises for the same accounting period, and the disclosure of changes in accounting policies allows users to compare financial statements of the same enterprise for different periods. <PdfRef page={2} />
            </p>
          </div>
        </section>

        {/* Chapter 2: Scope & Applicability */}
        <section id="as1-scope" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={2} 
            title="Scope &amp; Applicability" 
            description="Detailed statutory scope and applicability guidelines for AS 1 across corporate and non-corporate entities, outlining the information requirements of diverse external stakeholders."
          />

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              This Accounting Standard applies to all enterprises in the preparation and presentation of general-purpose financial statements. <PdfRef page={2} />
            </p>
            <p>
              General-purpose financial statements are those prepared and presented at least annually to meet the common informational needs of a wide spectrum of external stakeholders.
            </p>
          </div>
          
          <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#161f33] border-b border-slate-200 dark:border-slate-850 font-mono">
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/4">External Stakeholder</th>
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-3/4">Analytical Needs &amp; AS 1 Relevance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850 font-serif text-slate-705 dark:text-slate-300">
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Shareholders &amp; Investors</td>
                  <td className="py-3.5 px-4 leading-relaxed">Require clear information on accounting policies to evaluate earnings quality and assess management's stewardship of capital.</td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Creditors &amp; Suppliers</td>
                  <td className="py-3.5 px-4 leading-relaxed">Analyze asset valuations and liability provisions to evaluate creditworthiness and liquidity.</td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Banks &amp; Lenders</td>
                  <td className="py-3.5 px-4 leading-relaxed">Require consistent policy application to evaluate debt service coverage ratios and compliance with loan covenants.</td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Regulators &amp; Tax Authorities</td>
                  <td className="py-3.5 px-4 leading-relaxed">Monitor statutory compliance and taxation based on standard-compliant financial statements.</td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Employees &amp; Public</td>
                  <td className="py-3.5 px-4 leading-relaxed">Assess the stability, employment prospects, and growth path of the enterprise.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="max-w-4xl mx-auto font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Consequently, disclosures regarding the accounting policies adopted by an enterprise are critical for ensuring that these statements are interpreted correctly. Under the framework established by the Institute of Chartered Accountants of India (ICAI) and the Companies Act, 2013, the applicability of AS 1 is universal across all classes of enterprises, including corporate and non-corporate entities. Compliance is mandated by Section 129(1) of the Companies Act, 2013, while for non-corporate entities compliance is required under the announcements and guidelines issued by the ICAI.
            </p>
          </div>
        </section>

        {/* Chapter 3: Definition of Accounting Policies */}
        <section id="as1-definition" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={3} 
            title="Definition of Accounting Policies" 
            description="Formal definitions of Accounting Policies, contrasting accounting principles with their practical methods of application, and distinguishing policies from management estimates under statutory guidelines."
          />

          <div className="max-w-4xl mx-auto">
            <p className="text-[15px] font-serif text-slate-800 dark:text-slate-250 leading-relaxed">
              Accounting policies refer to the specific accounting principles and the methods of applying those principles adopted by the enterprise in the preparation and presentation of financial statements. <PdfRef page={4} />
            </p>
          </div>
          
          {/* Table 1: Principles vs Methods */}
          <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#161f33] border-b border-slate-200 dark:border-slate-855 font-mono">
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/2">Accounting Principles</th>
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/2">Methods of Applying Principles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850 font-serif text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    The core conceptual bases and measurement models chosen for recording economic events and transactions in the financial books (for example, historical cost, revaluation model, or net realizable value).
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    The specific procedures, formulas, or methods used to implement those principles (for example, FIFO or Weighted Average formulas for inventory, or Straight-Line or WDV methods for depreciation).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Accounting involves both science and art. It is a science because it is based on structured, tested, and universally applicable accounting principles and frameworks. Simultaneously, it is an art because the practical application of these principles relies heavily on the personal ability, professional judgment, and estimates of the accountant. Since different accountants and management teams may exercise judgment differently under similar circumstances, enterprises within the same industry often adopt different accounting policies. <PdfRef page={5} />
            </p>
          </div>
          
          {/* Table 2: Policies vs Estimates */}
          <div className="mt-8 space-y-3">
            <div className="text-slate-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider font-mono">Table 2: policies vs. estimates</div>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg w-full">
              <table className="w-full text-left border-collapse text-[13.5px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#161f33] border-b border-slate-200 dark:border-slate-850 font-mono">
                    <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/4">Attribute</th>
                    <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-3/8">Accounting Policy</th>
                    <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-3/8">Accounting Estimate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-850 font-serif text-slate-700 dark:text-slate-300">
                  <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Definition</td>
                    <td className="py-3.5 px-4 leading-relaxed">Specific accounting principles and the methods of applying those principles.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Judgments made to estimate the carrying value of assets or liabilities under the selected policy.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Responsibility</td>
                    <td className="py-3.5 px-4 leading-relaxed">Board of Directors (statutory Directors' Responsibility Statement under Section 134(5)).</td>
                    <td className="py-3.5 px-4 leading-relaxed">Management and operational accountants based on the latest available information.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Examples</td>
                    <td className="py-3.5 px-4 leading-relaxed">Switching from FIFO to Weighted Average cost formula.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Estimating provision for non-moving inventory based on a technical evaluation.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Change Criteria</td>
                    <td className="py-3.5 px-4 leading-relaxed">Allowed only if required by statute, standard, or for more appropriate presentation.</td>
                    <td className="py-3.5 px-4 leading-relaxed">Updated based on new information, experience, or technical evaluations.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Under Section 134(5) of the Companies Act, 2013, the responsibility for selecting appropriate accounting policies and applying them consistently rests with the Board of Directors of the company. The Directors' Responsibility Statement must explicitly state that the policies selected are reasonable and prudent, so as to give a true and fair view of the state of affairs and the profit or loss of the enterprise.
            </p>
          </div>
        </section>

        {/* Chapter 4: Key Areas of Diversity in Accounting Policies */}
        <section id="as1-areas" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={4} 
            title="Key Areas of Diversity in Accounting Policies" 
            description="A comprehensive reference of the fifteen key business and reporting areas where enterprises commonly encounter diversity, detailing standard choices and their corresponding financial statement impacts."
          />

          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-[15px] font-serif text-slate-800 dark:text-slate-250 leading-relaxed">
              Due to the diverse operating environments of enterprises, different accounting policies are encountered in various areas of financial reporting. The official standard lists several key areas where different accounting policies can be adopted by different enterprises: <PdfRef page={4} />
            </p>
          </div>

          {/* Grouped Diversity Accordions (15 modules) */}
          <div className="space-y-8 w-full">
            
            {/* Category A */}
            <div className="space-y-4 w-full">
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 font-mono">
                Group A: Asset Valuation, Depreciation &amp; Goodwill
              </h3>
              
              <div className="grid grid-cols-1 gap-4 w-full">
                {diversityAreas.slice(0, 5).map(item => (
                  <AccordionItem 
                    key={item.id}
                    id={item.id}
                    num={item.num}
                    title={item.title}
                    refStd={item.refStd}
                    choice={item.choice}
                    impact={item.impact}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>

            {/* Category B */}
            <div className="space-y-4 w-full">
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 font-mono">
                Group B: Revenue, Contracts &amp; Construction Overhead
              </h3>
              
              <div className="grid grid-cols-1 gap-4 w-full">
                {diversityAreas.slice(5, 10).map(item => (
                  <AccordionItem 
                    key={item.id}
                    id={item.id}
                    num={item.num}
                    title={item.title}
                    refStd={item.refStd}
                    choice={item.choice}
                    impact={item.impact}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>

            {/* Category C */}
            <div className="space-y-4 w-full">
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2 font-mono">
                Group C: Provisions, Retirement Benefits, Translation &amp; Leases
              </h3>
              
              <div className="grid grid-cols-1 gap-4 w-full">
                {diversityAreas.slice(10, 15).map(item => (
                  <AccordionItem 
                    key={item.id}
                    id={item.id}
                    num={item.num}
                    title={item.title}
                    refStd={item.refStd}
                    choice={item.choice}
                    impact={item.impact}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>

          </div>

          <div className="max-w-4xl mx-auto mt-6">
            <p className="text-slate-500 dark:text-gray-400 italic text-[14px]">
              * Note: This list is illustrative and not exhaustive, as indicated by paragraph 15 of the standard. It highlights that in the absence of a single uniform policy, disclosure of the chosen policy is the only way to ensure comparability of financial statements across enterprises.
            </p>
          </div>
        </section>

        {/* Chapter 5: Selection of Accounting Policies */}
        <section id="as1-selection" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={5} 
            title="Considerations in Selection of Accounting Policies" 
            description="An analysis of the primary considerations in selecting accounting policies—Prudence, Substance over Form, and Materiality—essential for presenting a true and fair view of financial affairs."
          />

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Financial statements are prepared to portray a true and fair view of the performance and state of affairs of an enterprise. In selecting an accounting policy, alternative accounting policies should be evaluated in that light. <PdfRef page={5} />
            </p>
            <p>
              The preparation of financial statements requires management to exercise significant judgment. In doing so, the primary consideration is that the financial statements must present a true and fair view of the financial position (Balance Sheet) and performance (Statement of Profit and Loss) of the enterprise.
            </p>
          </div>

          {/* Considerations Comparison Matrix */}
          <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#161f33] border-b border-slate-200 dark:border-slate-850 font-mono">
                  <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/3">Prudence (Conservatism)</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/3">Substance over Form</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/3">Materiality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850 font-serif text-slate-705 dark:text-slate-300">
                <tr>
                  <td className="py-4 px-4 leading-relaxed align-top space-y-2">
                    <strong className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 block">Principle</strong>
                    <p>Profits are not anticipated, but losses are provided for. Assets and profits must not be overstated, and liabilities and losses must not be understated.</p>
                    <strong className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block pt-2 font-mono">Reasoning</strong>
                    <p>Future events are inherently uncertain. Conservatism ensures financial statements do not paint an overly optimistic picture, protecting stakeholders.</p>
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top space-y-2">
                    <strong className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 block">Principle</strong>
                    <p>Transactions and other events should be accounted for and presented in accordance with their economic substance and financial reality, and not merely by their legal form.</p>
                    <strong className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block pt-2 font-mono">Reasoning</strong>
                    <p>Legal form is subordinate to the underlying economic realities of transactions to prevent misleading presentation (e.g. Hire Purchase capitalized immediately).</p>
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top space-y-2">
                    <strong className="font-sans font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 block">Principle</strong>
                    <p>Financial statements should disclose all material items—i.e., items the knowledge of which might influence the economic decisions of the user.</p>
                    <strong className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 block pt-2 font-mono">Reasoning</strong>
                    <p>Depends on the size, nature, and context. Standards apply only to material items. Immaterial items do not require explicit compliance or disclosure.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5A: Prudence */}
        <section id="as1-prudence" className="scroll-mt-36 space-y-6 w-full">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-6">
            <div className="text-amber-700 dark:text-amber-500 font-serif italic text-sm tracking-wider mb-1 font-semibold uppercase">
              Sub-chapter 5A
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Considerations: Prudence
            </h3>
          </div>

          <div className="my-5 p-5 border-l-4 border-amber-600 dark:border-amber-500 bg-amber-50/10 dark:bg-amber-955/5 rounded-r-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500 block mb-1 font-mono">Core Principle: Prudence</span>
            <p className="text-[15px] font-semibold text-slate-850 dark:text-slate-200 leading-relaxed font-serif">
              Profits are not anticipated, but losses are provided for. Assets and profits must not be overstated, and liabilities and losses must not be understated, in view of the uncertainty associated with future events.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              In view of the uncertainty associated with future events, profits are not anticipated, but losses are provided for as a matter of conservatism. Provisions must be created for all known liabilities and losses even though the amount cannot be determined with certainty and represents only a best estimate in the light of available information. <PdfRef page={5} />
            </p>
            <p>
              The exercise of prudence in the selection and application of accounting policies ensures that:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-800 dark:text-slate-250">
              <li>Profits and assets are not overstated.</li>
              <li>Losses and liabilities are not understated.</li>
            </ul>
            <p>
              However, the exercise of prudence does not permit the creation of hidden or secret reserves by deliberately understating profits and assets, or by deliberately overstating liabilities and losses, which would prevent the financial statements from presenting a true and fair view. The standard requires that prudence must be exercised with neutrality and must not result in intentional bias. <PdfRef page={6} />
            </p>
            <p>
              <strong>The Provision vs. Contingency Rule (Pending Damage Suit):</strong> Under the principles of prudence, when an enterprise is facing a legal claim or a damage suit, a provision should only be recognized by a charge against profit if the probability of losing the suit is more than the probability of not losing it (i.e., it is probable that an outflow of resources will occur). If it is only possible or remote, it must not be provisioned, as doing so would lead to the creation of an unauthorized hidden reserve, thereby understating profits and assets in violation of the true and fair view requirement.
            </p>
          </div>
        </section>

        {/* Section 5B: Substance over Form */}
        <section id="as1-substance" className="scroll-mt-36 space-y-6 w-full">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-6">
            <div className="text-amber-700 dark:text-amber-500 font-serif italic text-sm tracking-wider mb-1 font-semibold uppercase">
              Sub-chapter 5B
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Considerations: Substance over Form
            </h3>
          </div>

          <div className="my-5 p-5 border-l-4 border-amber-600 dark:border-amber-500 bg-amber-50/10 dark:bg-amber-955/5 rounded-r-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500 block mb-1 font-mono">Core Principle: Substance over Form</span>
            <p className="text-[15px] font-semibold text-slate-850 dark:text-slate-200 leading-relaxed font-serif">
              Transactions and events must be accounted for and presented in accordance with their economic substance and financial reality, and not merely their legal form.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Transactions and other events should be accounted for and presented in accordance with their economic substance and financial reality, and not merely by their legal form. <PdfRef page={6} />
            </p>
            <p>
              The economic substance of a transaction determines its accounting treatment and presentation, ensuring that financial statements reflect the actual financial reality rather than just legal structures. Under this principle, legal form is subordinate to the underlying economic realities of transactions.
            </p>
            <p>
              <strong>Hire-Purchase and Lease Transactions:</strong> A classic application of this principle is a hire-purchase agreement. Under legal form, the ownership of the asset remains with the seller until the final installment is paid. However, in economic substance, the buyer gains immediate control, use, and risks and rewards of the asset from day one. Therefore, the asset is capitalized in the books of the buyer, and a corresponding liability is recorded, reflecting the substance of the transaction. Similarly, under AS 19, a finance lease is recorded as an asset and a liability by the lessee because the economic risks and rewards of ownership are transferred, irrespective of who holds the legal title.
            </p>
          </div>
        </section>

        {/* Section 5C: Materiality */}
        <section id="as1-materiality" className="scroll-mt-36 space-y-6 w-full">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-6">
            <div className="text-amber-700 dark:text-amber-500 font-serif italic text-sm tracking-wider mb-1 font-semibold uppercase">
              Sub-chapter 5C
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Considerations: Materiality
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Financial statements should disclose all material items—i.e., items the knowledge of which might influence the economic decisions of the user of the financial statements. <PdfRef page={6} />
            </p>
            <p>
              Materiality depends on the size, nature, and context of the item. An item may be material not always because of its relative size, but due to its nature. For instance, a minor transaction might be immaterial by size, but a small discrepancy involving fraud or irregularity is material by nature because it indicates a flaw in internal control systems. Accounting standards apply only to items that are material. <PdfRef page={6} />
            </p>
          </div>

          <div className="my-6 border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#161f33] border-b border-slate-200 dark:border-slate-850 font-mono">
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/2">Statutory Disclosure Item</th>
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-1/2">Schedule III Quantitative Threshold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850 font-serif text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Income or Expenditure Items</td>
                  <td className="py-3.5 px-4">Exceeding 1% of the revenue from operations or ₹1,00,000, whichever is higher.</td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Shareholder Notes</td>
                  <td className="py-3.5 px-4">Details of shareholders holding more than 5 percent of the total shares in the company.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Chapter 6: Fundamental Accounting Assumptions */}
        <section id="as1-assumptions" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={6} 
            title="Fundamental Accounting Assumptions" 
            description="Explaining the three silent default postulates of accounting—Going Concern, Consistency, and Accrual—their regulatory mandates, and the critical valuation adjustments required upon violation."
          />

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Certain fundamental accounting assumptions underlie the preparation and presentation of financial statements. They are usually not specifically stated because their acceptance and use are assumed. Disclosure is necessary if they are not followed. <PdfRef page={3} />
            </p>
            <p>
              These assumptions serve as &quot;silent assumptions&quot; or &quot;implicit defaults.&quot; The user of financial statements operates on the presumption that these three core assumptions have been followed in the preparation of the statements.
            </p>
          </div>
          
          {/* Fundamental Assumptions Matrix */}
          <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg w-full">
            <table className="w-full text-left border-collapse text-[13.5px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#161f33] border-b border-slate-200 dark:border-slate-850 font-mono">
                  <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-[15%]">Assumption</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-[25%]">Meaning</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-[25%]">Objective</th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] w-[35%]">Impact if Violated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-850 font-serif text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider align-top">Going Concern</td>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    The enterprise will continue operations in the foreseeable future with neither intention nor need to liquidate or curtail scale.
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    Allows recording assets at cost representing service potential rather than net realizable values.
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top space-y-1">
                    <span className="font-semibold text-red-650 dark:text-red-400 block font-sans text-[10px] uppercase tracking-wider font-mono">Liquidation Basis</span>
                    <p className="text-[13px]">Assets written down to net realizable values; long-term liabilities reclassified as current; provisions recognized for constructive closure costs. Disclosure of this fact and basis is mandatory.</p>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider align-top">Consistency</td>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    Same accounting policies are used for similar transactions from one period to another to ensure comparability over time.
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    Ensures comparability across periods and prevents manipulation of results through frequent changes in policies.
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top space-y-1">
                    <span className="font-semibold text-red-650 dark:text-red-400 block font-sans text-[10px] uppercase tracking-wider font-mono">Change Disclosures</span>
                    <p className="text-[13px]">Allowed only if required by statute, standard, or for better presentation. Must disclose the change, reasons, and current/future financial impact. If not ascertainable, disclose that fact.</p>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider align-top">Accrual</td>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    Transactions are recognised when they occur (earned/incurred), regardless of cash receipt or payment.
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top">
                    Provides a true and fair view of performance by matching cost and revenue in the relevant period.
                  </td>
                  <td className="py-4 px-4 leading-relaxed align-top space-y-1">
                    <span className="font-semibold text-red-650 dark:text-red-400 block font-sans text-[10px] uppercase tracking-wider font-mono">Cash-basis Violations</span>
                    <p className="text-[13px]">Mandatory disclosure of cash-basis items and impact. For corporate entities, this violates Section 128(1) of the Companies Act, 2013, attracting strict statutory penalties.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6A: Going Concern */}
        <section id="as1-going-concern" className="scroll-mt-36 space-y-6 w-full">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-6">
            <div className="text-amber-700 dark:text-amber-500 font-serif italic text-sm tracking-wider mb-1 font-semibold uppercase">
              Sub-chapter 6A
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Assumption: Going Concern
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              The financial statements are normally prepared on the assumption that an enterprise will continue its operations in the foreseeable future and has neither the intention, nor the need to materially curtail the scale of operations. <PdfRef page={3} />
            </p>
            <p>
              Financial statements prepared on a going concern basis recognise the need for sufficient retention of profit to replace assets consumed in operation and for making adequate provision for settlement of its liabilities. Under this assumption, assets are recorded at values representing their service potential rather than net realisable values.
            </p>
            <p>
              <strong>Impact of Going Concern Violations on Asset and Liability Valuation:</strong> If the going concern assumption is no longer valid (for example, if the enterprise is undergoing liquidation, faces closure by court order, or has its principal license revoked), the basis of preparing financial statements changes completely. Assets must no longer be valued at historical cost less depreciation (amortized cost) but must be written down to their net realizable values (liquidation values). Similarly, long-term liabilities must be reclassified as current liabilities, and provisions must be recognized for any constructive obligations or termination costs arising from closure. Under AS 1, a failure to follow the going concern assumption requires the enterprise to disclose this fact explicitly, stating the basis of valuation used.
            </p>
          </div>
        </section>

        {/* Section 6B: Consistency */}
        <section id="as1-consistency" className="scroll-mt-36 space-y-6 w-full">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-6">
            <div className="text-amber-700 dark:text-amber-500 font-serif italic text-sm tracking-wider mb-1 font-semibold uppercase">
              Sub-chapter 6B
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Assumption: Consistency
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              The principle of consistency refers to the practice of using same accounting policies for similar transactions in all accounting periods. Consistency improves comparability of financial statements through time. <PdfRef page={3} />
            </p>
            <p>
              Consistency ensures that management cannot manipulate the financial results of different periods by frequently changing accounting policies to suit short-term goals.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              An accounting policy can be changed if and only if the change is required by one of the following circumstances:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>By Statute:</strong> To comply with the provisions of applicable laws or regulations (for example, if a new statutory rule overrides an existing accounting policy).
              </li>
              <li>
                <strong>By Accounting Standard:</strong> For compliance with a newly issued or revised accounting standard (for example, when transitioning to a new standard that mandates a specific treatment).
              </li>
              <li>
                <strong>Better Presentation:</strong> When management determines that the change will result in a more appropriate and fairer presentation of financial transactions in the statements. The burden of proof lies on management to demonstrate that the new policy is superior to the old one.
              </li>
            </ol>
          </div>
        </section>

        {/* Section 6C: Accrual */}
        <section id="as1-accrual" className="scroll-mt-36 space-y-6 w-full">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-6">
            <div className="text-amber-705 dark:text-amber-500 font-serif italic text-sm tracking-wider mb-1 font-semibold uppercase">
              Sub-chapter 6C
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Assumption: Accrual
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              Under this basis of accounting, transactions are recognised as soon as they occur, whether or not cash or cash equivalent is actually received or paid. Accrual basis ensures a better matching between revenue and cost, and the profit or loss obtained on this basis reflects activities of the enterprise during an accounting period, rather than cash flows generated by it. <PdfRef page={3} />
            </p>
            <p>
              While accrual basis is a more logical approach to profit determination than the cash basis of accounting, it exposes an enterprise to the risk of recognising an income before actual receipt. The accrual basis can, therefore, overstate the divisible profits and dividend decisions based on such overstated profit lead to erosion of capital. For this reason, accounting standards require that no revenue should be recognised unless the consideration and actual realisation is reasonably certain. <PdfRef page={4} />
            </p>
            <p>
              <strong>The Matching Concept and Statutory Mandate:</strong> The accrual basis is directly linked to the matching concept, which requires that costs incurred to earn revenue must be recognized in the same period as the revenue. This leads to the recognition of outstanding/prepaid expenses and accrued/unearned incomes on the Balance Sheet.
            </p>
            <p>
              Under Section 128(1) of the Companies Act, 2013, it is mandatory for all corporate entities in India to maintain their books of accounts on an accrual basis only. Non-compliance with Section 128(1) attracts strict legal penalties for directors and officers in default. In case any income or expense is recognized on a cash basis by a non-corporate enterprise, that fact must be explicitly disclosed in the notes.
            </p>
          </div>
        </section>

        {/* Chapter 7: Manner of Disclosure */}
        <section id="as1-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={7} 
            title="Manner of Disclosure" 
            description="The statutory manner of disclosure, detailing requirements for integral notes, unified policy presentation, and compliance protocols."
          />

          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-[15px] font-serif text-slate-800 dark:text-slate-250 leading-relaxed">
              To ensure proper understanding of financial statements, all significant accounting policies adopted in the preparation and presentation of financial statements should be disclosed. <PdfRef page={7} />
            </p>
          </div>
          
          {/* Audit compliance checklist */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden my-6 w-full">
            <div className="bg-slate-50 dark:bg-[#161f33] px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-205 uppercase tracking-widest font-mono">
                Audit Compliance Checklist — Manner of Disclosure
              </h4>
              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">
                Mandatory
              </span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-850 font-serif text-[13.5px]">
              <div className="p-4 sm:p-6 flex items-start gap-4 hover:bg-slate-50/20 dark:hover:bg-[#131a2c]/20">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-650 dark:text-emerald-400 flex items-center justify-center font-bold text-xs mt-1 select-none border border-emerald-200/50 dark:border-emerald-900/50">
                  ✓
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider block mb-1">Significant Policies Disclosure</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    All significant accounting policies adopted in the preparation and presentation of financial statements must be disclosed to ensure proper understanding. <PdfRef page={7} />
                  </p>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex items-start gap-4 hover:bg-slate-50/20 dark:hover:bg-[#131a2c]/20">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-650 dark:text-emerald-400 flex items-center justify-center font-bold text-xs mt-1 select-none border border-emerald-200/50 dark:border-emerald-900/50">
                  ✓
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider block mb-1">Form Part of Financial Statements</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    The disclosures must form an integral part of the financial statements. They are not supplementary or external notes, but core components of the accounts. <PdfRef page={7} />
                  </p>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex items-start gap-4 hover:bg-slate-50/20 dark:hover:bg-[#131a2c]/20">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-650 dark:text-emerald-400 flex items-center justify-center font-bold text-xs mt-1 select-none border border-emerald-200/50 dark:border-emerald-900/50">
                  ✓
                </span>
                <div>
                  <strong className="text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider block mb-1">Disclosed in One Place</strong>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    All disclosures should normally be presented together in a single place (Note 1 of the accounts) to facilitate reading and prevent scattered disclosures that could be overlooked. <PdfRef page={7} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 8: Disclosure of Changes in Accounting Policies */}
        <section id="as1-change-policy" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={8} 
            title="Disclosure of Changes in Accounting Policies" 
            description="Step-by-step disclosure workflow for changes in accounting policies, including current and future period material effects, non-ascertainability provisions, and the critical Paragraph 23 rule."
          />

          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-[15px] font-serif text-slate-800 dark:text-slate-250 leading-relaxed">
              Any change in the accounting policies which has a material effect in the current period or which is reasonably expected to have a material effect in a later period should be disclosed. <PdfRef page={7} />
            </p>
          </div>
          
          {/* Timeline steps */}
          <div className="space-y-6 my-8 pl-4 border-l-2 border-slate-100 dark:border-slate-800 w-full">
            <div className="relative pl-6">
              <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full border border-amber-600 bg-white dark:bg-[#0f1422]"></div>
              <span className="text-amber-700 dark:text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider">Step 1</span>
              <h4 className="font-serif font-bold text-[15.5px] text-slate-900 dark:text-white mt-0.5">Identify the Nature of the Change</h4>
              <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed mt-1 font-serif">Management must identify the specific accounting policy that has been changed (e.g., changing inventory cost formulas from FIFO to Weighted Average).</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full border border-amber-600 bg-white dark:bg-[#0f1422]"></div>
              <span className="text-amber-700 dark:text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider">Step 2</span>
              <h4 className="font-serif font-bold text-[15.5px] text-slate-900 dark:text-white mt-0.5">Justify the Change</h4>
              <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed mt-1 font-serif">Verify that the change falls under one of the three permissible criteria: (i) required by a statute, (ii) required for compliance with an accounting standard, or (iii) it will result in a more appropriate and fairer presentation.</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full border border-amber-600 bg-white dark:bg-[#0f1422]"></div>
              <span className="text-amber-700 dark:text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider">Step 3</span>
              <h4 className="font-serif font-bold text-[15.5px] text-slate-900 dark:text-white mt-0.5">Quantify the Current Financial Impact</h4>
              <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed mt-1 font-serif">Calculate and disclose the amount by which items in the financial statements are affected by such change in the current period, to the extent ascertainable.</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full border border-amber-600 bg-white dark:bg-[#0f1422]"></div>
              <span className="text-amber-700 dark:text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider">Step 4</span>
              <h4 className="font-serif font-bold text-[15.5px] text-slate-900 dark:text-white mt-0.5">Handle Non-Ascertainability</h4>
              <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed mt-1 font-serif">If the impact amount is not ascertainable (wholly or in part), state this fact explicitly in the notes, along with the reasons why it cannot be determined.</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full border border-amber-600 bg-white dark:bg-[#0f1422]"></div>
              <span className="text-amber-700 dark:text-amber-500 font-mono text-[10px] font-bold uppercase tracking-wider">Step 5</span>
              <h4 className="font-serif font-bold text-[15.5px] text-slate-900 dark:text-white mt-0.5">Disclose Expected Later-Period Effects</h4>
              <p className="text-[13.5px] text-slate-700 dark:text-slate-300 leading-relaxed mt-1 font-serif">If the change does not have a material impact in the current period but is expected to have a material impact in later periods, the fact of the change must be disclosed in the period of adoption.</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto font-serif text-[15px] text-slate-800 dark:text-slate-250 leading-relaxed">
            <p>
              A change in accounting policy is to be disclosed if the change is reasonably expected to have material effect in future accounting periods, even if the change has no material effect in the current accounting period. This requirement ensures that all important changes in accounting policies are actually disclosed. <PdfRef page={7} />
            </p>
          </div>
        </section>

        {/* Section 8A: Para 23 Rule */}
        <section id="as1-para23" className="scroll-mt-36 space-y-6 w-full">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-6">
            <div className="text-amber-700 dark:text-amber-500 font-serif italic text-sm tracking-wider mb-1 font-semibold uppercase">
              Sub-chapter 8A
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
              Para 23 Rule
            </h3>
          </div>
          
          <div className="border-2 border-red-650/40 dark:border-red-900/40 bg-red-50/10 dark:bg-red-950/5 p-6 rounded-lg my-8 w-full space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-mono text-[11px] font-bold uppercase tracking-widest">
              <Scale size={14} className="text-red-700 dark:text-red-400" />
              Critical Legal Precedent — Paragraph 23
            </div>
            <blockquote className="border-l-4 border-red-650 pl-4 py-1 italic font-serif text-[17px] text-slate-900 dark:text-slate-100 font-bold leading-relaxed">
              &quot;Disclosure of accounting policies or of changes therein cannot remedy a wrong or inappropriate treatment of an item in the accounts.&quot; <PdfRef page={5} />
            </blockquote>
            <p className="text-[13.5px] text-slate-705 dark:text-slate-300 leading-relaxed font-serif">
              Disclosure of a wrong treatment is not a substitute for correct accounting. If an incorrect policy has been followed (for example, expensing a capital asset or recognizing revenue prematurely), the auditor remains obligated to qualify the audit report for such non-compliance under Section 143(3) of the Companies Act, 2013, regardless of how clearly the wrong policy is described in the notes.
            </p>
          </div>
        </section>

        {/* Chapter 9: Statutory Footnotes & Scope Limits */}
        <section id="as1-footnotes" className="scroll-mt-36 space-y-6 w-full">
          <ChapterHeader 
            num={9} 
            title="Statutory Footnotes &amp; Scope Limits" 
            description="Regulatory footnotes, statutory compliance under the Companies Act 2013, ICAI guidelines, and limits on the materiality of standard application."
          />
          
          <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-lg w-full">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#161f33] border-b border-slate-200 dark:border-slate-850 font-mono">
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] w-1/12 text-center">Ref</th>
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] w-3/12">Statutory / Professional Source</th>
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] w-8/12">Detailed Notes &amp; Scope Limits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-855 font-serif text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[1]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Preface to Accounting Standards</td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    <strong>Materiality Scope:</strong> Accounting Standards apply only to items which are material. Immaterial items do not require explicit compliance or policy disclosure. The determination of materiality is a matter of professional judgment based on the size and nature of the item. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[2]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">Companies Act, 2013 Statutory Compliance</td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Section 129(1) of the Act mandates that financial statements must comply with accounting standards. Section 134(5) requires directors to certify that policies are consistent, reasonable, and prudent. Section 143(3)(e) requires auditors to report on compliance. Non-compliance must be reported in the Auditor's Report, including the financial impact of deviations. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[3]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">AS 11 &amp; Schedule III Requirement</td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    <strong>Foreign Currency Translation Policies:</strong> Under AS 11 and Schedule III requirements, companies must disclose translation policies in respect of foreign currency transactions and branches, detailing how exchange gains or losses are recognized. <PdfRef page={2} />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/40 dark:hover:bg-[#131a2c]/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400 dark:text-gray-500 text-center">[4]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white font-sans text-xs uppercase tracking-wider">ICAI &amp; NFRA Regulatory Drive</td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    <strong>Standards and Regulatory Drive to Reduce Diversity:</strong> Regulators and standard-setting bodies (such as the ICAI and NFRA) strive to reduce acceptable alternative accounting treatments to improve comparability. However, some diversity remains due to differences in business models and operating conditions. <PdfRef page={5} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
`;

const updatedContent = fileContent.substring(0, startIndex) + newFunctionContent + fileContent.substring(endIndex);
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully applied visual updates v3 to LearningPortalClient.tsx!');
