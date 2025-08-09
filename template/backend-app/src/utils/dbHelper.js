import Sequelize from "sequelize";
import chalk from "chalk";

const databaseConfig = {
  name: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

// test database connection
console.log(databaseConfig);

const sequelize = new Sequelize(
  databaseConfig.name,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: "postgres",
  }
);

try {
  await sequelize.authenticate();
  console.log(
    chalk.green.bgBlackBright("Connection has been established successfully.")
  );
} catch (error) {
  console.error(
    chalk.red.bgBlackBright("Unable to connect to the database:"),
    error
  );
}

export default sequelize;
