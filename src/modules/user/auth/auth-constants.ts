const authConstants = {
  jwt: {
    secret: 'jwt_secret',
    expirationTime: {
      accessToken: '1d',
      refreshToken: '2d',
    },
  },
  mailer: {
    verifyEmail: {
      subject: 'Email Verification',
      template: 'verify-password',
    },
  },
  redis: {
    expirationTime: {
      jwt: {
        accessToken: 86400, // 1d
        refreshToken: 604800, // 7d
      },
    },
  },
};

export default authConstants;
