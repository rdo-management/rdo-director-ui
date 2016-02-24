import { Map, Record } from 'immutable';

// export const PXESSHDriverInfo = Record({
//   ssh_virt_type: 'virsh',
//   ssh_address: undefined,
//   ssh_key_contents: undefined,
//   ssh_user: undefined
// });
//
// export const PXEIPMIToolDriverInfo = Record({
//   ipmi_address: undefined
// });

export const NodeToRegister = Record({
  id: undefined,
  name: 'Undefined Node',
  nicMacAddress: '',
  driver: 'pxe_ssh',
  driver_info: Map(),
  valid: false
});
