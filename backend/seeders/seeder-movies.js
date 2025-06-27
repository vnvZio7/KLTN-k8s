module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("movies", [
      {
        id: 1,
        title: "Avengers: Endgame",
        description: "After the devastating events...",
        adult: false,
        release_date: new Date("2019-04-26"),
        language: "en",
        backdrop_path: "/path.jpg",
        trailer_url: "https://youtube.com/trailer",
        vote_average: 5,
        vote_count: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("movies", null, {});
  },
};
