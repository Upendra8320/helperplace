import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchCandidatesAction, setCurrentPage } from '../features/candidate/candidateDataSlice';



const CandidatePage = () => {
  const dispatch = useAppDispatch();
  const { data, currentPage, pageSize, totalRecords, isLoading, error } = useAppSelector(
    (state) => state.candidatealldata
  );

console.log(data)
  useEffect(() => {
    dispatch(
      fetchCandidatesAction({
        start: (currentPage - 1) * pageSize,
        length: pageSize,
        helper_name: '',
        // Add other filters as needed
      })
    );
  }, [dispatch, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const totalPages = Math.ceil(totalRecords / pageSize);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ul>
        {data.map((candidate) => (
          <li key={candidate.id}>{candidate.helper_name}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span> of <span>{totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CandidatePage;

