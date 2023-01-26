#!/usr/bin/env node
import { InterviewStack } from "../stacks/InterviewStack";
import { App } from "aws-cdk-lib";

const app = new App();

const envSettings = (env?: string) => {
  if (env === "production") {
    return {
      env: { account: "xxx", region: "eu-west-1" },
      domainName: "data-services.tm-awx.com",
    };
  }

  return {
    env: { account: "613128072254", region: "eu-west-1" },
    domainName: "dev.data-services.tm-awx.com",
  };
};

const contextEnv = app.node.tryGetContext("config");
if (!contextEnv) {
  throw new Error("Please supply a context variable");
}

new InterviewStack(app, "InterviewStack", {
  description: "Provisions the Cheetah Integration components",
  tags: {
    CreatedBy: "DataServices",
    OwnedBy: "DataServices",
    Product: "interview",
    ServiceLevel: "bronze",
  },
  ...envSettings(contextEnv),
});
