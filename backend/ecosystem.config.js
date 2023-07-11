const dotenv = require("dotenv");
dotenv.config({ path: "./.env.deploy" });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } =
  process.env;

module.exports = {
  apps: [
    {
      name: "mesto",
      script: "dist/app.js",
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      "pre-deploy-local": `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      "post-deploy": `cd ${DEPLOY_PATH}/source/backend && npm i && npm run build && pm2 restart all`,
    },
  },
  // deploy: {
  //   production: {
  //     user: DEPLOY_USER,
  //     host: DEPLOY_HOST,
  //     ref: DEPLOY_REF,
  //     repo: DEPLOY_REPOSITORY,
  //     path: DEPLOY_PATH,
  //     "pre-deploy-local": `bash scrtips/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
  //     "post-deploy":
  //       "cd backend && pwd&& npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
  //   },
  // },
};
