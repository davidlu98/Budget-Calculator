/* server.js
 * A simple Node.js server for the budget calculator
 * Created by David Lu 
 * Date last modified: 6/4/2018 (MM/DD/YYYY)
*/

const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => console.log('Listening on port 8080'));