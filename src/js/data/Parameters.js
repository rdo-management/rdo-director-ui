/*eslint-disable quotes, quote-props, max-len */

export default {
  "NestedParameters": {
    "level-1-groups": {
      "NestedParameters": {
        "0": {
          "NestedParameters": {
            "level-2-resource": {
              "Type": "jdob::Level2",
              "Description": "level 2 nested template",
              "Parameters": {
                "level-2-p2-optional": {
                  "Default": "",
                  "Type": "String",
                  "NoEcho": "false",
                  "Description": "not set by parent, should be considered a param_default parameter",
                  "Label": "level-2-p2-optional"
                },
                "level-2-p1": {
                  "Type": "String",
                  "NoEcho": "false",
                  "Description": "must be set by parent; should have a value in the nested params list",
                  "Value": "level-1-set-value",
                  "Label": "level-2-p1"
                }
              }
            }
          },
          "Type": "jdob::Level1",
          "Description": "level 1 nested template",
          "Parameters": {
            "level-1-p1": {
              "Type": "String",
              "NoEcho": "false",
              "Description": "must be set by parent; should have a value in the nested params list",
              "Value": "parent-set-value-1",
              "Label": "level-1-p1"
            },
            "level-1-p2-optional": {
              "Default": "",
              "Type": "String",
              "NoEcho": "false",
              "Description": "not set by parent, should be considered a param_default parameter",
              "Label": "level-1-p2-optional"
            }
          }
        }
      },
      "Type": "OS::Heat::ResourceGroup",
      "Description": "No description",
      "Parameters": {}
    }
  },
  "Description": "parent template",
  "Parameters": {
    "parent-p1": {
      "Default": "foo",
      "Type": "String",
      "NoEcho": "false",
      "Description": "parent first parameter",
      "Label": "parent-p1"
    }
  }
};
