
# Tenancy is the root or parent to all compartments

data "oci_identity_availability_domains" "ads" {
	compartment_id = "ocid1.tenancy.oc1..aaaaaaaa6t27snlu2okvz3cdp6ir2ypwzzbyhq7qhmtizzluc4tpk4ii3pja"
}
