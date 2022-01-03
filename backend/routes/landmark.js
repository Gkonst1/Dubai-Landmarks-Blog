const app     = require('../index');
const express = require('express');
const auth    = require('../middleware/auth');
const router  = express.Router();


router.get('/', function (req, res) {
  res.status(200).send('This is the API of the Dubai landmarks blog using the parse-server and parse!');
});


/**
 * The HTTP request, which returns all the landmarks from the database
 */
router.get('/landmarks', async (req, res) => {
	const Landmarks = Parse.Object.extend("Landmarks");
	const query     = new Parse.Query(Landmarks);
  	query.ascending("order");

	try {
		const landmarks = await query.find();

		if (!landmarks) {
			return await res.status(404).send({ message: "Sorry something went wrong.. Please try again.", completed: false });
		}

	res.status(200).send({ landmarks, completed: true });
	} catch (error) {
		res.status(200).send({ message: error.message, completed: false });
	}
});


/**
 * The HTTP request, which retrieves one landmark from the database
 */
router.get('/landmarks/:id', async (req, res) => {
	const Landmarks = Parse.Object.extend("Landmarks");
	const query     = new Parse.Query(Landmarks);
	query.equalTo("objectId", req.params.id);

	try {
		const landmark = await query.first();

		if (!landmark) {
			return await res.status(404).send({ message: "Landmark not found..", completed: false });
		}

		res.status(200).send({ landmark, completed: true });
	} catch (error) {
		res.status(200).send({ message: error.message, completed: false });
	}
})


/**
 * The HTTP request, which updates a specific landmark in the database
 */
router.patch('/landmarks/:id', auth, async (req, res) => {
	const Landmarks = Parse.Object.extend("Landmarks");
	const query     = new Parse.Query(Landmarks);
	query.equalTo("objectId", req.params.id);

	try {
		const landmark = await query.first();

		if (!landmark) {
			return await res.status(404).send({ message: "Landmark not found..", completed: false });
		}

		for (key of Object.keys(req.body)) {
			if (key === 'location') {
				const geoPoint = new Parse.GeoPoint({
					latitude: req.body.latitude,
					longitude: req.body.longitude
				});
				landmark.set(key, geoPoint);
			} else {
				if (key !== 'sessionToken') {
					landmark.set(key, req.body[key]);
				}
			}
		}

		landmark.save().then(() => {
			res.status(200).send({ landmark, completed: true });
		});
	} catch (error) {
		res.status(200).send({ message: error.message, completed: false });
	}
})


module.exports = router;
