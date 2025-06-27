module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("reviews", [
      {
        id: 1,
        movie_id: 1,
        user_id: 2,
        content: "Very good movie!",
        star: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
