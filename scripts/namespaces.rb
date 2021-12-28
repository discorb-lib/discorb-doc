require "yard"
require "json"

YARD::Registry.load!("../discorb/.yardoc")

$res = []

def get_child_namespaces(root)
  root.children.filter { |c| [:class, :module].include?(c.type) }.each do |c|
    $res << c
    get_child_namespaces c
  end
end

get_child_namespaces YARD::Registry.root

File.write("./db/namespaces.json", JSON.pretty_generate($res.map { |r| r.title.split("::") }))
