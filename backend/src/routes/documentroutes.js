// // routers/documentRoutes.js
// import express from 'express';
// const router = express.Router();
// import multer from 'multer';
// import {
//     uploadDocument,
//     deleteFileController,
// } from '../controllers/documentcontroller.js';
// import uploadMiddleware from '../middlewares/uploadMiddleware.js';
// import { verifyJWT } from '../middlewares/authMiddleware.js';
// // import
// // const upload = multer({ storage: multer.memoryStorage() });
// router.post('/upload', uploadMiddleware.single('image'), uploadDocument);
// // router.post('/upload', upload.single('image'), uploadDocument);
// router.post('/delete', verifyJWT, deleteFileController);
// export default router;
