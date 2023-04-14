const express = require('express');
const productRouter = express.Router();
const bodyparser = require('body-parser');
const Products = require('../models/productSchema');
productRouter.use(bodyparser.json());
const cors = require('./cors');
const authenticate = require('../authenticate');

productRouter.route('/')
    .get(async (req, res) => {

        try {
            const search = req.query.search || "";
            const page = parseInt(req.query.page) - 1 || 0;
            let category = req.query.category || "All";
            let brand = req.query.brand || "All";
            const limit = parseInt(req.query.limit) || 10;
            let sort = req.query.sort || "price";

            const resp = await Products.find({});
            const cat = [...new Set(resp.map((item) => item.Category)), "All"];
            const Brand = [...new Set(resp.map((item) => item.Brand)), "All"];
            const color=[...new Set(resp.map((item)=>item.color)),"All"];

            category === "All" ? category = [...cat] : (category = req.query.category.split(","));
            brand === "All" ? brand = [...Brand] : (brand = req.query.brand.split(","));
            req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

            let sortBy = {};
            if (sort[1]) {
                sortBy[sort[0]] = sort[1];
            }
            else {
                sortBy[sort[0]] = "asc"
            }

            const total = await Products.find({ fullname: { $regex: search, $options: "i" } })
                .where("Category")
                .in([...category])
                .where("Brand")
                .in([...brand])
                .countDocuments();


            const product = await Products.find({ fullname: { $regex: search, $options: "i" } })
                .where("Category")
                .in([...category])
                .where("Brand")
                .in([...brand])
                .sort(sortBy)
                .skip(page * limit)
                .limit(limit);
            const response = {
                total,
                color,
                cat,
                Brand,
                product
            }
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).send(err);
        }
    })
    .post((req, res, next) => {
        if (req.body != null) {
            Products.create(req.body)
                .then((product) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(product);
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    })
    .put((req, res) => {
        res.statusCode = 300;
        res.send("Can't Perform Update Right Now");
    })
    .delete((req, res, next) => {
        Products.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

productRouter.route('/All')
    .get(async (req, res) => {
        try {
            const product = await Products.find({});
            res.status(200).json(product);
        }
        catch (err) {
            res.status(500).send(err);
        }
    });

productRouter.route('/:id')
    .get((req, res, next) => {
        Products.findById(req.params.id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Products.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .delete((req, res, next) => {
        Products.findByIdAndDelete(req.params.id)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = productRouter;
