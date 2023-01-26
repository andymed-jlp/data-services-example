# Interview Pairing Exercise

To get started:

```
cd infra
npm i
```

Please load credentials supplied and then you can:

```
npx cdk synth -c config=development
```

(please note that because cdk.context.json exists no need to access the AWS account is needed to create the CloudFormation)

Once you have set up credentials you can deploy using:

```
npx cdk deploy -c config=development --profile interview
```

or

```
npm run deploy-dev -- --profile interview
```
