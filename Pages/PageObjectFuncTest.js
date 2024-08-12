const { I } = inject();
const { expect } = require('chai');
const { assert } = require('chai');

class PageObjectFuncTest {
  async navigate(url) {
    I.amOnPage(url);
  }

  async login() {
    await I.click("//span[text() = 'Account & Lists']");
    await I.fillField('#ap_email', username);
    await I.click("//input[@id='continue']");
    await I.fillField('#ap_password', password);
  }

  async addItemAndCheckCartQuantity(itemName) {
    console.log("Searching for an item in Amazon");
    const inputSearchBar = await locate("//input[@id='twotabsearchtextbox']");
    await I.fillField(inputSearchBar, itemName);
    I.pressKey('Enter');
    console.log("Clicked enter after item name input");

    const cartQuantityInital = await I.grabTextFrom("//div[@id='nav-cart-count-container']");
    console.log("Verifying the count of products initially should be zero: " + cartQuantityInital);
    expect(cartQuantityInital).to.include('0');

    I.wait(2);
    const itemList = await I.grabTextFromAll("//h2//span[contains(text() , 'iPad Pro')]");

    for (let text of itemList) {
      const textToLowerCase =  text.toLowerCase();
      const itemToLowerCase = itemName.toLowerCase();
      if (textToLowerCase.includes(itemToLowerCase)) {
       const addToCartBtn = await locate("(//button[text() = 'Add to cart'])[1]");
       I.click(addToCartBtn);
       break;
      }
    }

    I.wait(3);
    const cartQuantityFinal = await I.grabTextFrom("//div[@id='nav-cart-count-container']");
    console.log("Verifying the count of products finally should be one after adding an item: " + cartQuantityFinal);
    expect(cartQuantityFinal).to.include('1');

  }

  async completeFlow(url, item) {
    await this.navigate(url);
    // await this.login(username, password); 
    await this.addItemAndCheckCartQuantity(item);
  }
}
module.exports = new PageObjectFuncTest();