import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-8'>
      <BackButton />
      <div className='mt-8 p-6 bg-gray-100 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Book Details</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className='mb-4'>
              <span className='text-lg font-semibold text-gray-700'>ID:</span>
              <span className='ml-2'>{book._id}</span>
            </div>
            <div className='mb-4'>
              <span className='text-lg font-semibold text-gray-700'>Title:</span>
              <span className='ml-2'>{book.title}</span>
            </div>
            <div className='mb-4'>
              <span className='text-lg font-semibold text-gray-700'>Author:</span>
              <span className='ml-2'>{book.author}</span>
            </div>
            <div className='mb-4'>
              <span className='text-lg font-semibold text-gray-700'>Publish Year:</span>
              <span className='ml-2'>{book.publishYear}</span>
            </div>
            <div className='mb-4'>
              <span className='text-lg font-semibold text-gray-700'>Create Time:</span>
              <span className='ml-2'>{new Date(book.createdAt).toString()}</span>
            </div>
            <div className='mb-4'>
              <span className='text-lg font-semibold text-gray-700'>Last Update Time:</span>
              <span className='ml-2'>{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;

