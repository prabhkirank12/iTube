class CreateNewIndex < ActiveRecord::Migration[5.2]
  def change
    create_table :new_indices do |t|
      add_index :likes, [:liker_id, :likeable_id, :likeable_type]
    end
  end
end
