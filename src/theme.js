import { createTheme } from '@material-ui/core/styles';
import { red, amber, grey } from "@material-ui/core/colors";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  type: 'light',
  palette: {
    primary: {
      main: 'rgb(0,122,255)',
      fontSize: 16
    },

  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  },
  mixins: {
    drawer: {
      minWidth: 200,
      minWidthMobile: 150,
    },
  },

});
export default theme;