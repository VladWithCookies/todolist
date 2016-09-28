module AcceptenceHelper
  def sign_in(user)
    visit('/#/login')
    fill_in 'user[email]', with: user.email
    fill_in 'user[password]', with: user.password
    click_on 'Login'
  end

  def sign_up
    visit('/#/register')
    fill_in 'user[email]', with: "user@test.com"
    fill_in 'user[password]', with: "qwerty"
    fill_in 'user[password_confirmation]', with: "qwerty"
    click_on 'Register'
  end

  def create_project(title)
    visit '/#/projects/new'
    fill_in 'project[title]', with: title
    click_button('Submit')
  end

  def create_task(title)
    fill_in 'task[title]', with: "New task"
    click_button("Add Todo")
  end

  def create_comment(text)
    fill_in 'comment[text]', with: text
    click_button("Submit")
  end

  def mock_auth
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new(provider: 'facebokk',
                                                                  uid: '12345678910',
                                                                  info: {email: 'test@example.com'})
  end
end