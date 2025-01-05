class Article < ApplicationRecord
  serialize :tagList, Array
end
