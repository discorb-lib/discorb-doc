require "json"
require "fileutils"

contents = {}
asset_dirs = {}

discorb_dir = File.dirname(__FILE__) + "/../../discorb"
Dir.chdir discorb_dir do
  yardopts = File.read(".yardopts")
  files = yardopts.split("-\n")[1].split("\n") + ["README.md"]
  assets = yardopts.split("\n").filter { |l| l.start_with?("--asset") }.map { |l| l.split(" ")[1].split(":") }
  files.map { |f| Dir.glob(f) }.flatten.each do |file|
    contents[file] = File.read(file)
  end
  assets.map { |f| [Dir.glob(f[0] + "/**"), f[1]] }.map do |asset|
    asset.first.map { |f| [f, asset.last] }
  end.flatten(1).each do |file, dir|
    asset_dirs[file] = [File.open(file, "rb"), dir]
  end
end
res = {}
contents.each do |file, content|
  res[file] = {
    title: content.match(/(?:^|(?<=\n))# (?:@title)?\s+(.*)/)&.[](1) || File.basename(file, ".md"),
  }
  dist = File.dirname("./db/files/#{file}")
  FileUtils.mkdir_p dist
  new_content = +content.dup
  new_content.gsub!(/\{include:file:([^}]+)\}/) do |match|
    file_content = File.read(
      Dir.glob(File.join(discorb_dir, $1), File::FNM_CASEFOLD).first
    )
    if $1.end_with?(".rb")
      "```ruby\n#{file_content}\n```"
    else
      "```\n#{file_content}\n```"
    end
  end
  new_content.gsub!(/# @title (.*)/, "")
  File.write(dist + "/" + File.basename(file), new_content)
end
asset_dirs.each do |file, (content, dir)|
  FileUtils.mkdir_p "./public/#{dir}"
  FileUtils.mkdir_p "./public/files/#{dir}"
  File.write("./public/#{dir}/#{File.basename(file)}", content.read, mode: "wb")
  content.seek 0
  File.write("./public/files/#{dir}/#{File.basename(file)}", content.read, mode: "wb")
  content.close
end
File.write("./db/files.json", JSON.pretty_generate(res))
