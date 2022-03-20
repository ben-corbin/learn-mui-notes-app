import React from 'react';
import { makeStyles } from '@material-ui/core'
import { Drawer, Typography, AppBar, Toolbar } from '@mui/material'
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from "react-router-dom"
import { format } from 'date-fns'


const drawerWidth = 240;

const menu = [
    {
        text: "My Notes",
        icon: <SubjectOutlined color="secondary"/>,
        path: '/'
    },
    {
        text: "New Note",
        icon: <AddCircleOutlined color="secondary"/>,
        path: '/create'
    }
]

const useStyles = makeStyles((theme) => {

    

    return {
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3)
    },
    drawer: {
        width: drawerWidth,

    },
    drawerPaper: {
        width: drawerWidth,

    },
    root: {
        display: 'flex',

    },
    active: {
        background: '#ed99ff',
    },
    title: {
        padding: theme.spacing(2)
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)!important`,
    },
    toolbar: theme.mixins.toolbar,

}
})

export default function Layout({ children }) {
    const history = useHistory()
    const classes = useStyles()
    const location = useLocation()


    return (
        <div className={classes.root}>
        <AppBar
        className={classes.appbar}
        elevation={0}
        >
            <Toolbar>
                <Typography sx={{flexGrow: 1}}>
                   Today's date is {format(new Date(), 'do MMMM Y')}
                </Typography>
                <Typography>
                    Ben Corbin
                </Typography>
                <Avatar src="/BenC.jpg" sx={{marginLeft: 2}}/>
            </Toolbar>
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper}}
        >
            <div>
                <Typography variant="h5" className={classes.title}>
                    Notify App
                </Typography>
            </div>

            <List>
                {menu.map(item => (
                    <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : null}
                    >
                       <ListItemIcon >
                           {item.icon}
                       </ListItemIcon>
                       <ListItemText primary={item.text}></ListItemText>
                    </ListItem>
                ))}
            </List>

        </Drawer>


            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
            
        </div>
    )
}