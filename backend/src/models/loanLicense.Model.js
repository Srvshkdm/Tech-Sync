import mongoose from 'mongoose';

const LoanLicenseSchema = new mongoose.Schema({
    loaningBusiness: {
        type: String,
        required: true,
    },
    loaningManufacturingUnit: {
        type: String,
        required: true, // Address or identifier of the manufacturing unit
    },
    ayushManufacturingLicense: {
        type: String,
        required: true, // File path or URL for the AYUSH manufacturing license copy
    },
    landType: {
        type: String,
        enum: ['Industrial'], // Loan manufacturing unit must be on industrial land
        required: true,
    },
    storageFacilities: {
        rawMaterialStorage: {
            type: Boolean,
            required: true,
            default: false,
        },
        finishedProductStorage: {
            type: Boolean,
            required: true,
            default: false,
        },
        officeForBusinessActivities: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    pharmaciesOrAyurvedicExpertsRequired: {
        type: Boolean,
        default: false, // Not required for loan licenses
    },
    renewalFrequency: {
        type: String,
        enum: ['Annual', 'Biennial', 'Other'],
        required: true,
    },
    documents: {
        ayushManufacturingLicenseCopy: {
            type: String,
            required: true, // File path or URL
        },
        premisesAddressProof: {
            type: String,
            required: true, // File path or URL
        },
        businessConstitutionDocument: {
            type: String,
            required: true, // File path or URL
        },
        equipmentList: {
            type: String,
            required: true, // File path or URL
        },
        storageRoomDetails: {
            type: String,
            required: true, // File path or URL
        },
    },
    applicationStatus: {
        type: String,
        enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('LoanLicense', LoanLicenseSchema);

//dummy data

// {
//     loaningBusiness: "Herbal Health Solutions Pvt Ltd",
//     loaningManufacturingUnit: "Industrial Estate, Plot 25, Mumbai, India",
//     ayushManufacturingLicense: "uploads/ayush_manufacturing_license.pdf",
//     landType: "Industrial",
//     storageFacilities: {
//         rawMaterialStorage: true,
//         finishedProductStorage: true,
//         officeForBusinessActivities: true,
//     },
//     pharmaciesOrAyurvedicExpertsRequired: false,
//     renewalFrequency: "Annual",
//     documents: {
//         ayushManufacturingLicenseCopy: "uploads/ayush_manufacturing_license_copy.pdf",
//         premisesAddressProof: "uploads/premises_address_proof.pdf",
//         businessConstitutionDocument: "uploads/business_constitution_document.pdf",
//         equipmentList: "uploads/equipment_list.pdf",
//         storageRoomDetails: "uploads/storage_room_details.pdf",
//     },
//     applicationStatus: "Pending",
//     createdAt: new Date(),
//     updatedAt: new Date(),
// }
