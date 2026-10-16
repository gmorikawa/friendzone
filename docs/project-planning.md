# Friendzone — Software Development Plan

Friendzone is a full-stack social networking application built as an educational project. Users will be able to create accounts, manage profiles, establish relationships, publish posts, comment on posts, and exchange private messages.

This plan explains the order in which to build the application, the work required at each step, and the conditions for moving to the next step. Alongside implementation, the project provides practice in requirements definition, architecture, testing, project management, and collaboration.

## 1. Define the scope and delivery milestones

Divide development into three milestones so that each release delivers a usable application.

| Milestone | Included capabilities | Result |
|---|---|---|
| 1. Minimum viable product (MVP) | Identity, profiles, friendships | Users can register, maintain a profile, and connect with other users. |
| 2. Social features | Posts and comments | Users can share content and interact with it. |
| 3. Communication | Private conversations and messages | Users can communicate privately. |

Complete and validate each milestone before expanding the scope. Learning the development process is a primary objective, so allow time for design discussions, reviews, and documentation in addition to coding.

## 2. Establish the project foundation

Before implementing features, agree on how the team will plan, build, and review the software.

1. Assign responsibilities. The project manager leads requirements, prioritization, and acceptance reviews. The developer leads technical design, implementation, and automated testing. Both participate in planning and design decisions.
2. Create a backlog organized by milestone. Break each capability into small tasks with a clear expected result.
3. Define a Git workflow covering branches, pull requests, and code reviews.
4. Agree on a definition of done: acceptance criteria met, relevant tests passing, code reviewed, and documentation updated.
5. Set up the frontend, backend, database, and local development environment. Document how to configure and run them.
6. Configure automated build and test checks so that changes can be verified consistently.

Start with one frontend application, one modular backend application, and one database. Define an API contract between the frontend and backend. Keep business areas separate within the backend without requiring separate services.

Record significant technical choices in architectural decision records (ADRs). Each record should explain the problem, alternatives considered, chosen approach, and trade-offs.

**Completion criteria:** Both team members can run the application locally, the initial checks pass, and the backlog and working agreements are documented.

## 3. Use the same development cycle for each business area

Organize the application into six business areas: Identity & Access, User Profiles, Social Relationships, Publications, Interactions, and Messaging. These are logical boundaries within the application.

For each area, follow this cycle:

1. **Define behavior.** Discuss user actions, business rules, error cases, and acceptance criteria before coding.
2. **Review the design.** Identify responsibilities, dependencies, data relationships, API operations, and access rules. Record decisions that affect other areas.
3. **Break down the work.** Create implementation and verification tasks linked to the requirements.
4. **Build an end-to-end flow.** Connect the database, backend, and frontend so that a user can complete the intended action.
5. **Verify the behavior.** Test business rules, API integration, access restrictions, and the main user flow.
6. **Review and document.** Demonstrate the result, check acceptance criteria, and update setup or design documentation.

Maintain lightweight traceability between requirements, tasks, implementation, and tests. This makes it possible to check whether the delivered behavior meets the original requirement.

## 4. Build Identity & Access

Implement account registration and authentication first because the remaining features depend on identifying the current user.

1. Define registration fields, validation rules, account uniqueness rules, and account management scope.
2. Choose the authentication approach and document how authentication state passes between the frontend and backend.
3. Design the account data model and database migrations. Store passwords using an appropriate password hashing mechanism.
4. Implement registration, sign-in, sign-out, and retrieval of the current authenticated user.
5. Build the corresponding frontend forms and authenticated navigation.
6. Add server-side access checks for protected operations and consistent validation and error responses.
7. Test successful flows, invalid input, duplicate accounts, incorrect credentials, and unauthenticated requests.

**Completion criteria:** A user can register, sign in, use a protected feature, and sign out. Protected operations reject unauthenticated requests.

## 5. Build User Profiles

Add the public representation of each user. Keep public profile fields distinct from private account information.

1. Define which profile fields are required, optional, public, or editable.
2. Decide how profiles relate to accounts and when a profile is created.
3. Implement profile retrieval and updates, including validation and ownership checks.
4. Build profile viewing and editing screens.
5. Provide a way to find other users and open their profiles, supporting the friendship flow in the next step.
6. Test profile updates, invalid values, public responses, and attempts to modify another user's profile.

