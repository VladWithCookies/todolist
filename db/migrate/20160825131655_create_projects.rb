class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.belongs_to :user
      t.string :title
      t.timestamps null: false
    end
  end
end
