/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "yourassistantai",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const openAiKey = new sst.Secret("OPENAI_API_KEY");
    const mongoUri = new sst.Secret("MONGO_URI");

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
    });

    return {
      api: api.url,
      site: site.url,
    };
  },
});
