class Api::ArticlesController < ApplicationController
  def index
    articles = Article.all
    render json: { articles: articles }
  end

  def create
    article = Article.new(params.require(:article).permit(:title, :description, :body, tagList: []))
    if article.save
      render json: article, status: :created
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    article = Article.find(params[:id])
    render json: article
  end

  def update
    article = Article.find(params[:id])
    if article.update(params.require(:article).permit(:title, :description, :body, tagList: []))
      render json: { article: article }
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    article = Article.find(params[:id])
    article.destroy
    head :no_content
  end
end
