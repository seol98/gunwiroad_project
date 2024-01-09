// viewRouter.js
import express from "express";
import {
    courseController,
    homeViewController,
    stampViewController,
    joinViewController,
    loginViewController,
    profileViewController,
    qrViewController,
    detailController,
    loginCallbackController,
} from "../controller/viewController";

const viewRouter = express.Router();

viewRouter.get("/login", loginViewController);
viewRouter.get("/join", joinViewController);
viewRouter.get("/profile", profileViewController);
viewRouter.get("/qr", qrViewController);
viewRouter.get("/course", courseController);
/* viewRouter.get("/course/detail", detailController); */
viewRouter.get("/stamp", stampViewController);
viewRouter.get("/", homeViewController);
viewRouter.get('/detail/:pageNumber', (req, res) => {
    const pageNumber = req.params.pageNumber;
    res.render('detail', {
      pageNumber: pageNumber,
    });
  });
viewRouter.get("/login/callback", loginCallbackController);

export default viewRouter;
