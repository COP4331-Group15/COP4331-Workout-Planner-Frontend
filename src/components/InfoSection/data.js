import image1 from '../../images/svg_1.svg';
import image2 from '../../images/svg_2.svg';
import image3 from '../../images/svg_3.svg';

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: '"What is Hercules\' Notebook?"',
    headline: 'Hercules\' Notebook keeps track of your workouts.​​',
    description: 'Create your customized workout, to build your strength, and study your past workouts to adapts to your available gym equipment.',
    buttonLabel: 'Get started',
    imgStart: false,
    img: image1,
    alt: 'Tracker',
    dark: true,
    primary: true,
    darkText: false,
    directory: '/signup'
}

export const homeObjTwo = {
    id: 'discover',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: '"Why was Hercules\' Notebook created?"',
    headline: 'Workout plan designed to push your limits.​​​',
    description: 'Hercules\' Notebook fills in the sets, reps and weight for each exercise based on you. As you get stronger, Hercules\' Notebook adapts to push yourself for your next workout.',
    buttonLabel: 'Learn More',
    imgStart: true,
    img: image2,
    alt: 'Workout',
    dark: false,
    primary: false,
    darkText: true,
    directory: '/signup'
}

export const homeObjThree = {
    id: 'signup',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Join our team',
    headline: 'Become a Member Today!',
    description: 'Get exclusive access to our state of the art app that allows you to custimize, track, and record your fitness progress.',
    buttonLabel: 'Get started',
    imgStart: false,
    img: image3,
    alt: 'Park',
    dark: true,
    primary: true,
    darkText: false,
    directory: '/signup'
}