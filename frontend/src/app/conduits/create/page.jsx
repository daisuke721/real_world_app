'use client';

import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/conduits/home');
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    tagList: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tagList' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('api/articles', { article: formData });
      console.log('Article created:', res.data);
    } catch (error) {
      console.error(
        'Error creating article:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <div className='editor-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs-12'>
              <ul className='error-messages'>
                <li>That title is required</li>
              </ul>

              <form onSubmit={handleSubmit}>
                <fieldset>
                  <fieldset className='form-group'>
                    <input
                      type='text'
                      name='title'
                      className='form-control form-control-lg'
                      placeholder='Article Title'
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className='form-group'>
                    <input
                      type='text'
                      name='description'
                      className='form-control'
                      placeholder="What's this article about?"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset className='form-group'>
                    <textarea
                      name='body'
                      className='form-control'
                      rows='8'
                      placeholder='Write your article (in markdown)'
                      value={formData.body}
                      onChange={handleChange}
                    ></textarea>
                  </fieldset>
                  <fieldset className='form-group'>
                    <input
                      type='text'
                      name='tagList'
                      className='form-control'
                      placeholder='Enter tags'
                      value={formData.tagList.join(',')}
                      onChange={handleChange}
                    />
                    <div className='tag-list'>
                      {formData.tagList.map((tag, index) => {
                        <span key={index} className='tag-default tag-pill'>
                          <i className='ion-close-round'></i> {tag}
                        </span>;
                      })}
                    </div>
                  </fieldset>
                  <button
                    className='btn btn-lg pull-xs-right btn-primary'
                    type='submit'
                    onClick={handleNavigate}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
