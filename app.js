const express = require("express");
const { corporationNumbers } = require("./corporationNumbers");
const app = express();
const port = 8080;

app.get("/corporationNumber/:corporationNumber", (req, res) => {
  const corporationNumber = req.params.corporationNumber;

  if (corporationNumber) {
    const isCorporationNumberAllowed =
      corporationNumbers.has(corporationNumber);
    if (isCorporationNumberAllowed) {
      res.send({
        corporationNumber,
        valid: true,
      });

      return;
    }
  }

  res.status(404).send({
    valid: false,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
