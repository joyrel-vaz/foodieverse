import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'clsx';
import {useAuth} from '../Contexts/AuthContext'
import {getMeals , addMeal , editMeal , delMeal} from '../api.js'
import {
  Scheduler,
  WeekView,
  DateNavigator,
  TodayButton,
  CurrentTimeIndicator,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  ViewSwitcher,
  DragDropProvider,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './demo-data/month-appointments';
import {recurrenceAppointments} from './demo-data/recurr-appointments';

const dragDisableIds = new Set([3, 8, 10, 12]);
    const allowDrag = ({ id }) => !dragDisableIds.has(id);
    const appointmentComponent = (props) => {
      if (allowDrag(props.data)) {
        return <Appointments.Appointment {...props} />;
      } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
    };

    // #FOLD_BLOCK
const useStyles = makeStyles(theme => ({
  line: {
    height: '2px',
    borderTop: `2px ${theme.palette.primary.main} dotted`,
    width: '100%',
    transform: 'translate(0, -1px)',
  },
  circle: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    background: theme.palette.primary.main,
  },
  nowIndicator: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: ({ top }) => top,
  },
  shadedCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.20),
      outline: 0,
    },
  },
  shadedPart: {
    backgroundColor: fade(theme.palette.primary.main, 0.08),
    position: 'absolute',
    height: ({ shadedHeight }) => shadedHeight,
    width: '100%',
    left: 0,
    top: 0,
    'td:focus &': {
      backgroundColor: fade(theme.palette.primary.main, 0.12),
    },
  },
  appointment: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
  shadedAppointment: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[800],
    },
  },
}));
// #FOLD_BLOCK
const TimeIndicator = ({
  top, ...restProps
  // #FOLD_BLOCK
}) => {
  const classes = useStyles({ top });
  return (
    <div {...restProps}>
      <div className={classNames(classes.nowIndicator, classes.circle)} />
      <div className={classNames(classes.nowIndicator, classes.line)} />
    </div>
  );
};

// #FOLD_BLOCK
const TimeTableCell = ({
  currentTimeIndicatorPosition, isShaded, ...restProps
  // #FOLD_BLOCK
}) => {
  const classes = useStyles({ shadedHeight: currentTimeIndicatorPosition });
  const isNow = !!currentTimeIndicatorPosition;
  return (
    <WeekView.TimeTableCell
      isShaded={isShaded && !isNow}
      currentTimeIndicatorPosition={currentTimeIndicatorPosition}
      className={classNames({
        [classes.shadedCell]: isShaded && !isNow,
      })}
      {...restProps}
    >
      {isNow && isShaded && (
        <div className={classes.shadedPart} />
      )}
    </WeekView.TimeTableCell>
  );
};

// #FOLD_BLOCK
const Appointment = ({
  isShaded, ...restProps
  // #FOLD_BLOCK
}) => {
  const classes = useStyles();
  return (
    <Appointments.Appointment
      className={classNames({
        [classes.appointment]: true,
        [classes.shadedAppointment]: isShaded,
      })}
      {...restProps}
    />
  );
};


export default function MealPlanner() {
    let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const { currentUser } = useAuth();
    const [data,setData] = useState(recurrenceAppointments);
    const [currentDate,setCurrentDate] = useState(date);
    const [currentViewName,setCurrentViewName] = useState('Month');
    const [addedAppointment,setAddedAppointment] = useState();
    const [appointmentChanges,setAppointmentChanges] = useState();
    const [editingAppointment,setEditingAppointment] = useState(undefined);

    //when view is changed - week,month
    const currentViewNameChange = (currentViewName) => {
      setCurrentViewName(currentViewName);
    };

    const getAllMeals = async() =>{
      const myMeals = await getMeals(currentUser.email)
      setData(myMeals)
      console.log(myMeals)
    }

 /**addedAppointment should be set to recipe title which you get from recipe + keep recipe id handy
*/
   useEffect(() => {
     console.log('in getmeals')
    getAllMeals()
    },[]) 
 
  //when any change is made (including add and delete)
  const changeAddedAppointment = (addedAppointment) => {
    console.log('adding stuff',addedAppointment)
    setAddedAppointment(addedAppointment);
  }

  //when date/time is changed
  const changeAppointmentChanges = (appointmentChanges) => {
    console.log('making changes')
    setAppointmentChanges(appointmentChanges)
  }

  //when editing plan
  const changeEditingAppointment = (editingAppointment) => {
    console.log('in editing')
    console.log(editingAppointment)
    setEditingAppointment(editingAppointment)
  }

  //when save is clicked (db addition here)
  const commitChanges = async({ added, changed, deleted }) =>{
    console.log('commiting stuff',added,changed,deleted)
      if (added) { //new insert
        const datum = await addMeal(currentUser.email,added);
        setData([...data, datum]);
        console.log(data)
      }
      if (changed) { //update
        console.log(changed)
        let id = null;

        for(let i = 0 ; i < data.length ; i++){
          let datum = data[i].id;
          if(changed[datum])
            {
                id = datum;
                break;
            }
        }

        console.log(id);
        const allData = await editMeal(currentUser.email, id,changed[id]);
        setData(allData)
        
      }
      if (deleted !== undefined) { //delete
        console.log(deleted)              
        const allData = await delMeal(currentUser.email,deleted);
        setData(allData)
        
      }
      return { data };

  }

    return (
      <div>
      <Paper>
        <Scheduler
          data={data}
          height={600}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
          />
          <EditingState
            onCommitChanges={commitChanges}

            addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}

            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={changeAppointmentChanges}

            editingAppointment={editingAppointment}
            onEditingAppointmentChange={changeEditingAppointment}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
           <DragDropProvider
            allowDrag={allowDrag}
          />
          <AppointmentForm />
          <CurrentTimeIndicator
            indicatorComponent={TimeIndicator}
            shadePreviousCells
            shadePreviousAppointments
          />
        </Scheduler>
      </Paper>
          
        </div>
    );

    }
