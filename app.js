const express = require("express");
const cors = require("cors");
const { corporationNumbers } = require("./corporationNumbers");
const app = express();
const port = process.env.PORT || 8089;

const canadianPhoneNumberRegex = /^\+1\d{10}$/;

const isValidName = (name) => name.length > 0 && name.length <= 50;
const isValidCorporationNumber = (corporationNumber) =>
  corporationNumbers.has(corporationNumber);
const isValidPhone = (phone) => phone && canadianPhoneNumberRegex.test(phone);

app.use(express.json());
app.use(cors());

app.get("/corporationNumber/:corporationNumber", (req, res) => {
  const corporationNumber = req.params.corporationNumber;

  console.log(`Checking corporation number: ${corporationNumber}`, req.ip);

  if (corporationNumber) {
    if (isValidCorporationNumber(corporationNumber)) {
      res.json({
        corporationNumber,
        valid: true,
      });

      return;
    }
  }

  res.status(404).json({
    valid: false,
    message: "Invalid corporation number",
  });
});

app.get("/corporation-number/:corporationNumber", (req, res) => {
  const corporationNumber = req.params.corporationNumber;

  console.log(`Checking corporation number: ${corporationNumber}`, req.ip);

  if (corporationNumber) {
    if (isValidCorporationNumber(corporationNumber)) {
      res.json({
        corporationNumber,
        valid: true,
      });

      return;
    }
  }

  res.status(404).json({
    valid: false,
    message: "Invalid corporation number",
  });
});

app.post("/profile-details", (req, res) => {
  const formData = req.body;

  console.log("Submitted form data", req.ip);

  if (
    formData.firstName === undefined ||
    formData.lastName === undefined ||
    formData.corporationNumber === undefined ||
    formData.phone === undefined
  ) {
    res.status(400).json({
      message: "Missing required fields",
    });

    return;
  }

  if (!isValidName(formData.firstName)) {
    res.status(400).json({
      message: "Invalid first name",
    });

    return;
  }

  if (!isValidName(formData.lastName)) {
    res.status(400).json({
      message: "Invalid last name",
    });

    return;
  }

  if (!isValidCorporationNumber(formData.corporationNumber)) {
    res.status(400).json({
      message: "Invalid corporation number",
    });

    return;
  }

  if (!isValidPhone(formData.phone)) {
    res.status(400).json({
      message: "Invalid phone number",
    });

    return;
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
