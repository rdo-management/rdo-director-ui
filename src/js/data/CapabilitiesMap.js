/*eslint-disable quotes, quote-props, max-len */

export default {
  "root_template": "overcloud-without-mergepy.yaml",
  "topics": [
    {
      "title": "Basic Configuration",
      "description": null,
      "environment_groups": [
        {
          "title": null,
          "description": "Enable basic configuration required for OpenStack Deployment",
          "environments": [
            {
              "file": "overcloud-resource-registry-puppet.yaml",
              "title": "Default Configuration",
              "description": null
            }
          ]
        }
      ]
    },
    {
      "title": "Deployment options",
      "description": null,
      "environment_groups": [
        {
          "title": "High Availability",
          "description": "Enables configuration of an Overcloud controller with Pacemaker",
          "environments": [
            {
              "file": "environments/puppet-pacemaker.yaml",
              "title": "Pacemaker",
              "description": "Enable configuration of an Overcloud controller with Pacemaker",
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Docker RDO",
          "description": "Docker container with heat agents for containerized compute node\n",
          "environments": [
            {
              "file": "environments/docker-rdo.yaml",
              "title": "Docker RDO",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Overlay network Configuration",
      "description": null,
      "environment_groups": [
        {
          "title": "Network Isolation",
          "description": "Enable Network Isolation Enable the creation of Neutron networks for isolated Overcloud traffic and configure each role to assign ports (related to that role) on these networks.\n",
          "environments": [
            {
              "file": "environments/network-isolation.yaml",
              "title": "Network Isolation",
              "description": "Enable Network Isolation",
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Single nic or Bonding",
          "description": "Configure roles to use pair of bonded nics or to use Vlans on a single nic. This option assumes use of Network Isolation.\n",
          "environments": [
            {
              "file": "environments/net-bond-with-vlans.yaml",
              "title": "Bond with Vlans",
              "description": "Configure each role to use a pair of bonded nics (nic2 and nic3) and configures an IP address on each relevant isolated network for each role. This option assumes use of Network Isolation.\n",
              "requires": [
                "environments/network-isolation.yaml",
                "overcloud-resource-registry-puppet.yaml"
              ]
            },
            {
              "file": "environments/net-single-nic-with-vlans.yaml",
              "title": "Single nic with Vlans",
              "description": "Configure each role to use Vlans on a single nic for each isolated network. This option assumes use of Network Isolation.\n",
              "requires": [
                "environments/network-isolation.yaml",
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Neutron Plugin Configuration",
      "description": null,
      "environment_groups": [
        {
          "title": "BigSwitch extensions or Cisco N1KV backend",
          "description": null,
          "environments": [
            {
              "file": "environments/neutron-ml2-bigswitch.yaml",
              "title": "BigSwitch extensions",
              "description": "Enable Big Switch extensions, configured via puppet\n"
            },
            {
              "file": "environments/neutron-ml2-cisco-n1kv.yaml",
              "title": "Cisco N1KV backend",
              "description": "Enable a Cisco N1KV backend, configured via puppet\n",
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Cisco Neutron plugin",
          "description": "Enable a Cisco Neutron plugin\n",
          "environments": [
            {
              "file": "environments/neutron-ml2-cisco-nexus-ucsm.yaml",
              "title": "Cisco Neutron plugin",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Storage",
      "description": null,
      "environment_groups": [
        {
          "title": "Cinder NetApp backend",
          "description": "Enable a Cinder NetApp backend, configured via puppet\n",
          "environments": [
            {
              "file": "environments/cinder-netapp-config.yaml",
              "title": "Cinder NetApp backend",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Externally managed Ceph",
          "description": "Enable the use of an externally managed Ceph cluster\n",
          "environments": [
            {
              "file": "environments/puppet-ceph-external.yaml",
              "title": "Externally managed Ceph",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Ceph Devel",
          "description": "Enable a Ceph storage cluster using the controller and 2 ceph nodes. Rbd backends are enabled for Cinder, Glance, and Nova.\n",
          "environments": [
            {
              "file": "environments/puppet-ceph-devel.yaml",
              "title": "Ceph Devel",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Storage Environment",
          "description": "Can be used to set up storage backends. Defaults to Ceph used as a backend for Cinder, Glance and Nova ephemeral storage. It configures for example which services will use Ceph, or if any of the services will use NFS. And more. Usually requires to be edited by user first.\n",
          "tags": [
            "no-gui"
          ],
          "environments": [
            {
              "file": "environments/storage-environment.yaml",
              "title": "Storage Environment",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "Utilities",
      "description": null,
      "environment_groups": [
        {
          "title": "Config Debug",
          "description": "Enable config management (e.g. Puppet) debugging",
          "environments": [
            {
              "file": "environments/config-debug.yaml",
              "title": "Config Debug",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Disable journal in MongoDb",
          "description": "Since, when journaling is enabled, MongoDb will create big journal file it can take time. In a CI environment for example journaling is not necessary.\n",
          "environments": [
            {
              "file": "environments/mongodb-nojournal.yaml",
              "title": "Disable journal in MongoDb",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        },
        {
          "title": "Overcloud Steps",
          "description": "Specifies hooks/breakpoints where overcloud deployment should stop Allows operator validation between steps, and/or more granular control. Note: the wildcards relate to naming convention for some resource suffixes, e.g see puppet/*-post.yaml, enabling this will mean we wait for a user signal on every *Deployment_StepN resource defined in those files.\n",
          "tags": [
            "no-gui"
          ],
          "environments": [
            {
              "file": "environments/overcloud-steps.yaml",
              "title": "Overcloud Steps",
              "description": null,
              "requires": [
                "overcloud-resource-registry-puppet.yaml"
              ]
            }
          ]
        }
      ]
    }
  ]
};
