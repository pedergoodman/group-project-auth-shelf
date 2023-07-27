const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let sqlQuery = `SELECT * FROM "item";`;
  pool.query(sqlQuery)
  .then (result => {
    res.send(result.rows);
    console.log('Server request completed: ', result.rows);
  })
  .catch( error => {
    console.log('Error in GET of /shelf; ', error);
    res.sendStatus(500)
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/',rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log('inside of /api/shelf req.body', req.body);
  let description = req.body.description
  let imgUrl = req.body.imgUrl
  let userId = req.user.id
  //queryText for data fields and sql injection 
  const queryText = `INSERT INTO "item" (description, image_url, user_id)
  VALUES($1, $2, $3)`
  //redeclaring data fields 
  const queryParams = [description, imgUrl, userId]
  //bringing in pool 
  pool.query(queryText, queryParams)
    .then((results) => {
      res.send(201)
    }).catch((error) => {
      console.log(`error making query ${queryText}` , error);
      res.sendStatus(500)
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let sqlID = req.params.id;
  let sqlUserId = req.user.id;
  let sqlQuery = `
  DELETE FROM "item"
  WHERE "id"=$1 AND "user_id"=$2
  `
  pool.query(sqlQuery, [sqlID, sqlUserId])
  .then(result => {
    console.log('Deleted survey from database, ', result);
    res.sendStatus(200);
  })
  .catch (error => {
    console.log('Error in DELETEing an item from database: ', error);
    res.sendStatus(500);
  })
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
