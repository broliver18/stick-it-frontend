# Stick-It

## Description
This app was intended for teachers to use with their students. The teacher can create quizzes with both multiple-choice and short-answer questions. They can then host a game for that quiz which the students can join via a generated PIN. 

The game is self-paced, meaning that not all users have to answer a question simultaneously. The questions will show up on the user's screen and if the user answers a question correctly, they will be allowed to flip 1 of 24 possible cards. The back of the card consists of the number of points (which can be negative) that will be awarded to the user (the host will determine the range of possible points when creating the quiz).

The host's screen will display the current rankings for all users playing which will include users' names and how many points they have. This display will be updated in real time as users answer questions.

This app can be used by people of all ages but will likely be more entertaining for younger users (age 12 and under). The self-paced nature of the game allows teachers to create a fun game in which students of all abilities can take their time to answer without feeling pressured. Additionally, the point system allows for an added layer of excitement and unpredictability due to not knowing how many points will be awarded.

## Links
- Website: https://stickitgames.com
- Video demonstration: https://www.linkedin.com/feed/update/urn:li:activity:7093214003165843456/
- Server repo: https://github.com/broliver18/stick-it-backend/tree/main

## Features
- Utilizes Socket.io as a WebSocket to facilitate data broadcast between host and users
- Allows both multiple-choice and short-answer questions
- Waiting room for host to see all users participating in game
- Randomiszed points to ensure that all users have different point cards
- Point cards are assigned new points when flipped to keep user from knowing which cards have which points
- Multiple games can be running at the same time with multiple users
- Server checks if name field is empty or if there's a user with a duplicate display name before registering the user
- Disconnect protocols set in place to prevent bugs when user or host accidentally disconnects or refreshes page

## Technologies
- Node.js
- Express
- Socket.io
- MongoDB/Mongoose
- React.js
- React Router V6
- Redis

## Screenshots
![Screenshot 2023-08-03 at 2 22 36 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/fd3f08e5-f411-4ff9-8bce-51ac5a16d5ca)
![Screenshot 2023-10-19 at 11 34 34 AM](https://github.com/broliver18/stick-it-frontend/assets/99209406/e0ab3be5-c04b-4260-87c0-05f898691641)
<img width="1206" alt="Screenshot 2023-10-12 at 11 08 41 PM" src="https://github.com/broliver18/stick-it-frontend/assets/99209406/2ec63b36-19eb-484e-afca-54a4cd480f9b">
![Screenshot 2023-08-03 at 2 23 06 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/caa10d65-a0a1-4820-a0fb-cbcb00ee56f4)
<img width="1436" alt="Screenshot 2023-10-12 at 11 09 25 PM" src="https://github.com/broliver18/stick-it-frontend/assets/99209406/77e93569-7a30-41c6-972d-7c5afcec7059">
![Screenshot 2023-08-03 at 2 42 23 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/ff25182f-f448-4a8a-ba63-279cb2230202)
![Screenshot 2023-08-03 at 2 27 25 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/c3cff0ce-ec11-4fa6-a2f7-2db5bd152275)
![Screenshot 2023-08-03 at 3 31 52 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/a9ed35af-64a4-4b4d-9ff7-6e9c7bb29bbb)
![Screenshot 2023-08-03 at 2 30 11 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/313b6efa-8680-4592-9f01-b3f510a37bc6)
![Screenshot 2023-08-03 at 2 30 41 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/04e27b05-f007-45fe-8282-5bf6d6e0fb4f)
<img width="1423" alt="Screenshot 2023-10-12 at 11 11 09 PM" src="https://github.com/broliver18/stick-it-frontend/assets/99209406/399a75bf-2c0e-4d0b-8234-25a10db95009">
