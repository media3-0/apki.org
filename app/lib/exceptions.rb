module Exceptions
  class AccessDenied < StandardError
    def initialize(msg = 'Odmowa dostępu')
      super(msg)
    end
  end
end