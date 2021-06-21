import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import red from '@material-ui/core/colors/red';

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[400]),
      backgroundColor: red[400],
      '&:hover': {
        backgroundColor: red[800],
      },
    },
  }))(Button);
  

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    color: '#C90F03'
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(3, 0, 3),
    color: red[800]
  },
  cardHeader: {
    backgroundColor: red[700] ,
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const tiers = [
  {
    title: 'Free-Mium',
    price: '0',
    description: [
        'Ingredient to Recipe Search', 
        'Image Recognition', 
        'Popular Recipe Search',
        'Random Recipe Chooser',
    ],
    option: '/Forever',
    buttonText: 'Sign up for Free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Food-ium Mono',
    subheader: 'Most popular',
    price: '100',
    description: [
      'Connect with the Chefs',
      'Unlock Exotic Cuisines',
      'Daily recipe Suggestions',
      'Mood-based recommendation',
    ],
    option: '/month',
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Food-ium Fam',
    price: '50',
    description: [
      'Share happiness with Friends',
      'Enhanced Ratings on Recipes',
      'Family Meal Suggestions',
      'Phone & email support',
    ],
    option: '/person',
    buttonText: 'Extended License',
    buttonVariant: 'outlined',
  },
];

export default function Foodium() {
  const classes = useStyles();

  return (
      <>{/* Hero unit */}
      <img src="images/foodium.jpg" className="img-fluid rounded" alt="" />
      <Container maxWidth="md" component="main" className={classes.heroContent}>
      <Typography variant="h5" align="center" component="p" >
         Come Join <h1>FOODIUM</h1> and Explore the World of Diverse Opportunities!
        </Typography>
        </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" >
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      Rs {tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {tier.option}
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <ColorButton fullWidth variant={tier.buttonVariant} color='primary'>
                    {tier.buttonText}
                  </ColorButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    </Container>
    </>
  );
}
