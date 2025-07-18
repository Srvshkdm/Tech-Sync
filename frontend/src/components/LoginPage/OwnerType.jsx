// import { useState } from 'react';

// export default function OwnerType() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Validate input
//         if (!email || !password) {
//             setErrorMessage('Please enter both email and password.');
//             return;
//         }
//         const userData = {
//             email,
//             password,
//         };

//         // Send POST request to the backend
//         try {
//             const response = await axios.post(
//                 'http://localhost:4000/user/signin',
//                 userData
//             );

//             const status = response.data.status;
//             const message = response.data.message;

//             if (status === 'SUCCESS') {
//                 setSuccessMessage(message);
//                 setErrorMessage('');
//             } else {
//                 setErrorMessage(message);
//                 setSuccessMessage('');
//             }
//         } catch (err) {
//             setErrorMessage('An error occurred while logging in.');
//             setSuccessMessage('');
//         }
//     };

//     return (
//         <div className="flex justify-center">
//             <div className="bg-gray-300 border border-gray-300 shadow-md rounded-lg p-6 w-full max-w-sm">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label
//                             className="block text-sm text-gray-700 font-medium mb-1"
//                             htmlFor="E-mail"
//                         >
//                             E-mail
//                         </label>
//                         <input
//                             type="email"
//                             id="E-mail"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your e-mail"
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <label
//                             className="block text-sm text-gray-700 font-medium mb-1"
//                             htmlFor="password"
//                         >
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="Enter your Password"
//                             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                     >
//                         Login
//                     </button>
//                 </form>

//                 {errorMessage && (
//                     <div className="mt-4 text-red-500">{errorMessage}</div>
//                 )}
//                 {successMessage && (
//                     <div className="mt-4 text-green-500">{successMessage}</div>
//                 )}

//                 <div className="text-center mt-4">
//                     <p className="text-sm text-gray-700">
//                         Don't have an account?{' '}
//                         <a
//                             href="/register"
//                             className="text-blue-500 font-medium hover:underline"
//                         >
//                             Sign up
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }
