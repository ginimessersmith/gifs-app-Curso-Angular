const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config()
const targetPath = './src/environments/environment.ts'
const envFileContent = `
export const environment = {
  gif_api_key:"${process.env.GIFPHY_API_KEY}",
}
`
mkdirSync('./src/environments', { recursive: true })
writeFileSync(targetPath,envFileContent)






