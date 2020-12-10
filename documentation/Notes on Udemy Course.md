# Notes on Udemy Course


## Experience before the Course: The Dark Times
Michael has had over a year of fullstack Angular development experience as of the start of this project. His first experience was a college course that taught an Agile workstyle and gave four iterations over the course of the semester using Angular. Since then he worked on two [(1)](https://github.com/Megabittron/DeploymentExperiment-URS) [(2)](https://github.com/mn-pollinators/buzz-about) internships that used Angular. In particular, his [most extensive Angular experience](https://github.com/Megabittron/DeploymentExperiment-URS) was through a webapp for an internship focused on creating a way for undergraduate students to submit research abstracts to be reviewed by anonmyous university faculty committees. But those classes and internships were student lead while everyone was scrambling to learn Angular along the way, so many practices were not proper to say the least.

## So why take a course? Why that course?
To suppliment these somewhat outdated practices full of antipatterns and hacky solututions, Michael bought a paid course on Angular that spans 455 lectures and 34 hours of content. Maximilian Schwarzmüller, professional web developer and instructor created the course ["Angular - The Complete Guide (2020 Edition)"](https://www.udemy.com/course/the-complete-guide-to-angular-2/) to be taken asynchronously on the video teaching platform Udemy. Max has been an invaluable resource for learning best Angular practices in Michael's experience, and has instilled some of Michael's better practices with the framework. At the time of writing, Michael is about a quarter of the way through the course and has jumped ahead to learn about Firebase. For anyone who is interested in the course but turned off by the price, Udemy courses often go on sale and have coupon codes that can make the course cost at max $20.

The following is learning notes concerning the Firebase portion of the course:

# Lecture Notes

## Section 18: Making Http Requests

### 251. How Does Angular Interact With Backends?

* Don't connect Angular to DB directly (for security, as frontend can be inspected publicly). Instead, a server via API (REST for this webapp/Udemy Course) which then hits the DB.
* Provided articles on Max's website: [Hide JavaScript Code](https://academind.com/learn/javascript/hide-javascript-code/) and [Building a RESTful API](https://academind.com/learn/node-js/building-a-restful-api-with/).

### 252. The Anatomy of a Http Request

* Goes over basics of API endpoints, HTTP verbs, request headers and bodies.

### 253. Backend (Firebase) Setup

* [Firebase](https://firebase.google.com/) (a Google service) is not just a DB but an entire backend solution with DB/Auth/Hosting. 
* Created Firebase project [CandyEmployeeApp](https://console.firebase.google.com/u/1/project/candyemployeehub/overview) for this webapp with Firebase's console (requires Google account, in this case through Michael's personal email). Google analytics enabled because it is required for A/B testing, unlimited reporting, in-app messaging, and event-based cloud function triggers that may be used later.
* For development purposes, the Realtime Database is set to "test mode" which enables read/write for 30 days as of setting. Goes to "locked mode" which denies all reads/writes after that period if security rules are not updated.
* Requests will be sent to `https://candyemployeehub-default-rtdb.firebaseio.com/`.

### 254. Sending a POST Request

* Created `onCreateLineStatus(lineStatus: LineStatus)` in `LineStatusComponent` which is called when submitting a status.
* `onCreateLineStatus` calls a POST with the URL `https://candyemployeehub-default-rtdb.firebaseio.com/statuses.json`. The `.json` is a Firebase URL convention. Max notes with great emphasis that this is still not hitting a DB directly. The app is still communication with Firebase via its REST conventions, but Firebase translates it to what looks like a folder structure in the DB. To be honest, I get the abstraction but am still unsure how this isn't effectively hitting the DB right from the webapp, but I trust Max. For an example of a request... the root of the Firebase project is `https://candyemployeehub-default-rtdb.firebaseio.com/`. The `statuses.json` resolves to a "statuses" folder. The POST creates an entry to "statuses" with some OID. That item has all the fields of a status. In the end it looks like `https://candyemployeehub-default-rtdb/statuses/-MOAWY7GruONu7TO9Ic6/{all fields of a status here}`. 
* Calling the POST will return an observable. However, if that observable isn't subscribed to, the request will not be sent.

### 255. GETing Data

* `fetchStatuses()` uses same URL as route from last lesson because it is merely getting the data from that statuses collection. JSON object that is returned needs to be translated to object type we want. 
* `onFetchStatuses()` was made for Max's demo where that was called in a click handler on a button to retrieve his data. I don't plan on having a use for it... yet. His practice of starting names of click handlers with "on" is good practice that I see on every legitamate turorial, so I retain this as an artifact of good practice. 
