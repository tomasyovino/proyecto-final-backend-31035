import cookieParser from "cookie-parser";
import session from "express-session";
import { checkUserController, listUserDeserializeController } from "../controllers/User.controller.js";
import passport from "passport";
import compression from "compression";
import { Strategy } from "passport-local";
import { config } from "../utils/config.js";

const sessionMiddleware = (app) => {
    const LocalStrategy = Strategy;
    
    app.use(cookieParser());
    app.use(
      session({
        secret: config.session_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 600000, // 10 min
        },
      })
    );
    app.use(compression());
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(
      new LocalStrategy((email, password, done) => {
        checkUserController(email, password, done);
      })
    );
    
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    
    passport.deserializeUser(async (id, done) => {
      const user = await listUserDeserializeController(id);
      return done(null, user);
    });
};

export default sessionMiddleware;