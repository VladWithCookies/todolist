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

    context 'Able to manage owned resources' do 
      it { expect(ability).to be_able_to(:manage, project) }
      it { expect(ability).to be_able_to(:manage, task) }
      it { expect(ability).to be_able_to(:manage, comment) }
    end

    context 'Able to manage not owned resources' do 
      it { expect(ability).not_to be_able_to(:manage, FactoryGirl.create(:project)) }
      it { expect(ability).not_to be_able_to(:manage, FactoryGirl.create(:task)) }
      it { expect(ability).not_to be_able_to(:manage, FactoryGirl.create(:comment)) }
    end

  end
end