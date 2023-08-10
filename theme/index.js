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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000",
          marginTop: "8px",
          fontWeight:600
        },
      },
    },
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
          letterSpacing: "1px",
          textTransform: "capitalize",
          padding: "8px 16px",
          fontSize:'0.875rem',
          fontWeight:300
        },
      },
    },
  },
};

export default drillBitTheme;
