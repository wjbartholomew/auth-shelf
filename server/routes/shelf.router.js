const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    let query = `SELECT * FROM "item" WHERE user_id = $1 ORDER BY id;`;
    pool.query(query, [req.user.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting all from item', error);
        res.sendStatus(500);
    });
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log( 'Adding to databse', req.body.image_url,req.body.description  )
    let query = `INSERT INTO "item" ( "image_url", "description", "user_id" )
                        VALUES ($1, $2, $3);`;
    pool.query(query, [ req.body.image_url, req.body.description, req.user.id ])
    .then(result => {
        res.sendStatus( 200 );
    })
    .catch(error => {
        console.log('error posting to item', error);
        res.sendStatus(500);
    });
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated,  (req, res) => {
    console.log('in delete', req.params);
    const query = 'DELETE FROM "item" WHERE id=$1';
    pool.query(query, [req.params.id])
        .then(() => {res.sendStatus(200);})
        .catch((error) => {
            console.log('Error in DELETE', error);
            res.sendStatus(500);
        })
    });

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;