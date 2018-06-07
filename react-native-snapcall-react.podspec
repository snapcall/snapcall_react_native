require 'json'
pkg = JSON.parse(File.read("package.json"))

Pod::Spec.new do |s|
  s.name         = pkg["name"]
  s.version      = pkg["version"]
  s.summary      = pkg["description"]
  s.requires_arc = true
  s.license      = pkg["license"]
  s.homepage     = pkg["homepage"]
  s.author       = pkg["author"]
  s.source       = { :git => https://pnoyelle@bitbucket.org/seampl/react-native-sdk.git }
  s.source_files = 'ios/**/*.{h,m}'
  s.platform     = :ios, "8.0"
  s.dependency 'React/Core'
  s.dependency 'Snapcall_Framework'
end
