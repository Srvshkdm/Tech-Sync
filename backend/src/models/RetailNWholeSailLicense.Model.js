import mongoose from 'mongoose';

const RetailAndWholesaleLicenseSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true, // Name of the retail/wholesale business
    },
    businessType: {
        type: String,
        enum: ['Retail', 'Wholesale', 'Both'], // Type of business
        required: true,
    },
    ayushLicenseRequired: {
        type: Boolean,
        default: false, // AYUSH retail & wholesale licenses are not mandatory as per the Drugs and Cosmetics Act
    },
    businessAddress: {
        type: String,
        required: true, // Address of the retail/wholesale business
    },
    contactDetails: {
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/, // Basic email validation
        },
        phone: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/, // Assuming 10-digit phone numbers
        },
    },
    documents: {
        businessRegistrationCertificate: {
            type: String,
            required: true, // Path to the uploaded registration certificate
        },
        premisesAddressProof: {
            type: String,
            required: true, // Path to the uploaded address proof document
        },
        gstRegistrationCertificate: {
            type: String,
            required: true, // Path to the uploaded GST registration certificate
        },
    },
    complianceUndertaking: {
        type: Boolean,
        default: true, // Indicates compliance with applicable laws
    },
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
        default: 'Pending', // Status of the application
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically captures creation time
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Automatically captures update time
    },
});

export default mongoose.model(
    'RetailAndWholesaleLicense',
    RetailAndWholesaleLicenseSchema
);

//dummy data
// {
//     businessName: "Ayurveda Retailers Co.",
//     businessType: "Both",
//     ayushLicenseRequired: false,
//     businessAddress: "Shop 123, Market Street, Bangalore, India",
//     contactDetails: {
//         email: "kartik@ayurvedaretailers.com",
//         phone: "9118018219",
//     },
//     documents: {
//         businessRegistrationCertificate: "uploads/business_registration_certificate.pdf",
//         premisesAddressProof: "uploads/premises_address_proof.pdf",
//         gstRegistrationCertificate: "uploads/gst_registration_certificate.pdf",
//     },
//     complianceUndertaking: true,
//     applicationStatus: "Pending",
//     createdAt: new Date(),
//     updatedAt: new Date(),
// }
