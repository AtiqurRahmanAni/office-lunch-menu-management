const syncModels = async (sequelize) => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(`Error synchronizing models: ${error}`);
  }
};

export default syncModels;
