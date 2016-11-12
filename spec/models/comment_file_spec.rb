require 'rails_helper'

RSpec.describe CommentFile, type: :model do
  it 'belongs to comment' do
    should belong_to(:comment)
  end
end
