import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';

import { useToast } from '@/components';
import { getApiError, getApiErrorMessage } from '@/utils';

type Props<TData, Tvariables> = {
  mutationFn: (variables: Tvariables) => Promise<TData>;
  successMessage?: string;
  invalidateKeys?: QueryKey[];
  onSuccess?: (data: TData, variables: Tvariables) => void;
  onValidationError?: (errors: Record<string, string[]>) => void;
};

export function useApiMutation<TData, TVariables>({
  mutationFn,
  successMessage,
  invalidateKeys,
  onSuccess,
  onValidationError,
}: Props<TData, TVariables>) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn,
    onSuccess: async (data, variables) => {
      if (successMessage) {
        showToast(successMessage, 'success');
      }
      if (invalidateKeys) {
        await Promise.all(
          invalidateKeys.map((keyf) =>
            queryClient.invalidateQueries({ queryKey: keyf }),
          ),
        );
      }
      onSuccess?.(data, variables);
    },

    onError: (error: unknown) => {
      const err = getApiError(error);
      if (err) {
        if (err.status === 422 && err.errors) {
          onValidationError?.(err.errors);
          return;
        }
      }
      showToast(getApiErrorMessage(error), 'error');
    },
  });
}
