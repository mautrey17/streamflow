# StreamFlow
React Project Management App with simple Auth, and Chat App.

# Table of Content
- [Description](#description)
- [Installation](#installation)
- [Messaging](#mesaging)
- [Notes](#notes)
- [Links](#links)
- [Contributors](#contributors)

# Description
StreamFlow is a project management application where users can create a profile to manage solo and team projects. After registering an account, users will be able to create their first project or be added to an existing project with a team. Each project allows users to create tasks that can be assigned to users and have due dates and levels of urgency. When users are assigned to a project, their avatar appears beside their name. Each avatar is fully customizable in the user settings page.

In addition to tracking projects and tasks, StreamFlow supports teams and projects through live chat between users and a place to save and create notes.


# Installation
```
npm i
```

# Messaging
The messaging page, is a React app by itself.

The page allow the user after been authenticate, to be able to receive/send instant message to the group that he/she has been assign to. You will also be able to read all the messages from the group.

We integrate this application within the StreamFlow application by utilising the ```<iframe>``` tag.
You can acces the Chat application with the following links:  

[Git Repo](https://github.com/nhounhou/chat-app)  
[Chat Application](https://chat-app-unc.netlify.app/)

This application is simplistic as possible, been part of a final project.  
The management of the user/groups is done thru the [Chat Engine](https://chatengine.io/) webpage. And only the Administrator can create/assign user to groups.  

Few improvements can be added as:
- User updates
- User creating their own groups
- Messaging another user

# Notes
In that page you are able to create, read, update notes relevant to a project or task.
![images](client/public/images/notes.jpg)

# Links
[Git Repo](https://github.com/mautrey17/streamflow)  
[Deploy Application](https://streamflowteam4.herokuapp.com/)

# Contributors
- [Imani Dillahunt](https://github.com/imanid-code), [mail](mailto:imanidillahunt@gmail.com)
- [Duy Nguyen](https://github.com/LinosM), [mail](mailto:NguyenDuy768@gmail.com)
- [Matt Autrey](https://github.com/mautrey17), [mail](mailto:mautrey17@gmail.com)
- [Michel Nhouyvanisvong](https://github.com/nhounhou), [mail](mailto:mnhounhou@gmail.com)
