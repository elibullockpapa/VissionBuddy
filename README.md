## What it does
With VisionBuddy, visually impaired individuals can navigate the world with their phone’s camera and voice. With just two large buttons and an audio-first user experience, our app doesn’t require vision to use.

- **Audio descriptions of camera view** - by clicking the camera view once
- **Ask questions about your surroundings in natural language** - by pressing and holding the orange button.
- **Audio Feedback and Navigation** - After asking questions, changing camera views, and gathering scene context.
- **Switching cameras** - by clicking and holding the camera view

## Inspiration
One of our teammates, Soham, volunteered as a scribe for a visually impaired student during his time in school. In his role, Soham's everyday interactions with Chinmay, his specially abled friend awakened him to the everyday struggles that Chinmay had to endure, from seemingly easy tasks such as navigating to a classroom to handling personal belongings. We, as a team, are passionate about leveraging technology to significantly alter the lives of those around us. Chinamy and countless others serve as inspiration for building VisionBuddy.ai at VTHacks.

## How we built it
Visual Q&A: Vertex AI from Google
Transcription and text-to-speech: Web Speech API (built into all modern browsers)
Frontend: React, Vite, and Material-UI

## Challenges we ran into
- Getting the camera to work properly and then formatting the output correctly for the Vertex API
- Designing a user experience that removes as many visual elements as possible while still retaining functionality.
- Passing data around the app from component to component.

## Accomplishments that we're proud of
We take immense pride in our achievement: within a single day, we've successfully developed a functional prototype that provides an intuitive way for individuals to explore and understand their environment using video. This accomplishment. 
After extensive brainstorming, we settled on the idea behind VisionBuddy for our project. We faced a tight deadline, with less than 24 hours to turn our idea into a reality once we began coding. We take great pride in the fact that, despite our busy schedules, schoolwork, and upcoming exams, we wholeheartedly committed ourselves to turning this idea into a reality. Moreover, many of our team members were relatively inexperienced in hackathons and the rapid development pace they demanded. Despite this, we embraced the challenge, learned about numerous new frameworks, tools, programming languages, and software that were previously unfamiliar to us, and worked diligently to bring our project to fruition. 

## What we learned
**Web Speech API**: we learned how to use features such as transcription and speech synthesis that can run on-device leading to a much faster user experience.
**Google Cloud**: we learned about setting up new projects, getting API keys, and making API requests. We also learned about the GCP offerings for different AI applications ranging from vision to natural language processing. 
**Latest AI frameworks and tools**: we came across new AI such as OpenAI Whisper, ElevenLabs Voice AI, Watson IBM TTS, and Bark, amongst others through the research we carried out. 

## What's next for VisionBuddy.ai
Moving forward, our plans involve validating our prototype through user testing and enhancing the overall user experience. To achieve this, we aim to partner with non-profits and local organizations like the VA Department for the Blind and the Visually Impaired. From a technical standpoint, we're considering the possibility of integrating advanced large-language models to enhance the intelligence and capabilities of VisionBuddy.ai