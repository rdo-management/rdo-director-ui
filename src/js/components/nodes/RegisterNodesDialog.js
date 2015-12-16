import * as _ from 'lodash';
import ClassNames from 'classnames';
import { Link } from 'react-router';
import React from 'react';

import BlankSlate from '../ui/BlankSlate';
import NotificationActions from '../../actions/NotificationActions';
import RegisterNodeForm from './RegisterNodeForm';
import Tab from '../ui/Tab';
import TabPane from '../ui/TabPane';

export default class RegisterNodesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodesToRegister: [],
      selectedNodeIndex: undefined,
      canSubmit: false,
      formErrors: []
    };
  }

  onNodeChange(updatedNode) {
    let nodesToRegister = this.state.nodesToRegister.slice();
    let index = _.findIndex(nodesToRegister,
                            (node) => { return node.id === this.state.selectedNodeIndex; });
    nodesToRegister[index] = updatedNode;
    this.setState({nodesToRegister: nodesToRegister});
  }

  addNodesFromInstackenvJSON(fileContents) {
    let nodes = JSON.parse(fileContents).nodes;
    nodes.forEach(node => {
      switch(node.pm_type) {
      case 'pxe_ssh':
        this.addNode({
          driver: node.pm_type,
          nicMacAddress: node.mac,
          driver_info: {
            ssh_virt_type: 'virsh',
            ssh_address: node.pm_addr,
            ssh_user: node.pm_user,
            ssh_key_contents: node.pm_password,
            deploy_kernel: '',
            deploy_ramdisk: ''
          }
        });
        break;
      case 'pxe_ipmitool':
        this.addNode();
        break;
      default:
        break;
      }
    });
  }

  uploadFromFile(event) {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.onload = (f => {
      return (e => {
        if (file.name.match(/(\.json)$/)) {
          this.addNodesFromInstackenvJSON(e.target.result);
        } else if (file.name.match(/(\.csv)$/)) {
          // TODO(jtomasek): add CSV file support
          // this.addNodesFromCSV(e.target.result);
          NotificationActions.notify({
            title: 'CSV Upload Unsupported',
            message: 'The selected file format is not supported yet',
            type: 'error'
          });
        } else {
          NotificationActions.notify({
            title: 'Unsuported File Format',
            message: 'Please provide csv file or instackenv.json',
            type: 'error'
          });
        }
      });
    })(file);
    reader.readAsText(file);
  }

  selectFile() {
    this.refs.regNodesUploadFileInput.click();
  }

  onAddNewClick(e) {
    e.preventDefault();
    this.addNode();
  }

  addNode(newNode={driver: 'pxe_ssh', driver_info: {}}) {
    let nodesToRegister = this.state.nodesToRegister.slice();
    newNode.id = Date.now(); // generate unique id for component identification
    newNode.valid = false;
    nodesToRegister.push(newNode);
    this.setState({nodesToRegister: nodesToRegister,
                   selectedNodeIndex: newNode.id,
                   canSubmit: false});
  }

  removeNode(id, e) {
    e.preventDefault();
    let nodesToRegister = this.state.nodesToRegister.slice();
    _.remove(nodesToRegister, (node) => { return node.id === id; });
    let nodeToSelect = _.last(nodesToRegister);
    this.setState({nodesToRegister: nodesToRegister},
                  () => { this.selectNode(nodeToSelect ? nodeToSelect.id : undefined); });
  }

  selectNode(id) {
    this.setState({selectedNodeIndex: id});
  }

  renderNode(node, index) {
    // TODO(jtomasek): fix the name setting here
    let nodeName = node.ssh_address || `Undefined Node ${node.id}`;
    let validationIconClasses = ClassNames({
      'pficon': true,
      'pficon-error-circle-o': !node.valid
    });

    return (
      <Tab key={index} isActive={node.id === this.state.selectedNodeIndex}>
        <a className="link" onClick={this.selectNode.bind(this, node.id)}>
          <span className={validationIconClasses}/> {nodeName}
          <span className="tab-action fa fa-trash-o" onClick={this.removeNode.bind(this, node.id)}/>
        </a>
      </Tab>);
  }

  renderNodeTabs() {
    let renderNode = this.renderNode.bind(this);
    return this.state.nodesToRegister.map(function(node, i) {
      return renderNode(node, i);
    });
  }

  renderTabPanes() {
    if (this.state.selectedNodeIndex) {
      return this.state.nodesToRegister.map((node, index) => {
        return (
          <TabPane key={index}
                   isActive={this.state.selectedNodeIndex === node.id}
                   renderOnlyActive>
            <RegisterNodeForm selectedNode={node} onUpdateNode={this.onNodeChange.bind(this)}/>
          </TabPane>
        );
      });
    } else {
      return (
        <BlankSlate iconClass="fa fa-cubes"
                    title="No Nodes To Register"
                    message="Add a node manually or upload nodes from a file." />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="modal modal-routed in" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* <Formsy.Form ref="RegisterNodesForm"
                               role="form"
                               className="form-horizontal"
                               onChange={this.onNodeChange.bind(this)}
                               onValidSubmit={this.onFormSubmit.bind(this)}
                               onValid={this.onFormValid.bind(this)}
                              onInvalid={this.onFormInvalid.bind(this)}>*/}
                <div className="modal-header">
                  <Link to="/nodes/registered"
                        type="button"
                        className="close">
                    <span className="pficon pficon-close"></span>
                  </Link>
                  <h4 className="modal-title">Register Nodes</h4>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-xs-5">
                      <div className="nav-stacked-actions">
                        <button className="btn btn-default"
                                onClick={this.onAddNewClick.bind(this)}>
                          <span className="fa fa-plus"/> Add New
                        </button>
                        &nbsp; or &nbsp;
                        <button className="btn btn-default"
                                onClick={this.selectFile.bind(this)}
                                type="button">
                          <span className="fa fa-upload"/> Upload From File
                        </button>
                        <input style={{display: 'none'}}
                               ref="regNodesUploadFileInput"
                               id="regNodesUploadFileInput"
                               type="file" accept="text/csv,text/json"
                               onChange={this.uploadFromFile.bind(this)}/>
                      </div>
                      <ul className="nav nav-pills nav-stacked nav-arrows">
                        {this.renderNodeTabs().reverse()}
                      </ul>
                    </div>
                    <div className="col-xs-7">
                      <div className="tab-content">
                        {this.renderTabPanes()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Link to="/nodes/registered"
                        type="button"
                        className="btn btn-default">Cancel</Link>
                  <button disabled={!this.state.canSubmit}
                          className="btn btn-primary"
                          type="submit">
                    Register Nodes
                  </button>
                </div>
              {/*</Formsy.Form>*/}
            </div>
          </div>
        </div>
        <div className="modal-backdrop in"></div>
      </div>
    );
  }
}
