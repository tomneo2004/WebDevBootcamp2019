const handleProfile = (req, res, db)=>{

	const {id} = req.params;

	db.select('*').from('users').where({
		id:id
	})
	.then(user=>{

		if(user.length > 0){
			return res.json(user);
		}
		else{

			throw 'User does not exist';
		}
	})
	.catch(err=>{

		return res.status(400).json(err);
	})
	
}

module.exports = {

	handleProfile
}