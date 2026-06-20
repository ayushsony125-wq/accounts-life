const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../app/HomePageClient.tsx')
const content = fs.readFileSync(filePath, 'utf-8')
const lines = content.split('\n')

lines.forEach((line, index) => {
  if (line.includes('pb-') || line.includes('min-h') || line.includes('padding') || line.includes('margin') || line.includes('flex-grow') || line.includes('flex-1')) {
    console.log(`${index + 1}: ${line.trim()}`)
  }
})
