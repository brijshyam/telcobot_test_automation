import { defineConfig } from 'cypress';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        writeResult({ filename, data }) {
          const filepath = path.join(__dirname, 'cypress/results', filename);
          fs.ensureFileSync(filepath);
          let existingData = [];
          try {
            existingData = fs.readJsonSync(filepath);
          } catch (err) {
            // File might not exist yet, which is fine
          }
          existingData.push(data);
          fs.writeJsonSync(filepath, existingData);
          return null;
        }
      });
    },
    baseUrl: 'https://www.fifthelement.ai/elegoo-landing',
    supportFile: 'cypress/support/e2e.js' 
  },
});

