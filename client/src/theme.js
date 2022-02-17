import { red, amber, grey } from "@mui/material";
import { createMuiTheme, responsiveFontSizes } from "@mui/system";

// A custom theme for this app
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "yellow",
		},
		typography: {
			fontFamily: "PT Sans , sans-serif ,Roboto Mono, monospace",
			fontWeightLight: 400,
			fontWeightRegular: 500,
			fontWeightMedium: 600,
			fontWeightBold: 700,
		},
	},
});
