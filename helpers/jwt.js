const jwt = require('jsonwebtoken');


const generarJWT = (uid, name) => {

	return new Promise((res, rej) => {

		const payload = { uid, name };

		jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' }, (err, token) => {

			if(err){ 
				rej('No se pude generar el Token' );
			} 

			res(token)
		});
	});
}


module.exports = {
	generarJWT
}