const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//REGISTER USER
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(
      new ErrorHandler("User already registered, try logging in", 401)
    );
  }

  const user = await User.create({
    name,
    email,
  });

  sendToken(user, 201, res);
});

//LOGIN USER
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Not Registered", 401));
  }

  sendToken(user, 200, res);
});

//LOGOUT USER
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//ADD DATA
exports.addNewData = catchAsyncErrors(async (req, res, next) => {
  const { data } = req.body;

  // const user = await User.findOne()
  const isDetailPresent = req.user.expenseData.find(
    (detail) => detail.fileName.toString() === data.fileName.toString()
  );

  if (isDetailPresent) {
    for (const detail of req.user.expenseData) {
      if (detail.fileName.toString() === data.fileName.toString()) {
        await User.updateOne(
          {
            _id: req.user._id,
            "expenseData.fileName": detail.fileName,
          },
          {
            $set: {
              "expenseData.$.fileName": data.fileName,
              "expenseData.$.data": data.data,
            },
          }
        );
      }
    }
  } else {
    req.user.expenseData.push({
      fileName: data.fileName,
      data: data.data,
    });
    await req.user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    success: true,
    message: "Details Updated Successfully",
  });
});

//GET USER DETAIL
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("No User Found", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
