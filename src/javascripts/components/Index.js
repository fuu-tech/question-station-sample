import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import jaLocale from "date-fns/locale/ja";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

import i18n from '../locales/i18n';
import { store, history } from '../store';
import { initCurrentUser } from '../actions/users';
import { setIsMobile } from '../actions/options';
import { mobileWidthThreshold } from '../constants/thresholds';
import ContextProvider from './ContextProvider';
import RouteIndex from '../containers/RouteIndex';
import '../../css/index.scss';
import '../prototypes/index';


export default class Index extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("logined")) {
      store.dispatch(initCurrentUser());
    }

    this.resizeStack = [];
    store.dispatch(setIsMobile(window.screen.availWidth < mobileWidthThreshold));
    this.addEventListeners();
  }

  addEventListeners = () => {
    window.addEventListener('resize', () => {
      this.resizeStack.push(1);

      setTimeout(() => {
        this.resizeStack.pop();
        if (this.resizeStack.length === 0) {
          store.dispatch(setIsMobile(window.screen.availWidth < mobileWidthThreshold));
        }
      }, 100);
    });
  }

  render() {
    i18n.changeLanguage("ja");
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
            <ContextProvider>
              <Router history={history}>
                <RouteIndex />
                <Alert stack={{ limit: 3 }} />
              </Router>
            </ContextProvider>
          </MuiPickersUtilsProvider>
        </I18nextProvider>
      </Provider>
    );
  }
}
