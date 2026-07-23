type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPaging: (page: number) => void;
};

/**
 * ページネーションコンポーネント
 *
 * @param currentPage - 現在のページ番号
 * @param lastPage - 最終ページ番号
 * @param onPaging - ページ選択時に呼び出される関数
 */
export function Pagination({
  currentPage,
  lastPage,
  onPaging,
}: PaginationProps) {
  return (
    <>
      <div>
        {currentPage > 1 && (
          <button
            onClick={() => onPaging(1)}
            style={{
              fontWeight: currentPage === 1 ? 'bold' : 'normal',
            }}
          >
            First
          </button>
        )}
        {currentPage > 1 && (
          <button onClick={() => onPaging(currentPage - 1)}>Previous</button>
        )}
        {Array.from({ length: lastPage }, (_, i) => {
          const page = i + 1;
          return (
            <>
              <button
                key={page}
                onClick={() => onPaging(page)}
                style={{
                  fontWeight: currentPage === page ? 'bold' : 'normal',
                }}
                className={currentPage === page ? 'current' : ''}
              >
                {page}
              </button>
            </>
          );
        })}
        {currentPage < lastPage && (
          <button onClick={() => onPaging(currentPage + 1)}>Next</button>
        )}
        {currentPage < lastPage && (
          <button
            onClick={() => onPaging(lastPage)}
            style={{
              fontWeight: currentPage === lastPage ? 'bold' : 'normal',
            }}
          >
            Last
          </button>
        )}
      </div>
    </>
  );
}
