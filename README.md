# Stick-It

## Description
This app was intended for teachers to use with their students and works similarly to Kahoot. The teacher can create quizzes with both multiple-choice and short-answer questions. They can then host a game for that quiz which the students can join via generated PIN. 

Unlike Kahoot, this game is self-paced, meaning that not all users have to answer a question simultaneously. Instead of the question showing up on the host's screen, it will show up on the user's screen. If a user answers a question correctly, they will be allowed to flip 1 of 24 possible cards. The back of the card consists of the number of points (which can be negative) that will be awarded to the user (the host will determine the range of possible points when creating the quiz).

The host's screen will display the current rankings for all users playing which will include their name and how many points they have. This display will be updated in real-time as users answer questions.

This app can be used by people of all ages but will likely be more entertaining for younger users (age 12 and under). The self-paced nature of the game allows teachers to create a fun game in which students of all abilities can take their time to answer without feeling pressured. Additionally, the point system allows for an added layer of excitement and unpredictability due to not knowing how many points are behind each card.

## Links
Server repo: https://github.com/broliver18/stick-it-backend/tree/main

## Features
- Utilizes Socket.io as a WebSocket to facilitate data broadcast between host and users
- Allows both multiple-choice and short-answer questions
- Waiting room for host to see all users participating in game
- Randomiszed points to ensure that all users have different point cards
- Point cards are assigned new points when flipped to keep user from knowing which cards have which points
- Multiple games can be running at the same time with multiple users
- Server checks if name field is empty or if there's a user with a duplicate display name before registering the user
- Disconnect protocols set in place to prevent bugs when user or host accidentally disconnects or refreshes page

## How to Use
1. Download zip file for the [server repo](https://github.com/broliver18/stick-it-backend)
2. Extract the files
3. Repeat steps 1-2 for the client repo (current repo)
4. Open the terminal on your computer and create a split-terminal
5. Navigate to the parent folder of the server on one terminal and the client on the other using the `cd` command
6. Enter `npm install` into both terminals and wait for the installation to complete
7. Enter `npm run dev` into the server terminal and `npm start` into the client terminal
8. Navigate to `http://localhost:3000` in your browser if it didn't automatically open a tab for you
9. Start using the application

## Technologies
- Node.js
- Express
- Socket.io
- MongoDB
- Mongoose
- React.js
- React Router V6
- Nanoid
- JavaScript
- HTML
- CSS

## Screenshots
![Screenshot 2023-08-03 at 2 22 36 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/fd3f08e5-f411-4ff9-8bce-51ac5a16d5ca)
![Screenshot 2023-08-03 at 2 23 06 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/caa10d65-a0a1-4820-a0fb-cbcb00ee56f4)
![Screenshot 2023-08-03 at 2 23 51 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/47a78087-cc27-4a80-b51d-00b12d562f4d)
![Screenshot 2023-08-03 at 2 42 23 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/ff25182f-f448-4a8a-ba63-279cb2230202)
![Screenshot 2023-08-03 at 2 27 25 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/c3cff0ce-ec11-4fa6-a2f7-2db5bd152275)
![Screenshot 2023-08-03 at 3 31 52 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/a9ed35af-64a4-4b4d-9ff7-6e9c7bb29bbb)
![Screenshot 2023-08-03 at 2 30 11 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/313b6efa-8680-4592-9f01-b3f510a37bc6)
![Screenshot 2023-08-03 at 2 30 41 PM](https://github.com/broliver18/stick-it-frontend/assets/99209406/04e27b05-f007-45fe-8282-5bf6d6e0fb4f)
