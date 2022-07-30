# The frontend

In react. Run by changing into the client directory and typing:

npm start

# The backend

In node.js. Run by changing into the backend directory and typing:

npm run dev

## Project notes

#1
If accessability is important, change the UX to adhere to accessability standards:

https://www.w3.org/WAI/standards-guidelines/

#2
UX TodoList should have been two components, a To-do and Task, but I didn’t want to take the time to install redux 
for global state management (I do use redux when developing production apps) and react router v6 doesn’t route parameters in class-based components. 

I had already written the TodoList.tsx as a class and didn't want to rewrite it to be a functional component and didn't want to have one class component (Todo) and one functional component (task), thererfor I chose one component.

#3
Notification library - Just one I found, but appears very bloated and clunky. Would replace it or refactor into callable class to eliminate bloated, redundant code in Todolist.tsx.

#4
Would add check for validate date and probably use moment

#5
Although the form button is disabled on incomplete input, I checked on back in case some manually manipulates the button to be enabled via the inspection tool / dom manipulation.

#6
If on the tasks page and someone refreshes the browser, it will revert back to the to-do page. In a production app
with a DB, global state storage like redux, or pulling the activeListId from node, this wouldn't happen. I chose 
to not address this for this demo app.

#7
Diverting from the spec, I chose to allow completed lists and tasks to be edited in case the user makes a 
mistake in marking something complete.

#9 to-do for me:

Sort list, etc