import { Observable, filter } from 'rxjs';
import { delay, mapTo } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import {
  fetchWork, fulfillFetchWork,
  FetchWorkAction, FailFetchWorkAction, FulfillFetchWorkAction,
} from './slice';

export type Action = FetchWorkAction | FailFetchWorkAction | FulfillFetchWorkAction;

const fetchWorkEpic = (
  action$: Observable<Action>,
): Observable<Action> => action$.pipe(
  filter((action: FetchWorkAction) => action.type === fetchWork.type),
  delay(1000),
  mapTo(fulfillFetchWork({
    id: 1,
    name: 'Thetre Management System',
    tagIds: [1, 2, 3],
    thumbnail: '/images/portfolio/tms.jpg',
    screenshots: [
      '/images/portfolio/tms.jpg',
    ],
    description: `
      Open Source web chat platform developed as UI/UX Javascript Specialist
      at Konecty → Rocket.Chat.
    `,
    about: `
      On this Open Source project I was responsible for the initial UI/UX
      architecture, structure, design and animations. The idea was to follow
      the 3 column UX trend of webchats like skype, hipchat, gitter and slack.
      Building upon that an Open Source alternative with similar functionalities.

      The UI/UX was conceived with a mobile first approach. So it would be
      possible to effortlessly launch it into any platform without making
      any changes to the main application.
    `,
    techniques: [
      'UI/UX Design',
      'UI/UX Architecture',
      'CSS3 – preprocessed with LESS + LESSHAT',
      'Blaze',
      'MongoDB',
    ],
    links: [
      {
        label: 'https://rocket.chat',
        url: '#',
        description: 'The project is online at',
      },
      {
        label: 'github',
        url: '#',
        description: 'Access the project\'s source on',
      },
    ],
  })),
);

export default combineEpics(
  fetchWorkEpic,
);
