from pathlib import Path
p=Path('src/content/form1/science/chapter-8/chapter8-content.ts')
t=p.read_text(encoding='utf-8')
replacements={
'White light consists of seven different colours. Each component of colour travels at a different speed in a medium.':'White light consists of seven components of colour. Each component of colour travels at a different speed in a medium.',
'Red light has the highest speed. Therefore, red light is refracted the least. Violet light has the lowest speed and is refracted the most.':'For example, red light has the highest speed, so red light is refracted the least. However, violet light has the lowest speed, so violet light is refracted the most.',
'When a beam of white light is directed towards a prism, the white light is split into different colour components. The different colours bend towards the normal at different angles when entering the prism.':'When a white light ray is directed to a prism, the white light will be separated into its components of colour. This is because the different colours in the white light bend towards the normal at different angles when entering the prism.',
'Light leaving the glass prism bends away from the normal. The light is dispersed into seven colours in a particular order known as a spectrum.':'When the different colours leave the glass prism, they are refracted away from the normal. The different colours are dispersed in an order that is known as a spectrum. The spectrum of white light consists of red, orange, yellow, green, blue, indigo and violet colour.',
'When sunlight enters rain droplets in the sky, white light is refracted and dispersed into seven different colours known as a rainbow.':'When sunlight enters rain droplets in the sky, the white light will be refracted and dispersed into seven different colours to form a rainbow.',
'What will happen if a second prism is placed upside down behind the first prism?':'What will happen if a second inverted prism is placed behind the first prism?',
'To study the dispersion of light through a glass prism and the formation of a rainbow':'To study the dispersion of light passing through a glass prism and the formation of rainbow',
'Carry out this activity in a dark room.':'Carry out this activity in the dark.',
'Direct a narrow beam of light from a ray box towards a glass prism. Adjust the glass prism until a sharp spectrum is formed on the white screen.':'Direct a narrow light ray from a ray box towards a glass prism (Figure 8.19). Adjust the glass prism slowly until a sharp colour spectrum is formed on a white screen.',
'Identify the colours produced in the spectrum.':'Identify the colours formed on the white screen.',
'Observe the order of the colours on the white screen.':'Observe the order of colours on the white screen.',
'Fill a basin halfway with water.':'Fill a basin half-full with water.',
'Place a plane mirror in the water, inclined against the side of the basin. Fix the mirror with cellophane tape.':'Place a piece of mirror in the water with an incline on the side of the basin. Secure the mirror using a cellophane tape.',
'Make a small hole in the middle of a round black cardboard. Then, attach the black cardboard to the front of the torchlight with cellophane tape.':'Make a small hole on a piece of round black cardboard. Then, attach the black cardboard to the front of a torch light.',
'Shine the torchlight towards the mirror.':'Shine the torchlight towards the mirror (Figure 8.20).',
'Hold a piece of white paper beside the mirror. Adjust the position of the torchlight until you can see a rainbow.':'Hold a white paper beside the mirror. Adjust the direction of the torchlight until you see a rainbow on the paper.',
'List in order the seven colours formed on the screen in the diagram.':'List the seven colours formed on the screen below in the correct order.',
'State the colour component that is refracted the most and the least in the phenomenon above. Relate this phenomenon to the speed of each colour component.':'State the colour component that is refracted the most and refracted the least in the phenomenon above. Relate the phenomenon with the speed of each colour component.',
'During sunset, sunlight shines horizontally. Red and orange light are scattered less and reach your eyes, while blue light is scattered away from the original path. Therefore, the sky looks reddish during sunset.':'During sunset, the sun is at the horizon. Red and orange light are less scattered and will go through the atmosphere to reach your eyes. Other coloured lights such as blue light are scattered away. Therefore, the sky looks reddish during sunset.',
'Blue light is scattered by particles suspended in the air':'Blue light is scattered by particles in the air',
'Light from the Sun appears reddish':'Light directly from the Sun appears red',
'Carry out the activity in a dark room.':'Carry out this activity in the dark.',
'Add a few tablespoons of milk powder into the water. Stir the water until you can clearly see the beam of light shining through the liquid.':'Add a few tablespoons of milk powder into the water. Stir the water until you can see a beam of light that shines through the mixture.',
'Look at the beam of light from the side of the beaker. Then, look at the white screen as shown in Figure 8.23.':'See the light beam from the side of the beaker. Then, look at the white screen as shown in Figure 8.23.',
'Add more milk powder and observe the colour change of the beam of white light from the side of the beaker and on the white screen.':'Add more milk powder and observe the colour change of the white light beam at the side of the beaker and on the white screen.',
'Record your observations.':'Record your observation.',
'Fill in the blanks with the correct words.':'Fill the blanks with the correct words.',
'Blue light is scattered ______ compared to red light.':'Blue colour is scattered ______ compared to red colour.',
'Red light is scattered ______ compared to blue light.':'Red colour is scattered ______ compared to blue colour.',
}
# Only the new 8.5 / 8.6 object spans, never a global source replacement.
for begin,end in [('  dispersion: {','  colorAdditionSubtraction: {')]:
 start=0
 for _ in range(2):
  a=t.index(begin,start);b=t.index(end,a);part=t[a:b]
  for old,new in replacements.items():part=part.replace(old,new)
  t=t[:a]+part+t[b:];start=a+len(part)
p.write_text(t,encoding='utf-8',newline='\n')
p=Path('src/components/notes/Chapter8Dispersion.tsx');t=p.read_text(encoding='utf-8').replace('<li key={item}>','<li key={`${i}-${item}`}>').replace('M247 153L331 108.79','M234.69 140.83L318.69 96.62');p.write_text(t,encoding='utf-8',newline='\n')
p=Path('src/components/notes/Chapter8Scattering.tsx');t=p.read_text(encoding='utf-8').replace('viewBox="0 0 460 310"','viewBox="0 0 460 345"');p.write_text(t,encoding='utf-8',newline='\n')
