// import { Investment } from '../models';

// export const register = async (req, res) => {
//     try {
//         let { username, email, password } = req.body;
//         const newInvestor = await Investment.create({
//             username,
//             email,
//         });

//         const registeredInvestor = await Stakeholder.register(
//             newStakeholder,
//             password
//         );

//         req.login(registeredStakeholder, (err) => {
//             if (err) {
//                 return next(err);
//             }

//             res.redirect('/listings');
//         });
//     } catch (e) {
//         res.redirect('/signup');
//     }
// };

// export const login = async (req, res) => {
//     req.flash('success logged in successfully!');
//     let redirectUrl = res.locals.redirectUrl || '/listings';
//     res.redirect(redirectUrl);
// };

// export const logout = (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             next(err);
//         }

//         res.redirect('/listings');
//     });
// };
