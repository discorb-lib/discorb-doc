require "yard"
require "json"

class YARD::CodeObjects::Base
  def private?
    tags("private").any? || visibility != :public
  end

  def public?
    !private?
  end
end

Registry = YARD::Registry

Registry.load!("../discorb/.yardoc")
FileUtils.rm_rf("./db/object/*")

def get_docstring(docstring)
  if docstring.respond_to?(:tags)
    {
      text: docstring.to_s,
      notes: docstring.tags("note").map(&:text),
      todo: docstring.tags("todo").map(&:text),
      deprecated: docstring.tags("deprecated").map(&:text),
      example: docstring.tags("example").map(&:text),
      see_also: docstring.tags("see").map { |t|
        text = t.text
        if text.nil?
          text = if t.name.start_with?("file")
              File.read("./db/files/" + t.name.split(":")[1].split("#")[0]).match(/@title\s+(.*)/)[1] rescue ""
            else
              t.name
            end
        end
        [t.name, text]
      },
    }
  else
    {
      text: docstring.to_s,
      notes: [],
      todo: [],
      deprecated: [],
      example: [],
      see_also: [],
    }
  end
end

def get_methods(registry, attrs, meth)
  meth
    .filter(&:public?)
    .reject(&:is_alias?)
    .filter(&:is_explicit?)
    .filter(&:public?)
  # .reject(&:is_attribute?)
    .filter_map do |meth|
    next if attrs.key?(meth.name)
    parameters = meth.parameters
    # binding.irb
    {
      docstring: get_docstring(meth.docstring),
      name: meth.name,
      parent: [meth.parent == registry, meth.parent.path.split("::")],
      returns: meth.tags("return").map { |r|
        {
          class: r.types,
          description: r.text,
        }
      }.sort_by { |r| r[:class] },
      aliases: meth.aliases.map(&:name),
      params: meth.tags("param").filter_map { |pm|
        default = parameters.find { |k, _| k.include?(pm.name) }
        next unless default
        type = if default[0].end_with?(":")
            :keyword
          elsif default[0].start_with?("&")
            :block
          else
            :positional
          end
        {
          class: pm.types,
          name: pm.name,
          required: default[1].nil?,
          default: default[1],
          type: type,
          description: pm.text,
        }
      },
      flags: {
        async: meth.has_tag?("async"),
      },
    }
  end
end

JSON.parse(File.read("./db/namespaces.json"), symbolize_names: true).each do |ns|
  r = YARD::Registry.at(ns.join("::"))
  res = {
    namespace: r.title.split("::"),
    parent: r.inheritance_tree[1].to_s.split("::"),
    type: r.type,
    abstract: r.has_tag?("abstract"),
    docstring: get_docstring(r.docstring),
    superclass: if r.type == :class
      r.superclass.is_a?(YARD::CodeObjects::Proxy) ? nil : r.superclass.path.split("::")
    else
      nil
    end,
    mixin: r.instance_mixins.map(&:path).map { |pa| pa.split("::") },
    children: {
      classes: r.children.filter { |c| c.type == :class && c.public? }.map { |c|
        c.title.split("::").last
      }.sort,
      modules: r.children.filter { |c| c.type == :module && c.public? }.map { |c|
        c.title.split("::").last
      }.sort,
    },
    consts: r.constants.filter(&:public?).filter_map do |const|
      next if const.docstring.tag("return").nil?
      {
        name: const.name,
        class: const.docstring.tag("return").type || "Object",
        docstring: get_docstring(const.docstring.tag("return").text),
        source: const.value,
        parent: [const.parent == r, const.parent.path.split("::")],
      }
    end,
    rattrs: r.attributes[:instance].filter { |_, atr| atr[:read] || atr[:write] }.map do |name, atr|
      met = atr[:read] || atr[:write]
      {
        name: name,
        docstring: get_docstring(met.docstring),
        parent: [met.parent == r, met.parent.path.split("::")],

        returns: met.tags("return").map { |r|
          {
            class: r.types,
            description: r.text,
          }
        },
      }
    end,
    imethods: get_methods(r, r.attributes[:instance], r.meths(scope: :instance)),
    cmethods: get_methods(r, r.attributes[:class], r.meths(scope: :class)),
  }
  # binding.irb
  FileUtils.mkdir_p("./db/object/#{ns[...-1].join("/")}")
  File.write("./db/object/#{ns.join("/")}.json", JSON.pretty_generate(res))
end
