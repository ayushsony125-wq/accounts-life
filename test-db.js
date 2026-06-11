const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()
p.$connect()
  .then(() => {
    console.log('✅ DB connected OK')
    return p.domain.count()
  })
  .then(c => {
    console.log('✅ Domain count:', c)
    return p.$disconnect()
  })
  .catch(e => {
    console.error('❌ DB ERROR:', e.message)
    p.$disconnect()
    process.exit(1)
  })
