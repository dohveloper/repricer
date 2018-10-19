const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until } = require('selenium-webdriver');
const LOGIN_ID = require('../config/login.js').id;
const LOGIN_PW = require('../config/login.js').password;
const cheerio = require('cheerio');
const request = require('request');

function Scraper(){
  let driver;

  const driverSetup = ()=>{
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .usingServer('http://localhost:4444/wd/hub')
      .build();
    driver.get('https://sell.smartstore.naver.com/#/login');
    return driver;
  }

  const moveToStoreFarm = () =>{
    let loginId = await driver.wait(
    until.elementLocated(By.id('loginId')),10000);
    await loginId.sendKeys(LOGIN_ID);
    let loginPassword = await driver.wait(
      until.elementLocated(By.id('loginPassword')),
      10000
    );
    await loginPassword.sendKeys(LOGIN_PW);
    let loginButton = await driver.wait(
      until.elementLocated(By.id('loginButton')),
      10000
    );
    await loginButton.click();
    console.log('...로그인 성공');
  }

  const moveToShoppingPartner = () => {
    //쇼핑파트너센터로 이동
    let shoppingPartnerButton = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="_gnb_nav"]/div/ul[2]/li[1]/a')),
      10000
    );
    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="seller-content"]/ui-view/div/div/div/div/div/div/div/ul/li[4]/a/span[2]'
        )
      ),
      10000
    );
    driver.get(
      'https://adcenter.shopping.naver.com/product/manage/service/list.nhn'
    );
    driver.get(
     'https://adcenter.shopping.naver.com/product/manage/service/list.nhn'
    );

    //현재 가격비교 매칭된 리스트로 이동
    let priceMatchCompleteButton = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="statusList"]/li[3]/div/h5/a')),
      10000
    );
    await priceMatchCompleteButton.click();
    console.log('...가격비교매칭페이지로 이동');

    //리스팅 개수 100개로 변경

    let listNumber = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="pageSize"]/a')),
      10000
    );
    await listNumber.click();

    let list_100 = await driver.wait(
      until.elementLocated(By.xpath('//*[@id="pageSize"]/div/ul/li[5]/a')),
      10000
    );
    await list_100.click();
    console.log('...리스팅개수 100개로 변경');

  }

}

scraper.driverSetup();

/*
module.exports = {
   function1,
   function2,
   function3
}
*/
