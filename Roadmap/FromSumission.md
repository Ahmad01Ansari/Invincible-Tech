You are a senior full-stack architect helping me design the Contact Management module for the admin terminal of my website "Invinsible Tech."

Current stack:

* Next.js App Router
* MongoDB
* Mongoose
* Tailwind CSS
* Shadcn UI
* Admin panel already exists
* Blog engine database already exists

I want the contact form system to work like this:

1. A user submits the contact form from the public website
2. The form data should be:

   * Sent to my email
   * Stored in MongoDB
   * Visible inside the admin terminal
3. Admin should be able to:

   * View all contact submissions
   * Search submissions
   * Filter by status
   * Mark as new, in progress, replied, closed
   * Open detailed contact record
   * Add internal notes
   * Delete submission
   * Export submissions
   * Track submission date and source page
4. Every submission should have fields such as:

   * Name
   * Email
   * Phone number
   * Company name
   * Service interested in
   * Budget range
   * Country
   * Message
   * Status
   * Notes
   * Source page
   * Submitted date
   * Last updated date

Please create a complete system architecture and UI structure for this module.

Include the following:

1. MongoDB Schema

   * Create a recommended Mongoose schema for contact submissions
   * Include all useful fields
   * Include timestamps

2. Contact Form Flow

   * Explain the full flow from frontend form submission to database save to email notification
   * Suggest best email service:

     * Resend
     * Nodemailer
     * SendGrid
     * Mailgun
   * Recommend the best option for Next.js

3. Admin Contact Dashboard

   * Suggest dashboard cards such as:

     * Total submissions
     * New inquiries
     * In progress
     * Closed
     * This week
   * Suggest layout and stats cards

4. Contact List Page

   * Suggest table columns
   * Suggest filters
   * Suggest sorting options
   * Suggest bulk actions
   * Suggest search functionality

5. Individual Contact Detail Page

   * Show full contact information
   * Show inquiry history
   * Show internal notes
   * Show status timeline
   * Add quick reply button
   * Add mark as closed button
   * Add delete button

6. Suggested Status Workflow

   * New
   * Contacted
   * In Progress
   * Proposal Sent
   * Closed Won
   * Closed Lost
   * Spam

7. Suggested Admin Features

   * Email reply directly from admin panel
   * Internal notes
   * Reminder follow-ups
   * Attach proposal files
   * Export CSV
   * Assign inquiry to team member
   * Tag high-priority leads
   * Mark favorite clients

8. Suggested UI Components

   * Stats card
   * Contact table row
   * Status badge
   * Priority badge
   * Timeline component
   * Notes component
   * Reply modal
   * Filter dropdown
   * Search bar
   * Empty state
   * Delete confirmation modal

9. Suggested Animations

   * Row hover effects
   * Status color transitions
   * Slide-over detail panel
   * Animated counters
   * Toast notifications
   * Skeleton loading state
   * Smooth filtering transitions

10. Suggested Folder Structure

* app/admin/contact/page.js
* app/admin/contact/[id]/page.js
* components/contact/
* lib/models/Contact.js
* lib/actions/contact.js
* app/api/contact/route.js

1. Suggested Future Features

* AI lead scoring
* Auto-categorization of inquiries
* Auto-response email templates
* CRM integration
* WhatsApp notification
* Slack notification
* Calendar scheduling
* Meeting booking integration

The output should be detailed enough to directly build the contact management module in the admin terminal.
