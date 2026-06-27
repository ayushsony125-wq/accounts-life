'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as18Sections = [
  { id: 'as-18-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-18-introduction', title: '4.1 INTRODUCTION' },
  { id: 'as-18-related-party-issue-why-disclosure', title: '4.2 RELATED PARTY ISSUE – WHY DISCLOSURE' },
  { id: 'as-18-related-party-relationships-as', title: '4.3 RELATED PARTY RELATIONSHIPS, AS' },
  { id: 'as-18-who-are-not-deemed-to-be-related', title: '4.4 WHO ARE NOT DEEMED TO BE RELATED' },
  { id: 'as-18-exemption-from-related-party', title: '4.5 EXEMPTION FROM RELATED PARTY' },
  { id: 'as-18-definitions-of-other-terms-used-in-as-18', title: '4.6 DEFINITIONS OF OTHER TERMS USED IN AS 18' },
  { id: 'as-18-disclosure-requirements-under-as-18', title: '4.7 DISCLOSURE REQUIREMENTS UNDER AS-18' },
  { id: 'as-18-list-of-related-party-transactions-', title: '4.8 LIST OF RELATED PARTY TRANSACTIONS,' }
];

interface AS18StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS18StandardTabContent({ navigateToPdfPage }: AS18StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-18-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-18-standard-sticky-toc');
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      let offset = 58;
      if (stickyToc) {
        const tocRect = stickyToc.getBoundingClientRect();
        offset = tocRect.bottom - containerRect.top;
      }
      container.scrollTo({
        top: targetRect.top - containerRect.top + container.scrollTop - offset - 12,
        behavior: 'auto'
      });
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const initObserver = () => {
      const scrollContainer = document.getElementById('as1-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 50);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: scrollContainer,
          rootMargin: '-90px 0px -60% 0px',
          threshold: 0
        }
      );

      as18Sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer?.observe(el);
      });
    };

    initObserver();
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const el = tocScrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (!activeSection || !tocScrollRef.current) return;
    const activeBtn = tocScrollRef.current.querySelector('[data-toc-id="' + activeSection + '"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeSection]);

  const PdfRef = ({ page }: { page: number }) => (
    <button
      onClick={() => navigateToPdfPage(page)}
      className="inline-flex items-center justify-center w-4 h-4 mx-0.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/40 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 rounded transition-all cursor-pointer select-none align-middle"
      title={"Open ICAI PDF — Page " + page}
    >
      <FileText size={10} className="shrink-0" />
    </button>
  );

  const SH = ({ id, num, title }: { id: string; num: string; title: string }) => {
    const cleanTitle = title.replace(/^\s*\d+(?:\.\d+)*\.?\s*/, '');
    return (
      <div id={id} className="scroll-mt-36 mb-6 mt-12 first:mt-2 w-full">
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-[20px] sm:text-[22px] font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight flex items-baseline gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold mr-1 select-none">{num}.</span>
            <span>{cleanTitle}</span>
          </h2>
        </div>
        <div className="h-[1.5px] w-full bg-slate-200/80 dark:bg-slate-800/80 mb-3" />
      </div>
    );
  };

  const NB = ({ type, title, children }: { type: 'info' | 'warning' | 'success' | 'exam'; title?: string; children: React.ReactNode }) => {
    const styles = {
      info:    'bg-blue-50/80 dark:bg-blue-955/20 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200 border-l-4 border-l-blue-500',
      warning: 'bg-amber-50/80 dark:bg-amber-955/20 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 border-l-4 border-l-amber-500',
      success: 'bg-emerald-50/80 dark:bg-emerald-955/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 border-l-4 border-l-emerald-500',
      exam:    'bg-rose-50/80 dark:bg-rose-955/20 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 border-l-4 border-l-rose-500',
    };
    return (
      <div className={'rounded-xl border p-5 my-5 ' + styles[type]}>
        {title && <p className="font-extrabold uppercase tracking-wider text-[10.5px] mb-2 opacity-75">{title}</p>}
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      </div>
    );
  };

  return (
    <div className="w-full animate-fade-in font-sans bg-[#F5F5F3] dark:bg-[#0B0F19] pb-8">
      <div id="as-18-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as18Sections.map(sec => (
              <button key={sec.id} data-toc-id={sec.id} onClick={() => handleSectionClick(sec.id)}
                className={'text-[9.5px] font-bold px-2 py-0.5 rounded border transition-all whitespace-nowrap cursor-pointer ' + (activeSection === sec.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-[#1E2640] dark:hover:bg-slate-800 border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-300')}>
                {sec.title.split('. ').slice(1).join('. ') || sec.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-[98%] max-w-[1720px] bg-white dark:bg-[#111726] shadow-sm border border-slate-200/70 dark:border-slate-800 rounded-xl px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8 relative my-4">
        {/* Section: 1. Introduction & Objectives */}
        <section id="as-18-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ❑ UNIT 4: ACCOUNTING STANDARD 18 RELATED PARTY DISCLOSURES After studying this unit, you will be able to comprehend the – • Need for disclosure of related party relationship; • How to identify the related party relationships; • Which parties are not treated as related party; • Exemption from Related Party Disclosure in certain situations; • Disclosure requirements under AS-18. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.1 INTRODUCTION */}
        <section id="as-18-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-introduction" num="4.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 18</strong> prescribes the requirements for disclosure of related party relationship and transactions between the reporting enterprise and its related parties. The requirements of the standard apply to the financial statements of each reporting enterprise as also to consolidated financial statements presented by a holding company. <PdfRef page={1} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.2 RELATED PARTY ISSUE – WHY DISCLOSURE */}
        <section id="as-18-related-party-issue-why-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-related-party-issue-why-disclosure" num="4.2" title="RELATED PARTY ISSUE – WHY DISCLOSURE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            IS NEEDED? Related party relationships are a normal feature of commerce and business. There is a general presumption that transactions reflected in financial statements are consummated on an arm’s-length basis between independent parties. However, that presumption may not be valid when related party relationships exist because related parties may enter into transactions which unrelated parties would not enter into. <PdfRef page={1} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Also, transactions between related parties may not be effected at the same terms and conditions as between unrelated parties. Sometimes, no price is charged in related party transactions, for example, free provision of management services and the extension of free credit on a debt. Also, sometimes the operating results and financial position of an enterprise may be affected by a related party relationship even if related party transactions do not occur. The mere existence of the relationship may be sufficient to affect the transactions of the reporting enterprise with other parties. For example, a subsidiary may terminate relations with a trading partner on acquisition by the holding company of a fellow subsidiary engaged in the same trade as the former partner. Alternatively, one party may refrain from acting because of the control or significant influence of another - for example, a subsidiary may be instructed by its holding company not to engage in research and development. Likewise, in certain cases transactions would not have taken place if the related party relationship had not existed. For example, a company that sold a large proportion of its production to its holding company at cost might not have found an alternative customer if the holding company had not purchased the goods. In view of the aforesaid, the resulting accounting measures may not represent what they usually would be expected to represent. Thus, a related party relationship could have an effect on the financial position and operating results of the reporting enterprise. <PdfRef page={2} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.3 RELATED PARTY RELATIONSHIPS, AS */}
        <section id="as-18-related-party-relationships-as" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-related-party-relationships-as" num="4.3" title="RELATED PARTY RELATIONSHIPS, AS" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            CONTEMPLATED UNDER AS-18 Related Party - As per AS-18, parties are considered to be related if at any time during the reporting period one party has the ability to control the other party or exercise significant influence over the other party in making financial and/or operating decisions. It is worthwhile to note that AS-18 provides a definitive list of related party relationships to which AS-18 applies. Accordingly, <strong>AS 18</strong> deals only with the following five types of related party relationships described in (a) to (e) below: <PdfRef page={2} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            (a) Enterprises that directly, or indirectly through one or more intermediaries, control, or are controlled by, or are under common control with, the reporting enterprise (this includes holding companies, subsidiaries and fellow subsidiaries). Note: This is the case when there is a parent-subsidiary relationship (including relationship among fellow subsidiaries), as illustrated later in this chapter. For meaning of the term control, refer to subsequent discussion under this chapter. (b) Associates and joint ventures of the reporting enterprise and the investing party or venturer in respect of which the reporting enterprise is an associate or a joint venture. (c) Individuals owning, directly or indirectly, an interest in the voting power of the reporting enterprise that gives them control or significant influence over the enterprise, and relatives of any such individual. (d) Key management personnel and relatives of such personnel; and (e) Enterprises over which any person described in (c) or (d) is able to exercise significant influence. This includes enterprises owned by directors or major shareholders of the reporting enterprise and enterprises that have a member of key management in common with the reporting enterprise. <PdfRef page={3} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.4 WHO ARE NOT DEEMED TO BE RELATED */}
        <section id="as-18-who-are-not-deemed-to-be-related" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-who-are-not-deemed-to-be-related" num="4.4" title="WHO ARE NOT DEEMED TO BE RELATED" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PARTIES UNDER AS-18? In the context of <strong>AS 18</strong>, the following are deemed not to be related parties: (a) Two companies are not related parties simply because they have a director in common (unless the director is able to affect the policies of both companies in their mutual dealings). Accordingly, if the common director is able to influence the policies of both the companies in their mutual dealings – then related party relationship exists. (b) A single customer, supplier, franchiser, distributor, or general agent with whom an enterprise transacts a significant volume of business merely by virtue of the resulting economic dependence; and <PdfRef page={3} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED (c) The parties listed below, in the course of their normal dealings with an enterprise by virtue only of those dealings (although they may circumscribe the freedom of action of the enterprise or participate in its decision-making process): (i) Providers of finance (ii) Trade unions (iii) Public utilities (iv) Government departments and government agencies including government sponsored bodies <PdfRef page={4} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.5 EXEMPTION FROM RELATED PARTY */}
        <section id="as-18-exemption-from-related-party" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-exemption-from-related-party" num="4.5" title="EXEMPTION FROM RELATED PARTY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            DISCLOSURE IN CERTAIN SITUATIONS 1. Conflict with the reporting enterprise’s duties of confidentiality: Related party disclosure requirements as laid down in <strong>AS 18</strong> do not apply in circumstances where providing such disclosures would conflict with the reporting enterprise’s duties of confidentiality as specifically required in terms of a statute or by any regulator or similar competent authority. Put differently, in cases where a statute or a regulator or a similar competent authority governing an enterprise prohibit the enterprise to disclose certain information which is required to be disclosed as per this Standard, disclosure of such information is not warranted. For example, banks are obliged by law to maintain confidentiality in respect of their customers’ transactions and this Standard would not override the obligation to preserve the confidentiality of customers’ dealings. 2. Consolidated financial statements: No disclosure is required in consolidated financial statements in respect of intra-group transactions - since disclosure of transactions between members of a group is unnecessary in consolidated financial statements. This is mainly because consolidated financial statements present information about the holding and its subsidiaries as a single reporting enterprise. 3. State-controlled enterprises: No disclosure is required in the financial <PdfRef page={4} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            statements of state-controlled enterprises as regards related party relationships with other state-controlled enterprises and transactions with such enterprises. <PdfRef page={5} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.6 DEFINITIONS OF OTHER TERMS USED IN AS 18 */}
        <section id="as-18-definitions-of-other-terms-used-in-as-18" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-definitions-of-other-terms-used-in-as-18" num="4.6" title="DEFINITIONS OF OTHER TERMS USED IN AS 18" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Related party transaction:AS-18 defines related party transaction as, “A transfer of resources or obligations between related parties, regardless of whether or not a price is charged”. Control: As per AS-18 Control means: (a) ownership, directly or indirectly, of more than one half of the voting power of an enterprise, or (b) control of the composition of the board of directors in the case of a company or of the composition of the corresponding governing body in case of any other enterprise, or (c) a substantial interest in voting power and the power to direct, by statute or agreement, the financial and/or operating policies of the enterprise. It is pertinent to note that the above definition of control under AS-18 is relatively wider than that under AS-21 Consolidated Financial Statements. This is so because - clause (c) in the definition of control under AS-18 is an addition, which is not found in AS-21 Consolidated Financial Statements. Also, AS-18 clarifies that for the purpose of <strong>AS 18</strong>, an enterprise is considered to control the composition of the board of directors of a company or governing body of an enterprise, if it has the power, without the consent or concurrence of any other person, to appoint or remove all or a majority of directors/members of the governing body of that company/enterprise. Put differently, control to the composition of the Board of directors is determined with reference to the authority of an enterprise to appoint or remove all or majority of directors of another enterprise without concurrence of any other person. Further, an enterprise is deemed to have the power to appoint a director/ member of the governing body, if any of the following conditions is satisfied: (a) A person cannot be appointed as director/member of the governing body <PdfRef page={5} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED without the exercise in his favour by that enterprise of such a power as aforesaid or (b) A person’s appointment as director/member of the governing body follows necessarily from his appointment to a position held by him in that enterprise or (c) The director/member of the governing body is nominated by that enterprise; in case that enterprise is a company, the director is nominated by that company/subsidiary thereof. An enterprise is considered to have a substantial interest in another enterprise if that enterprise owns, directly or indirectly, 20% or more interest in the voting power of the other enterprise. Similarly, an individual is considered to have a substantial interest in an enterprise, if that individual owns, directly or indirectly, 20 per cent or more interest in the voting power of the enterprise. Associate: AS-18 defines an Associate as an enterprise in which an investing reporting party has significant influence and which is neither a subsidiary nor a joint venture of that party. Therefore, an associate should not be a subsidiary neither a joint venture of that investing reporting enterprise. And, the term Significant influence is defined by AS-18 as “Participation in the financial and/or operating policy decisions of an enterprise, but not control of those policies”. Further,AS-18 clarifies that significant influence may be exercised in several ways, for example, (1) by representation on the board of directors;, (2) participation in the policy making process; (3) material inter-company transactions, (4) interchange of managerial personnel or (5) dependence on technical information. Significant influence may be gained by share ownership, statute or agreement. As regards share ownership, if an investing party holds, directly or indirectly through intermediaries, 20 per cent or more of the voting power of the enterprise, it is presumed that the investing party has significant influence, unless it can be clearly demonstrated that this is not the case. Conversely, if the investing party holds, directly or indirectly through intermediaries, less than 20% of the voting power of the enterprise, it is presumed that the investing party does not have significant influence, unless such influence can be clearly demonstrated. A substantial or <PdfRef page={6} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            majority ownership by another investing party does not necessarily preclude an investing party from having significant influence. Key Management Personnel: As per AS-18, Key Management Personnel are those persons who have the authority and responsibility for planning, directing and controlling the activities of the reporting enterprise. For example, in the case of a company, (1) the managing director(s), (2) whole time director(s), (3) manager and (4) any person in accordance with whose directions or instructions the board of directors of the company is accustomed to act, are usually considered key management personnel. AS-18 further provides an explanation that a non-executive director of a company -is not considered as a key management person under this Standard by virtue of merely his being a director unless he has the authority and responsibility for planning, directing and controlling the activities of the reporting enterprise. The requirements of <strong>AS 18</strong> should not be applied in respect of a non-executive director even if he participates in the financial and/or operating policy decision of the enterprise, unless he falls in any of the categories of ‘related party relationships’ discussed above. Relative: As per AS-18, a Relative in relation to an individual, means the spouse, son, daughter, brother, sister, father and mother who may be expected to influence, or be influenced by, that individual in his/her dealings with the reporting enterprise. Joint Venture - AS-18 defines a Joint Venture as a contractual arrangement whereby two or more parties undertake an economic activity which is subject to joint control. Joint Control–AS-18 defines a Joint Control as the contractually agreed sharing of power to govern the financial and operating policies of an economic activity so as to obtain benefits from it. Accordingly, when two or more parties contractually agree to share power to govern the financial and operating policies of an economic activity, this contractual agreement is termed as joint control. It is pertinent to note that joint venture does not depend upon voting power of the parties involved. Rather, it is linked to the ability to exercise joint control over an economic activity. <PdfRef page={7} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Holding Company–AS-18 defines Holding Company as a company having one or more subsidiaries Subsidiary <strong>AS 18</strong> defines a Subsidiary – as a company: (a) in which another company (the holding company) holds, either by itself and/or through one or more subsidiaries, more than one-half, in nominal value of its equity share capital; or (b) of which another company (the holding company) controls, either by itself and/or through one or more subsidiaries, the composition of its board of directors. Fellow Subsidiary–AS-18 clarifies that a company is considered to be a fellow subsidiary of another company if both are subsidiaries of the same holding company. Illustration 1 Identify the related parties in the following case as per <strong>AS 18</strong>: A Ltd. holds 51% of B Ltd. B Ltd holds 51% of O Ltd. Z Ltd holds 49% of O Ltd. Solution In relation to Reporting enterprise - A Ltd. • B Ltd. (subsidiary) is a related party • O Ltd.(subsidiary) is a related party In relation to Reporting enterprise - B Ltd. • A Ltd. (holding company) is a related party • O Ltd. (subsidiary) is a related party In relation to Reporting enterprise - O Ltd. • A Ltd. (ultimate holding company) is a related party • B Ltd. (holding company) is a related party • <PdfRef page={8} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>Z Ltd. (investor/ investing party) is a related party (O Ltd being Associate of Z Ltd) Reporting enterprise - Z Ltd. • O Ltd. (Associate) is a related party Illustration 2 Consider a scenario wherein: • A Ltd. has 60% voting right in B Ltd. • A Ltd. also has 22% voting right in C Ltd.; and • B Ltd. has 30% voting right in C Ltd. Whether C Ltd. is to be treated under AS-18 as a party related to A Ltd.? Solution Yes – in relation to A Ltd. (the reporting enterprise), C Ltd. is a related party under AS-18. This is because A Ltd. indirectly controls C Ltd. In this case, A Ltd. (together with its subsidiary B Ltd.) controls more than one half of the voting rights of C Ltd. Illustration 3 Consider a scenario wherein: • X Ltd. holds 28% voting right in Y Ltd. (and hence Y Ltd. is an associate of X Ltd.) • Y Ltd. holds 32% voting right in Z Ltd. (and hence Z Ltd. is an associate of Y Ltd.) X Ltd. Y Ltd. Z Ltd. 28 % Voting rights 32 % Voting rights</li>
          </ul>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED In the above case, since Y Ltd. is an associate of X Ltd. – Y Ltd. is a related party to X Ltd. Likewise, since Z Ltd. is an associate of Y Ltd. - Z Ltd. is a related party to Y Ltd. The question is: Whether Z Ltd. is to be treated under AS-18 as a party related to X Ltd.? Solution No – in relation to X Ltd. (the reporting enterprise), Z Ltd. is a not a related party. This is because as per the requirements of AS-18, ‘associate of an associate’ is not a related party. Illustration 4 Consider the following organization structure related to P Ltd. Given the above structure: Identify related party relationships, if R Ltd. is the reporting enterprise Solution The following table identifies the related party relationships for R Ltd. (being the reporting enterprise): Q Ltd. R Ltd. S Ltd. X Ltd. Y Ltd. P Ltd. 80% Shares 60% Shares 80% Shares 65% Shares 70% Shares <PdfRef page={10} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Party Name Relationship under AS-18 P Ltd. • P Ltd. has indirect control on R Ltd. (through Q Ltd.) • Hence R Ltd. is related to P Ltd. Q Ltd. • Q Ltd. has direct control of R Ltd. • Hence R Ltd. is related to Q Ltd. S Ltd. • R Ltd. and S Ltd. are under common control of Q Ltd. • Hence R Ltd. is related to S Ltd. X Ltd. • X Ltd. is controlled by R Ltd. • Hence R Ltd. is related to X Ltd. Y Ltd. • Y Ltd. is the sub-subsidiary of Q Ltd. • Both R Ltd. and Y Ltd. are under common control of Q Ltd. • Hence R Ltd. is related to Y Ltd. Illustration 5 Consider the following organization structure related to UH Ltd. (the ultimate parent company of a Group), wherein UH Ltd. has made the following investments: • Investment in two of the wholly owned subsidiaries, viz. Sub 1 and Sub 2 • Investment in JC 1, in which UH Ltd. has a joint control • 20% investment in Ass 1 (and hence, Ass 1 is an associate of UH Ltd.) Given the above structure: Identify related party relationships for each of the above entities under AS-18. UH Ltd Sub 1 Sub 2 JC 1 Ass 1 100% 100% Joint Control Associate 28% <PdfRef page={11} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Solution The following table identifies the related party relationships for each of the entities in the Group: Reporting enterprise Related Party as per AS-18 UH Ltd. All the four entities (viz. Sub 1, Sub 2, JC 1 and Ass 1) Sub 1 Only two of the entities in the Group (viz. UH Ltd. and Sub 2) Sub 2 Only two of the entities in the Group (viz. UH Ltd. and Sub 1) JC 1 Only UH Ltd. Ass 1 Only UH Ltd. Illustration 6 Consider a scenario wherein: ▪ Mr. Robert holds 70% shares and voting rights in P Ltd Determine: Whether Andy (spouse of Mr. Robert) is a related party to P Ltd. under AS-18? P Ltd. Mr. Robert 70% Shares and, has control Mrs. Andy (Spouse of Mr. Robert) Are they related? <PdfRef page={12} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Solution Yes – Andy is a related party to P Ltd., in view of the requirements of AS-18. It may be recalled that under AS-18 ‘relatives of individuals owning an interest in the voting power of the reporting enterprise that gives them control or significant influence over the enterprise’ are considered as related parties. Illustration 7 Consider a scenario wherein: • Mr. Robert is a Managing Director of P Ltd. • Andy (spouse of Robert) received a remuneration of Rs 5 lacs from P Ltd. – for the services she rendered to P Ltd. for the period 1st April 20X1 through 30th June 20X1 • Andy left the services of P Ltd. on 1st July 20X1 • Consider 31st March 20X2 as the year-end date for P Ltd. MD 30th June 20X1 Year - end 31st March 20X2 P Ltd. Mr. Robert Received remuneration of ` 5 lacs Mrs. Andy (Spouse of Mr. Robert) 1st April 20X1 Mrs. Andy left on 1st July 20X1 <PdfRef page={13} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Whether Andy is to be identified as related party at the year-end date (31st March 20X2) for the purposes of AS-18? Solution Yes – This is because as per AS-18, parties are considered to be related if at any time during the reporting period one party has the ability to control the other party or exercise significant influence over the other party in making financial and/or operating decisions. Hence Andy (being the spouse and relative of the KMP of P Ltd.) needs to be reported as related party at the year-end date (i.e. 31st March 20X2). This is because the remuneration Andy received from P Ltd. (for the period April 20X1 to 30 June 20X1) falls within the reporting year April 20X1 to March 20X2. Illustration 8 Consider a scenario wherein: • UK Bank holds 23% equity shares with voting rights in P Ltd. • The bank has provided a loan of Rs. 20 million to P Ltd. at market interest rate • As per the terms and conditions of the loan agreement, the bank has appointed one person as its nominee to the board of directors of P Ltd. and any major transaction to be entered into by P Ltd. will require the consent of the Bank P Ltd. UK Bank BANK Holds 23% Shares with voting rights Provided loan of ` 20 Million @ market rates Hence has power to nominate 1 member to BoDs <PdfRef page={14} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Determine: Whether under AS-18 - UK Bank is a related party to P Ltd. (the reporting enterprise)? Solution In the instant case, the UK Bank holds 23% shares with voting rights in P Ltd. and hence is deemed to exercise significant influence over P Ltd. The bank is also a provider of finance to P Ltd. (the reporting enterprise) and as per AS-18, parties like providers of finance are deemed not to be considered as a related party in the course of normal dealings with an enterprise by virtue only of those dealings. However, this exemption will not be available to UK Bank in this case – since it exercises significant influence over P Ltd. (by virtue of holding 23% shares with voting rights in P Ltd.) Accordingly, for P Ltd. (the reporting enterprise), the UK Bank is a related party and it will be required to disclose the transactions with UK Bank in its financial statements. <PdfRef page={15} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.7 DISCLOSURE REQUIREMENTS UNDER AS-18 */}
        <section id="as-18-disclosure-requirements-under-as-18" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-disclosure-requirements-under-as-18" num="4.7" title="DISCLOSURE REQUIREMENTS UNDER AS-18" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            At the outset, it is to be noted that AS-18 prescribe related party disclosure requirements. (a) name of the related party and (b) nature of the related party relationship where control exists should be disclosed - irrespective of whether or not there have been transactions between the related parties. This is to enable users of financial statements to form a view about the effects of related party relationships on the enterprise. If there have been transactions between related parties, during the existence of a related party relationship, the reporting enterprise should disclose the following: (i) The name of the transacting related party; (ii) A description of the relationship between the parties; (iii) A description of the nature of transactions; (iv) Volume of the transactions either as an amount or as an appropriate proportion; <PdfRef page={15} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED (v) Any other elements of the related party transactions necessary for an understanding of the financial statements; (vi) The amounts or appropriate proportions of outstanding items pertaining to related parties at the balance sheet date and provisions for doubtful debts due from such parties at that date; (vii) Amounts written off or written back in the period in respect of debts due from or to related parties. Items of a similar nature may be disclosed in aggregate by type of related party except when separate disclosure is necessary for an understanding of the effects of related party transactions on the financial statements of the reporting enterprise. Remuneration paid to key management personnel should be considered as a related party transaction requiring disclosures. In case non-executive directors on the Board of Directors are not related parties, remuneration paid to them should not be considered a related party transaction. <PdfRef page={16} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>

        {/* Section: 4.8 LIST OF RELATED PARTY TRANSACTIONS, */}
        <section id="as-18-list-of-related-party-transactions-" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-18-list-of-related-party-transactions-" num="4.8" title="LIST OF RELATED PARTY TRANSACTIONS," />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            TO BE DISCLOSED (WHAT NEEDS TO BE DISCLOSED?) AS-18 gives following examples of related party transactions, in respect of which disclosures may be made by a reporting enterprise: 1. purchases or sales of goods (finished or unfinished) 2. purchases or sales of fixed assets 3. rendering or receiving of services 4. agency arrangements 5. leasing or hire purchase arrangements 6. transfer of research and development 7. licence agreements 8. finance (including loans and equity contributions in cash or in kind) 9. guarantees and collaterals 10. management controls including for deputation of employees. <PdfRef page={16} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            Illustration 9 Consider a scenario wherein: • P Ltd. hold 22% shares and voting rights in Q Ltd. (and hence Q Ltd. is an associate of P Ltd.) • On 1st April 20X1, P Ltd. sold certain goods to Q Ltd. amounting to Rs. 5 lacs • On 30th June 20X1, P Ltd. sold its entire 22% stake in Q Ltd. (and hence the related party relationship ceased to exist after 30th June 20X1) • However, P Ltd. continued supply goods to Q Ltd. subsequent to 30th June 20X1 (just like any other customer) and sold goods worth Rs. 15 lacs during 9-month period ended 31st March 20X2 • Consider 31st March 20X2 as the year-end date for P Ltd. Goods worth ` 15 lacs sold Goods sold ` 5 lacs P Ltd. 22% shares and voting rights Goods sold on 1st April 20X1 amounting to ` 5 lacs Q Ltd. Sold entire 22% shareholding 1st April 20X1 30th June 20X1 Year end 31st March 20X2 <PdfRef page={17} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED Determine whether the transaction for the entire year (ending on 31st March 20X2) is required to be disclosed under AS-18 as related party transaction. Solution No – This is because as per AS-18, the disclosure requirements under the Standard relate only to the period during related party relationship existed. Accordingly, only transactions between P Ltd and Q Ltd till 30th June 20X1 (being sale of goods worth Rs. 5 lacs) are required to be reported / disclosed under AS- 18. Transactions entered into after 30th June 20X1 are NOT required to be disclosed under AS-18. Illustration 10 Narmada Ltd. sold goods for ` 90 lakhs to Ganga Ltd. during financial year ended 31-3-20X1. The Managing Director of Narmada Ltd. owns 100% shares of Ganga Ltd. The sales were made to Ganga Ltd. at normal selling prices by Narmada Ltd. The Chief accountant of Narmada Ltd contends that these sales need not require a different treatment from the other sales made by the company and hence no disclosure is necessary as per the accounting standard. Is the Chief Accountant correct? Solution As per <strong>AS 18</strong> ‘Related Party <strong>Disclosures</strong>’, Enterprises over which a key management personnel is able to exercise significant influence are related parties. This includes enterprises owned by directors or major shareholders of the reporting enterprise and enterprise that have a member of key management in common with the reporting enterprise. In the given case, Narmada Ltd. and Ganga Ltd are related parties and hence disclosure of transaction between them is required irrespective of whether the transaction was done at normal selling price. Hence the contention of Chief Accountant of Narmada Ltd is wrong. <PdfRef page={18} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            TEST YOUR KNOWLEDGE Multiple Choice Questions 1. According to AS-18 Related Party <strong>Disclosures</strong>, which ONE of the following is not a related party of Skyline Limited? (a) A shareholder of Skyline Limited owning 30% of the ordinary share capital (b) An entity providing banking facilities to Skyline Limited in the normal course of business (c) An associate of Skyline Limited (d) Key management personnel of Skyline Limited 2. Are the following statements in relation to related parties true or false, according to AS-18 Related Party <strong>Disclosures</strong>? (A) A party is related to another entity that it is jointly controlled by. (B) A party is related to another entity that it controls. Statement (A) Statement (B) (a) False False (b) False True (c) True False (d) True True 3. Which of the following is not a related party as envisaged by AS-18 Related Party <strong>Disclosures</strong>? (a) A director of the entity (b) The parent company of the entity (c) A shareholder of the entity that holds 1% stake in the entity (d) The spouse of the managing director of the entity <PdfRef page={19} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED 4. According to AS-18 Related Party <strong>Disclosures</strong>, related party transaction is a transfer of resources or obligations between related parties – provided a price is charged for such transfer. (a) True (b) False 5. According to AS-18 Related Party <strong>Disclosures</strong>, parties are considered to be related, if and only if at the end of the reporting period - one party has the ability to control the other party or exercise significant influence over the other party in making financial and/or operating decisions. (a) True (b) False Theoretical Questions 6 Who are related parties under <strong>AS 18</strong>? What are the related party disclosure requirements? 7 ABC Limited is in the business of manufacturing textiles. It has certain commercial contracts with its customers and those customer contracts carry various clauses, imposing restriction on ABC Limited for disclosure of certain information. Accordingly, the company doesn’t intend to provide related party disclosure under AS-18 in its ensuing financial statements. Is this correct? 8 Should the related parties be identified as at the reporting date (i.e. balance sheet date) for the purposes of AS-18? In disclosing transactions with related parties, are the transactions of the entire reporting period to be disclosed or only those for the period during which related party relationship exists? Scenario based Question 9. Mr. Raj, a relative of key management personnel, received remuneration of ` 2,50,000 for his services in the company for the period from.20X1 to.20X1. On.20X1, he left the service of the company. Should the relative be identified as at the closing date i.e. on.20X2 for the purposes of <strong>AS 18</strong>? <PdfRef page={20} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            10. X Ltd. sold goods to its associate company during the 1st quarter ended.20X1. After that, the related party relationship ceased to exist. However, goods were supplied as were supplied to any other ordinary customer. Decide whether transactions of the entire year have to be disclosed as related party transaction. 11. You are required to identify the related parties in the following cases as per <strong>AS 18</strong>: M Ltd. holds 61 % shares of S Ltd. S Ltd. holds 51 % shares of F Ltd. C Ltd. holds 49% shares of F Ltd. (Give your answer - Reporting Entity wise for M Ltd., S Ltd., C Ltd. and F Ltd.) ANSWERS/HINTS Answers to the Multiple Choice Questions 1. (b) 2. (d) 3. (c) 4. (b) 5. (b) Answers to the Theoretical Questions 6. Parties are considered to be related if at any time during the reporting period one party has the ability to control the other party or exercise significant influence over the other party in making financial and/or operating decisions. If there have been transactions between related parties, during the existence of a related party relationship, the reporting enterprise should disclose the following: (i) The name of the transacting related party; (ii) A description of the relationship between the parties; (iii) A description of the nature of transactions; (iv) Volume of the transactions either as an amount or as an appropriate proportion; (v) Any other elements of the related party transactions necessary for an understanding of the financial statements; <PdfRef page={21} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            PRESENTATION &amp; DISCLOSURES BASED (vi) The amounts or appropriate proportions of outstanding items pertaining to related parties at the balance sheet date and provisions for doubtful debts due from such parties at that date; (vii) Amounts written off or written back in the period in respect of debts due from or to related parties. 7. As per AS-18 stipulate that related party disclosure requirements under AS- 18 do not apply in circumstances, where providing such disclosures would conflict with the reporting enterprise&apos;s duties of confidentiality, as specifically required in terms of a statute or by any regulator or similar competent authority. In case, where (1) a statute or (2) a regulator or (3) a similar competent authority governing an enterprise prohibit the enterprise to disclose certain information, which is required to be disclosed as per <strong>AS 18</strong>, disclosure of such information is not warranted. For example, banks are obliged by law to maintain confidentiality in respect of their customers&apos; transactions and AS-18 would not override the obligation to preserve the confidentiality of customers&apos; dealings. However, this exemption is not available in respect of confidentiality provisions in a commercial contract between two enterprises - where confidentiality is not specifically required in terms of (1) a statute or (2) by any regulator or (3) similar competent authority. Therefore, in the given case AS-18 related party disclosures would have to be made by ABC Limited in its ensuing financial statements. 8. As per the definition of related parties in AS-18, the existence of a related party relationship should be identified at all points during the year (and not only at the close of the financial year). However, <strong>AS 18</strong> requires disclosure of transactions with these parties only during the existence of the related party relationship. Answers to the Scenario based Question 9. According to <strong>AS 18</strong> on ‘Related Party <strong>Disclosures</strong>’, parties are considered to be related if at any time during the reporting period one party has the ability to control the other party or exercise significant influence over the other party in making financial and/or operating decisions. Hence Mr. Raj, a relative of <PdfRef page={22} />
          </p>
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            key management personnel, should be identified as related party for disclosure in the financial statements for the year ended.20X2. 10. As per <strong>AS 18</strong>, transactions of X Ltd. with its associate company for the first quarter ending.20X1 only are required to be disclosed as related party transactions. The transactions for the period in which related party relationship did not exist would not be reported. 11. Reporting Entity Related Party M Ltd. S Ltd. (subsidiary) F Ltd.(subsidiary) S Ltd. M Ltd. (holding company) F Ltd. (subsidiary) F Ltd. M Ltd. (ultimate holding company) S Ltd. (holding company) C Ltd. (investor/ investing party) C Ltd. F Ltd. (associate) <PdfRef page={23} />
          </p>
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 18**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 18, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
              </p>
            </div>
            <div className="p-5 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Statutory Auditor Note
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Verify the logical consistency of accounting selections. Confirm that the methods adopted match industry practices and are consistently applied year-over-year. Any change in policy must be evaluated for proper P&amp;L adjustment and disclosure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
