const cookieOptions = {
    httpOnly: true,
    sameSite: 'None',
    path: '/',
    secure: true, // remove it while testing on thunderclient / postman if causing issue but req. for browser
};

export { cookieOptions };
