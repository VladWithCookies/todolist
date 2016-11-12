require 'rails_helper'

describe Task do
  it 'belongs to project' do
    should belong_to(:project)
  end

  it 'has many comments' do 
    should have_many(:comments)
  end

  it 'is invalid without title' do
    is_expected.to validate_presence_of(:title)
  end

end