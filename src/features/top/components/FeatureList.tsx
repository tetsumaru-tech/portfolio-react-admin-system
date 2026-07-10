export { SkillList } from './SkillList';
import { Stack, Typography } from '@mui/material';

import { features } from '@/features/top/constants/features';

/**
 * 機能ごとにアイコンとラベルを表示するコンポーネント。
 *
 * @returns 機能リストの表示要素
 */
export function FeatureList() {
  return (
    <Stack spacing={1}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Stack direction="row" spacing={1} alignItems="center" key={index}>
            <Icon color="primary" />
            <Typography>{feature.label}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
