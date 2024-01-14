import { ICompany } from './company.model';
import { IMainAcitivty } from './main-acitivty.model';

export interface IWorkExperience {
  company: ICompany;
  duration: string;
  mainActivities: Array<IMainAcitivty>;
  title: string;
}
