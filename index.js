const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const Connections = require('./Components/Connections');

module.exports = class ShowConnection extends Plugin {
	startPlugin() {
		// e
		window.webpackChunkdiscord_app.push([
			[Math.random().toString(36)],
			{},
			e => {
				e(868950);
			},
		]);

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
