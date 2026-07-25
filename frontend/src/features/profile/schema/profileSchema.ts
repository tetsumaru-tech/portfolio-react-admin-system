import { z } from 'zod';

import { userBaseSchema } from '@/features/user/schema/userBaseSchema';
import { ROLES } from '@/features/user/types';

export const profileSchema = z.object({
  ...userBaseSchema,
  role: z.enum(ROLES),
});
