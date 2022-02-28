const {
	React,
	getModule,
	i18n: { Messages },
} = require('powercord/webpack');

const { TooltipContainer } = getModule(m => m.TooltipContainer, false);

const Verified = require('./Verified');

const { get } = getModule(['get', 'isSupported'], false);

module.exports = ({ account, pork }) => {
	const classes = getModule(['connectedAccount'], false);
	const connection = pork ? powercord.api.connections.get(account.type) : get(account.type);
	return (
		<TooltipContainer className='sc-connection scrollbarGhostHairline-1mSOM1' text={account.name}>
			<a target='_blank' href={connection.getPlatformUserUrl?.(account)}>
				<img
					alt={connection?.name}
					className={classes.connectedAccountIcon}
					src={connection?.icon?.darkPNG}
				/>
				<div className={classes.connectedAccountNameInner}>{account.verified && <Verified className={classes.connectedAccountVerifiedIcon} />}</div>
			</a>
		</TooltipContainer>
	);
};
