const request = require("supertest");
const app = require("../../app.js");

//Tests related to user controller
describe("User Controller", () => {

    it("should check if user listing page is displayed with user data.", async () => {
        var response = await request(app)
        .get(`/login`)
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(
            expect.stringContaining("<option value=\"1\">Krzysztof Gould</option>")
        );
    });
    
    it("should check if user is logged in successfully.", async () => {
        var response = await request(app)
        .post(`/login`)
        .set("Content-Type", "application/json")
        .send({
          "user" : "10"
        });
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/products");
    });
});