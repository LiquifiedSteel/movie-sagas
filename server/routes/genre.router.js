const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// here we send a query to the database to request a specific movie's details and sends it back to the redux store
router.get('/:id', (req, res) => {
  const queryText = `SELECT "movies"."title", "movies"."poster", "movies"."description", json_agg("genres"."name") AS "genreNames" FROM "movies" JOIN movies_genres ON "movies"."id" = "movies_genres"."movie_id" JOIN genres ON "movies_genres"."genre_id" = "genres"."id" WHERE "movies"."id" = $1 GROUP BY "movies"."title", "movies"."poster", "movies"."description";`;
  pool.query(queryText, [req.params.id])
    .then((result) => { res.send(result.rows).status(200); })
    .catch((err) => {
      console.log('Error in GET /api/genre', err);
      res.sendStatus(500);
    });
});

module.exports = router;