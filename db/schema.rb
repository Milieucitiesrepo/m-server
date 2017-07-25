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

ActiveRecord::Schema.define(version: 20170709173035) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"
  enable_extension "pg_trgm"

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

  create_table "application_types", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "application_types_dev_sites", id: false, force: :cascade do |t|
    t.integer "application_type_id"
    t.integer "dev_site_id"
  end

  add_index "application_types_dev_sites", ["application_type_id"], name: "index_application_types_dev_sites_on_application_type_id", using: :btree
  add_index "application_types_dev_sites", ["dev_site_id"], name: "index_application_types_dev_sites_on_dev_site_id", using: :btree

  create_table "authentication_tokens", force: :cascade do |t|
    t.string   "token",      null: false
    t.datetime "expires_at"
    t.integer  "user_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
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

  create_table "comment_hierarchies", id: false, force: :cascade do |t|
    t.integer "ancestor_id",   null: false
    t.integer "descendant_id", null: false
    t.integer "generations",   null: false
  end

  add_index "comment_hierarchies", ["ancestor_id", "descendant_id", "generations"], name: "comment_anc_desc_idx", unique: true, using: :btree
  add_index "comment_hierarchies", ["descendant_id"], name: "comment_desc_idx", using: :btree

  create_table "comments", force: :cascade do |t|
    t.text     "body"
    t.string   "title"
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
    t.integer  "user_id"
    t.string   "commentable_type"
    t.integer  "commentable_id"
    t.integer  "vote_count"
    t.string   "flagged_as_offensive", default: "UNFLAGGED"
    t.integer  "parent_id"
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

  create_table "custom_surveys", force: :cascade do |t|
    t.string   "title"
    t.string   "typeform_id"
    t.jsonb    "form_fields"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "dev_sites", force: :cascade do |t|
    t.string   "devID"
    t.string   "application_type"
    t.string   "title"
    t.text     "description"
    t.string   "ward_name"
    t.integer  "ward_num"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
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
    t.integer  "municipality_id"
    t.integer  "ward_id"
    t.boolean  "featured",              default: false
    t.datetime "active_at"
    t.string   "on_behalf_of"
    t.string   "urban_planner_name"
    t.string   "short_description"
    t.string   "applicant_first_name"
    t.string   "applicant_last_name"
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

  create_table "meetings", force: :cascade do |t|
    t.string   "meeting_type"
    t.datetime "time"
    t.string   "location"
    t.integer  "dev_site_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "status_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "user_id"
    t.integer "organization_id"
    t.boolean "admin"
  end

  create_table "municipalities", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "municipalities_organizations", force: :cascade do |t|
    t.integer "municipality_id"
    t.integer "organization_id"
  end

  add_index "municipalities_organizations", ["municipality_id"], name: "index_municipalities_organizations_on_municipality_id", using: :btree
  add_index "municipalities_organizations", ["organization_id"], name: "index_municipalities_organizations_on_organization_id", using: :btree

  create_table "newsletter_subscriptions", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notification_settings", force: :cascade do |t|
    t.integer  "user_id"
    t.boolean  "newsletter",               default: true
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.boolean  "immediate_vicinity_scope"
    t.boolean  "ward_scope"
    t.boolean  "municipality_scope"
    t.boolean  "project_comments"
    t.boolean  "comment_replies"
  end

  add_index "notification_settings", ["user_id"], name: "index_notification_settings_on_user_id", using: :btree

  create_table "notifications", force: :cascade do |t|
    t.datetime "send_at"
    t.string   "notification_type"
    t.string   "notice"
    t.integer  "notifiable_id"
    t.string   "notifiable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "notifications", ["notifiable_type", "notifiable_id"], name: "index_notifications_on_notifiable_type_and_notifiable_id", using: :btree

  create_table "organizations", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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
    t.datetime "start_date"
    t.string   "status"
    t.datetime "created"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "dev_site_id"
    t.datetime "end_date"
  end

  create_table "survey_responses", force: :cascade do |t|
    t.integer  "custom_survey_id"
    t.jsonb    "response_body"
    t.datetime "submitted_at"
    t.string   "token"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "role"
    t.datetime "created_at",                                             null: false
    t.datetime "updated_at",                                             null: false
    t.string   "password_digest"
    t.string   "uid"
    t.string   "provider"
    t.string   "slug"
    t.uuid     "uuid",                    default: "uuid_generate_v4()"
    t.boolean  "accepted_privacy_policy", default: false
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

  create_table "wards", force: :cascade do |t|
    t.string   "name"
    t.integer  "municipality_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "wards", ["municipality_id"], name: "index_wards_on_municipality_id", using: :btree

  add_foreign_key "conversations", "users"
  add_foreign_key "likes", "dev_sites"
  add_foreign_key "likes", "users"
  add_foreign_key "notification_settings", "users"
  add_foreign_key "profiles", "users"
  add_foreign_key "votes", "comments"
  add_foreign_key "votes", "users"
  add_foreign_key "wards", "municipalities"
end
