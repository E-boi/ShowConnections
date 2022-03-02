const { getModule, FluxDispatcher, constants } = require('powercord/webpack');

const { openUserProfileModal, closeUserProfileModal } = getModule(['openUserProfileModal'], false);
const { getCurrentUser } = getModule(['getCurrentUser', 'getUser'], false);

module.exports = function loadIcons() {
  if (getModule('connectedAccount', false)) return;
  if (!getCurrentUser()) return setTimeout(loadIcons, 100);
  const e = () => {
    setTimeout(closeUserProfileModal, 100);
    FluxDispatcher.unsubscribe(constants.ActionTypes.USER_PROFILE_MODAL_OPEN, e);
  };
  FluxDispatcher.subscribe(constants.ActionTypes.USER_PROFILE_MODAL_OPEN, e);
  openUserProfileModal({
    userId: getCurrentUser().id,
    guildId: null,
  });
};
