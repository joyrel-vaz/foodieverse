/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import * as React from 'react';
import { withRouter } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { Link } from 'react-router-dom';
import red from '@material-ui/core/colors/red'
import {useAuth} from '../Contexts/AuthContext'
import {getMeals , addMeal , editMeal , delMeal, getMealRecipe} from '../api.js'
import {
  Scheduler,
  Toolbar,
  MonthView,
  TodayButton,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  AllDayPanel,
  DayView,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';

//import { appointments } from '../../../demo-data/appointments';

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
});

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: red[800],
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
   // console.log('chaniging stff');
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
     // console.log('commit app')
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment.id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
      locState,
      currentAppt
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    const mealRecipeHandler = async(recipeID) =>{
        let info = await getMealRecipe(recipeID);
        this.setState({recipe:info});
        this.props.history.push({
         pathname: `/full-recipe/${recipeID}`,
        state: {
          id:info.id,
          title:info.title,
          instructions:info.instructions,
          ingredients:info.ingredients,
          img:info.image,
          servings:info.servings
        }

        }
          );
    }

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('title')}
              />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  {...pickerEditorProps('startDate')}
                />
                <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps('endDate')}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('notes')}
                multiline
                rows="6"
              />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
              }}
            >
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
          
              {locState !== undefined?
            <Button variant= "outlined" color="primary">
                <Link
                to={{ pathname:`/full-recipe/${locState.recipe.id}`,
                  state:{
                  id:locState.recipe.id,
                  title:locState.recipe.title,
                  instructions:locState.recipe.instructions,
                  ingredients:locState.recipe.ingredients,
                  img:locState.recipe.img,
                  servings:locState.recipe.servings
                  
                }     
                  
                }}
                >View Recipe</Link>
              </Button>
                :
                currentAppt?
                currentAppt.recipeID?
                <Button variant= "outlined" color="primary"
                  onClick={() => mealRecipeHandler(currentAppt.recipeID)}
                >
                View Meal Recipe
              
              </Button>
                :
                <></>
                :<></>
                }
            
            
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

const AppointmentFormContainer = withRouter(withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic));

const styles = theme => ({
  addButton: {
    position: 'absolute',
    top: theme.spacing(1) * 8,
    right: theme.spacing(1) * 4,
  },
});

function getCurrentUser(Component) {
    return function WrappedComponent(props) {
      const {currentUser} = useAuth();
      return <Component {...props} currentUser={currentUser} />;
    }
  }


/* eslint-disable-next-line react/no-multi-comp */
class MealPlanner extends React.PureComponent {
  constructor(props) {
    super(props);
    let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      data: [],
      currentDate: date,
      confirmationVisible: false,
      currentViewName:'Month',
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      currentAppt:undefined,
      isNewAppointment: false,
      locState : this.props.location.state,
      currentUser : this.props.currentUser, 
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    this.commitChanges = this.commitChanges.bind(this);
    this.currentViewNameChange = this.currentViewNameChange.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
        locState,
        currentAppt
      } = this.state;

      const currentAppointment = data
        .filter(appointment => editingAppointment && appointment.id === editingAppointment.id)[0]
        || addedAppointment;

        this.setState({currentAppt:currentAppointment})

      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
        locState,
        currentAppt
      };
    });
  }

  componentDidUpdate() {
    //('update')
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  currentViewNameChange(currentViewName) {
    this.setState({currentViewName});
  };

  onAddedAppointmentChange(addedAppointment) {
    //console.log('adddin')
    if(this.state.locState)
        addedAppointment.title = this.state.locState.recipe.title;
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

 async commitDeletedAppointment() {
      //('deleting stuff')
      const {deletedAppointmentId , currentUser} = this.state;
      const allData = await delMeal(currentUser.email,deletedAppointmentId);
      this.setState({data:allData});
    this.toggleConfirmationVisible();
  } 

  async commitChanges({ added, changed, deleted }) {
    const {locState} = this.state;
    const {data, currentUser} = this.state;
    if(added){
      if(locState !== undefined)
        added.recipeID = locState.recipe.id;
     const datum = await addMeal(currentUser.email,added);
     this.setState({data : [...data , datum]})
    }
    if(changed){
     //console.log(changed)
     let id = null;

     for(let i = 0 ; i < data.length ; i++){
       let datum = data[i].id;
       if(changed[datum])
         {
             id = datum;
             break;
         }
     }

     //console.log(id);
     const allData = await editMeal(currentUser.email, id,changed[id]);
     this.setState({data : allData})
    }
    if(deleted !== undefined){
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
     //console.log(deleted)              
    }
    return {data}
  }

  async componentDidMount(){
    const {currentUser} = this.state;
    //console.log(currentUser.email)
    const myMeals = await getMeals(currentUser.email)
    this.setState({data : myMeals})
    //console.log(this.state.data)
}


  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
      currentViewName
    } = this.state;
    const { classes } = this.props;

    return (
      <Paper className="meal-planner-class">
        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
        <Scheduler
          data={data}
          height={500}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <MonthView />
          <DayView/>
          <AllDayPanel />
          <Appointments 
          appointmentComponent={Appointment}
          />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
          />
          <Toolbar /> 
          <TodayButton/>
          <DateNavigator/>
          <ViewSwitcher />
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
        </Scheduler>

        <Dialog
          open={confirmationVisible}
          onClose={this.cancelDelete}
        >
          <DialogTitle>
            Delete Plan
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this meal plan?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        
      </Paper>
    );
  }
}
export default getCurrentUser(withStyles(styles, { name: 'EditingDemo' })(MealPlanner));
