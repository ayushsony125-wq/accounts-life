import { getEntryById } from './lib/queries.ts'
const entry = await getEntryById(10)
if (entry) {
  console.log('Query returned entry. entrySlug:', entry.entrySlug)
  console.log('Has entryBody:', !!entry.entryBody)
  if (entry.entryBody) {
    console.log('entryBody keys:', Object.keys(entry.entryBody))
    console.log('has blocks:', !!entry.entryBody.blocks)
    console.log('has examplesHtml:', !!entry.entryBody.examplesHtml)
    console.log('examplesHtml length:', entry.entryBody.examplesHtml ? entry.entryBody.examplesHtml.length : 0)
    console.log('examplesHtml sample:', entry.entryBody.examplesHtml ? entry.entryBody.examplesHtml.substring(0, 200) : 'NONE')
  }
} else {
  console.log('No entry found via getEntryById(10)')
}
process.exit(0)
