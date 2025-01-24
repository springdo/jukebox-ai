import { defineConfig } from 'cypress'
import { resolve } from 'path'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: false,
    screenshotOnRunFailure: false,
    experimentalSessionAndOrigin: true,
    testIsolation: false
  },
  
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        configFile: resolve(__dirname, 'client/vite.config.ts'),
      },
    },
  },

  env: {
    tsConfig: resolve(__dirname, 'cypress/tsconfig.json')
  }
})