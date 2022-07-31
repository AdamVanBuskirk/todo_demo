# The frontend

In react. Run by changing into the client directory and typing:

npm start

# The backend

In node.js. Run by changing into the backend directory and typing:

npm run dev

## Project notes

#1
If accessability is important, I would change the UX to adhere to accessability standards:

https://www.w3.org/WAI/standards-guidelines/

#2
UX TodoList should have been two components, a To-do and Task, but I didn’t want to take the time to install redux 
for global state management (I do use redux when developing production apps) and react router v6 doesn’t route parameters in class-based components. 

I had already written the TodoList.tsx as a class and didn't want to rewrite it to be a functional component and didn't want to have one class component (Todo) and one functional component (task), thererfor I chose one component.

Could also break into resusable components like List, Button, Form, etc to ensure all use the same styling,
formatting, etc, but I didn't do that for this demo.

#3
Notification library - Just one I found, but appears very bloated and clunky. Would replace it or refactor into callable class to eliminate bloated, redundant code in Todolist.tsx.

#4
Although the form button is disabled on incomplete input, I checked on back in case some manually manipulates the button to be enabled via the inspection tool / dom manipulation.

#5
If on the tasks page and someone refreshes the browser, it will revert back to the to-do page. In a production app
with a DB, global state storage like redux, or pulling the activeListId from node, this wouldn't happen. I chose 
to not address this for this demo app.

#6
Diverting from the spec, I chose to allow completed lists and tasks to be edited in case the user makes a 
mistake in marking something complete.

#7
If a prod app, I would add sorting to the form so the user can sort by name or date, desc asc. Probably a search
filter at the top as well.

#8
Consideration for deleting lists - Could leave as is and when a list is deleted all items are as well, or change
so no list with incomplete items can be deleted.

Sort list, etc