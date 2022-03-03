const { getModule, FluxDispatcher, constants } = require('powercord/webpack');
const { waitFor } = require('powercord/util');

const { openUserProfileModal, closeUserProfileModal } = getModule(['openUserProfileModal'], false);
const { getCurrentUser } = getModule(['getCurrentUser', 'getUser'], false);

module.exports = function loadIcons() {
  if (getModule(['connectedAccount'], false)) return;
  if (!getCurrentUser()) return setTimeout(loadIcons, 100);
  console.log('hey');
  console.log(constants.ActionTypes.USER_PROFILE_MODAL_OPEN);
  const e = () => {
    waitFor('.root-8LYsGj').then(closeUserProfileModal);
    FluxDispatcher.unsubscribe(constants.ActionTypes.USER_PROFILE_MODAL_OPEN, e);
  };
  FluxDispatcher.subscribe(constants.ActionTypes.USER_PROFILE_MODAL_OPEN, e);
  openUserProfileModal({
    userId: getCurrentUser().id,
    guildId: null,
  });
};
