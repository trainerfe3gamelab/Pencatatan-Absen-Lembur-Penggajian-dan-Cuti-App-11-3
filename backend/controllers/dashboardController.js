const { getData } = require("../utils/dashboard");

const dashboardController = {
  findAll: async (req, res) => {
    try {
      const data = await getData();
      res.status(200).json({
        status: "sukses",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      handleError(res, 500, "Terjadi error pada server");
    }
  },
};

module.exports = dashboardController;
