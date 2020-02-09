const https = require('https');

function fetchSheet({sheetId, apiKey, tabName}) {
  if(!sheetId) throw('sheetId is required')
  if(!tabName) throw('tabName is required')
  if(!apiKey) throw('apiKey is required')

  return new Promise((resolve, reject) => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${tabName}?key=${apiKey}`;
  https.get(url, res => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        resolve(json)
      } catch (error) {
        reject(error)
      };
    });

  }).on("error", reject)
  })
}

module.exports.fetchSheet = fetchSheet;
