//including puppeteer package
const puppeteer = require('puppeteer');

// describe a test and give a name
describe("Github login", () => {

    // define two variable
    let browser;
    let page;

    // writing as a false headless feature of puppeteer because we want to see that opening the browser
    // beforeAll methods defines the operations that are started running the test
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        // open a new page and wait until all contents are loading
        page = await browser.newPage();
        await page.goto("https://github.com/login", { waitUntil: "domcontentloaded" });
    });

   //we want to wait after two sn for each test
    afterEach(async () => {
        await page.waitFor(2000);
    });
   //we want to close the page and browser after the ending all tests
    afterAll(async () => {
        await page.close();
        await browser.close();
    });
    // writing the test for checking the page title
    // we used to expect and toBe functions that are means this title equals to the expected title
    test("The title of the page should be Sign in to GitHub · GitHub", async () => {
        const expectedPageTitle = "Sign in to GitHub · GitHub";
        const title = await page.title();
        expect(title).toBe(expectedPageTitle);
    });
    // by looking at the source of the GitHub Login page, we determined how to access the e-mail address and password entries
    // writing the test clicking the inputs and fill the input fields and clicking the Enter button
    test("Type e-mail and password field, then press Enter", async () => {
        const emailField = "#login_field";
        await page.click(emailField);
        await page.type(emailField, "test@gmail.com");

        const passwordField = "#password";
        await page.click(passwordField);
        await page.type(passwordField, "123123");

        await page.keyboard.press('Enter');
    });
    // if the login is successful the page title equals to "Github"
    test("The title of the page should be GitHub", async() => {
        const expectedPageTitle = "GitHub";
        const title = await page.title();
        expect(title).toBe(expectedPageTitle);
    });

});