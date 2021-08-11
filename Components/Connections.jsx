const { React, getModule } = require('powercord/webpack');

const ConnectedAccount = require('./Connection');
const { base, muted, uppercase } = getModule(['base'], false);
const { size12 } = getModule(['size12'], false);
const { bodyTitle } = getModule(['bodyTitle'], false);
const { scrollbarGhostHairline } = getModule(['scrollbarGhostHairline'], false);

module.exports = ({ user }) => {
	const [accounts, setAccounts] = React.useState();
	if (!accounts)
		getModule(['fetchProfile'], false).fetchProfile(user, 'porkcord', user => {
			setAccounts(user.connected_accounts);
		});
	if (accounts?.length <= 0) return null;
	return [
		<h3 className={[base, muted, uppercase, size12, bodyTitle].join(' ')}>Connections</h3>,
		<div className={`sc-connectAccounts ${scrollbarGhostHairline}`}>
			{accounts?.map(account => account && <ConnectedAccount account={account} />)}
		</div>,
	];
};
