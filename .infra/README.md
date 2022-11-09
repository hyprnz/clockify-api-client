# HYPRActive Staff Service IaC

## Getting started

One time steps:

- [Provision your AWS IAM user](https://github.com/hyprnz/aws-platform-live/blob/main/infosec/ap-southeast-2/prod/iam/README.md)
  - If you are on the DevOps team or intend to be running Terraform, you will need to be added to the infra admins
    groups
- Install and set up the [required tools](https://github.com/hyprnz/aws-platform-live/blob/main/docs/tooling.md)

In this repo:

```shell
cd .infra
asdf install
```

### To run your terraform:

```shell
# Navigate to the directory of the resource you want to provision, e.g.
cd infosec/ap-southeast-2/prod/hypractive-staff-service-artifactory

# ***************
# * This is using the `hypr-nonprod-infraadmin` profile - use the
# * hypr-prod-infraadmin for provisioning prod environment!
# ***************

# One time - prepare the working directory
aws-vault exec hypr-nonprod-infraadmin -- terragrunt init

# Show the changes between the TF configuration and what is currently in TF state
aws-vault exec hypr-nonprod-infraadmin -- terragrunt plan

# Create/update the infrastructure!
aws-vault exec hypr-nonprod-infraadmin -- terragrunt apply
```

### Understanding the code

Within the `.infra` folder, you'll find a `.tool-versions` file. This defines the exact Terraform and Terragrunt
versions used in the project for [asdf](https://asdf-vm.com/guide/introduction.html#how-it-works), which we use to
manage versions. Terraform remote state has strict rules around versions, so ensuring you have the correct version and
avoid accidental upgrades is important.

You'll also find a `terragrunt.hcl` in the `.infra` folder. This the base Terragrunt config for the project, defining
any parameters that apply to all the Terragrunt configurations in child folders. It is merged into child
`terragrunt.hcl` configs via an `include` block.

The file path follows `[account]/[region]/[environment]/[resource]/terragrunt.hcl`, which is used as the unique name for
the resource for our Terraform state:

- `account`: Maps to the IAM account alias in AWS. Read more about our different accounts and what we use them for
  [here](https://github.com/hyprnz/aws-platform-live#aws-account-design).
- `region`: AWS region that the resource will be provisioned in. For now, everything should be living in
  `ap-southeast-2`.
- `environment`: For now, we'll use either `uat` or `prod`.
- `resource`: e.g. service name.

We are making use of Terraform modules, which help to reduce complexity and repetition in our TF code. This repo
currently implements a lambda application module from
[hypr-terraform-modules](https://github.com/hyprnz/hypr-terraform-modules), which is our organisational abstraction over
HYPR's [terraform-aws-lambda-application-module](https://github.com/hyprnz/terraform-aws-lambda-application-module). You
can get some additional context from the READMEs in the
[hypr-terraform-modules](https://github.com/hyprnz/hypr-terraform-modules) and
[aws-platform-live](https://github.com/hyprnz/aws-platform-live) repos.

> **Definition!** You'll see we are using an `artifactory` for our lambda application. Artifactory is an abbreviation of
> artifact repository. While we store and manage our source code in repositories in GitHub, an artifactory is a
> repository for built code (binaries, often referred to as artifacts.) We use the artifactory to support Continuous
> Integration - we build the source code once and store it in the artifactory. From there, the same artifact can be
> called and deployed into all of our environments, so we can have confidence that working code in UAT will be the same
> working code in production.
