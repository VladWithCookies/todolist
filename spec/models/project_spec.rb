require 'rails_helper'

describe Project do
  it "belongs to user" do
    should belong_to(:user)
  end

  it "has many tasks" do 
    should have_many(:tasks)
  end

  it "invalid without title" do 
    is_expected.to validate_presence_of(:title)
  end

end