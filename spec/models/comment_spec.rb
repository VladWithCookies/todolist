require 'rails_helper'

describe Comment do
  it "belongs to task" do
    should belong_to(:task)
  end

  it "has many comment_files" do
    should have_many(:comment_files)
  end
end