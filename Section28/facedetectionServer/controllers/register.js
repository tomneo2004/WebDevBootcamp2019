const handleRegister = (db, bcrypt)=> async (req, res)=>{
	
	const {email, password, name} = req.body;

	if(!email || !password || !name){
		return res.status(400).json('Incorrect form');
	}

	const hash = await bcrypt.hash(password, 10);

	db.transaction(trx=>{

		
		db.insert({
			email:email,
			hash:hash
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{

			db.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.into('users')
			.returning('*')
			.then(user=>{

				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(err=>{
		console.log(err);
		res.status(400).json('Unable to register');
	});
	
}

module.exports = {

	handleRegister
}