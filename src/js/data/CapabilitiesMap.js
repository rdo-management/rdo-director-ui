/*eslint-disable quotes, quote-props, max-len */

export default {
  filename: 'capabilities_map.yaml',
  content: {
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
                "description": null,
                "enabled": true
              }
            ]
          }
        ]
      },
      {
        "title": "Deployment Mode",
        "description": null,
        "environment_groups": [
          {
            "title": "High Availability",
            "description": "Enables configuration of an Overcloud controller with Pacemaker",
            "environments": [
              {
                "file": "environments/puppet-pacemaker.yaml",
                "title": "Pacemaker",
                "description": "Enable configuration of an Overcloud controller with Pacemaker"
              }
            ]
          }
        ]
      },
      {
        "title": "Network",
        "description": "Configure Networking",
        "environment_groups": [
          {
            "title": "Network Isolation",
            "description": "Enable Network Isolation Enable the creation of Neutron networks for isolated Overcloud traffic and configure each role to assign ports (related to that role) on these networks.\n",
            "environments": [
              {
                "file": "environments/network-isolation.yaml",
                "title": "Network Isolation",
                "description": "Enable Network Isolation"
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
                "description": "Configure each role to use a pair of bonded nics (nic2 and nic3) and configures an IP address on each relevant isolated network for each role. This option assumes use of Network Isolation.\n"
              },
              {
                "file": "environments/net-single-nic-with-vlans.yaml",
                "title": "Single nic with Vlans",
                "description": "Configure each role to use Vlans on a single nic for each isolated network. This option assumes use of Network Isolation.\n"
              }
            ]
          },
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
                "description": "Enable a Cisco N1KV backend, configured via puppet\n"
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
                "description": null
              }
            ]
          }
        ]
      },
      {
        "title": "Additional services",
        "description": null,
        "environment_groups": [
          {
            "title": "Cinder Storage",
            "description": "Cinder is a Block Storage service for OpenStack. It's designed to allow the use of either a reference implementation (LVM) to present storage resources to end users that can be consumed by the OpenStack Compute Project (Nova). The short description of Cinder is that it virtualizes pools of block storage devices and provides end users with a self service API to request and consume those resources without requiring any knowledge of where their storage is actually deployed or on what type of device.\n",
            "environments": [
              {
                "file": "environments/cinder-netapp-config.yaml",
                "title": "Cinder Storage",
                "description": "Enable Cinder Storage",
                "resource_capabilities": null
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
                "description": null
              }
            ]
          },
          {
            "title": "Ceph",
            "description": "Enable the use of an externally managed Ceph cluster\n",
            "environments": [
              {
                "file": "environments/puppet-ceph-external.yaml",
                "title": "Ceph",
                "description": null
              }
            ]
          },
          {
            "title": "Ceph Devel",
            "description": "enable a Ceph storage cluster using the controller and 2 ceph nodes. Rbd backends are enabled for Cinder, Glance, and Nova.\n",
            "environments": [
              {
                "file": "environments/puppet-ceph-devel.yaml",
                "title": "Ceph Devel",
                "description": null
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
                "description": null
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
                "description": null
              }
            ]
          },
          {
            "title": "Overcloud Steps",
            "description": "Specifies hooks/breakpoints where overcloud deployment should stop Allows operator validation between steps, and/or more granular control. Note: the wildcards relate to naming convention for some resource suffixes, e.g see puppet/*-post.yaml, enabling this will mean we wait for a user signal on every *Deployment_StepN resource defined in those files.\n",
            "environments": [
              {
                "file": "environments/overcloud-steps.yaml",
                "title": "Overcloud Steps",
                "description": null
              }
            ]
          }
        ]
      }
    ]
  }
};
