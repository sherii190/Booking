const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Bookings, validate } = require("../models/bookings");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
var url = require("url");
const moment = require("moment");


router.get("/", auth, async (req, res) => {

    let query = {
    };

    if (req.user.type == "Customer") {
        query['customer'] = req.user._id;//return my initiated records
    } else if (req.user.type == "Cleaner") {
        query['cleaners'] = { $in: [req.user._id.toString()] };//return assigned to me
    } else {
        //Admin case... no filter.. return from all
    }


    let perPage = 10
        , page = (req.query.page || 1)

    let count = await Bookings.count(query);

    let bookings = Bookings.find(query).limit(perPage)
        .skip(perPage * (+page - 1))
        .populate({
            path: 'cleaners',
            select: '_id firstName lastName'
        })
        .sort({ dated: -1, time: -1 })
    if (req.user.type == "Admin") {
        bookings = bookings.populate({
            path: 'customer',
            select: '_id firstName lastName'
        })
    }
    bookings = await bookings;
    res.send({
        bookings,
        page: +page,
        pages: Math.ceil(count / perPage),
        perPage,
        total: count
    });
});

router.post("/", auth, async (req, res) => {
    console.log(req.body)
    delete req.body._id;
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    req.body.customer = req.user._id;

    let already = await Bookings.findOne({
        customer: req.body.customer,
        dated: req.body.dated,
        level: req.body.level
    });
    if (already) return res.status(400).send(`You already have a reservation for ${req.body.level} on ${moment(req.body.dated).format("DD MMM, YYYY")}`);

    let booking = new Bookings(req.body);
    booking = await booking.save();

    res.send(booking);
});

router.post("/:id/assign", auth, async (req, res) => {

    if (!req.body.assignees) return res.status(400).send("Please provide assignees");

    let booking = await Bookings.findById(req.params.id);
    if (!booking) return res.status(404).send("No booking found");

    let assignees = req.body.assignees;

    booking.cleaners = assignees;
    booking.status = "Assigned";
    await booking.save();

    res.send({ message: `Assigned successfully!` });
});

router.post("/:id/deliver", auth, async (req, res) => {

    let booking = await Bookings.findById(req.params.id);
    if (!booking) return res.status(404).send("No booking found");

    booking.status = "Delivered";
    await booking.save();

    res.send({ message: `Delivered successfully!` });
});

router.post("/:id/approve", auth, async (req, res) => {

    let booking = await Bookings.findById(req.params.id);
    if (!booking) return res.status(404).send("No booking found");

    booking.status = "Completed";
    await booking.save();

    res.send({ message: `Completed successfully!` });
});

router.post("/:id/reject", auth, async (req, res) => {

    let booking = await Bookings.findById(req.params.id);
    if (!booking) return res.status(404).send("No booking found");

    booking.status = "Rejected";
    await booking.save();

    res.send({ message: `Rejected successfully!` });
});

router.post("/bulk-delete", auth, async (req, res) => {

    let bookingIds = req.body.bookingIds;
    if (!bookingIds || !bookingIds.length) return res.status(400).send("No bookings found");

    await Bookings.remove({
        _id: {
            $in: bookingIds
        }
    });

    res.send({ message: `Selected bookings deleted successfully!` });
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const booking = await Bookings.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    if (!booking)
        return res.status(404).send("The booking with the given ID was not found.");

    res.send(booking);
});

router.delete("/:id", async (req, res) => {
    const booking = await Bookings.findByIdAndRemove(req.params.id);

    if (!booking)
        return res.status(404).send("The booking with the given ID was not found.");

    res.send(booking);
});

router.get("/:id", async (req, res) => {
    const booking = await Bookings.findById(req.params.id);

    if (!booking)
        return res.status(404).send("The booking with the given ID was not found.");

    res.send(booking);
});

router.get("/category/:category", async (req, res) => {
    const booking = await Bookings.findOne({ category: req.params.category });

    if (!booking)
        return res
            .status(404)
            .send("The booking with the given category was not found.");

    res.send(booking);
});

module.exports = router;
