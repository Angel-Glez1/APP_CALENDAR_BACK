require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { DBconnection } = require('./database/config');

/*---------------------------------\
|	Create Server with Express	   |	
\---------------------------------*/
const app = express();

/*---------------------------------\
|	  Connect in DataBse		   |
\---------------------------------*/
DBconnection();

/*---------------------------------\
|		 Middlewares			   |
\---------------------------------*/
app.use( cors() ); /** Hablitar cors a esta api */
app.use(express.static('./public')); /* Public Folder */
app.use(express.json()); /* Lectura y Parceo del body */


/*---------------------------------\
|		 End-Points				   |
\---------------------------------*/
app.use('/api/auth', require('./routers/auth'));
app.use('/api/events', require('./routers/events'));


/*---------------------------------\
|	    PORT RUN APP			   |
\---------------------------------*/
app.listen(process.env.PORT, () => console.log(`Ok ${process.env.PORT}`));
