require 'spec_helper'

describe Ward do
  let(:ward) { build(:ward) }

  describe 'when name is not present' do
    before { ward.name = '' }
    it { should_not be_valid }
  end
end
