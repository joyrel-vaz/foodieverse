import React from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'clsx';
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


export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.state = {
      data: recurrenceAppointments,
      currentViewName: 'Week',
      currentDate: date,
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, currentViewName, currentDate, addedAppointment, appointmentChanges, editingAppointment} = this.state;

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
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}

            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}

            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}

            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
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
}

