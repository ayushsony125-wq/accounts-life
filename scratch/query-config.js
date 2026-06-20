const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()
p.homepageConfig.findUnique({
  where: { key: 'homepage_layout_config' }
})
  .then((config) => {
    console.log('--- CONFIG START ---')
    console.log(JSON.stringify(config, null, 2))
    console.log('--- CONFIG END ---')
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
