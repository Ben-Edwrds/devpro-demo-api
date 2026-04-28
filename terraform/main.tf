# Compartment
resource "oci_identity_compartment" "pe_compartment" { 
	#vrij te kiezen
	name = "PE_Compartment" 
	# vrij te kiezen maar ENKEL a-z, A-Z, 0-9, ., -, _ IS ZELFDE ALS DISPLAY_NAME
	description = "Compartment voor Practice Enterprise" 
	#vrij te kiezen
	compartment_id = "ocid1.tenancy.oc1..aaaaaaaa6t27snlu2okvz3cdp6ir2ypwzzbyhq7qhmtizzluc4tpk4ii3pja"
}

# Virtual Cloud Network (VCN)
resource "oci_core_vcn" "pe_vcn" {
	#test_vcn vrij te kiezen
	compartment_id = oci_identity_compartment.pe_compartment.id
	# Verwijst naar het test_compartment
	display_name = "PE VCN"
	# vrij te kiezen
	cidr_block = "10.0.0.0/16"
	dns_label = "pevcn"
	# vrij te kiezen maar simpel houden
}

# Subnet
resource "oci_core_subnet" "pe_subnet" {
	#test_subnet vrij te kiezen
	compartment_id = oci_identity_compartment.pe_compartment.id 
	# Verwijst naar het compartment hierboven
	vcn_id = oci_core_vcn.pe_vcn.id
	# Verwijst naar de test_vcn
	cidr_block = "10.0.1.0/24"
	display_name = "PE Subnet"
	# vrij te kiezen
	availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
	# Het eerste beschikbaarheidsdomein
	route_table_id = oci_core_route_table.pe_route_table.id
}

# Internet Gateway
resource "oci_core_internet_gateway" "pe_ig" { 
	#test_ig vrij te kiezen
	compartment_id = oci_identity_compartment.pe_compartment.id
	# Verwijst naar het pe_compartment
	vcn_id = oci_core_vcn.pe_vcn.id 
	# Verwijst naar de pe_vcn
	display_name = "PE InternetGateway" 
	# vrij te kiezen
}

# Route Table instellen voor internetverbinding
resource "oci_core_route_table" "pe_route_table" { 
	#pe_route_table vrij te kiezen
	compartment_id = oci_identity_compartment.pe_compartment.id
	# Verwijst naar het test_compartment
	vcn_id = oci_core_vcn.pe_vcn.id 
	# Verwijst naar de test_vcn
	display_name = "PE Routing Table" 
	# vrij te kiezen
	route_rules {
		network_entity_id = oci_core_internet_gateway.pe_ig.id 
		# Verwijst naar de internet gateway hierboven
		destination = "0.0.0.0/0"
	}
}

#Compute Instance (VM) aanmaken
resource "oci_core_instance" "pe_vm" { 
	# test_vm vrij te kiezen
	compartment_id = oci_identity_compartment.pe_compartment.id 
	# Verwijst naar het pe_compartment
	availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name 
	# Het eerste beschikbaarheidsdomein
	shape = "VM.Standard2.1"
	display_name = "PE VM" 
	# vrij te kiezen
	create_vnic_details {
		subnet_id = oci_core_subnet.pe_subnet.id 
		# Verwijst naar het pe_subnet
	}

	source_details {
	source_type = "image"
	source_id   = data.oci_core_images.os_images.images[0].id
	}

	metadata = {
	ssh_authorized_keys = file("./credentials/id_rsa.pub") 
# Vervang dit met het pad naar de publieke ssh (zelf aangemaakt) 
# voor deze VM (gebruikt om in te loggen) staat in de terraform map
# dus de naam is voldoende
}
}

#juiste image vinden en toevoegen aan de instance
data "oci_core_images" "os_images" {
  compartment_id   = oci_identity_compartment.pe_compartment.id
  operating_system = "Canonical Ubuntu"
  operating_system_version = "24.04"
  shape            = "VM.Standard2.1"
}
