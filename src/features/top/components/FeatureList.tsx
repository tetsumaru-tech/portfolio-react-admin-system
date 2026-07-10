export { SkillList } from './SkillList';
import { Stack, Typography } from '@mui/material';

import { featureCategories } from '@/features/top/constants';

/**
 * 機能ごとにアイコンとラベルを表示するコンポーネント。
 *
 * @returns 機能リストの表示要素
 */
export function FeatureList() {
  return (
    <Stack spacing={1}>
      {featureCategories.map((category, index) => (
        <div key={index}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            {category.title}
          </Typography>
          <Stack spacing={1} flexWrap="wrap" gap={1}>
            {category.skills.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  key={index}
                >
                  <Icon color="primary" />
                  <Typography>{feature.label}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </div>
      ))}
      {/* {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Stack direction="row" spacing={1} alignItems="center" key={index}>
            <Icon color="primary" />
            <Typography>{feature.label}</Typography>
          </Stack>
        );
      })} */}
    </Stack>
  );
}