**Completion criteria:** Users can view profiles and edit their own information. Public responses expose only the intended public fields.

## 6. Build Social Relationships

Implement friend requests and friendship management. Define the relationship states before designing the database and API.

1. Specify how users send, accept, reject, and cancel requests, and how they remove an existing friendship.
2. Define rules for self-requests, duplicate requests, requests in opposite directions, and requests between existing friends.
3. Model requests and friendships with database constraints that enforce the agreed rules.
4. Implement the operations with authorization checks and consistent handling of simultaneous requests.
5. Build screens for incoming requests, outgoing requests, and the friends list.
6. Test state transitions, unauthorized actions, duplicates, and concurrent requests.

**Completion criteria:** Two users can become friends and remove the friendship. Invalid requests and unauthorized state changes are rejected.

### Deliver milestone 1: MVP

Verify the complete journey from registration to profile editing and friendship creation. Deploy a usable version, document its configuration, and review the milestone together.

Review whether requirements were clear, tasks were appropriately sized, and tests provided enough confidence. Adjust the backlog and working process before adding social features.

## 7. Build Publications

Add user-generated posts after user identity and friendships are established.

1. Define post content, validation limits, ownership rules, and visibility. Decide whether posts are public, limited to friends, or support multiple visibility settings.
2. Decide which component checks visibility and how it uses friendship information.
3. Design the post model and its relationship to the author.
4. Implement post creation, retrieval, editing, and deletion. Enforce ownership and visibility rules on the backend.
5. Add paginated post lists with a defined ordering.
6. Build post creation and editing forms, post displays, and list navigation.
7. Test ownership, visibility, validation, deletion, and pagination behavior.

**Completion criteria:** Users can create and manage their own posts and browse only the posts they are allowed to see.

## 8. Build Interactions

Add comments to posts, reusing the visibility and authorization rules established for publications.

1. Define who can comment, who can edit or delete a comment, and what happens to comments when a post is deleted.
2. Decide whether comments belong within the Publications module or need a separate module.
3. Model the relationships between comments, posts, and authors.
4. Implement comment creation, retrieval, editing, and deletion according to the agreed rules.
5. Add comment lists and forms to the post interface.
6. Test access to restricted posts, comment ownership, invalid input, and deletion consistency.

**Completion criteria:** Users can comment on accessible posts and manage comments according to the agreed permissions. Post deletion handles related comments consistently.

### Deliver milestone 2: Social features

Verify the journey from creating a post to viewing and commenting on it as another user. Check that visibility rules apply consistently to both posts and comments. Deploy the release and review the architecture, test coverage, and remaining backlog.

## 9. Build Messaging

Implement private communication after the earlier milestones are stable. Begin with persisted messages over HTTP; add real-time delivery if the requirements justify it.

1. Define who can start a conversation, who can participate, and whether friendship is required.
2. Design conversations, participants, and messages, including message ordering and history pagination.
3. Implement conversation creation, conversation listing, message sending, and message history retrieval.
4. Enforce participant access checks for every conversation and message operation.
5. Build the conversation list and messaging interface, including loading, empty, and error states.
6. Test persistence, ordering, pagination, and attempts to access conversations as a nonparticipant.
7. If real-time updates are required, choose WebSockets or polling and define reconnection and duplicate-handling behavior. Verify that users can recover missed messages after reconnecting.

**Completion criteria:** Authorized participants can exchange messages and retrieve their history. Nonparticipants cannot access a private conversation.

### Deliver milestone 3: Communication

Verify private messaging between separate user sessions. Deploy the release and document any known limitations, including whether new messages require refreshing, polling, or a real-time connection.

## 10. Prepare each release for operation

Apply these steps at every milestone, starting with the MVP:

1. Run relevant automated tests and manually verify the main user journeys.
2. Review authentication, authorization, input validation, and handling of private data.
3. Document environment configuration, database migrations, deployment, and recovery procedures. Keep secrets out of version control.
4. Check application logging and error reporting so that failures can be investigated.
5. Confirm how database backups and restoration will work in the deployment environment.
6. Record known limitations and prioritize follow-up work in the backlog.

Use each release review to improve both the software and the development process. Revisit architectural decisions as requirements evolve, and introduce additional infrastructure only when a concrete requirement calls for it.
