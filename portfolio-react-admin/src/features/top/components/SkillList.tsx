import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import { skillCategories } from '../constants/skills';

/**
 * スキルごとにアイコンとラベルを表示するコンポーネント。
 *
 * @returns スキルリストの表示要素
 */
export function SkillList() {
  return (
    <Stack spacing={2}>
      {skillCategories.map((category) => {
        const Icon = category.icon;

        return (
          <Accordion key={category.title}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Icon color="primary" />

                  <Typography variant="h6">{category.title}</Typography>
                </Stack>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {category.summary.map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <Chip
                        key={skill.label}
                        icon={<Icon />}
                        label={skill.label}
                        color="primary"
                        size="small"
                      />
                    );
                  })}
                </Stack>
              </Stack>
            </AccordionSummary>

            <AccordionDetails>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {category.details.map((skill) => {
                  const Icon = skill.icon;

                  return (
                    <Chip
                      key={skill.label}
                      icon={<Icon />}
                      label={skill.label}
                      variant="outlined"
                    />
                  );
                })}
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
}
