const handleSignin = (req, res, db, bcrypt)=>{

	const {email, password} = req.body;

	if(!email || !password){
		return res.status(400).json('Incorrect form');
	}

	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(async data=>{

		if(data.length > 0){

			const isValid = await bcrypt.compare(password, data[0].hash);

			if(isValid){

				db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user=>{

					return res.json(user[0]);
				})
			}
			else{
				
				throw 'incorrect password';
			}
		}
		else{
			throw 'incorrect email';
		}
		
	})
	.catch(err=>{
		res.status(400).json('unable to sign in '+err);
	})
}

module.exports = {

	handleSignin
}