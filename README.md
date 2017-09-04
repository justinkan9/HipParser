#Hip Parser

Prompt:

Hi,
We'd like you to complete a take-home coding exercise.  This exercise is not meant to be tricky or complex; however, it does represent a typical problem faced by the HipChat Engineering team.  Here are a few things to keep in mind as you work through it:
* The position is for a front end developer.  As a Desktop team, we work primarily with front-end technologies (React JS, LESS, etc).  If you are not comfortable working with React, we encourage you to code your solution using the JS framework of your choice, otherwise https://github.com/facebookincubator/create-react-app is a good starting point.
* There's no time limit; take your time and write quality, production-ready code.  To us, production-ready means a solid UI, test coverage, good documentation, etc... Treat this as if you're a member of the HipChat Engineering team and are solving it as part of your responsibilities there.
* Be thorough and take the opportunity to show the HipChat Engineering team that you've got technical chops.
* Using frameworks and libraries is acceptable. We are looking for how you would solve a problem like this on the job. If that involves bringing in libraries then do so, and even better, tell us why you made the choice.
  
When you think it's ready for prime time, push your work to a public repo on Bitbucket or Github and send us a link.
  
Now, for the coding exercise...
Please create a user interface that takes a chat message string as input and displays a JSON object containing information about its contents as described below.
  
Your service should parse the following data from the input:
1. mentions - A way to mention a user. Always starts with an '@' and ends when hitting a non-word character.
2. Emoticons - For this exercise, you only need to consider 'custom' emoticons which are alphanumeric strings, no longer than 15 characters, contained in parenthesis. You can assume that anything matching this format is an emoticon. (https://www.hipchat.com/emoticons)
3. Links - Any URLs contained in the message, along with the page's title. (We recommend https://cors-anywhere.herokuapp.com/ as a work-around for CORS errors)
  
The output should be a JSON object containing arrays of all matches parsed from the input string, displayed in the UI.
For example, entering the following text should result in the corresponding outputs.
Input: "@chris you around?"
Output:
{
  "mentions": [
    "chris"
  ],
  "emoticons": [],
  "links": []
}
Input: "Good morning! (megusta) (coffee)"
Output:
{
  "mentions": [],
  "emoticons": [
    "megusta",
    "coffee"
  ],
  "links": []
}
 
Input: "Olympics are starting soon; http://www.nbcolympics.com"
Output:
{
  "mentions": [],
  "emoticons": [],
  "links": [
    {
      "url": "http://www.nbcolympics.com",
      "title": "2018 PyeongChang Olympic Games"
    }
  ]
}
 
Input: "@bob @john (success) such a cool feature; https://twitter.com/jdorfman/status/430511497475670016"
Output:
{
  "mentions": [
    "bob",
    "john"
  ],
  "emoticons": [
    "success"
  ],
  "links": [
    {
      "url": "https://twitter.com/jdorfman/status/430511497475670016",
      "title": "Justin Dorfman on Twitter: &quot;nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq&quot;"
    }
  ]
}
