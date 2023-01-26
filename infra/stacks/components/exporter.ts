import { Construct } from "constructs";
import { CfnOutput, Duration } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";

import { IVpc, SubnetType } from "aws-cdk-lib/aws-ec2";

/**
 * Creates a Cognito IDP and groups which federates with Google only
 */
export class Interview extends Construct {
  constructor(scope: Construct, id: string, domainName: string, vpc: IVpc) {
    super(scope, id);

    const lambda = new NodejsFunction(scope, `${id}Exporter`, {
      description: "Interview Experiment",
      timeout: Duration.seconds(10),
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: "./lambda/export/src/main.ts",
      environment: {},
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      }),
      bundling: {
        externalModules: ["aws-sdk"],
      },
    });

    new CfnOutput(this, `ExporterLambdaArn`, {
      value: lambda.functionArn,
    });

    new CfnOutput(this, `ExporterLambdaName`, {
      value: lambda.functionName,
    });
  }
}
