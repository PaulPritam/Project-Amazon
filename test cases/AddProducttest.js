const { expect } = require('chai');
const { assert } = require('chai');


Feature('Feature 2: Find a Product and add it to the cart');


Before(({ I }) => {
    I.amOnPage('https://www.amazon.in/');
});

async function addItem(I, item) {
    console.log("Searching for an item in Amazon");
    const inputSearchBar = await locate("//input[@id='twotabsearchtextbox']");
    await I.fillField(inputSearchBar, item);
    I.pressKey('Enter');
    console.log("Clicked enter after item name input");
}

Scenario('Test 2: Find a Product and add it to the cart', async ({ I }) => {
    console.log("Step 3: Find a Product and add it to the cart")
    await addItem(I, "ipad pro");

    console.log("Verifying if the searched item has taken to a proper page");
    const ipadTextPresent = await I.grabTextFrom("//span[text() = 'iPad Pro. The ultimate iPad experience.']//following-sibling::span");
    expect(ipadTextPresent).include("iPad Pro. The ultimate iPad experience.");
    console.log("Expected item is added and displayed in the search result");

    const cartQuantityInital = await I.grabTextFrom("//div[@id='nav-cart-count-container']");
    console.log("Verifying the count of products initially should be zero: " + cartQuantityInital);
    expect(cartQuantityInital).to.include('0');

    const addToCartBtn = await locate("(//span[contains(text() , 'Apple iPad Pro 11')]//ancestor::div//following-sibling::div//child::button[text() = 'Add to cart'])[1]");
    await I.click(addToCartBtn);

    I.wait(3);
    const cartQuantityFinal = await I.grabTextFrom("//div[@id='nav-cart-count-container']");
    console.log("Verifying the count of products finally should be one after adding an item: " + cartQuantityFinal);
    expect(cartQuantityFinal).to.include('1');

    console.log("Step 4: Go back to the Home Page.")
    const amazonLogo = await locate("//a[@id='nav-logo-sprites']");
    I.click(amazonLogo);

    console.log("Step 5: Verify the Cart on the Home Page");
    const cartQuantityAfterNavigation = await I.grabTextFrom("//div[@id='nav-cart-count-container']");
    console.log("Verifying the count of products after navigating to home page: " + cartQuantityAfterNavigation);
    expect(cartQuantityAfterNavigation).to.include('1');

});
