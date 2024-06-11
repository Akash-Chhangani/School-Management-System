import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Signup from 'src/content/overview/Hero/Signup';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import Exam_Creation from './content/dashboards/Exam_Creation';
import SuspenseLoader from 'src/components/SuspenseLoader';
import './content/overview/Hero/index';
import Email from 'src/content/dashboards/Email';
import Subjects from 'src/content/dashboards/Subjects';
import Students from 'src/content/dashboards/Students';
import Classes from './content/dashboards/Classes';
import MarksList from 'src/content/dashboards/MarksList/MarksList';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('./content/overview/Login')));
// Dashboards

const examCreation = Loader(
  lazy(() => import('src/content/dashboards/Exam_Creation'))
);

const subject = Loader(lazy(() => import('src/content/dashboards/Subjects')));

const classes = Loader(
  lazy(() => import('src/content/dashboards/Classes/index'))
);

const students = Loader(lazy(() => import('src/content/dashboards/Students')));

// Applications

const Class_Room_List = Loader(
  lazy(() => import('src/content/dashboards/Class_Room_List'))
);
const marksList = Loader(
  lazy(() => import('src/content/dashboards/MarksList/MarksList'))
);

const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'companies',
        element: <Exam_Creation />
      },
      {
        path: 'subjects',
        element: <Subjects />
      },
      {
        path: 'students',
        element: <Students />
      },
      {
        path: 'class_Room_List',
        element: <Class_Room_List />
      },
      {
        path: 'classes',
        element: <Classes />
      },
      {
        path: 'marksList',
        element: (
          <MarksList
            subjectsFromAnotherComponent={undefined}
            classesFromAnotherComponent={undefined}
          />
        )
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },

      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      }
    ]
  }
];

export default routes;
