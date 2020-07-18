const actionsModel = require("../data/helpers/actionModel");

module.exports = {
  logger: function (req, res, next) {
    console.log(`${req.method} requests`);
    next();
  },
  validateProjectId: async function (req, res, next) {
    const id = req.params.id;
    try {
      const project = await projectsModel.get(id);
      project
        ? (req.project = project)
        : res.status(400).json({ message: "Invalid project id" });
    } catch (err) {
      return res.status(500).json({ errorMessage: "Internal Server Error" });
    }
    next();
  },

  validateProject: function (req, res, next) {
    const { name, description } = req.body;
    if (!name && !description)
      return res.status(400).json({ message: "Provide project information." });
    if (!name)
      return res.status(400).json({ message: "Missing required name." });
    if (!description)
      return res.status(400).json({ message: "Missing required description." });
    next();
  },

  validateActionId: async function (req, res, next) {
    const action = await actionsModel.get(req.params.id);
    action
      ? ((req.action = action), next())
      : res.status(404).json("Invalid action id.");
  },
};
