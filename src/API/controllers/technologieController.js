const Technologie = require("../models/technologie");
const express = require("express");
const { checkToken } = require("../helpers/middleware");
const server = express();

server.get('/technologies', checkToken, async (req, res) => {
    Technologie.find().then(result => {
        res.send(result);
    })
});

server.get('/technologies/:id', checkToken, async (req, res) => {
    const result = await Technologie.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.status(404);
    }

    res.end();
});

server.get('/getAllStatus/:status', checkToken, async (req, res) => {
    const result = await Technologie.find({ status: req.params.status });
    if (result) {
        res.send(result);
    } else {
        res.status(404);
    }

    res.end();
});

server.post("/technologies", checkToken, async (req, res) => {
    const newTechnologie = new Technologie({
        name: req.body.name,
        category: req.body.category,
        ring: req.body.ring,
        description: req.body.description,
        descriptionClassification: req.body.descriptionClassification,
        status: false,
        creationDate: req.body.creationDate
    });
    const result = await Technologie.create(newTechnologie);
    if (result) {
        res.status(201);
    } else {
        res.status(404);
    }
    res.end();
});

server.put("/technologies/:id", checkToken, async (req, res) => {
    const result = await Technologie.findByIdAndUpdate(req.params.id, {
        $set: req.body
    });
    if (result) {
        res.status(201);
    } else {
        res.status(404);
    }
    res.end();
});

server.delete("/technologies/:id", checkToken, async (req, res) => {
    const result = await Technologie.findByIdAndRemove(req.params.id);
    if (result) {
        res.status(201);
    } else {
        res.status(404);
    }
    res.end();
});



module.exports = server;
