import { PrismaClient } from './node_modules/@prisma/client/index.js'
const p = new PrismaClient()

const entry = await p.entry.findUnique({
  where: { id: 10 },  // as-1 entry id
  select: { id: true, entrySlug: true, entryBody: true }
})

if (entry) {
  console.log('Found entry id:', entry.id, 'slug:', entry.entrySlug)
  const b = entry.entryBody
  if (b) {
    console.log('entryBody type:', typeof b)
    console.log('has blocks:', !!(b.blocks))
    console.log('has examplesHtml:', !!(b.examplesHtml))
    console.log('examplesHtml length:', b.examplesHtml ? b.examplesHtml.length : 0)
    console.log('first 100 chars of examplesHtml:', b.examplesHtml ? b.examplesHtml.substring(0, 100) : 'NONE')
  }
} else {
  // Try finding by slug directly
  const bySlug = await p.entry.findFirst({
    where: { entrySlug: 'as-1' },
    select: { id: true, entrySlug: true, entryBody: true }
  })
  if (bySlug) {
    console.log('Found by slug - id:', bySlug.id)
    const b = bySlug.entryBody
    console.log('has examplesHtml:', !!(b && b.examplesHtml))
    console.log('examplesHtml length:', b && b.examplesHtml ? b.examplesHtml.length : 0)
  } else {
    console.log('No entry found for id=10 or slug=as-1')
  }
}

await p.$disconnect()
