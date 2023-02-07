<h1>Community Tool-Share</h1>

This web app is a community tool-share.  Tools are expensive, and sometimes a single use does not justify a purchase. 
<ul>
<li>"Somebody nearby must have this specialty tool.  If only there was a way to borrow one!"</li><br>
<li>"I've got this really useful tool that just sits dormant.  And I bet somebody nearby could get some use out of it."</li>
</ul>
Instead of a tool library that would require a physical space to store available tools, this app would show tools that people own that they have made available to the community to borrow.  This app lets people submit tools that they want to allow people to borrow, and lets people reserve one that is available.<br>

Functionality - 

<b>Upon visiting:</b><br>
    The app fetches all the tools from db.json and renders them into individual "cards."
    Each card shows the tool's name, an image of the tool, and it's availability status; either "Available" or "Reserved."
    A dropdown menu is populated with the names of only the tools with the status "Available."
    Hovering over a tool's card with make a description appear.

<b>Reserving a tool:</b><br>
    To reserve a tool, select the desired tool from the dropdown menu, and click the "Reserve Tool" button.
    An alert will pop up with a confirmation of the reservation, and a phone number to call to arrange the pickup and dropoff.
    The status of that tool in its card will change to "Reserved."
    The name of the reserved tool wil disappear from the dropdown menu.

<b>Submitting a tool:</b><br>
    Type the name of your tool in the first field of the form, an image URL in the next, your phone number in the next, and a brief description of the tool's use in the last.
    Upon clicking the "Submit Tool" button, your tool will now appear in its own rendered card with the status "Available."
    The name of the submitted tool will be added to the dropdown menu.
    No new card will be rendered if the submit button is clicked while the form fields are empty.
