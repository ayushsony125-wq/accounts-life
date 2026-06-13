import type { Metadata } from 'next'
import LearningPortal from '../learning/page'

export const metadata: Metadata = {
  title: 'Ind AS Standards — IFRS-Converged Indian Accounting Standards',
  description:
    'Indian Accounting Standards (Ind AS) converged with IFRS — applicable to listed companies and large entities. Recognition, measurement, presentation, and disclosure requirements.',
  alternates: { canonical: '/standards/ind-as' },
}

export default function IndASPage() {
  return <LearningPortal defaultFramework="Ind AS" />
}
