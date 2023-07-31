import palette from "./drillbit/palette";
import mixins from "./drillbit/mixins";
import shadows from "./drillbit/shadows";
import typography from "./drillbit/typography";
import zIndex from "./drillbit/zIndex";
import breakpoints from "./drillbit/breakpoints";

const drillBitTheme = {
  breakpoints: breakpoints,
  palette: palette,
  mixins: mixins,
  shadows: shadows,
  typography: typography,
  zIndex: zIndex,
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          //textTransform: 'capitalize'
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#fff !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          padding: "8px 16px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
  },
};

export default drillBitTheme;
