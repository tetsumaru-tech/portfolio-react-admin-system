type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPaging: (page: number) => void;
};

export function Pagination({
  currentPage,
  lastPage,
  onPaging,
}: PaginationProps) {
  return (
    <>
      <div>
        {currentPage !== 1 ? (
          <button
            key="first"
            onClick={() => onPaging(1)}
            style={{
              fontWeight: currentPage === 1 ? 'bold' : 'normal',
            }}
            className={currentPage === 1 ? 'current' : ''}
          >
            First
          </button>
        ) : null}
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
        {currentPage !== lastPage ? (
          <button
            key="last"
            onClick={() => onPaging(lastPage)}
            style={{
              fontWeight: currentPage === lastPage ? 'bold' : 'normal',
            }}
            className={currentPage === lastPage ? 'current' : ''}
          >
            Last
          </button>
        ) : null}
      </div>
    </>
  );
}
