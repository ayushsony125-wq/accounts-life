import { fetchStandardDetail, fetchScheduleIIIData } from '@/lib/learning-loader'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Helper to fetch details for either AS/Ind AS standard or a Schedule III entry
async function getPrintContent(slug: string) {
  // 1. Try AS/Ind AS standard detail first
  let data = await fetchStandardDetail(slug, 'AS')
  if (!data) {
    data = await fetchStandardDetail(slug, 'Ind AS')
  }

  // 2. Try Schedule III data if not found as standard
  if (!data && slug.startsWith('schedule-iii-')) {
    const schData = await fetchScheduleIIIData()
    const slugParts = slug.split('-')
    const divKey = slugParts[2] as 'div1' | 'div2' | 'div3'
    const partSuffix = slugParts.slice(3).join('-')

    let partKey: 'balanceSheet' | 'profitAndLoss' | 'cashFlow' | 'others' | null = null
    if (partSuffix === 'balance-sheet') partKey = 'balanceSheet'
    else if (partSuffix === 'profit-loss') partKey = 'profitAndLoss'
    else if (partSuffix === 'cash-flow') partKey = 'cashFlow'
    else if (partSuffix === 'others') partKey = 'others'

    if (partKey && schData[divKey] && schData[divKey][partKey]) {
      const topic = schData[divKey][partKey]
      // Map to Standard shape for consistent print rendering
      data = {
        id: slug,
        code: divKey === 'div1' ? 'Sch III Div I' : divKey === 'div2' ? 'Sch III Div II' : 'Sch III Div III',
        title: topic.title,
        shortTitle: topic.title,
        framework: divKey === 'div1' ? 'AS' : 'Ind AS',
        description: topic.content?.meaning || '',
        content: {
          objective: topic.content?.meaning || '',
          scope: {
            statement: topic.content?.scope || '',
            included: [],
            excluded: []
          },
          keyPrinciples: []
        },
        examples: topic.content?.examples?.map((ex: any) => ({
          title: ex.title,
          scenario: ex.scenario,
          working: ex.solution,
          answer: ex.solution,
          guidance: ex.solution || '',
          difficulty: 'INTERMEDIATE'
        })) || [],
        lectureUrl: topic.lectureUrl || '',
        resources: topic.resources || [],
        faqs: topic.faqs || [],
        definitions: [],
        disclosureGroups: [],
        pdfPagesCount: 8,
        comparison: { std2Title: '', rows: [] },
        blocks: topic.blocks
      }
    }
  }

  // 3. Fallback to generic Entry query if still not found
  if (!data) {
    const entry = await prisma.entry.findUnique({
      where: { entrySlug: slug },
      include: {
        illustrations: { orderBy: { sortOrder: 'asc' } },
        faqs: { orderBy: { sortOrder: 'asc' } },
        notes: { orderBy: { sortOrder: 'asc' } }
      }
    })
    if (!entry) return null

    const blocks = (entry.entryBody && typeof entry.entryBody === 'object' && 'blocks' in entry.entryBody)
      ? (entry.entryBody as any).blocks
      : undefined

    data = {
      id: entry.entrySlug,
      code: 'GEN',
      title: entry.entryTitle,
      shortTitle: entry.entryTitle,
      framework: 'AS',
      description: entry.summary,
      content: {
        objective: entry.summary,
        scope: { statement: '', included: [], excluded: [] },
        keyPrinciples: entry.notes.map((n: any) => ({ title: n.noteTitle || '', body: n.noteBody }))
      },
      examples: entry.illustrations.map((i: any) => ({
        title: i.illusTitle,
        scenario: i.illusScenario || '',
        working: i.illusWorking || '',
        answer: i.illusAnswer || '',
        guidance: i.illusAnswer || '',
        difficulty: i.illusDifficulty
      })),
      lectureUrl: '',
      resources: [],
      faqs: entry.faqs.map((f: any) => ({ question: f.faqQuestion, answer: f.faqAnswer })),
      definitions: [],
      disclosureGroups: [],
      pdfPagesCount: 3,
      comparison: { std2Title: '', rows: [] },
      blocks
    }
  }

  return data
}

