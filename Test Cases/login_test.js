Feature('login');

Scenario('Login Test',  ({ I }) => {
I.amOnPage("https://www.amazon.in/");
I.wait(5);
});
