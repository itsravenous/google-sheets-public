const https = require('https');

function fetchSheet({sheetId, apiKey, tabName, callback}) {
  if(!sheetId) throw('sheetId is required')
  if(!tabName) throw('tabName is required')
  if(!apiKey) throw('apiKey is required')
  if(!callback) throw('callback is required')

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${tabName}?key=${apiKey}`;
  https.get(url, res => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        callback(undefined, json)
      } catch (error) {
        callback(error)
      };
    });

  }).on("error", callback)
}

module.exports.fetchSheet = fetchSheet;
