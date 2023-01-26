import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Interview } from "./components/exporter";
import { getVpc } from "./imports";

export interface ServiceStackProps extends StackProps {
  domainName: string;
}

export class InterviewStack extends Stack {
  constructor(scope: Construct, id: string, props: ServiceStackProps) {
    super(scope, id, props);

    const vpc = getVpc(this);

    new Interview(this, "Interview", props.domainName, vpc);
  }
}
