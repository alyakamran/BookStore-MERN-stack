import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check console', { variant: 'error' });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing book. Please check console', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-8'>
      <BackButton />
      <div className='mt-8 p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Edit Book</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col'>
            <div className='my-4'>
              <label className='text-xl font-semibold text-gray-700'>Title</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl font-semibold text-gray-700'>Author</label>
              <input
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <div className='my-4'>
              <label className='text-xl font-semibold text-gray-700'>Publish Year</label>
              <input
                type='text'
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              />
            </div>
            <button className='px-4 py-2 bg-sky-300 rounded-md mt-6' onClick={handleEditBook}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBook;
