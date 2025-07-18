import mongoose from 'mongoose';

const ManufacturingLicenseSchema = new mongoose.Schema(
    {
        manufacturingLicenseCopy: {
            type: String,
            required: true, // File path or URL
        },
        siteLayout: {
            type: String,
            required: true, // File path or URL
        },
        manufacturingFormula: {
            type: String,
            required: false,
        },
        finishedProductSpecification: {
            type: String,
            required: false,
        },
        coppCertificationProducts: {
            type: [String], // Array of products applied/approved for COPP
            required: false,
        },
        processValidationReport: {
            type: String,
            required: false,
        },
        technicalStaffDetails: {
            type: String,
            required: false,
        },
        equipmentList: {
            type: String,
            required: false,
        },
        waterHVACDiagrams: {
            type: String,
            required: false,
        },
        proofOfSafetyAndEffectiveness: {
            type: String,
            required: false,
        },
        nonHerbalIngredientsUndertaking: {
            type: Boolean,
            default: false,
        },
        complianceUndertaking: {
            type: Boolean,
            default: false,
        },
        kycDetails: {
            type: String,
            required: false,
        },
        premisesAddressProof: {
            type: String,
            required: false,
        },
        businessConstitutionDocument: {
            type: String,
            required: false,
        },
        gmpCertificate: {
            type: String, // File path or URL
            required: false,
        },
        coppCertificate: {
            type: String, // File path or URL
            required: false, // Only if applicable
        },
        applicationStatus: {
            type: String,
            enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

export default mongoose.model(
    'ManufacturingLicense',
    ManufacturingLicenseSchema
);

//dummy data

// {
//     applicantBusiness: "Herbal Care Pvt Ltd",
//     manufacturingFacility: "Industrial Area, Sector 45, New Delhi, India",
//     landArea: 1500, // in square feet
//     gmpCertified: true,
//     ayurvedicExperts: 2,
//     ayurvedicPharmacists: 2,
//     machineryInstalled: true,
//     documents: {
//         manufacturingLicenseCopy: "uploads/manufacturing_license_copy.pdf",
//         siteLayout: "uploads/site_layout.pdf",
//         manufacturingFormula: "HerbalProductManufacturingFormula",
//         finishedProductSpecification: "uploads/finished_product_specification.pdf",
//         coppCertificationProducts: ["Herbal Oil", "Ayurvedic Soap"],
//         processValidationReport: "uploads/process_validation_report.pdf",
//         technicalStaffDetails: "uploads/technical_staff_details.pdf",
//         equipmentList: "uploads/equipment_list.pdf",
//         waterHVACDiagrams: "uploads/water_hvac_diagrams.pdf",
//         proofOfSafetyAndEffectiveness: "uploads/proof_of_safety_and_effectiveness.pdf",
//         nonHerbalIngredientsUndertaking: true,
//         complianceUndertaking: true,
//         kycDetails: "uploads/kyc_details.pdf",
//         premisesAddressProof: "uploads/premises_address_proof.pdf",
//         businessConstitutionDocument: "uploads/business_constitution_document.pdf",
//     },
//     gmpCertificate: "uploads/gmp_certificate.pdf",
//     coppCertificate: "uploads/copp_certificate.pdf",
//     applicationStatus: "Under Review",
//     createdAt: new Date(),
//     updatedAt: new Date(),
// }
