const request = require("supertest");
const app = require("../../app.js");
const productService = require("../services/productService.js").ProductService;

//Tests related to Product controller
describe("Product Controller", () => {
    var product_detail;
    it("should check if product listing page is displayed.", async () => {
        var response = await request(app)
        .get(`/products`)
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(
            expect.stringContaining("Product")
        );
    });

    it("should check if product if invalid request is send while adding product.", async () => {
        var response = await request(app)
        .post(`/products/add`)
        .send('');
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(
            expect.stringContaining("400 Validation Error")
        );
    });

    it("should check if product is added successfully.", async () => {
        var response = await request(app)
        .post(`/products/add`)
        .send('product_name=Product Unit Test&product_category=Category 1&stock=0&product_sale_price=100.01&product_price=110.98&product_image_url=https://picsum.photos/400?image=967');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/products");
    });

    it("should check if newly added product shows at the top of the listing", async () => {
        var productServiceObj = new productService();
        var response = await productServiceObj.listProducts();
        product_detail = response[0];
        expect(typeof response).toBe("object");
        expect(response[0].productName).toBe('Product Unit Test');
        expect(response[0].dateModified >= response[response.length-1].dateModified).toBeTruthy();
    });

    it("should check if product is edited successfully.", async () => {
        var response = await request(app)
        .post(`/products/${product_detail.productId}/edit`)
        .send('product_name=Product Unit Test Updated&product_category=Category 1&stock=0&product_sale_price=100.01&product_price=110.98&product_image_url=https://picsum.photos/400?image=967');
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe("/products");
    });

    it("should check if edited product is seen in the listing successfully.", async () => {
        var productServiceObj = new productService();
        var response = await productServiceObj.listProducts();
        expect(typeof response).toBe("object");
        expect(response[0].productName).toBe('Product Unit Test Updated');
        expect(response[0].dateModified >= response[response.length-1].dateModified).toBeTruthy();
    });

    it("should check if product details page is displayed.", async () => {
        var response = await request(app)
        .get(`/products/${product_detail.productId}/details`)
        .send();
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(
            expect.stringContaining("Product Unit Test Updated")
        );
    });
});