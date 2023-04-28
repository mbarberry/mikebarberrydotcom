const { server } = require('./lambdaServer');
const serverlessExpress = require('@vendia/serverless-express');

exports.handler = async (event, context) => {
  const expressServer = serverlessExpress({ app: server });
  return expressServer(event, context);
};
