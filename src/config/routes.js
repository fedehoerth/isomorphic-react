import DocumentTemplate from '../components/common/DocumentTemplate';
import IndexPage from '../pages/index';

const routes = [{
  component: DocumentTemplate,
  routes: [{
    path: '/',
    exact: true,
    component: IndexPage,
  }],
}];

export default routes;
