const { Position } = require("../models"); // Adjust the path as necessary to your models' index.js

const positionController = {
  // Create a new position
  create: async (req, res) => {
    try {
      const {
        position_name,
        description,
        base_salary,
        transport_allowance,
        meal_allowance,
      } = req.body;
      const newPosition = await Position.create({
        position_name,
        description,
        base_salary,
        transport_allowance,
        meal_allowance,
        create_id: 1,
      });
      res.status(201).send(newPosition);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Retrieve all positions
  findAll: async (req, res) => {
    try {
      const positions = await Position.findAll();
      res.status(200).send(positions);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Retrieve a single position by ID
  findOne: async (req, res) => {
    try {
      const position = await Position.findByPk(req.params.id);
      if (position) {
        res.status(200).send(position);
      } else {
        res.status(404).send({ message: "Position not found." });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Update a position
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = await Position.update(req.body, {
        where: { id: id },
      });
      if (updateData == 1) {
        res.send({
          message: "Position updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Position with id=${id}. Maybe Position was not found or req.body is empty!`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error updating Position with id=" + id,
      });
    }
  },

  // Delete a position
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteData = await Position.destroy({
        where: { id: id },
      });
      if (deleteData == 1) {
        res.send({
          message: "Position was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Position with id=${id}. Maybe Position was not found!`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Could not delete Position with id=" + id,
      });
    }
  },
};

module.exports = positionController;
