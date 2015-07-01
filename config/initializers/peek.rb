Peek.into Peek::Views::PerformanceBar
Peek.into Peek::Views::GC
unless Gem.win_platform?
  Peek.into Peek::Views::Rblineprof
end
Peek.into Peek::Views::Moped