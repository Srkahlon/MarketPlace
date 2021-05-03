## Requirements

- Node version - v10.19.0

## Installation

Use the package manager [npm] to install the dependencies.

```bash
npm install
```

## To Run the application

```bash
npm start
```

## To Run the Test

```bash
npm test
```

## Folder Structure

- The entry point of the application is the index.js file.
- All other files are present in the src folder.
- .env file contains environment related values.
- The commons folder contains a helper class that includes helper functions used in the application throughout.
- The controllers folder contains Product and User controller classes.
- The json files are present in the database folder.
- The middlerware contain Product middleware class that includes the validation functions to validate an incoming request.
- The models folder contains User, Product classes which has functions to read/write the json data.
- The routes are present in the routes/apiRoutes files.
- The service classes are present in the services folder.
- The views are present in the views folder.

## Additional Changes done to data.
- I have assumed the product json to be a sorted array based on productId.
- The "views" key is added to each product to store the user views, that is used for recommendations.
- Already viewed products are not shown in the recommendations.
- "dateModified" key is added to the existing products for the listing page.
