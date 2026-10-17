const { expo } = require('./app.json');
module.exports = {
  expo: {
    ...expo,
    extra: {
      ...(expo.extra || {}),
      eas: {
        ...(expo.extra?.eas || {}),
        ...(process.env.EXPO_PROJECT_ID ? { projectId: process.env.EXPO_PROJECT_ID } : {}),
      },
    },
  },
};
