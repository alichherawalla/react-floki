/**
 * Container Generator
 */
const existing = require('../existing');

const cwd = process.cwd();
module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: 'What is the container directory? (app/containers)',
      default: 'app/containers',
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this container?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: `${cwd}/{{path}}/{{properCase name}}/index.js`,
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: `${cwd}{{path}}/{{properCase name}}/messages.js`,
        templateFile: './container/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: `${cwd}/{{path}}/{{properCase name}}/actions.js`,
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: `${cwd}/{{path}}/{{properCase name}}/constants.js`,
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: `${cwd}/{{path}}/{{properCase name}}/selectors.js`,
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: `${cwd}/{{path}}/{{properCase name}}/reducer.js`,
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: `${cwd}/{{path}}/{{properCase name}}/saga.js`,
        templateFile: './container/saga.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push(...existing.actions(data));
    actions.push(...existing.prettier());

    return actions;
  },
};
