class CreateCommentFiles < ActiveRecord::Migration
  def change
    create_table :comment_files do |t|
      t.belongs_to :comment
      t.string :comment_file
      t.timestamps null: false
    end
  end
end
