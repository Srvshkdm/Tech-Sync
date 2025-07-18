// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';

import {
    AboutUsPage,
    ContactUsPage,
    FAQpage,
    HomePage,
    RegisterPage,
    LoginPage,
    StartupApplicationsPage,
    ServerErrorPage,
    NotFoundPage,
    TrackApplication,
    DPIITregistrationPage,
    RegisterInvestorPage,
    PrivacyPoliciesPage,
    AdminDashboard,
    DocumentsCheck,
    AyushServicesPage,
    AadhaarVerificationPage,
    LicenseGeneratorPage,
    ChatBot,
    ReadMore1,
    ReadMore2,
    ReadMore3,
} from './pages';

import {
    LayoutOne,
    LayoutTwo,
    LayoutThree,
    EmailVerification,
    ResetPassword,
    Redirect,
    FinancialInformation,
    BankingInformation,
    PersonalInformation,
    OrganizationInformation,
    StartupOwnerDocuments,
    StartupReview,
    InvestedStartups,
    TargetedStartups,
    InvestorBankingInfo,
    InvestorFinancialInfo,
    InvestorPersonalInfo,
    InvestorDocuments,
    InvestorReview,
    SubmissionSuccess,
    StartupSubmissionSuccess,
    DPIITDocs,
} from './components';

import {
    ProfileDropdownContextProvider,
    VariantContextProvider,
    UserContextProvider,
    RegisterStartupContextProvider,
    RegisterInvestorContextProvider,
} from './contexts';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<LayoutOne />}>
                <Route path="" element={<HomePage />} />
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="contact-us" element={<ContactUsPage />} />
                <Route path="faqs" element={<FAQpage />} />
                <Route path="services" element={<AyushServicesPage />} />
                <Route
                    path="privacy-policies"
                    element={<PrivacyPoliciesPage />}
                />
                <Route path="readmore1" element={<ReadMore1 />} />
                <Route path="readmore2" element={<ReadMore2 />} />
                <Route path="readmore3" element={<ReadMore3 />} />
                <Route
                    path="admin-dashboard"
                    element={
                        <Redirect path="/login">
                            <AdminDashboard />
                        </Redirect>
                    }
                />
            </Route>

            <Route path="" element={<LayoutTwo />}>
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route
                    path="license-generator/verification"
                    element={<AadhaarVerificationPage />}
                />
                <Route
                    path="license-generator/generation"
                    element={<LicenseGeneratorPage />}
                />
                <Route
                    path="user/verify/:userId/:uniqueString"
                    element={
                        <Redirect path="/" ifLoggedIn={true}>
                            <EmailVerification />
                        </Redirect>
                    }
                />
                <Route
                    path="user/reset-password/:userId/:resetString"
                    element={
                        <Redirect path="/login" ifLoggedIn={false}>
                            <ResetPassword />
                        </Redirect>
                    }
                />
            </Route>

            <Route path="" element={<LayoutThree />}>
                <Route path="chatbot" element={<ChatBot />} />
                <Route
                    path="invested-startups/:userId"
                    element={<InvestedStartups />}
                />

                <Route
                    path="applications/:userId"
                    element={<StartupApplicationsPage />}
                />

                <Route
                    path="application/:appId"
                    element={
                        <RegisterStartupContextProvider>
                            <Redirect path="/login">
                                <TrackApplication />
                            </Redirect>
                        </RegisterStartupContextProvider>
                    }
                >
                    <Route index element={<PersonalInformation />} />
                    <Route path="personal" element={<PersonalInformation />} />
                    <Route
                        path="organization"
                        element={<OrganizationInformation />}
                    />
                    <Route
                        path="financial"
                        element={<FinancialInformation />}
                    />
                    <Route path="banking" element={<BankingInformation />} />
                    <Route
                        path="documents"
                        element={<StartupOwnerDocuments />}
                    />
                    <Route path="review" element={<StartupReview />} />
                </Route>
                <Route
                    path="DPIIT/registration/:userId"
                    element={<DPIITregistrationPage />}
                />
                <Route path="register-DPIIT/docs" element={<DPIITDocs />} />
                <Route
                    path="become-investor/:investorId"
                    element={
                        <Redirect path="/">
                            <RegisterInvestorPage />
                        </Redirect>
                    }
                >
                    <Route index element={<InvestorPersonalInfo />} />
                    <Route path="personal" element={<InvestorPersonalInfo />} />
                    <Route
                        path="financial"
                        element={<InvestorFinancialInfo />}
                    />
                    <Route path="banking" element={<InvestorBankingInfo />} />
                    <Route path="documents" element={<InvestorDocuments />} />
                    <Route path="review" element={<InvestorReview />} />
                </Route>
                <Route
                    path="targeted-startups/:userId"
                    element={<TargetedStartups />}
                />
                <Route
                    path="submission-success"
                    element={<SubmissionSuccess />}
                />
                <Route
                    path="startup-submission-success"
                    element={<StartupSubmissionSuccess />}
                />
            </Route>
            <Route
                path="document-check/startups/:id"
                element={
                    <Redirect path="/login">
                        <DocumentsCheck />
                    </Redirect>
                }
            />
            <Route path="/server-error" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <UserContextProvider>
        <RegisterInvestorContextProvider>
            <ProfileDropdownContextProvider>
                <VariantContextProvider>
                    <RouterProvider router={router} />
                </VariantContextProvider>
            </ProfileDropdownContextProvider>
        </RegisterInvestorContextProvider>
    </UserContextProvider>
    // </StrictMode>
);
