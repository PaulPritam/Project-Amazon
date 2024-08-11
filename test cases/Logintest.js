const { expect } = require('chai');
const { assert } = require('chai');


Feature('Feature 1: Verify login');

Before(({ I }) => {
    console.log("Step 1: Launch the browser and navigate to Amazon")
    I.amOnPage('https://www.amazon.in/');
});

Scenario('Test 1: Check login functionalities', async ({ I }) => {
    console.log("Hovering over sign in ")
    const accountListBtn = locate("//span[text() = 'Account & Lists']");
    I.moveCursorTo(accountListBtn);
    const signInBtn = locate("//div[@id='nav-flyout-ya-signin']//a//child::span[text() = 'Sign in']");
    I.waitForClickable(signInBtn);
    I.click(signInBtn);
    console.log("Clicked on sign in button, awaiting navigation to login page and continue button to be displayed");

    const continueBtn = locate("//input[@id='continue']")
    I.waitForClickable(continueBtn);
    const actualSignInText = await I.grabTextFrom("//h1[contains(text(), 'Sign in')]");
    console.log(".." + actualSignInText + "..");
    expect(actualSignInText).to.include('Sign in');

    console.log("Step 2: Locate the Username & Password. ")
    const inputId = await locate("//input[@id='ap_email']");
    console.log("Log in id located");
    I.fillField(inputId, '9874563215');
    I.click(continueBtn);

    const inputPassword = await locate("//input[@id='ap_password']")
    console.log("Log in password located");
});

