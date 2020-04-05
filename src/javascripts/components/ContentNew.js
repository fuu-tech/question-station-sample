import React from 'react';
import PropTypes from 'prop-types';
import CreateSharp from '@material-ui/icons/CreateSharp';

import PageExplanation from './molecules/PageExplanation';
import { createContentNewParams } from '../params/contentNewParams';
import ContentNewForm from './forms/ContentNewForm';
import { initialContentNewValues } from '../constants/initialValues';
import { routes } from '../constants/routes';
import { isNullObj } from '../utils/isNullObj';
import { successAlert } from '../utils/alert';
import User from '../models/User';


let contentId = 2;

const propTypes = {
  currentUser: PropTypes.instanceOf(User).isRequired,
  isMobile: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  contentNewValuesCache: PropTypes.shape({}).isRequired,
  formValues: PropTypes.shape({}),
  actions: PropTypes.shape({
    createContent: PropTypes.func.isRequired,
    setContent: PropTypes.func.isRequired,
    cacheContentNewValues: PropTypes.func.isRequired,
  }).isRequired
};

class ContentNew extends React.Component {
  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    const { formValues, actions: { cacheContentNewValues } } = this.props;
    if (Object.keys(formValues).length) {
      cacheContentNewValues(formValues);
      localStorage.setItem("contentNewValuesCache", JSON.stringify(formValues));
    }
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = () => {
    const { formValues } = this.props;
    if (Object.keys(formValues).length) {
      localStorage.setItem("contentNewValuesCache", JSON.stringify(formValues));
    }
  }

  onSubmit = (values, _, { syncErrors, initialize }) => {
    const {
      currentUser, history, actions: { createContent, setContent }
    } = this.props;
    if (!isNullObj(syncErrors) || !window.confirm("コンテンツを作成しますか？")) return;

    const content = createContentNewParams({
      ...values,
      id: contentId,
      user: currentUser,
    });

    createContent(content);
    successAlert('コンテンツを作成しました');
    initialize(initialContentNewValues);
    setContent(content);
    setTimeout(() => history.push(routes.content(content.id)), 1);
    contentId += 1;
  }

  render() {
    const { formValues, contentNewValuesCache, isMobile } = this.props;
    const explanation = "";
    return (
      <div>
        <PageExplanation
          Icon={CreateSharp}
          title="コンテンツ作成"
          explanation={explanation}
        />
        <ContentNewForm
          formValues={formValues}
          onSubmit={this.onSubmit}
          initialValues={contentNewValuesCache}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

ContentNew.propTypes = propTypes;
export default ContentNew;
