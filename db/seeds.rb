# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all

u1 = User.create!({first_name: 'Demo', last_name: 'User', email: 'demoUser@yahoo.com', password_digest: BCrypt::Password.create('password'), session_token: SecureRandom.base64})
u2 = User.create!({first_name: 'Kiki', last_name: 'Kaur', email: 'kiki@yahoo.com', password:'kiki123'})
u3 = User.create!({first_name: 'test', last_name: 'test', email: 'test@yahoo.com', password:'test123'})
u4 = User.create!({first_name: 'honey', last_name: 'test', email: 'honey@yahoo.com', password:'test123'})

Video.destroy_all
v1 = Video.create!({
    title: "World Map",
    description: "Digital World Map to see the uniqueness",
    uploader_id: u2.id
})
v1_file = open("https://i-tube-seeds.s3.amazonaws.com/world.mp4")
v1.video.attach(io: v1_file, filename: "world.mp4")

v2 = Video.create!({
    title: "Coder Life",
    description: "The daily life of a coder.",
    uploader_id: u1.id
})
v2_file = open("https://i-tube-seeds.s3.amazonaws.com/code.mp4")
v2.video.attach(io: v2_file, filename: "code.mp4")

v3 = Video.create!({
    title: "City during the day",
    description: "The beauty of a city during the day.",
    uploader_id: u1.id
})
v3_file = open("https://i-tube-seeds.s3.amazonaws.com/city.mp4")
v3.video.attach(io: v3_file, filename: "city.mp4")

v4 = Video.create!({
    title: "City during the night",
    description: "The beauty of a city during the night.",
    uploader_id: u3.id
})
v4_file = open("https://i-tube-seeds.s3.amazonaws.com/CityLife.mp4")
v4.video.attach(io: v4_file, filename: "CityLife.mp4")

v5 = Video.create!({
    title: "Fireworks",
    description: "Fireworks on a beautiful beach.",
    uploader_id: u2.id
})
v5_file = open("https://i-tube-seeds.s3.amazonaws.com/firework.mp4")
v5.video.attach(io: v5_file, filename: "firework.mp4")

v6 = Video.create!({
    title: "Flame",
    description: "A tiny little flame of a candle can light up an entire room",
    uploader_id: u4.id
})
v6_file = open("https://i-tube-seeds.s3.amazonaws.com/flame.mp4")
v6.video.attach(io: v6_file, filename: "flame.mp4")

v7 = Video.create!({
    title: "Flower",
    description: "Watery a plant gives a different sense of happiness and peace.",
    uploader_id: u3.id
})
v7_file = open("https://i-tube-seeds.s3.amazonaws.com/Flower.mp4")
v7.video.attach(io: v7_file, filename: "Flower.mp4")

v8 = Video.create!({
    title: "Hacker",
    description: "Is Hacking cool?",
    uploader_id: u1.id
})
v8_file = open("https://i-tube-seeds.s3.amazonaws.com/hacker.mp4")
v8.video.attach(io: v8_file, filename: "hacker.mp4")

v9 = Video.create!({
    title: "Halloween",
    description: "The only time of the year where we can be whatever we want to be.",
    uploader_id: u3.id
})
v9_file = open("https://i-tube-seeds.s3.amazonaws.com/halloween.mp4")
v9.video.attach(io: v9_file, filename: "halloween.mp4")

v10 = Video.create!({
    title: "Joker",
    description: "The coolest character for Halloween.",
    uploader_id: u2.id
})
v10_file = open("https://i-tube-seeds.s3.amazonaws.com/joker.mp4")
v10.video.attach(io: v10_file, filename: "joker.mp4")

v11 = Video.create!({
    title: "Moon",
    description: "Was the moon landing real or fake?",
    uploader_id: u4.id
})
v11_file = open("https://i-tube-seeds.s3.amazonaws.com/moon.mp4")
v11.video.attach(io: v11_file, filename: "moon.mp4")

v12 = Video.create!({
    title: "Ocean",
    description: "The deep dark ocean with so dark mysteries.",
    uploader_id: u1.id
})
v12_file = open("https://i-tube-seeds.s3.amazonaws.com/ocean.mp4")
v12.video.attach(io: v12_file, filename: "ocean.mp4")

v13 = Video.create!({
    title: "Time",
    description: "Time is something we can't control so enjoy each and every moment.",
    uploader_id: u2.id
})
v13_file = open("https://i-tube-seeds.s3.amazonaws.com/Time.mp4")
v13.video.attach(io: v13_file, filename: "Time.mp4")


