const { createApp } = require("./app");
const config = require("./config");

const app = createApp();

app.listen(config.port, () => {
  console.log(`Tasks API running on port ${config.port}`);
});
