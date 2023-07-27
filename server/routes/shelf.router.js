const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  res.sendStatus(200); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // endpoint functionality
  console.log('inside of /api/shelf req.body', req.body);
  let description = req.body.description
  let imgUrl = req.body.imgUrl
  //queryText for data fields and sql injection 
  const queryText = `INSERT INTO "item" (description, image_url)
  VALUES($1, $2)`
  //redeclaring data fields 
  const queryParams = [description, imgUrl]
  //bringing in pool 
  pool.query(queryText, queryParams)
    .then((results) => {
      res.send(201)
    }).catch((error) => {
      console.log(`error making query ${queryText}` , error);
      res.sendStatus(500)
    })
    res.sendStatus(200)
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
