'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FileText, ChevronDown } from 'lucide-react'

export const as23Sections = [
  { id: 'as-23-intro-sec', title: '1. Introduction & Objectives' },
  { id: 'as-23-introduction', title: '2.1 INTRODUCTION' },
  { id: 'as-23-objective', title: '2.2 OBJECTIVE' },
  { id: 'as-23-definitions-of-the-terms-used-in-the', title: '2.3 DEFINITIONS OF THE TERMS USED IN THE' },
  { id: 'as-23-associates-accounted-for-using-the', title: '2.4 ASSOCIATES ACCOUNTED FOR USING THE' },
  { id: 'as-23-circumstances-under-which-equity', title: '2.5 CIRCUMSTANCES UNDER WHICH EQUITY' },
  { id: 'as-23-application-of-the-equity-method', title: '2.6 APPLICATION OF THE EQUITY METHOD' },
  { id: 'as-23-contingencies', title: '2.7 CONTINGENCIES' },
  { id: 'as-23-why-is-equity-method-of-accounting', title: '2.8 WHY IS EQUITY METHOD OF ACCOUNTING' },
  { id: 'as-23-disclosure', title: '2.9 DISCLOSURE' },
  { id: 'as-23-relevant-explanations-to-as-23', title: '2.10 RELEVANT EXPLANATIONS TO AS 23' }
];

interface AS23StandardTabContentProps {
  navigateToPdfPage: (page: number) => void;
  renderTextWithReferences?: (text: string) => string | React.ReactNode;
}

