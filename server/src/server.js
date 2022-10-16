const http = require("http");

const { mongoConnect } = require("./services/mongo");
const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`running on PORT: http://localhost:${PORT}`);
  });
}

startServer();
