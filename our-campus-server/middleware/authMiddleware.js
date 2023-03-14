import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decode.id };
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// const student = (req, res, next) =>{
//   if(req.body.user && req.body.user.userType > 0){
//     next();
//   }else{
//     res.status(401);
//     throw new Error("Not Authorized");
//   }
// }

const staff = (req, res, next) => {
  console.log(req.body.userInfo.userType);
  if (req.body.userInfo && req.body.userInfo.userType > 1) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as staff");
  }
};

const admin = (req, res, next) => {
  if (req.body.userInfo && req.body.userInfo.userType > 2) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as admin");
  }
};

export { protect, staff, admin };
