task :build_all do
  require "fileutils"
  tags = []
  Dir.chdir "../discorb" do
    tags = `git tag`.split("\n").sort { |a, b| a[1..].split(".").map(&:to_i) <=> b[1..].split(".").map(&:to_i) }
  end
  tags.each do |t|
    Dir.chdir "../discorb" do
      sh "git checkout #{t} -f"
      sh "yardoc -n"
    end
    ruby "scripts/namespaces.rb"
    ruby "scripts/methods.rb"
    ruby "scripts/files.rb"
    prefix = t
    if ENV["URL_PREFIX"] && ENV["URL_PREFIX"].length > 0
      prefix = ENV["URL_PREFIX"] + "/" + prefix
    end
    env = {
      "NEXT_PUBLIC_URL_PREFIX" => prefix,
      "NEXT_PUBLIC_VERSION" => t,
      "NEXT_PUBLIC_VERSIONS" => tags.join(":"),

    }
    sh(env, "npm run build")
    sh(env, "npx next export -o out/#{t}")
  end
  FileUtils.cp_r "out/#{tags.last}/.", "out/"
ensure
  Dir.chdir "../discorb" do
    sh "git checkout main"
  end
end
