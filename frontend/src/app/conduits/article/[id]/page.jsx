'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useParams, useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  const params = useParams();
  const id = params.id;

  const [article, setArticle] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await apiClient.get(`/api/articles/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error('Error fetching article:', error.message);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  const handleEdit = () => {
    router.push(`/conduits/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/articles/${id}`);
      alert('Article deleted successfully!');
      router.push('/conduits/home');
    } catch (error) {
      console.error('Error deleting article:', error.message);
      alert('Failed to delete the article.');
    }
  };

  return (
    <div>
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>How to build webapps that scale</h1>

            <div className='article-meta'>
              <button
                className='btn btn-sm btn-outline-secondary'
                onClick={handleEdit}
              >
                <i className='ion-edit'></i> Edit Article
              </button>
              <button
                className='btn btn-sm btn-outline-danger'
                onClick={handleDelete}
              >
                <i className='ion-trash-a'></i> Delete Article
              </button>
            </div>
          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-md-12'>
              <p>{article.body}</p>
              <h2 id='introducing-ionic'>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
