const { StatusCodes } = require('http-status-codes');
const {BookingService}=require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

async function createBooking(req,res){
    try {
        console.log(req.body);
        const response=await BookingService.createBooking({
            flightId:req.body.flightId,
            userId:req.body.userId,
            noOfSeats:req.body.noOfSeats
        });
        console.log(response);
        SuccessResponse.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}
module.exports={
    createBooking
}