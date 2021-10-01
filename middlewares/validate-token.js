const { response } = require("express")
const jwt = require("jsonwebtoken")



const validateJWT = ( req , res= response, next ) => {

	const token = req.header('x-token');

	// Exite el token en los headers
	if(!token){
		return res.status(400).json({ ok : false, msg: 'No exite el token' });
	}


	try{

		const { uid, name } = jwt.verify(token, process.env.SECRET_KEY );
		req.uid = uid;
		req.name = name;


	}catch(e){
		console.log(e);
		return res.status(401).json({ ok: false, msg: 'Token no valido' })
	}


	next();
}


module.exports = {
	validateJWT
}