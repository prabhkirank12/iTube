class RemoveNewIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :likes, [:liker_id, :likeable_id, :likeable_type]
  end
end
