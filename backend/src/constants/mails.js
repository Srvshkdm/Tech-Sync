const getEmailVerificationMailLayout = (url) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <div style="background-color: #f68533; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0;">
                        Verify Your Email Address
                    </h1>
                </div>

                <!-- Body -->
                <div style="padding: 20px; color: #374151; text-align: left;">
                    <p style="font-size: 16px; margin-bottom: 20px;">
                        Hello from AYUSH Startup Connect,
                    </p>
                    <p style="font-size: 16px; margin-bottom: 20px;">
                        Thank you for signing up! To complete your registration and access your account, please verify your email address.
                    </p>
                    <p style="font-size: 16px; margin-bottom: 20px;">
                        <b>This verification link will expire in 1 hour.</b>
                    </p>

                    <!-- Button -->
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${url}" style="display: inline-block; background-color: #f68533; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            Verify Email Address
                        </a>
                    </div>
                    
                    <p style="font-size: 14px; margin-top: 20px; color: #6b7280;">
                        If you did not request this, please contact our support team at:
                    </p>
                    <p style="font-size: 14px; color: #1e62d0;">
                        Phone: +1 (123) xxx-xxxx | Email: ayushstartup@gmail.com
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f9fafb; padding: 20px; color: #6b7280; text-align: center; font-size: 12px;">
                    <p style="margin: 0;">
                        © ${new Date().getFullYear()} AYUSH Startup Connect. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    `;
};

const getPasswordResetMailLayout = (url) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; text-align: center;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                    <div style="background-color: #f68533; padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0;">
                            Reset Your Password
                        </h1>
                    </div>

                <!-- Body -->
                    <div style="padding: 20px; color: #374151; text-align: left;">
                        <p style="font-size: 16px; margin-bottom: 20px;">
                            Hello from AYUSH Startup Connect,
                        </p>
                        <p style="font-size: 16px; margin-bottom: 20px;">
                            We received a request to reset the password for your AYUSH Startup account. Click the button below to reset your password.
                        </p>
                        
                        <p style="font-size: 16px; margin-bottom: 20px;">
                            This link is valid for <b>1 hour</b>.
                        </p>

                        <!-- Button -->
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${url}" style="display: inline-block; background-color: #f68533; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                Reset Password
                            </a>
                        </div>
                        
                        <p style="font-size: 14px; margin-top: 20px; color: #6b7280;">
                            If you did not request this, please contact our support team at:
                        </p>
                        <p style="font-size: 14px; color: #1e62d0;">
                            Phone: +1 (123) xxx-xxxx | Email: ayushstartup@gmail.com
                        </p>
                    </div>

                <!-- Footer -->
                    <div style="background-color: #f9fafb; padding: 20px; color: #6b7280; text-align: center; font-size: 12px;">
                        <p style="margin: 0;">
                            © ${new Date().getFullYear()} AYUSH Startup Connect. All rights reserved.
                        </p>
                    </div>
            </div>
        </div>
    `;
};

export { getEmailVerificationMailLayout, getPasswordResetMailLayout };
