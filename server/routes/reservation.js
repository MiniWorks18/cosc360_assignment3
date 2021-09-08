const express = require('express')
const router = express.Router()
const reservation_controller = require('../controllers/reservationController')
const reservationValidator = require('../services/reservationValidation')

// Pass different requests to the correct handlers
router.get('/notification', reservation_controller.reservationAddedNotification)
router.post('/', reservationValidator.validateData,
    reservation_controller.create_reservation)
router.delete('/', reservation_controller.delete_reservation)
router.put('/', reservation_controller.update_reservation)
router.get('/', reservation_controller.get_reservation)

// Swagger documentation
/**
* @openapi
* /reservations:
*  post:
*    summary: Add a new reservation to the database
*    tags: [Reservations]
*    requestBody:
*     required: true
*     content:
*       application/json:
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*               example: steve
*             seats:
*               type: number
*               example: 2
*             restaurant:
*               type: string
*               example: mcdonalds
*             client_id:
*               type: string
*               example: 610cac9b7922540312eafc34
*             date_reserved:
*               type: date
*               example: 2021-08-06T11:11:11.1111
*             phone_number:
*               type: number
*               example: "0499999999"
*             special_requests:
*               type: string
*               example: i'd like a side of you please
*    consumes:
*      - application/json
*    produces:
*      - application/json
*    responses:
*      201:
*        description: Returns the created reservation
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message: 
*                  type: string
*                  example: Successfully created reservation
*                item: 
*                  type: object
*                  properties: 
*                    _id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5832
*                    restaurant: 
*                      type: string
*                      example: mcdonalds
*                    name: 
*                      type: string
*                      example: Stnn
*                    date_reserved: 
*                      type: string
*                      example: 2021-08-07T00:00:00.000Z
*                    seats: 
*                      type: integer
*                      format: int32
*                      example: 3
*                    contact: 
*                      type: object
*                      properties: 
*                        phone_number: 
*                          type: integer
*                          format: int32
*                          example: 499999990
*                    client_id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5833
*                    date_created: 
*                      type: string
*                      example: 2021-08-06T05:16:54.792Z
*                    __v: 
*                      type: integer
*                      format: int32
*                      example: 0
*      404:
*        description: Returns an error array
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                errors:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      restaurant:
*                        type: string
*                        example: mcdonals
*                      message:
*                        type: string
*                        example: restaurant does not exist
*                      param:
*                        type: string
*                        example: restaurant
*                      location:
*                        type: string
*                        example: body
*  put:
*    summary: Updates an existing reservation
*    tags: [Reservations]
*    requestBody:
*     required: true
*     content:
*       application/json:
*         schema:
*           type: object
*           properties:
*             id:
*               type: string
*               example: 610cc5c6669ef803666d5832
*             special_requests:
*               type: string
*               example: nvm i want chips instead
*    consumes:
*      - application/json
*    produces:
*      - application/json
*    responses:
*      200:
*        description: Returns the updated reservation
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message: 
*                  type: string
*                  example: Successfully updated
*                item: 
*                  type: object
*                  properties: 
*                    contact: 
*                      type: object
*                      properties: 
*                        phone_number: 
*                          type: integer
*                          format: int32
*                          example: 499999990
*                    _id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5832
*                    restaurant: 
*                      type: string
*                      example: mcdonalds
*                    name: 
*                      type: string
*                      example: Stnnn
*                    date_reserved: 
*                      type: string
*                      example: 2021-08-07T00:00:00.000Z
*                    seats: 
*                      type: integer
*                      format: int32
*                      example: 3
*                    client_id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5833
*                    date_created: 
*                      type: string
*                      example: 2021-08-06T05:16:54.792Z
*                  __v: 
*                      type: integer
*                      format: int32
*                      example: 0
*      404:
*        description: Returns an error array
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                errors:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      id:
*                        type: string
*                        example: 610cc5c6669ef803666d5831
*                      message:
*                        type: string
*                        example: id does not match existing reservations
*                      param:
*                        type: string
*                        example: restaurant
*                      location:
*                        type: string
*                        example: body
*       
*
*  delete:
*    summary: Remove a reservation to the database
*    tags: [Reservations]
*    requestBody:
*     required: true
*     content:
*       application/json:
*         schema:
*           type: object
*           properties:
*             id:
*               type: string
*               example: 610cc5c6669ef803666d5832
*    consumes:
*      - application/json
*    produces:
*      - application/json
*    responses:
*      200:
*        description: Returns the deleted reservation
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                message: 
*                  type: string
*                  example: Successfully deleted
*                item: 
*                  type: object
*                  properties: 
*                    _id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5832
*                    restaurant: 
*                      type: string
*                      example: mcdonalds
*                    name: 
*                      type: string
*                      example: Stnn
*                    date_reserved: 
*                      type: string
*                      example: 2021-08-07T00:00:00.000Z
*                    seats: 
*                      type: integer
*                      format: int32
*                      example: 3
*                    contact: 
*                      type: object
*                      properties: 
*                        phone_number: 
*                          type: integer
*                          format: int32
*                          example: 499999990
*                    client_id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5833
*                    date_created: 
*                      type: string
*                      example: 2021-08-06T05:16:54.792Z
*                    __v: 
*                      type: integer
*                      format: int32
*                      example: 0
*      404:
*        description: Returns an error array
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                errors:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      id:
*                        type: string
*                        example: 610cc5c6669ef803666d5831
*                      message:
*                        type: string
*                        example: id does not match existing reservations
*                      param:
*                        type: string
*                        example: restaurant
*                      location:
*                        type: string
*                        example: body
*
*  get:
*    summary: Get a reservation from the database
*    tags: [Reservations]
*    requestBody:
*     required: true
*     content:
*       application/json:
*         schema:
*           type: object
*           properties:
*             id:
*               type: string
*               example: 610cc5c6669ef803666d5832
*    consumes:
*      - application/json
*    produces:
*      - application/json
*    responses:
*      200:
*        description: Returns the reservation
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                item: 
*                  type: object
*                  properties: 
*                    _id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5832
*                    restaurant: 
*                      type: string
*                      example: mcdonalds
*                    name: 
*                      type: string
*                      example: Stnn
*                    date_reserved: 
*                      type: string
*                      example: 2021-08-07T00:00:00.000Z
*                    seats: 
*                      type: integer
*                      format: int32
*                      example: 3
*                    contact: 
*                      type: object
*                      properties: 
*                        phone_number: 
*                          type: integer
*                          format: int32
*                          example: 499999990
*                    client_id: 
*                      type: string
*                      example: 610cc5c6669ef803666d5833
*                    date_created: 
*                      type: string
*                      example: 2021-08-06T05:16:54.792Z
*                    __v: 
*                      type: integer
*                      format: int32
*                      example: 0
*      404:
*        description: Returns an error array
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                errors:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      id:
*                        type: string
*                        example: 610cc5c6669ef803666d5831
*                      message:
*                        type: string
*                        example: id does not match existing reservations
*                      param:
*                        type: string
*                        example: restaurant
*                      location:
*                        type: string
*                        example: body
*
*
*
*
*
*
*
*
*
*/


module.exports = router