import type { SvgIconComponent } from '@mui/icons-material';
import {
  Api,
  AutoFixHigh,
  Bolt,
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
  Storage,
  Source,
  TableView,
  Verified,
} from '@mui/icons-material';

type Skill = {
  label: string;
  icon: SvgIconComponent;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      {
        label: 'React 19',
        icon: Code,
      },
      {
        label: 'TypeScript',
        icon: DataObject,
      },
      {
        label: 'Vite',
        icon: Bolt,
      },
      {
        label: 'Material UI',
        icon: Palette,
      },
      {
        label: 'React Router',
        icon: Route,
      },
      {
        label: 'TanStack Query',
        icon: QueryStats,
      },
      {
        label: 'React Hook Form',
        icon: EditNote,
      },
      {
        label: 'Zod',
        icon: Verified,
      },
      {
        label: 'MUI X Data Grid',
        icon: TableView,
      },
      {
        label: 'MUI X Date Pickers',
        icon: CalendarMonth,
      },
      {
        label: '@hookform/resolvers',
        icon: Rule,
      },
      {
        label: 'React Context API',
        icon: Hub,
      },
      {
        label: 'react-error-boundary',
        icon: Security,
      },
      {
        label: 'Day.js',
        icon: CalendarMonth,
      },
    ],
  },
  {
    title: 'Backend',
    skills: [
      {
        label: 'Laravel 13',
        icon: Dns,
      },
      {
        label: 'Sanctum',
        icon: Lock,
      },
      {
        label: 'MySQL',
        icon: Storage,
      },
      {
        label: 'Cookie / CSRFベースの認証連携',
        icon: Security,
      },
      {
        label: 'REST API連携',
        icon: Api,
      },
    ],
  },
  {
    title: 'Development',
    skills: [
      {
        label: 'ESLint',
        icon: Rule,
      },
      {
        label: 'Prettier',
        icon: AutoFixHigh,
      },
      {
        label: 'TypeScript パスエイリアス',
        icon: Hub,
      },
      {
        label: 'React Query Devtools',
        icon: QueryStats,
      },
      {
        label: 'Git',
        icon: Source,
      },
    ],
  },
];

// import {
//   AutoFixHigh,
//   Bolt,
//   Code,
//   DataObject,
//   Dns,
//   EditNote,
//   Lock,
//   Palette,
//   Route,
//   Rule,
//   Storage,
//   Verified,
// } from '@mui/icons-material';
// import type { SvgIconComponent } from '@mui/icons-material';

// /**
//  * スキル項目を表す型
//  * @property {string} label - 表示用のスキル名
//  * @property {SvgIconComponent} icon - MUI の SVG アイコンコンポーネント
//  */
// type Skill = {
//   label: string;
//   icon: SvgIconComponent;
// };

// /**
//  * スキルカテゴリを表す型
//  * @property {string} title - カテゴリのタイトル
//  * @property {Skill[]} skills - カテゴリに含まれるスキル一覧
//  */
// type SkillCategory = {
//   title: string;
//   skills: Skill[];
// };

// /**
//  * サイトで表示するスキルカテゴリの定義
//  * @type {SkillCategory[]}
//  */
// export const skillCategories: SkillCategory[] = [
//   {
//     title: 'Frontend',
//     skills: [
//       {
//         label: 'React 19',
//         icon: Code,
//       },
//       {
//         label: 'TypeScript',
//         icon: DataObject,
//       },
//       {
//         label: 'Vite',
//         icon: Bolt,
//       },
//       {
//         label: 'Material UI',
//         icon: Palette,
//       },
//       {
//         label: 'React Router',
//         icon: Route,
//       },
//       {
//         label: 'TanStack Query',
//         icon: Storage,
//       },
//       {
//         label: 'React Hook Form',
//         icon: EditNote,
//       },
//       {
//         label: 'Zod',
//         icon: Verified,
//       },
//     ],
//   },
//   {
//     title: 'Backend',
//     skills: [
//       {
//         label: 'Laravel 12',
//         icon: Dns,
//       },
//       {
//         label: 'Sanctum',
//         icon: Lock,
//       },
//       {
//         label: 'MySQL',
//         icon: Storage,
//       },
//     ],
//   },
//   {
//     title: 'development',
//     skills: [
//       {
//         label: 'ESLint',
//         icon: Rule,
//       },
//       {
//         label: 'Prettier',
//         icon: AutoFixHigh,
//       },
//     ],
//   },
// ] satisfies SkillCategory[];
