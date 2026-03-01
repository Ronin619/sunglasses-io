const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml"); // Replace './swagger.yaml' with the path to your Swagger file
const app = express();

app.use(bodyParser.json());

// Importing the data from JSON files
const users = require("../initial-data/users.json");
const brands = require("../initial-data/brands.json");
const products = require("../initial-data/products.json");

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// End points
app.get("/api/brands", function (request, response) {
  if (!brands) {
    response.writeHead(404);
    return response.end("Brand does not exist.");
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  return response.end(JSON.stringify(brands));
});

app.get("/api/brands/:id/products", function (request, response) {
  const brandId = request.params.id;

  let filteredProducts = products.filter(
    (product) => product.categoryId === brandId,
  );

  if (filteredProducts.length === 0) {
    response.writeHead(404, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "products do not exist." }));
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  return response.end(JSON.stringify(filteredProducts));
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
