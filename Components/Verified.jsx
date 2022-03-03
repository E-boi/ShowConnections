// ripped from https://github.com/powercord-org/powercord/blob/v2/src/Powercord/plugins/pc-connections/components/Verified.jsx

const {
	React,
	Flux,
	getModule,
	getModuleByDisplayName,
	i18n: { Messages },
	constants: { Colors }
} = require("powercord/webpack");
const { AsyncComponent } = require("powercord/components");
const { TooltipContainer } = getModule((m) => m.TooltipContainer, false);

const FlowerStarIcon = AsyncComponent.from(
	getModuleByDisplayName("FlowerStarIcon")
);

let classes;
setImmediate(async () => {
	classes = { ...(await getModule(["flowerStarContainer", "flowerStar"])) };
});

module.exports = class Verified extends React.Component {
	render() {
		const lightTheme =
			document.body.parentElement.classList.contains("theme-light");
		return (
			<>
				<TooltipContainer
					element="span"
					text={Messages.CONNECTION_VERIFIED}
				>
					<div
						className={
							[classes.flowerStarContainer, this.props.className]
								.filter(Boolean)
								.join(" ") + " sc-verified"
						}
						style={{
							width: 16,
							height: 16
						}}
					>
						<FlowerStarIcon
							className={classes.flowerStar}
							color={
								lightTheme
									? Colors.STATUS_GREY_200
									: Colors.PRIMARY_DARK
							}
						/>

						<div className={classes.childContainer}>
							<svg width={16} height={16} viewBox="0 0 16 15.2">
								<path
									d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z"
									fill={
										lightTheme
											? Colors.STATUS_GREY_500
											: Colors.WHITE
									}
								/>
							</svg>
						</div>
					</div>
				</TooltipContainer>
			</>
		);
	}
};
