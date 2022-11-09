remote_state {
  backend = "s3"
  config = {
    bucket         = "admin-terraform-state.hypr.nz"
    key            = "accounts/${path_relative_to_include()}/terraform.tfstate"
    region         = "ap-southeast-2"
    role_arn       = "arn:aws:iam::107484634957:role/TerragruntAdministrator"
    encrypt        = true
    dynamodb_table = "admin-terraform-lock"
    s3_bucket_tags = {
      owner = "terragrunt"
      name  = "Terraform state storage"
    }
    dynamodb_table_tags = {
      owner = "terragrunt"
      name  = "Terraform lock table"
    }
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# GLOBAL PARAMETERS
# These variables apply to all configurations in this subfolder. These are automatically merged into the child
# `terragrunt.hcl` config via the include block.
# ---------------------------------------------------------------------------------------------------------------------

locals {
  default_yaml_path = find_in_parent_folders("empty.yaml")
}

# Configure root level variables that all resources can inherit. This is especially helpful with multi-account configs
# where terraform_remote_state data sources are placed directly into the modules.
inputs = merge(
  # Configure Terragrunt to use common vars encoded as yaml to help you keep often-repeated variables (e.g., account ID)
  # DRY. We use yamldecode to merge the maps into the inputs, as opposed to using varfiles due to a restriction in
  # Terraform >=0.12 that all vars must be defined as variable blocks in modules. Terragrunt inputs are not affected by
  # this restriction.
  yamldecode(
    file(find_in_parent_folders("hypractive.yaml", local.default_yaml_path)),
  ),
  yamldecode(
    file(find_in_parent_folders("account.yaml", local.default_yaml_path)),
  ),
  yamldecode(
    file(find_in_parent_folders("region.yaml", local.default_yaml_path)),
  ),
  yamldecode(
    file(find_in_parent_folders("environment.yaml", local.default_yaml_path)),
  ),
)