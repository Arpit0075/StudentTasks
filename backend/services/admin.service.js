const jwt = require("jsonwebtoken");
const db = require("../shared/mongo");
require("dotenv").config();
const schema = require("../Schema/schema");

const adminService = {
  async login(req, res) {
    //console.log(req.body);

    try {
      //validations
      const { error, value } = await schema.loginSchema.validate(req.body);

      //we get value and error from schema validation, we get value if there is no error, value includes data that we passed from front end
      //console.log(value);
      if (error) {
        return res
          .status(400)
          .send({ error: "Validation falied", err: error.details[0].message });
      }

      //checking if email exits
      const admin = await db.admin.findOne({
        email: value.email,
        password: value.password,
      });

      //sending err if it doesn't exist
      if (!admin) {
        return res.send({ err: "Admin doesn't exist" });
      }

      // Generate Token
      const authToken = jwt.sign(
        { adminName: admin.name, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      res.send({ authToken, adminId: admin._id });
    } catch (err) {
      console.log(err);
      res.send({ err: "email or password is incorrect" });
    }
  },
};

module.exports = adminService;
