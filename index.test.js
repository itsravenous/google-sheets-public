const nock = require("nock");
const { fetchSheet } = require("./index");

describe("validating arguments", () => {
  it("throws if sheetId, tabName, apiKey or callback not provided", () => {
    expect(() =>
      fetchSheet({
        apiKey: "my-api-key",
        tabName: "My tab name",
        callback: jest.fn()
      })
    ).toThrow("sheetId is required");
    expect(() =>
      fetchSheet({
        sheetId: "my-sheet=id",
        apiKey: "my-api-key",
        callback: jest.fn()
      })
    ).toThrow("tabName is required");
    expect(() =>
      fetchSheet({
        sheetId: "my-sheet-id",
        tabName: "My tab name",
        callback: jest.fn()
      })
    ).toThrow("apiKey is required");
    expect(() =>
      fetchSheet({
        sheetId: "my-sheet-id",
        tabName: "My tab name",
        apiKey: "my-api-key"
      })
    ).toThrow("callback is required");
  });
});

it("fetches data from Google sheet", done => {
  const sheetId = "my-sheet-id";
  const tabName = "My tab name";
  const apiKey = "my-api-key";
  const mockResponse = {
    range: "vedich!A1:Z1107",
    majorDimension: "ROWS",
    values: [
      ["Name", "Age"],
      ["Bilbo Baggins", "111"],
      ["Smaug", "Unknown"]
    ]
  };
  const scope = nock('https://sheets.googleapis.com')
    .get(`/v4/spreadsheets/${sheetId}/values/${tabName}?key=${apiKey}`)
    .reply(200, mockResponse);

  const callback = jest.fn((error, values) => {
    expect(scope.isDone()).toBe(true);
    expect(values).toEqual(mockResponse);
    done();
  });
  fetchSheet({ sheetId, tabName, apiKey, callback });
});
