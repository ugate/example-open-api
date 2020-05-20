'use strict';

const express = require('express');
const router = express.Router();
module.exports = router;

const users = require('../../controllers/api/users');

// see: https://swagger.io/specification/

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - user
 *     summary: Create user
 *     description: This can only be done by a user with an administrative role
 *     operationId: updateUser
 *     parameters:
 *       - name: username
 *         in: path
 *         description: name that needs to be created
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *       description: Create user
 *       required: true
 *     responses:
 *       "400":
 *         description: Invalid user supplied
 *       "401":
 *         description: User not authorized
 */
router.post('/users', users.post);

/**
 * @swagger
 * "/user/{username}":
 *   get:
 *     tags:
 *       - user
 *     summary: Get user by user name
 *     description: ""
 *     operationId: getUserByName
 *     parameters:
 *       - name: username
 *         in: path
 *         description: "The name that needs to be fetched. Use user1 for testing. "
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       "400":
 *         description: Invalid username supplied
 *       "404":
 *         description: User not found
 */
router.get('/users/:username', users.get);

/**
 * @swagger
 * /users/{username}:
 *   put:
 *     tags:
 *       - user
 *     summary: Updated one or more user
 *     description: This can only be done by the logged in user
 *     operationId: updateUsers
 *     parameters:
 *       - name: username
 *         in: path
 *         description: name that needs to be updated
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/User"
 *     requestBody:
 *       $ref: "#/components/requestBodies/UserArray"
 *     responses:
 *       default:
 *         description: Successful operation
 *       "400":
 *         description: Invalid user supplied
 *       "404":
 *         description: User not found
 */
router.put('/users/:username', users.put);

/**
 * @swagger
 * /users/{username}:
 *   patch:
 *     tags:
 *       - user
 *     summary: Patch user
 *     description: This can only be done by the logged in user
 *     operationId: patchUser
 *     parameters:
 *       - name: username
 *         in: path
 *         description: name that needs to be patched
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *       description: Patch user
 *       required: true
 *     responses:
 *       "400":
 *         description: Invalid user supplied
 *       "404":
 *         description: User not found
 */
router.patch('/users/:username', users.patch);

/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     tags:
 *       - user
 *     summary: Delete user
 *     description: This can only be done by the logged in user
 *     operationId: deleteUser
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The name that needs to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "400":
 *         description: Invalid username supplied
 *       "404":
 *         description: User not found
 */
router.delete('/users/:id', users.delete);