#import library
import speech_recognition as sr
import sys

# Initialize recognizer class (for recognizing the speech)
r = sr.Recognizer()

# Reading Audio file as source
# listening the audio file and store in audio_text variable

with sr.AudioFile(sys.argv[1]) as source:

    audio_text = r.record(source)

# recoginize_() method will throw a request error if the API is unreachable, hence using exception handling

    # using google speech recognition
    # text = r.recognize_sphinx(audio_text)
    text = r.recognize_google(audio_text)
    print(text)

