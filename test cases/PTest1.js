const PageObjectFuncTest = require('../Pages/PageObjectFuncTest'); // Import the Page Object

Feature('E-Commerce Flow');

Scenario('Test 3: Complete shopping flow', async ({ I }) => {
  await PageObjectFuncTest.completeFlow('https://www.amazon.in/' , 'ipad');
  
});