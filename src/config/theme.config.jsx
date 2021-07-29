import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nanum Gothic',
  },
  palette: {
      primary: {
        main: '#000'
      },
      secondary: {
        main: '#01bf71',
      }
  },
});

export default theme;