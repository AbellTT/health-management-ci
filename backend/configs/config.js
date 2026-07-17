const databaseUrl = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL) : null;
const originalHost = process.env.PG_HOST || databaseUrl?.hostname || "localhost";
const resolvedHost = process.env.RESOLVED_PG_HOST || originalHost;
const useSsl = process.env.PG_SSL === "true";

const config = {
  user: process.env.PG_USER || decodeURIComponent(databaseUrl?.username || ""),
  host: resolvedHost,
  database: process.env.PG_DATABASE || databaseUrl?.pathname?.slice(1),
  password: process.env.PG_PASSWORD || decodeURIComponent(databaseUrl?.password || ""),
  port: process.env.PG_PORT || databaseUrl?.port || 5432,
  ssl: useSsl
    ? {
        rejectUnauthorized: false,
        servername: originalHost,
      }
    : false,
};

module.exports = config;
