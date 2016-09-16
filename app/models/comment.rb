class Comment < ActiveRecord::Base
  belongs_to :task
  has_many :comment_files
end