export function AS23StandardTabContent({ navigateToPdfPage }: AS23StandardTabContentProps) {
  const [activeSection, setActiveSection] = useState('as-23-intro-sec');
  const tocScrollRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const container = document.getElementById('as1-scroll-container');
    const target = document.getElementById(id);
    const stickyToc = document.getElementById('as-23-standard-sticky-toc');
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

      as23Sections.forEach((sec) => {
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
      <div id="as-23-standard-sticky-toc" className="sticky top-[58px] bg-white dark:bg-[#111726] border-b border-slate-200 dark:border-slate-800 z-20 w-full select-none shadow-sm">
        <div className="max-w-[1720px] mx-auto w-[98%] px-3 sm:px-5 lg:px-8 py-2">
          <div ref={tocScrollRef} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', whiteSpace: 'nowrap', gap: '4px' }} className="items-center overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
            {as23Sections.map(sec => (
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
        <section id="as-23-intro-sec" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-intro-sec" num="1" title="1. Introduction &amp; Objectives" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 1 --- UNIT 2: ACCOUNTING STANDARD 23 ACCOUNTING FOR INVESTMENTS IN ASSOCIATES IN CONSOLIDATED FINANCIAL STATEMENTS After studying this unit, you will be able to: ♦ Define the terms ‘Associates’, ‘Significant influence’, ‘Control’, ‘Equity method’ and other related terms used in the standard. ♦ Examine the circumstances under which the Equity Method is used. ♦ Apply the Equity Method in the accounting of investments in the associates. ♦ Disclose the contingences in the consolidated financial statements. ♦ Comply with other disclosure requirements as stated in the standard.</li>
          </ul>
          
        </section>

        {/* Section: 2.1 INTRODUCTION */}
        <section id="as-23-introduction" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-introduction" num="2.1" title="INTRODUCTION" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            <strong>AS 23</strong>, came into effect in respect of accounting periods commenced on or after 1-4-2002. <strong>AS 23</strong> describes the principles and procedures for recognizing investments in associates (in which the investor has significant influence, but not a subsidiary or joint venture of investor) in the consolidated financial statements of the investor. An investor which presents consolidated financial statements should account for investments in associates as per equity method in accordance with this standard but in its separate financial statements, <strong>AS 13</strong> will be applicable. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 2.2 OBJECTIVE */}
        <section id="as-23-objective" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-objective" num="2.2" title="OBJECTIVE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            The objective of this Standard is to lay down principles and procedures for recognizing the investments in associates and its effect on the financial operations of the group in the consolidated financial statements. Reference to <strong>AS 23</strong> is compulsory for the companies following <strong>AS 21</strong> and preparing consolidated <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 2 --- FINANCIAL STATEMENTS financial statement for their group. For disclosing investment in associates in the separate financial statement of the investor itself, one should follow AS 13.</li>
          </ul>
          
        </section>

        {/* Section: 2.3 DEFINITIONS OF THE TERMS USED IN THE */}
        <section id="as-23-definitions-of-the-terms-used-in-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-definitions-of-the-terms-used-in-the" num="2.3" title="DEFINITIONS OF THE TERMS USED IN THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ACCOUNTING STANDARD 1. A subsidiary is an enterprise that is controlled by another enterprise (known as the parent). 2. A parent is an enterprise that has one or more subsidiaries. 3. A group is a parent and all its subsidiaries. 4. The equity method is a method of accounting whereby the investment is initially recorded at cost, identifying any goodwill/capital reserve arising at the time of acquisition. The carrying amount of the investment is adjusted thereafter for the post acquisition change in the investor’s share of net assets of the investee. The consolidated statement of profit and loss reflects the investor’s share of the results of the operations of the investee. 5. Equity is the residual interest in the assets of an enterprise after deducting all its liabilities. 6. Consolidated financial statements are the financial statements of a group presented as those of a single enterprise. 7. An associate is an enterprise in which the investor has significant influence and which is neither a subsidiary nor a joint venture of the investor. 8. Significant influence is the power to participate in the financial and/or operating policy decisions of the investee but not control over those policies. This definition excludes the subsidiaries or joint venture from the scope of an associate but apart from these any other enterprises, which are significantly influenced by the investor, is an associate for the purpose of this standard. Any enterprise having 20% or more of the voting power or any interest directly or indirectly in any other enterprise will be assumed to have significantly influence the other enterprise unless proved otherwise. Significant influence may be gained by share ownership, statute or agreement. Similarly any enterprise that does not <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 3 --- have 20% or more control then it is assumed not having significant influence on the enterprise unless proved otherwise. An enterprise can influence the significant economic decision making by many ways like: ♦ Having some voting power. ♦ Representation on the board of directors or governing body of the investee. ♦ Participation in policy-making processes. Material transactions between the investor and the investee (Influencing inter- company transactions i.e. sale of goods and services, sharing technical knowledge etc. ♦ Interchange of managerial personnel. ♦ Provision of essential technical information. As a general rule, significant influence is presumed to exist when an investor holds, directly or indirectly through subsidiaries, 20% or more of the voting power of the investee. As with the classification of any investment, the substance of the arrangement in each case should be considered. If it can be clearly demonstrated that an investor holding 20% or more of the voting power of the investee does not have significant influence, the investment will not be accounted for as an associate. A substantial or majority ownership by another investor does not necessarily preclude an investor from having significant influence. If the investor holds, directly or indirectly through subsidiaries, less than 20% of the voting power of the investee, it is presumed that the investor does not have significant influence, unless such influence can be clearly demonstrated. The presence of one or more of the indicators as above may indicate that an investor has significant influence over a less than 20% owned corporate investee. Control exists when parent company has either: a. The ownership, directly or indirectly through subsidiary(ies), of more than one-half of the voting power of an enterprise.</li>
            <li>-- PAGE 4 --- FINANCIAL STATEMENTS b. Or control of the composition of the board of directors in the case of a company or of the composition of the corresponding governing body in case of any other enterprise so as to obtain economic benefits from subsidiary company’s activities. If any company is controlling the composition of governing body of gratuity trust, provident fund trust etc., since the objective is not the economic benefit and therefore it will not be included in consolidated financial statement. An enterprise is considered to control the composition of the board of directors of a company or governing body in case of an enterprise other than a company, if it has the power, without the consent or concurrence of any other person, to appoint or remove all or a majority of directors of that company or members of the body. An enterprise is deemed to have the power to appoint a director/member, if any of the following conditions is satisfied: (i) A person cannot be appointed as director/member without the exercise in his favour by that enterprise of such a power as aforesaid; or (ii) A person’s appointment as director/member follows necessarily from his appointment to a position held by him in that enterprise; or (iii) The director/member is nominated by that enterprise or a subsidiary thereof. To understand the above definitions let us take few examples: Example 1 A Ltd. has 70% holding in C Ltd. and B Ltd. also has 28% holding in the same company. So, A Ltd. with the majority holding i.e. more than 50% is the parent company i.e. a holding company. Since B Ltd. holds more than 20% but not more than 50% in C Ltd., C Ltd. will be an associate of B Ltd. Example 2 A Ltd. is holding 90% share in B Ltd. and 10% shares in C Ltd., and B Ltd. is holding 11%shares in C Ltd. In this case, A Ltd. is parent of B Ltd. As far as the relationship between A Ltd. and C Ltd. is concerned; A Ltd. has a total of direct and indirect holding of (10 + 11) 21% in C Ltd., Thus, C Ltd. is an associate of A Ltd. It may however be noted that for consolidated financial statement purposes, the holding will be% (10% + 90% of 11%),.</li>
            <li>-- PAGE 5 ---</li>
          </ul>
          
        </section>

        {/* Section: 2.4 ASSOCIATES ACCOUNTED FOR USING THE */}
        <section id="as-23-associates-accounted-for-using-the" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-associates-accounted-for-using-the" num="2.4" title="ASSOCIATES ACCOUNTED FOR USING THE" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            EQUITY METHOD The equity method is a method of accounting whereby the investment is initially recorded at cost, identifying any goodwill/capital reserve arising at the time of acquisition. The carrying amount of the investment is adjusted thereafter for the post acquisition change in the investor’s share of net assets of the investee. The consolidated statement of profit and loss reflects the investor’s share of the results of operations of the investee. Goodwill/capital reserve arising on the acquisition of an associate by an investor should be included in the carrying amount of investment in the associate but should be disclosed separately. From the definition, following broad conclusions can be drawn: a. In CFS, investment is to be recorded at cost. b. Any surplus or deficit in cost and net asset to be recorded as goodwill or capital reserve. c. Distributions received from an investee reduce the carrying amount of the investment. d. Any subsequent change in share in net asset is adjusted in cost of investment and goodwill/capital reserve. e. Consolidated Profit &amp; Loss shows the investor’s share in the results of operations of the investee. Illustration 1 A Ltd. acquire 45% of B Ltd. shares on April 01, 20X1, the price paid was ` 15,00,000. Following are the extracts of balance sheet of B Ltd. as of 1 April 20X1: Paid up Equity Share Capital ` 10,00,000 Securities Premium ` 1,00,000 Reserve &amp; Surplus ` 5,00,000 B Ltd. has reported net profits of ` 3,00,000 and paid dividends of ` 1,00,000 for the year ended 31 March 20X2. Calculate the amount at which the investment in B Ltd. should be shown in the consolidated balance sheet of A Ltd. as on March 31, 20X2. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 6 --- FINANCIAL STATEMENTS Solution Calculation of Goodwill/Capital Reserve under Equity Method Particulars ` ` Investment in B Ltd. (A) 15,00,000 Equity Shares 10,00,000 Security Premium 1,00,000 Reserves &amp; Surplus 5,00,000 Net Assets 16,00,000 45% of Net Asset (B) 7,20,000 Goodwill (A-B) 7,80,000 Calculation of Carrying Amount of Investment in the year ended on 31 st March, 20X2 Particulars ` Investment in Associate as per AS 23: Share of Net Assets on 1 April 20X1 7,20,000 Add: Goodwill 7,80,000 Cost of Investment 15,00,000 Add: Profit during the year (3,00,000 x 45%) 1,35,000 Less: Dividend paid (1,00,000 x 45%) (45,000) Carrying Amount of Investment 15,90,000</li>
          </ul>
          
        </section>

        {/* Section: 2.5 CIRCUMSTANCES UNDER WHICH EQUITY */}
        <section id="as-23-circumstances-under-which-equity" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-circumstances-under-which-equity" num="2.5" title="CIRCUMSTANCES UNDER WHICH EQUITY" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            METHOD IS FOLLOWED Equity method of accounting is to be followed by all the enterprises having significant influence on their associates except in the following cases: a. Control is intended to be temporary because the investment is acquired and held exclusively with a view to its subsequent disposal in the near future. The term ‘Near Future’ is explained with <strong>AS 21</strong>. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 7 --- b. Or it operates under severe long-term restrictions, which significantly impair its ability to transfer funds to the investor. In both the above cases, investment of investor in the share of the investee is treated as investment according to AS 13. An investor should discontinue the use of the equity method from the date that: a. It ceases to have significant influence in an associate but retains, either in whole or in part, its investment. b. The use of the equity method is no longer appropriate because the associate operates under severe long-term restrictions that significantly impair its ability to transfer funds to the investor. From the date of discontinuing the use of the equity method, investments in such associates should be accounted for in accordance with AS 13, Accounting for Investments. For this purpose, the carrying amount of the investment at that date should be regarded as cost thereafter. The reasons for not applying the equity method in accounting for investments in an associate should be disclosed in the consolidated financial statements.</li>
          </ul>
          
        </section>

        {/* Section: 2.6 APPLICATION OF THE EQUITY METHOD */}
        <section id="as-23-application-of-the-equity-method" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-application-of-the-equity-method" num="2.6" title="APPLICATION OF THE EQUITY METHOD" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>Many of the rules followed under equity method for an associate is similar to consolidated financial statement rules as in case of subsidiary i.e. AS 21. ♦ Investment in an associate should be recorded as per the equity method from the date when such relation comes in effect. ♦ Investment in the associate is recorded at cost and any difference in the cost and investor’s share in equity on the date of acquisition is shown as goodwill or capital reserve. Case 1: A Ltd. holds 22% share of B Ltd. on 1 st April of the year and following are the relevant information as available on the date are Cost of Investment ` 33,000 and Total Equity on the date of acquisition ` 2,00,000.</li>
            <li>-- PAGE 8 --- FINANCIAL STATEMENTS A Ltd.’s share in equity (2,00,000 x 22%) ` 44,000 Less: Cost of Investment ` (33,000) Capital Reserve ` 11,000 Extract of Balance Sheet: ASSETS Investment in Associate as per AS 23 ` ` Share of Net Assets as on 1 April 44,000 Less: Capital reserve (11,000) 33,000 Case 2: A Ltd. holds 22% share of B Ltd. on 1 st April of the year and following are the relevant information as available on the date are Cost of Investment ` 55,000 and Total Equity on the date of acquisition ` 2,00,000. Cost of Investment ` 55,000 Less: A Ltd.’s share in equity (2,00,000 x 22%) ` 44,000 Goodwill ` 11,000 Extract of Balance Sheet: ASSETS Investment in Associate as per AS 23 ` ` Share of Net Assets as on 1 April 44,000 Add: Goodwill 11,000 55,000 ♦ Step Acquisition in case of an associate: An enterprise having share of profits of more than 50% in other company, they are said to be in Parent-Subsidiary relationship. However, if the share in profits is more than 20% but upto 50% then this relationship is termed as of associate. This stake of 20% can be acquired either in one go or in more than one transaction. This stake can be increased further say from 25% to 30%. Adjustment should be made with each transaction.</li>
            <li>-- PAGE 9 --- Case 1 Conversion from a passive investor to an associate in the same year: A Ltd. acquired 10% stake of B Ltd. on April 01 and further 15% on October 01 during the same year. Other information is as follow: Cost of Investment for 10% ` 1,00,000 and for 15% ` 1,45,000 Net asset on April 01 ` 8,50,000 and on October 01 ` 10,00,000. Calculations for April 01: ` Cost of investment 1,00,000 Less: 10% share in net asset (8,50,000 x 10%) (85,000) Goodwill 15,000 Calculations for October 01: ` 15% share in net asset (10,00,000 x 15%) 1,50,000 Less: Cost of investment (1,45,000) Capital Reserve 5,000 Total goodwill (15,000 – 5,000) 10,000 Case 2 - Conversion from a passive investor to an associate in the same year: A Ltd. acquired 10% stake of B Ltd. on April 01 and further 15% on October 01 of the same year. Other information is as follow: Cost of Investment for 10% ` 1,00,000 and for 15% ` 1,55,000 Net asset on April 01 ` 8,50,000 and on October 01 ` 10,00,000. Calculations for April 01: ` Cost of investment 1,00,000</li>
            <li>-- PAGE 10 --- FINANCIAL STATEMENTS Less: 10% share in net asset ( 85,000) Goodwill 15,000 Calculations for October 01: ` Cost of investment 1,55,000 Less: 15% share in net asset ( 1,50,000) Goodwill 5,000 Total goodwill (15,000 + 5,000) 20,000 Case 3 – Further acquisition in an associate in the same year: A Ltd. acquired 25% stake of B Ltd. on April 01 and further 5% on October 01 of the same year. Other information is as follow: Cost of Investment for 25% ` 1,50,000 and for 5% ` 20,000 Net asset on April 01 ` 5,00,000. Profit for the year ` 90,000 earned in the ratio 2:1 respectively. Calculations for April 01: ` Cost of investment 1,50,000 Less: 25% share in net asset (5,00,000 x2 5%) (1,25,000) Goodwill 25,000 Calculations for October 01: ` Profits for the first half (90,000/3) x 2 60,000 Additional share of A Ltd. 5% Pre-acquisition profits i.e. capital reserve (60,000 x 5%) 3,000 5% share in net asset 25,000</li>
            <li>-- PAGE 11 --- Total share of net assets for 5% stake (5,00,000+60,000)x5% 28,000 Cost of investment 20,000 Capital Reserve 8,000 Cost of Investment on April 01 1,50,000 Less: Goodwill ` 25,000 1,25,000 Calculation of net assets of associates as on 31st March Carrying Amount on April 01 1,25,000 Add: Additional Share in Net Asset on October 01 25,000 Add: Capital share of Profits for first half 3,000 Add: Revenue shares of Profits for first half (60,000 x 25%) 15,000 Add: Revenue shares of Profits for second half (30,000 x 30%) 9,000 Net Assets Of Associate As On 31 st March 1,77,000 Alternatively Balance sheet ` Investment in associate (inclusive of goodwill of 25,000) 1,25,000 Add: Further investment 28,000 Add: (90,000 x 25% + 30,000 x 5 %) i.e (22,500+1,500) 24,000 or (60,000 x 25% +30,000 x30%) 1,77,000 ♦ If there is any transaction between the Investor Company and investee concern then the unrealised profits on such goods to the extent of investor’s share should be eliminated from consolidated financial statement. ♦ Any loss on such transactions are not eliminated to the extent that such loss is not recoverable. Otherwise such losses are written off from consolidated financial statement fully.</li>
            <li>-- PAGE 12 --- FINANCIAL STATEMENTS Illustration 2 A Ltd. acquired 40% share in B Ltd. on April 01, 20X1 for ` 10 lacs. On that date B Ltd. had 1,00,000 equity shares of ` 10 each fully paid and accumulated profits of ` 2,00,000. During the year 20X1-20X2, B Ltd. suffered a loss of ` 10,00,000; during 20X2-20X3 loss of ` 12,50,000 and during 20X3-20X4 again a loss of ` 5,00,000. Show the extract of consolidated balance sheet of A Ltd. on all the four dates recording the above events. Solution Calculation of Goodwill/Capital Reserve under Equity Method Particulars ` Equity Shares 10,00,000 Reserves &amp; Surplus 2,00,000 Net Assets 12,00,000 40% share of Net Assets 4,80,000 Less: Cost of Investment (10,00,000) Goodwill 5,20,000 Consolidated Balance Sheet (Extract) as on April 01, 20X1: ASSETS Investment in Associate as per AS 23 ` ` Share of Net Assets on April 1 4,80,000 Add: Goodwill 5,20,000 10,00,000 Calculation of Carrying Amount of Investment as at 31 March 20X2: Investment in Associate as per AS 23 ` Share of Net Assets on 1 April, 20X1 4,80,000 Add: Goodwill 5,20,000 Cost of Investment 10,00,000</li>
            <li>-- PAGE 13 --- Less: Loss for the year (10,00,000 x 40%) (4,00,000) Carrying Amount of Investment 6,00,000 Consolidated Balance Sheet (Extract) as on March 31, 20X2: ASSETS Investment in Associate as per AS 23 ` ` Share of Net Assets on 1 April, 20X1 4,80,000 Less: Share of Loss as above (4,00,000) 80,000 Add: Goodwill 5,20,000 6,00,000 Calculation of Carrying Amount of Investment as at 31 March 20X3: Investment in Associate as per AS 23 ` Carrying Amount of Investment as on 31 March 20X2 6,00,000 Less: Loss for the year (12,50,000 x 40%) (5,00,000) Carrying Amount of Investment 1,00,000 Consolidated Balance Sheet (Extract) as on March 31, 20X3: ASSETS Investment in Associate as per AS 23 ` ` Share of Net Assets on 1 April, 20X1 4,80,000 Less: Share of Loss as above (` 4,00,000 + ` 5,00,000) (4,20,000) Add: Goodwill 1,00,000 Calculation of Carrying Amount of Investment as at 31 March 20X4: Investment in Associate as per AS 23 ` Carrying Amount of Investment 1,00,000 Less: Loss for the year (5,00,000 x 40% = 2,00,000, restricted to Carrying amount of Investment in B Ltd.) -refer note below Carrying Amount of Investment</li>
            <li>-- PAGE 14 --- FINANCIAL STATEMENTS Consolidated Balance Sheet (Extract) as on March 31, 20X4: ASSETS Investment in Associate as per AS 23 ` Investment in B Ltd. - ♦ If, under the equity method, an investor’s share of losses of an associate equals or exceeds the carrying amount of the investment, the investor ordinarily discontinues recognising its share of further losses and the investment is reported at nil value. Additional losses are provided for to the extent that the investor has incurred obligations or made payments on behalf of the associate to satisfy obligations of the associate that the investor has guaranteed or to which the investor is otherwise committed. If the associate subsequently reports profits, the investor resumes including its share of those profits only after its share of the profits equals the share of net losses that have not been recognised. ♦ As far as possible the reporting date of the financial statements should be same for consolidated financial statement. If practically it is not possible to draw up the financial statements of one or more enterprise to such date and, accordingly, those financial statements are drawn up to reporting dates different from the reporting date of the investor, adjustments should be made for the effects of significant transactions or other events that occur between those dates and the date of the consolidated financial statements. In any case, the difference between reporting dates of the concern and consolidated financial statement should not be more than six months. ♦ Accounting policies followed in the preparation of the financial statements of the investor, investee and consolidated financial statement should be uniform for like transactions and other events in similar circumstances. If accounting policies followed by different enterprises in the group are not uniform, then adjustments should be made in the items of the individual financial statements to bring it in line with the accounting policy of the consolidated statement. ♦ The carrying amount of investment in an associate should be reduced to recognise a decline, other than temporary, in the value of the investment, such reduction being determined and made for each investment individually.</li>
            <li>-- PAGE 15 ---</li>
          </ul>
          
        </section>

        {/* Section: 2.7 CONTINGENCIES */}
        <section id="as-23-contingencies" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-contingencies" num="2.7" title="CONTINGENCIES" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            In accordance with <strong>AS 4</strong>, the investor discloses in the consolidated financial statements: a. Its share of the contingencies and capital commitments of an associate for which it is also contingently liable; and b. Those contingencies that arise because the investor is severally liable for the liabilities of the associate. <PdfRef page={1} />
          </p>
          
        </section>

        {/* Section: 2.8 WHY IS EQUITY METHOD OF ACCOUNTING */}
        <section id="as-23-why-is-equity-method-of-accounting" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-why-is-equity-method-of-accounting" num="2.8" title="WHY IS EQUITY METHOD OF ACCOUNTING" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            ADOPTED FOR INVESTMENT IN ASSOCIATES? ♦ <strong>Investments</strong> in associates cannot be treated as a normal investment under <strong>AS 13</strong>. The intent of investing to such an extent (i.e.; 20% or more but less than 50% of equity) in an associate is an expression of the fact that the investor is not merely interested in the dividend distribution, but also is interested in the participation of decision-making process in the associate. ♦ Thus, recognition of income on the basis of distributions received may not be an adequate measure of the income earned by an investor on an investment in an associate because the distributions received may bear little relationship to the performance of the associate. As the investor has significant influence over the associate, the investor has a measure of responsibility for the associate’s performance and, as a result, the return on its investment. The investor accounts for this stewardship by extending the scope of its consolidated financial statements to include its share of results of such an associate and so provides an analysis of earnings and investment from which more useful ratios can be calculated. As a result, application of the equity method in consolidated financial statements provides more informative reporting of the net assets and net income of the investor. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 16 --- FINANCIAL STATEMENTS</li>
          </ul>
          
        </section>

        {/* Section: 2.9 DISCLOSURE */}
        <section id="as-23-disclosure" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-disclosure" num="2.9" title="DISCLOSURE" />
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>In addition to the disclosures required above, an appropriate listing and description of associates including the proportion of ownership interest and, if different, the proportion of voting power held should be disclosed in the consolidated financial statements. ♦ Investments in associates accounted for using the equity method should be classified as long-term investments and disclosed separately in the consolidated balance sheet. The investor’s share of the profits or losses of such investments should be disclosed separately in the consolidated statement of profit and loss. The investor’s share of any extraordinary or prior period items should also be separately disclosed. ♦ The name(s) of the associate(s) of which reporting date(s) is/are different from that of the financial statements of an investor and the differences in reporting dates should be disclosed in the consolidated financial statements. ♦ In case an associate uses accounting policies other than those adopted for the consolidated financial statements for like transactions and events in similar circumstances and it is not practicable to make appropriate adjustments to the associate’s financial statements, the fact should be disclosed along with a brief description of the differences in the accounting policies. ♦ If an associate is not accounted for using the equity method the reasons for not doing the same. ♦ Goodwill/capital reserve arising on the acquisition of an associate by an investor should be disclosed separately though it is included in the carrying amount of the investment.</li>
            <li>-- PAGE 17 ---</li>
          </ul>
          
        </section>

        {/* Section: 2.10 RELEVANT EXPLANATIONS TO AS 23 */}
        <section id="as-23-relevant-explanations-to-as-23" className="scroll-mt-36 space-y-6 w-full">
          <SH id="as-23-relevant-explanations-to-as-23" num="2.10" title="RELEVANT EXPLANATIONS TO AS 23" />
          <p className="text-[16px] leading-relaxed text-slate-700 dark:text-slate-200 mb-4 font-serif">
            2.10.1 Treatment of Proposed Dividend in Associates in Consolidated Financial Statements In case an associate has made a provision for proposed dividend (i.e. dividend declared after the reporting period but it pertains to that reporting year) in its financial statements, the investor&apos;s share of the results of operations of the associate should be computed without taking into consideration the proposed dividend. 2.10.2 Consideration of Potential Equity Shares for Determining whether an Investee is an Associate The potential equity shares of the investee held by the investor should not be taken into account for determining the voting power of the investor. Reference: The students are advised to refer the full text of <strong>AS 23</strong> “Accounting for <strong>Investments</strong> in Associates in Consolidated Financial Statements” (issued 2001). TEST YOUR KNOWLEDGE Multiple Choice Questions 1. Identity which of the statements are correct. An enterprise can influence the significant economic decision making by many ways like: (i) Representation on the board of directors or governing body of the investee. (ii) Participation in policy-making processes. (iii) Interchange of managerial personnel. (iv) Provision of essential technical information. (a) Statement (i) and (ii) are correct. <PdfRef page={1} />
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] font-sans text-slate-800 dark:text-slate-200">
            <li>-- PAGE 18 --- FINANCIAL STATEMENTS (b) Statement (i), (ii) and (iii) are correct. (c) Statement (i), (ii), (iii) and (iv) are correct. (d) Statement (ii) and (iii) are correct. 2. A Ltd. is holding 90% share in B Ltd. and 10% shares in C Ltd., and B Ltd. is holding 11% shares in C Ltd. Identity which of the statements are incorrect. (i) In this case, A Ltd. is parent of B Ltd. (ii) As far as the relationship between A Ltd. and C Ltd. is concerned; A Ltd. has a total of direct and indirect holding of (10% + 90% of 11%) 19.9 % in C Ltd. (iii) C Ltd. is an associate of A Ltd. (a) Statement (ii) is incorrect. (b) Statement (iii) is incorrect. (c) Statement (ii) and (iii) both are incorrect. (d) All statements are incorrect. 3. A Ltd. acquired 10% stake of B Ltd. on April 01 and further 15% on October 01 of the same year. Other information is as follows: Cost of Investment for 10% ` 1,00,000 and for 15% ` 1,55,000 Net asset on April 01 ` 8,50,000 and on October 01 ` 10,00,000. What is the amount of goodwill or capital reserve arising on significant influence? (a) Goodwill = ` 10,000. (b) Goodwill = ` 20,000. (c) Capital Reserve = ` 10,000. (d) Capital Reserve = ` 20,000. 4. A Ltd. acquired 10% stake of B Ltd. on April 01 and further 15% on October 01 during the same year. Other information is as follow:</li>
            <li>-- PAGE 19 --- Cost of Investment for 10% ` 1,00,000 and for 15% ` 1,45,000 Net asset on April 01 ` 8,50,000 and on October 01 ` 10,00,000. What is the amount of goodwill or capital reserve arising on significant influence? (a) Goodwill = ` 10,000. (b) Goodwill = ` 20,000. (c) Capital Reserve = ` 10,000. (d) Capital Reserve = ` 20,000. 5. Identity which of the statements are correct. (i) In case an associate has made a provision for proposed dividend (i.e. dividend declared after the reporting period but it pertains to that reporting year) in its financial statements, the investor&apos;s share of the results of operations of the associate should be computed without taking into consideration the proposed dividend. (ii) In case an associate has made a provision for proposed dividend (i.e. dividend declared after the reporting period but it pertains to that reporting year) in its financial statements, the investor&apos;s share of the results of operations of the associate should be computed after taking into consideration the proposed dividend. (iii) The potential equity shares of the investee held by the investor should not be taken into account for determining the voting power of the investor. (iv) The potential equity shares of the investee held by the investor should be taken into account for determining the voting power of the investor. (a) Statement (i) and (iii). (b) Statement (ii) and (iv). (c) Statement (i) only. (d) Statement (iii) only.</li>
            <li>-- PAGE 20 --- FINANCIAL STATEMENTS Theoretical Questions 6. Describe the cases when AS 23 does not allow the use of equity method of accounting? 7. When is an investor required to discontinue the use of the equity method of accounting? Scenario based Questions 8. Bright Ltd. acquired 30% of East India Ltd. shares for ` 2,00,000 on 01-06-20X1. By such an acquisition Bright can exercise significant influence over East India Ltd. During the financial year ending on 31-03-20X1 East India earned profits ` 80,000 and declared a dividend of ` 50,000 on 12-08-20X1. East India reported earnings of ` 3,00,000 for the financial year ending on 31-03-20X2 (assume profits to accrue evenly) and declared dividends of ` 60,000 on 12-06-20X2. Calculate the carrying amount of investment in: (i) Separate financial statements of Bright Ltd. as on 31-03-20X2; (ii) Consolidated financial statements of Bright Ltd.; as on 31-03-20X2; (iii) What will be the carrying amount as on 30-06-20X2 in consolidated financial statements? 9. A Ltd. acquired 25% of shares in B Ltd. as on.20X1 for ` 3 lakhs. The Balance Sheet of B Ltd. as on.20X1 is given below: ` Share Capital 5,00,000 Reserves and Surplus 5,00,000 10,00,000 Property, Plant and Equipment 5,00,000 Investments 2,00,000 Current Assets 3,00,000 10,00,000</li>
            <li>-- PAGE 21 --- During the year ended.20X2 the following are the additional information available: (i) On.20X1 A Ltd. received a dividend from B Ltd. for the year ended.20X1 at 40% from the Reserves. The above balance sheet is before the adjustment of dividend. (ii) B Ltd. made a profit after tax of ` 7 lakhs for the year ended.20X2. (iii) B Ltd. declared a dividend @ 50% for the year ended.20X2 on.20X2. A Ltd. is preparing Consolidated Financial Statements for 20X1-X2 in accordance with AS 21 for its various subsidiaries. Calculate: (i) Goodwill if any on investment in shares of B Ltd.’s . (ii) How the dividend received for.20X2 on.20X2 from B Ltd. will be shown in the Consolidated Financial Statements? (iii) How A Ltd. will reflect the value of investment in B Ltd., in its Consolidated Financial Statements? ANSWERS/SOLUTION Answer to the Multiple Choice Questions 1. (c) 2. (a) 3. (b) 4. (a) 5. (a) Answer to the Theoretical Questions 6. Equity method of accounting is to be followed by all the enterprises having significant influence on their associates except in the following cases: a. Control is intended to be temporary because the investment is acquired and held exclusively with a view to its subsequent disposal in the near future. The term ‘Near Future’ is explained with AS 21. Or;</li>
            <li>-- PAGE 22 --- FINANCIAL STATEMENTS b. It operates under severe long-term restrictions, which significantly impair its ability to transfer funds to the investor. In both the above cases, investment of investor in the share of the investee is treated as investment according to AS 13. 7. An investor should discontinue the use of the equity method from the date that: a. It ceases to have significant influence in an associate but retains, either in whole or in part, its investment. b. The use of the equity method is no longer appropriate because the associate operates under severe long-term restrictions that significantly impair its ability to transfer funds to the investor. From the date of discontinuing the use of the equity method, investments in such associates should be accounted for in accordance with AS 13, Accounting for Investments. For this purpose, the carrying amount of the investment at that date should be regarded as cost thereafter. Answer to the Scenario based Questions 8. (i) Carrying amount of investment in Separate Financial Statement of Bright Ltd. as on.20X2 ` Amount paid for investment in Associate (on.20X1) 2,00,000 Less: Pre-acquisition dividend (` 50,000 x 30%) (15,000) Carrying amount as on.20X2 as per AS 13 1,85,000 (ii) Carrying amount of investment in Consolidated Financial Statements∗ of Bright Ltd. as on.20X2 as per AS 23 ` Carrying amount as per separate financial statements 1,85,000 ∗It is assumed that Bright Ltd. has a subsidiary company and it is preparing Consolidated Financial Statements.</li>
            <li>-- PAGE 23 --- Add: Proportionate share of 10-month profit of investee as per equity method (30% of ` 3,00,000 x 10/12) 75,000 Carrying amount as on.20X2 2,60,000 (iii) Carrying amount of investment in Consolidated Financial Statement of Bright Ltd. as on.20X2 as per AS 23 ` Carrying amount as on.20X2 2,60,000 Less: Dividend received (` 60,000 x 30%) (18,000) Carrying amount as on.20X2 2,42,000 9. In terms of AS 23, B Ltd. will be considered as an associate company of A Ltd. as shares acquired represent to more than 20%. (i) Calculation of Goodwill ( ` in lakhs) Amount paid towards acquisition of stake in B Ltd. 3.00 Less: Pre-acquisition dividend (` 5,00,000 x 40% x 25%) 0.50 Cost of Investment in B Ltd. 2.50 Less: Share in the value of Equity of B Ltd. as at the date of investment [25% of ` 8 lakhs (` 5 lakhs + ` 5 lakhs – ` 2 lakhs)] (2.00) (ii) A Ltd. Consolidated Profit and Loss Account for the year ended 31st March, 20X2 (An extract) ` in lakhs Other income: Share of profits in B Ltd. (7x 25%) 1.75 Pre-acquisition Dividend received from</li>
            <li>-- PAGE 24 --- FINANCIAL STATEMENTS B Ltd. 0.50 Transfer to investment A/c (0.50) Nil (iii) A Ltd. Consolidated Balance Sheet as on.20X2 (An extract) ` in lakhs Non-current investments Investment in B Ltd. 2.50 (including goodwill) Share of profit for year 20X1 – 20X2 Working Notes: 1. Pre-acquisition dividend received from B Ltd. amounting to ` 0.50 lakhs will be reduced from investment value in the books of A Ltd. 2. B Ltd. made a profit of ` 7 lakhs for the year ended 31st March, 20X2. A Ltd.’s share in the profits of ` 7 lakhs is ` 1.75 lakhs. Investment in B Ltd. will be increased by ` 1.75 lakhs and consolidated profit and loss account of A Ltd. will be credited with ` 1.75 lakhs in the consolidated financial statement of A Ltd. 3. Dividend declared on.20X2 will not be recognized in the consolidated financial statement of A Ltd.</li>
          </ul>
          
        
          <NB type="exam" title="CA Final &amp; Intermediate Exam Tips">
            When preparing for exam questions on **AS 23**, pay close attention to disclosure requirements, classification boundary criteria, and exceptions to general valuation rules. Ensure that you reference specific paragraph numbers and compile-ready disclosure formats in your written drafts.
          </NB>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 w-full font-serif">
            <div className="p-5 border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/20 dark:bg-indigo-900/5 rounded-xl space-y-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400">
                Professional Accountant Guide
              </h4>
              <p className="text-[14px] leading-relaxed text-slate-900 dark:text-slate-50 font-medium">
                Under AS 23, management must exercise rigorous judgment when applying accounting policies. Document all key estimates, assumptions, and policy choices in the corporate financial notes to ensure transparent compliance.
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
