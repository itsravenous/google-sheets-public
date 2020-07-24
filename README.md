# @itsravenous/google-sheets-public
Simple, zero-dependency package for fetching data from public Google sheets.

## Installation
`npm i @itsravenous/google-sheets-public`

## Setting up a public Google sheet
1. Create an account at https://developers.google.com/
2. Go to your Google Developer Console dashboard and click "Enable APIs and Services". Select Google Sheets.
3. Go to the Credentials section of your account and create an API key. Note it down.
4. Create a Google sheet and note down its ID (from the URL - `https://docs.google.com/spreadsheets/d/THIS-PART-IS-THE-ID/edit#gid=0`)

## Usage
```js
const { fetchSheet } = require('@itsravenous/google-sheets-public');

fetchSheet({ sheetId: 'your-sheet-id', tabName: 'Sheet 1', apiKey: 'your-api-key' })
  .then(result => console.log(result))
  .catch(error => console.error(error));
```
