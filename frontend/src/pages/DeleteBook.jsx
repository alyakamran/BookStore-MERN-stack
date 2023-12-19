import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting book. Please check console', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-8'>
      <BackButton />
      <div className='mt-8 p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Delete Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col items-center'>
            <h3 className='text-2xl mb-4'>Are you sure you want to delete this book?</h3>
            <button
              className='px-4 py-2 bg-red-600 text-white rounded-md w-full'
              onClick={handleDeleteBook}
            >
              Yes, Delete Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
