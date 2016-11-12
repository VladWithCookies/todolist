require 'rails_helper'

describe User do
  it "has many projects" do
    should have_many(:projects)
  end
end