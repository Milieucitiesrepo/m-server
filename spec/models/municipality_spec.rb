require 'spec_helper'

describe Municipality do
  let(:municipality) { build(:municipality) }

  describe 'when name is not present' do
    before { municipality.name = '' }
    it { should_not be_valid }
  end
end
