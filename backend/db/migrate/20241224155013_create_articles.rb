class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :description
      t.string :body
      t.text :tagList

      t.timestamps
    end
  end
end
