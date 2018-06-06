Pod::Spec.new do |s|
  s.name         = 'React.Framework'
  s.module_name  = 'React'
  s.version      = "0.27.2"
  s.summary      = "a built framework from react native source"
  s.description  = "a built framework from react native source."

  s.homepage     = "https://github.com/greycats/ReactNative.framework"

  s.license      = "BSD"
  s.author    = "Rex Sheng"
  s.platform     = :ios, '8.0'

  s.source = { :git => "https://github.com/greycats/ReactNative.framework.git", :tag => "#{s.version}" }
  s.vendored_frameworks = "React.framework"
end
