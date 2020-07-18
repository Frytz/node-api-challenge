const express = require("express");

const dbProjects = require("../data/helpers/projectModel");
const dbActions = require("../data/helpers/actionModel");
const mid = require("../middleware/middleware");


const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const projects = await dbProjects.get();
    res.status(200).json(projects);
  } catch {
    res.status(500).json({ error: "error" });
  }
});

router.get("/:id", async (req,res) => {
 
  try {
    const projects = await dbProjects.get(req.params.id);
    res.status(200).json(projects);
  } catch {
res.status(500).json({error: "oops"})
  }
});

router.get("/:id/actions",  async (req, res) => {
  try {
    const projectActions = await dbProjects.getProjectActions(req.params.id);
    res.status(200).json(projectActions);
  } catch {
    res.status(500).json({ error: "500 Error" });
  }
});
// POST
router.post("/", async (req, res) => {
  const newPost = { ...req.body };
  try {
    const success = await dbProjects.insert(newPost);
    res.status(201).json(success);
  } catch {
    res.status(500).json({ error: "Invalid data specified" });
  }
});

router.post("/:id", async (req, res) => {
  const newPost = { ...req.body, project_id: req.params.id };
  try {
    const success = await dbActions.insert(newPost);
    res.status(201).json(success);
  } catch {
    res.status(500).json({ error: "invalid ID specified" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    await dbProjects.update(req.params.id, { ...req.body, id: req.params.id });
    const newResult = await dbProjects.get(req.params.id);
    res.status(200).json(newResult);
  } catch {
    res.status(500).json({ error: "500 Error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const result = await dbProjects.remove(req.params.id);
    res
      .status(200)
      .json({ status: `User Id: ${result} has been successfully deleted` });
  } catch {
    res.status(500).json({ error: "500 Error" });
  }
});
module.exports = router;
