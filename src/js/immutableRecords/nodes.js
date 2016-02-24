import { Map, Record } from 'immutable';

export const NodeToRegister = Record({
  id: undefined,
  name: 'Undefined Node',
  nicMacAddress: '',
  driver: 'pxe_ssh',
  driver_info: Map(),
  valid: false
});
