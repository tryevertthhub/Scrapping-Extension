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
  //
  chrome.runtime.onStartup.addListener(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab_id = tabs[0].id;
      console.log("start");
    });
  })