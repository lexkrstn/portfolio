import { AllActions as AppActions } from './App/duck/actions';
import { AllActions as HomeActions } from './Home/duck/actions';
import { AllActions as PortfolioActions } from './Portfolio/duck/actions';

export type AllActions = AppActions | HomeActions | PortfolioActions;
