import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';

import { useToast } from '@/components';
import { getErrorMessage, isValidationError } from '@/utils';

/**
 * APIミューテーション用のプロパティ型定義
 * @template TData - ミューテーションの成功時に返されるデータ型
 * @template Tvariables - ミューテーション関数に渡される変数の型
 */
type Props<TData, Tvariables> = {
  /** API呼び出しを実行する関数 */
  mutationFn: (variables: Tvariables) => Promise<TData>;
  /** 成功時に表示するメッセージ */
  successMessage?: string;
  /** 無効化対象のクエリキー配列 */
  invalidateKeys?: QueryKey[];
  /** 成功時のコールバック関数 */
  onSuccess?: (data: TData, variables: Tvariables) => void;
};

/**
 * APIミューテーションを管理するカスタムフック
 *
 * @template TData - ミューテーションの成功時に返されるデータ型
 * @template TVariables - ミューテーション関数に渡される変数の型
 * @param props - フックの設定オプション
 * @param props.mutationFn - API呼び出しを実行する関数
 * @param [props.successMessage] - 成功時に表示するトーストメッセージ
 * @param [props.invalidateKeys] - 成功時に無効化するクエリキー
 * @param [props.onSuccess] - 成功時のコールバック関数
 * @returns React Queryのミューテーション結果オブジェクト
 */
export function useApiMutation<TData, TVariables>({
  mutationFn,
  successMessage,
  invalidateKeys,
  onSuccess,
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
      // 422はフィールド単位のエラーを持つため、表示先の判断は呼び出し側のフォームに委ねる
      if (isValidationError(error) && error.errors) {
        return;
      }
      showToast(getErrorMessage(error), 'error');
    },
  });
}
