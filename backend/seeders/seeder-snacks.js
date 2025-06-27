module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("snacks", [
      {
        id: 1,
        name: "Combo 1",
        price: 50000,
        description: "1 nước + 1 bắp",
        image_url: "https://image1.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Combo 2",
        price: 70000,
        description: "2 nước + 1 bắp",
        image_url: "https://image2.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("snacks", null, {});
  },
};
