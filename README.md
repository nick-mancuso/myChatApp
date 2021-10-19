## DIY Discord Personal Growth Report

1. Describe the timeline of the project: HOW MANY HOURS DID YOU SPEND, when did you start, bottlenecks you faced, etc.

I spent about 20 hours a week on this assignment; this includes doing "Hello World" examples for some of the more complicated components. For some of the simpler components, I was able to directly integrate what we did in class into my discord. For the last week, I spent about 30 hours on it. I began my first iteration of the project the evening that I left office hours after the (third or fourth?) class. I really had no real web dev experience, so I knew this would be an uphill battle; I wanted to get started as soon as possible. I faced myriad problems, with about one really ugly one per week. One major hurdle for me was wrapping my head around using a language that is not stongly typed; this is still a pain point for me, and honestly I think it promotes some bad practices and makes things more difficult than they have to be. However, after trying to make a typescript and angular version of this project I can say that these two techonolgies really don't improve things; I abandoned angular because of all the hoops that I had to jump through to correctly create dynamic content like the messages, channel names, etc.

Also, I struggled a bit with information overload and the seemingly infinte methods to perform certain common tasks. I am most proficient in Java and C; when I am looking for a way to solve a problem in one of those languages, I may be able to find three or four solid solutions quicky; this was not the case for HTML/CSS/JS. Another problematic aspect of the project was Firebase; while the interface and product itself is great, the documentation is some of the worst and inconsistent that I have used. Furthermore, I was my own worst enemy; forgoing the discipline that I have carefully cultivated over the years as a Java engineer, I focused more on the completion of tasks than any real design or high-level planning. This led to an incredible amount of tech debt that continually bit me over and over again.

Altogether, I rewrote this app seven times (not counting the angular version which I abandoned) from scratch. I would have liked to have had time for one more rewrite, but I have shirked other coursework and household responsibilites enough lately. Additionally, I am pretty pleased with the current state of the discord app; considering what I knew coming in, I am very satisfied with the result.

2. How did you meaningfully grow as a developer from the project (if you did)?

I certainly did grow as a developer; foremost, I have reinforced the fact that fairly careful planning, design, and a bit of research before starting to write code will ultimately lead to more efficient task completion. Also, I learned a great deal about security, which is something that I definitely did not have enough experience with. Really, this course has changed the entire "model" of the internet that I had built in my mind previously. As software engineers, we often abstract away details to help us more quickly understand something (at least as much as we need to know to get the job done). This course and project helped me shape a much more interesting and deeper model of how the internet works. Finally, getting exposed to such a plethora of different tools and technologies has been great; though I didn't learn any of them deeply, at least I know things like AWS lambda functions, React, and AJAX exist, and would know when to use them to solve future problems.

3. Were there any "A-HA" insights that you'll carry with you into future work?

Security is a big one; there are so many different attack vectors that I had never considered before. User input is the devil! Another is that `console.log()` is king in Javascript debugging; if there really is some way to step through Javascript in any reliable way, I couldn't find it. There were some points during this project that I swear I had a `console.log()` on every other line. Also, really beating the model-view-controller concept into my head was good, because I have done very little GUI programming previously.

4. If you collaborated with other folks in the class what was that like?

Other than light discussion of general topics and sharing links to things we built, I did not really collaborate in any significant way. The interactions I had were fun, and we enjoyed comparing whose implementation was worse to help ease the pain a bit.

5. Are you proud enough of the work that you'd use it in a job interview/portfolio? If not, what would you change to make it that way?

I am very proud of what I have accomplished considering the knowledge that I brought with me to this course. However, I would probably not add this to my portfolio, since I do not desire a job in web development nor do I want to work with Javascript. The other projects that I show employers typically have months or years invested in them, and are generally more reflective of what I would like to do as a career; namely things like static analysis, parsing, and operating systems. In order for me to use this for a portfolio, I would like to make one more rewrite, and really work on improving the CSS and general astectics of the application.

6. Rate your sense of mastery on a scale of 1-10 for our mastery tasks for this project:
 - You can host a website using static files on a CDN (10/10)
 - You can display data read from a database dynamically (10/10)
 - You can write data to a database (and have other users see it) (10/10)
 - You can manage client-side "routing", "deep-linking", and display different screens based on the user's choices (9/10)
 - You can design your database (or API services) to give you what you need on the screen you need it (10/10)
 - Given an array of JSON objects display them each in a template and let a user interact with any particular object (10/10)
 - You can setup OAuth and passwords with email resets for your users (10/10)
 - You can assign roles to users based on their auth token and control access based on those roles  (7/10)
 - You can allow users to create a new server/channel/page dynamically and others route to that synthetic page (10/10)

My ratings above are within the context of this project and what we have discussed in the course so far; a (10/10) above might equate to a (3/10) in real life, with production code and paying clients. I think there are a lot of nuances to all of the topics we covered (just like anything else), and I would NOT say that I have truly mastered anything except `console.log()` debugging in my brief stint in web development. Overall, I enjoyed working on this project, and look forward to the rest of the course!
