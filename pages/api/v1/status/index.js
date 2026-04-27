import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const DatabaseVersion = await database.query("SHOW server_version");
  const DatabaseVersionValues = DatabaseVersion.rows[0].server_version;

  const DatabaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const DatabaseMaxConnectionsValues =
    await DatabaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const DatabaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname= $1",
    values: [databaseName],
  });
  const DatabaseOpenedConnectionsValue =
    await DatabaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version: DatabaseVersionValues,
        max_connections: parseInt(DatabaseMaxConnectionsValues),
        opened_connections: DatabaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
