class CommentFile < ActiveRecord::Base
  belongs_to :comment
  mount_uploader :comment_file, CommentFileUploader
end
