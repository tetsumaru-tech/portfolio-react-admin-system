import { Stack, Chip, Typography } from '@mui/material';

import { skillCategories } from '@/features/top/constants';

/**
 * スキルのカテゴリごとにアイコンとラベルを表示するコンポーネント。
 *
 * @returns スキルリストの表示要素
 */
export function SkillList() {
  return (
    <Stack spacing={2}>
      {skillCategories.map((category, index) => (
        <div key={index}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
            {category.title}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {category.skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Chip
                  key={index}
                  icon={<Icon />}
                  label={skill.label}
                  color="primary"
                />
              );
            })}
          </Stack>
        </div>
      ))}
    </Stack>
  );
}
