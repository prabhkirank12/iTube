class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :liker_id, null: false
      t.integer :liked_value, null: false
      t.references :likeable, polymorphic: true, index: true
      t.timestamps
    end
    add_index :likes, :liker_id
  end
end
