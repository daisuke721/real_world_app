'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import apiClient from '@/lib/apiClient';

const page = () => {
  const router = useRouter();

  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await apiClient.get('/api/articles');
    setArticles(res.data.articles);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreate = () => {
    router.push('/conduits/create');
  };

  const handleArticle = (id) => {
    router.push(`/conduits/article/${id}`);
  };

  return (
    <div>
      <div className='home-page'>
        <div className='banner'>
          <div className='container'>
            <h1 className='logo-font'>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className='container page'>
          <div className='row'>
            <div className='col-md-9'>
              <div className='feed-toggle'>
                <ul className='nav nav-pills outline-active'>
                  <li className='nav-item'>
                    <a className='nav-link' href=''>
                      Your Feed
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link active' href=''>
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {articles.map((article) => (
                <div
                  key={article.id}
                  className='article-preview'
                  onClick={() => handleArticle(article.id)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <div className='article-meta'>
                    <div className='preview-link'>
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                      <ul className='tag-list'>
                        <li className='tag-default tag-pill tag-outline'>
                          {article.tagList}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleCreate}
                className='btn btn-lg pull-xs-right btn-primary'
              >
                create
              </button>
            </div>

            <div className='col-md-3'>
              <div className='sidebar'>
                <p>Popular Tags</p>

                <div className='tag-list'>
                  <a href='' className='tag-pill tag-default'>
                    programming
                  </a>
                  <a href='' className='tag-pill tag-default'>
                    javascript
                  </a>
                  <a href='' className='tag-pill tag-default'>
                    emberjs
                  </a>
                  <a href='' className='tag-pill tag-default'>
                    angularjs
                  </a>
                  <a href='' className='tag-pill tag-default'>
                    react
                  </a>
                  <a href='' className='tag-pill tag-default'>
                    mean
                  </a>
                  <a href='' className='tag-pill tag-default'>
                    node
                  </a>
                  <a href='' className='tag-pill tag-default'>
                    rails
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
