from pathlib import Path
import re,math
p=Path('public/quiz-visuals/science-f1')
def frame(label,body):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 300" role="img" aria-label="{label}"><rect width="640" height="300" rx="20" fill="#F8FAFC"/><g font-family="Arial,sans-serif" font-size="26" fill="#0F172A">{body}</g></svg>\n'
def line(x,y,X,Y,color='#334155',extra=''):
 return f'<line x1="{x}" y1="{y}" x2="{X}" y2="{Y}" stroke="{color}" stroke-width="4" {extra}/>'
def text(x,y,s):return f'<text x="{x}" y="{y}" text-anchor="middle">{s}</text>'
def arrow(x,y,X,Y):
 a=math.atan2(Y-y,X-x);left=(X-17*math.cos(a)+8*math.sin(a),Y-17*math.sin(a)-8*math.cos(a));right=(X-17*math.cos(a)-8*math.sin(a),Y-17*math.sin(a)+8*math.cos(a))
 return line(x,y,X,Y,'#2563EB')+f'<polygon points="{X},{Y} {left[0]:.1f},{left[1]:.1f} {right[0]:.1f},{right[1]:.1f}" fill="#2563EB"/>'
# Explicit 35-degree arc from the perpendicular, no reflected-answer ray.
body=line(80,250,560,250)+line(320,55,320,250,'#64748B','stroke-dasharray="8 7"')+arrow(204.2,84.6,320,250)
body+='<path d="M320 178 A72 72 0 0 0 278.7 191" fill="none" stroke="#B45309" stroke-width="3"/>'
body+=text(270,160,'35°')+text(320,35,'Normal')+text(320,286,'Mirror / Cermin')
(p/'reflection.svg').write_text(frame('Incident ray at 35 degrees to a perpendicular normal',body),encoding='utf-8')
for name,upper,lower,ray in [('refraction-glass','Air / Udara','Glass / Kaca',(210,55,320,150)),('refraction-water','Air / Udara','Water / Air',(270,236.6,320,150))]:
 body='<rect x="35" y="150" width="570" height="125" fill="#BAE6FD"/>'
 body+=line(35,150,605,150)+line(320,42,320,275,'#64748B','stroke-dasharray="8 7"')+arrow(*ray)
 body+=text(480,90,upper)+text(480,225,lower)+text(320,30,'Normal')
 (p/f'{name}.svg').write_text(frame('Incident ray at a labelled boundary; outgoing ray intentionally omitted',body),encoding='utf-8')
# Four layers only. No ocean/atmosphere ring mistaken for another internal layer.
body=''
for r,col in [(112,'#92400E'),(102,'#F59E0B'),(58,'#FB923C'),(27,'#FDE68A')]:
 body+=f'<circle cx="280" cy="140" r="{r}" fill="{col}" stroke="#78350F" stroke-width="2"/>'
for y,xend,yend,label in [(65,385,119,'A'),(130,355,145,'B'),(195,322,171,'C'),(245,280,140,'D')]:
 body+=line(470,y,xend,yend,'#475569')+text(500,y+8,label)
body+=text(280,288,'Not to scale / Bukan mengikut skala')
(p/'earth-layers.svg').write_text(frame('Four nested internal Earth layers labelled from outside A to centre D',body),encoding='utf-8')
# Parallel 45-degree mirrors centred on the two turning points.
body='<path d="M140 45 H350 V205 H500 V265 H290 V105 H140" fill="#E2E8F0" stroke="#475569" stroke-width="4"/>'
body+=line(295,50,345,100,'#0284C7')+line(295,210,345,260,'#0284C7')
body+=arrow(145,75,310,75)+arrow(320,85,320,222)+arrow(332,235,490,235)
body+=text(105,83,'A')+text(535,245,'B')
(p/'periscope.svg').write_text(frame('Light travels from A rightwards, downwards and rightwards to B via two parallel 45 degree mirrors',body),encoding='utf-8')
# Equal particle numbers, sizes and colours; ordered solid close together at bottom.
body=''
sets=[[(x,y) for y in [205,223,241] for x in [106,124,142,160]],[(270,242),(289,239),(309,243),(329,240),(281,222),(300,219),(320,221),(340,223),(270,202),(291,201),(313,202),(334,202)],[(465,64),(522,59),(579,70),(447,113),(505,105),(566,121),(471,165),(527,155),(584,176),(450,221),(516,237),(574,233)]]
for left,label,pts in zip([45,245,445],['A','B','C'],sets):
 body+=f'<rect x="{left-10}" y="40" width="160" height="215" rx="8" fill="white" stroke="#64748B" stroke-width="3"/>'
 body+=text(left+70,285,label)
 for x,y in pts:body+=f'<circle cx="{x}" cy="{y}" r="7" fill="#2563EB"/>'
(p/'particles.svg').write_text(frame('Three arrangements A B C with twelve equal particles in each',body),encoding='utf-8')
# Guard-cell chloroplasts only; remove decorative green spots outside guard cells.
s=(p/'stoma.svg').read_text(encoding='utf-8')
s=re.sub(r'<circle[^>]+fill="#86EFAC"[^>]*/>','',s)
s=s.replace('Microscope view · Stoma / Stoma','Stoma').replace('font-size="18"','font-size="26"')
(p/'stoma.svg').write_text(s,encoding='utf-8')
# Bilingual labels and legible size; no question mark on opaque paper.
s=(p/'leaf-light.svg').read_text(encoding='utf-8')
s=re.sub(r'<text[^>]+>\?</text>','',s).replace('Covered part','Paper / Kertas').replace('Light source','Light / Cahaya').replace('font-size="17"','font-size="26"')
(p/'leaf-light.svg').write_text(s,encoding='utf-8')
s=(p/'flower.svg').read_text(encoding='utf-8')
# Remove radial back petals: a longitudinal side view should not resemble a face-on flower.
s=re.sub(r'<ellipse[^>]+transform="rotate\((?:0|180) 320 138\)"[^>]*/>','',s)
s=s.replace('Longitudinal section','Section / Keratan').replace('font-size="18"','font-size="26"')
(p/'flower.svg').write_text(s,encoding='utf-8')
for name in ['measurement','heating-curve','mirror','chromatography','plates']:
 s=(p/f'{name}.svg').read_text(encoding='utf-8')
 s=re.sub(r'font-size="(?:17|18|19|21)"','font-size="26"',s)
 if name=='measurement':
  # Same cross-section: 50 units =100 px, 65=130 px above the base at y=211.
  s=s.replace('y="119"','y="111"').replace('y1="119"','y1="111"').replace('y2="119"','y2="111"').replace('height="92"','height="100"')
  s=s.replace('y="95"','y="81"').replace('y1="95"','y1="81"').replace('y2="95"','y2="81"').replace('height="116"','height="130"')
 if name=='mirror':
  s=s.replace('x="411" y="37" width="13"','x="419" y="37" width="13"').replace('x="422" y="37" width="8"','x="411" y="37" width="8"')
 (p/f'{name}.svg').write_text(s,encoding='utf-8')
# Remove decorative pairings; the flower remains for the ovule-to-seed problem.
mapping=Path('src/content/form1/science/quiz-visuals.ts')
s=mapping.read_text(encoding='utf-8')
s=re.sub(r'^  "sci-f1-c(?:4-(?:bm|dlp)-q14|7-(?:bm|dlp)-q12)":.*\n','',s,flags=re.M)
mapping.write_text(s,encoding='utf-8')
(p/'fire-triangle.svg').unlink()
