
Pod::Spec.new do |s|
  s.name         = "RNSnapcallReact"
  s.version      = "1.0.0"
  s.summary      = "RNSnapcallReact"
  s.description  = <<-DESC
                  RNSnapcallReact
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  s.license      = { :type => "Custom" }
  s.author       = { "Noyelle Pierre" => "noyelle.pierre@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNSnapcallReact.git", :tag => "master" }
  s.source_files  = "RNSnapcallReact/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "Snapcall_Framework"  

end

  
