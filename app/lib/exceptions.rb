module Exceptions
  class AccessDenied < StandardError
    def initialize(msg = 'Odmowa dostępu')
      super(msg)
    end
  end

  class NotFound < StandardError
    def initialize(msg = 'Nie znaleziono takiego zasobu')
      super(msg)
    end
  end
end