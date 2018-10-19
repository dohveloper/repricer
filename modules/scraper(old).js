const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key, until } = require('selenium-webdriver');
const LOGIN_ID = require('../config/login.js').id;
const LOGIN_PW = require('../config/login.js').password;
const cheerio = require('cheerio');
const request = require('request');

/*
items = [
 {
  name: ,
  mallID: ,
  comparisonID: ,
  salePrice: ,
  lowestPrice:
  }
  {
    name: ,
    mallID: ,
    comparisonID: ,
    salePrice: ,
    lowestPrice:
  }
]
*/

class Scraper {
  let driver;

  Scraper(){

    //1.드라이버셋업

    //2.로그인

  }


  async scrap() {
    return new Promise(async function(resolve, reject) {


      // html
      await driver.wait(
        until.elementLocated(
          By.xpath('//*[@id="11462492433"]/td[2]/div[2]/strong/span')
        ),
        10000
      );

      let html = await driver.getPageSource();
      console.log('...html 가져오기');

      //파싱
      let htmlData = new Object();
      let i;
      let tempItem;
      let $ = await cheerio.load(html);

      htmlData.names = await $('td.prdt_name > div.dsc > strong > span');
      driver.sleep(10000);
      htmlData.mallIDs = await $('td:nth-child(3) > div > p.mall');
      htmlData.salePrices = await $('td:nth-child(7)');
      htmlData.comparisonIDs = await $('td:nth-child(10) > a');
      htmlData.lowestPricesArr = [];
      htmlData.comparisonIDsArr = [];

      //names, mallIDs,salePrices 구하기

      //comparisonIDsArr 구하기
      for (i = 0; i < htmlData.names.length; i++) {
        htmlData.comparisonIDsArr[i] =
          htmlData.comparisonIDs[i].children[0].data;
      }

      //comparisonIDsArr 이용하여 lowestPricesArr 구하고
      //그 이후에 htmlData를 이용하여 최종 Items 구하기
      getLowestPricesArr(htmlData).then(
        () => {
          let items = htmlDataToItems(htmlData);
          console.log('...모든 상품정보 가져오기 완료 ');
          resolve(items);
        },
        () => {
          console.log('err' + error);
          reject('error');
        }
      );
    });
  }
}

function getLowestPricesArr(htmlData) {
  return new Promise(function(resolve, reject) {
    let i = 0;

    htmlData.comparisonIDsArr.map((comparisonID, index) => {
      let comparisonURL =
        'https://search.shopping.naver.com/detail/detail.nhn?nv_mid=' +
        comparisonID;

      request(comparisonURL, (error, response, body) => {
        if (!error) {
          let $ = cheerio.load(body);
          let lowestPrice = $(
            '#_mainSummaryPrice > div.price_area > span > em'
          ).text();
          htmlData.lowestPricesArr[index] = lowestPrice;
          if (i == htmlData.names.length - 1) {
            resolve('success');
          }
          i++;
        } else {
          console.log('에러:' + error);
          reject('rejected');
        }
      });
    });
  });
}

function htmlDataToItems(htmlData) {
  let items = [];
  for (let i = 0; i < htmlData.names.length; i++) {
    items.push({
      name: htmlData.names[i].attribs.title,
      mallID: htmlData.mallIDs[i].children[0].data.replace(/[^0-9]/g, ''),
      comparisonID: htmlData.comparisonIDsArr[i].replace(/[^0-9]/g, ''),
      salePrice: htmlData.salePrices[i].children[0].data.replace(/[^0-9]/g, ''),
      lowestPrice: htmlData.lowestPricesArr[i].replace(/[^0-9]/g, '')
    });
  }
  //items Array 출력
  let n = 1;
  items.forEach(item => {
    console.log(n);
    console.log(' 상품명 : ' + item.name);
    console.log(' mallID : ' + item.mallID);
    console.log(' comparisonID : ' + item.comparisonID);
    console.log(' 판매가 : ' + item.salePrice);
    console.log(' 최저가 : ' + item.lowestPrice);
    n++;
  });

  return items;
}

module.exports = new Scraper();
