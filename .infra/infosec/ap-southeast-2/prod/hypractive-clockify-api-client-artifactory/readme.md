# Artifactory S3 bucket provisioning

The S3 bucket's name is `hypractive-clockify-api-client-artifactory`.

## Create the S3 bucket

```terragrunt
aws-vault exec hypr-infosec-infraadmin -- terragrunt apply
```

## Destroy the S3 bucket

```terragrunt
aws-vault exec hypr-infosec-infraadmin -- terragrunt destroy
```
