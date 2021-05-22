import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'clsx';
import {useAuth} from '../Contexts/AuthContext'
import {getMeals , addMeal , editMeal , delMeal} from '../api.js'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
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

function getCurrentUser(Component) {
    return function WrappedComponent(props) {
      const {currentUser} = useAuth();
      return <Component {...props} currentUser={currentUser} />;
    }
  }

  const BLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        {/*   state !== undefined ? 
            <Button variant='success'>
            <Link
            style={{textDecoration:'none', color:'white'}}
            to={{ pathname:`/full-recipe/${state.recipe.id}`,
              state:{
              id:state.recipe.id,
              title:state.recipe.title,
              instructions:state.recipe.instructions,
              ingredients:state.recipe.ingredients,
              img:state.recipe.img,
              servings:state.recipe.servings
              
            }     
              
            }}
            >View Recipe</Link>
            </Button>
                    : <></>*/
            }
            <input type="button" value = "View recipe"></input>
      </AppointmentForm.BasicLayout>
    );
  };
  


  class TempMeal extends React.PureComponent {
    constructor(props) {
      super(props);
      let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      this.state = {
        data: [],
        currentDate: date,
        currentUser : this.props.currentUser, 
        addedAppointment: {},
        currentViewName:'Month',
        appointmentChanges: {},
        editingAppointment: undefined,
        locState : this.props.location.state,
      };

       //when view is changed - week,month
        this.currentViewNameChange = (currentViewName) => {
        this.setState({ currentViewName });
      };
  
      this.commitChanges = this.commitChanges.bind(this);
      this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
      this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
      this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
      
    }
  
    async componentDidMount(){
        const {currentUser} = this.state;
        console.log(currentUser.email)
        const myMeals = await getMeals(currentUser.email)
        this.setState({data : myMeals})
    }

    changeAddedAppointment(addedAppointment) {
        console.log('adding stuff',addedAppointment)
        //const {locState} = this.state;
        //if(locState !== undefined)
          //  addedAppointment.title = locState.recipe.title
      this.setState({ addedAppointment });
    }
  
    changeAppointmentChanges(appointmentChanges) {
        console.log('making changes')
      this.setState({ appointmentChanges });
    }
  
    changeEditingAppointment(editingAppointment) {
        console.log('in editing')
      this.setState({ editingAppointment });
    }
  
    async commitChanges({ added, changed, deleted }) {
       console.log('commiting stuff')
       const {data, currentUser} = this.state;
       if(added){
        const datum = await addMeal(currentUser.email,added);
        this.setState({data : [...data , datum]})
       }
       if(changed){
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
        this.setState({data : allData})
       }
       if(deleted !== undefined){
        console.log(deleted)              
        const allData = await delMeal(currentUser.email,deleted);
        this.setState({data : allData})
       }
       return {data}
    }
  
    render() {

    const state = this.state.locState;

    const TextEditor = (props) => {
        // eslint-disable-next-line react/destructuring-assignment
        if (props.type === 'multilineTextEditor') {
          return null;
        } return <AppointmentForm.TextEditor {...props} />;
      };

const Layout = ({ onFieldChange, appointmentData, ...restProps }) => {
    return (
      <AppointmentForm.BasicLayout
        appointmentData={appointmentData}
        onFieldChange={onFieldChange}
        {...restProps}
      >
        {   state !== undefined ? 
            <Button variant='success'>
            <Link
            style={{textDecoration:'none', color:'white'}}
            to={{ pathname:`/full-recipe/${state.recipe.id}`,
              state:{
              id:state.recipe.id,
              title:state.recipe.title,
              instructions:state.recipe.instructions,
              ingredients:state.recipe.ingredients,
              img:state.recipe.img,
              servings:state.recipe.servings
              
            }     
              
            }}
            >View Recipe</Link>
            </Button>
                    : <></>
            }
      </AppointmentForm.BasicLayout>
    );
  };
  

      const {
        currentDate, data, addedAppointment, appointmentChanges, editingAppointment, currentViewName
      } = this.state;
  
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
              showCloseButton
              showDeleteButton
            />
             <DragDropProvider
              allowDrag={allowDrag}
            />    

            <AppointmentForm
            key="abc"
            textEditorComponent={TextEditor}
            basicLayoutComponent={Layout}
            />
        
           
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
  
  export default getCurrentUser(TempMeal);