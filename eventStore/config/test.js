module.exports = {
    db: {
      user: "postgres",
      host: "localhost",
      database: "test_eventstore",
      password: "newPassword",
      port: 5432
    },
    successMessage: { success: "true", message: "Data added successfully" },
    errorMessage: { success: "false", message: "something went wrong" }
  };