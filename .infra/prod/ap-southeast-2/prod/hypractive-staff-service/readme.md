# Lambda application provisioning

Before provisioning this Lambda application, you'll need to run the CI/CD pipeline to upload builds to the artifactory.

- The build's name of the application should be: `hypractive-clockify-api-client-application-artifact.zip`
- The build's name of the layer should be: `hypractive-clockify-api-client-layer-artifact.zip`

The artifactory S3 bucket's name is `hypractive-clockify-api-client-artifactory`.

## Create the Lambda application

```terragrunt
aws-vault exec hypr-prod-infraadmin -- terragrunt apply
```

## Destroy the Lambda application

```terragrunt
aws-vault exec hypr-prod-infraadmin -- terragrunt destroy
```
