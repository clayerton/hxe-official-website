import Images from "@/constant";
import {
    Box,
    Drawer, Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    withStyles,
    Divider
} from "@material-ui/core";
import { Close as CloseIcon, Menu as MenuIcon, ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routesList, routesFront } from "@/router";
import cx from "clsx";

const SideBar = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (panel) => (event, isExpanded) => {
        console.log(panel, event, isExpanded)
        if (!panel.children) { return; }
        setExpanded(isExpanded ? panel.path : false);

    };

    const toggleDrawer = (anchor, open) => (event) => {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //     return;
        // }
        setOpen(open);
    };
    console.log(open,'open')
    return (
        <Hidden mdUp>
            <Box className={classes.headerMobile}>
                <Link to="/"><img height={55} src={Images.logo} /></Link>
                <IconButton  edge="start" onClick={() => setOpen(!open)} className={classes.menuButton} color="inherit" aria-label="menu">
                    {!open ? <MenuIcon htmlColor={'rgb(0,122,255)'} /> : <CloseIcon htmlColor={'rgb(0,122,255)'} />}
                </IconButton>
            </Box>
            <Drawer classes={{
                paper: classes.drawerPaper,
            }} anchor={'right'} open={open} onClose={toggleDrawer('right', false)}>
                {
                    [...routesList, ...routesFront].map(obj => {
                        return (
                            <Accordion key={obj.path} expanded={expanded === obj.path} onChange={handleChange(obj)}>
                                <AccordionSummary
                                    expandIcon={obj.children ? <ExpandMoreIcon /> : null}
                                    // aria-controls="panel1bh-content"
                                    // id="panel1bh-header"
                                >
                                    {/* <Link onClick={()=>{
                                        setOpen(false)
                                    }} className={classes.heading} to={obj.path}> */}
                                    <Typography onClick={() => {
                                        setOpen(false);
                                        setExpanded(false)
                                        navigate(obj.path)
                                    }}>{obj.pathName}</Typography>
                                    {/* </Link> */}
                                </AccordionSummary>
                                <AccordionDetails style={{
                                    flexDirection: 'column'
                                }}>
                                    {
                                        obj.children?.map((item, i) => {
                                            return (
                                                <Box className={cx(item.isH4 && classes.isH4)} key={item.path}>
                                                    <Typography  onClick={() => {
                                        setOpen(false);
                                        setExpanded(false)
                                        navigate(obj.path + item.path)
                                    }} className={classes.menuLi}>{item.pathName}</Typography>
                                                    {
                                                        obj.children.length !== i + 1 && <Divider />
                                                    }

                                                </Box>
                                            )
                                        })
                                    }
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }

            </Drawer>
        </Hidden>

    );
};
export default SideBar;


const useStyles = makeStyles((theme) => ({
    headerMobile: {
        background: '#fff',
        padding: '0 10px',
        height: 55,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    drawerPaper: {
        width: '100%'
    },
    detailBox: {
        flexDirection: 'cloumn',
    },
    isH4: {
        color: 'rgb(0,122,255)',
    },
    menuLi: {
        padding: '15px 0',

    },
    heading: {
        color: '#000',
        textDecoration: 'none',
    }





}));

