const multer = require('multer');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const multiStorage = multer.diskStorage({
  destination: function (eq, file, cb) {
    cb(null, 'public/img/users');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multiFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400));
  }
};
const upload = multer({
  storage: multiStorage,
  fileFilter: multiFilter,
});

const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.uploadUserPhoto = upload.single('photo');

exports.getUsers = factory.getAll(User);
// exports.getUsers = catchAsync(async (req, res, next) => {
//   const user = await User.find();
//   res.status(200).json({
//     status: 'succses',
//     results: user.length,
//     data: {
//       user,
//     },
//   });
// });

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1 if user POSTs password then create a error
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update please use /updtaeMyPassword',
      ),
    );
  }
  // 2 filtered put unwanted fields
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 3 update user document
  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'succses',
    message: 'Not updated yet',
  });
};

exports.getUserbyid = factory.getOne(User);

exports.updatedUser = factory.updateone(User);

exports.deleteUser = factory.deleteOne(User);
