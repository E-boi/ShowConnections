const {
	React,
	getModule,
	i18n: { Messages },
} = require('powercord/webpack');

const { TooltipContainer } = getModule(m => m.TooltipContainer, false);

const Verified = require('./Verified');

const classes = getModule(['connectedAccount'], false);
const { get } = getModule(['get', 'isSupported'], false);

module.exports = ({ account }) => {
	const connection = get(account.type);
	return (
		<TooltipContainer className='sc-connection scrollbarGhostHairline-1mSOM1' text={account.name}>
			<a target='_blank' href={connection.getPlatformUserUrl?.(account)}>
				<img alt={Messages.IMG_ALT_LOGO.format({ name: connection?.name })} className={classes.connectedAccountIcon} src={connection?.icon?.color} />
				<div className={classes.connectedAccountNameInner}>{account.verified && <Verified className={classes.connectedAccountVerifiedIcon} />}</div>
			</a>
		</TooltipContainer>
	);
};
