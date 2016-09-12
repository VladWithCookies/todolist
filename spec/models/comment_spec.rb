require 'rails_helper'

describe Comment do
  it "belongs to task" do
    should belong_to(:task)
  end
end