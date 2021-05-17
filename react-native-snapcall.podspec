require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'react-native-snapcall'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = "add voip call feature to your react native app"
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = "snapcall.io"
  s.source         = { git: 'https://github.com/snapcall/snapcall_react_native.git', tag: s.version }

  s.platform       = :ios, '10.0'

  s.preserve_paths = 'LICENSE', 'README.md', 'package.json', 'index.js', 'SnapcallListener.js', 'SnapcallParameter.js', 'Snapcall.js'
  s.source_files   = 'ios/*.{h,m}'
  s.xcconfig = { 'USER_HEADER_SEARCH_PATHS' => '"${SRCROOT}/Snapcall_Framework"' }

  s.dependency 'React'
  s.dependency 'Snapcall_Framework', '5.6.9'
end
