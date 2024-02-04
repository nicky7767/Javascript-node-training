import assert from "assert";
import sinon from "sinon";
import { getWindSpeed } from "../app/part-2/findWindSpeed.js";

describe("getWindSpeed function", () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(global, "fetch");
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it("should return wind speed for a valid city", async () => {
    const cityName = "London";
    const apiKey = "random_key";
    const responseData = { cod: 200, wind: { speed: 10 } };
    fetchStub.resolves({
      ok: true,
      json: async () => responseData,
    });

    const result = await getWindSpeed(cityName, apiKey);

    assert.strictEqual(result, 10);
  });

  it("should handle unauthorized error", async () => {
    const cityName = "London";
    const apiKey = "random_key";
    fetchStub.resolves({
      ok: false,
      status: 401,
    });

    await assert.rejects(async () => await getWindSpeed(cityName, apiKey), {
      message: "Unauthorized. Please check and update your API key.",
    });
  });

  it("should handle bad request error", async () => {
    const cityName = "London";
    const apiKey = "random_key";
    fetchStub.resolves({
      ok: false,
      status: 400,
    });
    await assert.rejects(async () => await getWindSpeed(cityName, apiKey), {
      message: "Bad Request. Please check your request parameters.",
    });
  });

  it("should handle city not found error", async () => {
    const cityName = "london_new";
    const apiKey = "random_key";
    fetchStub.resolves({
      ok: false,
      status: 404,
    });

    await assert.rejects(async () => await getWindSpeed(cityName, apiKey), {
      message: "City not found. Please check the city name.",
    });
  });

  it("should handle server error", async () => {
    const cityName = "London";
    const apiKey = "random_key";
    fetchStub.resolves({
      ok: false,
      status: 503,
    });

    await assert.rejects(async () => await getWindSpeed(cityName, apiKey), {
      message: "Server error. Please try again later.",
    });
  });

  it("should handle generic HTTP error", async () => {
    const cityName = "London";
    const apiKey = "random_key";
    fetchStub.resolves({
      ok: false,
      status: 302,
    });

    await assert.rejects(async () => await getWindSpeed(cityName, apiKey), {
      message: "HTTP error! Status: 302",
    });
  });

  it("should handle API error", async () => {
    const cityName = "London";
    const apiKey = "random_key";
    const responseData = { cod: 400, message: "Invalid request" };
    fetchStub.resolves({
      ok: true,
      json: async () => responseData,
    });

    await assert.rejects(async () => await getWindSpeed(cityName, apiKey), {
      message: "API error: Invalid request",
    });
  });
});