export default async function PrintPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const data = await getPrintContent(slug)

  if (!data) {
    notFound()
  }

  // Formatting helpers for print text
  const renderFormattedText = (text: string) => {
    if (!text) return ''
    
    // Replace markdown bold
    let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace markdown italic
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>')
    processed = processed.replace(/_(.*?)_/g, '<em>$1</em>')
    // Replace custom underline tags
    processed = processed.replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>')
    processed = processed.replace(/<u>(.*?)<\/u>/g, '<u>$1</u>')
    // Replace custom highlight tags
    processed = processed.replace(/\[highlight\](.*?)\[\/highlight\]/g, '<mark class="bg-amber-100 px-1 rounded">$1</mark>')
    // Replace [Page X] links with plain text page marker
    processed = processed.replace(/\[Page\s+(\d+)\]/g, '<span class="font-mono text-slate-500 text-[10px] bg-slate-100 px-1 rounded">(Page $1)</span>')

    return <span dangerouslySetInnerHTML={{ __html: processed }} />
  }

  return (
    <div className="bg-white text-slate-900 font-serif p-8 max-w-4xl mx-auto space-y-8 print:p-0 print:max-w-full print:bg-transparent">
      {/* Document Header */}
      <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-end">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">{data.code}</span>
          <h1 className="text-2xl font-bold font-sans mt-1 leading-tight">{data.title}</h1>
        </div>
        <div className="text-right text-xs font-sans text-slate-500">
          <div>Accounts.One Study Portal</div>
          <div>{data.framework === 'AS' ? 'Accounting Standards (AS)' : 'Indian Accounting Standards (Ind AS)'}</div>
        </div>
      </div>

      {/* Main Blocks View (If custom visual content blocks exist) */}
      {data.blocks && data.blocks.length > 0 ? (
        <div className="space-y-6 text-sm leading-relaxed">
          {data.blocks.map((block: any, idx: number) => {
            if (block.hidden) return null
            switch (block.type) {
              case 'HEADING':
                return (
                  <h2 key={idx} className="text-lg font-bold font-sans border-b border-slate-200 pb-1 mt-8 first:mt-0 uppercase tracking-wide">
                    {renderFormattedText(block.content)}
                  </h2>
                )
              case 'SUB_HEADING':
                return (
                  <h3 key={idx} className="text-sm font-bold font-sans mt-6">
                    {renderFormattedText(block.content)}
                  </h3>
                )
              case 'PARAGRAPH':
                return (
                  <p key={idx} className="text-justify text-slate-800 leading-relaxed my-3">
                    {renderFormattedText(block.content)}
                  </p>
                )
              case 'NOTE':
              case 'PRACTICAL_USE':
                return (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg my-4 break-inside-avoid">
                    {block.title && <h4 className="font-bold font-sans text-xs text-slate-900 mb-1">{block.title}</h4>}
                    <div className="text-xs text-slate-700 leading-normal">{renderFormattedText(block.body)}</div>
                  </div>
                )
              case 'EXAM_TRAP':
                return (
                  <div key={idx} className="p-4 bg-red-50 border border-red-200 rounded-lg my-4 break-inside-avoid">
                    <h4 className="font-bold font-sans text-xs text-red-800 mb-1">⚠️ EXAM WARNING: {block.title || 'Important Note'}</h4>
                    <div className="text-xs text-red-900 leading-normal">{renderFormattedText(block.body)}</div>
                  </div>
                )
              case 'CASE_LAW':
                return (
                  <div key={idx} className="p-4 bg-blue-50 border border-blue-200 rounded-lg my-4 break-inside-avoid">
                    <h4 className="font-bold font-sans text-xs text-blue-800 mb-0.5">⚖️ CASE LAW: {block.title}</h4>
                    {block.citation && <p className="text-[10px] text-slate-500 font-mono mb-1.5">Citation: {block.citation}</p>}
                    <div className="text-xs text-blue-900 leading-normal">{renderFormattedText(block.body)}</div>
                  </div>
                )
              case 'IMAGE':
                return (
                  <div key={idx} className="my-6 flex flex-col items-center gap-2 break-inside-avoid">
                    <img
                      src={block.url}
                      alt={block.title || 'Illustration'}
                      className="max-h-[300px] w-auto object-contain rounded-lg border border-slate-200"
                    />
                    {block.title && <span className="text-[10px] text-slate-500 font-sans italic">{block.title}</span>}
                  </div>
                )
              case 'EXAMPLE':
              case 'ILLUSTRATION':
                return (
                  <div key={idx} className="p-4 border border-slate-200 rounded-lg my-4 bg-slate-50/50 break-inside-avoid space-y-2">
                    <h4 className="font-bold font-sans text-xs text-slate-900">📋 EXAMPLE: {block.title}</h4>
                    {block.scenario && (
                      <div className="text-xs text-slate-700">
                        <strong>Scenario: </strong>{renderFormattedText(block.scenario)}
                      </div>
                    )}
                    {block.working && (
                      <div className="text-xs text-slate-650 italic">
                        <strong>Working: </strong>{renderFormattedText(block.working)}
                      </div>
                    )}
                    {block.answer && (
                      <div className="text-xs text-slate-800 bg-white p-2 border border-slate-100 rounded">
                        <strong>Treatment: </strong>{renderFormattedText(block.answer)}
                      </div>
                    )}
                  </div>
                )
              case 'TABLE':
                return (
                  <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden my-4 break-inside-avoid">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                          {(block.headers || []).map((header: string, hIdx: number) => (
                            <th key={hIdx} className="p-2 font-bold font-sans">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {(block.rows || []).map((row: string[], rIdx: number) => (
                          <tr key={rIdx} className="hover:bg-slate-50/30">
                            {row.map((cell: string, cIdx: number) => (
                              <td key={cIdx} className="p-2 text-slate-800 leading-normal">
                                {renderFormattedText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              default:
                return null
            }
          })}
        </div>
      ) : (
        /* Legacy details mapping view if blocks do not exist */
        <div className="space-y-6 text-sm leading-relaxed">
          {/* Objective */}
          <div>
            <h2 className="text-lg font-bold font-sans border-b border-slate-200 pb-1 mt-8 first:mt-0 uppercase tracking-wide">1. Objective</h2>
            <p className="text-justify text-slate-800 leading-relaxed my-3">{renderFormattedText(data.content.objective)}</p>
          </div>

          {/* Scope */}
          {data.content.scope?.statement && (
            <div>
              <h2 className="text-lg font-bold font-sans border-b border-slate-200 pb-1 mt-8 uppercase tracking-wide">2. Scope</h2>
              <p className="text-justify text-slate-800 leading-relaxed my-3">{renderFormattedText(data.content.scope.statement)}</p>
            </div>
          )}

          {/* Key Principles (Notes) */}
          {data.content.keyPrinciples && data.content.keyPrinciples.length > 0 && (
            <div>
              <h2 className="text-lg font-bold font-sans border-b border-slate-200 pb-1 mt-8 uppercase tracking-wide">3. Key Provisions &amp; Notes</h2>
              {data.content.keyPrinciples.map((note: any, nIdx: number) => (
                <div key={nIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg my-4 break-inside-avoid">
                  {note.title && <h4 className="font-bold font-sans text-xs text-slate-900 mb-1">{note.title}</h4>}
                  <div className="text-xs text-slate-700 leading-normal">{renderFormattedText(note.body)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Illustrative Examples */}
          {data.examples && data.examples.length > 0 && (
            <div>
              <h2 className="text-lg font-bold font-sans border-b border-slate-200 pb-1 mt-8 uppercase tracking-wide">4. Practical Scenarios &amp; Examples</h2>
              {data.examples.map((ex: any, exIdx: number) => (
                <div key={exIdx} className="p-4 border border-slate-200 rounded-lg my-4 bg-slate-50/50 break-inside-avoid space-y-2">
                  <h4 className="font-bold font-sans text-xs text-slate-900">📋 EXAMPLE: {ex.title}</h4>
                  {ex.scenario && (
                    <div className="text-xs text-slate-700">
                      <strong>Scenario: </strong>{renderFormattedText(ex.scenario)}
                    </div>
                  )}
                  {ex.working && (
                    <div className="text-xs text-slate-650 italic">
                      <strong>Working: </strong>{renderFormattedText(ex.working)}
                    </div>
                  )}
                  {ex.answer && (
                    <div className="text-xs text-slate-800 bg-white p-2 border border-slate-100 rounded">
                      <strong>Treatment: </strong>{renderFormattedText(ex.answer)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* FAQs */}
          {data.faqs && data.faqs.length > 0 && (
            <div>
              <h2 className="text-lg font-bold font-sans border-b border-slate-200 pb-1 mt-8 uppercase tracking-wide">5. Frequently Asked Questions</h2>
              {data.faqs.map((faq: any, fIdx: number) => (
                <div key={fIdx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg my-4 break-inside-avoid">
                  <h4 className="font-bold font-sans text-xs text-slate-900 mb-1">❓ Q: {faq.question}</h4>
                  <div className="text-xs text-slate-700 leading-normal">{renderFormattedText(faq.answer)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Document Footer */}
      <div className="border-t border-slate-300 pt-4 text-center text-[10px] text-slate-500 font-sans mt-12 print:mt-8">
        <div>Generated from Accounts.One on {new Date().toLocaleDateString()}</div>
        <div className="mt-0.5">© Accounts.One statutory guidance reference. All rights reserved.</div>
      </div>
    </div>
  )
}
