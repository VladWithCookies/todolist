class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.belongs_to :project
      t.string :title
      t.boolean :is_done, default: false
      t.date :deadline
      t.integer :priority
      t.timestamps
      t.timestamps null: false
    end
  end
end