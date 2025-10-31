import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, 
  }
);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected successfully.");
  } catch (error) {
    console.error("❌ MySQL connection error:", error);
  }
})();

export default sequelize;
