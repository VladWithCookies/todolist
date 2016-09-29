ENV["RAILS_ENV"] ||= 'test'

require 'spec_helper'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/poltergeist'
require 'shoulda-matchers'


Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config| 
  config.include Capybara::DSL
  config.include AcceptenceHelper, type: :feature
  config.include ControllerHelper, type: :controller
  Capybara.javascript_driver = :poltergeist

  config.render_views = true
  
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  use_transactional_tests = false
 
  config.infer_spec_type_from_file_location!

  config.before(:suite) do 
    DatabaseCleaner.clean_with(:truncation)
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do 
    DatabaseCleaner.start
  end

  config.after(:each) do 
    DatabaseCleaner.clean
  end
end

include ActionDispatch::TestProcess
include Warden::Test::Helpers