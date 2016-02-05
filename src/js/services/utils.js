/**
 * Returns the public url of an openstack API,
 * determined by the service's name.
 */
export function getServiceUrl(appState, serviceName) {
  return appState.login.getIn(['keystoneAccess','serviceCatalog'])
                       .find(service => service.get('name') === serviceName)
                       .get('endpoints').first().get('adminURL');
}

/**
 * Returns Keystone Auth Token ID
 */
export function getAuthTokenId(appState) {
  return appState.login.getIn(['keystoneAccess', 'token', 'id']);
}
