const originalHost = process.env.PG_HOST || "localhost";
const resolvedHost = process.env.RESOLVED_PG_HOST || originalHost;
const useSsl = process.env.PG_SSL === "true";

const config = {
  user: process.env.PG_USER, // PostgreSQL username
  host: resolvedHost, // Use resolved IP if available
  database: process.env.PG_DATABASE, // PostgreSQL database name
  password: process.env.PG_PASSWORD, // PostgreSQL password
  port: process.env.PG_PORT || 5432, // PostgreSQL port
  ssl: useSsl
    ? {
        rejectUnauthorized: false,
        servername: originalHost, // Ensure SNI matches the original hostname
      }
    : false,
};

module.exports = config;
