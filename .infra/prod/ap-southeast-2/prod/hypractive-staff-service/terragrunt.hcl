# ---------------------------------------------------------------------------------------------------------------------
# TERRAGRUNT CONFIGURATION
# This is the configuration for Terragrunt, a thin wrapper for Terraform that supports locking and enforces best
# practices: https://github.com/gruntwork-io/terragrunt
# ---------------------------------------------------------------------------------------------------------------------



# Terragrunt will copy the Terraform configurations specified by the source parameter, along with any files in the
# working directory, into a temporary folder, and execute your Terraform commands in that folder.
terraform {
  source = "git@github.com:hyprnz/hypr-terraform-modules.git//lambda/application?ref=v0.5.0"
}

# Include all settings from the root terragrunt.hcl file
include {
  path = "${find_in_parent_folders()}"
}

# ---------------------------------------------------------------------------------------------------------------------
# MODULE PARAMETERS
# These are the variables we have to pass in to use the module specified in the terragrunt configuration above
# ---------------------------------------------------------------------------------------------------------------------
inputs = {
  application_runtime = "nodejs16.x"
  application_version = "0.0.1"
  application_env_vars = {
    API_KEY = "TODO: need to set grab this from ssm params"
    WORKSPACE_ID = "605a5bfe2ee8a33c7713614d"; # HYPR Innovation
  }
  create_dynamodb_table = true
  dynamodb_table_name   = "hypractive-clockify-api-client-prod"
  dynamodb_hash_key     = "id"
}
