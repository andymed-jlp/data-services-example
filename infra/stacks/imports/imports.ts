import { Construct } from "constructs";
import { aws_ec2 as ec2 } from "aws-cdk-lib";

export const getVpc = (stack: Construct) => {
  const contextEnv = stack.node.tryGetContext("config");
  const vpcId = stack.node.tryGetContext(`${contextEnv}`).vpcId;

  return ec2.Vpc.fromLookup(stack, "AccountVpc", {
    vpcId,
  });
};

export const getConfig = (stack: Construct) => {
  const contextEnv = stack.node.tryGetContext("config");
  return stack.node.tryGetContext(`${contextEnv}`);
};
