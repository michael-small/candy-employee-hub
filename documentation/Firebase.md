# Firebase

Firebase is a service created and hosted by Google that can handle realtime NoSQL, authentication, and hosting. All three will be used for this application, as of the demo stage for the Line Status page. 

Firebase's features are managed through a Google developer console that can be accessed by any authorize developer team member. And in the event that the webapp is ported to mobile, it can handle Anroid and iOS.

## Why Firebase?

Not only is Firebase the chosen service right now due to all that it offers, but Michael has had some into experience with an adjacent tool called Cloud Firestore. He also is taking a [paid Udemy course on Angular apps](https://www.udemy.com/course/the-complete-guide-to-angular-2/) that uses Firebase. 

He has also worked with people from his university that have worked extensively with Firebase. In particular, his friend Nathan Foss has taken the same course and has [his own app](https://github.com/nkfoss/ohm-str) with the same stack as this project at time of writing. They consult with each other on personal projects (which this project is at time of writing), and Nate is helpful with explaining to Michael the basics of using Firebase in an Angular fullstack application. 

## Features breakdown with docs:
* [Hosting](https://firebase.google.com/docs/hosting). Deploys static websites with `firebase deploy` command. Requires the Firebase CLI. Automatically provides SSL. 
* [Realtime Database](https://firebase.google.com/docs/database). NoSQL DB that can do all CRUD operations over HTTPS in real time. Databases SDK caches data for when a user may lose connection which can be synchronized when a connection is re-established. Interfaces with Firebase's authentication service using its security rules for hitting endpoints. 
* [Authentication](https://firebase.google.com/docs/auth). Can use all sorts of email services and 3rd party logins (Google, Facebook, Github and more) as well as a generic OAuth 2.0 implimentation ran by Firebase for the site. Firebase offers its own special security rules to guard endpoints for authenticated and authorized users. This comes with other nice features such as logging requests and showing previous versions of security rules the site has used. Can make own login UX or use provided UX by Google.
