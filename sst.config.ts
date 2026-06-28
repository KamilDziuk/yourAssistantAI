/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "yourassistantai",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: false,
      home: "aws",
    };
  },
  async run() {
    const openAiKey = new sst.Secret("OPENAI_API_KEY");
    const mongoUri = new sst.Secret("MONGO_URI");
    const secretToken = new sst.Secret("SECRET_TOKEN");

    const api = new sst.aws.Function("Api", {
      handler: "server/lambda.handler",
      url: true,
      runtime: "nodejs22.x",
      timeout: "30 seconds",
      link: [openAiKey, mongoUri],

      environment: {
        NODE_ENV: "production",
        OPENAI_API_KEY: openAiKey.value,
        MONGO_URI: mongoUri.value,
        SECRET_TOKEN: secretToken.value,
      },
    });

    const site = new sst.aws.StaticSite("Frontend", {
      path: "client",

      build: {
        command: "npm run build",
        output: "dist",
      },

      environment: {
        VITE_API_URL: api.url,
      },
      domain: {
        name: "yourassistantai.uk",
        aliases: ["www.yourassistantai.uk"],
        dns: false,
        cert: "arn:aws:acm:us-east-1:387075079525:certificate/7b0acb4a-bc5f-4c4c-8b0d-1acb32f34bec",
      },
    });

    return {
      api: api.url,
      site: site.url,
    };
  },
});
