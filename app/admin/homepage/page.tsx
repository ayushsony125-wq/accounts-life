import { verifyAdminSession } from '../session'
import { getHomepageConfig } from '../actions'
import HomepageConfigClient from './HomepageConfigClient'

export const dynamic = 'force-dynamic'

export default async function HomepageConfigPage() {
  await verifyAdminSession()

  const layoutConfig = await getHomepageConfig('homepage_layout_config', {})
  const footerConfig = await getHomepageConfig('footer_config', {})

  return (
    <HomepageConfigClient
      initialLayoutConfig={layoutConfig}
      initialFooterConfig={footerConfig}
    />
  )
}
