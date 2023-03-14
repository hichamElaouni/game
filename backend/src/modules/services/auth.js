import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
// import bcrypt from "bcrypt";
import { getUserByEmail } from '../db/controller/controller';

const crypto = require('crypto');
const { JWT_SECRET } = process.env;

// --- Local Strategy ---

const localVerify = async (username, password, done) => {
  // console.log("🚀 ~ file: auth.js:11 ~ localVerify ~ username", username)
  // const checkU = await checkUser(username, password);
  const { data, status } = await getUserByEmail(username);

  const sha1Hash = crypto.createHash('sha1').update(password).digest('hex');
  const checkPassword = sha1Hash === data.password

  if (status === 200 && checkPassword) {
    done(null, { username, role: data.role_id });
    return;

  } else {
    console.log("sd");
  }


  // if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
  //   done(null, { username, fullname: "Administrator" });
  //   return;
  // }
  done(null, false);
};

const localStrategy = new LocalStrategy(localVerify);
passport.use(localStrategy);

// --- JWT Strategy ---

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtVerify = (jwtPayload, next) => {
  if (jwtPayload.expires > Date.now()) {
    return next("jwt expired");
  }

  return next(null, jwtPayload);
};

const jwtStrategy = new JwtStrategy(jwtOpts, jwtVerify);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate("local", { session: false });
export const authJwt = passport.authenticate("jwt", { session: false });
