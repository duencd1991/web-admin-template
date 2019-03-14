import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import Layout from '../layout/layout';

class Home extends Component {
  
  render() {
    const { t } = this.props;
    return (
      <Layout type title="">
        <h1>{t('title')}</h1>
      </Layout>
    );
  }
}

export default withTranslation()(Home);
