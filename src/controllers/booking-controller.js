const { StatusCodes } = require('http-status-codes');
const {BookingService}=require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

async function createBooking(req,res){
    try {

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

async function makePayment(req,res){
    try {
        console.log('hi');
       //just pass the parameter by looking what all data service just required>>>not repository repository parameter will be bhandled by service layers
        const response=await BookingService.makePayment({
           bookingId:req.body.bookingId,
           userId:req.body.userId,
           totalCost:req.body.totalCost
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
    createBooking,
    makePayment
}