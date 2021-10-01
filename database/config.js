const mongoose = require('mongoose');



const DBconnection =  async () => {

	try{
		await mongoose.connect(process.env.DB_CNN, {
		
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
			
		});

		console.log('DDBB connected');
	}catch(e){
		console.log(e);
		throw new Error('No se puedo conectar ala DDBB')
	}


}


module.exports = {
	DBconnection
};