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
