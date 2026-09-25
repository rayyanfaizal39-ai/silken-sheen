from pathlib import Path
import re
p=Path('src/components/notes/ScienceF1Chapter8VisualNotesBlock.tsx');s=p.read_text(encoding='utf-8');s='import { Chapter8Mirrors } from "./Chapter8Mirrors";\n'+s
s=s.replace('  const [mirror, setMirror] = useState(0);\n','').replace('t.mirrors.lawOfReflection','t.reflection.lawOfReflection')
s=s.replace('{copy.title}','{t.title}')
s=s.replace('''              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                {copy.subtitle}
              </p>''','')
a=s.index('          <div className="mt-6 grid gap-2 sm:grid-cols-5">');b=s.index('\n        </header>',a)
s=s[:a]+'''          <nav aria-label={t.title} className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {t.subtopics.map(({code,title}) => <a key={code} href={`#chapter8-${code.replace(".","")}`} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-bold text-violet-100">{code} {title}</a>)}
          </nav>'''+s[b:]
def heading(i):return f'<h2 className="text-2xl font-black text-white sm:text-3xl">{{t.subtopics[{i}].code}} {{t.subtopics[{i}].title}}</h2>'
a=s.index('          <section className="space-y-6">');b=s.index('          <section className="space-y-6">',a+1)
s=s[:a]+f'''          <section id="chapter8-81" data-official-subtopic="8.1" className="space-y-6">
            {heading(0)}
            <Chapter8Mirrors source={{t.mirrors}} />
          </section>\n\n'''+s[b:]
a=s.index('          <section className="space-y-6">');b=s.index('          <section className="space-y-6">',a+1);block=s[a:b]
p1=block.index('              <Panel>');p2=block.index('              <Panel>',p1+1);end=block.index('            </div>\n            <Panel>',p2)
prop=block[p1:p2];law=block[p2:end];rest=block[end+len('            </div>\n'):]
s=s[:a]+f'''          <section id="chapter8-82" data-official-subtopic="8.2" className="space-y-6">
            {heading(1)}
{prop}          </section>
          <section id="chapter8-83" data-official-subtopic="8.3" className="space-y-6">
            {heading(2)}
{law}{rest}'''+s[b:]
s=s.replace('''          <section className="space-y-6">
            <SectionHeading section={copy.sections[2]} />''',f'''          <section id="chapter8-84" data-official-subtopic="8.4" className="space-y-6">
            {heading(3)}''')
s=s.replace('''          <section className="space-y-6">
            <SectionHeading section={copy.sections[3]} />''',f'''          <section id="chapter8-85" data-official-subtopic="8.5" className="space-y-6">
            {heading(4)}''')
marker='''            <Panel>
              <div className="flex items-center gap-3">
                <Sun className="h-6 w-6 text-sky-300" />'''
s=s.replace(marker,f'''          </section>
          <section id="chapter8-86" data-official-subtopic="8.6" className="space-y-6">
            {heading(5)}
'''+marker)
s=s.replace('''          <section className="space-y-6">
            <SectionHeading section={copy.sections[4]} />''',f'''          <section id="chapter8-87" data-official-subtopic="8.7" className="space-y-6">
            {heading(6)}''')
s=s.replace('<SectionHeading section={copy.sections[5]} />','<h3 className="text-xl font-bold">{copy.sections[5][1]}</h3>')
for icon in ['Eye','Glasses','ScanLine']: 
 if len(re.findall(r'\b'+icon+r'\b',s))==1:s=s.replace('  '+icon+',\n','')
p.write_text(s,encoding='utf-8')
