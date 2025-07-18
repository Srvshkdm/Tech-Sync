// import express from 'express';
// export const stakeholderRouter = express.Router();

// import passport from 'passport';
// import wrapAsync from '../utils/wrapAsync';
// import { saveRedirectUrl } from '../middlewares/investorMiddleware';
// import StakeholderControl from '../controllers/stakeholder.Controller';

// stakeholderRouter
//     .route('/Stakeholder/signup')
//     .get((req, res) => {
//         res.render("Investor/signup.jsx'");
//     })
//     .post(wrapAsync(StakeholderControl.logout));

// stakeholderRouter
//     .route('/Stakeholder/login')
//     .get((req, res) => {
//         res.render('');
//     })
//     .post(
//         saveRedirectUrl,
//         passport.authenticate('local', {
//             failureRedirect: '/login',
//             failureFlash: true,
//         }),
//         wrapAsync(StakeholderControl.login)
//     );
// stakeholderRouter.get('/Stakeholder/logout', StakeholderControl.logout);
