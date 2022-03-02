const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const Connections = require('./Components/Connections');
const loadIcons = require('./loadIcons');

module.exports = class ShowConnection extends Plugin {
  startPlugin() {
    loadIcons();

    this.loadStylesheet('style.css');
    const Popout = getModule(m => m.default?.displayName === 'UserPopoutBody', false);

    inject('sc-injection', Popout, 'default', ([{ user }], res) => {
      res.props.children.splice(2, 0, React.createElement(Connections, { user: user.id }));
      return res;
    });

    Popout.default.displayName = 'UserPopoutBody';
  }

  pluginWillUnload() {
    uninject('sc-injection');
  }
};
