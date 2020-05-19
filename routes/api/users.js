'use strict';

const express = require('express');
const router = express.Router();
module.exports = router;

const users = require('../../controllers/api/users');

// see: https://swagger.io/specification/

/**
 * @swagger
 * /users:
 *  put:
 *    description: Saves one or more users
 *    responses:
 *      '200':
 *        description: Successful
 */
router.put('/users/:id', users.put);

/**
 * @swagger
 * /users:
 *  post:
 *    description: Updates one or more users
 *    responses:
 *      '200':
 *        description: Successful
 */
router.post('/users/:id', users.post);

/**
 * @swagger
 * /users:
 *  delete:
 *    description: Deletes one or more users
 *    responses:
 *      '200':
 *        description: Successful
 */
router.delete('/users/:id', users.delete);

/**
 * @swagger
 * /users:
 *  get:
 *    description: Fetches one or more users
 *    responses:
 *      '200':
 *        description: Successful
 */
router.get('/users', users.get);