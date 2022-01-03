/**
 * The middleware function, which checks if the admin is logged in to proceed with the update action.
 */
const auth = async (req, res, next) => {
	try {
		
		const session = await new Parse.Query("_Session")
	        .equalTo("sessionToken", req.headers['x-session-token'])
	        .first({useMasterKey: true});
		const userId = session.get('user').id;
		const user   = await new Parse.Query("_User")
	        .equalTo("objectId", userId)
	        .first({useMasterKey: true});

		if (!user) {
			throw new Error();
		}

		req.body.sessionToken = await session.get('sessionToken');
		next();
	} catch (e) {
		res.status(200).send({ message: 'Unauthorised access', completed: false });
	}
}

module.exports = auth;
