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
  