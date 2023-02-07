This web app is a community tool-share.  Tools are expensive, and sometimes a single use does not justify a purchase. 

"Somebody nearby must have this specialty tool.  If only there was a way to borrow one!"<br>
"I've got this really useful tool that just sits dormant.  And I bet somebody nearby could get some use out of it."

Instead of a tool library that would require a physical space to store available tools, this app would show tools that people own that they have made available to the community to borrow.  This app lets people submit tools that they want to allow people to borrow, and lets people reserve one that is available.

Functionality - 

Upon visiting:
    The app fetches all the tools from db.json and renders them into individual "cards."
    Each card shows the tool's name, an image of the tool, and it's availability status; either "Available" or "Reserved."
    A dropdown menu is populated with the names of only the tools with the status "Available."
    Hovering over a tool's card with make a description appear.

Reserving a tool:
    To reserve a tool, select the desired tool from the dropdown menu, and click the "Reserve Tool" button.
    An alert will pop up with a confirmation of the reservation, and a phone number to call to arrange the pickup and dropoff.
    The status of that tool in its card will change to "Reserved."
    The name of the reserved tool wil disappear from the dropdown menu.

Submitting a tool:
    Type the name of your tool in the first field of the form, an image URL in the next, and your phone number in the last.
    Upon clicking the "Submit Tool" button, your tool will now appear in its own rendered card with the status "Available."
    The name of the submitted tool will be added to the dropdown menu.
    No new card will be rendered if the submit button is clicked while the form fields are empty.
