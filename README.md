# To Do List
<img width="1470" alt="Screenshot 2023-01-26 at 1 52 45 PM" src="https://user-images.githubusercontent.com/41353202/214924739-25813257-dbb7-42f1-a315-98bbcb49a688.png">
<img width="1470" alt="Screenshot 2023-01-26 at 1 53 08 PM" src="https://user-images.githubusercontent.com/41353202/214924756-25673ee1-d819-4a57-9ba7-3277b3fb51a9.png">
<p align="middle">
<img width="389" alt="Screenshot 2023-01-26 at 1 54 12 PM" src="https://user-images.githubusercontent.com/41353202/214924901-0362b33f-a349-4973-92d2-cf86afd0c488.png">
<img width="389" alt="Screenshot 2023-01-26 at 1 53 39 PM" src="https://user-images.githubusercontent.com/41353202/214924915-c1a017cc-a19a-4aa7-91ca-c9799435cab4.png">
</p>

## Abstract
To Do List created for The Odin Project curriculum. 

App features the ability to add tasks, give them a description and due date, assign them to a project, and sort tasks based on time due or by associated project. The site is responsive and has a mobile and a desktop layout. Because of that, some of the app's functions, particularly the sidebar, change depending on which layout the app is currently displayed in. Additionally, the site has **localStorage** functionality and will save any projects and tasks to the browser for later retrieval.

Built with Webpack, there a multiple modules for specific functions and call upon each other using imports and exports. This project was a lot larger in scale than my last one, [restaurant-page](https://github.com/WitchingHr/restaurant-page), and it was the first time that I encountered issues with Module execution order from bundling. I had to rethink and reorder some of my code to get some of the functionality to work correctly, and **learned a very important lesson on why we should loosely-couple our code to allow easy scalability**. (Note: I did not loosely-couple any code in this project, but I researched the topic afterwards and ended up doing it in my next project, [weather-app](https://github.com/WitchingHr/weather-app).)

Another challenge I faced with building this app was getting the sidebar to function differently when in different layouts. I used an *onresize* function to get the sidebar to automatically close if the user resizes the window past the mobile layout threshold of 768px. Additionally, the listener attached to the sidebar button is changed to a different function that changes how the sidebar opens in a mobile layout. The difficulty with this process was getting the browser to know which layout it was in on page load. To accomplish this I set the same function as the *onresize* to the *onreload* event and added a mobile checker function inside that checks for device name. Big thanks to [Detect Mobile Browsers](http://detectmobilebrowsers.com/).

I had a lot of fun with designing the data structure for the projects and tasks. And learned some new ways to retrieve and sort the objects that matched a name or date, especially the *filter method*. 

I also learned how tedious it is working with Date and customizing the way you want dates to be shown, as well as dealing with timezone offsets. Now I know why we use libraries for this sort of thing.

Finally, this was also the first time that I got to utilize the localStorage interface. It was shocking to me how easy it was to implement. 

## Lessons learned

 - Why we need to loosely-couple our code!
 - Creating organized data structures
 - Retrieving and sorting data
 - Manipulating dates and building functions to format them
 - Saving to the browser with localStorage
 - Window.onload & Window.onresize
 - Detecting mobile browsers

## Asset sources
All icons were designed by myself using Figma.
