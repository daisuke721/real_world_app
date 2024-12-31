class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :description
      t.string :body
      t.string :tagList

      t.timestamps
    end
  end
end
