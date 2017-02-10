require 'spec_helper'

describe Organization do
  before { @organization = build(:organization) }
  subject { @organization }

  it { should respond_to(:name) }
  it { should be_valid }
end
