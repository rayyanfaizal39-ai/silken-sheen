import React from 'react';
import {createRoot} from 'react-dom/client';
import {chapter8Content} from '../../../src/content/form1/science/chapter-8/chapter8-content';
import {Chapter8Dispersion} from '../../../src/components/notes/Chapter8Dispersion';
import {Chapter8Scattering} from '../../../src/components/notes/Chapter8Scattering';
const language=new URLSearchParams(location.search).get('lang')==='en'?'en':'bm';
const t=chapter8Content[language];
createRoot(document.getElementById('root')!).render(<main className="mx-auto max-w-5xl space-y-8 p-4 sm:p-8"><h2 className="text-2xl font-bold">8.5 {t.subtopics[4].title}</h2><Chapter8Dispersion source={t.dispersion}/><h2 className="text-2xl font-bold">8.6 {t.subtopics[5].title}</h2><Chapter8Scattering source={t.scattering}/></main>);
