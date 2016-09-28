require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  describe "abilities of loggined user" do
    subject { ability }
    let(:ability) { Ability.new(user)}
    let(:user) { FactoryGirl.create(:user) }
    let(:project) { FactoryGirl.create(:project, user: user) }
    let(:task) { FactoryGirl.create(:task, project: project) }
    let(:comment) { FactoryGirl.create(:comment, task: task)}

    context 'for projects' do 
      it { expect(ability).to be_able_to(:manage, project) }
    end

    context 'for tasks' do
      it { expect(ability).to be_able_to(:manage, task) }
    end

    context 'for comments' do
      it { expect(ability).to be_able_to(:manage, comment) }
    end
  end
end