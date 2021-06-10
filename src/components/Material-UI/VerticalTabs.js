import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const { students , value, index, ...other } = props;
  console.log("props", props)
  // console.log("children", children);
  console.log("Value", value);
  console.log("Index", index);
  // console.log("...other", ...othver);
  console.log('students: ', children);
  // let student = students[0];

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log("PROPS of vertical tabs", props);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div className={classes.root}>


          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
          { props.students.map((s, index) => (
            <Tab label={ s.name} {...a11yProps(0)} />
          ))}
          </Tabs>

          { props.students.map((s, index) => (
          <TabPanel value={value} index={ index }>
            <h4> Name: { s.name } </h4>
            <p> Email: { s.email } </p>
            <p> LinkedIn: { s.linkedin_url } </p>
            <p> GitHub: { s.github_url } </p>
          </TabPanel>

      ))}
      </div>
    </>
  );
}
