import mongoose from 'mongoose';

const HealthcareDepartmentSchema = new mongoose.Schema(
    {
        ayushDetails: {
            typeOfServices: {
                type: [String],
                enum: ['Ayurveda', 'Yoga', 'Unani', 'Siddha', 'Homeopathy'],
                required: true,
            },
            descriptionOfActivities: { type: String, required: true },
            licenses: {
                ayushProductManufacturingLicense: {
                    type: Boolean,
                    default: false,
                },
                drugLicense: { type: Boolean, default: false },
                otherLicenses: [{ type: String }],
            },
            category: {
                type: String,
                enum: [
                    'Hospital',
                    'Clinic',
                    'Product Manufacturing',
                    'Research',
                    'Telemedicine',
                    'E-commerce',
                ],
                required: true,
            },
        },
        teamInformation: {
            founders: [
                {
                    name: { type: String, required: true },
                    qualification: { type: String, required: true },
                    licenseDetails: { type: String },
                    contact: {
                        phoneNumber: { type: String },
                        email: { type: String },
                    },
                },
            ],
        },
        complianceAndCertifications: {
            gmpCertification: { type: Boolean, default: false },
            clinicalEstablishmentCertificate: { type: Boolean, default: false },
            ayushDrugLicense: { type: Boolean, default: false },
            nablAccreditation: { type: Boolean, default: false },
            isoCertification: { type: Boolean, default: false },
        },
        infrastructureDetails: {
            facilityAddress: { type: String },
            equipmentDetails: { type: String },
            supplyChainPartners: [{ type: String }],
            researchAndDevelopmentInfo: { type: String },
        },
        supportingDocuments: {
            addressProof: { type: String }, // Path or reference to file
            identityProof: { type: String }, // Path or reference to file
            legalStructureDocs: [{ type: String }], // Path or reference to file
            permits: [{ type: String }], // Environmental, fire, etc.
            productDetails: [{ name: String, description: String }],
            clinicalTrialsData: { type: String }, // Path or reference to file
        },
        additionalInfo: {
            declarationLetter: { type: String }, // Path or reference to file
            startupRecognitionCertificate: { type: String }, // Path or reference to file
            businessPlan: { type: String }, // Path or reference to file
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    'HealthcareDepartment',
    HealthcareDepartmentSchema
);
