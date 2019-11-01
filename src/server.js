'use strict'

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const variables = require('../bin/variables')

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(variables.Api.port, () => {
    console.log(`Server booted to port ${variables.Api.port}`);
});
