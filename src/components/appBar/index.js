import Images from "@/constant";
import { routesList } from "@/router";
import { setAddress } from "@/store/modules/account";
import {
  AppBar,
  Box,
  MenuItem,
  MenuList,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Popover,
  Popper,
  Grow,
  Paper,
  ClickAwayListener
} from "@material-ui/core";
import cx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Block, Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import MobileMenu from './mobile';
const SideBar = (props) => {
  const menuId = "primary-search-account-menu";
  const { address, chainId } = useSelector(
    (state) => state.account
  );
  const dispatch = useDispatch();
  const location = useLocation()
  const { } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const goTo = (path) => {
    navigate(path);
  };
  const open1 = Boolean(anchorEl);
  const id = open1 ? 'simple-popover' : undefined;
  return (
    <Box className={classes.mainPanel}>
      <Hidden smDown>
        <Box className={classes.headerTop}>
          <Typography aria-describedby={id} variant="contained" onClick={(event) => setAnchorEl(event.currentTarget)}><img src={Images.weChat} /></Typography>
          <Popover
            open={open1}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <img width={150} src={Images.qrCode} />
          </Popover>
          <Typography><Link className={classes.linkTop} to="/career">职业发展</Link></Typography>
          <Typography><Link className={classes.linkTop} to="/contact">联系我们</Link></Typography>
          <Typography><Link className={classes.linkTop} to="/faq">常见问题</Link></Typography>
        </Box>
        <Box className={classes.header}>
          <Link to="/"><img height={78} src={Images.logo} /></Link>
          <Box className={classes.flexGrow}>
            {routesList.map((routeObj, index) => (
              <Box className={classes.navLink} key={index}>
                <NavLink style={{ textDecoration: 'none' }} ref={anchorRef}
                  onClick={handleToggle} to={routeObj.path}>
                  {({ isActive }) => {
                    return (
                      <Box className={classes.nav111}>
                        <Typography className={cx(
                          classes.menuList,
                          isActive && classes.menuListActive
                        )}>{routeObj.pathName}</Typography>

                      </Box>
                    );
                  }}

                </NavLink>
                {routeObj.path === location?.pathname && open && routeObj?.children && <ClickAwayListener className={classes.menuWrap} onClickAway={handleClose}>
                  <Box className={classes.menuWrap} onKeyDown={handleListKeyDown}>
                    {
                      routeObj?.children?.map(obj => {
                        return <Typography onClick={() => {
                          goTo(routeObj.path + obj.path); handleClose()
                        }} className={classes.routeWrapSpan} key={obj.path}>{obj.pathName}</Typography>
                      })
                    }
                  </Box>
                </ClickAwayListener>}
              </Box>
            ))}
          </Box>
        </Box>
      </Hidden>
     <MobileMenu />

    </Box>
  );
};
export default SideBar;

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  mainPanel: {
    // display: "flex",
  },
  headerTop: {
    height: 34,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    background: '#000',
    padding: '0 40px',

  },
  linkTop: {
    color: "#fff",
    fontWeight: 700,
    textDecoration: 'none',
    marginLeft: 20,
  },
  header: {
    display: "flex",
    height: 80,
    background: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',

  },
  menuList: {
    cursor: "pointer",
    borderRadius: "10px",
    color: "#000",
    position: 'relative',
    fontWeight: 700,
    '&:hover': {
      color: 'rgb(0,122,255)',

    }
  },

  menuListActive: {
    color: 'rgb(0,122,255)',
  },
  navLink: {
    padding: '6px 23px',
    borderRight: '1px solid rgb(0,122,255)',
    position: 'relative',

  },
  flexGrow: {
    display: 'flex',
  },
  menuWrap: {
    position: 'absolute',
    top: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 4px 4px rgb(0 0 0 / 25%)',
    padding: 20,
    background: '#fff',
  },
  nav111: {
    position: 'relative',

  },
  routeWrapSpan: {
    wordBreak: 'keep-all'
  },

  IconButton: {

  },
  headerMobile: {
    background: '#fff',
    padding: '0 10px',
    height: 55,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }







}));
