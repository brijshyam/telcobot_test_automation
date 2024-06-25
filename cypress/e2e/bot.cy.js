import prompts from '../prompts/elegoo_prompts.json';
import moment from 'moment';

describe('Bot Testing', () => {
  let resultsFile;
  let totalTime = 0;

  before(() => {
    const baseUrl = Cypress.config('baseUrl');
    const baseUrlPath = baseUrl.replace('https://www.fifthelement.ai/', '');
    const formattedBaseUrlPath = baseUrlPath.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    resultsFile = `${formattedBaseUrlPath}_responses_${moment().format('YYYYMMDD_HHmmss')}.json`;

    cy.task('writeResult', { filename: resultsFile, data: [] });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('#open-launcher', { timeout: 20000 }).should('be.visible').click();
  });

  prompts.forEach((item) => {
    it(`Testing prompt: ${item.prompt}`, () => {
      const startTime = new Date().getTime(); 

      cy.get('.rcw-new-message', { timeout: 10000 }).should('be.visible');
      cy.get('.rcw-new-message').type(item.prompt);
      cy.get('#chat-send-icon').click();

      cy.get('.thumbs-down-icon', { timeout: 20000 }).should('be.visible').then(() => {
        const responseTime = new Date().getTime(); 
        const timeTaken = responseTime - startTime;
        totalTime += timeTaken; 

        cy.screenshot();
        cy.get('.rcw-message').last().invoke('text').then((response) => {
          cy.log(`Prompt: ${item.prompt}`);
          cy.log(`Response: ${response}`);
          cy.task('writeResult', { filename: resultsFile, data: { prompt: item.prompt, response, timeTaken: timeTaken / 1000 } }); // Store timeTaken in seconds
        });
      });
    });
  });

  after(() => {
    cy.log(`Total time taken for all test cases: ${totalTime / 1000} seconds`); 
  });
});
