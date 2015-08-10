module JSONDataModel
  def data(hash_type = false)
    if hash_type
      self[:data]
    else
      self[:data].to_json unless self[:data].nil?
    end
  end
end
