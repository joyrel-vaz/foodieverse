import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useFormik, Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';

const initialValues = {
  ingredients: [
    {
      amount: '',
      ing_name: '',
    },
  ],
  procedure: [
    {
      step: '',
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    keyboard:false,
    backdrop:"static",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddRecipe() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        react-transition-group
      </button> */}
      <Link className="btn SendBtn" onClick={handleOpen}>Add Recipe</Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <h1>Add your Own Recipe!</h1>
          <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
    {({ values }) => (
   <Form>
        <TextField
          fullWidth
          id="recipe-name"
          name="recipe-name"
          label="Recipe Name"
          onChange={formik.handleChange}
          required="required"
        />
        <TextField
          fullWidth
          id="servings"
          name="servings"
          label="Servings"
          onChange={formik.handleChange}
          required="required"
        />
        <TextField
          fullWidth
          id="recipe-time"
          name="recipe-time"
          label="Cook Time"
          onChange={formik.handleChange}
          required="required"
        />
        <h4 className="title-add">Ingredients</h4>
        
        <FieldArray name="ingredients">
            {({ insert, remove, push }) => (
              <div>
                {values.ingredients.length > 0 &&
                  values.ingredients.map((ingredients, index) => (
                    <div className="row row1" key={index}>
                      <div className="col">
                        <TextField
                          name={`ingredients.${index}.amount`}
                           placeholder="1 Cup"
                           type="text"
                          label="Amount"
                          onChange={formik.handleChange}
                          required="required"
                        />
                      </div>
                      <div className="col">
                        <TextField
                          name={`ingredients.${index}.ing_name`}
                          placeholder="Sugar"
                          type="text"
                          label="Ingredient Name"
                          onChange={formik.handleChange}
                          required="required"
                        />
                      </div>
                        <Button
                          type="button"
                          className="Btn-Margin"
                          variant="contained"
                          onClick={() => remove(index)}
                        >
                          <CloseIcon/>
                        </Button>
                    </div>
                  ))} 
                <Button variant="contained"  className="Btn-Margin right-btn"
                  onClick={() => push({ amount: '', ing_name: '' })}
                >
                  Add Ingredient
                </Button>
              </div>
            )}
          </FieldArray>
          <h4 className="title-add">Procedure</h4>
          <FieldArray name="procedure">
            {({ insert, remove, push }) => (
              <div>
                {values.procedure.length > 0 &&
                  values.procedure.map((procedure, index) => (
                    <div className="row row1" key={index}>
                      <div className="col">
                      <TextField
                          name={`procedure.${index}.step`}
                          fullWidth
                          placeholder="Add Step Here"
                          type="text"
                          label="Step"
                          onChange={formik.handleChange}
                          required="required"
                        />
                      </div>
                        <Button
                          type="button"
                           className="Btn-Margin"
                          variant="contained"
                          onClick={() => remove(index)}
                        >
                          <CloseIcon/>
                        </Button>
                    </div>
                  ))}
                <Button
                  type="button" variant="contained"
                  className="Btn-Margin right-btn"
                  onClick={() => push({ step: '' })}
                >
                  Add Step
                </Button>
              </div>
            )}
          </FieldArray>
        <Button color="red" variant="contained"  className="Btn-Margin" fullWidth type="submit"> 
          Submit
        </Button>
      </Form>
       )}
       </Formik>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
