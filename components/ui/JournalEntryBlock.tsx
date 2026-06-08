'use client'

import { useState, useCallback } from 'react'
import { Copy, Check, ImageIcon } from 'lucide-react'
import { formatIndianCurrency } from '@/lib/utils'
import type { EntryJournalEntry, JournalEntryRow } from '@/lib/types'

interface JournalEntryBlockProps {
  journalEntry: EntryJournalEntry
  /** Show copy-as-text and copy-as-image actions. Default: true */
  showCopyActions?: boolean
}

export default function JournalEntryBlock({
  journalEntry,
  showCopyActions = true,
}: JournalEntryBlockProps) {
  const [textCopied, setTextCopied] = useState(false)
  const [imgCopied, setImgCopied] = useState(false)
  const blockId = `je-${journalEntry.id}`

  // ── Copy as plain text ──────────────────────────────────────────────────
  const handleCopyText = useCallback(async () => {
    if (!journalEntry.rows) return
    const lines: string[] = []

    if (journalEntry.jeScenarioTitle) {
      lines.push(journalEntry.jeScenarioTitle)
      lines.push('─'.repeat(60))
    }

    lines.push(
      padRight('Particulars', 38) + padLeft('Dr (₹)', 12) + padLeft('Cr (₹)', 12)
    )
    lines.push('─'.repeat(62))

    journalEntry.rows.forEach((row) => {
      if (row.rowType === 'SEPARATOR') {
        lines.push('─'.repeat(62))
        return
      }
      const accountName = row.rowType === 'CR' ? `  ${row.accountName ?? ''}` : (row.accountName ?? '')
      const dr = row.drAmount != null ? formatIndianCurrency(row.drAmount) : ''
      const cr = row.crAmount != null ? formatIndianCurrency(row.crAmount) : ''
      if (row.rowType === 'TOTAL') {
        lines.push('─'.repeat(62))
        lines.push(padRight(accountName, 38) + padLeft(dr, 12) + padLeft(cr, 12))
      } else {
        lines.push(padRight(accountName, 38) + padLeft(dr, 12) + padLeft(cr, 12))
      }
    })

    if (journalEntry.jeNarration) {
      lines.push('')
      lines.push(`(Being ${journalEntry.jeNarration})`)
    }

    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setTextCopied(true)
      setTimeout(() => setTextCopied(false), 2000)
    } catch {
      /* silent */
    }
  }, [journalEntry])

  // ── Copy as image (lazy-loaded html2canvas) ─────────────────────────────
  const handleCopyImage = useCallback(async () => {
    const el = document.getElementById(blockId)
    if (!el) return
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, { scale: 2, useCORS: true })
      canvas.toBlob(async (blob) => {
        if (!blob) return
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ])
          setImgCopied(true)
          setTimeout(() => setImgCopied(false), 2000)
        } catch {
          /* silent – browser may deny clipboard image write */
        }
      })
    } catch {
      /* html2canvas import failed */
    }
  }, [blockId])

  return (
    <div id={blockId} className="je-block my-6" aria-label={journalEntry.jeScenarioTitle ?? 'Journal Entry'}>
      {/* Header row */}
      <div className="je-block-header">
        <div className="min-w-0">
          {journalEntry.jeScenarioTitle && (
            <p className="text-sm font-semibold text-[#1C1C1E] truncate">
              {journalEntry.jeScenarioTitle}
            </p>
          )}
          {journalEntry.jeLabel && (
            <p className="text-xs text-[#76767E] mt-0.5">{journalEntry.jeLabel}</p>
          )}
          {journalEntry.jeParaRef && (
            <p className="text-xs text-[#A0A0A8] mt-0.5">Para {journalEntry.jeParaRef}</p>
          )}
        </div>

        {showCopyActions && (
          <div className="flex items-center gap-1 shrink-0 ml-4">
            <button
              onClick={handleCopyText}
              title="Copy as text"
              aria-label="Copy journal entry as text"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#4A4A52] rounded hover:bg-[#EEECEA] transition-colors"
            >
              {textCopied ? (
                <Check size={13} className="text-[#1A7A4A]" />
              ) : (
                <Copy size={13} />
              )}
              {textCopied ? 'Copied' : 'Text'}
            </button>
            <button
              onClick={handleCopyImage}
              title="Copy as image"
              aria-label="Copy journal entry as image"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#4A4A52] rounded hover:bg-[#EEECEA] transition-colors"
            >
              {imgCopied ? (
                <Check size={13} className="text-[#1A7A4A]" />
              ) : (
                <ImageIcon size={13} />
              )}
              {imgCopied ? 'Copied' : 'Image'}
            </button>
          </div>
        )}
      </div>

      {/* Category heading */}
      {journalEntry.jeCategoryHeading && (
        <div className="px-4 py-2 bg-[#F4F3F0] border-b border-[#E2E1DD]">
          <p className="text-xs font-semibold text-[#4A4A52] uppercase tracking-wider">
            {journalEntry.jeCategoryHeading}
          </p>
        </div>
      )}

      {/* Ledger table */}
      {journalEntry.rows && journalEntry.rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="je-table" aria-label="Double-entry ledger">
            <thead>
              <tr>
                <th className="w-full">Particulars</th>
                <th className="whitespace-nowrap">Dr (₹)</th>
                <th className="whitespace-nowrap">Cr (₹)</th>
              </tr>
            </thead>
            <tbody>
              {journalEntry.rows.map((row) => renderRow(row))}
            </tbody>
          </table>
        </div>
      )}

      {/* Narration */}
      {journalEntry.jeNarration && (
        <div className="je-narration">
          <span className="text-[#A0A0A8]">(Being </span>
          {journalEntry.jeNarration}
          <span className="text-[#A0A0A8]">)</span>
        </div>
      )}
    </div>
  )
}

// ── Row renderer ─────────────────────────────────────────────────────────────

function renderRow(row: JournalEntryRow) {
  if (row.rowType === 'SEPARATOR') {
    return (
      <tr key={row.id} aria-hidden="true">
        <td colSpan={3} className="border-t border-[#E2E1DD] h-0 p-0" />
      </tr>
    )
  }

  const isCr = row.rowType === 'CR'
  const isTotal = row.rowType === 'TOTAL'

  return (
    <tr
      key={row.id}
      className={
        isTotal
          ? 'je-row-total'
          : isCr
          ? 'je-row-cr'
          : 'je-row-dr'
      }
    >
      <td className="py-1.5 px-4">
        {isCr ? (
          <span className="pl-6 italic text-[#4A4A52]">{row.accountName} A/c</span>
        ) : isTotal ? (
          <span className="font-semibold">{row.accountName ?? 'Total'}</span>
        ) : (
          <span>{row.accountName} A/c &nbsp;<span className="text-[#76767E] font-normal">…Dr</span></span>
        )}
      </td>
      <td className="je-row-amount py-1.5 px-4 whitespace-nowrap">
        {row.drAmount != null ? formatIndianCurrency(Number(row.drAmount)) : ''}
      </td>
      <td className="je-row-amount py-1.5 px-4 whitespace-nowrap">
        {row.crAmount != null ? formatIndianCurrency(Number(row.crAmount)) : ''}
      </td>
    </tr>
  )
}

// ── Text formatting helpers ───────────────────────────────────────────────────

function padRight(str: string, len: number): string {
  return str.length >= len ? str.slice(0, len) : str + ' '.repeat(len - str.length)
}

function padLeft(str: string, len: number): string {
  return str.length >= len ? str.slice(0, len) : ' '.repeat(len - str.length) + str
}
