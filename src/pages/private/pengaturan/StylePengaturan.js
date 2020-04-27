import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabContent: {
    padding: theme.spacing(2),
  },

  pengaturanPengguna: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
}));

export default useStyles;
