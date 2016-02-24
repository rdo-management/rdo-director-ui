import { createSelector } from 'reselect';

const nodesToRegister = (state) => state.registerNodes.get('nodesToRegister');

/**
 * Returns true if there are any nodes to register and all of them are valid
 * @return boolean
 */
export const getAllNodesToRegisterAreValid = createSelector(
  nodesToRegister, (nodesToRegister) => {
    return nodesToRegister.every(node => node.valid) && !nodesToRegister.isEmpty();
  }
);
