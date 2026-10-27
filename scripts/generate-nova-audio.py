"""Original Nova score and foley. Offline composition; no samples, APIs or generation services.

Requires Python + numpy and ffmpeg for authoring only. Outputs are committed static assets.
All notes, synthesis, arrangements and recordings in this script are original and CC0-1.0.
"""
from pathlib import Path
import json
import subprocess
import tempfile
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/nova/audio"
OUT.mkdir(parents=True, exist_ok=True)
SR = 32000
TAU = 2 * np.pi
RNG = np.random.default_rng(731)

def hz(midi):
    return 440 * 2 ** ((midi - 69) / 12)

def voice(midi, duration, kind="piano"):
    t = np.arange(round(duration * SR)) / SR
    f = hz(midi)
    if kind == "strings":
        # Gentle bowed harmonics, slow attack and release; no sharp sawtooth.
        a = sum(np.sin(TAU * f * k * t + .012 * np.sin(TAU * 4.3 * t)) / k**2 for k in range(1, 5))
        env = np.minimum(t / 1.15, 1) * np.minimum((duration-t) / 1.9, 1)
    elif kind == "bell":
        a = np.sin(TAU*f*t) + .22*np.sin(TAU*f*2.001*t) + .06*np.sin(TAU*f*3.97*t)
        env = (1-np.exp(-t*100)) * np.exp(-t*2.2) * np.minimum((duration-t)/.08, 1)
    else:
        a = sum(np.sin(TAU * f * k * t) * np.exp(-t * (.5+k*.3)) / k**2.1 for k in range(1, 6))
        env = (1-np.exp(-t*180)) * np.exp(-t*.65) * np.minimum((duration-t)/.1, 1)
    return (a * env).astype(np.float32)

def place(track, clip, start, gain, pan=0, wrap=False):
    samples = (np.arange(len(clip)) + round(start * SR))
    if wrap:
        samples %= len(track)
    else:
        valid = samples < len(track)
        samples, clip = samples[valid], clip[valid]
    track[samples, 0] += clip * gain * np.sqrt((1-pan)/2)
    track[samples, 1] += clip * gain * np.sqrt((1+pan)/2)

def encode(track, name, title):
    peak = max(float(np.max(np.abs(track))), .001)
    track = np.tanh(track / peak * .8)  # Comfortable headroom; runtime volume is lower again.
    with tempfile.TemporaryDirectory(dir=OUT) as temp:
        wav = Path(temp) / "original.wav"
        with wave.open(str(wav), "wb") as out:
            out.setnchannels(2)
            out.setsampwidth(2)
            out.setframerate(SR)
            out.writeframes((track*26000).astype("<i2").tobytes())
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav),
                        "-codec:a", "libmp3lame", "-b:a", "96k", "-map_metadata", "-1",
                        "-metadata", f"title={title}", "-metadata", "artist=AcadeMY Nova original synthesis",
                        "-metadata", "copyright=CC0-1.0", str(OUT/name)], check=True)

# Eight bars at 56 BPM. Events and reverb wrap into the preceding loop tail, so
# this is a continuous cyclic arrangement rather than a track with silence at its seam.
beat = 60/56
length = 32 * beat
music = np.zeros((round(length*SR), 2), dtype=np.float32)
chords = [(50,57,61,64,69), (43,55,59,62,66), (47,54,57,62,66), (45,57,62,64,69)] * 2
melody = [78,76,73,74, 78,81,78,76, 74,73,69,73, 76,74,73,69]
for bar, chord in enumerate(chords):
    for i, note in enumerate(chord):
        place(music, voice(note, beat*6, "strings"), bar*beat*4, .105, (i-2)*.24, True)
    for step in range(8):
        note = chord[[1,2,3,4,3,2,4,2][step]] + 12
        place(music, voice(note, 3.4), (bar*4+step*.5)*beat, .085, (-1 if step%2 else 1)*.3, True)
    for step in range(2):
        place(music, voice(melody[bar*2+step], 3.2), (bar*4+step*2+.25)*beat, .055, .15, True)
    place(music, voice(chord[3]+24, 2.8, "bell"), (bar*4+1.5)*beat, .035, -.35, True)
