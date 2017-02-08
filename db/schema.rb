# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170116064041) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "addresses", force: :cascade do |t|
    t.float    "lat"
    t.float    "lon"
    t.string   "street"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "addressable_type"
    t.integer  "addressable_id"
    t.string   "city"
    t.string   "province_state"
    t.string   "country"
  end

  create_table "city_files", force: :cascade do |t|
    t.string   "name"
    t.string   "link"
    t.datetime "orig_created"
    t.datetime "orig_update"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "dev_site_id"
  end

  create_table "city_requests", force: :cascade do |t|
    t.string   "city"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text     "body"
    t.string   "title"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "user_id"
    t.string   "commentable_type"
    t.integer  "commentable_id"
    t.integer  "vote_count"
  end

  create_table "conversations", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "address"
    t.string   "city"
    t.string   "postal_code"
    t.string   "topic"
    t.string   "body"
    t.string   "conversation_type"
    t.string   "image"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "conversations", ["user_id"], name: "index_conversations_on_user_id", using: :btree

  create_table "dev_sites", force: :cascade do |t|
    t.string   "devID"
    t.string   "application_type"
    t.string   "title"
    t.text     "description"
    t.string   "ward_name"
    t.integer  "ward_num"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "appID"
    t.datetime "received_date"
    t.datetime "updated"
    t.string   "image_url"
    t.integer  "hearts"
    t.json     "files"
    t.json     "images"
    t.string   "build_type"
    t.string   "urban_planner_email"
    t.string   "ward_councillor_email"
    t.float    "anger_total",           default: 0.0
    t.float    "joy_total",             default: 0.0
    t.float    "disgust_total",         default: 0.0
    t.float    "fear_total",            default: 0.0
    t.float    "sadness_total",         default: 0.0
  end

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.date     "date"
    t.string   "location"
    t.json     "images"
    t.string   "contact_tel"
    t.string   "contact_email"
    t.string   "time"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "dev_site_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "likes", ["dev_site_id"], name: "index_likes_on_dev_site_id", using: :btree
  add_index "likes", ["user_id"], name: "index_likes_on_user_id", using: :btree

  create_table "newsletter_subscriptions", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "user_id"
    t.boolean  "newletter",                default: true
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.boolean  "updated_dev_site_near_me"
  end

  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "profiles", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "neighbourhood"
    t.string   "postal_code"
    t.boolean  "accepted_terms"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.string   "avatar"
    t.text     "bio"
    t.boolean  "anonymous_comments",  default: false
    t.string   "web_presence"
    t.string   "verification_status", default: "notVerified"
    t.string   "community_role"
    t.string   "organization"
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "sentiments", force: :cascade do |t|
    t.float    "anger",              default: 0.0
    t.float    "joy",                default: 0.0
    t.float    "disgust",            default: 0.0
    t.float    "fear",               default: 0.0
    t.float    "sadness",            default: 0.0
    t.integer  "sentimentable_id"
    t.string   "sentimentable_type"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "sentiments", ["sentimentable_type", "sentimentable_id"], name: "index_sentiments_on_sentimentable_type_and_sentimentable_id", using: :btree

  create_table "statuses", force: :cascade do |t|
    t.datetime "status_date"
    t.string   "status"
    t.datetime "created"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "dev_site_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "role"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "password_digest"
    t.string   "uid"
    t.string   "provider"
    t.string   "slug"
    t.uuid     "uuid",            default: "uuid_generate_v4()"
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer "user_id"
    t.integer "comment_id"
    t.boolean "up"
  end

  add_index "votes", ["comment_id"], name: "index_votes_on_comment_id", using: :btree
  add_index "votes", ["user_id"], name: "index_votes_on_user_id", using: :btree

  add_foreign_key "conversations", "users"
  add_foreign_key "likes", "dev_sites"
  add_foreign_key "likes", "users"
  add_foreign_key "notifications", "users"
  add_foreign_key "profiles", "users"
  add_foreign_key "votes", "comments"
  add_foreign_key "votes", "users"
end
