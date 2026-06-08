import type { EntryIllustration } from '@/lib/types'

interface ExampleBlockProps {
  illustration: EntryIllustration
  index?: number
}

const DIFFICULTY_CLS: Record<string, string> = {
  BEGINNER: 'bg-[#E8F7EE] text-[#1A7A4A]',
  INTERMEDIATE: 'bg-[#EEF2FD] text-[#2D5BE3]',
  ADVANCED: 'bg-[#FEF6E4] text-[#B45309]',
}

const DIFFICULTY_LABEL: Record<string, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
}

export default function ExampleBlock({ illustration, index }: ExampleBlockProps) {
  const diffCls = DIFFICULTY_CLS[illustration.illusDifficulty] ?? 'bg-[#F4F3F0] text-[#4A4A52]'
  const diffLabel = DIFFICULTY_LABEL[illustration.illusDifficulty] ?? illustration.illusDifficulty

  return (
    <div className="rounded-lg border border-[#E2E1DD] overflow-hidden my-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F4F3F0] border-b border-[#E2E1DD]">
        <div className="flex items-center gap-3">
          {index != null && (
            <span className="text-xs font-bold text-[#76767E] uppercase tracking-widest">
              Illustration {index + 1}
            </span>
          )}
          <span className="text-sm font-semibold text-[#1C1C1E]">
            {illustration.illusTitle}
          </span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diffCls}`}>
          {diffLabel}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Scenario */}
        {illustration.illusScenario && (
          <div>
            <p className="text-xs font-semibold text-[#76767E] uppercase tracking-widest mb-2">
              Scenario
            </p>
            <p className="text-sm text-[#1C1C1E] font-reading leading-relaxed">
              {illustration.illusScenario}
            </p>
          </div>
        )}

        {/* Working */}
        {illustration.illusWorking && (
          <div>
            <p className="text-xs font-semibold text-[#76767E] uppercase tracking-widest mb-2">
              Working
            </p>
            <div className="bg-[#FAFAF8] border border-[#E2E1DD] rounded-md p-3">
              <pre className="text-sm font-mono-je text-[#1C1C1E] whitespace-pre-wrap leading-relaxed">
                {illustration.illusWorking}
              </pre>
            </div>
          </div>
        )}

        {/* Answer */}
        {illustration.illusAnswer && (
          <div>
            <p className="text-xs font-semibold text-[#76767E] uppercase tracking-widest mb-2">
              Answer
            </p>
            <p className="text-sm text-[#1C1C1E] font-reading leading-relaxed">
              {illustration.illusAnswer}
            </p>
          </div>
        )}

        {/* Note */}
        {illustration.illusNote && (
          <p className="text-xs text-[#76767E] italic leading-relaxed border-t border-[#E2E1DD] pt-3">
            {illustration.illusNote}
          </p>
        )}

        {/* Para ref */}
        {illustration.illusParaRef && (
          <p className="text-xs text-[#A0A0A8] font-medium">
            Ref: Para {illustration.illusParaRef}
          </p>
        )}
      </div>
    </div>
  )
}
