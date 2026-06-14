'use client'

import { useState, useRef } from 'react'
import { uploadPdfAction } from './actions'
import { FileText, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const STANDARDS_LIST = [
  // AS
  { id: 'as-1', label: 'AS 1 – Disclosure of Accounting Policies' },
  { id: 'as-2', label: 'AS 2 – Valuation of Inventories' },
  { id: 'as-3', label: 'AS 3 – Cash Flow Statements' },
  { id: 'as-4', label: 'AS 4 – Contingencies & Events occurring after Balance Sheet' },
  { id: 'as-5', label: 'AS 5 – Net Profit or Loss, Prior Period Items & Changes' },
  { id: 'as-7', label: 'AS 7 – Construction Contracts' },
  { id: 'as-9', label: 'AS 9 – Revenue Recognition' },
  { id: 'as-10', label: 'AS 10 – Property, Plant and Equipment' },
  { id: 'as-11', label: 'AS 11 – Effects of Changes in Foreign Exchange Rates' },
  { id: 'as-12', label: 'AS 12 – Accounting for Government Grants' },
  { id: 'as-13', label: 'AS 13 – Accounting for Investments' },
  { id: 'as-14', label: 'AS 14 – Accounting for Amalgamations' },
  { id: 'as-15', label: 'AS 15 – Employee Benefits' },
  { id: 'as-16', label: 'AS 16 – Borrowing Costs' },
  { id: 'as-17', label: 'AS 17 – Segment Reporting' },
  { id: 'as-18', label: 'AS 18 – Related Party Disclosures' },
  { id: 'as-19', label: 'AS 19 – Leases' },
  { id: 'as-20', label: 'AS 20 – Earnings Per Share' },
  { id: 'as-21', label: 'AS 21 – Consolidated Financial Statements' },
  { id: 'as-22', label: 'AS 22 – Accounting for Taxes on Income' },
  { id: 'as-23', label: 'AS 23 – Investments in Associates in Consolidated Fin Stmts' },
  { id: 'as-24', label: 'AS 24 – Discontinuing Operations' },
  { id: 'as-25', label: 'AS 25 – Interim Financial Reporting' },
  { id: 'as-26', label: 'AS 26 – Intangible Assets' },
  { id: 'as-27', label: 'AS 27 – Financial Reporting of Interests in Joint Ventures' },
  { id: 'as-28', label: 'AS 28 – Impairment of Assets' },
  { id: 'as-29', label: 'AS 29 – Provisions, Contingent Liabilities & Contingent Assets' },

  // Ind AS
  { id: 'ind-as-1', label: 'Ind AS 1 – Presentation of Financial Statements' },
  { id: 'ind-as-2', label: 'Ind AS 2 – Inventories' },
  { id: 'ind-as-7', label: 'Ind AS 7 – Statement of Cash Flows' },
  { id: 'ind-as-8', label: 'Ind AS 8 – Accounting Policies, Changes & Errors' },
  { id: 'ind-as-10', label: 'Ind AS 10 – Events after the Reporting Period' },
  { id: 'ind-as-12', label: 'Ind AS 12 – Income Taxes' },
  { id: 'ind-as-16', label: 'Ind AS 16 – Property, Plant and Equipment' },
  { id: 'ind-as-19', label: 'Ind AS 19 – Employee Benefits' },
  { id: 'ind-as-20', label: 'Ind AS 20 – Accounting for Govt Grants & Disclosure' },
  { id: 'ind-as-21', label: 'Ind AS 21 – Effects of Changes in FX Rates' },
  { id: 'ind-as-23', label: 'Ind AS 23 – Borrowing Costs' },
  { id: 'ind-as-24', label: 'Ind AS 24 – Related Party Disclosures' },
  { id: 'ind-as-27', label: 'Ind AS 27 – Separate Financial Statements' },
  { id: 'ind-as-28', label: 'Ind AS 28 – Investments in Associates and Joint Ventures' },
  { id: 'ind-as-29', label: 'Ind AS 29 – Financial Reporting in Hyperinflationary' },
  { id: 'ind-as-32', label: 'Ind AS 32 – Financial Instruments: Presentation' },
  { id: 'ind-as-33', label: 'Ind AS 33 – Earnings Per Share' },
  { id: 'ind-as-34', label: 'Ind AS 34 – Interim Financial Reporting' },
  { id: 'ind-as-36', label: 'Ind AS 36 – Impairment of Assets' },
  { id: 'ind-as-37', label: 'Ind AS 37 – Provisions, Contingent Liabilities & Assets' },
  { id: 'ind-as-38', label: 'Ind AS 38 – Intangible Assets' },
  { id: 'ind-as-40', label: 'Ind AS 40 – Investment Property' },
  { id: 'ind-as-41', label: 'Ind AS 41 – Agriculture' },
  { id: 'ind-as-101', label: 'Ind AS 101 – First-time Adoption' },
  { id: 'ind-as-102', label: 'Ind AS 102 – Share-based Payment' },
  { id: 'ind-as-103', label: 'Ind AS 103 – Business Combinations' },
  { id: 'ind-as-105', label: 'Ind AS 105 – Non-current Assets Held for Sale & Discont' },
  { id: 'ind-as-106', label: 'Ind AS 106 – Exploration & Evaluation of Minerals' },
  { id: 'ind-as-107', label: 'Ind AS 107 – Financial Instruments: Disclosures' },
  { id: 'ind-as-108', label: 'Ind AS 108 – Operating Segments' },
  { id: 'ind-as-109', label: 'Ind AS 109 – Financial Instruments' },
  { id: 'ind-as-110', label: 'Ind AS 110 – Consolidated Financial Statements' },
  { id: 'ind-as-111', label: 'Ind AS 111 – Joint Arrangements' },
  { id: 'ind-as-112', label: 'Ind AS 112 – Disclosure of Interests in Other Entities' },
  { id: 'ind-as-113', label: 'Ind AS 113 – Fair Value Measurement' },
  { id: 'ind-as-114', label: 'Ind AS 114 – Regulatory Deferral Accounts' },
  { id: 'ind-as-115', label: 'Ind AS 115 – Revenue from Contracts with Customers' },
  { id: 'ind-as-116', label: 'Ind AS 116 – Leases' },
  { id: 'ind-as-117', label: 'Ind AS 117 – Insurance Contracts' }
]

export default function DirectPdfUpload() {
  const [selectedStandard, setSelectedStandard] = useState(STANDARDS_LIST[0].id)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setStatus('error')
        setMessage('Validation Error: Only PDF files (.pdf) are allowed.')
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }
      setSelectedFile(file)
      setStatus('idle')
      setMessage('')
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      setStatus('error')
      setMessage('Validation Error: Please select a PDF file first.')
      return
    }

    setStatus('loading')
    setMessage('Uploading file and updating standard mapping...')

    const formData = new FormData()
    formData.append('pdfFile', selectedFile)
    formData.append('entrySlug', selectedStandard)

    try {
      const res = await uploadPdfAction(formData)
      if (res.success) {
        setStatus('success')
        setMessage(`Successfully uploaded and mapped! PDF is saved at ${res.url}`)
        if (res.warning) {
          setMessage((prev) => `${prev} (Warning: ${res.warning})`)
        }
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        setStatus('error')
        setMessage(res.error || 'Server returned an unknown error.')
      }
    } catch (err: any) {
      setStatus('error')
      setMessage(`Network or Server Error: ${err.message || String(err)}`)
    }
  }

  return (
    <div className="bg-white border border-[#E2E1DD] rounded-lg p-6 shadow-xs space-y-4">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E] flex items-center gap-1.5">
          <Upload size={16} className="text-[#2D5BE3]" />
          Direct Accounting Standard PDF Document Uploader
        </h2>
        <p className="text-xs text-[#76767E] mt-0.5">
          Upload and map a PDF file directly to a specific Accounting Standard. This file will be rendered exactly as-is in the user portal.
        </p>
      </div>

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dropdown Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1">
              Select Accounting Standard *
            </label>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full bg-[#F4F3F0] border border-[#E2E1DD] rounded-md px-3 py-2 text-xs text-[#1C1C1E] focus:outline-none focus:border-[#2D5BE3]"
            >
              {STANDARDS_LIST.map((std) => (
                <option key={std.id} value={std.id}>
                  {std.label}
                </option>
              ))}
            </select>
          </div>

          {/* File Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#76767E] mb-1">
              Choose PDF File *
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="direct-pdf-file-picker"
              />
              <label
                htmlFor="direct-pdf-file-picker"
                className="flex items-center justify-center gap-1.5 px-4 py-2 border border-[#E2E1DD] bg-[#FAFAF8] hover:bg-[#F4F3F0] rounded-md text-xs font-semibold text-[#1C1C1E] cursor-pointer transition-colors"
              >
                <FileText size={14} className="text-[#76767E]" />
                Choose File
              </label>
              <span className="flex-1 py-2 px-3 bg-[#F4F3F0] border border-[#E2E1DD] rounded-md text-xs text-[#76767E] truncate font-mono">
                {selectedFile ? `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)` : 'No file selected'}
              </span>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {status !== 'idle' && (
          <div className={`p-3 rounded-md text-xs flex items-start gap-2 border ${
            status === 'loading'
              ? 'bg-[#EEF2FD] border-[#DCE6FF] text-[#2D5BE3]'
              : status === 'success'
              ? 'bg-[#E8F7EE] border-[#C5E9D4] text-[#1A7A4A]'
              : 'bg-[#FDEEEE] border-[#F5C6C0] text-[#C0392B]'
          }`}>
            {status === 'loading' ? (
              <Loader2 size={16} className="animate-spin shrink-0 mt-0.5" />
            ) : status === 'success' ? (
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">{status === 'loading' ? 'Uploading...' : status === 'success' ? 'Upload Successful' : 'Upload Failed'}</p>
              <p className="mt-0.5 font-semibold leading-relaxed">{message}</p>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === 'loading' || !selectedFile}
            className="flex items-center gap-1.5 bg-[#2D5BE3] hover:bg-[#2450CC] text-white px-5 py-2 rounded-md text-xs font-bold transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={14} />
                <span>Upload &amp; Map PDF</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