dry = music.copy()
for delay, gain in [(.21,.16),(.43,.11),(.71,.075),(1.17,.045)]:
    music += np.roll(dry, round(delay*SR), axis=0)[:, ::-1] * gain
encode(music, "starlit-sanctuary.mp3", "Starlit Sanctuary — original seamless fantasy score")

def chimes(notes, duration, spread=.10):
    track = np.zeros((round(duration*SR), 2), dtype=np.float32)
    for i,note in enumerate(notes):
        place(track, voice(note, min(1.5, duration-i*spread), "bell"), i*spread, .22, (i%3-1)*.25)
    return track

def air(duration, warm=False, water=False):
    t = np.arange(round(duration*SR))/SR
    noise = RNG.normal(0,.17,len(t)).astype(np.float32)
    # Soft filtered noise, feather/flame or water motion, never a harsh explosion.
    noise = np.convolve(noise, np.ones(18 if warm else 7)/ (18 if warm else 7), mode="same")
    envelope = np.sin(np.pi*t/duration)**2
    tone = np.sin(TAU*(160 if warm else 640)*t + (20 if water else 3)*np.sin(TAU*2*t))*.025
    mono = (noise+tone)*envelope
    return np.stack([mono, np.roll(mono, 170)],axis=1)

specs = {
    "enter": ([74,81,86],1.6), "hover": ([93],.23),
    "answer": ([86,90],.65), "transition": ([],.48),
    "phoenix": ([74,81,86],1.15), "fox": ([86,90,93],1.1),
    "fire": ([62,74,81],.95), "water": ([81,86,90],1.0), "starlight": ([86,93,98],1.1),
    "complete": ([62,69,74,78,81,86],2.3), "summon": ([50,62,69,74,78,81,86],2.8),
    "welcome": ([81,86],1.0), "bond": ([74,78,81,86],1.7), "hatch": ([74,81,86,90],1.7),
}
clips, cues, cursor = [], {}, 0
for name,(notes,duration) in specs.items():
    track = chimes(notes,duration,.13 if name in ("summon","complete") else .075)
    if name in ("fire","phoenix","summon"):
        track += air(duration, warm=True) * .9
    if name in ("water","fox"):
        track += air(duration, water=True) * .45
    if name in ("answer","transition","phoenix","fox","fire","water","starlight"):
        whoosh = air(.4) * .7
        at = max(0, len(track)-len(whoosh))
        track[at:at+len(whoosh)] += whoosh
    if name in ("summon","complete"):
        for note in (50,57,62,66):
            place(track, voice(note,duration,"strings"),0,.10)
    # Short attack/release guards eliminate sprite-edge clicks.
    ramp = min(round(.018*SR),len(track)//2)
    track[:ramp] *= np.linspace(0,1,ramp)[:,None]
    track[-ramp:] *= np.linspace(1,0,ramp)[:,None]
    cues[name] = [round(cursor/SR,5),round(len(track)/SR,5)]
    silence = np.zeros((round(.14*SR),2),dtype=np.float32)
    clips.extend([track,silence])
    cursor += len(track)+len(silence)
encode(np.concatenate(clips), "nova-magic.mp3", "Nova Magic — original fourteen-cue effects sprite")
(ROOT / "src/features/nova-cards/sanctuary/audio-cues.ts").write_text("// Generated by scripts/generate-nova-audio.py. Original audio, CC0-1.0.\nexport const AUDIO_CUES = "+json.dumps(cues,indent=2)+" as const;\n")
print(f"Music loop: {length:.3f}s; effects sprite: {cursor/SR:.3f}s")
for file in OUT.glob("*.mp3"):
    print(file.name, file.stat().st_size, "bytes")
