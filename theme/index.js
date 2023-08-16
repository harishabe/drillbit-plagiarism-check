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
          color: "#454745",
          fontWeight: 600,
          marginTop: "5px",
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
          fontSize: "0.875rem",
          fontWeight: 300,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px 12px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    },
  },
};

export default drillBitTheme;
