import type { SvgIconComponent } from '@mui/icons-material';
import {
  Api,
  AutoFixHigh,
  Bolt,
  Build,
  CalendarMonth,
  Code,
  DataObject,
  Dns,
  EditNote,
  Hub,
  Lock,
  Palette,
  QueryStats,
  Route,
  Rule,
  Security,
  Source,
  Storage,
  TableView,
  Verified,
  Web,
} from '@mui/icons-material';

export type Skill = {
  icon: SvgIconComponent;
};

export type SkillCategory = {
  title: string;
  icon: SvgIconComponent;
  summary: Skill[];
  details: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'FrontEnd',
    icon: Web,
    summary: [
      { label: 'React', icon: Code },
      { label: 'TypeScript', icon: DataObject },
      { label: 'Material UI', icon: Palette },
      { label: 'React Query', icon: QueryStats },
    ],
    details: [
      { label: 'React 19', icon: Code },
      { label: 'TypeScript', icon: DataObject },
      { label: 'Vite', icon: Bolt },
      { label: 'Material UI', icon: Palette },
      { label: 'React Router', icon: Route },
      { label: 'TanStack Query', icon: QueryStats },
      { label: 'React Hook Form', icon: EditNote },
      { label: '@hookform/resolvers', icon: Rule },
      { label: 'Zod', icon: Verified },
      { label: 'MUI X Data Grid', icon: TableView },
      { label: 'MUI X Date Pickers', icon: CalendarMonth },
      { label: 'React Context API', icon: Hub },
      { label: 'react-error-boundary', icon: Security },
      { label: 'Day.js', icon: CalendarMonth },
      { label: 'fetch API', icon: Api },
    ],
  },
  {
    title: 'BackEnd',
    icon: Storage,
    summary: [
      { label: 'Laravel', icon: Dns },
      { label: 'Sanctum', icon: Lock },
      { label: 'REST API', icon: Api },
      { label: 'MySQL', icon: Storage },
    ],
    details: [
      { label: 'PHP 8.3', icon: Code },
      { label: 'Laravel 13', icon: Dns },
      { label: 'Laravel Sanctum', icon: Lock },
      { label: 'REST API', icon: Api },
      { label: 'CSRF / Cookie Authentication', icon: Security },
      { label: 'JSON API', icon: Api },
      { label: 'Role-based Authorization', icon: Security },
      // { label: 'Auth::attempt', icon: Lock },
      // { label: 'Policy', icon: Security },
      // { label: 'Gate', icon: Security },
      // { label: 'Middleware', icon: Hub },
      // { label: 'FormRequest', icon: Rule },
      // { label: 'Eloquent ORM', icon: Storage },
      // { label: 'Migration', icon: Storage },
      // { label: 'Factory', icon: Build },
      // { label: 'Seeder', icon: Build },
    ],
  },
  {
    title: 'Development',
    icon: Build,
    summary: [
      { label: 'ESLint', icon: Rule },
      { label: 'Prettier', icon: AutoFixHigh },
      { label: 'PHPUnit', icon: Verified },
      { label: 'Git', icon: Source },
    ],
    details: [
      { label: 'ESLint', icon: Rule },
      { label: 'Prettier', icon: AutoFixHigh },
      { label: 'PHPUnit', icon: Verified },
      { label: 'Mockery', icon: Build },
      { label: 'PHPStan', icon: Verified },
      { label: 'Laravel Pint', icon: AutoFixHigh },
      { label: 'Faker', icon: Build },
      { label: 'React Query Devtools', icon: QueryStats },
      { label: 'Git', icon: Source },
      { label: 'TypeScript Path Alias', icon: Hub },
    ],
  },
];
