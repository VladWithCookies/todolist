class Task < ActiveRecord::Base
  belongs_to :project
  has_many :comments, dependent: :destroy

  validates :title, presence: true

  after_destroy :refresh_task_priorities

  def refresh_task_priorities
    project.tasks.order(:priority).each_with_index { |task, i| task.update(priority: i) }
  end

end
