const URLS = [
    "adidas/adi2000",//0.5
    "adidas/adilette",//4
    "adidas/ae", //0.5
    "adidas/basketball", //22
    "adidas/crazy-iiinfinity", //0.1?
    "adidas/fear-of-god-athletics", //0.5
    "adidas/handball-spezial", //3
  ];
  
  const PREFIX = "https://stockx.com/ja-jp/";
  const PRODUCT_PREFIX = "https://stockx.com";
  const FIRSTSITE_PREFIX = "https://snkrdunk.com/products/";
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const googleUrl1 =
    "https://www.google.com/search?q=1++%C2%A3to+yen&sca_esv=f4c218d55768bdaf&ei=JJAoZvaDApfP2roPmOWuwAM&ved=0ahUKEwj2paeLh9qFAxWXp1YBHZiyCzgQ4dUDCBA&uact=5&oq=1++%C2%A3to+yen&gs_lp=Egxnd3Mtd2l6LXNlcnAiCzEgIMKjdG8geWVuMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIuyNQjQZYpCBwAXgBkAEAmAF7oAHjB6oBAzIuN7gBA8gBAPgBAfgBApgCCqACkQjCAgoQABiwAxjWBBhHwgIFEAAYgATCAgoQABiABBhGGIICwgIWEAAYgAQYRhiCAhiXBRiMBRjdBNgBAcICBhAAGAcYHsICCBAAGKIEGIkFwgIFECEYoAGYAwCIBgGQBgq6BgYIARABGBOSBwMxLjmgB8YS&sclient=gws-wiz-serp";
  
  const googleUrl =
    "https://www.google.com/search?q=1usd+to+yen&oq=1us&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg5MgwIAhAAGEMYgAQYigUyDggDEAAYChhDGIAEGIoFMgwIBBAAGEMYgAQYigUyBwgFEAAYgAQyCQgGEAAYChiABDIHCAcQABiABDIHCAgQABiABDIHCAkQABiPAtIBCDE0MDVqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8";
  const executeScript = (tabId, func, args = []) => {
    return new Promise((resolve, reject) => {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: func,
          args: args,
        },
        (results) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(results[0]?.result);
          }
        }
      );
    });
  };
  
  const gotoPage = async (suffix, url, tabId) => {
    const targetUrl = suffix + url;
    await chrome.tabs.update(tabId, { url: targetUrl });
  
    await new Promise((resolve) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      });
    });
  
    console.log(`Navigated to ${targetUrl}`);
  };
  
  const getPageProducts = async (tabId) => {
    const products = await executeScript(tabId, () => {
      return Array.from(
        document.querySelectorAll(".css-111hzm2-GridProductTileContainer")
      ).map((element) => element.querySelector("a").getAttribute("href"));
    });
    return products;
  };
  
  const getPageSize = async (tab_id) => {
    let result = await executeScript(tab_id, () => {
      return Array.from(
        document.body.querySelectorAll(".css-1r3f7y5-PaginationButton")
      ) //
        .map((element) => element.textContent);
    });
    if (result && result[0]?.length >= 1) {
      result = result;
      console.log(result);
  
      return result[result.length - 1];
    }
  };

  const getDetail2 = async (tabId) => {
    const result = await executeScript(tabId, () => {
      const elements = Array.from(document.body.querySelectorAll(".css-1ufjsin"));
      return elements.map((element) => [
        element.querySelector("span").textContent,
        element.querySelector("p").textContent,
      ]);
    });
    return result;
  };
  
  const getDetailFromTable = async (tab_id, className) => {
    const result = await executeScript(
      tab_id,
      (query) => {
        return Array.from(document.body.querySelectorAll(`${query}`)).map(
          (element) => element.textContent.toString()
        );
      },
      [className]
    );
    return result[0];
  };
  //product-detail-info-table
  const getsizeDetailFromTable = async (tab_id) => {
    const result = await executeScript(tab_id, () => {
      const element = document.body.querySelector(".buy-size-select-box");
      const elements = Array.from(element.querySelectorAll(".list"));
      return elements.map((element) => [
        element.querySelector(".num").textContent,
        element.querySelector(".size-price").textContent.toString().trim(),
      ]);
    });
    return result;
  };
  
  const test = async (tab_id, className) => {
    const result = await executeScript(
      tab_id,
      (query) => {
        const table = document.querySelector(query);
  
        // Get the data from the table
        const data = [];
        const rows = Array.from(table.querySelectorAll("tr"));
        rows.forEach((row) => {
          const firstCell = row.querySelector("td");
          if (firstCell) {
            const cellData = firstCell.textContent.trim();
            data.push(cellData);
          }
        });
        return data;
      },
      [className]
    );
    return result;
  };
  const getProductDescription = async (tabId) => {
    const result = await executeScript(tabId, () => {
      const p = document.querySelector(".product-name-jp");
      return p.textContent;
    });
    return result;
  };
  const getRate = async (tabId) => {
    const result = await executeScript(tabId, () => {
      const p = document.querySelector(".lWzCpb.a61j6");
      return p.value;
    });
    return result;
  };
  const getRate1 = async (tabId) => {
    const result = await executeScript(tabId, () => {
      const p = document.querySelector(".DFlfde.SwHCTb");
      return p.value;
    });
    return result;
  };
  //
  const getLowestPrice = async (tabId) => {
    const result = await executeScript(tabId, () => {
      const p = document.querySelector(".product-lowest-price");
      return p.textContent.toString().trim();
    });
    return result;
  };

  const getPrice = async (tabId) => {
    const result = await executeScript(tabId, () => {
      const p = document.querySelector(".chakra-text.css-1q8ctst");
      return p.textContent.toString().trim();
    });
    return result;
  };
  //出品待ち
  
  const ChooseNumber = (str) => {
    return parseInt(str.replace(/\D/g, ""));
  };
  
  const getMaximum = (array, index) => {
    let max = array[0][index]; // Set the initial maximum value to the first element of the first column
  
    for (let i = 1; i < array.length; i++) {
      if (array[i][index] > max) {
        max = array[i][index]; // Update the maximum value if a higher value is found
      }
    }
    return max;
  
  }

  const pressCMButton = async (tab_id) => {
    const result = await executeScript(tab_id, async () => {
      const element = document.body.querySelector(".chakra-stack.css-1busrm1");
      const elements = Array.from(element.querySelectorAll("span"));
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const Run = async () => {
        for (let i = 0; i < elements.length; i++) {
          console.log(elements[i].querySelector("span").textContent.toString())
          if ((elements[i].querySelector("span")).querySelector("span").textContent.toString().includes("CM") === true) {
            elements[i].click();
            await delay(100);
            return null;
          }
        }
      }
      const result = await Run();
      return result;
    });
    return result;
  };
  const getSizeDetailData = async (tabId, className) => {
    console.log("--------1-1-----------------");
    const result = await executeScript(
      tabId,
      async (selector) => {
        const elements = Array.from(document.body.querySelectorAll(selector));
        console.log("--------33333331-----------------", elements);
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const getData = async () => {
          let array = [];
          for (let i = 0; i < elements.length; i++) {
            await elements[i].click();
            await delay(50);
  
            const element = document.body.querySelectorAll(
              ".chakra-text.css-1dy2wii"
            );
            let text1;
            if (element.length > 1) {
              text1 = Array.from(
                document.body.querySelectorAll(".chakra-text.css-1dy2wii")
              )[1]
                .textContent.toString()
                .trim();
            } else {
              text1 = "";
            }
            const text2 = document.body
              .querySelector(".chakra-text.css-1j9rmsc")
              .textContent.toString()
              .trim();
            const text3 = document.body
              .querySelector(".chakra-text.css-1s7f4ol")
              .textContent.toString()
              .trim();
            array.push([text1, text2, text3]);
          }
          return array;
        };
        return await getData();
      },
      [className]
    );
  
    return result;
  };
  
  const getAllImage = async (tabId) => {
    const result = await executeScript(tabId, () => {
      const images = Array.from(document.querySelectorAll('img'));
      images.forEach(img => img.src = '');
      return images.length;
    });
    return result;
  }
  //
  chrome.runtime.onStartup.addListener(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab_id = tabs[0].id;
      console.log("start");
      const runScrap = async () => {
        for (let i = 0; i < 100000000; i++) {
          await gotoPage(googleUrl, "", tab_id);
          let RATE_ = await getRate(tab_id);
          await delay(1200);
          const RATE = Number(RATE_);
          console.log(RATE);
    
          const RATE1 = 192.83;
          console.log(RATE1);
    
          for (const url of URLS) {
            await gotoPage(PREFIX, url, tab_id);
            await delay(3200 + 200 * Math.random());
            await gotoPage(PREFIX, url, tab_id);
            await delay(1300 + 200 * Math.random());
    
            let pageSize = await getPageSize(tab_id);
            if (pageSize == undefined || pageSize == "undefined") pageSize = 1;
            console.log(pageSize);
            for (let pageIndex = 0; pageIndex < pageSize; pageIndex++) {
              const pageUrl =
                pageIndex == 0 ? `${url}` : `${url}?page=${pageIndex + 1}`;
              await gotoPage(PREFIX, pageUrl, tab_id);
              await delay(200 + 200 * Math.random());
    
              const productUrls = await getPageProducts(tab_id);
              // console.log(productUrls);
    
              for (const product of productUrls) {
                console.log("product page");
                await gotoPage(PRODUCT_PREFIX, product, tab_id);
    
                await delay(1000 + 200 * Math.random());
    
                await clickButton(tab_id, "#menu-button-pdp-size-selector"); // all button
                // await delay(200);
    
                await pressCMButton(tab_id);
                // await delay(100);
                await clickButton(tab_id, ".chakra-button.css-mh3eif");
                // await delay(100);
                //
                const detailData1 = await getDetail1(tab_id);
                const detailData2 = await getDetail2(tab_id);
                let detailData;
                if (detailData1 == 0) {
                  detailData = detailData2;
                }
                if (detailData2 == 0) {
                  detailData = detailData1;
                }
    
                // console.log(detailData1, detailData2);
                const PK = detailData[0][1];
    
                const size1 = await getSize(tab_id, "dt");
                const size2 = await getSize(tab_id, "dd"); //chakra-stat__number css-1yv08e4 chakra-stat__number css-kezhfx
    
                const price2 = await getPrice(tab_id);
                const imageUrl = await getImageUrl(tab_id, "#three-sixty-image");
    
                console.log(imageUrl);
    
                console.log("first start");
    
                await gotoPage(FIRSTSITE_PREFIX, PK, tab_id);
                await delay(1000);
                const imageUrl1 = await getImageUrl(tab_id, ".product-img");
                // console.log(imageUrl1[0]);
    
                if (
                  imageUrl1[0] == "undefined" ||
                  imageUrl1[0] == undefined ||
                  imageUrl1[0] == null ||
                  imageUrl1[0] == ""
                ) {
                  console.log(
                    "----------------------empty first page ------------------------------"
                  );
                  continue;
                }
    
                const testdata = await test(tab_id, ".product-detail-info-table");
                // console.log(testdata);
    
                const lowestprice = await getLowestPrice(tab_id);
    
                const productDescription = await getProductDescription(tab_id);
    
                await clickButton(tab_id, ".product-stock-label");
                await delay(100);
    
                let FirstSize = await getsizeDetailFromTable(tab_id);
                console.log(FirstSize);
                if (FirstSize == undefined || FirstSize == null) FirstSize = [];
    
                //
                if (Array.from(FirstSize).length > 0) {
    
                  await gotoPage(PRODUCT_PREFIX, product, tab_id);
    
                  await delay(500 + 200 * Math.random());
    
                  await clickButton(tab_id, "#menu-button-pdp-size-selector"); // all button
                  await delay(100);
    
                  await pressCMButton(tab_id);
                  await delay(100);
                  const detailsizedata = await getSizeDetailData(
                    tab_id,
                    ".chakra-menu__menuitem-option.css-1uqbhsq"
                  );
    
                  console.log("----@@@@----");
                  console.log(detailsizedata);
                  console.log(FirstSize);
                  console.log("----@@@@----");
    
                  const newArrayOfConsistentItems = detailsizedata.reduce(
                    (result, item) => {
                      const numberFromFirstArray = parseFloat(
                        item[2].split(" ")[1]
                      );
                      const matchingItemFromSecondArray = FirstSize.find(
                        (secondItem) =>
                          parseFloat(secondItem[0]) === numberFromFirstArray
                      );
    
                      if (
                        matchingItemFromSecondArray &&
                        matchingItemFromSecondArray[1].trim() !== "出品待ち" &&
                        !item[1].includes("--")
                      ) {
                        if (item[0].includes("$")) {
                          result.push([
                            Math.round(ChooseNumber(item[0]) * RATE),
                            Math.round(ChooseNumber(item[1]) * RATE),
                            item[2],
                            ChooseNumber(matchingItemFromSecondArray[1]),
                          ]);
                        }
                        else if (item[0].includes("£")) {
                          result.push([
                            Math.round(ChooseNumber(item[0]) * RATE1),
                            Math.round(ChooseNumber(item[1]) * RATE1),
                            item[2],
                            ChooseNumber(matchingItemFromSecondArray[1]),
                          ]);
                        }
                        else {
                          result.push([
                            ChooseNumber(item[0]),
                            ChooseNumber(item[1]),
                            item[2],
                            ChooseNumber(matchingItemFromSecondArray[1]),
                          ]);
                        }
                      }
                      return result;
                    },
                    []
                  );
                  for (let i = 0; i < newArrayOfConsistentItems.length; i++) {
                    console.log(
                      newArrayOfConsistentItems[i][0],
                      newArrayOfConsistentItems[i][1],
                      newArrayOfConsistentItems[i][2],
                      newArrayOfConsistentItems[i][3]
                    );
                  }
    
                  //-------- data processing   start   --------
                  let finalResult = [];
                  for (let i = 0; i < newArrayOfConsistentItems.length; i++) {
                    let temp = newArrayOfConsistentItems[i];
                    let saleMoney =
                      Number(temp[0]) -
                      Number(temp[0]) * 0.09 -
                      Number(temp[0]) * 0.03 -
                      1200;
                    let hopeMoney =
                      Number(temp[1]) -
                      Number(temp[1]) * 0.09 -
                      Number(temp[1]) * 0.03 -
                      1200;
    
                    let minSaleMoney = saleMoney - temp[3]; //10
                    let minSalePercent = (minSaleMoney / temp[3]) * 100; //11
    
                    let minHopeMoney = hopeMoney - temp[3]; //12
                    let minHopePercent = (minHopeMoney / temp[3]) * 100; //13
                    finalResult.push([
                      minSaleMoney,
                      minSalePercent,
                      minHopeMoney,
                      minHopePercent,
                      temp[0],
                      temp[3],
                      temp[2]
                      //
    
                    ]);
                  }
                  console.log(finalResult);
                  //-------- data processing    end ------------
    
                  console.log("first end");
                  //send data
                  if (imageUrl1[0] && imageUrl[0] && finalResult.length > 0) {
                    let maxSaleMoney = getMaximum(finalResult, 0);
                    let maxSalePercent = getMaximum(finalResult, 1);
                    let maxHopeMoney = getMaximum(finalResult, 2);
                    let maxHopePercent = getMaximum(finalResult, 3);
                    let _size1 = size1
                      .slice(1)
                      .filter((element) => element !== " ");
                    let _size2 = size2
                      .slice(1)
                      .filter((element) => element !== " ");
                    let _size = [];
    
                    for (let i = 0; i < _size1.length; i++) {
                      const element = [_size1[i], _size2[i]];
                      _size.push(element);
                    }
                    const shoesData = {
                      ProductNumber: PK,
                      ProductDescription: productDescription,
                      date: testdata[2],
                      image: imageUrl1[0][0] || imageUrl1[0][0],
                      PriceData: finalResult,
                      Lowest: lowestprice,
                      MsaleMoney: maxSaleMoney,
                      MSalePercent: maxSalePercent,
                      MHopeMoney: maxHopeMoney,
                      MHopePercent: maxHopePercent,
                    };
                    await sendData(shoesData);
                  
                  }
                }
              }
            }
          }
        }
      };
      runScrap();
    });
  })

  const sendData = async (shoesData) => {
    await fetch("http://localhost:3003/api/v1/data/push", {
      method: "POST",
      body: JSON.stringify(shoesData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("カートに追加されました:", response);
      })
      .catch((error) => {
        console.error("カート追加エラー:", error);
      });
  };
  