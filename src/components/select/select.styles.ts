import { StylesConfig } from "react-select"
type ArtistSelectOpts = {
	value: string
	label: string
}

export const selectMenuStyles: StylesConfig<ArtistSelectOpts, true> = {
	option: (provided, state) => ({
		...provided,
		display: "flex",
		padding: "0.5rem 1rem",
		backgroundColor: state.isFocused ? "#191919" : "#111111",
		color: state.isDisabled ? "rgba(255, 255, 255, 0.5)" : state.isFocused ? "#A683F9" : "#fff",
		border: "0.5px solid rgba(255, 255, 255, 0.1)",
		borderRadius: "7px",
		width: "100%",
		margin: "2px 0",
		text: "white",
		fontSize: "0.8rem",
		":hover": {
			backgroundColor: "#191919",
			cursor: "pointer",
			color: "#A683F9",
		},
	}),
	control: () => ({
		display: "flex",
		justifyItems: "flex-start",
		alignItems: "flex-start",
		backgroundColor: "#151515",
		borderRadius: "7px",
		border: "0.5px solid rgba(255, 255, 255, 0.1)",
		// maxWidth: "600px",
	}),
	input: (provided) => ({
		...provided,
		color: "#fefefe",
		fontSize: "0.9rem",
	}),
	multiValue: () => {
		return {
			display: "flex",
			margin: "2px",
			borderRadius: "5px",
			backgroundColor: "#1A1A1A",
			color: "white",
		}
	},
	multiValueLabel: () => ({
		color: "white",
		fontSize: "0.8rem",
		padding: "0.25rem 0.5rem",
		maxWidth: "400px",
	}),
	multiValueRemove: () => ({
		color: "white",
		padding: "0 0.5rem",
		borderRadius: "0 5px 5px 0",
		":hover": {
			backgroundColor: "#202020",
			color: "#D84A4A",
		},
	}),
	menu: (base) => ({
		...base,
		borderRadius: 0,
		marginTop: 0,
	}),
	menuList: (base) => ({
		...base,
		padding: 0,
		backgroundColor: "#111111",
	}),
	placeholder: (base) => {
		return {
			...base,
			margin: 0,
			padding: 0,
			fontSize: "0.8rem",
			fontWeight: "600",
			color: "#A2A2A2",
			fontFamily: "Manrope, sans-serif",
		}
	},
	indicatorSeparator: (base) => {
		return {
			...base,
			backgroundColor: "#1a1a1a",
		}
	},
}
