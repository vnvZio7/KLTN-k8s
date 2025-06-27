module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("cinemas", [
      {
        id: 1,
        name: "Galaxy Cinema",
        address: "123 Main Street",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "CGV",
        address: "456 Second Ave",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("cinemas", null, {});
  },
};
