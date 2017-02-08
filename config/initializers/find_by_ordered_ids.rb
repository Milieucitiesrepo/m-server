module FindByOrderedIdsActiveRecordExtension
  extend ActiveSupport::Concern
  module ClassMethods
    def find_ordered(ids)
      return where(id: ids) if ids.empty?
      order_clause = 'CASE dev_sites.id '
      ids.each_with_index do |id, index|
        order_clause << "WHEN #{id} THEN #{index} "
      end
      order_clause << "ELSE #{ids.length} END"
      where(id: ids).order(order_clause)
    end
  end
end

ActiveRecord::Base.include(FindByOrderedIdsActiveRecordExtension)
