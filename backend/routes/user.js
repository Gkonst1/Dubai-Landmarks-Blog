const app     = require('../index');
const express = require('express');
const router  = express.Router();

Parse.initialize(process.env.APP_ID, process.env.MASTER_KEY);
Parse.serverURL = process.env.SERVER_URL;
Parse.User.enableUnsafeCurrentUser();


/**
 * The HTTP request, which login a user
 */
router.post("/users/login", async (req, res) => {
	if (!req.body.username || !req.body.password) {
		return await res.status(200).send({ message: "Sorry, username or password is missing. Please try again.", completed: false });
	}

	/**
	 * Checks if the admin is already logged in in order to stop the creation of multiple sessions
	 */
	const user = await new Parse.Query("_User")
	        .equalTo("username", req.body.username)
	        .first({useMasterKey: true});
	const session = await new Parse.Query("_Session")
	        .equalTo("user", user)
	        .first({useMasterKey: true});

	if (session) {
		return await res.status(200).send({ message: "Already logged in.", completed: false });
	}


	try {
	    const user = await Parse.User.logIn(req.body.username, req.body.password)
	    res.status(201).send({ user, completed: true });
    } catch (error) {
    	res.status(200).send({ message: error.message, completed: false });
    }
})


/**
 * The HTTP request, which logout a user
 */
router.post("/users/logout", async (req, res) => {
	try {
		await Parse.User.logOut()
		res.status(200).send({ completed: true });
	} catch (error) {
		res.status(200).send({ message:"Logout failed.. Please try again", completed: false });
	}
})


module.exports = router;
