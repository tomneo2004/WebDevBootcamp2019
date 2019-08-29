var knex = require('knex');

module.exports = ()=>{

	if(process.env.DB_PRODUCTION.toLowerCase() === 'true'){

		const db = knex({
		  client: 'pg',
		  connection: {
		    connectionString: process.env.DATABASE_URL,
		  	ssl: true
		  }
		});

		console.log('using production database');

		return db;
	}
	else{

		const db = knex({
		  client: 'pg',
		  connection: {
		    host : '127.0.0.1',
		    user : 'Nelson',
		    password : '',
		    database : 'facedetectionDB'
		  }
		});

		console.log('using local database');

		return db;
	}
}