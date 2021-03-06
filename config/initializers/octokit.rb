Octokit.middleware = Faraday::RackBuilder.new do |builder|
  builder.use Faraday::HttpCache, store: Rails.cache, serializer: Marshal
  builder.use Octokit::Response::RaiseError
  builder.adapter Faraday.default_adapter
end