// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


// cypress/support/e2e.js

// This will catch uncaught exceptions and prevent them from failing the test
Cypress.on('uncaught:exception', (err, runnable) => {
    // If the error message contains 'pca is not defined', ignore it
    if (err.message.includes('pca is not defined')) {
      // returning false here prevents Cypress from failing the test
      return false;
    }
    // Allow other errors to fail the test
    return true;
  });
  